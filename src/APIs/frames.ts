import * as draw_utils from './draw_utils';
import {MonitorDrawer} from './draw_utils';
import * as math_utils from './math_utils';

interface FramesContext {
	monitor: MonitorPeripheral | null,
	last_refresh: number,
	refresh_rate: number,
	frames: Frame[],
	drawer: MonitorDrawer,
}

interface FrameParams {
	borderColor?: Color,
	fillColor?: Color,
	gapColor?: Color,
	title?: string
}

interface FrameContext {
	x: number,
	y: number,
	width: number,
	height: number,
	borderColor: Color,
	fillColor: Color,
	gapColor: Color,
	title: string | null,
	elements: Element[],
	toDraw: boolean,
}

interface ElementContext {
	id: string,
	toDraw: boolean,
	draw: (frame: Frame, monitor: MonitorPeripheral) => void,
	refresh: (frame: Frame, deltaTime: number) => void,
	params: any,
}

const MONITOR_ERROR = 'Monitor not found. Please set it with MonitorDrawer.setMonitor(monitor)';

export class MonitorFramer {
	private context: FramesContext = {
		monitor: null,
		last_refresh: 0,
		refresh_rate: 1,
		frames: [],
		drawer: draw_utils.MonitorDrawer.getInstance(),
	};

	private static instance: MonitorFramer;

	public static getInstance(): MonitorFramer {
		if (!this.instance) this.instance = new MonitorFramer();
		return this.instance;
	}

	public setMonitor(monitor: MonitorPeripheral): void {
		this.context.monitor = monitor;
	}

	private validateMonitor(): MonitorPeripheral {
		if (!this.context.monitor) error(MONITOR_ERROR);
		return this.context.monitor;
	}

	public setRefreshRate(rate: number): void {
		this.context.refresh_rate = rate;
	}

	public clearMonitor(backgroundColor?: Color) {
		const monitor = this.validateMonitor();
		const color = backgroundColor || colors.black;

		monitor.setBackgroundColor(color);
		monitor.clear();
	}

	public create(x: number, y: number, width: number, height: number, params?: FrameParams): Frame {
		this.validateMonitor();

		const frameContext: FrameContext = {
			x: x,
			y: y,
			width: width,
			height: height,
			borderColor: params?.borderColor || colors.gray,
			fillColor: params?.fillColor || colors.black,
			gapColor: params?.gapColor || colors.black,
			title: params?.title || null,
			elements: [],
			toDraw: true,
		};

		const frame = new Frame(frameContext, this.validateMonitor(), this.context.drawer);

		this.context.frames.push(frame);

		return frame;
	}

	public drawAll() {
		if (this.context.frames.length === 0) return;
		this.validateMonitor();

		for (const frame of this.context.frames) {
			if (frame.needToDraw()) {
				frame.draw();
			}

			if (frame.getElements().length > 0) {
				frame.drawElements(true);
			}

			frame.markDrawn();
		}
	}

	public refreshAll(deltaTime: number) {
		if (this.context.frames.length === 0) return;

		for (const frame of this.context.frames) {
			frame.drawElements(false);

			for (const element of frame.getElements()) {
				element.refresh(frame, deltaTime);
			}

			frame.markDrawn();
		}
	}

	public loop() {
		this.validateMonitor();

		let lastTime = os.clock();

		while (true) {
			const currentTime = os.clock();
			const deltaTime = currentTime - lastTime;
			lastTime = currentTime;

			this.drawAll();
			this.refreshAll(deltaTime);

			os.sleep(1 / this.context.refresh_rate);
		}
	}
}

export class Frame {
	private context: FrameContext;
	private readonly monitor: MonitorPeripheral;
	private drawer: MonitorDrawer;

	constructor(context: FrameContext, monitor: MonitorPeripheral, drawer: MonitorDrawer) {
		this.context = context;
		this.monitor = monitor;
		this.drawer = drawer;
	}

	public draw() {
		this.drawer.setMonitor(this.monitor);
		const [monitorWidth, monitorHeight] = this.monitor.getSize();

		// Draw the frame's gap
		const gapX1 = math_utils.clamp(this.context.x - 1, 1, monitorWidth);
		const gapY1 = math_utils.clamp(this.context.y - 1, 1, monitorHeight);
		const gapX2 = math_utils.clamp(this.context.x + this.context.width, 1, monitorWidth);
		const gapY2 = math_utils.clamp(this.context.y + this.context.height, 1, monitorHeight);
		this.drawer.drawFilledRect(gapX1, gapY1, gapX2, gapY2, this.context.gapColor);

		// Draw the frame's border and body
		this.drawer.drawBorderedRect(this.context.x, this.context.y, this.context.width - 1, this.context.height - 1, this.context.borderColor, this.context.fillColor);

		// Draw the frame's title
		if (this.context.title) {
			const oldBackgroundColor = this.monitor.getBackgroundColor();
			const oldTextColor = this.monitor.getTextColor();
			this.monitor.setBackgroundColor(this.context.fillColor);
			this.monitor.setTextColor(this.context.borderColor);
			const title = ' ' + this.context.title + ' ';
			const titleX = this.context.x + math.max(1, math.floor((this.context.width - title.length) / 2));
			this.monitor.setCursorPos(titleX, this.context.y);
			this.monitor.write(title);
			this.monitor.setBackgroundColor(oldBackgroundColor);
			this.monitor.setTextColor(oldTextColor);
		}
	}

	public drawElements(forceRedraw?: boolean) {
		for (const element of this.context.elements) {
			if (forceRedraw || element.toDraw) {
				element.draw(this, this.monitor);
				element.toDraw = false;
			}
		}
	}

	public addElement(element: Element) {
		this.context.elements.push(element);
	}

	public removeElement(elementId: string) {
		this.context.elements = this.context.elements.filter(({id}) => id !== elementId);
	}

	public getElement(elementId: string) {
		return this.context.elements.find(({id}) => id === elementId);
	}

	public needToDraw() {
		return this.context.toDraw;
	}

	public getElements() {
		return this.context.elements;
	}

	public hasElement(elementId: string) {
		return this.context.elements.some(({id}) => id === elementId);
	}

	public markDrawn() {
		this.context.toDraw = false;
	}

	public getWidth() {
		return this.context.width;
	}

	public getInnerWidth() {
		return this.context.width - 2;
	}

	public getInnerHeight() {
		return this.context.height - 2;
	}

	public toScreenCoords(x: number, y: number) {
		return {
			x: this.context.x + 1 + x,
			y: this.context.y + 1 + y,
		};
	}
}

export abstract class Element implements ElementContext {
	public id: string;
	public toDraw: boolean;
	public params: any;

	protected constructor(id: string) {
		this.id = id;
		this.toDraw = true;
	}

	abstract draw(frame: Frame, monitor: MonitorPeripheral): void;

	abstract refresh(frame: Frame, deltaTime: number): void;
}
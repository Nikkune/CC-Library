import * as math_utils from './math_utils';

interface DrawContext {
	monitor: MonitorPeripheral | null;
}

export enum TextAlignment {
	NORMAL,
	CENTER,
	HORIZONTAL,
	VERTICAL
}

interface TextDrawParams {
	x1: number;
	y1: number;
	x2?: number;
	y2?: number;
	text: string;
	textColor?: Color;
	backgroundColor?: Color;
	alignment: TextAlignment;
}

const MONITOR_ERROR = 'Monitor not found. Please set it with MonitorDrawer.setMonitor(monitor)';

export class MonitorDrawer {
	private context: DrawContext = {
		monitor: null,
	};

	private static instance: MonitorDrawer;

	public static getInstance(): MonitorDrawer {
		if (!this.instance) this.instance = new MonitorDrawer();
		return this.instance;
	}

	public setMonitor(monitor: MonitorPeripheral): void {
		this.context.monitor = monitor;
	}

	private validateMonitor(): MonitorPeripheral {
		if (!this.context.monitor) error(MONITOR_ERROR);
		return this.context.monitor;
	}

	private calculateBounds(x: number, y: number, width: number, height: number) {
		const monitor = this.validateMonitor();
		const [monitorWidth, monitorHeight] = monitor.getSize();

		return {
			x1: math_utils.clamp(x, 1, monitorWidth),
			y1: math_utils.clamp(y, 1, monitorHeight),
			x2: math_utils.clamp(x + width, 1, monitorWidth),
			y2: math_utils.clamp(y + height, 1, monitorHeight),
		};
	}

	private withPreservedColor(monitor: MonitorPeripheral, action: () => void) {
		const oldBackgroundColor = monitor.getBackgroundColor();
		action();
		monitor.setBackgroundColor(oldBackgroundColor);
	}

	private writeTextToMonitor(x: number, y: number, text: string, textColor: Color, backgroundColor: Color) {
		const monitor = this.validateMonitor();
		monitor.setBackgroundColor(backgroundColor);
		monitor.setTextColor(textColor);
		monitor.setCursorPos(x, y);
		monitor.write(text);
	}

	public drawFilledRect(x: number, y: number, width: number, height: number, color: Color) {
		const monitor = this.validateMonitor();
		const bounds = this.calculateBounds(x, y, width, height);

		if (bounds.x1 > bounds.x2 || bounds.y1 > bounds.y2) return;

		this.withPreservedColor(monitor, () => {
			monitor.setBackgroundColor(color);
			for (let yy = bounds.y1; yy < bounds.y2; yy++) {
				monitor.setCursorPos(x, yy);
				monitor.write(string.rep(' ', bounds.x2 - bounds.x1 + 1));
			}
		});
	}

	public drawBorderedRect(x: number, y: number, width: number, height: number, borderColor: Color, backgroundColor: Color) {
		const monitor = this.validateMonitor();
		const bounds = this.calculateBounds(x, y, width, height);

		this.withPreservedColor(monitor, () => {
			// Top border
			monitor.setCursorPos(bounds.x1, bounds.y1);
			monitor.setBackgroundColor(borderColor);
			monitor.write(' '.repeat(bounds.x2 - bounds.x1 + 1));

			// Middle (left border + fill + right border)
			for (let yy = bounds.y1 + 1; yy <= bounds.y2 - 1; yy++) {
				monitor.setCursorPos(bounds.x1, yy);
				// left border
				monitor.setBackgroundColor(borderColor);
				monitor.write(' ');

				// fill
				if (bounds.x2 > bounds.x1 + 1) {
					monitor.setBackgroundColor(backgroundColor);
					monitor.write(' '.repeat(bounds.x2 - bounds.x1 - 1));
				}

				// right border
				if (bounds.x2 > bounds.x1) {
					monitor.setBackgroundColor(borderColor);
					monitor.write(' ');
				}
			}

			// Bottom border
			if (bounds.y2 > bounds.y1) {
				monitor.setCursorPos(bounds.x1, bounds.y2);
				monitor.setBackgroundColor(borderColor);
				monitor.write(' '.repeat(bounds.x2 - bounds.x1 + 1));
			}
		});
	}

	public drawText(params: TextDrawParams) {
		const textColor = params.textColor || colors.white;
		const backgroundColor = params.backgroundColor || colors.black;

		if (params.alignment === TextAlignment.NORMAL) {
			this.writeTextToMonitor(params.x1, params.y1, params.text, textColor, backgroundColor);
			return;
		}

		const bounds = this.calculateBounds(
			params.x1,
			params.y1,
			(params.x2 || params.x1) - params.x1,
			(params.y2 || params.y1) - params.y1,
		);

		let x = params.x1;
		let y = params.y1;

		if (params.alignment === TextAlignment.CENTER ||
			params.alignment === TextAlignment.HORIZONTAL) {
			x = math_utils.lerp(bounds.x1, bounds.x2, 0.5);
			x = x - math.floor(params.text.length / 2);
		}

		if (params.alignment === TextAlignment.CENTER ||
			params.alignment === TextAlignment.VERTICAL) {
			y = math_utils.lerp(bounds.y1, bounds.y2, 0.5);
		}

		this.writeTextToMonitor(x, y, params.text, textColor, backgroundColor);
	}
}
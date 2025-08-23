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
	color?: Color;
	alignment: TextAlignment;
}

const MONITOR_ERROR = 'Monitor not found. Please set it with MonitorDrawer.setMonitor(monitor)';

export class MonitorDrawer {
	private static context: DrawContext = {
		monitor: null,
	};

	public static setMonitor(monitor: MonitorPeripheral): void {
		this.context.monitor = monitor;
	}

	private static validateMonitor(): MonitorPeripheral {
		if (!this.context.monitor) error(MONITOR_ERROR);
		return this.context.monitor;
	}

	private static calculateBounds(x: number, y: number, width: number, height: number) {
		const monitor = this.validateMonitor();
		const [monitorWidth, monitorHeight] = monitor.getSize();

		return {
			x1: math_utils.clamp(x, 1, monitorWidth),
			y1: math_utils.clamp(y, 1, monitorHeight),
			x2: math_utils.clamp(x + width, 1, monitorWidth),
			y2: math_utils.clamp(y + height, 1, monitorHeight),
		};
	}

	private static withPreservedColor(monitor: MonitorPeripheral, action: () => void) {
		const oldBackgroundColor = monitor.getBackgroundColor();
		action();
		monitor.setBackgroundColor(oldBackgroundColor);
	}

	private static writeTextToMonitor(x: number, y: number, text: string, color: Color) {
		const monitor = this.validateMonitor();
		monitor.setTextColor(color);
		monitor.setCursorPos(x, y);
		monitor.write(text);
	}

	public static drawFilledRect(x: number, y: number, width: number, height: number, color: Color) {
		const monitor = this.validateMonitor();
		const bounds = this.calculateBounds(x, y, width, height);

		if (bounds.x1 > bounds.x2 || bounds.y1 > bounds.y2) return;

		this.withPreservedColor(monitor, () => {
			monitor.setBackgroundColor(color);
			for (let i = bounds.y1; i <= bounds.y2; i++) {
				monitor.setCursorPos(x, y + i);
				monitor.write(string.rep(' ', bounds.x2 - bounds.x1 + 1));
			}
		});
	}

	public static drawBorderedRect(x: number, y: number, width: number, height: number, borderColor: Color, backgroundColor: Color) {
		const monitor = this.validateMonitor();
		const bounds = this.calculateBounds(x, y, width, height);

		this.withPreservedColor(monitor, () => {
			for (let i = bounds.y1; i <= bounds.y2; i++) {
				monitor.setCursorPos(x, y + i);
				monitor.setBackgroundColor(borderColor);
				monitor.write(' ');
				monitor.setBackgroundColor(backgroundColor);
				monitor.write(string.rep(' ', bounds.x2 - bounds.x1 - 1));
				monitor.setBackgroundColor(borderColor);
				monitor.write(' ');
			}
		});
	}

	public static drawText(params: TextDrawParams) {
		const color = params.color || colors.white;

		if (params.alignment === TextAlignment.NORMAL) {
			this.writeTextToMonitor(params.x1, params.y1, params.text, color);
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
		}

		if (params.alignment === TextAlignment.CENTER ||
			params.alignment === TextAlignment.VERTICAL) {
			y = math_utils.lerp(bounds.y1, bounds.y2, 0.5);
		}

		this.writeTextToMonitor(x, y, params.text, color);
	}
}
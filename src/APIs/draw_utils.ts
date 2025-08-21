import * as math_utils from './math_utils';

interface DrawContext {
	monitor: MonitorPeripheral | null;
}

const MONITOR_ERROR = 'Monitor not found. Please set it with MonitorDrawer.setMonitor(monitor)';

export class MonitorDrawer {
	private static context: DrawContext = {
		monitor: null
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
		}
	}

	private static withPreservedColor(monitor: MonitorPeripheral, action: () => void) {
		const oldBackgroundColor = monitor.getBackgroundColor();
		action();
		monitor.setBackgroundColor(oldBackgroundColor);
	}

	public static drawFilledRect(x: number, y: number, width: number, height: number, color: Color){
		const monitor = this.validateMonitor();
		const bounds = this.calculateBounds(x, y, width, height);

		if (bounds.x1 > bounds.x2 || bounds.y1 > bounds.y2) return;

		this.withPreservedColor(monitor, () => {
			monitor.setBackgroundColor(color);
			for (let i = bounds.y1; i <= bounds.y2; i++) {
				monitor.setCursorPos(x, y + i);
				monitor.write(string.rep(' ', bounds.x2 - bounds.x1 + 1));
			}
		})
	}

	public static drawBorderedRect(x: number, y: number, width: number, height: number, borderColor: Color, backgroundColor: Color){
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
		})
	}
}
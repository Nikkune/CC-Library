import * as draw_utils  from '../../../APIs/draw_utils';
import {TextAlignment}  from '../../../APIs/draw_utils';
import * as framer      from '../../../APIs/frames';
import {Element, Frame} from '../../../APIs/frames';
import {RednetHelper, SendType} from '../../../APIs/rednet_utils';

/** -------------------- TYPES & ENUMS -------------------- **/

// Represents a monitored gateway
interface Gateway {
	name: string;
	status: GatewayStatus | null;
	lastSeen: number;
	message: string | null;
}

// Possible gateway states
enum GatewayStatus {
	OK          = 'OK',
	WARNING     = 'WARNING',
	ERROR       = 'ERROR',
	MAINTENANCE = 'MAINTENANCE',
	LOST        = 'LOST',
}

/** -------------------- CONFIGURATION -------------------- **/

const CONFIG = {
	PERIPHERALS: {
		MONITOR_SIDE: 'top',
		MODEM_SIDE: 'left',
	},
	TIMING: {
		LOST_THRESHOLD: 30, // Time after which a gateway is considered lost
		REMOVE_THRESHOLD: 90, // Time after which a gateway is removed
		BLINK_INTERVAL: 0.2, // Interval for blinking
		REFRESH_RATE: 30, // Refresh rate of the application
	},
	DISPLAY: {
		GATEWAY_WIDTH: 16, // Width of a gateway rectangle
		TEXT_SCALE: 0.5, // Text scale of the monitor
		MAX_LOGS: 50, // Maximum number of logs to display
		TITLE: 'Datacenter', // Title of the monitor
		Y_OFFSET: 6, // Y offset of the monitor
	},
} as const;

/**
 * The GatewayMonitor class is responsible for monitoring gateway devices,
 * displaying their statuses on a screen, and logging updates. It manages
 * multiple UI components such as a gateway status display and a log viewer.
 * The class also listens for updates received via a modem and processes
 * status changes for gateways.
 */
class GatewayMonitor {
	private monitor: MonitorPeripheral;
	private rednetHelper: RednetHelper;
	private readonly monitorFramer: framer.MonitorFramer;
	private readonly drawer: draw_utils.MonitorDrawer;
	private readonly gateways: Gateway[] = [];
	private readonly logs: string[] = [];
	private readonly gatewaysFrame: Frame;
	private readonly logFrame: Frame;

	constructor() {
		this.initializePeripherals();
		this.monitorFramer = framer.MonitorFramer.getInstance();
		this.drawer = draw_utils.MonitorDrawer.getInstance();
		this.setupDisplay();
		this.gatewaysFrame = this.createGatewaysFrame();
		this.logFrame = this.createLogFrame();
	}

	/**
	 * Initializes the peripheral devices used by the system, such as the monitor and modem.
	 * Ensures the monitor and modem are properly wrapped and configured, and prepares the system for communication via the modem.
	 *
	 * @return {void} This method does not return a value.
	 */
	private initializePeripherals(): void {
		this.monitor = peripheral.wrap(CONFIG.PERIPHERALS.MONITOR_SIDE) as MonitorPeripheral || error('No monitor found');
		const modem = peripheral.wrap(CONFIG.PERIPHERALS.MODEM_SIDE) as ModemPeripheral || error('No modem found');
		this.rednetHelper = new RednetHelper(modem);
		this.monitor.setTextScale(CONFIG.DISPLAY.TEXT_SCALE);
	}

	/**
	 * Configures the display settings for the monitor by initializing required components,
	 * setting up the monitor, clearing it, configuring its refresh rate, and drawing the title.
	 *
	 * @return {void} This method does not return a value.
	 */
	private setupDisplay(): void {
		const [monitorWidth, _] = this.monitor.getSize();
		this.monitorFramer.setMonitor(this.monitor);
		this.drawer.setMonitor(this.monitor);
		this.monitorFramer.clearMonitor();
		this.monitorFramer.setRefreshRate(CONFIG.TIMING.REFRESH_RATE);
		this.drawTitle(monitorWidth);
	}

	/**
	 * Draws a title on the monitor with proper padding and styling.
	 *
	 * @param {number} monitorWidth - The width of the monitor where the title will be displayed.
	 * @return {void} Does not return a value.
	 */
	private drawTitle(monitorWidth: number): void {
		const title = CONFIG.DISPLAY.TITLE;
		const pad = monitorWidth - 2 - title.length;
		this.monitor.setBackgroundColor(colors.cyan);
		this.monitor.setTextColor(colors.white);
		this.monitor.setCursorPos(2, 2);
		this.monitor.write(string.rep(' ', monitorWidth - 2));
		this.monitor.setCursorPos(2, 3);
		this.monitor.write(string.rep(' ', math.floor(pad / 2)));
		this.monitor.write(title);
		this.monitor.write(string.rep(' ', math.ceil(pad / 2)));
		this.monitor.setCursorPos(2, 4);
		this.monitor.write(string.rep(' ', monitorWidth - 2));
		this.monitor.setBackgroundColor(colors.black);
	}

	/**
	 * Creates and returns a Frame instance representing the "Gateways" UI section.
	 *
	 * The frame is created based on the monitor's dimensions, a predefined offset,
	 * and specific styling options such as border color and title.
	 *
	 * @return {Frame} The newly created "Gateways" Frame instance.
	 */
	private createGatewaysFrame(): Frame {
		const [monitorWidth, monitorHeight] = this.monitor.getSize();
		return this.monitorFramer.create(
			2,
			CONFIG.DISPLAY.Y_OFFSET,
			(monitorWidth / 3) * 2 - 2,
			monitorHeight - CONFIG.DISPLAY.Y_OFFSET,
			{borderColor: colors.cyan, title: 'Gateways'},
		);
	}

	/**
	 * Creates and returns a frame to display logs with specific dimensions and styles
	 * based on the monitor's size and configuration settings.
	 *
	 * @return {Frame} A newly created frame object configured for displaying logs.
	 */
	private createLogFrame(): Frame {
		const [monitorWidth, monitorHeight] = this.monitor.getSize();
		return this.monitorFramer.create(
			(monitorWidth / 3) * 2 + 1,
			CONFIG.DISPLAY.Y_OFFSET,
			monitorWidth / 3,
			monitorHeight - CONFIG.DISPLAY.Y_OFFSET,
			{borderColor: colors.blue, title: 'Logs'},
		);
	}

	/**
	 * Initializes the necessary parts and starts the main execution loop.
	 * This includes creating required elements, setting up log elements, and handling concurrent processes for monitoring and messaging.
	 *
	 * @return {void} No return value.
	 */
	public start(): void {
		this.createElements();
		this.createLogElements();
		print('To send a message to the datacenter');
		print('Use the id : ' + tostring(os.getComputerID()));

		parallel.waitForAny(() => this.monitorFramer.loop(), async () => await this.messageLoop());
	}


	private async messageLoop(): Promise<void> {
		while (true) {
			this.rednetHelper.tick();
			const [senderId, message] = rednet.receive(null, 0.1);
			if (senderId && message?.type === 'status_update' && message.payload?.name) {
				const { name, status, message: msg } = message.payload;
				this.handleGatewayUpdate(name, status, msg);
			}
			this.checkGatewaysStatus();
			this.createElements();
		}
	}

	/**
	 * Handles updates to the status of a gateway.
	 *
	 * @param {string} gatewayName - The name of the gateway being updated.
	 * @param {GatewayStatus} status - The new status of the gateway.
	 * @param message - The message associated with the gateway status update.
	 * @return {void} This method does not return a value.
	 */
	private handleGatewayUpdate(gatewayName: string, status: GatewayStatus, message: string): void {
		const gateway = this.gateways.find(g => g.name === gatewayName);
		const currentTime = os.clock();

		if (gateway) {
			if (gateway.status !== status) {
				this.addLog(`${gatewayName} : ${status} !`);
				if (gateway.message !== message) {
					this.addLog(`${gatewayName} : ${message}`);
				}
			}
			gateway.message = message;
			gateway.status = status;
			gateway.lastSeen = currentTime;
		} else {
			this.addLog(`New ${gatewayName} detected !`);
			this.gateways.push({name: gatewayName, status, lastSeen: currentTime, message: null});
		}
	}

	/**
	 * Calculates the position of a gateway based on the available width and the gateway's index.
	 *
	 * @param {number} width The total available width for placing gateways.
	 * @param {Gateway} gateway The specific gateway whose position is to be calculated.
	 * @return {{x: number, y:number}} An object containing the x and y coordinates representing the gateway's position.
	 */
	private getGatewayPosition(width: number, gateway: Gateway): { x: number; y: number; } {
		const index = this.gateways.indexOf(gateway);

		const columns = math.max(1, math.floor(width / (CONFIG.DISPLAY.GATEWAY_WIDTH + 2)));

		const totalWidth = columns * (CONFIG.DISPLAY.GATEWAY_WIDTH + 2) - 2;

		const startX = math.floor((width - totalWidth) / 2) - 1;
		const x = startX + (index % columns) * (CONFIG.DISPLAY.GATEWAY_WIDTH + 2);
		const y = 2 + math.floor(index / columns) * 4;

		return {
			x: x,
			y: y,
		};
	}

	/**
	 * Creates and manages visual elements representing gateways. If no gateways are available, a "waiting" animation
	 * is displayed. Otherwise, gateways are sorted, their visual positions are updated, and new elements are created
	 * for any missing gateway.
	 *
	 * @return {void} Does not return any value.
	 */
	private createElements(): void {
		const drawer = this.drawer;
		const gateways = this.gateways;
		if (gateways.length === 0) {
			if (!this.gatewaysFrame.hasElement('waiting')) {
				this.gatewaysFrame.markRedraw();
				this.logFrame.markRedraw();
				const element: Element = {
					id: 'waiting',
					toDraw: true,
					params: {
						frames: {
							1: 'Waiting for gateways',
							2: 'Waiting for gateways.',
							3: 'Waiting for gateways..',
							4: 'Waiting for gateways...',
						},
						writeState: 1,
						lastUpdate: 0,
						threshold: 0.5,
					},
					draw(frame: Frame, monitor: MonitorPeripheral) {
						const y = math.floor(frame.getInnerHeight() / 2);
						const screenPosition = frame.toScreenCoords(1, y);
						const text: string = this.params.frames[this.params.writeState];
						const padding = (frame.getInnerWidth() - text.length - 1) / 2;
						monitor.setCursorPos(screenPosition.x, screenPosition.y);
						monitor.write(string.rep(' ', padding));
						monitor.write(text);
						monitor.write(string.rep(' ', padding));
						this.toDraw = false;
					},
					refresh(_frame: Frame, deltaTime: number) {
						this.params.lastUpdate += deltaTime;

						if (this.params.lastUpdate >= this.params.threshold) {
							this.params.writeState++;
							if (this.params.writeState > 4) {
								this.params.writeState = 1;
							}
							this.params.lastUpdate = 0;
							this.toDraw = true;
						}
					},
				};

				this.gatewaysFrame.addElement(element);
			}
		} else {
			if (this.gatewaysFrame.hasElement('waiting')) {
				this.gatewaysFrame.removeElement('waiting');
				this.gatewaysFrame.markRedraw();
			}

			const sortedGateways = this.gateways.sort((a, b) => (
				a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
			));

			for (const gateway of sortedGateways) {
				const element: Element = this.gatewaysFrame.getElement(gateway.name);
				const position = this.getGatewayPosition(this.gatewaysFrame.getWidth(), gateway);
				if (element) {
					element.params.x = position.x;
					element.params.y = position.y;
					element.params.state = gateway.status || GatewayStatus.OK;
					element.toDraw = true;
				} else {
					const element: Element = {
						id: gateway.name,
						toDraw: true,
						params: {
							x: position.x,
							y: position.y,
							width: CONFIG.DISPLAY.GATEWAY_WIDTH,
							height: 3,
							state: gateway.status || GatewayStatus.OK,
							lastBlink: 0,
							blink: false,
						},
						draw(frame: Frame, _monitor: MonitorPeripheral) {
							let color: Color = colors.white;
							switch (this.params.state) {
								case GatewayStatus.OK:
									color = colors.green;
									break;
								case GatewayStatus.WARNING:
									color = this.params.blink ? colors.yellow : colors.orange;
									break;
								case GatewayStatus.ERROR:
									color = this.params.blink ? colors.red : colors.black;
									break;
								case GatewayStatus.MAINTENANCE:
									color = this.params.blink ? colors.magenta : colors.pink;
									break;
								case GatewayStatus.LOST:
									color = this.params.blink ? colors.white : colors.black;
									break;
								default:
									color = colors.white;
							}

							let label = gateway.name;
							if (label.length > this.params.width) {
								label = label.substring(0, this.params.width - 3) + '...';
							}

							const screenPosition = frame.toScreenCoords(this.params.x, this.params.y);
							drawer.drawFilledRect(screenPosition.x, screenPosition.y, this.params.width, this.params.height, color);
							drawer.drawText({text: label, alignment: TextAlignment.CENTER, x1: screenPosition.x, y1: screenPosition.y, x2: screenPosition.x + this.params.width, y2: screenPosition.y + this.params.height, textColor: color == colors.white ? colors.black : colors.white, backgroundColor: color});
						},
						refresh(_frame: Frame, deltaTime: number) {
							this.params.lastBlink = (this.params.lastBlink || 0) + deltaTime;
							if (this.params.lastBlink > CONFIG.TIMING.BLINK_INTERVAL) {
								this.params.lastBlink = 0;
								this.params.blink = !this.params.blink;
								this.toDraw = true;
							}
						},
					};

					this.gatewaysFrame.addElement(element);
				}
			}
		}
	}

	/**
	 * Adds a formatted log message to the log list and manages log overflow.
	 *
	 * @param {string} message - The log message to add.
	 * @return {void} Does not return a value.
	 */
	private addLog(message: string): void {
		const time = os.date('%H:%M');
		const maxLogLength = this.logFrame.getInnerWidth() - 2;
		let text = `${time} ${message}`;
		if (text.length > maxLogLength) {
			text = text.substring(0, maxLogLength - 3) + '...';
		}
		this.logs.push(text);
		if (this.logs.length > 50) {
			this.logs.shift();
		}

		this.logFrame.markRedraw();
	}

	/**
	 * Creates and sets up log elements for rendering and interaction within a frame.
	 * The log elements handle visual output, displaying logs inside the frame.
	 *
	 * @return {void} No return value as the method modifies instance properties statefully.
	 */
	private createLogElements(): void {
		const logs = this.logs;

		const logElement: Element = {
			id: 'logs',
			toDraw: true,
			params: undefined,
			draw(frame: Frame, monitor: MonitorPeripheral) {
				const innerHeight = frame.getInnerHeight() - 2;
				const innerWidth = frame.getInnerWidth() - 1;

				for (let i = 0; i < innerHeight; i++) {
					const screenPos = frame.toScreenCoords(1, i + 1);
					monitor.setBackgroundColor(colors.black);
					monitor.setCursorPos(screenPos.x, screenPos.y);
					monitor.write(string.rep(' ', innerWidth));
				}

				for (let i = 0; i < innerHeight && i < logs.length; i++) {
					monitor.setBackgroundColor(colors.black);
					monitor.setTextColor(colors.green);
					const screenPos = frame.toScreenCoords(1, innerHeight - i);
					monitor.setCursorPos(screenPos.x, screenPos.y);
					monitor.write(logs[logs.length - 1 - i] || '');
				}
				monitor.setTextColor(colors.white);
			},
			refresh: function (_frame: framer.Frame, _deltaTime: number): void {
				return;
			},
		};

		this.logFrame.addElement(logElement);
	}

	/**
	 * Checks the status of all gateways and updates their state based on the time since they were last seen.
	 * Gateways that have exceeded the lost threshold are marked as lost.
	 * Gateways that have exceeded the remove threshold are removed from the system.
	 *
	 * @return {void} Does not return a value.
	 */
	private checkGatewaysStatus(): void {
		const currentTime = os.clock();

		for (const gateway of this.gateways) {
			const timeSinceLastSeen = currentTime - gateway.lastSeen;

			if (timeSinceLastSeen > CONFIG.TIMING.LOST_THRESHOLD &&
				timeSinceLastSeen < CONFIG.TIMING.REMOVE_THRESHOLD) {
				if (gateway.status !== GatewayStatus.LOST) {
					this.addLog(`${gateway.name} lost !`);
					gateway.status = GatewayStatus.LOST;
				}
			}

			if (timeSinceLastSeen > CONFIG.TIMING.REMOVE_THRESHOLD) {
				this.addLog(`${gateway.name} removed !`);
				this.gateways.splice(this.gateways.indexOf(gateway), 1);
				this.gatewaysFrame.removeElement(gateway.name);
				this.gatewaysFrame.markRedraw();
				this.logFrame.markRedraw();
			}
		}
	}
}

const monitor = new GatewayMonitor();
monitor.start();
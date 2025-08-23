import * as draw_utils  from '../../APIs/draw_utils';
import {TextAlignment}  from '../../APIs/draw_utils';
import * as framer      from '../../APIs/frames';
import {Element, Frame} from '../../APIs/frames';

interface Gateway {
	name: string,
	status: GatewayStatus | null,
	lastSeen: number,
}

enum GatewayStatus {
	OK          = 'OK',
	WARNING     = 'WARNING',
	ERROR       = 'ERROR',
	MAINTENANCE = 'MAINTENANCE',
	LOST        = 'LOST',
}

const MONITOR_SIDE = 'top';
const MODEM_SIDE = 'left';
const LOST_THRESHOLD = 10;
const REMOVE_THRESHOLD = 3 * LOST_THRESHOLD;
const BLINK_INTERVAL = 0.2;
const GATEWAYS_RECT_WIDTH = 16;

const monitor: MonitorPeripheral = peripheral.wrap(MONITOR_SIDE) as MonitorPeripheral || error('No monitor found');
const [monitorWidth, monitorHeight] = monitor.getSize();

const modem: ModemPeripheral = peripheral.wrap(MODEM_SIDE) as ModemPeripheral || error('No modem found');

monitor.setTextScale(0.5);
rednet.open(peripheral.getName(modem));

const yOffset = 6;

const monitorFramer = framer.MonitorFramer.getInstance();
const drawer = draw_utils.MonitorDrawer.getInstance();

monitorFramer.setMonitor(monitor);
drawer.setMonitor(monitor);
monitorFramer.clearMonitor();

const gatewaysFrame = monitorFramer.create(2, yOffset, (monitorWidth / 3) * 2 - 2, monitorHeight - yOffset, {borderColor: colors.cyan, title: 'Gateways'});
const logFrame = monitorFramer.create((monitorWidth / 3) * 2 + 1, yOffset, (monitorWidth / 3) - 1, monitorHeight - yOffset, {borderColor: colors.blue, title: 'Logs'});

const gateways: Gateway[] = [];

function getStatusColor(status: GatewayStatus, blink: boolean = false) {
	switch (status) {
		case GatewayStatus.OK:
			return colors.green;
		case GatewayStatus.WARNING:
			return blink ? colors.yellow : colors.orange;
		case GatewayStatus.ERROR:
			return blink ? colors.red : colors.black;
		case GatewayStatus.MAINTENANCE:
			return blink ? colors.magenta : colors.pink;
		case GatewayStatus.LOST:
			return blink ? colors.white : colors.black;
		default:
			return colors.white;
	}
}

function getGatewayPosition(width: number, gateway: Gateway) {
	const index = gateways.indexOf(gateway);

	const columns = math.max(1, math.floor(width / (GATEWAYS_RECT_WIDTH + 2)));

	const column = (index - 1) % columns;
	const row = math.floor((index - 1) / columns);

	const totalWidth = columns * (GATEWAYS_RECT_WIDTH + 2) - 2;
	const startX = math.floor((width - totalWidth) / 2);
	const startY = 2;

	const x = startX + column * (GATEWAYS_RECT_WIDTH + 2);
	const y = startY + row * 4;

	return {x, y};
}

function createElements() {
	if (gateways.length === 0) {
		if (gatewaysFrame.hasElement('waiting')) {
			const element: Element = {
				id: 'waiting',
				toDraw: true,
				params: {
					frames: [
						'Waiting for gateways',
						'Waiting for gateways.',
						'Waiting for gateways..',
						'Waiting for gateways...',
					],
					writeState: 0,
					lastChange: 0,
					threshold: 0.5,
				},
				draw(frame: Frame, monitor: MonitorPeripheral) {
					const y = math.floor(frame.getInnerHeight() / 2);
					const screenPosition = frame.toScreenCoords(1, y);
					monitor.setCursorPos(screenPosition.x, screenPosition.y);
					monitor.write(string.rep(' ', math.floor((frame.getInnerWidth() - this.params.frames[this.params.writeState % this.params.frames.length + 1]) / 2)));
					monitor.write(this.params.frames[this.params.writeState % this.params.frames.length + 1]);
					monitor.write(string.rep(' ', math.floor((frame.getInnerWidth() - this.params.frames[this.params.writeState % this.params.frames.length + 1]) / 2)));
					this.params.writeState++;
				},
				refresh(frame: Frame, deltaTime: number) {
					this.params.lastChange = (this.params.lastChange || 0) + deltaTime;
					if (this.params.lastChange > this.params.threshold) {
						this.params.lastChange = 0;
						this.toDraw = true;
					}
				},
			};

			gatewaysFrame.addElement(element);
		}
	} else {
		if (gatewaysFrame.hasElement('waiting')) {
			gatewaysFrame.removeElement('waiting');
		}

		const sortedGateways = gateways.sort((a, b) => (
			a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
		));

		for (const gateway of sortedGateways) {
			const element: Element = gatewaysFrame.getElement(gateway.name);
			const position = getGatewayPosition(gatewaysFrame.getWidth(), gateway);
			if (element) {
				element.params.x = position.x;
				element.params.y = position.y;
				element.params.state = gateways[gateway.name].status || GatewayStatus.OK;
				element.toDraw = true;
			} else {
				const element: Element = {
					id: gateway.name,
					toDraw: true,
					params: {
						x: position.x,
						y: position.y,
						width: GATEWAYS_RECT_WIDTH,
						height: 3,
						state: gateway.status || GatewayStatus.OK,
						lastBlink: 0,
						blink: false,
					},
					draw(frame: Frame, monitor: MonitorPeripheral) {
						const color: Color = getStatusColor(this.params.state, this.params.blink);

						let label = gateway.name;
						if (label.length > this.params.width) {
							label = label.substring(0, this.params.width - 3) + '...';
						}

						const screenPosition = frame.toScreenCoords(this.params.x, this.params.y);
						drawer.drawFilledRect(screenPosition.x, screenPosition.y, this.params.width, this.params.height, color);
						drawer.drawText({text: label, alignment: TextAlignment.CENTER, x1: screenPosition.x, y1: screenPosition.y, x2: screenPosition.x + this.params.width, y2: screenPosition.y + this.params.height});
					},
					refresh(frame: Frame, deltaTime: number) {
						this.params.lastBlink = (this.params.lastBlink || 0) + deltaTime;
						if (this.params.lastBlink > BLINK_INTERVAL) {
							this.params.lastBlink = 0;
							this.params.blink = !this.params.blink;
							this.toDraw = true;
						}
					},
				};

				gatewaysFrame.addElement(element);
			}
		}
	}
}

const logs: string[] = [];

function handleMessage(id, message) {
	if (message.type == 'status_update' && message.name) {
		const gateway = gateways.find(gateway => gateway.name == message.name);
		if (gateway) {
			gateway.status = message.status;
			gateway.lastSeen = os.clock();
		} else {
			gateways.push({
				name: message.name,
				status: message.status,
				lastSeen: os.clock(),
			});
		}
	}
}

function messageLookUp() {
	while (true) {
		const [id, message] = rednet.receive(null, 0.1);
		if (id) handleMessage(id, message);

		for (const gateway of gateways) {
			const timeSinceLastSeen = os.clock() - gateway.lastSeen;

			if (timeSinceLastSeen > LOST_THRESHOLD && timeSinceLastSeen < REMOVE_THRESHOLD) {
				gateway.status = GatewayStatus.LOST;
			}

			if (timeSinceLastSeen > REMOVE_THRESHOLD) {
				gateways.splice(gateways.indexOf(gateway), 1);
				gatewaysFrame.removeElement(gateway.name);
			}
		}

		createElements();
	}
}

const title = 'Data Center';

createElements();

const pad = (monitorWidth - 2 - title.length);
monitor.setBackgroundColor(colors.cyan);
monitor.setCursorPos(2, 2);
monitor.write(string.rep(' ', monitorWidth - 2));
monitor.setCursorPos(2, 3);
monitor.write(string.rep(' ', math.floor(pad / 2)));
monitor.write(title);
monitor.write(string.rep(' ', math.ceil(pad / 2)));
monitor.setCursorPos(2, 4);
monitor.write(string.rep(' ', monitorWidth - 2));
monitor.setBackgroundColor(colors.black);

parallel.waitForAny(monitorFramer.loop, messageLookUp);
import {RednetHelper}                 from '../../../APIs/rednet_utils';
import {SmelteryMode, SmelteryStatus} from './smeltery_enums';
import {SmelteryState}                from './smeltery_types';

const CONFIG = {
	PERIPHERALS: {
		MODEM_SIDE: 'left',
	},
} as const;

export class Smeltery {
	private rednetHelper: RednetHelper;
	private readonly size: number;
	private state: SmelteryState;
	private readonly interfaceId: number;
	private readonly frontendId: number;

	constructor(innerWidth: number, innerDepth: number, innerHeight: number, interfaceId: number, frontendId: number) {
		this.initializePeripherals();
		this.size = innerWidth * innerDepth * innerHeight;
		this.state = {
			mode: SmelteryMode.AUTO_LARGEST,
			status: SmelteryStatus.IDLE,
			fluidCapacity: this.size * 1080,
			fluidAmount: 0,
			fluidIn: [],
			itemCapacity: this.size,
			itemAmount: 0,
			itemsIn: [],
			residueTanksCount: 0,
			residueTanksDetails: [],
		};
		this.frontendId = frontendId;
		this.interfaceId = interfaceId;
	}

	private initializePeripherals(): void {
		const modem = peripheral.wrap(CONFIG.PERIPHERALS.MODEM_SIDE) as ModemPeripheral || error('No modem found');
		this.rednetHelper = new RednetHelper(modem);
	}

	private async initializeApp() {
		const isInterfaceHere = await this.rednetHelper.ping(this.interfaceId, 60);
		if (!isInterfaceHere) error('Interface hasn\'t responded');

		const isFrontendHere = await this.rednetHelper.ping(this.frontendId, 60);
		if (!isFrontendHere) error('Frontend hasn\'t responded');

		const interfaceState = await this.rednetHelper.requestInfo(this.interfaceId, 'GLOBAL_STATE', 60);
		if (!interfaceState) error('Interface hasn\'t responded');

		this.state = interfaceState;
		this.rednetHelper.sendMessage(this.frontendId, 'state_update', this.state);
	}
}
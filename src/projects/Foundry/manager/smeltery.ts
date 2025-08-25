import {SmelteryMode, SmelteryStatus} from './smeltery_enums';
import {SmelteryState}                from './smeltery_types';

export class Smeltery {
	private readonly size: number;
	private state: SmelteryState;

	constructor(innerWidth: number, innerDepth: number, innerHeight: number) {
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
	}
}
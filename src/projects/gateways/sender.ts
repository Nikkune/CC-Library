/** -------------------- TYPES & ENUMS -------------------- **/

// Possible gateway states
export enum GatewayStatus {
	OK          = 'OK',
	WARNING     = 'WARNING',
	ERROR       = 'ERROR',
	MAINTENANCE = 'MAINTENANCE',
	LOST        = 'LOST',
}

/** -------------------- CONFIGURATION -------------------- **/

const CONFIG = {
	PERIPHERALS: {
		MODEM_SIDE: 'left',
		DATACENTER_ID: 4
	}
} as const;


export function send(gatewayName: string, status: GatewayStatus, message: string = '') {
	rednet.send(CONFIG.PERIPHERALS.DATACENTER_ID, {
		type: 'status_update',
		name: gatewayName,
		status,
		message,
	})
}
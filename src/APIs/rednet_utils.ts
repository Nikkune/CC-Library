export type SendType = 'action' | 'request' | 'response' | 'status_update';

export interface PendingRequest {
	id: number;
	resolve: (info: any) => void;
	reject: () => void;
	timeout: number;
}

export class RednetHelper {
	private pendingRequests: PendingRequest[] = [];

	constructor(modem: ModemPeripheral) {
		rednet.open(peripheral.getName(modem)); // Open the modem for rednet communication
	}

	// =============================
	// Get the current pending requests
	// =============================
	public getPendingRequests(): PendingRequest[] {
		return [...this.pendingRequests]; // Return a copy to avoid direct mutation
	}

	// =============================
	// Send a simple message
	// =============================
	public sendMessage(target: number, type: SendType, data?: any) {
		rednet.send(target, {
			type,
			payload: data,
		});
	}

	// =============================
	// Send a request and wait for a response
	// =============================
	public requestInfo(target: number, data: any, timeout?: number): Promise<any> {
		timeout = timeout ?? 2;
		const requestId = math.random(1, 1e6);

		return new Promise((resolve, reject) => {
			// Store the pending request
			this.pendingRequests.push({
				id: requestId,
				resolve,
				reject,
				timeout: os.clock() + timeout!,
			});

			// Send the request
			rednet.send(target, {
				type: 'request',
				payload: {
					id: requestId,
					...data,
				},
			});
		});
	}

	// =============================
	// Handle incoming messages and responses
	// =============================
	public handleMessages() {
		while (true) {
			const [senderId, message, protocol] = rednet.receive(null, 0.1);
			if (!message) break;

			// Handle response messages
			if (message.type === 'response' && message.payload?.id) {
				const idx = this.pendingRequests.findIndex(r => r.id === message.payload.id);
				if (idx >= 0) {
					const request = this.pendingRequests[idx];
					request.resolve(message.payload.info);
					this.pendingRequests.splice(idx, 1);
				}
			}
		}

		// Check for request timeouts
		const now = os.clock();
		for (let i = this.pendingRequests.length - 1; i >= 0; i--) {
			if (this.pendingRequests[i].timeout <= now) {
				this.pendingRequests[i].reject();
				this.pendingRequests.splice(i, 1);
			}
		}
	}

	// =============================
	// Call this in the main loop
	// =============================
	public tick() {
		this.handleMessages();
	}
}
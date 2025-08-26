export type SendKey = keyof typeof SendType;
type Handler<TRequest = any, TResponse = any> = (sender: number, payload: TRequest) => TResponse | Promise<TResponse>;
type RequestOf<K extends SendKey> = (typeof SendType)[K]['request'];
type ResponseOf<K extends SendKey> = (typeof SendType)[K]['response'];
type PendingRequest = {
	callback: (msg: any) => void,
	expiresAt: number,
}

const SendType = {
	ping: {
		request: {} as {},
		response: {} as { pong: true },
	},
	get: {
		request: {} as { resource: string },
		response: {} as unknown,
	},
	put: {
		request: {} as { resource: string; data: any },
		response: {} as { ok: boolean, data?: unknown },
	},
} as const;

export class RednetSenderHelper {
	private currentId = 0;
	private pending: Map<number, PendingRequest> = new Map();

	constructor(modem: ModemPeripheral) {
		rednet.open(peripheral.getName(modem));
	}

	public listen() {
		(async () => {
			while (true) {
				const [sender, msg] = rednet.receive();
				const now = os.clock() * 1000;

				// Supprimer les requêtes expirées
				for (const [id, req] of this.pending) {
					if (req.expiresAt <= now) {
						this.pending.delete(id);
					}
				}

				// Dispatcher la réponse
				if (this.pending.has(msg.id)) {
					const req = this.pending.get(msg.id)!;
					req.callback(msg.payload);
					this.pending.delete(msg.id);
				}
			}
		})();
	}

	private nextId() {
		return ++this.currentId;
	}

	async ping(target: number, timeout = 2000): Promise<{ pong: true }> {
		const id = this.nextId();
		const now = os.clock() * 1000;
		return new Promise((resolve, reject) => {
			this.pending.set(id, {
				callback: (msg: { id: number; pong: true }) => {
					this.pending.delete(id);
					resolve(msg);
				},
				expiresAt: now + timeout,
			});
			rednet.send(target, {id, type: 'ping'});
		});
	}

	async get<T>(target: number, resource: string, timeout = 2000): Promise<T> {
		const id = this.nextId();
		const now = os.clock() * 1000;
		return new Promise((resolve, reject) => {
			this.pending.set(id, {
				callback: (msg: T) => {
					this.pending.delete(id);
					resolve(msg);
				},
				expiresAt: now + timeout,
			});

			rednet.send(target, {id, type: 'get', payload: {resource}});
		});
	}

	async put<T>(target: number, resource: string, data: object, timeout?: number): Promise<{ ok: boolean, data: T }>
	async put(target: number, resource: string, data: object, timeout = 2000): Promise<{ ok: boolean }> {
		const id = this.nextId();
		const now = os.clock() * 1000;
		return new Promise((resolve, reject) => {
			this.pending.set(id, {
				callback: (msg: { ok: boolean; data?: unknown }) => {
					this.pending.delete(id);
					resolve(msg);
				},
				expiresAt: now + timeout,
			});
			rednet.send(target, {id, type: 'put', payload: {resource, data}});
		});
	}
}

export class RednetReceiverHelper {
	private handlers: Partial<Record<keyof typeof SendType, Handler>> = {};

	constructor(modem: ModemPeripheral) {
		rednet.open(peripheral.getName(modem));
	}

	// Enregistre un handler pour un type spécifique (ping, get, put)
	on<K extends keyof typeof SendType>(type: K, handler: Handler<RequestOf<K>, ResponseOf<K>>) {
		this.handlers[type] = handler;
	}

	public listen() {
		(async () => {
			while (true) {
				const [sender, msg] = rednet.receive();

				const { id, type, payload } = msg;
				const handler = this.handlers[type as keyof typeof SendType];
				if (!handler) continue; // pas de handler enregistré, on ignore

				// Exécuter le handler (sync ou async)
				const result = await handler(sender, payload);

				// Envoyer la réponse si nécessaire
				if (result !== undefined) {
					rednet.send(sender, { id, payload: result });
				}
			}
		})();
	}
}

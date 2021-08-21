import { readdirSync } from 'fs';
import { RoomManager } from 'Room/RoomManger';
import { listen, Server, Socket } from 'socket.io';

export class SocketManager {
	public static instance: SocketManager;
	private io: Server;

	public static getInstance() {
		if (!SocketManager.instance) {
			this.instance = new SocketManager();
		}

		return this.instance;
	}

	public async init(httpServer: Express.Application) {
		this.io = listen(httpServer);
		await this.setSocketEvents();
	}

	private async setSocketEvents() {
		this.io.on('connection', async (socket) => {
			console.log('Socket Connected: ', socket.id, socket.handshake.address);
			let path = __dirname + '/event';
			let dirs = readdirSync(path);
			
			for (let dir of dirs) {
				if (dir.indexOf('js.map') === -1) {
					(await import(path + '/' + dir)).default(socket);
				}
			}
		});

		this.io.on('disconnect', async (socket: Socket) => {
			console.log('Socket Disconnected', socket.id, socket.handshake.address);
			RoomManager.getInstance().removeRoom(socket.rooms[0]);
		});
	}

	public emit(eventName: string, data: any) {
		this.io.emit(eventName, data);
	}

	public sendPacketToClient(userId: string, eventName: string, data: any) {
		this.io.sockets.connected[userId].emit(eventName, data);
	}

	public sendPacketToRoom(roomId: string, eventName: string, data: any) {
		this.io.to(roomId).emit(eventName, data);
	}
}

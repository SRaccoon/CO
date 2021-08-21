import { generate } from 'short-uuid';
import { Room } from './Room';

export class RoomManager {
	private static instance: RoomManager;
	public roomList: Map<string, Room>;

	private constructor() {
		this.roomList = new Map<string, Room>();
	}

	public static getInstance() {
		if (!RoomManager.instance) {
			RoomManager.instance = new RoomManager();
		}

		return RoomManager.instance;
	}


	public getGame(gameId: string) {
		return this.roomList.get(gameId);
	}

	public addRoom(): Room {
		let roomId = generate();
		let room = new Room(roomId);
		this.roomList.set(roomId, room);
		return room;
	}

	public removeRoom(roomId: string) {
		this.roomList.delete(roomId);
	}
}
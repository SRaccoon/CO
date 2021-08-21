import { generate } from 'short-uuid';
import { Room } from './Room';

export class RoomManager {
	private static instance: RoomManager;
	public roomList: Map<string, Room>;
	public rankList: Array<(string|number)[]>;

	private constructor() {
		this.roomList = new Map<string, Room>();
		this.rankList = new Array<(string|number)[]>();
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

	public rank(roomId: string, time: number) {
		if(!this.rankList[9]){
			this.rankList.push([roomId, time]);
		}else{
			if(this.rankList[9][1] > time){
				this.rankList.pop();
				this.rankList.push([roomId, time]);
			}
		}
		this.rankList.sort((a, b) => {
			return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
		});
	}
}
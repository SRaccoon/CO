import { Direction } from 'Config/Direction';
import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
	socket.on('move', function (data: {roomId: string, direction: Direction}) {                                 
		console.log('Event: Move', data);
		const room = RoomManager.getInstance().getGame(data.roomId);
		room.setDirection(data.direction);
	});
};
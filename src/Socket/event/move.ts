import { Direction } from 'Config/Direction';
import { Vector } from 'Resource/Vector';
import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
	socket.on('move', function (data: {roomId: string, direction: Direction, ball:Vector, wire: Vector}) {         
		try {                        
			console.log('Event: Move', data);
			const room = RoomManager.getInstance().getGame(data.roomId);
			room.setSyncData(data.direction, data.ball, data.wire);
		} catch (e) {
			console.log(e);
		}
	});
};
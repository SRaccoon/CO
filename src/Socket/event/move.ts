import { Direction } from 'Config/Direction';
import { Vector } from 'Resource/Vector';
import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
	socket.on('sync', function (data: {roomId: string, direction: Direction, ball:Vector, wire: Vector, time: number}) {         
		try {                        
			console.log('Event: Move', data);
			const start = new Date(data.time).getTime();
			const arrive = new Date().getTime();
			console.log('latency', arrive, start, arrive - start);
			const room = RoomManager.getInstance().getGame(data.roomId);
			room.sync(data.ball, data.wire, data.time);
			// room.setSyncData(data.direction, data.ball, data.wire);
		} catch (e) {
			console.log(e);
		}
	});
};
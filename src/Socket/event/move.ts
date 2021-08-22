import { Direction } from 'Config/Direction';
import moment from 'moment';
import { Vector } from 'Resource/Vector';
import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
	socket.on('sync', function (data: {roomId: string, direction: Direction, ball:Vector, wire: Vector, time: string}) {         
		try {                        
			console.log('Event: Move', data);
			const start = moment(data.time);
			const arrive = moment();
			console.log('start', start.hours(), start.minutes(), start.seconds(), start.milliseconds());
			console.log('arrive', arrive.minutes(), arrive.seconds(), arrive.milliseconds());
			console.log('latency', arrive.valueOf() - start.valueOf() + 32400000);
			const room = RoomManager.getInstance().getGame(data.roomId);
			room.sync(data.ball, data.wire, data.time);
			// room.setSyncData(data.direction, data.ball, data.wire);
		} catch (e) {
			console.log(e);
		}
	});
};
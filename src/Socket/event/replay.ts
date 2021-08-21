import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
	socket.on('replay', function (data: {roomId: string}) {         
		try {                        
			console.log('Event: Replay', data);
			const room = RoomManager.getInstance().getGame(data.roomId);
			room.render();
		} catch (e) {
			console.log(e);
		}
	});
};
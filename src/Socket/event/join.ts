import { Socket } from 'socket.io';
import { RoomManager } from 'Room/RoomManger';

export default async function (socket:Socket) {
	socket.on('join', function (data) {
		try {
			console.log('Event: Join', data);
			let room = RoomManager.getInstance().getGame(data.roomId);
			room.chooseLeft(socket.id);
			socket.join(room.getRoomId());
			room.render();
		} catch (e) {
			console.log(e);
		}
	});
};
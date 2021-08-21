import { Socket } from 'socket.io';
import { RoomManager } from 'Room/RoomManger';

export default async function (socket:Socket) {
	socket.on('join', function (data) {
		console.log('Event: Join');
		let room = RoomManager.getInstance().getGame(data.roomId);
		room.chooseLeft(socket.id);
		socket.join(room.getRoomId());
		room.render();
	});
};
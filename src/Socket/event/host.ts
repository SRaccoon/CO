import { Socket } from 'socket.io';
import { RoomManager } from 'Room/RoomManger';

export default async function (socket:Socket) {
	socket.on('host', function (data) {
		let room = RoomManager.getInstance().addRoom();

		if (data.character === 0) {
			room.setArcheologist(socket.id);
		} else if (data.character === 1) {
			room.setAssistant(socket.id);
		}

		socket.join(room.getRoomId());
        
		console.log(RoomManager.getInstance().getGame(room.getRoomId()));
		socket.emit('inviteCode', { roomId: room.getRoomId() });
	});
};
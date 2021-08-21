import { Socket } from 'socket.io';
import { RoomManager } from 'Room/RoomManger';

export default async function (socket:Socket) {
	socket.on('host', function (data) {
		try {
			console.log('Event: Host', data);
			let room = RoomManager.getInstance().addRoom();

			if (data.character === 0) {
				room.setArcheologist(socket.id);
			} else if (data.character === 1) {
				room.setAssistant(socket.id);
			}

			socket.join(room.getRoomId());
			socket.emit('inviteCode', { roomId: room.getRoomId() });
		} catch (e) {
			console.log(e);
		}
	});
};
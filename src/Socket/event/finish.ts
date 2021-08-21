import { Socket } from 'socket.io';
import { RoomManager } from 'Room/RoomManger';

export default async function (socket:Socket) {
	socket.on('finish', function (data) {
        
		RoomManager.getInstance().removeRoom(data.roomId);

	});
};
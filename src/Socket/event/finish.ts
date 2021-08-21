import { Socket } from 'socket.io';
import { RoomManager } from 'Room/RoomManger';

export default async function (socket:Socket) {
	socket.on('finish', function (data:{roomId: string; isClear: boolean; time: number}) {
		try {
			const room = RoomManager.getInstance().getGame(data.roomId);

			if (room.isPlaying()) {
				room.finishGame(data.isClear, data.time);
			}
		} catch (e) {
			console.log(e);
		}
	});
};
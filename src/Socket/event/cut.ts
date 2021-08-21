import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('cut', function (msg : {roomId : string}) {                                 
        
		const room = RoomManager.getInstance().getGame(msg.roomId);
		room.broadcast('cut', {});
	});

};
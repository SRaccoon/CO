import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('renderComplete', function (msg : {roomId : string}) {                                                 
		const room = RoomManager.getInstance().getGame(msg.roomId);
        
		if (room.check()) {
			room.start();
		}
		
	});

};
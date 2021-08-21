import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('renderComplete', function (msg : {roomId : string}) {        
		try {   
			console.log('Event: Render Complete', msg);                                      
			const room = RoomManager.getInstance().getGame(msg.roomId);
			room.increaseCount();

			if (room.check()) {
				room.start();
				room.setCount(0);
			}
		} catch (e) {
			console.log(e);
		}
	});     

};
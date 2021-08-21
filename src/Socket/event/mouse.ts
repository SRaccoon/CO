import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('mouse', function (msg : {roomId : string, x : number, y : number}) {     
		try {                            
			console.log('Event: Mouse', msg);
			const room = RoomManager.getInstance().getGame(msg.roomId);
			console.log(room);
			room.broadcast('mouse', { x: msg.x, y: msg.y });
		} catch (e) {
			console.log(e);
		}
	});

};
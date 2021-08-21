import { RoomManager } from 'Room/RoomManger';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('mouse', function (msg : {roomId : string, x : number, y : number}) {                                 
		console.log('Event: Mouse');
		const room = RoomManager.getInstance().getGame(msg.roomId);
		room.broadcast('mouse', { x: msg.x, y: msg.y });
	});

};
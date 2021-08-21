import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('mouse', function (msg : any) {                                 
		const { roomId, mouse } = msg;

		socket.to(roomId).broadcast.emit('command', mouse);
	});

};
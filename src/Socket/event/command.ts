import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('command', function (msg : any) {                                 
		const { roomId, command } = msg;

		socket.to(roomId).emit('command', command);
	});

};
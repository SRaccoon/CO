import { Direction } from 'Config/Direction';
import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
	socket.on('command', function (data: {roomId: string, direction: Direction}) {                                 
		
	});

};
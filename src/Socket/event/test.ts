import { Socket } from 'socket.io';

export default async function (socket:Socket) {
	socket.on('test', function (msg) {
		console.log('test', msg);
		socket.emit('test', { msg: 'good' });
	});
};
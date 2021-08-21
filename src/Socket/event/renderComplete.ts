import { Socket } from 'socket.io';

export default async function (socket:Socket) {
    
    socket.on('renderComplete', function (msg : any) {                                 
        const {roomId} = msg;

        socket.to(roomId).broadcast.emit('render', );
    });

};
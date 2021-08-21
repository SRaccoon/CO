import { Socket } from "socket.io";
import { RoomManager } from "Room/RoomManger";

export default async function (socket:Socket) {
    socket.on('join', function (data) {

        let room = RoomManager.getInstance().getGame(data.roomId);
        room.setAssistant(socket.id);

    });
};
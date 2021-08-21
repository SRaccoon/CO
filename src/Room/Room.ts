import { SocketManager } from 'Socket';

export class Room {
    private roomId: string;
    private host: string;
    private normal: string;

    constructor(roomId: string) {
    	this.roomId = roomId;
    }

    public getRoomId(): string {
    	return this.roomId;
    }

    public setHost(hostId: string) {
    	this.host = hostId;
    }

    public setNormal(normalId: string) {
    	this.normal = normalId;
    }

    public render() {
    	SocketManager.getInstance().sendPacketToClient(this.host, 'render', {});
    	SocketManager.getInstance().sendPacketToClient(this.normal, 'render', {});
    }

    public broadcast(messageObject: any) {
    	SocketManager.getInstance().sendPacketToRoom(this.roomId, 'command', messageObject);
    }
}
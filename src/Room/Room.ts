import { SocketManager } from 'Socket';

export class Room {
    private roomId: string;
    private archeologist: string;
    private assistant: string;

    constructor(roomId: string) {
    	this.roomId = roomId;
    }

    public getRoomId(): string {
    	return this.roomId;
    }

    public setArcheologist(archeologistId: string) {
    	this.archeologist = archeologistId;
    }

    public setAssistant(assistantId: string) {
    	this.assistant = assistantId;
    }

    public render() {
    	SocketManager.getInstance().sendPacketToClient(this.archeologist, 'render', {});
    	SocketManager.getInstance().sendPacketToClient(this.assistant, 'render', {});
    }

    public broadcast(messageObject: any) {
    	SocketManager.getInstance().sendPacketToRoom(this.roomId, 'command', messageObject);
    }
}
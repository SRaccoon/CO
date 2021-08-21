import { Direction } from 'Config/Direction';
import { SocketManager } from 'Socket';

export class Room {
    private roomId: string;
    private archeologist: string;
    private assistant: string;
    private count : number = 0;          
    private refreshTick: number;
    private direction: Direction;

    constructor(roomId: string, refreshTick: number = 500) {
    	this.roomId = roomId;
    	this.refreshTick = refreshTick;
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

    public chooseLeft(id: string) {
    	if (!this.archeologist) {
    		this.setArcheologist(id);
    	} else {
    		this.setAssistant(id);
    	}
    }

    public setDirection(direction: Direction) {
    	this.direction = direction;
    }

    public start() {
    	this.broadcast('start', {});
    	this.play();
    }

    public play() {
    	this.broadcast('move', { direction: this.direction });
    	
    	setTimeout(() => {
    		this.play();
    	}, this.refreshTick);
    }

    public render() {
    	SocketManager.getInstance().sendPacketToClient(this.archeologist, 'render', {});
    	SocketManager.getInstance().sendPacketToClient(this.assistant, 'render', {});
    }

    public broadcast(event: string, messageObject: any) {
    	SocketManager.getInstance().sendPacketToRoom(this.roomId, event, messageObject);
    }

    public increaseCount() {
    	this.count++;
    }

    public setCount(num : number) {
    	this.count = num;
    }

    public check() {
    	if (this.count === 2) return true;
    	return false;
    }
}
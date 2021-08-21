// import { Direction } from 'Config/Direction';
import { Vector } from 'Resource/Vector';
import { SocketManager } from 'Socket';

export class Room {
    private roomId: string;
    private archeologist: string;
    private assistant: string;
    private count : number = 0;          
    // private refreshTick: number;
    
    // private direction: Direction;
    // private ball: Vector;
    // private wire: Vector;

    private playFlag: boolean;

    constructor(roomId: string, refreshTick: number = 100) {
    	this.roomId = roomId;
    	// this.refreshTick = refreshTick;
    	this.playFlag = false;
    	// this.ball = { x: 0, y: 0 };
    	// this.wire = { x: 0, y: 0 };
    }

    public getRoomId(): string {
    	return this.roomId;
    }

    public getArcheologist() {
    	return this.archeologist;
    }

    public setArcheologist(archeologistId: string) {
    	this.archeologist = archeologistId;
    }

    public getAssistant() {
    	return this.assistant;
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

    // public setSyncData(direction: Direction, ball: Vector, wire: Vector) {
    // 	this.direction = direction;
    // 	this.ball = ball;
    // 	this.wire = wire;
    // }

    public start() {
    	this.broadcast('start', {});
    	this.playFlag = true;
    	// this.play();
    }

    // public play() {
    // 	this.broadcast('move', { 
    // 		direction: this.direction,
    // 		ball: this.ball,
    // 		wire: this.wire
    // 	});
    	
    // 	if (this.playFlag) {
    // 	setTimeout(() => {
    // 		this.play();
    // 	}, this.refreshTick);
    // 	}
    // }

    public render() {
    	SocketManager.getInstance().sendPacketToClient(this.archeologist, 'render', {});
    	SocketManager.getInstance().sendPacketToClient(this.assistant, 'render', {});
    }

    public sync(ball: Vector, wire: Vector) {
    	SocketManager.getInstance().sendPacketToClient(this.assistant, 'sync', { ball, wire });
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

    public isPlaying() {
    	return this.playFlag;
    }

    public finishGame(isClear: boolean, time: number) {
    	this.playFlag = false;
    	this.broadcast('finish', { isClear, time });
    }
}
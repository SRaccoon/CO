import express, { Application } from 'express';
import morgan from 'morgan';
import { Server } from 'node:http';

export class App {
	public app: Application;
	public server: Server;
	public port: number;

	constructor(port: number) {
		this.app = express();
		this.port = port;
		this.setMiddleWare();
		this.setRouter();
	}

	public async initServer() {
		await new Promise((resolve) => {
			this.server = this.app.listen(this.port, () => {
				console.log('Service Start');
				resolve(true);
			});
		});
	}

	private setMiddleWare() {
		this.app.use(morgan('dev'));
	}

	private setRouter() {
		this.app.get('/', (req, res) => {
			res.send(`Server is running on ${this.port}`);
		});
	}
}
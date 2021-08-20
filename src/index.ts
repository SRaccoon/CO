require('app-module-path').addPath(__dirname);

import { SocketManager } from 'Socket';
import { App } from './app';

setTimeout(async () => {
	let app = new App(3000);
	await app.initServer();

	let socketManager = SocketManager.getInstance();
	await socketManager.init(app.server);
}, 100);

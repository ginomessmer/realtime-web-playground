import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { ActivityItem } from './data/activity';

export class BroadcastServer {
	public static readonly PORT: number = 8282;

	private app: express.Application;
	private server: Server;
	private io: SocketIO.Server;
	private port: string | number;

	constructor() {
		this.createApp();
		this.config();
		this.createServer();
		this.sockets();
		this.listen();
	}
	
	createApp() {
		this.app = express();
	}

	config() {
		this.port = process.env.PORT || BroadcastServer.PORT;
	}

	createServer() {
		this.server = createServer(this.app);
	}

	sockets() {
		this.io = socketIo(this.server);
	}

	listen() {
		this.server.listen(this.port, () => {
			console.log('Running broadcast server on port %s', this.port);
		});

		this.io.on('connect', (socket: any) => {
			console.log('Client connected on port %s', this.port);

			socket.on('activity', (a: ActivityItem) => {
				console.log('[activity]: %s', JSON.stringify(a));
				this.io.emit('activity', a);
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected')
			});
		});
	}

	public getApp(): express.Application {
		return this.app;
	}
}
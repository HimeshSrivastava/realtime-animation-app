import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(express.json()); 

import authRoutes from "./routes/auth.routes.js";
import ConnectMongoose from './db/ConnectMongoose.js';

app.use("/api/auth", authRoutes);

const server = app.listen(process.env.PORT, () => {
    ConnectMongoose();
    console.log(`Express server running on port ${process.env.PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', 
        methods: ["GET", "POST"]
    }
});

const clients = new Map();

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('start', () => {
        if (clients.has(socket.id)) {
            clearInterval(clients.get(socket.id));
            clients.delete(socket.id);
        }
        const MAX_WIDTH = 1500;
        const MAX_HEIGHT = 100;

        let width = 0;
        let height = 0;
        let expanding = true;

        const interval = setInterval(() => {
            if (expanding) {
                width += 55;
                if (height < MAX_HEIGHT) height += 5;
                if (width >= MAX_WIDTH) expanding = false;
            } else {
                height -= 5;
                if (height <= 0) {
                    width = 0;
                    height = 0;
                    setTimeout(() => {
                        expanding = true;
                    }, 2000);
                }
            }

            const animationData = {
                x: 100,
                y: 100,
                width,
                height,
                color: '#ff0000'
            };

            socket.emit('animation', animationData);
        }, 100);

        clients.set(socket.id, interval);
    });

    socket.on('stop', () => {
        clearInterval(clients.get(socket.id));
        clients.delete(socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        clearInterval(clients.get(socket.id));
        clients.delete(socket.id);
    });
});

console.log('Socket.IO server running with REST API and WebSocket on port 8080');

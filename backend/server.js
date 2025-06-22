import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import ConnectMongoose from './db/ConnectMongoose.js';
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

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

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

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

            const animationData = { x: 100, y: 100, width, height, color: '#ff0000' };
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

console.log('Socket.IO + Redis Adapter setup complete. Scalable for multi-server!');

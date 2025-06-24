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


const pubClient = createClient({ 
   url:'redis://localhost:6379'
});
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
        const MAX_WIDTH = 1460;
        const MAX_HEIGHT = 350;

        let width = 0;
        let height = 0;
        let expanding = true;

        const interval = setInterval(() => {
            if (expanding) {
                width += 55;
                if (height < MAX_HEIGHT) height += 10;
                if (width >= MAX_WIDTH) expanding = false;
            } else {
                height -= 7;
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
    y: 200,
    width: width,
    height: height,
    gradient: {
        type: 'linear',
        direction: 'to right', 
        colors: [
            { offset: 0, color: '#00bfff' },
            { offset: 0.25, color: '#6a5acd' },
            { offset: 0.5, color: '#da70d6' },
            { offset: 0.75, color: '#ff69b4' },
            { offset: 1, color: '#ff4500' }
        ]
    },
    maskImage: `linear-gradient(
    rgba(0, 0, 0, 0.8) 8%, 
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 0%)`,
    borderRadius:'0'
};

    
    socket.emit('animation', animationData);
}, 80); 

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

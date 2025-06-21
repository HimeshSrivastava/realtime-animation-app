const { Server } = require('socket.io');
const io = new Server(8080, {
    cors: {
        origin: '*'
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

console.log('Socket.IO server running on port 8080');

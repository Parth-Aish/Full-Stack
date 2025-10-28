const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // React dev server origin
    methods: ["GET", "POST"]
  }
});

// Optional: a simple health route
app.get('/', (req, res) => res.send('Socket.io Chat Server is running'));

// In-memory message history (small, for demo)
const messages = [];

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Send existing messages to newly connected client
  socket.emit('message-history', messages);

  // When a client sends a chat message
  socket.on('chat-message', (payload) => {
    // payload should contain { name, text, time }
    const msg = {
      id: generateId(),
      name: payload.name || 'Anonymous',
      text: payload.text || '',
      time: payload.time || new Date().toISOString()
    };
    messages.push(msg);
    // keep history reasonable
    if (messages.length > 200) messages.shift();

    // Broadcast to all connected clients
    io.emit('chat-message', msg);
  });

  // Optional: handle join / leave
  socket.on('join', (name) => {
    console.log(`${name} joined (socket ${socket.id})`);
    socket.broadcast.emit('user-joined', { id: socket.id, name });
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected', socket.id, reason);
    socket.broadcast.emit('user-left', { id: socket.id });
  });
});

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

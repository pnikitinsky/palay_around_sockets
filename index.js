import express from 'express';
import socket from 'socket.io';

const app = express();
const server = app.listen(4000, () => {
  console.log('listening on port 4000')
});

// Static files
app.use(express.static('dist'));

// Socket setup
const io = socket(server);

const listenToChat = (socket) => {
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  })
}
const listenToTyping = (socket) => {
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })
}

io.on('connection', (socket) => {
  listenToChat(socket);
  listenToTyping(socket);
})


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

io.on('connection', (socket) => {
  console.log('made socket connection')
})

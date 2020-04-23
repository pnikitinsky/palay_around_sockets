import io from 'socket.io-client';
import './styles/styles.css';
import './styles/main.scss';
// make connection
const socket = io.connect('http://localhost:4000')

class ChatScreen {
  constructor() {
    this.message = document.getElementById('message');
    this.handle = document.getElementById('handle')
    this.btn = document.getElementById('send')
    this.output = document.getElementById('output')
    this.feedback = document.getElementById('feedback')
  }
  // Emit events
  addBtnEventListener = () => {
    this.btn.addEventListener('click', () => {
      socket.emit('chat', {
        message: this.message.value,
        handle: this.handle.value
      })
    })
  }

  addMessageTypingEventListener = () => {
    this.message.addEventListener('keypress', () => {
      socket.emit('typing', this.handle.value);
    })
  }

  // Listen for events
  handleChatMessage = () => {
    socket.on('chat', (data) => {
      this.output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
      this.feedback.innerHTML = '';
    })
  }
  handleMessageTyping = () => {
    socket.on('typing', (data) => {
      this.feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    })
  }

  setUpListeners = () => {
    this.addBtnEventListener();
    this.handleChatMessage();
    this.addMessageTypingEventListener();
    this.handleMessageTyping();
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  const chat = new ChatScreen();
  chat.setUpListeners();
});

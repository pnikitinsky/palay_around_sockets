// make connection
import io from 'socket.io-client';
import './styles/styles.css';
import './styles/main.scss';

const socket = io.connect('http://localhost:4000')
console.log('hello from front end')

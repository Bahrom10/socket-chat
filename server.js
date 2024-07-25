import express from "express"
const app = express();
import http from "http"
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;


app.use('/',express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    socket.emit('newMessage' , msg)
  })
  socket.on('disconnect', () => {  
    console.log('user disconnected');
    });
});

server.listen(PORT, () => {
  console.log('listening on *:3000');
});
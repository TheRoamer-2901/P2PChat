require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const connectDB = require('./connectDB'); 
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:8080', 'http://0.0.11.185:443/peerjs/id?ts=16690370902270.9016398677373085&version=1.4.7']
  }
});

const registerHandler = require('./controller/signUpController');
const { logIn, logOut, getOnlineFriendList}  = require('./controller/onlineUserController');
const { setUncaughtExceptionCaptureCallback } = require('process');

connectDB();


mongoose.connection.once("open", () => {

  console.log("db connected");

  io.on("connection", (socket) => {

    socket.on("signUp", ({ name, password }) => {
      registerHandler(name, password);
    })

    socket.on("logIn", ({ name, password}) => {
      logIn(name, password, socket);
    })

    socket.on('logOut', ({name}) => {
      logOut(name, socket);
    })

    socket.on('join-room', (roomId, userId) => {
      console.log("join id: ", userId);
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user-connected', userId)
    })


    socket.on('disconnect', () => {
      console.log("peer leaved: ", socket.id);
      socket.to(10).emit('user-disconnected', socket.id)
    })

    socket.on('getUserOnline',()=>{
      getOnlineFriendList(socket);
    })

  });
})


server.listen(3000);


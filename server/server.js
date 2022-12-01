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
const { 
  logIn, 
  logOut, 
  getOnlineFriendList,
  getUserByName,
  addFriend, 
  getUserById, 
  acceptFriendRequest
}  = require('./controller/onlineUserController');
const { 
  handleInvitation,
  getInvitation
} = require('./controller/friendController')

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

    socket.on('logOut', (name) => {
      logOut(name, socket);
    })

    socket.on('join-room', (roomId, userId) => {
      console.log("join id: ", userId);
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user-connected', userId)
    })


    socket.on('disconnect', () => {
      socket.to(10).emit('user-disconnected', socket.id)
    })

    socket.on('getUserOnline',()=>{
      getOnlineFriendList();
    })

    //return list of User has part of name equal name parameter
    socket.on('getUserByName',(name)=>{
      getUserByName(name, socket);

    })

    socket.on('addFriend',(clientId,friendId)=>{
      addFriend(clientId,friendId);
    })

    socket.on('getUserById',(Id)=>{
      getUserById(Id)
    })


    socket.on('invitation', (invitation, option) => {
      handleInvitation(invitation, option, socket)
    })

    socket.on('invitation-sent', userId => {
      getInvitation(userId, socket)
    })

    // tuple is the set of sender and receiverId, Ex:{senderId:"", receiverId:""}

    socket.on('acceptFriendRequest',(tuple)=>{
      acceptFriendRequest(tuple)
    })

  })
})


server.listen(3000);


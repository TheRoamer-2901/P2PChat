const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../model/User');

const logIn = async (userName, password, socket) => {
    const user = await User.findOne({name: userName}).exec();
    if(!user) console.log("user not exist!");
    console.log(user);
    const matchedPassword = await bcrypt.compare(password, user.password);
    if(matchedPassword) {
        await User.updateOne({name: userName}, {$set: {online: true}}).exec()
        socket.emit('loginSuccess', user);
    }
    else{
        console.log("wrong password");
    }
}

const logOut = async (userName, socket) => {
    await User.updateOne({name : userName}, {$set: {online: false}}).exec()
    const user = await User.findOne({name: userName});
    console.log(user);
}

const getOnlineFriendList = async(socket)=>{
    const onlineList = await User.find({online:true})
    console.log(onlineList)
} 
module.exports = {
    logIn,
    logOut,
    getOnlineFriendList
}
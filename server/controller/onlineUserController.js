const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../model/User');

const logIn = async (userName, password, socket) => {
    const user = await User.findOne({name: userName}).exec();
    if(!user) console.log("user not exist!");
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

const getOnlineFriendList = async()=>{
    const onlineList = await User.find({online:true})
    console.log(onlineList)
} 

const getUsersByName = async(name)=>{
    const userList = await User.find({ '$text': { '$search': name } })
    console.log(userList)
} 

const addFriend = async(clientId, friendId)=>{
    var newId = new mongoose.mongo.ObjectId(clientId);
       
        User.updateOne(
            { _id: newId},
            { $push: { friendList: friendId  } }
         ).exec()
} 

const getUserById = async(Id)=>{
        var newId = new mongoose.mongo.ObjectId(Id);
        const user = await User.find({"_id" :newId});
        console.log(user)
   
}

module.exports = {
    logIn,
    logOut,
    getUsersByName,
    addFriend,
    getUserById,
    getOnlineFriendList
}
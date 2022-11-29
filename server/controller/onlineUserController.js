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

const getOnlineFriendList = async()=>{
    const onlineList = await User.find({online:true})
    console.log(onlineList)
} 

const getUsersByName = async(name)=>{
    const userList = await User.find({ '$text': { '$search': name } })
    console.log(userList)
} 

const addFriend = async (clientId,friendId)=>{
   
        console.log("add friend");
        var newId = new mongoose.mongo.ObjectId(friendId);
        var newId2= new mongoose.mongo.ObjectId(clientId);
        var tuple ={
            senderId:clientId,
            receiverId:friendId
        }
        User.updateOne(
            { _id: newId}, 
            { $addToSet: { friendRequet: tuple } }
          
         ).exec()

         User.updateOne(
            { _id: newId2}, 
            { $addToSet: { friendRequet: tuple } }
          
         ).exec()
         
   

}

const getUserById = async(Id)=>{
        var newId = new mongoose.mongo.ObjectId(id);
        const user = await User.find({"_id" :newId});
        console.log(user)
   
}

const acceptFriendRequest = async (tuple)=>{
    console.log("accept friend");
    var senderId=tuple.senderId
    var receiverId=tuple.receiverId
    var requestId = new mongoose.mongo.ObjectId(senderId)
    var acceptId=new mongoose.mongo.ObjectId(receiverId)
    
    User.updateOne(
        { _id: requestId}, 
        { $addToSet: { friendList: receiverId  } 
    }).exec()


    User.updateOne(
        { _id: acceptId}, 
        { $addToSet: { friendList: senderId  } 
    }).exec()

    User.updateOne(
        { _id: requestId}, 
        { $pull: { friendRequet: tuple } 
    }).exec()

    User.updateOne(
        { _id: acceptId}, 
        { $pull: { friendRequet: tuple } 
    }).exec()



}

module.exports = {
    logIn,
    logOut,
    getUsersByName,
    addFriend,
    getUserById,
    acceptFriendRequest,
    getOnlineFriendList
}
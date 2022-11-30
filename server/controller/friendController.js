const User = require('../model/User')
const Invitation = require('../model/Invitation')


async function handleInvitation(invitation, option, socket) {
    const { senderId, senderName, receiverId, receiverName } = invitation
    console.log(senderId, receiverId);
    switch (option) {
        case 'new':
            await Invitation.create({
                senderId: senderId,
                senderName: senderName,
                receiverId: receiverId, 
                receiverName: receiverName
            })
            .then(() => console.log("success"))
            .catch(err => console.log(err))
            break;
        case 'accept':
            await Invitation.deleteOne({ $and: [
                {senderId: senderId},
                {receiverId: receiverId}
            ]}).exec()
            await User.updateOne(
                {_id: senderId}, { $push: {friendList: receiverId} }
            ).exec()
            await User.updateOne(
                {_id: receiverId}, { $push: {friendList: senderId} }
            ).exec()
            
            break;
        case 'deny':
            try {
                await Invitation.deleteOne({ $and: [
                    {senderId: senderId},
                    {receiverId: receiverId}
                ]}).exec()
            } catch(err) {
                console.log(err);
            }

            break;
        default: 
            break;
    }
    socket.emit('invitation-update', [senderId, receiverId])
}

async function getInvitation(userId, socket) {
    const invitations = await Invitation.find({ $or: [{senderId: userId}, {receiverId: userId}]}).exec()
    socket.emit('invitation-returned', invitations)
}

module.exports = {
    handleInvitation, 
    getInvitation
}
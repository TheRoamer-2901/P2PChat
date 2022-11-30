const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invitationSchema = new Schema({
    senderId: mongoose.Schema.Types.ObjectId,
    senderName: String,
    receiverId: mongoose.Schema.Types.ObjectId,
    receiverName: String,
})

module.exports = mongoose.model('Invitation', invitationSchema);
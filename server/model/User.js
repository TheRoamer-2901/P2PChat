const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    friendId: mongoose.Schema.Types.ObjectId,
    friendName: String,
})

const userSchema = new Schema({
    name: String,
    password: String, 
    online: {
        type: Boolean,
        default: false,
    }, 
    friendList: [friendSchema],
    messages: {
        type: [[mongoose.Schema.Types.ObjectId]],
        default: [[]]
    },
})


module.exports = mongoose.model('User', userSchema);
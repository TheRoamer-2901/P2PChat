const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String, 
    online: {
        type: Boolean,
        default: false,
    }, 
    friendList: {
        type: [String],
        default: [],
    },
    messages: {
        type: [[mongoose.SchemaType.ObjectId]],
        default: [[]]
    },
})


module.exports = mongoose.model('User', userSchema);
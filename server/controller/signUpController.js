const bcrypt = require('bcrypt');
const User = require('../model/User')

const registerHandler = async (userName, password) => {
    try {
        console.log("try register");
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt);
        await User.create({
            name: userName,
            password: encryptedPassword, 
        })
        .then(() => console.log("successfully create new user"));
    } catch(err) {
        console.log(err);
    }
}

module.exports = registerHandler
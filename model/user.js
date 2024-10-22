const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
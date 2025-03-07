const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
})

// static signup method
userSchema.statics.signup = async function(password, username, firstName, lastName) {

    // validation check
    if(!password || !username || !firstName || !lastName) {
        throw Error("All fields must be filled")
    }


    if(!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({ username })

    if(exists) {
        throw Error('Username is already in use')
    } 

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ password: hash, username, firstName, lastName })

    return user
}

// static login method
userSchema.statics.login = async function(email, password){
    
    if(!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Invalid login credentials')
    } 

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user



}

module.exports = mongoose.model('User', userSchema)

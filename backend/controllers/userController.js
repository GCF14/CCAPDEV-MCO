const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login the user
const loginUser = async (req, res) => {
    const {password, username} = req.body

    try {
        const user = await User.login(username, password)
        // create a token when logging in
        const token = createToken(user._id)
        
        res.status(200).json({username: user.username, token, _id: user._id})

    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}

// signup the user 
const signUpUser = async (req, res) => {
    console.log(req.body);
    try {
        const {password, username, firstName, lastName} = req.body
        console.log("Extracted data:", password, username, firstName, lastName);

        const pfp = `https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(username)}`;
        
        const user = await User.signup(password, username, firstName, lastName, pfp);
        

        // create a token when signing up
        const token = createToken(user._id)

        res.status(200).json({username, token})

    } catch(error) {
        res.status(400).json({error: error.message})
    }
  
    
}

// logout the user
const logoutUser = async (req, res) => {

    try {

        res.status(200).json({message: 'Logged out successfully'})

    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

// Do not edit this yet since I will check if we need it
const getUser = async (req, res) => {

    try {
        const {id} = req.params;
        const user = await User.findById(id);

        res.json(user);

    } catch(error) {
        res.status(400).json({error: error.message})
    }
  
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a user
const deleteUser = async(req, res) => {

    try {

        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error:'No such user'})
        }

        const user = await User.findOneAndDelete({_id: id})

        if(!user) {
            return res.status(400).json({error:'No such user'})
        }

        res.status(200).json({message: 'Deleted account successfully'})

    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}


module.exports = { signUpUser, loginUser, logoutUser, getUser, getAllUsers, deleteUser }
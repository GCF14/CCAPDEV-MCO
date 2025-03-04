const User = require('../models/userModel')
const mongoose = require('mongoose')


// login the user
const loginUser = async (req, res) => {

    try {

    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}

// signup the user 
const signUpUser = async (req, res) => {

    try {

    } catch(error) {
        res.status(400).json({error: error.message})
    }
  
    
}

// logout the user
const logoutUser = async (req, res) => {

    try {

    } catch(error) {
        res.status(400).json({error: error.message})
    }

}


const getUser = async (req, res) => {

    try {

    } catch(error) {
        res.status(400).json({error: error.message})
    }
  
};

// delete a user
const deleteUser = async(req, res) => {

    try {

    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}


module.exports = { signUpUser, loginUser, logoutUser, getUser, deleteUser }
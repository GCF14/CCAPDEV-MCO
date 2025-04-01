const express = require('express')

// controller
const { signUpUser, loginUser, logoutUser, getUser, getAllUsers, deleteUser, editUser } = require('../controllers/userController')

const router = express.Router()

//log in route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signUpUser)

//logout route
router.post('/logout', logoutUser)

// get user route
router.get('/:id', getUser);

// delete user route
router.delete('/:id', deleteUser)

// get all users route
router.get('/', getAllUsers)

// edit user route
router.patch('/edit/:id', editUser)

module.exports = router
//require router
const router = require('express').Router();

//import routes from user-controller
const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//Set up GET all and Post at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

//Set up GET one, PUT, and DELETE at /api/users/:id
router
.route('/:id')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser)

module.exports = router;
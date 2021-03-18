const express = require('express')
const router = express.Router()
const UserController = require('./controllers/userController')


router.route('/user')
    .get(UserController.index)
    .post(UserController.newUser)

router.route('/user/:id')
    .get(UserController.getUser)


router.route('/usercar/:userId')
    .get(UserController.getUserCar)
    .post(UserController.postUserCar)



router.route('/user/:userId/:carId')
    .all(UserController.getUserCarfordelete)



router.route('/car')
    .get(UserController.shoCars)
    .post(UserController.delcar)

router.route('/car/:id')
    .delete(UserController.deleteCar)

module.exports = router
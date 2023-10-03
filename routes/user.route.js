const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.route("/login").get(userController.loginUser);

router.route("/").get(userController.getUsers).post(userController.createUser);

router
   .route("/:id")
   .get(userController.getUserById)
   .patch(userController.updateUserById)
   .delete(userController.deleteUserById);

module.exports = router;

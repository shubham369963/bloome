const express = require("express");
const router = express.Router();
const {getAllUsers, registerController, loginController} = require("../controllers/userController.js");

router.route("/all-users").get(getAllUsers);
router.route("/register").post(registerController);
router.route("/login").post(loginController);

module.exports = router;
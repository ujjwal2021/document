const express = require("express");

const router = express.Router();


const {authenticateUser, authorizePermissions} = require("../middleware/authentication")
const {getAllUsers, getSingleUser, updateUser, showCurrentUser, updateUserPassword} = require("../controllers/userController");

router.route("/").get(authenticateUser, authorizePermissions("admin"),getAllUsers);

router.route("/me").get(authenticateUser ,showCurrentUser);

router.route("/updateuser").patch( authenticateUser, updateUser);

router.route("/updateuserpassword").post(authenticateUser,updateUserPassword);

router.route("/:id").get( authenticateUser, getSingleUser);

module.exports = router;

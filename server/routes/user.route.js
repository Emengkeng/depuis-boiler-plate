const express = require("express");
const userController = require("../controllers/user");
const {passwordControllerReset, passwordControllerForget, changePasswordController} = require("../controllers/password");
const { userValidation } = require("../validations");
const { auth, authAdmin } = require("../middlewares");

const router = express.Router();

router.post("/register", userValidation.register, userController.register);
router.post("/login", userValidation.login, userController.login);
router.post("/forgetpassword", passwordControllerForget.forgetPassword);
router.post("/resetpassword", passwordControllerReset.resetPassword);
router.post("/changepassword", changePasswordController.changePassword);
router.post("/confirmemail", userController.confirmAccount);
router.get("/auth/profile", [auth], userController.getProfile);
router.get("/getallusers", [auth, authAdmin], userController.getAllusers);

module.exports = router;

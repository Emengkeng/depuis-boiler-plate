const express = require("express");
const {
    register, 
    login,
    confirmAccount, 
    getProfile,
    getAllusers
} = require("../controllers/user/user.controller");
const resetPassword = require("../controllers/password/resetPassword.controller");
const changePassword = require("../controllers/password/changePassword.controller");
const forgetPassword = require("../controllers/password/forgetPassword.controller");
const { userValidation } = require("../validations");
const { authAdmin } = require("../middlewares/auth-admin");
const {auth} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", [userValidation.register], register);
router.post("/login", [userValidation.login], login);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword", resetPassword);
router.post("/changepassword", changePassword);
router.post("/confirmemail", confirmAccount);
router.get("/auth/profile", [auth], getProfile);
router.get("/getallusers", [auth, authAdmin], getAllusers);

module.exports = router;

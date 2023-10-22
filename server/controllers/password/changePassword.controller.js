import model from '../../models';
const catchAsync = require("../../utils/catchasync");
import {sendEmail} from '../../config/email';
const httpStatus = require("http-status");
const userService = require('../../services/users')

const changePassword = catchAsync(async(req, res) => {
    const userId = req.user.id;
    const oldPass = String(req.body.oldPassword);
    const newPass = String(req.body.newPassword);

    await userService.changePassword(userId, oldPass, newPass);

    return res.status(httpStatus.CREATED).send({
        success: true,
        message: "Password Changed successfully!",
    });

})

module.exports = changePassword;
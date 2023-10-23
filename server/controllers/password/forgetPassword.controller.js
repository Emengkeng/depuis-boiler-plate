import jwt from 'jsonwebtoken';
import model from '../../models';
const catchAsync = require("../../utils/catchasync");
import {sendEmail} from '../../config/email';
const httpStatus = require("http-status");

const forgetPassword = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors: errors.array() });
  }
  const { email } = req.body;
  console.log('email', email);
  const result = await model.Users.findOne({
    where: {
      email,
    },
  });
  if (!result) {
    res.status(httpStatus.BAD_REQUEST).send({
      message: `Sorry an Account with Email: ${email} doesn't exist`,
    });
  }
  const username = result.first_name + '' + result.last_name;

  const secret = result.password;
  const token = jwt.sign({ result }, secret, {
    expiresIn: 3600, // 1 hour
  });

  const resetPassword = `${process.env.PRODUCT_URL}/resetpassword/${result.id}-${token}`;
  
  //send Reset Password email
  let template = 'reset password';
  let locals = { resetPassword, username };
  await sendEmail(email, template, locals);
  
  return res.status(httpStatus.CREATED).send({
    success: true,
    message: "Reset Link Sent successfully!",
  });
});

module.exports = forgetPassword;

const { userService, userContact } = require("../../services/users");
const httpStatus = require("http-status");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
import model from '../../models';
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");
const catchAsync = require("../../utils/catchasync");
const UnAuthorizedError = require("../../utils/errors/unauthorized.error");


const register = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors: errors.array() });
  }
  const user = await userService.createUser(req.body);
  await userService.createProfile(user.id, user.first_name);

  return res.status(httpStatus.CREATED).send({
    success: true,
    message: "Registered successfully!",
  });
});

const login = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email);

  if (!user) {
    throw new UnAuthorizedError("Invalid email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnAuthorizedError("Invalid email or password");
  }

  if(user.isActivated == false){
    throw new UnAuthorizedError("Please Verify Your Email");
  }

  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };

  const token = jwt.sign(payload, jwtConfig.appKey, {
    expiresIn: "1h",
  });

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Logged in successfully!",
    results: payload,
    token,
  });
});

const confirmAccount = catchAsync(async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, errors: errors.array() });
  }
  const { confirm_key } = req.body.confirm_key;

  const result = await userService.verifyEmail(confirm_key);
  let username = result.first_name;
  let email = result.email;

  //save contact to email marketing and sales crm
  let FIRSTNAME = username.split(' ')[0];
  await userContact.CreateContact(email, FIRSTNAME);

  //send welcome email
  let template = 'welcome';
  let locals = { FIRSTNAME };
  await sendEmail(email, template, locals);

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Confirmed Email successfully",
    result: user,
  });
})

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getProfile(req.user);

  return res.status(httpStatus.OK).send({
    success: true,
    message: "Returned profile successfully",
    result: user,
  });
});

const getAllusers = catchAsync(async (req, res) => {
  const data = await model.Users.findAll({
  /*   include: [model.Wallets], */ //, model.Profiles, model.Cards, model.CardTypes
  });
  return res.status(httpStatus.OK).send({
    success: true,
    message: 'List of all Users',
    result: data,
  });
})

module.exports = {
  register,
  login,
  confirmAccount,
  getProfile,
  getAllusers,
};

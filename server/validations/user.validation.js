const { check } = require('express-validator');
// const db = require('../config/db')
import model from '../models'


const register = [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }).custom(value => {
      return model.Users.findOne(
        {
          where:{
            email: value
          }
        }
        )
        .then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        })}),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('gender', 'Please include a valid gender').not().isEmpty(),
    check('nationality', 'Please include a valid nationality').isAlpha(),
    check('phone', 'Please include a valid Phone number').isMobilePhone(),
]

const login = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
]

module.exports = {
    register,
    login
  };
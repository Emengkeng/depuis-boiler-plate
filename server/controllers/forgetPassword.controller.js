import jwt from 'jsonwebtoken';
import transporter from '../middlewares/transporter';
import model from '../models';
const sendMail = require('../services');

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('email', email);
    const result = await model.Users.findOne({
      where: {
        email,
      },
    });
    if (result.length < 1) {
      res.status(400).send({
        message: `Sorry an Account with Email: ${email} doesn't exist`,
      });
    } else {
      const secret = result.password;
      const token = jwt.sign({ result }, secret, {
        expiresIn: 3600, // 1 hour
      });
      const sendEmail = await sendMail.forgetPassword(email, `${process.env.APP_URL}/reset/${resetLink}`, recieverName);
      // const url = `http://localhost:8080/resetPassword/${result.id}-${token}`;
      
      return sendEmail;
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default forgetPassword;

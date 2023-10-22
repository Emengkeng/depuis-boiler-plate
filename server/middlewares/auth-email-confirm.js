const httpStatus = require("http-status");
// const db = require("../config/db");
import model from '../models';


const authConfirmEmail = async (req, res, next) => {
try {
    const user = req.user;

    const account = await model.Users.findOne({
        where: {
            id: user.id
    }
    });
    //const wallet = await db("wallets").where("user_id", user.id).first();

    if (account.isActivated == false) {
        return response.status(403).json({ message: 'Verify your email first' });
    }

    next();
    } catch (error) {
        console.error("authConfirmEmail Middleware Error ==>", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
};

module.exports = {
    authConfirmEmail,
};

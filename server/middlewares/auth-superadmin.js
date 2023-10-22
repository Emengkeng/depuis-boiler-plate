const httpStatus = require("http-status");
// const db = require("../config/db");
import model from '../models';


const authSuperAdmin = async (req, res, next) => {
try {
    const user = req.user;

    const account = await model.Users.findOne({
        where: {
            id: user.id
    }
    });
    //const wallet = await db("wallets").where("user_id", user.id).first();

    if (account.banned) {
        return response.status(403).json({ message: 'You are banned from this site.' });
    }

    if (user.role !== 'superadmin') {
        return response.status(403).json({ message: 'You are not allowed to access this resource.' });
    }
    next();
    } catch (error) {
        console.error("authSuperAdmin Middleware Error ==>", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
};

module.exports = {
    authSuperAdmin
}

// const db = require('../config/db');
import model from '../../models';
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
import { sendEmail } from '../../config/email';
import { BAD_REQUEST } from 'http-status';

/**
 * Create a new User
 * @param {Object} userData
 * @returns {Promise<user>}
 */

const createUser = async(userData) => {

    const {first_name, last_name, email, password, gender, nationality, phone} = userData

    const hashPassword = await bcrypt.hashSync(password, 10)
    const activationLink = uuid.v4();
    const username = first_name + '' + last_name;

    const user = await model.Users.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        gender: gender,
        nationality: nationality,
        phone: phone,
        activationLink: activationLink,
    })

    const confirmEmailUrl = `
    ${process.env.PRODUCT_URL}/api/v1/confirmemail/confirm_key=${activationLink}
    `
    //send verification email
    let template = 'verify email';
    let locals = { confirmEmailUrl, username };
    await sendEmail(email, template, locals);
    return user
}

/**
 * Verify users email
 * @param {Object} activationLink
 * @returns {Promise<user>}
 */

const verifyEmail = async (confirm_key) => {
    const user = await model.Users.update(
        {
            isActivated: true
        },
        {
            where: {
                activationLink: confirm_key,
            }
        }
    );
    return user;
}

const changePassword = async(userId, oldPassword, newPassword) => {
    const user = await findUserById(userId);

    if(!user){
        return res.status(BAD_REQUEST).sende({
            message: "User With This Email Does not Exist"
        })
    }
    
    if(user.password == oldPassword){
        const hashPassword = await bcrypt.hashSync(newPassword, 10)

        const newuser = await model.Users.update({
            password: hashPassword,
        }, {
            where: {
                id: userId,
            }
        })
        return newuser;
    }
    return res.status(BAD_REQUEST).sende({
        message: "Password Does Not Match"
    })
}

/**
 * Create profile For a User
 * @param {Object} data
 * @returns {Promise<profile>}
 */

const createProfile = async(UserId, firstName) => {
    const user = await findUserById(UserId);

    const profilepic = process.env.DEFAULTPROFILEPICLINK
    const profile = await model.Profiles.create({
        image: profilepic,
        userName: firstName,
        UserId: user.id,
    })

    return profile;
}

/**
 * Find User By Email
 * @param {String} email
 * @returns {Promise<user>}
 */

const findUserByEmail = async(email) => {
    const user = await model.Users.findOne({
        where: {
            email: email,
        }
    })
    // const user = await db.select('*').from('users').where('email', email).first()
    return user
}

/**
 * Find User By ID
 * @param {String} ID
 * @returns {Promise<user>}
 */

const findUserById = async(id) => {
    const user = await model.Users.findOne({
        where: {
            id: id,
        }
    })
    // const user = await db.select('*').from('users').where('email', email).first()
    return user
}


/**
 * Get Profile
 * @param {Object} userData
 * @returns {Promise<Profile>}
 */
//TODO
// Need to use the Profile model here
const getProfile = async(userData) => {
    const user = await model.Profiles.findOne({
        where: {
            UserId: userData.id,
        }
    });
    
    return user
}

module.exports = {
    createUser,
    verifyEmail,
    getProfile,
    changePassword,
    findUserById,
    createProfile,
    findUserByEmail,
};
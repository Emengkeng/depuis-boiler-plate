// const db = require('../config/db');
import model from '../models';
const bcrypt = require('bcryptjs');

/**
 * Create a new User
 * @param {Object} userData
 * @returns {Promise<User>}
 */

const createUser = async(userData) => {

    const {first_name, last_name, email, password, gender, nationality, phone} = userData

    const hashPassword = await bcrypt.hashSync(password, 10)

    const user = await model.Users.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        gender: gender,
        nationality: nationality,
        phone: phone,
    })
    //const user = await db('users').insert( {first_name, last_name, email, password: hashPassword })
    return user
}

/**
 * Create profile For a User
 * @param {Object} data
 * @returns {Promise<Profile>}
 */

const createProfile = async(UserId, firstName) => {
    const user = await model.Users.findOne({
        where: {
            id: UserId,
        }
    })

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
 * @returns {Promise<User>}
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
 * @returns {Promise<User>}
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
 * Get User balance 
 * @param {String} UserId
 * @returns {Promise<Accounts>}
 */

const getUserBalance = async(UserId) => {
    const accountDetails = await model.Accounts.findOne({
        where: { UserId: UserId },
    });

    return accountDetails;
}


/**
 * Find Wallet By Wallet Code
 * @param {String} Wallet_Code
 * @returns {Promise<Wallet>}
 */
const findWalletByWalletC = async(wallet_code) => {
    const user = await model.Wallets.findOne({
        where: {
            wallet_code: wallet_code,
        }
    });

    return user;
}

/**
 * Get Profile
 * @param {Object} userData
 * @returns {Promise<User>}
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

const giveBackUserMoney = async(UserId, amount) => {
    const accountDetails = await getUserBalance(UserId);
    const { balance } = accountDetails.dataValues;
    console.log(balance);

    // Logic check before creating card
    const amt = parseFloat(balance);
    const newAmount = amt + parseFloat(amount);

    const update = await model.Accounts.update({
        balance: newAmount,
    },{
        where: {
            UserId: UserId,
        }
    });
    
    return update;
}

const checkCard = async(UserId) => {
    const checkCard = await model.CardTypes.findOne({
        where: {
            UserId: UserId,
        },
    });

    return checkCard
}

module.exports = {
    createUser,
    findUserByEmail,
    getProfile,
    findWalletByWalletC,
    findUserById,
    getUserBalance,
    giveBackUserMoney,
    checkCard,
    createProfile,
};
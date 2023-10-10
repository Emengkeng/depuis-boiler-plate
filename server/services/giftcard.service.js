import model from '../models';
import creatCard from './creatcard.service'
const uuid = require('uuid');
const { checkCard, giveBackUserMoney } = require('./user.service')
const { sendMail } = require('./')
const httpStatus = require("http-status");

/**
 * Gift a Card 
 * @param {String} cardType
 * @param {String} userId
 * @param {String} recieverName
 * @param {String} gifterId
 * @param {Date} date
 * @returns {Promise<giftCard>}
 */

const giftCard = async ( cardType, userId, amount, recieverName, gifterId, date, cardstatus) => {
    switch (cardType) {
        case BASICC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const checkcard = await checkCard(userId);

            if (checkcard.name == 'BASICC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const cardGiftUpdate = await model.GiftCard.create({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const sendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return sendEmail;
        
        case UNLIMITEDC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const ucheckcard = await checkCard(userId);

            if (checkcard.name == 'UNLIMITEDC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const ucardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const usendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return usendEmail;
        
        
        case FAMILYC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const fcheckcard = await checkCard(userId);

            if (checkcard.name == 'FAMILYC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const fcardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const fsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return fsendEmail;
        

        case TRAVELC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const tcheckcard = await checkCard(userId);

            if (checkcard.name == 'TRAVELC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const tcardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const tsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return tsendEmail;
        

        case BUSINESSC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const bcheckcard = await checkCard(userId);

            if (checkcard.name == 'BUSINESSC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const bcardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const bsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return bsendEmail;
        

        case STUDENTC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const scheckcard = await checkCard(userId);

            if (checkcard.name == 'STUDENTC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const scardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const ssendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return ssendEmail;
        

        case CHARITYC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const ccheckcard = await checkCard(userId);

            if (checkcard.name == 'CHARITYC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const ccardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const csendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return csendEmail;
        

        case EXCLUSIVEC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const echeckcard = await checkCard(userId);

            if (checkcard.name == 'EXCLUSIVEC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const ecardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const esendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return esendEmail;
        

        case REWARDC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const rcheckcard = await checkCard(userId);

            if (checkcard.name == 'REWARD') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const rcardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const rsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return rsendEmail;
        

        case BUDGETC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const bbcheckcard = await checkCard(userId);

            if (checkcard.name == 'BUDGETC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const bbcardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                userId: gifterId,
            })

            const bbsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return bbsendEmail;
        
    
        default:
            return ("Not a valid card type");
    }
};

const rejectCard = async(amount, gifterId, activationLink, cardstatus) => {

    const check = await model.GiftCard.update({
        accepted: false,
        expiresIn: null,
        expired: true,
        status: cardstatus,
    },
        {
        where:{
            acceptLink: activationLink,
        }
    });

    const giveback = await giveBackUserMoney(gifterId, amount)

    //Todo 
    //Email to tell user his card was rejected 

    return giveback;
}


module.default = {
    giftCard,
    rejectCard,
}
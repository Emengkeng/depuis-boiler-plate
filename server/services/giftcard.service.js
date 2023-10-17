import model from '../models';
import creatCard from './creatcard.service'
const uuid = require('uuid');
const { checkCard, giveBackUserMoney } = require('./user.service')
const { sendMail } = require('./')
const httpStatus = require("http-status");

/**
 * Gift a Card 
 * @param {String} cardType
 * @param {String} UserId
 * @param {String} recieverName
 * @param {String} gifterId
 * @param {Date} date
 * @returns {Promise<giftCard>}
 */

const giftCard = async ( cardType, UserId, amount, recieverName, gifterId, date, cardstatus) => {
    switch (cardType) {
        case BASICC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const checkcard = await checkCard(UserId);

            if (checkcard.name == 'BASICC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const cardGiftUpdate = await model.GiftCards.create({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const sendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return cardGiftUpdate;
        
        case UNLIMITEDC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const ucheckcard = await checkCard(UserId);

            if (checkcard.name == 'UNLIMITEDC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const ucardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const usendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return ucardGiftUpdate;
        
        
        case FAMILYC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const fcheckcard = await checkCard(UserId);

            if (checkcard.name == 'FAMILYC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const fcardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const fsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return fcardGiftUpdate;
        

        case TRAVELC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const tcheckcard = await checkCard(UserId);

            if (checkcard.name == 'TRAVELC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const tcardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const tsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return tcardGiftUpdate;
        

        case BUSINESSC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const bcheckcard = await checkCard(UserId);

            if (checkcard.name == 'BUSINESSC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const bcardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const bsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return bcardGiftUpdate;
        

        case STUDENTC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const scheckcard = await checkCard(UserId);

            if (checkcard.name == 'STUDENTC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const scardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const ssendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return scardGiftUpdate;
        

        case CHARITYC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const ccheckcard = await checkCard(UserId);

            if (checkcard.name == 'CHARITYC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const ccardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const csendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return ccardGiftUpdate;
        

        case EXCLUSIVEC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const echeckcard = await checkCard(UserId);

            if (checkcard.name == 'EXCLUSIVEC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const ecardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const esendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return ecardGiftUpdate;
        

        case REWARDC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const rcheckcard = await checkCard(UserId);

            if (checkcard.name == 'REWARD') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const rcardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            // const rsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return rcardGiftUpdate;
        

        case BUDGETC:
            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const bbcheckcard = await checkCard(UserId);

            if (checkcard.name == 'BUDGETC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "The User Is Already Subscribed TO This Card",
                });
            }

            acceptlink = uuid.v4();

            const bbcardGiftUpdate = await model.GiftCards.creat({
                recipient: UserId,
                amount: amount,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
                status: cardstatus,
                UserId: gifterId,
            })

            //const bbsendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return bbcardGiftUpdate;
        
    
        default:
            return ("Not a valid card type");
    }
};

const rejectCard = async(amount, gifterId, activationLink, cardstatus) => {

    const check = await model.GiftCards.update({
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
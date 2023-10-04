import model from '../models';
import creatCard from './creatcard.service'
const uuid = require('uuid');
const { checkCard, hasEnoughBalance } = require('./user.service')
const { sendMail } = require('./')
const httpStatus = require("http-status");


const giftCard = async ( cardType, userId, recieverName, gifterId, date) => {
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

            const cardGiftUpdate = await model.GiftCard.creat({
                recipient: userId,
                accepted: false,
                expiresIn: date,
                expired: false,
                cardType: cardType,
                acceptLink: acceptlink,
            })

            const sendEmail = await sendMail.giftCard(user.email, `${process.env.APP_URL}/card/accept/${acceptlink}`, recieverName);

            return sendEmail;
        
        case UNLIMITEDC:
        
        case FAMILYC:

        case TRAVELC:

        case BUSINESSC:

        case STUDENTC:

        case CHARITYC:

        case EXCLUSIVEC:

        case REWARDC:

        case BUDGETC:
    
        default:
            break;
    }
};

module.default = {
    giftCard,
}
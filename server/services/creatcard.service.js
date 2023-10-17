// import { use } from 'chai';
const rave = ('../config/flutterwave_init');
import model from '../models';
const httpStatus = require("http-status");
// import { findUserByEmail, findUserById, getUserBalance } from '../services/user.service';

/**
 * Create card with flutterwave
 *
 * @param {Object} data
 * @param {String} cardType
 * @param {String} redirect_url
 * @returns {Promise<Card>}
 */
const createCard = async (data, cardType, UserId) => {
    switch(cardType){
    //Basic Card
    // Can be loaded up to 5 times
    //No freezing or withdrawals allowed. 
    //- Creation fee of $5 and no monthly fee.
        case "BASICC":
            loadable = 5

            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const checkCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (checkCard.name == 'BASICC' || checkCard.expired == false) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            const cardTypeUpdate = await model.CardTypes.create({
                    name: cardType,
                    loadable: loadable,
                    creationFee: parseFloat(5),
                    monthlyFee: parseFloat(0),
                    UserId: UserId,
            });
            const cardfee = await model.CardFees.create({
                monthlyFee: parseFloat(0),
                UserId: UserId,
                CardTypeId: cardTypeUpdate.id,
            })

                //Create card
            const response = await rave.VirtualCards.create(data);
            const { id } = response;

            //create card table on our db
            const cardUpdate = await model.Cards.create({
                cardIds: id,
                UserId: UserId,
                CardTypeId: cardTypeUpdate.id
            });

            return(response);



    //Unlimited Card
    //Load as many times as you need
    //Freeze and withdraw with ease. 
    //- Creation fee of $15 and $5 monthly fee.
        case "UNLIMITEDC":

            // Check if user is already subscribed to that card.
            // and if so, refuse to create duplicate
            const ucheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (ucheckCard.name == 'UNLIMITEDC' || checkCard.expired == false) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            const ucardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(15),
                monthlyFee: parseFloat(5),
                UserId: UserId,
            });

            const ucardfee = await model.CardFees.create({
                monthlyFee: parseFloat(5),
                UserId: UserId,
                CardTypeId: ucardTypeUpdate.id,
            })

            //Create card
            const uresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const ucardUpdate = await model.Cards.create({
                cardIds: uresponse.id,
                UserId: UserId,
                CardTypeId: ucardTypeUpdate.id
            });
            return(uresponse)


    //Shared Card
    //Loadable multiple times by all shared users. 
    //- No freezing or withdrawals allowed. 
    //- Creation fee of $12, $3 monthly fee.
    //- Set Limits, expiration dates,
    //- Simplify process by allowing multiple users share the fees. 
    // Include notes and attachments for approver to review
        case "SHAREDC":

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const fcheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (fcheckCard.name == 'SHAREDC' || checkCard.expired == false) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            const fcardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                creationFee: parseFloat(12),
                monthlyFee: parseFloat(3),
                UserId: UserId,
            });

            const fcardfee = await model.CardFees.create({
                monthlyFee: parseFloat(3),
                UserId: UserId,
                CardTypeId: fcardTypeUpdate.id,
            })

            //Create card
            const fresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const fcardUpdate = await model.Cards.create({
                cardIds: fresponse.id,
                UserId: UserId,
                CardTypeId: fcardTypeUpdate.id
            });

            return(fresponse)
            

    //Travel Card
    //Loadable multiple times. 
    //- Freeze and withdraw from this card. 
    //- Creation fee of $8 and $1 monthly fee.
        case "TRAVELC": 

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const tcheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (tcheckCard.name == 'TRAVELC' || checkCard.expired == false) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            const tcardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(8),
                monthlyFee: parseFloat(1),
                UserId: UserId,
            });

            const tcardfee = await model.CardFees.create({
                monthlyFee: parseFloat(1),
                UserId: UserId,
                CardTypeId: tcardTypeUpdate.id,
            })

            //Create card
            const tresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const tcardUpdate = await model.Cards.create({
                cardIds: tresponse.id,
                UserId: UserId,
                CardTypeId: tcardTypeUpdate.id
            });
            return(tresponse)

        default:
            return ("Not a valid card type");
    }

}

module.exports = {
    createCard,
}
import { use } from 'chai';
import rave from '../config/flutterwave_init';
import model from '../models';
const httpStatus = require("http-status");
import fee from '../config/cardfee';
import { findUserByEmail, findUserById, getUserBalance } from '../services/user.service';

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

            if (checkCard.name == 'BASICC' || checkCard.expired == true) {
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

            // Update card type model with card id
/*                 await model.CardType.update(
                {
                CardId: cardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('cardUpdate', cardUpdate); */

            //
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

            if (ucheckCard.name == 'UNLIMITEDC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const uaccount = await hasEnoughBalance(UserId, fee.UNLIMITEDC);
            if(!uaccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

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

            // Update card type model with card id
/*                 await model.CardType.update(
                {
                CardId: ucardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('ucardUpdate', ucardUpdate); */
            return(uresponse)


    //Family Card
    //Loadable multiple times. 
    //- No freezing or withdrawals allowed. 
    //- Creation fee of $12, $3 monthly fee.
    //- Set Limits, expiration dates,
    //- Simplify process by allowing Family members 
    // and friends to request cards in app
    // Include notes and attachments for approver to review
        case "FAMILYC":

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const fcheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (fcheckCard.name == 'FAMILYC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

           /*  //Have to scrutinice this again 
            // Check if user has enough balance
            const faccount = await hasEnoughBalance(UserId, fee.FAMILYC);
            if(!faccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }
 */

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

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                CardId: fcardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('fcardUpdate', fcardUpdate); */
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

            if (tcheckCard.name == 'TRAVELC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const taccount = await hasEnoughBalance(UserId, fee.TRAVELC);
            if(!taccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            //Else
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

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                CardId: tcardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('tcardUpdate', tcardUpdate); */
            return(tresponse)

    //Business Card
    //Unlimited loading capabilities. 
    //- Freeze and withdraw with ease. 
    //- Enhanced transaction features for business needs. 
    //- Creation fee of $20 and $5 monthly fee.
        case "BUSINESSC":

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const bcheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (bcheckCard.name == 'BUSINESSC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const baccount = await hasEnoughBalance(UserId, fee.BUSINESSC);
            if(!baccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            const bcardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(20),
                monthlyFee: parseFloat(5),
                UserId: UserId,
            });

            const bcardfee = await model.CardFees.create({
                monthlyFee: parseFloat(5),
                UserId: UserId,
                CardTypeId: bcardTypeUpdate.id,
            })

            //Create card
            const bresponse = await rave.VirtualCards.create(data);
            
            //create card table on our db
            const bcardUpdate = await model.Cards.create({
                cardIds: bresponse.id,
                UserId: UserId,
                CardTypeId: bcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                CardId: bcardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('bcardUpdate', bcardUpdate); */
            return(bresponse)

    //Student Card
    //Loadable multiple times. 
    //- No freezing or withdrawals allowed. 
    //- Creation fee of $5 (waived for students) and no monthly fee.
        case "STUDENTC":

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const scheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (scheckCard.name == 'STUDENTC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const saccount = await hasEnoughBalance(UserId, fee.STUDENTC);
            if(!saccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            const scardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                creationFee: parseFloat(5),
                monthlyFee: parseFloat(0),
                UserId: UserId,
            });

            const scardfee = await model.CardFees.create({
                monthlyFee: parseFloat(0),
                UserId: UserId,
                CardTypeId: scardTypeUpdate.id,
            })

            //Create card
            const sresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const scardUpdate = await model.Cards.create({
                cardIds: sresponse.id,
                UserId: UserId,
                CardTypeId: scardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: scardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            ); */

/*                 console.log('scardUpdate', scardUpdate); */
            return(sresponse)


    //Charity Card
    //- A portion of the fees goes to charity. 
    //- Loadable multiple times. 
    //- Freeze and withdraw with ease. 
    //- Creation fee of $8, $2 monthly fee (50% of the fee goes to charity).
        case "CHARITYC":

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const ccheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (ccheckCard.name == 'CHARITYC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const caccount = await hasEnoughBalance(UserId, fee.CHARITYC);
            if(!caccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            const ccardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(8),
                monthlyFee: parseFloat(2),
                UserId: UserId,
            });

            const ccardfee = await model.CardFees.create({
                monthlyFee: parseFloat(2),
                UserId: UserId,
                CardTypeId: ccardTypeUpdate.id,
            })

            //Create card
            const cresponse = await rave.VirtualCards.create(data);
            
            //create card table on our db
            const ccardUpdate = await model.Cards.create({
                cardIds: cresponse.id,
                UserId: UserId,
                CardTypeId: ccardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: ccardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('ccardUpdate', ccardUpdate); */
            return(cresponse)

    
    //Exclusive Card
    //Limited edition design and privileges. 
    //- Loadable multiple times. 
    //- Freeze and withdraw with ease. 
    //- Creation fee of $25 and $10 monthly fee.
        case "EXCLUSIVEC":

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const echeckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (echeckCard.name == 'EXCLUSIVEC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const eaccount = await hasEnoughBalance(UserId, fee.EXCLUSIVEC);
            if(!eaccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            const ecardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(25),
                monthlyFee: parseFloat(10),
                UserId: UserId,
            });

            const ecardfee = await model.CardFees.create({
                monthlyFee: parseFloat(10),
                UserId: UserId,
                CardTypeId: ecardTypeUpdate.id,
            })

            //Create card
            const eresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const ecardUpdate = await model.Cards.create({
                cardIds: eresponse.id,
                UserId: UserId,
                CardTypeId: ecardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: ecardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('ecardUpdate', ecardUpdate); */
            return(eresponse)


    //Reward Card
    //Earn points and exclusive rewards with each transaction
    // Not Loadable . 
    //- No freezing or withdrawals allowed. 
    //- Free, Base on the points you've earn.
    //Only an admin can issue it
        case "REWARDC":
            //TODO
            //Make sure only admin can create this card


            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const rcheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (rcheckCard.name == 'REWARDC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const raccount = await hasEnoughBalance(UserId, fee.REWARDC);
            if(!raccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            const rcardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                creationFee: parseFloat(0),
                monthlyFee: parseFloat(0),
                UserId: UserId,
            });

            const rcardfee = await model.CardFees.create({
                monthlyFee: parseFloat(0),
                UserId: UserId,
                CardTypeId: rcardTypeUpdate.id,
            })

            //Create card
            const rresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const rcardUpdate = await model.Cards.create({
                cardIds: rresponse.id,
                UserId: UserId,
                CardTypeId: rcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: rcardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('rcardUpdate', rcardUpdate); */
            return(rresponse)

    //Budget Card
    //Control your spending with predefined limits
    //- Loadable multiple times within the set limit. 
    //- No freezing or withdrawals allowed. 
    //- Creation fee of $8 and $1 monthly fee.
        case "BUDGETC":
            //TODO
            //Add budget controls setting
            // either on the DB or here

            // Check if user is already subscribed to that card
            // anf if so, refuse to create duplicate
            const bbcheckCard = await model.CardTypes.findOne({
                where: {
                    UserId: UserId,
                },
                });

            if (bbcheckCard.name == 'BUDGETC' || checkCard.expired == true) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            /* //Have to scrutinice this again 
            // Check if user has enough balance
            const bbaccount = await hasEnoughBalance(UserId, fee.BUDGETC);
            if(!bbaccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            } */

            const bbcardTypeUpdate = await model.CardTypes.create({
                name: cardType,
                uloadable: true,
                creationFee: parseFloat(8),
                monthlyFee: parseFloat(1),
                UserId: UserId,
            });

            const bbcardfee = await model.CardFees.create({
                monthlyFee: parseFloat(1),
                UserId: UserId,
                CardTypeId: bbcardTypeUpdate.id,
            })

            //Create card
            const bbresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const bbcardUpdate = await model.Cards.create({
                cardIds: bbresponse.id,
                UserId: UserId,
                CardTypeId: bbcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: bbcardUpdate.id,
                },
                {
                    where: {
                        UserId,
                    },
                }
            );

            console.log('bbcardUpdate', bbcardUpdate); */
            return(bbresponse)

        default:
            return ("Not a valid card type");
    }

}

module.exports = {
    createCard,
}
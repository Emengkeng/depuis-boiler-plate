import { use } from 'chai';
import rave from '../config/flutterwave_init';
import model from '../models';
const httpStatus = require("http-status");
import fee from '../config/cardfee';
import { findUserByEmail, findUserById, getUserBalance, hasEnoughBalance } from '../services/user.service';

/**
 * Create card with flutterwave
 *
 * @param {Object} data
 * @param {String} cardType
 * @param {String} redirect_url
 * @param {Boolean} gifted
 * @param {String} gifterId
 * @returns {Promise<Card>}
 */
const createCard = async (data, cardType, userId, gifted, gifterId) => {
    switch(cardType){
    //Basic Card
    // Can be loaded up to 5 times
    //No freezing or withdrawals allowed. 
    //- Creation fee of $5 and no monthly fee.
        case "BASICC":
            loadable = 5

            // Check if user is already subscribed to that card
            // and if so, refuse to create duplicate
            const checkCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (checkCard.name == 'BASICC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            //Checks if it is gift card 
            if(gifted == true){
                const cardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    loadable: loadable,
                    creationFee: parseFloat(5),
                    monthlyFee: parseFloat(0),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const cardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(0),
                    userId: userId,
                    cardTypeId: cardTypeUpdate.id,
                })

                //Create card
                const response = await rave.VirtualCards.create(data);
                const { id } = response;

                //create card table on our db
                const cardUpdate = await model.Card.create({
                    cardIds: id,
                    userId: userId,
                    cardTypeId: cardTypeUpdate.id
                });

                return(response);
            }

            const cardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    loadable: loadable,
                    creationFee: parseFloat(5),
                    monthlyFee: parseFloat(0),
                    userId: userId,
            });
            const cardfee = await model.CardFee.create({
                monthlyFee: parseFloat(0),
                userId: userId,
                cardTypeId: cardTypeUpdate.id,
            })

                //Create card
            const response = await rave.VirtualCards.create(data);
            const { id } = response;

            //create card table on our db
            const cardUpdate = await model.Card.create({
                cardIds: id,
                userId: userId,
                cardTypeId: cardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.CardType.update(
                {
                CardId: cardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const ucheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (ucheckCard.name == 'UNLIMITEDC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const uaccount = await hasEnoughBalance(userId, fee.UNLIMITEDC);
            if(!uaccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true) {
                const ucardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    isFreezable: true,
                    isWithdrawable: true,
                    creationFee: parseFloat(15),
                    monthlyFee: parseFloat(5),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const ucardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(5),
                    userId: userId,
                    cardTypeId: ucardTypeUpdate.id,
                })

                //Create card
                const uresponse = await rave.VirtualCards.create(data);
                

                //create card table on our db
                const ucardUpdate = await model.Card.create({
                    cardIds: uresponse.id,
                    userId: userId,
                    cardTypeId: ucardTypeUpdate.id
                });
                
                return(uresponse);
            }

            const ucardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(15),
                monthlyFee: parseFloat(5),
                userId: userId,
            });

            const ucardfee = await model.CardFee.create({
                monthlyFee: parseFloat(5),
                userId: userId,
                cardTypeId: ucardTypeUpdate.id,
            })

            //Create card
            const uresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const ucardUpdate = await model.Card.create({
                cardIds: uresponse.id,
                userId: userId,
                cardTypeId: ucardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.CardType.update(
                {
                CardId: ucardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const fcheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (fcheckCard.name == 'FAMILYC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const faccount = await hasEnoughBalance(userId, fee.FAMILYC);
            if(!faccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const fcardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    creationFee: parseFloat(12),
                    monthlyFee: parseFloat(3),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const fcardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(3),
                    userId: userId,
                    cardTypeId: fcardTypeUpdate.id,
                })
                //Create card
                const fresponse = await rave.VirtualCards.create(data);
                

                //create card table on our db
                const fcardUpdate = await model.Card.create({
                    cardIds: fresponse.id,
                    userId: userId,
                    cardTypeId: fcardTypeUpdate.id
                });

                return (fresponse);
            }

            const fcardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                creationFee: parseFloat(12),
                monthlyFee: parseFloat(3),
                userId: userId,
            });

            const fcardfee = await model.CardFee.create({
                monthlyFee: parseFloat(3),
                userId: userId,
                cardTypeId: fcardTypeUpdate.id,
            })

            //Create card
            const fresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const fcardUpdate = await model.Card.create({
                cardIds: fresponse.id,
                userId: userId,
                cardTypeId: fcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                CardId: fcardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const tcheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (tcheckCard.name == 'TRAVELC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const taccount = await hasEnoughBalance(userId, fee.TRAVELC);
            if(!taccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const tcardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    isFreezable: true,
                    isWithdrawable: true,
                    creationFee: parseFloat(8),
                    monthlyFee: parseFloat(1),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const tcardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(1),
                    userId: userId,
                    cardTypeId: tcardTypeUpdate.id,
                })
                //Create card
                const tresponse = await rave.VirtualCards.create(data);
                

                //create card table on our db
                const tcardUpdate = await model.Card.create({
                    cardIds: tresponse.id,
                    userId: userId,
                    cardTypeId: tcardTypeUpdate.id
                });
                return (tresponse);
            }

            //Else
            const tcardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(8),
                monthlyFee: parseFloat(1),
                userId: userId,
            });

            const tcardfee = await model.CardFee.create({
                monthlyFee: parseFloat(1),
                userId: userId,
                cardTypeId: tcardTypeUpdate.id,
            })

            //Create card
            const tresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const tcardUpdate = await model.Card.create({
                cardIds: tresponse.id,
                userId: userId,
                cardTypeId: tcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                CardId: tcardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const bcheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (bcheckCard.name == 'BUSINESSC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const baccount = await hasEnoughBalance(userId, fee.BUSINESSC);
            if(!baccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const bcardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    isFreezable: true,
                    isWithdrawable: true,
                    creationFee: parseFloat(20),
                    monthlyFee: parseFloat(5),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const bcardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(5),
                    userId: userId,
                    cardTypeId: bcardTypeUpdate.id,
                })

                //Create card
                const bresponse = await rave.VirtualCards.create(data);
                
                //create card table on our db
                const bcardUpdate = await model.Card.create({
                    cardIds: bresponse.id,
                    userId: userId,
                    cardTypeId: bcardTypeUpdate.id
                });
                return (bresponse);
            }

            //Else
            const bcardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(20),
                monthlyFee: parseFloat(5),
                userId: userId,
            });

            const bcardfee = await model.CardFee.create({
                monthlyFee: parseFloat(5),
                userId: userId,
                cardTypeId: bcardTypeUpdate.id,
            })

            //Create card
            const bresponse = await rave.VirtualCards.create(data);
            
            //create card table on our db
            const bcardUpdate = await model.Card.create({
                cardIds: bresponse.id,
                userId: userId,
                cardTypeId: bcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                CardId: bcardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const scheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (scheckCard.name == 'STUDENTC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const saccount = await hasEnoughBalance(userId, fee.STUDENTC);
            if(!saccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const scardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    creationFee: parseFloat(5),
                    monthlyFee: parseFloat(0),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const scardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(0),
                    userId: userId,
                    cardTypeId: scardTypeUpdate.id,
                })

                //Create card
                const sresponse = await rave.VirtualCards.create(data);
                
                //create card table on our db
                const scardUpdate = await model.Card.create({
                    cardIds: sresponse.id,
                    userId: userId,
                    cardTypeId: scardTypeUpdate.id
                });
                return (sresponse);
            }

            //Else
            const scardTypeUpdate = await model.CardType.create({
                name: cardType,
                creationFee: parseFloat(5),
                monthlyFee: parseFloat(0),
                userId: userId,
            });

            const scardfee = await model.CardFee.create({
                monthlyFee: parseFloat(0),
                userId: userId,
                cardTypeId: scardTypeUpdate.id,
            })

            //Create card
            const sresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const scardUpdate = await model.Card.create({
                cardIds: sresponse.id,
                userId: userId,
                cardTypeId: scardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: scardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const ccheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (ccheckCard.name == 'CHARITYC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const caccount = await hasEnoughBalance(userId, fee.CHARITYC);
            if(!caccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const ccardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    isFreezable: true,
                    isWithdrawable: true,
                    creationFee: parseFloat(8),
                    monthlyFee: parseFloat(2),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const ccardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(2),
                    userId: userId,
                    cardTypeId: ccardTypeUpdate.id,
                })
                
                //Create card
                const cresponse = await rave.VirtualCards.create(data);
                
                //create card table on our db
                const ccardUpdate = await model.Card.create({
                    cardIds: cresponse.id,
                    userId: userId,
                    cardTypeId: ccardTypeUpdate.id
                });
                return (cresponse);
            }

            //Else
            const ccardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(8),
                monthlyFee: parseFloat(2),
                userId: userId,
            });

            const ccardfee = await model.CardFee.create({
                monthlyFee: parseFloat(2),
                userId: userId,
                cardTypeId: ccardTypeUpdate.id,
            })

            //Create card
            const cresponse = await rave.VirtualCards.create(data);
            
            //create card table on our db
            const ccardUpdate = await model.Card.create({
                cardIds: cresponse.id,
                userId: userId,
                cardTypeId: ccardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: ccardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const echeckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (echeckCard.name == 'EXCLUSIVEC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                });
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const eaccount = await hasEnoughBalance(userId, fee.EXCLUSIVEC);
            if(!eaccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const ecardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    isFreezable: true,
                    isWithdrawable: true,
                    creationFee: parseFloat(25),
                    monthlyFee: parseFloat(10),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const ecardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(10),
                    userId: userId,
                    cardTypeId: ecardTypeUpdate.id,
                })
                //Create card
                const eresponse = await rave.VirtualCards.create(data);
                
                //create card table on our db
                const ecardUpdate = await model.Card.create({
                    cardIds: eresponse.id,
                    userId: userId,
                    cardTypeID: ecardTypeUpdate.id
                });
                return (eresponse);

            }

            //Else
            const ecardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                isFreezable: true,
                isWithdrawable: true,
                creationFee: parseFloat(25),
                monthlyFee: parseFloat(10),
                userId: userId,
            });

            const ecardfee = await model.CardFee.create({
                monthlyFee: parseFloat(10),
                userId: userId,
                cardTypeId: ecardTypeUpdate.id,
            })

            //Create card
            const eresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const ecardUpdate = await model.Card.create({
                cardIds: eresponse.id,
                userId: userId,
                cardTypeID: ecardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: ecardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const rcheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (rcheckCard.name == 'REWARDC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const raccount = await hasEnoughBalance(userId, fee.REWARDC);
            if(!raccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const rcardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    creationFee: parseFloat(0),
                    monthlyFee: parseFloat(0),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const rcardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(0),
                    userId: userId,
                    cardTypeId: rcardTypeUpdate.id,
                })

                //Create card
                const rresponse = await rave.VirtualCards.create(data);
                
                //create card table on our db
                const rcardUpdate = await model.Card.create({
                    cardIds: rresponse.id,
                    userId: userId,
                    cardTypeId: rcardTypeUpdate.id
                });
                return (rresponse);
            }

            //Else
            const rcardTypeUpdate = await model.CardType.create({
                name: cardType,
                creationFee: parseFloat(0),
                monthlyFee: parseFloat(0),
                userId: userId,
            });

            const rcardfee = await model.CardFee.create({
                monthlyFee: parseFloat(0),
                userId: userId,
                cardTypeId: rcardTypeUpdate.id,
            })

            //Create card
            const rresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const rcardUpdate = await model.Card.create({
                cardIds: rresponse.id,
                userId: userId,
                cardTypeId: rcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: rcardUpdate.id,
                },
                {
                    where: {
                        userId,
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
            const bbcheckCard = await model.CardType.findOne({
                where: {
                    userId: userId,
                },
                });

            if (bbcheckCard.name == 'BUDGETC') {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "ALready Subscribed To This Card",
                }); 
            }

            //Have to scrutinice this again 
            // Check if user has enough balance
            const bbaccount = await hasEnoughBalance(userId, fee.BUDGETC);
            if(!bbaccount){
                return res.status(403).json({
                    message: 'Not Enough Balance to Create Card',
                });
            }

            //Checks if it is gift card 
            if(gifted == true ){
                const bbcardTypeUpdate = await model.CardType.create({
                    name: cardType,
                    uloadable: true,
                    creationFee: parseFloat(8),
                    monthlyFee: parseFloat(1),
                    userId: userId,
                    isGift: true,
                    giftedBy: gifterId,
                });

                const bbcardfee = await model.CardFee.create({
                    monthlyFee: parseFloat(1),
                    userId: userId,
                    cardTypeId: bbcardTypeUpdate.id,
                })
                //Create card
                const bbresponse = await rave.VirtualCards.create(data);
                
                //create card table on our db
                const bbcardUpdate = await model.Card.create({
                    cardIds: bbresponse.id,
                    userId: userId,
                    cardTypeId: bbcardTypeUpdate.id
                });
                return (bbresponse);
            }

            //Else
            const bbcardTypeUpdate = await model.CardType.create({
                name: cardType,
                uloadable: true,
                creationFee: parseFloat(8),
                monthlyFee: parseFloat(1),
                userId: userId,
            });

            const bbcardfee = await model.CardFee.create({
                monthlyFee: parseFloat(1),
                userId: userId,
                cardTypeId: bbcardTypeUpdate.id,
            })

            //Create card
            const bbresponse = await rave.VirtualCards.create(data);
            

            //create card table on our db
            const bbcardUpdate = await model.Card.create({
                cardIds: bbresponse.id,
                userId: userId,
                cardTypeId: bbcardTypeUpdate.id
            });

            // Update card type model with card id
/*                 await model.cardType.update(
                {
                cardId: bbcardUpdate.id,
                },
                {
                    where: {
                        userId,
                    },
                }
            );

            console.log('bbcardUpdate', bbcardUpdate); */
            return(bbresponse)
    }

}

module.exports = {
    createCard,
}
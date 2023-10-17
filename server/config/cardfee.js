require('dotenv/config');

const fee = {
    BASICC: process.env.BASICC ,
    UNLIMITEDC: process.env.UNLIMITEDC ,
    SHAREDC: process.env.SHAREDC ,
    TRAVELC: process.env.TRAVELC ,
    /* BUSINESSC: process.env.BUSINESSC ,
    STUDENTC: process.env.STUDENTC ,
    CHARITYC: process.env.CHARITYC ,
    EXCLUSIVEC: process.env.EXCLUSIVEC ,
    REWARDC: process.env.REWARDC ,
    BUDGETC: process.env.BUDGETC ,
*/
}; 


module.exports = {
    fee,
}


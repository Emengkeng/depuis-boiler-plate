//const db = require('../../removed/db');
import model from '../models';
/* 
* Need to do detail testing to make sure this feature is working correctly
*/

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

//Sort Transaction data in a page format
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

/**
 * Get Transactions
 * @param {Object} transactionData
 * @returns {Promise<transactions>}
 */

const getTransactions = async (transactionData) => {

    const { limit, offset } = getPagination(transactionData.page, transactionData.limit);

    const transactions = await model.Transactions.findAll({
        limit: limit,
        offset: offset,
        where: {
            UserId: transactionData.UserId,
        },
    })
        .then(data => {
            const response = getPagingData(data, page, limit);
            return (response);
        })
        .catch(err => {
            return ({
                message: "Some error occurred while retrieving transactions."
            });
        })
    //const transactions = await db("transactions").where("user_id", transactionData.UserId).orderBy("id", "desc").paginate({ perPage: transactionData.limit, currentPage: transactionData.page, isLengthAware: true });
    return transactions;
};

module.exports = {
    getTransactions,
};
// const db = require("../config/db");
import model from '../models';
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const { makePayment, verifyPayment, withdrawPayment } = require("../helpers/payment.helpers");
require("dotenv/config");
const { findUserByEmail, findWalletByWalletC, findUserById } = require("./user.service");
//const banks = require("../helpers/json/banks.json");
import rave from '../config/flutterwave_init';
const NotFoundError = require("../utils/errors/notfound.error");
const BadRequestError = require("../utils/errors/badrequest.error");

/**
 * Create Wallet
 * @param {Integer} userID
 * @returns {Promise<Wallet>}
 */

const createWallet = async (userID) => {
  const user = await model.Users.findOne({
    where: {
      id: userID,
    }
  })

  //const user = await db.select("*").from("users").where("id", userID).first();

  const generatedWalletCode = randomstring.generate({
    length: 7,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  const wallet = await model.Wallet.create({
    userId: user.id,
    wallet_code: generatedWalletCode,
  })
/*   const wallet = await db("wallets").insert({
    user_id: user.id,
    wallet_code: generatedWalletCode,
  }); */
  return wallet;
};

/**
 * Set Wallet Pin
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */

const setWalletPin = async (walletData) => {
  const user = walletData.user;
  const pin = walletData.pin.toString();

  const hashPin = await bcrypt.hashSync(pin, 10);

  const wallet = await model.Wallet.findOne({
    where: {
      userId: user.id
    }
  })
  if (!wallet.wallet_pin){
    await model.Wallet.update(
      {
        wallet_pin: hashPin,
      },
      {
        where: {
          userId: user.id,
        },
      },
    );
  }


/*   const wallet = await db("wallets").where("user_id", user.id).first();
  if (!wallet.wallet_pin) {
    await db("wallets").where("user_id", user.id).update({ wallet_pin: hashPin });
  } */
  return wallet;
};

/**
 * Fund Wallet
 * @param {Object} walletData
 * @returns {String} paymentLink
 */

const fundWallet = async (walletData) => {
  const user = walletData.user;
  const amount = walletData.amount;
  const frontendBaseUrl = walletData.frontend_base_url;

  let appUrl;
  if (!frontendBaseUrl) {
    appUrl = process.env.APP_URL ? process.env.APP_URL : "http://localhost:3000";
  } else {
    appUrl = frontendBaseUrl;
  }

  return makePayment(amount, user, `${appUrl}/wallet/verify`, "Wallet Funding");
};

/**
 * Verify Wallet Funding
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */

const verifyWalletFunding = async (walletData) => {
  const user = walletData.user;

  const payment = await verifyPayment(walletData.transaction_id);

  if (payment.customer.email !== user.email) {
    return Promise.reject({
      success: false,
      message: "Could not verify payment",
    });
  }

  // Make sure to not put duplicate data
  await model.Transaction(async (trx) => {
    const transaction = await trx.findOne({
      where: {
        userId: user.id,
        transaction_code: payment.id,
      }
    })
    //const transaction = await trx("transactions").where("user_id", user.id).where("transaction_code", payment.id).first();

    //Update User balance
    if (!transaction) {
      await model.Wallet.increment(
        'balance',
        {
          by: payment.amount,
        },
        {
          where: {
            userId: user.id
          },
        }
      )
      // await trx("wallets").where("user_id", user.id).increment("balance", payment.amount);

      // Create new transaction
      await trx.create({
        userId: user.id,
        transaction_code: payment.id,
        transaction_reference: payment.tx_ref,
        amount: payment.amount,
        description: "Wallet Funding",
        status: payment.status,
        payment_method: payment.payment_type,
        is_inflow: true,
      },)
    }
  });

  return payment;
};

/**
 * Transfer Fund
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */

const transferFund = async (walletData) => {
  const sender = walletData.user;
  const walletCodeOrEmail = walletData.wallet_code_or_email;
  const amount = walletData.amount;
  const walletPin = walletData.wallet_pin;

  let recipient;
  if (walletCodeOrEmail.includes("@")) {
    recipient = await findUserByEmail(walletCodeOrEmail)
    //recipient = await db("users").where("email", walletCodeOrEmail).first();
  } else {
    const recipientWallet = await findWalletByWalletC(walletCodeOrEmail)
    //const recipientWallet = await db("wallets").where("wallet_code", walletCodeOrEmail).first();

    const recipientID = recipientWallet?.userId || null;
    
    recipient = await findUserById(recipientID)
    //recipient = await db("users").where("id", recipientID).first();
  }

  if (!recipient) {
    throw new NotFoundError("Recipient not found");
  }

  if (sender.id === recipient.id) {
    throw new BadRequestError("You cannot transfer fund to yourself");
  }

  const senderWallet = await model.Wallet.findOne({
    where: {
      userId: sender.id,
    }
  })
  //const senderWallet = await db("wallets").where("user_id", sender.id).first();

  if (amount == 0) {
    throw new BadRequestError("Invalid Amount");
  }

  if (senderWallet.balance < amount) {
    throw new BadRequestError("Insufficient Fund");
  }

  // Check if wallet pin is correct
  const match = await bcrypt.compare(walletPin, senderWallet.wallet_pin);

  if (!match) {
    throw new BadRequestError("Incorrect Pin");
  }

  const generatedTransactionReference = randomstring.generate({
    length: 10,
    charset: "alphanumeric",
    capitalization: "uppercase",
  });

  const generatedTransactionCode = randomstring.generate({
    length: 7,
    charset: "numeric",
  });

  await transaction(async () => {
    // Deduct from sender wallet
    await model.Wallet.decrement(
      'balance',
      {
        by: amount,
      },
      {
        where: {
          userId: sender.id
        }
      }
    );
    //await trx("wallets").where("user_id", sender.id).decrement("balance", amount);


    // save the transaction
    await model.Transaction.create({
      userId: sender.id,
      transaction_code: generatedTransactionCode,
      transaction_reference: `PID-${generatedTransactionReference}`,
      amount: amount,
      description: "Fund Transfer",
      status: "successful",
      payment_method: "wallet",
      is_inflow: false,
    },
    );

    // Add to recipient wallet
    await model.Wallet.increment(
      'balance',
      {
        by: amount
      },
      {
        where: {
          userId: recipient.id,
        },
      }
      
    )
    //await trx("wallets").where("user_id", recipient.id).increment("balance", amount);


    // save the transaction
    await model.Transaction.create({
      userId: recipient.id,
      transaction_code: generatedTransactionCode,
      transaction_reference: `PID-${generatedTransactionReference}`,
      amount: amount,
      description: "Fund Transfer",
      status: "successful",
      payment_method: "wallet",
      is_inflow: true,
    });
  });
};

/**
 * Withdraw Fund
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */

const withdrawFund = async (walletData) => {
  const user = walletData.user;
  const bankCode = walletData.bank_code;
  const accountNumber = walletData.account_number;
  const amount = walletData.amount;
  const walletPin = walletData.wallet_pin;

  const userWallet = await model.Wallet.findOne({
    where: {
      userId: user.id,
    }
  })
  //const userWallet = await db("wallets").where("user_id", user.id).first();

  if (userWallet.balance < amount) {
    throw new BadRequestError("Insufficient Fund");
  }

  // Check if wallet pin is correct
  const match = await bcrypt.compare(walletPin, userWallet.wallet_pin);

  if (!match) {
    throw new BadRequestError("Incorrect Pin");
  }

  const payment = await withdrawPayment(amount, bankCode, accountNumber);

  const amountToDeduct = payment.amount + payment.fee;

  await transaction(async () => {
    // Deduct from user wallet
    await model.Wallet.decrement(
      'balance',
      {
        by:amountToDeduct,
      },
      {
        where: {
          userId: user.id
        }
      }
    )
    //await trx("wallets").where("user_id", user.id).decrement("balance", amountToDeduct);

    // save the transaction for the amount withdrew
    await model.Transaction.create({
      userId: user.id,
      transaction_code: payment.id,
      transaction_reference: payment.reference,
      amount: payment.amount,
      description: "Fund Withdrawal",
      status: "successful",
      payment_method: "bank transfer",
      is_inflow: false,
    });

    // save the transaction for the fee of amount withdrew
    await model.Transaction.create({
      userId: user.id,
      transaction_code: payment.id,
      transaction_reference: payment.reference,
      amount: payment.fee,
      description: "Fund Withdrawal Fee",
      status: "successful",
      payment_method: "bank transfer",
      is_inflow: false,
    });
  });
};

/**
 * Get Wallet Balance
 * @param {Object} walletData
 * @returns {Promise<Wallet>}
 */

const getWalletBalance = async (walletData) => {
  const user = walletData.user;
  const wallet = await model.Wallet.findOne({
    where: {
      userId: user.id,
    }
  })
  //const wallet = await db("wallets").where("user_id", user.id).first();

  return wallet;
};

/**
 * Get Banks
 * @returns {Array} banks - array of banks
 */

const getBanks = async () => {
  try {
		const response = await rave.Misc.getBanks(rave);
		return(response);
	} catch (error) {
		return (error);
	}
};

module.exports = {
  createWallet,
  setWalletPin,
  fundWallet,
  verifyWalletFunding,
  transferFund,
  withdrawFund,
  getWalletBalance,
  getBanks,
};

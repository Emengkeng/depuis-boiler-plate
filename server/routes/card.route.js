import express from 'express';
import cardController from '../controllers/card.controller';
const { auth } = require("../middlewares/auth");
const { cardValidation } = require('../validations')

const router = express.Router();

router.get('/card/listcard', cardController.list_Vcard);

router.post('/card/createcard', [auth, cardValidation.createCard], cardController.create_Vcard);

//still need working in controller
router.post('/card/fundcard', [auth], cardController.fund_Vcard);

router.post('/card/pay', [auth], cardController.pay_Vcard);

    // Get a single card by id
router.get('/card/getcard', [auth], cardController.get_Vcard);

router.get('/card/fetch_transcard', [auth], cardController.fetch_trans_Vcard);

router.post('/card/withdraw', [auth], cardController.withdraw_funds);

router.post('/card/freezecard', [auth], cardController.freeze_card);

router.post('/card/giftcard', [auth], cardController.gift_card);

router.post('/card/acceptcard', [auth], cardController.accept_gift_card);

router.post('/card/rejectgift', [auth], cardController.reject_gift_card);


module.exports = router;
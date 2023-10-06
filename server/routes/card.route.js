import express from 'express';
import cardController from '../controllers/card';
const { auth } = require("../middlewares/auth");
const { cardValidation } = require('../validations')

const router = express.Router();

router.get('/list_Vcard', cardController.list_Vcard);

router.post('/create_Vcard', [auth, cardValidation.createCard], cardController.create_Vcard);

//still need working in controller
router.post('/fund_Vcard', [auth], cardController.fund_Vcard);

router.post('/pay', [auth], cardController.pay_Vcard);

    // Get a single card by id
router.get('/get_Vcard', [auth], cardController.get_Vcard);

router.get('/fetch_trans_Vcard', [auth], cardController.fetch_trans_Vcard);

router.post('/withdraw', [auth], cardController.withdraw_funds);

router.post('/freeze_card', [auth], cardController.freeze_card);

router.post('/gift_card', [auth], cardController.gift_card)



module.export = router;
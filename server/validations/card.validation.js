const { check } = require("express-validator");

const createCard = [
    check("amount", "Amount is required")
        .not()
        .isEmpty()
        .isInt()
        .withMessage("Pin must contain only numbers"),
    check("billing_name", "Billing Amount is required")
        .not()
        .isEmpty(),
    check("billing_address", "Please include a valid billing address")
        .not()
        .isEmpty(),
    check("billing_city", "Please include a valid billing address")
        .not()
        .isEmpty(),
    check("billing_state", "Please include a valid billing state")
        .not()
        .isEmpty(),
    check("billing_postal_code", "Please include a valid billing postal code")
        .not()
        .isEmpty(),
    check("billing_country", "Please include a valid billing country")
        .not()
        .isEmpty(),
    check("first_name", "Please include a valid first name")
        .not()
        .isEmpty(),
    check("last_name", "Please include a valid last name")
    .not()
        .isEmpty(),
    check("date_of_birth", "Please include a valid date of birth")
        .not()
        .isEmpty(),
    check("email", "Please include a valid email")
        .not()
        .isEmpty(),
    check("phone", "Please include a valid phone")
        .not()
        .isEmpty(),
    check("title", "Please include a valid title")
        .not()
        .isEmpty(),
    check("gender", "Please include a valid gender")
        .not()
        .isEmpty(),
    check("cardtype", "Please include a valid cardtype")
        .not()
        .isEmpty(),
]

module.exports = {
    createCard,
}
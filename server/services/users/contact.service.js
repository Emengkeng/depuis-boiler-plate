import {SibContactsApi, createContact} from '../../config/sendinblue.js'
// Save signed up user's email to sendinblue
// called in createUser in services/users/user.service.js verifyEmail()
const CreateContact = async (email, FIRSTNAME) => {
    const listId = parseInt(process.env.SendInBlue_ListId);

    const contact = {
        attributes: {
        FIRSTNAME
        },
        listIds: [listId],
        email
    };

    await SibContactsApi.createContact(contact).catch((err) => console.log(err));
};

//update sib email when user updates account email
//called in Services/auth/authentication.js updateEmail()
const UpdateContact = async (email, oldEmail) => {
    const updateContact = {
        attributes: {
        Email: email
        }
    };

    await SibContactsApi.updateContact(oldEmail, updateContact).catch((err) => console.log(err));
    return;
};

module.exports = {
    CreateContact,
    UpdateContact,
}

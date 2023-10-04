import transporter from '../middlewares/transporter';
const httpStatus = require("http-status");

const giftCard = async(email, url, fullName ) => {
    const mailOptions = {
        from: 'douglasjoseph166@gmail.com',
        to: email,
        subject: 'Gift Card',
        html: `Hello ${fullName}, 
                <br>
                <br>
                There was a request to Gift you a Card
                <br>
                <br>
                Please click on the button below to get accept This Card
                <br>
                <br>
                <a href='${url}'><button>Accept Card</button></a>
                <br>
                <br>
                If you do not want this card, just ignore this email as nothing has changed.
                <br>
                <br>
                Best Regards,
                <br>
                The Depuis Team!`,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Failed to send Gift Card Link',
        });
        } else {
            return res.status(httpStatus.OK).json({
            status: 'success',
            message: `A gift card acceptance link has been sent to ${email}`,
        });
        }
    });
};

const forgotPassword = async(email, url, fullName ) => {
    const mailOptions = {
        from: 'douglasjoseph166@gmail.com',
        to: email,
        subject: 'FORGOT PASSWORD',
        html: `Hello ${result.fullName}, 
                <br>
                <br>
                There was a request to reset your password
                <br>
                <br>
                Please click on the button below to get a new password
                <br>
                <br>
                <a href='${url}'><button>Reset Password</button></a>
                <br>
                <br>
                If you did not make this request, just ignore this email as nothing has changed.
                <br>
                <br>
                Best Regards,
                <br>
                The Depuis Team!`,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Failed to send Gift Card Link',
        });
        } else {
            return res.status(httpStatus.OK).json({
            status: 'success',
            message: `A gift card acceptance link has been sent to ${email}`,
        });
        }
    });
};

module.exports = {
    giftCard,
    forgotPassword
}
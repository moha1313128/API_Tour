const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",                          //process.env.EMAIL_HOST,
        port: 2525,                                        //process.env.EMAIL_PORT,
        auth: {
            user: "277166fcca3803",                        //process.env.EMAIL_USERNAME,
            pass: "5f368cd5488d39",                    //process.env.EMAIL_PASSWORD
        }
    });
    // 2) Define the email options
    const mailOptions = {
        from: 'WebDevMa <webdevma@webdevma.ma>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
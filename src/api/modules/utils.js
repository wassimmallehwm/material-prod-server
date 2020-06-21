import jwt from 'jsonwebtoken';
import { config } from '../../config/env/dev';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const getJWTToken = (payload) => {
    return jwt.sign(payload, config.secretKey, {expiresIn: '1d'});
}

export const encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
}

export const sendEmail = (mailOptions) => {
    mailOptions.from = config.mailConfig.sender;
    let transporter = nodemailer.createTransport({
        host: config.mailConfig.host,
        port: config.mailConfig.port,
        secure: config.mailConfig.secure,
        requireTLS: config.mailConfig.requireTLS,
        auth: {
            user: config.mailConfig.sender,
            pass: config.mailConfig.passwd
        }
    });

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    transporter.close();
}

export const resetPasswordMailTemplate = (name, token) => {
    return "<div style='height: 100%;width: 100%;background-color: #ffffff;text-align: center;'>" +
        // "<img style='width: 100px; height: 100px' alt='logo' src='https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-chat-free-buckle-png-image-image_1338272.jpg'>" +
        "<h2 style='color:#ff4081'> Hello " + name + "</h2><br>" +
        "<div style='height: 50px;background-color: #005368;width: 250px;font-size: 20px;text-align: center;margin: auto;border-radius: 1px;'>" +
        "<a style='text-decoration: none;color: white;height: 100%;line-height: 45px;'" +
        " target='_blank' href='" + config.frontUrl + "/reset-password/" + token +
        "'>Reset your Password</a></div></div>";
}

// export const validationMailTemplate = (firstname, lastname, token) => {
//     return "<div style='height: 100%;width: 100%;background-color: #005368;text-align: center;'>" +
//         // "<img style='width: 100px; height: 100px' alt='logo' src='https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-chat-free-buckle-png-image-image_1338272.jpg'>" +
//         "<h2 style='color:white'> Hello " + firstname + " " + lastname + "</h2><br>" +
//         "<div style='height: 50px;background-color: #B3F983;width: 250px;font-size: 20px;text-align: center;margin: auto;border-radius: 5px;'>" +
//         "<a style='background-color: #B3F983;text-decoration: none;color: white;height: 100%;line-height: 45px;'" +
//         " target='_blank' href='" + config.frontEndUrl + "/validate/" + token +
//         "'>Activate your account</a></div></div>";
// }
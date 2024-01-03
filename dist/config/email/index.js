"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailtrapConfig = exports.emailConfig = void 0;
exports.emailConfig = {
    from: process.env.EMAIL_SENDER,
    subject: 'Simplists - Vérification de votre email',
};
exports.mailtrapConfig = {
    host: process.env.MAILTRAP_EMAIL_HOST || '',
    port: 587,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailtrapConfig = exports.emailConfig = void 0;
exports.emailConfig = {
    from: process.env.EMAIL_SENDER,
    subject: 'Le code de vérification de votre email', // Subject line
};
exports.mailtrapConfig = {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'c8504c6817c425',
        pass: process.env.MAILTRAP_PASSWORD,
    },
};

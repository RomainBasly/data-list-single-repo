"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailtrapConfig = exports.emailConfig = void 0;
exports.emailConfig = {
    from: process.env.EMAIL_SENDER,
    subject: 'Le code de vérification de votre email',
};
exports.mailtrapConfig = {
    host: process.env.MAILTRAP_EMAIL_HOST,
    port: parseInt((_a = process.env.MAILTRAP_EMAIL_PORT) !== null && _a !== void 0 ? _a : '2525', 10),
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
    },
};

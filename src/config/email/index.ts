export const emailConfig = {
  from: process.env.EMAIL_SENDER,
  subject: 'Simplists - Vérification de votre email',
};

export const mailtrapConfig = {
  host: process.env.MAILTRAP_EMAIL_HOST,
  port: parseInt(process.env.MAILTRAP_EMAIL_PORT ?? '2525', 10),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
};

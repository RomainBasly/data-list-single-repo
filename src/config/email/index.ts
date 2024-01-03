export const emailConfig = {
  from: process.env.EMAIL_SENDER,
  subject: 'Simplists - Vérification de votre email',
};

export const mailtrapConfig = {
  host: process.env.MAILTRAP_EMAIL_HOST || '',
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
};

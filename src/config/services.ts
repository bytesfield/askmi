import dotenv from 'dotenv';

dotenv.config();

type mailgun = { secret: string, domain: string };
type email = { host: string, username: string, password: string, port: string | number }

const services: { mailgun: mailgun, email: email, saltRounds: number } = {
    mailgun: {
        secret: process.env.MAILGUN_SECRET || 'MAILGUN_SECRET',
        domain: process.env.MAILGUN_DOMAIN || 'MAILGUN_DOMAIN'
    },
    email: {
        host: process.env.EMAIL_HOST || 'EMAIL_HOST',
        username: process.env.EMAIL_USERNAME || 'EMAIL_USERNAME',
        password: process.env.EMAIL_PASSWORD || 'EMAIL_PASSWORD',
        port: process.env.EMAIL_PORT || 587
    },
    saltRounds: 10,
};

export default services;

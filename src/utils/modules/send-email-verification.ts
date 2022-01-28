
import { NextFunction, Request, Response } from 'express';
import path from "path";
import config from "../../config";
import { EmailService } from '../../api/services/email.service';

type verificationDataType = {
    baseUrl: string, userId: number, token: string
}

const send = async (email: string, verificationData: verificationDataType): Promise<EmailService> => {

    //Get the absolute path to the view template with the file extension specified.
    let emailVerificationPath = path.resolve('./src/views/email/auth/emailVerification.ejs');

    //Email Verification Data
    const emailFrom: string = `${config.app.name} <${config.service.email.username}>`;

    const emailSubject: string = "Your Activation Link for YOUR APP";

    const emailTemplate: { name: string, engine: string, context: verificationDataType } = {
        name: emailVerificationPath,
        engine: 'ejs',
        context: verificationData
    }

    //Send Email Verification link
    const emailService = new EmailService();

    return await emailService.from(emailFrom).to(email).subject(emailSubject).template(emailTemplate).send();
}

export default { send }
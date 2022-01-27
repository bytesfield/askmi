import jwt from "jsonwebtoken";
import { EmailInterface } from "../../interfaces/email.interface";
import nodemailer from "../../utils/modules/nodemailer";

export class EmailService implements EmailInterface {
    recipient!: string;
    sender!: string;
    emailSubject!: string;
    emailMessage!: string;
    emailTemplate!: object;

    public from(email: string): this {
        this.sender = email;
        return this;
    }

    public to(email: string): this {
        this.recipient = email;
        return this;
    }

    public subject(subject: string): this {
        this.emailSubject = subject;
        return this;
    }

    public message(message: string): this {
        this.emailMessage = message;
        return this;
    }

    public template(template: object): this {
        this.emailTemplate = template;
        return this;
    }

    public async send(): Promise<any> {

        const emailData = {
            from: this.sender,
            to: this.recipient,
            subject: this.emailSubject,
            text: 'text',
            template: this.emailTemplate
        };
        console.log(this.sender, this.recipient, this.emailSubject);
        return await nodemailer.mailgunService.sendMail(emailData);

    }

}
import { EmailInterface } from "../../interfaces/email.interface";
import nodemailer from "../../utils/modules/nodemailer";

export class EmailService implements EmailInterface {
    recipient!: string;
    sender!: string;
    emailSubject!: string;
    emailMessage!: string;
    emailTemplate!: object;

    /**
     * Gets Sender Email
     * 
     * @param {string} email 
     * @returns {this}
     */
    public from(email: string): this {
        this.sender = email;
        return this;
    }
    /**
     * Gets Recipient Email
     * 
     * @param {string} email 
     * @returns {this}
     */
    public to(email: string): this {
        this.recipient = email;
        return this;
    }

    /**
     * Gets Email Subject
     * 
     * @param {string} subject 
     * @returns {this}
     */
    public subject(subject: string): this {
        this.emailSubject = subject;
        return this;
    }

    /**
     * Gets Email Message
     * 
     * @param {string} message 
     * @returns {this}
     */
    public message(message: string): this {
        this.emailMessage = message;
        return this;
    }

    /**
     * Gets Email Template
     * 
     * @param {object} template 
     * @returns {this}
     */
    public template(template: object): this {
        this.emailTemplate = template;
        return this;
    }

    /**
     * Sends the Actual Email
     * 
     * @returns {Promise<any>}
     */
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
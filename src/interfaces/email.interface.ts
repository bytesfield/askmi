export interface EmailInterface {
    recipient: string;
    sender: string;
    emailSubject: string;
    emailMessage: string;
    emailTemplate: object;
    from(email: string): this;
    to(email: string): this;
    subject(subject: string): this;
    message(message: string): this;
    template(template: object): this;
    send(): Promise<any>;


}
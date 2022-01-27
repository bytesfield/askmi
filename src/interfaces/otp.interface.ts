export interface OtpInterface {
    generateOtp(token: string, email: string): Promise<string>;

}
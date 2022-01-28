export interface OtpInterface {
    findOtpByUserId(id: number): Promise<string>;
    findOtpByEmail(email: string): Promise<string>;
    findOtpByMultiple(obj: object): Promise<string>;
    deleteOtp(id: number): Promise<boolean>;
    generateOtp(token: string, email: string): Promise<string>;

}
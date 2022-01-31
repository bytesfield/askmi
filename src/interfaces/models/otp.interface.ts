
export interface BaseOtpInterface {
  id: number;
  email: string;
  token: string;
  expiresAt: Date;
}

export interface OtpInterface extends BaseOtpInterface {
  createdAt?: Date;
  updatedAt?: Date;
  findOtpByUserId?(id: number): Promise<OtpInterface>;
  findOtpByEmail?(email: string): Promise<OtpInterface>;
  findOtpByMultiple?(obj: object): Promise<OtpInterface>;
  deleteOtp?(id: number): Promise<boolean>;
  generateOtp?(token: string, email: string): Promise<OtpInterface>;
}

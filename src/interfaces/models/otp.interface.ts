
export interface BaseOtpInterface {
  id: number;
  email: string;
  token: string;
  expiresAt: Date;
}

export interface OtpInterface extends BaseOtpInterface {
  createdAt?: Date;
  updatedAt?: Date;
}

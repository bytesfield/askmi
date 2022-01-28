declare namespace Express {
  interface Request {
    user?: any;
  }

  interface verificationDataType {
    baseUrl: string, userId: string, token: string
  }
}

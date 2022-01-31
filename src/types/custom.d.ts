export type vote = 'up' | 'down';

export type verificationDataType = {
    baseUrl: string, userId: number, token: string
}

export type generateTokenData = {
    payload: UserModelInterface; token: string;
}

export type verifyTokenData = {
    verified: boolean; decoded: any;
}
export type responseDataType = {
    status: boolean,
    statusCode: number,
    message: string,
    data?: {}
    headers?: {}
}

export type mailgun = { secret: string, domain: string };
export type email = { host: string, username: string, password: string, port: string | number }
export type redis = { url: string }


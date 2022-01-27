export interface JwtInterface<T> {
    createToken(tokenData: object, tokenSecret: T, tokenExpiry: T): Promise<string>;

}
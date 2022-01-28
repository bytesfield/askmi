import { Request, Response, NextFunction } from "express";
import db from "../database/models";

export interface AuthInterface {
    register(req: Request, res: Response, next: NextFunction): Promise<typeof db.User>;
    login(req: Request, res: Response, next: NextFunction): Promise<object>;
    verifyAccount(req: Request, res: Response, next: NextFunction, user: typeof db.User): Promise<boolean>
}
import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import cors from "cors";
import cookieSession from "cookie-session";
import config from "../src/config";
import routes from "./routes";
import ExceptionHandler from "../src/api/middlewares/ExceptionHandler";
import { HttpException } from "../src/api/exceptions";


const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.use(
    cookieSession({
        secret: config.cookie.secret,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: false,
    })
);

app.use(routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(`Requested path ${req.path} not found.`, 404));
});

app.use(ExceptionHandler);

export default app;
import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import cors from "cors";
import cookieSession from "cookie-session";
import config from "../src/config";
import routes from "./routes";
import ExceptionHandler from "./api/middlewares/exception-handler.middleware";
import { HttpException } from "../src/api/exceptions";


const app = express();

app.set('view engine', 'ejs');

app.use(express.json()); //recognizes request objects as JSON
app.use(express.urlencoded({ extended: true })); //parses urlencoded bodies
app.use(compression()); //compress response bodies for all request that traverse through it
app.use(cors()); //made sure all request comes from the origin

app.use(
    cookieSession({
        secret: config.cookie.secret, //string which will be used as single key if keys is not provided
        maxAge: 1000 * 60 * 60 * 24 * 14, //In milliseconds how it will last 
        httpOnly: true, //not be available to client javascript
        secure: false, // if the cookie is only set over http(s).
    })
);

app.use(routes);

//return 404
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(`Requested path ${req.path} not found.`, 404));
});

app.use(ExceptionHandler); //use exception handlers

export default app;
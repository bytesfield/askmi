import express, { Request, Response, NextFunction } from "express";
import compression from "compression";
import cors from "cors";
import cookieSession from "cookie-session";
import config from "../src/config";


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

export default app;
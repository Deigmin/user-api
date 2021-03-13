import express, { Express } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

let app: Express = express();

declare module "express-session" {
    interface Session {
        token: string
    }
}

app.use(session({
    secret: "secret key",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api-token-auth", authRouter);
app.use("/api/v1/users", usersRouter);

export = app;

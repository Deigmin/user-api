import express, { Express } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { isAuth } from "./isAuth.js";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

let app: Express = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api-token-auth", authRouter);
// @ts-ignore
app.use("/api/v1/users", isAuth, usersRouter);

export = app;

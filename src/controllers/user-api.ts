import { NextFunction, Request, Response } from "express";
import { AuthService } from "../models/auth";

export namespace Auth {
    export async function auth(req: Request, res: Response, next: NextFunction) {
        try {
            let token = await AuthService.login(req.body.username, req.body.password);
            return res.status(200).json(JSON.stringify(token)).end();
        } catch (e) {
            return res.json(JSON.stringify({error: e.message})).status(500).end();
        }
    }
}

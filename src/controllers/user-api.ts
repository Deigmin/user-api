import { NextFunction, Request, Response } from "express";

export namespace Auth {
    export function auth(req: Request, res: Response, next: NextFunction) {
        console.log(req);
    }
}

import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http2";
import { User } from "./db/connection";
import { Op } from "sequelize";
import { IGetUserAuthInfoRequest } from "./definitions";

export async function isAuth(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    interface IDecoded {
        data: { id: number, username: string }
    }

    let headers: IncomingHttpHeaders = req.headers;
    let token: string | undefined = headers.authorization;

    if (!token) {
        res.json({message: "Must be a valid key to perform that action"}).end();
    } else {
        let secretKey: string = "Sup3R_sEcrEt_Key3";

        try {
            let decoded: IDecoded = <IDecoded>jwt.verify(token, secretKey);

            let id = decoded.data.id;
            let username = decoded.data.username;

            let user: User | null = await User.findOne({
                where: {
                    [Op.and]: [{id: id}, {username: username}]
                }
            });

            if (!user) {
                res.status(401).end();
            } else {
                req.currentUser = user;
                return next();
            }
        } catch (e) {
            res.json({message: "You need login first"}).end();
        }
    }

}


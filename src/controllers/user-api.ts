import { NextFunction, Request, Response } from "express";
import { AuthService } from "../models/auth";
import { UserModel } from "../models/user-interaction";
import { IUser, User } from "../db/connection";

export namespace Auth {
    export async function auth(req: Request, res: Response, next: NextFunction) {
        try {
            let token = await AuthService.login(req.body.username, req.body.password);
            return res.status(200).json(JSON.stringify(token)).end();
        } catch (e) {
            return res.json(JSON.stringify({ error: e.message })).status(500).end();
        }
    }
}

export namespace UserInteraction {
    export async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let users: User[] = await UserModel.getAllUsers();
            return res.status(200).json(JSON.stringify(users)).end();
        } catch (e) {
            return res.json(JSON.stringify({error: e.message})).status(500).end();
        }
    }

    export async function signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token = await UserModel.signUp(req.body);
            return res.status(200).json(JSON.stringify(token)).end();
        } catch (e) {
            return res.json(JSON.stringify({error: e.message})).status(500).end();
        }
    }

    export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        let id: number = parseInt(req.params.id);
        try {
            let user: User = await UserModel.getById(id);
            return res.status(200).json(JSON.stringify(user)).end();
        } catch (e) {
            return res.json(JSON.stringify({error: e.message})).status(500).end();
        }
    }

    export async function updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
        let id: number = parseInt(req.params.id);
        let body: IUser = req.body;

        try {
            let success: boolean = await UserModel.updateById(id, body);
            return res.status(200).json(JSON.stringify(success)).end();
        } catch (e) {
            return res.json(JSON.stringify({error: e.message})).status(500).end();
        }
    }

    export async function deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        let id: number = parseInt(req.params.id);

        try {
            let success: boolean = await UserModel.deleteById(id);
            return res.status(200).json(JSON.stringify(success)).end();
        } catch (e) {
            return res.json(JSON.stringify({error: e.message})).status(500).end();
        }
    }
}

import { Request } from "express"
import { User } from "./db/connection";
export interface IGetUserAuthInfoRequest extends Request {
    currentUser: User
}
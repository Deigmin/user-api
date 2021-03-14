import { User } from "../db/tables/user";
import * as jwt from "jsonwebtoken";

export class JWT {
    private constructor() {}

    public static generateJWT(user: User): string {
        return jwt.sign({
            data: {
                id: user.id,
                username: user.username,
            }
        }, "Sup3R_sEcrEt_Key3", {expiresIn: "6h", algorithm: "HS512"});
    }
}
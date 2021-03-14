import { User, IUser } from "../db/connection";
import crypto from "crypto";
import { JWT as jwt } from "./JWT";

export class AuthService {
    private constructor() {}

    public static async login(username: string, password: string): Promise<any> {
        let user: User | null = await User.findOne({
           where: {
               username: username
           }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");

        if (hashedPassword !== user.password) {
            throw new Error("Incorrect password");
        }

        await User.update({ lastLogin: new Date() }, {
           where: {
               id: user.id
           }
        });

        return {
            user: {
                name: user.username
            },
            token: jwt.generateJWT(user)
        }
    }
}
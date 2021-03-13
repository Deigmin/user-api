import { User, IUser } from "../db/connection";
import crypto from "crypto";
import * as jwt from "jsonwebtoken";

export class AuthService {
    constructor() {
    }

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

        return {
            user: {
                name: user.username
            },
            token: this.generateJWT(user)
        }
    }

    public static async signUp(userProperty: IUser): Promise<any> {
        let salt: string = crypto.randomBytes(32).toString("hex");
        let hashedPassword: string = crypto.pbkdf2Sync(userProperty.password, salt, 1000, 64, "sha512").toString("hex");
        let user: User = await User.create({
            username: userProperty.username,
            salt: salt,
            password: hashedPassword,
            firstName: userProperty.firstName,
            lastName: userProperty.lastName,
            isActive: true,
            lastLogin: new Date(),
            isSuperuser: false
        });

        const token: string = this.generateJWT(user);
        return {
            user: {
                username: user.username
            },
            token
        };
    }

    private static generateJWT(user: User): string {
        return jwt.sign({
            data: {
                id: user.id,
                username: user.username,
            }
        }, "Sup3R_sEcrEt_Key3", {expiresIn: "6h", algorithm: "HS512"});
    }
}
import { IUser, User } from "../db/tables/user";
import crypto from "crypto";
import { JWT as jwt } from "./JWT";

export class UserModel {
    private constructor() {
    }

    public static async signUp(userProperty: IUser): Promise<any> {
        let isUser: boolean = !!await User.findOne({
            where: {
                username: userProperty.username
            }
        });

        if (isUser) {
            throw new Error("User with this nickname is exist.");
        }

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

        const token: string = jwt.generateJWT(user);
        return {
            user: {
                username: user.username
            },
            token
        };
    }

    public static async getAllUsers(): Promise<User[]> {
        let users: User[] = await User.findAll();

        if (users.length === 0) {
            throw new Error("No users in database");
        }

        return users;
    }

    public static async getById(id: number): Promise<User> {
        let user: User | null = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new Error("No user with this id");
        }

        return user;
    }

    public static async updateById(id: number, properties: IUser): Promise<boolean> {
        if (!properties) {
            throw new Error("There are no properties to update");
        }

        let user: User | null = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new Error("There is no user with this id");
        }

        let hashedPassword: string;
        if (properties.password) {
            hashedPassword = crypto.pbkdf2Sync(properties.password, user.salt, 1000, 64, "sha512").toString("hex");
            properties.password = hashedPassword;
        }

        let isUpdated = User.update(properties, {
            where: {
                id: id
            }
        });

        if (!isUpdated) {
            throw new Error("Fail update");
        }

        return true;
    }

    // @ts-ignore
    public static async deleteById(id: number): Promise<boolean> {
        let isDeleted: boolean = !!await User.destroy({
            where: {
                id: id
            }
        });

        if (!isDeleted) {
            throw new Error("Fail delete");
        }

        return isDeleted;
    }
}
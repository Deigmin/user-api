import { sequelize } from "../connection";
import { DataTypes, Model } from "sequelize";

export interface IUser {
    id?: number,
    username: string,
    salt: string,
    password: string
    firstName?: string,
    lastName?: string,
    isActive: boolean,
    lastLogin?: Date,
    isSuperuser?: boolean,

}

export class User extends Model<IUser> implements IUser {
    id!: number;
    username!: string;
    firstName!: string;
    lastName!: string;
    isActive!: boolean;
    lastLogin!: Date;
    isSuperuser!: boolean;
    salt!: string;
    password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.DATE
    },
    isSuperuser: {
        type: DataTypes.BOOLEAN
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    sequelize,
    modelName: "Users",
    timestamps: false
});
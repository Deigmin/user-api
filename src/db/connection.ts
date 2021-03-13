import config from "../config";
import { Sequelize } from "sequelize" ;

interface IConnection {
    host: string,
    user: string,
    password: string,
    database: string,
    port: string | number
}

const connection: IConnection = config["connection"];

export const sequelize: Sequelize = new Sequelize(connection.database, connection.user, connection.password, {
    host: connection.host,
    dialect: "mysql"
});

sequelize.sync({ alter: true });

export { User, IUser } from "./tables/user";
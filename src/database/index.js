import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Student from "../models/Student";
import User from "../models/User";

const models = [Student, User];
const connection = new Sequelize(databaseConfig);
models.forEach((model) => model.init(connection));

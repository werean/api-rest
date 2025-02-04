import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Student from "../models/Student";
import User from "../models/User";
import Photo from "../models/Photo.js";

const models = [Student, User, Photo]; // todo model que eu criar eu tenho que colocar aqui
const connection = new Sequelize(databaseConfig);
models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

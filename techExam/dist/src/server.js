"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongdoDb = exports.serve = void 0;
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./database/mongodb/connection");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";
const mongodbConnection = new connection_1.Connection();
// const server = async () => {
const mongdoDb = mongodbConnection.connection();
exports.mongdoDb = mongdoDb;
const serve = app_1.default.listen(PORT, () => {
    console.log(`Express ${ENV} server listening on port ${PORT}`);
});
exports.serve = serve;

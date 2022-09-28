"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
// import cors from "cors";
const express_1 = __importDefault(require("express"));
const todo_list_route_1 = require("./routes/todo-list.route");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.todoListRouter = new todo_list_route_1.TodoListRoute().router;
        this.config();
    }
    config() {
        //middlewares
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // this.app.use(cors());
        // // this.app.options("*", cors());
        // this.app.use((req, res, next) => {
        //   res.header("Access-Control-Allow-Origin", "*");
        //   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        //   res.header(
        //     "Access-Control-Allow-Headers",
        //     "Origin, X-Requested-With, Content-Type, Accept"
        //   );
        //   next();
        // });
        // routes
        this.app.use("/todo", this.todoListRouter);
    }
}
exports.default = new App().app;

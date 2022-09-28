"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListRoute = void 0;
const express_1 = __importDefault(require("express"));
const todo_list_controller_1 = require("../controllers/todo-list.controller");
const todo_list_delete_request_1 = require("../dtos/request/todo-list.delete.request");
const todo_list_post_request_1 = require("../dtos/request/todo-list.post.request");
const todo_list_update_request_1 = require("../dtos/request/todo-list.update.request");
const error_model_1 = require("../models/error.model");
const payload_model_1 = require("../models/payload.model");
class TodoListRoute {
    constructor() {
        this.router = express_1.default.Router();
        // this.userSchema = new UserSchema();
        this.todoListController = new todo_list_controller_1.TodoListController();
        this.routes();
    }
    routes() {
        this.router.post("/todo", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, list } = req.body;
                const params = new todo_list_post_request_1.TodoListPostRequestDto(title, list);
                if (!title)
                    throw new error_model_1.ErrorModel(500, "title is required");
                // if (!author_name)
                //   throw new ErrorModel(500, "author_name is required");
                const response = yield this.todoListController.todoListPost(params);
                const payload = new payload_model_1.Payload(response.statusCode, response.message);
                res.status(payload.statusCode).send(payload);
            }
            catch (err) {
                res.send(err);
            }
        }));
        this.router.get("/todo", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.todoListController.todoListGet();
                const payload = new payload_model_1.Payload(200, response);
                res.status(payload.statusCode).send(payload.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
        this.router.get("/todo/:title", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const response = yield this.todoListController.todoListGetByTitle(title);
                const payload = new payload_model_1.Payload(200, response);
                res.status(payload.statusCode).send(payload.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
        this.router.delete("/todo/:title", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const params = new todo_list_delete_request_1.TodoListDeleteRequestDto(title);
                const response = yield this.todoListController.todoListDelete(params);
                const payload = new payload_model_1.Payload(response.statusCode, response.message);
                res.status(payload.statusCode).send(payload.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
        this.router.put("/todo/:title", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.params;
                const { list } = req.body;
                const params = new todo_list_update_request_1.TodoListUpdateRequestDto(title, list);
                const response = yield this.todoListController.todoListUpdateList(params);
                const payload = new payload_model_1.Payload(response.statusCode, response.message);
                res.status(payload.statusCode).send(payload.data);
            }
            catch (err) {
                res.send(err);
            }
        }));
    }
}
exports.TodoListRoute = TodoListRoute;

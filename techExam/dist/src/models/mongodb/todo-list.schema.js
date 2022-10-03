"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class TodoListSchema {
    constructor() {
        this.todoListSchema = new mongoose_1.default.Schema({
            title: {
                type: String,
                required: true,
            },
            list: {
                type: Array,
                required: true,
            },
        });
        this.todoListSchemaModel = mongoose_1.default.model("todoList", this.todoListSchema);
    }
}
exports.TodoListSchema = TodoListSchema;

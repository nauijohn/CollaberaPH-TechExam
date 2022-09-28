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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListController = void 0;
const todo_list_title_get_response_1 = require("../dtos/response/todo-list-title.get.response");
const todo_list_delete_response_1 = require("../dtos/response/todo-list.delete.response");
const todo_list_get_response_1 = require("../dtos/response/todo-list.get.response");
const todo_list_post_response_1 = require("../dtos/response/todo-list.post.response");
const todo_list_update_response_1 = require("../dtos/response/todo-list.update.response");
const todo_list_schema_1 = require("../models/mongodb/todo-list.schema");
class TodoListController {
    constructor() {
        this.todoListSchema = new todo_list_schema_1.TodoListSchema();
    }
    todoListPost(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, list } = params;
                const TodoList = this.todoListSchema.todoListSchemaModel;
                const findTodoList = yield TodoList.findOne({ title: title });
                console.log("findTodoList", findTodoList);
                const response = new todo_list_post_response_1.TodoListPostResponseDto();
                if (!findTodoList) {
                    const todoList = new TodoList({
                        title: title,
                        list: list,
                    });
                    const saveTodoList = yield todoList.save();
                    console.log(saveTodoList);
                    response.message = "Todo-list successfully saved!";
                    response.statusCode = 200;
                }
                else {
                    response.message = "There is already a todo-list with that title.";
                    response.statusCode = 500;
                    throw response;
                }
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
    todoListGet() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TodoList = this.todoListSchema.todoListSchemaModel;
                const todoLists = yield TodoList.find({}, "-__v -_id").sort({
                    num_pages: 1,
                });
                const response = new todo_list_get_response_1.TodoListGetResponseDto(200, todoLists);
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
    todoListGetByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TodoList = this.todoListSchema.todoListSchemaModel;
                const todoLists = yield TodoList.findOne({ title: title }, "-__v -_id");
                console.log("todoLists: ", todoLists);
                const response = new todo_list_title_get_response_1.TodoListGetByTitleResponseDto();
                if (todoLists) {
                    response.statusCode = 200;
                    response.data = todoLists;
                }
                else {
                    response.statusCode = 500;
                    response.data = "No todo-list with that title!";
                }
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
    todoListDelete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = params;
                const TodoList = this.todoListSchema.todoListSchemaModel;
                const findTodoList = yield TodoList.findOne({ title: title });
                const response = new todo_list_delete_response_1.TodoListDeleteResponseDto();
                if (findTodoList) {
                    const todoList = yield TodoList.deleteOne({ title: title });
                    if (todoList.deletedCount == 1) {
                        response.statusCode = 200;
                        response.message = "Delete successful!";
                    }
                    else {
                        response.statusCode = 500;
                        response.message = "Delete failed!";
                    }
                }
                else {
                    response.statusCode = 500;
                    response.message = "No todo-list with that title to be deleted!";
                }
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
    todoListUpdateList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, list } = params;
                const TodoList = this.todoListSchema.todoListSchemaModel;
                const findTodoList = yield TodoList.findOne({ title: title });
                const response = new todo_list_update_response_1.TodoListUpdateResponseDto();
                if (findTodoList) {
                    const todoList = yield TodoList.findOneAndUpdate({ title: title }, { list: list });
                    if (todoList) {
                        response.statusCode = 200;
                        response.message = "Update successful!";
                    }
                    else {
                        response.statusCode = 500;
                        response.message = "Update failed!";
                    }
                }
                else {
                    response.statusCode = 500;
                    response.message = "No todo-list with that title to be updated!";
                }
                console.log("response", response);
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TodoListController = TodoListController;

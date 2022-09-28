"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListGetByTitleResponseDto = void 0;
class TodoListGetByTitleResponseDto {
    constructor(statusCode, data) {
        this.statusCode = statusCode ? statusCode : 0;
        this.data = data ? data : {};
    }
}
exports.TodoListGetByTitleResponseDto = TodoListGetByTitleResponseDto;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListPostResponseDto = void 0;
class TodoListPostResponseDto {
    constructor(statusCode, message) {
        this.statusCode = statusCode ? statusCode : 0;
        this.message = message ? message : "";
    }
}
exports.TodoListPostResponseDto = TodoListPostResponseDto;

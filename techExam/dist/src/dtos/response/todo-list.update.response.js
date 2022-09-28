"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListUpdateResponseDto = void 0;
class TodoListUpdateResponseDto {
    constructor(statusCode, message) {
        this.statusCode = statusCode ? statusCode : 0;
        this.message = message ? message : "";
    }
}
exports.TodoListUpdateResponseDto = TodoListUpdateResponseDto;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListDeleteResponseDto = void 0;
class TodoListDeleteResponseDto {
    constructor(statusCode, message) {
        this.statusCode = statusCode ? statusCode : 0;
        this.message = message ? message : "";
    }
}
exports.TodoListDeleteResponseDto = TodoListDeleteResponseDto;

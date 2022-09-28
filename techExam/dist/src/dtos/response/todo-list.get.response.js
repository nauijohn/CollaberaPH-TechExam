"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListGetResponseDto = void 0;
class TodoListGetResponseDto {
    constructor(statusCode, data) {
        this.statusCode = statusCode ? statusCode : 0;
        this.data = data ? data : [];
    }
}
exports.TodoListGetResponseDto = TodoListGetResponseDto;

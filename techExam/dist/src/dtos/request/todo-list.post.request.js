"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListPostRequestDto = void 0;
class TodoListPostRequestDto {
    constructor(title, list) {
        this.title = title ? title : "";
        this.list = list ? list : [];
    }
}
exports.TodoListPostRequestDto = TodoListPostRequestDto;

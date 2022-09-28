"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListUpdateRequestDto = void 0;
class TodoListUpdateRequestDto {
    constructor(title, list) {
        this.title = title ? title : "";
        this.list = list ? list : [];
    }
}
exports.TodoListUpdateRequestDto = TodoListUpdateRequestDto;

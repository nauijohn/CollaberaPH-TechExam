"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = void 0;
class ErrorModel {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorModel = ErrorModel;

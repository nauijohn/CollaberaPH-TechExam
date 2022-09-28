export class TodoListDeleteResponseDto {
  public statusCode: number;
  public message: string;
  constructor(statusCode?: any, message?: any) {
    this.statusCode = statusCode ? statusCode : 0;
    this.message = message ? message : "";
  }
}

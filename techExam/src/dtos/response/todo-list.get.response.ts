export class TodoListGetResponseDto {
  public statusCode: number;
  public data: any[];
  constructor(statusCode?: any, data?: any) {
    this.statusCode = statusCode ? statusCode : 0;
    this.data = data ? data : [];
  }
}

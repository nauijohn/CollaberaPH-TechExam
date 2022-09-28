export class TodoListPostRequestDto {
  public title: string;
  public list: string[];

  constructor(title?: any, list?: any) {
    this.title = title ? title : "";
    this.list = list ? list : [];
  }
}

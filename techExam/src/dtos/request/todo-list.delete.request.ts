export class TodoListDeleteRequestDto {
  public title: string;
  constructor(title?: any) {
    this.title = title ? title : "";
  }
}

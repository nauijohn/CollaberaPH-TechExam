import mongoose from "mongoose";

export class TodoListSchema {
  private todoListSchema: mongoose.Schema;
  public todoListSchemaModel: mongoose.Model<any>;
  constructor() {
    this.todoListSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      list: {
        type: Array,
        required: true,
      },
    });
    this.todoListSchemaModel = mongoose.model("todoList", this.todoListSchema);
  }
}

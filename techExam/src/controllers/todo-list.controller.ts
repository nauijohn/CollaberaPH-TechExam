import { TodoListDeleteRequestDto } from "../dtos/request/todo-list.delete.request";
import { TodoListPostRequestDto } from "../dtos/request/todo-list.post.request";
import { TodoListUpdateRequestDto } from "../dtos/request/todo-list.update.request";
import { TodoListGetByTitleResponseDto } from "../dtos/response/todo-list-title.get.response";
import { TodoListDeleteResponseDto } from "../dtos/response/todo-list.delete.response";
import { TodoListGetResponseDto } from "../dtos/response/todo-list.get.response";
import { TodoListPostResponseDto } from "../dtos/response/todo-list.post.response";
import { TodoListUpdateResponseDto } from "../dtos/response/todo-list.update.response";
import { TodoListSchema } from "../models/mongodb/todo-list.schema";

export class TodoListController {
  private todoListSchema: TodoListSchema;
  constructor() {
    this.todoListSchema = new TodoListSchema();
  }

  public async todoListPost(
    params: TodoListPostRequestDto
  ): Promise<TodoListPostResponseDto> {
    try {
      const { title, list } = params;
      const TodoList = this.todoListSchema.todoListSchemaModel;
      const findTodoList = await TodoList.findOne({ title: title });
      const response: TodoListPostResponseDto = new TodoListPostResponseDto();
      if (!findTodoList) {
        const todoList = new TodoList({
          title: title,
          list: list,
        });
        const saveTodoList = await todoList.save();
        response.message = "Todo-list successfully saved!";
        response.statusCode = 200;
      } else {
        response.message = "There is already a todo-list with that title.";
        response.statusCode = 500;
        return response;
      }
      return response;
    } catch (err: any) {
      throw err;
    }
  }

  public async todoListGet(): Promise<TodoListGetResponseDto> {
    try {
      const TodoList = this.todoListSchema.todoListSchemaModel;
      const todoLists: any[] = await TodoList.find({}, "-__v -_id").sort({
        num_pages: 1,
      });
      const response: TodoListGetResponseDto = new TodoListGetResponseDto(
        200,
        todoLists
      );
      return response;
    } catch (err: any) {
      throw err;
    }
  }

  public async todoListGetByTitle(
    title: string
  ): Promise<TodoListGetByTitleResponseDto> {
    try {
      const TodoList = this.todoListSchema.todoListSchemaModel;
      const todoLists: any = await TodoList.findOne(
        { title: title },
        "-__v -_id"
      );
      console.log("todoLists: ", todoLists);

      const response: TodoListGetByTitleResponseDto =
        new TodoListGetByTitleResponseDto();

      if (todoLists) {
        response.statusCode = 200;
        response.data = todoLists;
      } else {
        response.statusCode = 404;
        response.data = "No todo-list with that title!";
      }
      return response;
    } catch (err: any) {
      throw err;
    }
  }

  public async todoListDelete(
    params: TodoListDeleteRequestDto
  ): Promise<TodoListDeleteResponseDto> {
    try {
      const { title } = params;
      const TodoList = this.todoListSchema.todoListSchemaModel;
      const findTodoList = await TodoList.findOne({ title: title });
      const response: TodoListDeleteResponseDto =
        new TodoListDeleteResponseDto();
      if (findTodoList) {
        const todoList = await TodoList.deleteOne({ title: title });

        if (todoList.deletedCount == 1) {
          response.statusCode = 200;
          response.message = "Delete successful!";
        } else {
          response.statusCode = 500;
          response.message = "Delete failed!";
        }
      } else {
        response.statusCode = 404;
        response.message = "No todo-list with that title to be deleted!";
      }

      return response;
    } catch (err: any) {
      throw err;
    }
  }

  public async todoListUpdateList(
    params: TodoListUpdateRequestDto
  ): Promise<TodoListUpdateResponseDto> {
    try {
      const { title, list } = params;
      const TodoList = this.todoListSchema.todoListSchemaModel;
      const findTodoList = await TodoList.findOne({ title: title });
      const response: TodoListUpdateResponseDto =
        new TodoListUpdateResponseDto();
      if (findTodoList) {
        const todoList = await TodoList.findOneAndUpdate(
          { title: title },
          { list: list }
        );
        if (todoList) {
          response.statusCode = 200;
          response.message = "Update successful!";
        } else {
          response.statusCode = 500;
          response.message = "Update failed!";
        }
      } else {
        response.statusCode = 404;
        response.message = "No todo-list with that title to be updated!";
      }
      console.log("response", response);
      return response;
    } catch (err: any) {
      throw err;
    }
  }
}

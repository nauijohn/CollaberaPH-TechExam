import express from "express";

import { TodoListController } from "../controllers/todo-list.controller";
import { TodoListDeleteRequestDto } from "../dtos/request/todo-list.delete.request";
import { TodoListPostRequestDto } from "../dtos/request/todo-list.post.request";
import { TodoListUpdateRequestDto } from "../dtos/request/todo-list.update.request";
import { TodoListDeleteResponseDto } from "../dtos/response/todo-list.delete.response";
import { TodoListPostResponseDto } from "../dtos/response/todo-list.post.response";
import { TodoListUpdateResponseDto } from "../dtos/response/todo-list.update.response";
import { ErrorModel } from "../models/error.model";
import { Payload } from "../models/payload.model";

export class TodoListRoute {
  public router: express.Router;
  //   public userSchema: UserSchema;
  public todoListController: TodoListController;
  constructor() {
    this.router = express.Router();
    // this.userSchema = new UserSchema();
    this.todoListController = new TodoListController();
    this.routes();
  }
  private routes() {
    this.router.post(
      "/todo",
      async (req: express.Request, res: express.Response) => {
        try {
          const { title, list } = req.body;
          const params: TodoListPostRequestDto = new TodoListPostRequestDto(
            title,
            list
          );
          if (!title) throw new ErrorModel(500, "title is required");
          // if (!author_name)
          //   throw new ErrorModel(500, "author_name is required");
          const response: TodoListPostResponseDto =
            await this.todoListController.todoListPost(params);
          const payload: Payload = new Payload(
            response.statusCode,
            response.message
          );
          res.status(payload.statusCode).send(payload);
        } catch (err: any) {
          res.send(err);
        }
      }
    );

    this.router.get(
      "/todo",
      async (req: express.Request, res: express.Response) => {
        try {
          const response = await this.todoListController.todoListGet();
          const payload: Payload = new Payload(200, response);
          res.status(payload.statusCode).send(payload.data);
        } catch (err: any) {
          res.send(err);
        }
      }
    );

    this.router.get(
      "/todo/:title",
      async (req: express.Request, res: express.Response) => {
        try {
          const { title } = req.params;
          const response = await this.todoListController.todoListGetByTitle(
            title
          );
          const payload: Payload = new Payload(200, response);
          res.status(payload.statusCode).send(payload.data);
        } catch (err: any) {
          res.send(err);
        }
      }
    );

    this.router.delete(
      "/todo/:title",
      async (req: express.Request, res: express.Response) => {
        try {
          const { title } = req.params;
          const params: TodoListDeleteRequestDto = new TodoListDeleteRequestDto(
            title
          );
          const response: TodoListDeleteResponseDto =
            await this.todoListController.todoListDelete(params);
          const payload: Payload = new Payload(
            response.statusCode,
            response.message
          );
          res.status(payload.statusCode).send(payload.data);
        } catch (err: any) {
          res.send(err);
        }
      }
    );

    this.router.put(
      "/todo/:title",
      async (req: express.Request, res: express.Response) => {
        try {
          const { title } = req.params;
          const { list } = req.body;
          const params: TodoListUpdateRequestDto = new TodoListUpdateRequestDto(
            title,
            list
          );
          const response: TodoListUpdateResponseDto =
            await this.todoListController.todoListUpdateList(params);
          const payload: Payload = new Payload(
            response.statusCode,
            response.message
          );
          res.status(payload.statusCode).send(payload.data);
        } catch (err: any) {
          res.send(err);
        }
      }
    );
  }
}

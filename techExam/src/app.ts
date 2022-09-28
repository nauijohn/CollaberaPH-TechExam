import bodyParser from "body-parser";
// import cors from "cors";
import express from "express";

import { TodoListRoute } from "./routes/todo-list.route";

class App {
  public app: express.Application;
  public todoListRouter: express.Router;
  constructor() {
    this.app = express();
    this.todoListRouter = new TodoListRoute().router;
    this.config();
  }
  private config(): void {
    //middlewares
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // this.app.use(cors());
    // // this.app.options("*", cors());

    // this.app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    //   res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    //   );
    //   next();
    // });

    // routes
    this.app.use("/todo", this.todoListRouter);
  }
}

export default new App().app;

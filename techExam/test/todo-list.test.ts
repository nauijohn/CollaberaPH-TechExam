import mongoose from "mongoose";
import request from "supertest";

import { serve } from "../src/server";

let server2: any;
const x: any = serve;

describe("/todo/todo", () => {
  beforeAll(async () => {
    server2 = x;
  });

  afterEach(async () => {
    // await server2.close();
    await mongoose.model("todoList").remove({});
    // await mongoose.connection.close();
  });

  afterAll(async () => {
    await server2.close();
    // await mongoose.model("todoList").remove({});
    await mongoose.connection.close();
  });

  describe("GET /", () => {
    it("should return all todo lists", async () => {
      await mongoose.model("todoList").collection.insertMany([
        { title: "test1", list: ["testA", "testB"] },
        { title: "test2", list: ["testC", "testD"] },
      ]);

      const res = await request(server2).get("/todo/todo");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.some((x: any) => x.title === "test1"));
    });
  });

  describe("GET /:title", () => {
    it("should return a todo list if valid title is passed", async () => {
      await mongoose
        .model("todoList")
        .collection.insertMany([{ title: "test1", list: ["testA", "testB"] }]);

      const res = await request(server2).get("/todo/todo/test1");

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("test1");
    });

    it("should return 404 if invalid title is passed", async () => {
      await mongoose
        .model("todoList")
        .collection.insertMany([{ title: "test1", list: ["testA", "testB"] }]);

      const res = await request(server2).get("/todo/todo/test2");

      expect(res.statusCode).toBe(404);
      expect(res.body.data).toBe("No todo-list with that title!");
    });
  });

  describe("DELETE /:title", () => {
    it("should delete a todo list if valid title is passed", async () => {
      await mongoose.model("todoList").collection.insertMany([
        { title: "test1", list: ["testA", "testB"] },
        { title: "test2", list: ["testC", "testD"] },
      ]);

      const res = await request(server2).del("/todo/todo/test1");
      const res2 = await request(server2).get("/todo/todo");

      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Delete successful!");
      expect(res2.body.data.length).toBe(1);
    });

    it("should return 404 if invalid title is passed", async () => {
      await mongoose.model("todoList").collection.insertMany([
        { title: "test1", list: ["testA", "testB"] },
        { title: "test2", list: ["testC", "testD"] },
      ]);

      const res = await request(server2).del("/todo/todo/test3");
      const res2 = await request(server2).get("/todo/todo");

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("No todo-list with that title to be deleted!");
      expect(res2.body.data.length).toBe(2);
    });
  });

  describe("POST /", () => {
    it("should post data to the database", async () => {
      const res = await request(server2)
        .post("/todo/todo/")
        .send({ title: "test1", list: ["testA", "testB"] });

      const res2 = await request(server2).get("/todo/todo");

      expect(res.statusCode).toBe(200);
      expect(res2.body.data.length).toBe(1);
    });

    it("should return 500 if title already exists in the database", async () => {
      await mongoose
        .model("todoList")
        .collection.insertMany([{ title: "test1", list: ["testA", "testB"] }]);

      const res = await request(server2)
        .post("/todo/todo/")
        .send({ title: "test1", list: ["testA", "testB"] });

      const res2 = await request(server2).get("/todo/todo");

      expect(res.statusCode).toBe(500);
      expect(res.body.data).toBe(
        "There is already a todo-list with that title."
      );
      expect(res2.body.data.length).toBe(1);
    });
  });

  describe("PUT /:title", () => {
    it("should edit data to the database", async () => {
      await mongoose
        .model("todoList")
        .collection.insertMany([{ title: "test1", list: ["testA", "testB"] }]);

      const res = await request(server2)
        .put("/todo/todo/test1")
        .send({ list: ["testC", "testD"] });

      const res2 = await request(server2).get("/todo/todo/test1");

      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Update successful!");
      expect(res2.body.data.list).toEqual(["testC", "testD"]);
    });

    it("should return 404 if there is no valid title in the database", async () => {
      await mongoose
        .model("todoList")
        .collection.insertMany([{ title: "test1", list: ["testA", "testB"] }]);

      const res = await request(server2)
        .put("/todo/todo/test2")
        .send({ list: ["testC", "testD"] });

      const res2 = await request(server2).get("/todo/todo/test1");

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("No todo-list with that title to be updated!");
      expect(res2.body.data.list).toEqual(["testA", "testB"]);
    });
  });
});

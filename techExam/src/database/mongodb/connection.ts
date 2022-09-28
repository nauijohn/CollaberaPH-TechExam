import mongoose from "mongoose";

export class Connection {
  // public connection;

  public async connection() {
    try {
      return await new Promise((res, rej) => {
        mongoose
          .connect("mongodb://localhost:27017/techexam")
          .then((con) => res(con))
          .catch((err) => {
            if (err) rej(err);
          });
      });
    } catch (err) {
      throw err;
    }
  }
}

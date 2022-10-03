import config from "config";
import mongoose from "mongoose";

export class Connection {
  // public connection;
  public async connection() {
    try {
      const db = config.get("DB");
      console.log(db);
      return await new Promise((res, rej) => {
        mongoose
          .connect(`${db}`)
          .then((con) => res(con))
          .catch((err) => {
            if (err) rej(err);
          });
      });
    } catch (err) {
      throw err;
    }
  }
  // public connection() {
  //   const db: string = config.get("DB");
  //   console.log(db);
  //   mongoose.connect(db).then(() => {
  //     `Connected to ${db}`;
  //   });
  // }
}

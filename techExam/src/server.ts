import { config } from "dotenv";
import mongoose from "mongoose";

import app from "./app";
import { Connection } from "./database/mongodb/connection";

config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

const mongodbConnection = new Connection();

const server = async () => {
  const mongoDb = await mongodbConnection.connection();
  app.listen(PORT, () => {
    console.log(`Express ${ENV} server listening on port ${PORT}`);
  });
};

server();

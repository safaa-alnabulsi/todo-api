/* eslint-disable import/no-unresolved */
import cors from "cors";
import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import bodyParser from "body-parser";

const app: Express = express();

const PORT: string | Number = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(router);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.wthbrcr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {})
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error: Error) => {
    throw error;
  });
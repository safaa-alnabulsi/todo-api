/* eslint-disable import/no-unresolved */
import cors from "cors";
import express, { Express } from "express";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import { DbWrapper } from "./database/dbWrapper.js";

const app: Express = express();

const PORT: string | Number = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(router);

// Get environment variables
const dbName: string = process.env.MONGO_DB || "";
const dbUser: string = process.env.MONGO_USER || "";
const dbPass: string = process.env.MONGO_PASSWORD || "";

// Connect to the database
const db: DbWrapper = new DbWrapper(dbName, dbUser, dbPass);
await db.connect();

// start the API server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

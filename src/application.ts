import cors from "cors";
import express, { Router } from "express";
import bodyParser from "body-parser";
import DbWrapper from "./database/dbWrapper.js";

export class Application {
  private router: Router;
  private port: string | Number;
  public app: express.Application;
  private dbWrapper: DbWrapper;

  constructor(router: Router, port: string | Number, dbWrapper: DbWrapper) {
    this.port = port;
    this.router = router;
    this.dbWrapper = dbWrapper;
    this.app = express();

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    this.app.use(bodyParser.json());

    this.app.use(cors());
    this.app.use(this.router);
  }

  public async start() {
    // Connect  to the database
    await this.dbWrapper.connect();
    // start the API server
    this.app.listen(this.port, () =>
      console.log(`Server running on http://localhost:${this.port}`)
    );
  }
}

export default Application;

import Application from "./application.js";
import DbWrapper from "./database/dbWrapper.js";
import router from "./routes/index.js";

// Get environment variables
const port: string | number = process.env.PORT || 4000;
const dbName: string = process.env.MONGO_DB || "";
const dbUser: string = process.env.MONGO_USER || "";
const dbPass: string = process.env.MONGO_PASSWORD || "";

const dbWrapper = new DbWrapper(dbName, dbUser, dbPass);

const application = new Application(router, port, dbWrapper);

application.start();

export default application.app;

import request from "supertest";
import sinon from "sinon";
import Application from "../dist/application.js";
import router from "../dist/routes/index.js";
import DbWrapper from "../dist/database/dbWrapper.js";
import mongoose from "mongoose";

let application: Application;
let app: Express.Application;
let stub: sinon.SinonStub<
  [uri: string, options?: mongoose.ConnectOptions | undefined],
  Promise<typeof mongoose>
>;
beforeEach(async () => {
  // Mock the database connection
  const dbWrapperMock = new DbWrapper("testDB", "testUser", "testPass");
  stub = sinon.stub(mongoose, "connect").resolves();

  // Create an application at another port than original api
  application = new Application(router, 3000, dbWrapperMock);

  application.start();

  app = application.app;
});

afterEach(() => {
  stub.restore();
});

describe("Test hello Endpoint", () => {
  it("should return hello world", async () => {
    const response = await request(app).get("/hello");
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual("hello world");
  });
});

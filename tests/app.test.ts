import request from "supertest";
import sinon from "sinon";
import Application from "../dist/application.js";
import router from "../dist/routes/index.js";
import DbWrapper from "../dist/database/dbWrapper.js";
import mongoose from "mongoose";
import Todo from "../dist/models/todo.js";

let application: Application;
let app: Express.Application;
let stub: sinon.SinonStub<
  [uri: string, options?: mongoose.ConnectOptions | undefined],
  Promise<typeof mongoose>
>;

let TodoMock = sinon.mock(Todo);

let todos = [
  {
    _id: "6495ad459747087bbe24729c",
    name: "todo1",
    description: "my next todo2",
    status: true,
    createdAt: "2023-06-23T14:33:41.890Z",
    updatedAt: "2023-06-23T14:55:21.677Z",
    __v: 0,
  },
  {
    _id: "6495ad4c9747087bbe24729e",
    name: "todo2",
    description: "my next todo2",
    status: false,
    createdAt: "2023-06-23T14:33:48.381Z",
    updatedAt: "2023-06-23T14:33:48.381Z",
    __v: 0,
  },
];

beforeAll(async () => {
  // Mock the database connection
  const dbWrapperMock = new DbWrapper("testDB", "testUser", "testPass");
  stub = sinon.stub(mongoose, "connect").resolves();

  // Create an application at another port than original api
  application = new Application(router, 3000, dbWrapperMock);

  application.start();

  app = application.app;
});

afterAll(() => {
  stub.restore();
  application.stop();
});

describe("Test hello Endpoint", () => {
  it("should return hello world", async () => {
    const response = await request(app).get("/hello");
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual("hello world");
  });
});

describe("Test GET All TODOs /todos Endpoint ", () => {
  it("should return a list of todos", async () => {
    TodoMock.expects("find").resolves(todos);

    const response = await request(app).get("/todos");

    TodoMock.verify();
    TodoMock.restore();

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ todos: todos });
  });

  it("should return an empty list of todos when table is empty", async () => {
    TodoMock.expects("find").resolves([]);

    const response = await request(app).get("/todos");

    TodoMock.verify();
    TodoMock.restore();

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ todos: [] });
  });
});

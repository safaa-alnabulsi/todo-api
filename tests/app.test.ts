import request from "supertest";
import sinon from "sinon";
import Application from "../dist/application.js";
import router from "../dist/routes/index.js";
import DbWrapper from "../dist/database/dbWrapper.js";
import mongoose from "mongoose";
import Todo from "../dist/models/todo.js";

let application: Application;
let app: Express.Application;
let mongoDBConnectStub: sinon.SinonStub<
  [uri: string, options?: mongoose.ConnectOptions | undefined],
  Promise<typeof mongoose>
>;

const todos = [
  {
    _id: "6495ad459747087bbe24729c",
    name: "todo1",
    description: "my next todo1",
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
  mongoDBConnectStub = sinon.stub(mongoose, "connect").resolves();

  // Create an application at another port than original api
  application = new Application(router, 3000, dbWrapperMock);

  application.start();

  app = application.app;
});

afterAll(() => {
  mongoDBConnectStub.restore();
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
  it("should send 200 and return a list of todos", async () => {
    const TodoMock = sinon.mock(Todo);
    TodoMock.expects("find").resolves(todos);

    const response = await request(app).get("/todos");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ todos: todos });

    TodoMock.verify();
    TodoMock.restore();
  });

  it("should send 200 and return an empty list of todos when table is empty", async () => {
    const TodoMock = sinon.mock(Todo);

    TodoMock.expects("find").resolves([]);

    const response = await request(app).get("/todos");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ todos: [] });

    TodoMock.verify();
    TodoMock.restore();
  });
});

describe("Test GET one TODO /todos/:id Endpoint ", () => {
  it("should send 200 and return one todo if id exists", async () => {
    const TodoMock = sinon.mock(Todo);
    TodoMock.expects("findById")
      .withArgs("6495ad459747087bbe24729c")
      .resolves(todos[0]);

    const response = await request(app).get("/todos/6495ad459747087bbe24729c");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ todo: todos[0] });

    TodoMock.verify();
    TodoMock.restore();
  });
});

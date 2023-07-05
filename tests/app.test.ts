import request from "supertest";
import sinon, { SinonStub } from "sinon";
import Application from "../dist/application.js";
import router from "../dist/routes/index.js";
import DbWrapper from "../dist/database/dbWrapper.js";
import mongoose from "mongoose";
import Todo from "../dist/models/todo.js";
import ITodo from "../dist/types/todo.js";
import { json } from "body-parser";

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
    status: false,
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

describe("Test Create POST /todos/:id Endpoint ", () => {
  let saveStub: SinonStub;

  beforeEach(() => {
    saveStub = sinon.stub(Todo.prototype, "save");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should send 201 and create one new todo", async () => {
    const savedTodo = {
      _id: "test-id",
      name: "Test Todo3",
      description: "Test description 3",
      status: false,
    };

    saveStub.resolves(savedTodo);

    const response = await request(app).post("/todos").send({
      name: "Test Todo3",
      description: "Test description 3",
      status: false,
    });

    sinon.assert.calledOnce(saveStub);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Todo item has been added successfully",
      todo: savedTodo,
    });
  });
});

describe("Test Update PUT /todos/:id Endpoint", () => {
  it("should send 202 and update already existing todo", async () => {
    const id = "6495ad459747087bbe24729c";
    const body = {
      name: "Updated Todo",
      description: "Updated description",
      status: true,
    };
    const updatedTodo = {
      _id: id,
      ...body,
    };

    const TodoMock = sinon.mock(Todo);
    TodoMock.expects("findByIdAndUpdate")
      .withArgs({ _id: id }, body)
      .resolves(updatedTodo);

    const response = await request(app).put(`/todos/${id}`).send({
      name: "Updated Todo",
      description: "Updated description",
      status: true,
    });

    expect(response.status).toEqual(202);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      message: "Todo item has been updated successfully",
      todo: updatedTodo,
    });

    TodoMock.verify();
    TodoMock.restore();
  });
});

describe("Test PATCH /todos/:id Endpoint", () => {
  it("should send 202 and mark the todo with true", async () => {
    const id = "6495ad459747087bbe24729c";
    const body = {
      name: "Pacthed Todo",
      description: "Pacthed description",
      status: true,
    };

    const patchedTodo = {
      _id: id,
      ...body,
    };

    const TodoMock = sinon.mock(Todo);
    TodoMock.expects("findByIdAndUpdate")
      .withArgs(
        { _id: id },
        {
          status: "true",
        }
      )
      .resolves(patchedTodo);

    const response = await request(app).patch(`/todos/${id}`);

    expect(response.status).toEqual(202);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      message: "Todo item has been marked as completed successfully",
      todo: patchedTodo,
    });

    TodoMock.verify();
    TodoMock.restore();
  });
});

describe("Test DELETE /todos/:id Endpoint", () => {
  it("should send 202 and delete already existing todo", async () => {
    const id = "6495ad459747087bbe24729c";

    const TodoMock = sinon.mock(Todo);

    TodoMock.expects("findByIdAndDelete")
      .withArgs({ _id: id })
      .resolves(todos[0]);

    const response = await request(app).delete(`/todos/${id}`);

    expect(response.status).toEqual(202);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      message: "Todo item has been deleted successfully",
      todo: todos[0],
    });

    TodoMock.verify();
    TodoMock.restore();
  });
});

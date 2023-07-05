// eslint-disable-next-line import/no-unresolved
/* eslint-disable import/no-unresolved */
import { Request, Response } from "express";
import Todo from "../models/todo.js";
import ITodo from "../types/todo.js";
import HttpStatusCode from "../types/http_status_codes.js";

/**
 * Get list of all Todo items
 * @param req
 * @param res
 */
async function getTodos(req: Request, res: Response): Promise<void> {
  const todos: ITodo[] = await Todo.find();
  res.status(HttpStatusCode.OK).send({ todos });
}

/**
 * Get one Todo item
 * @param req
 * @param res
 */
async function getTodo(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const todo: ITodo | null = await Todo.findById(id);

  if (todo != null) {
    res.status(HttpStatusCode.OK).send({ todo });
  } else {
    res.status(HttpStatusCode.NOT_FOUND);
  }
}

/**
 * Add new Todo item
 * @param req
 * @param res
 */
async function addTodo(req: Request, res: Response): Promise<void> {
  const body = req.body as ITodo;

  const todo: ITodo = new Todo({
    name: body.name,
    description: body.description,
    status: body.status,
  });

  const newTodo = await todo.save();

  res.status(HttpStatusCode.CREATED).send({
    message: "Todo item has been added successfully",
    todo: newTodo,
  });
}

/**
 * Update existing Todo item
 * @param req
 * @param res
 */
async function updateTodo(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const body = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate({ _id: id }, body);

  if (updatedTodo != null) {
    res.status(HttpStatusCode.ACCEPTED).json({
      message: "Todo item has been updated successfully",
      todo: updatedTodo,
    });
  } else {
    res.status(HttpStatusCode.NO_CONTENT).json({
      message: "Todo item wasn't found",
    });
  }
}

/**
 * Mark an existing _todo_ as complete: update the status to "true"
 * @param req
 * @param res
 */
async function patchTodo(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const completedTodo = await Todo.findByIdAndUpdate(
    { _id: id },
    {
      status: "true",
    }
  );

  if (completedTodo != null) {
    res.status(HttpStatusCode.ACCEPTED).send({
      message: "Todo item has been marked as completed successfully",
      todo: completedTodo,
    });
  } else {
    res.status(HttpStatusCode.NO_CONTENT).send({
      message: "Todo item wasn't found",
    });
  }
}

/**
 * Delete Todo item
 * @param req
 * @param res
 */
async function deleteTodo(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  const deletedTodo: ITodo | null = await Todo.findByIdAndDelete({ _id: id });

  if (deletedTodo != null) {
    res.status(HttpStatusCode.ACCEPTED).send({
      message: "Todo item has been deleted successfully",
      todo: deletedTodo,
    });
  } else {
    res.status(HttpStatusCode.NO_CONTENT).send({
      message: "Todo item wasn't found",
      todo: deletedTodo,
    });
  }
}

export { getTodos, getTodo, addTodo, updateTodo, patchTodo, deleteTodo };

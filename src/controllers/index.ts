/* eslint-disable import/no-unresolved */
import { Request, Response } from "express";
import Todo from "../models/todo.js";
import ITodo from "../types/todo.js";
/**
 * Get list of all Todo items
 * @param req 
 * @param res 
 */
export async function getTodos(req: Request, res: Response): Promise<void> {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).send({ todos });
  } catch (err) {
    throw err;
  }
}

/**
 * Get one Todo item
 * 200 for success, 404 for not found
 * @param req 
 * @param res 
 */
export async function getTodo(req: Request, res: Response): Promise<void>{

}

/**
 * Add new Todo item
 * 201 for success (created), 404 for not found
 * @param req 
 * @param res 
 */
export async function addTodo(req: Request, res: Response): Promise<void> {

}

/**
 * Update existing Todo item
 * TODO: cover the usecase of item doesn't exist and return the proper http code
 * @param req 
 * @param res 
 */
export async function updateTodo(req: Request, res: Response): Promise<void>{

}

/**
 * Delete Todo item
 * TODO: cover the usecase of item doesn't exist and return the proper http code
 * @param req 
 * @param res 
 */
export async function deleteTodo(req: Request, res: Response): Promise<void>{

}
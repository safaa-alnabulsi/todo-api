/* eslint-disable import/no-unresolved */
import { Router } from "express";
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  patchTodo,
} from "../controllers/index.js";

const router: Router = Router();

// simple endpoint example
router.get("/hello", (req, res) => {
  res.status(200).json("hello world");
});

// main endpoints
router.get("/todos", getTodos);

router.get("/todos/:id", getTodo);

router.post("/todos", addTodo);

router.put("/todos/:id", updateTodo);

router.delete("/todos/:id", deleteTodo);

router.patch("/todos/:id", patchTodo);

// redirects
router.get("/", (req, res) => {
  res.redirect("/todos");
});

router.get("/todos", (req, res) => {
  res.redirect("/todos");
});

export default router;

/* eslint-disable import/no-unresolved */
import { Router } from "express";
import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/index.js";

const router: Router = Router();

// main endpoints
router.get("/todos", getTodos);

router.get("/todos/:id", getTodo);

router.post("/todos", addTodo);

router.put("/todos/:id", updateTodo);

router.delete("/todos/:id", deleteTodo);

// redirects
router.get("/", (req, res) => {
  res.redirect("/todos");
});

router.get("/todos", (req, res) => {
  res.redirect("/todos");
});

export default router;

/* eslint-disable import/no-unresolved */
import mongoose, { model } from "mongoose";
import ITodo from "../types/todo";

// Calling Schema class
const Schema = mongoose.Schema;

// Creating Structure of the collection
const todoSchema: mongoose.Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating a collection
export default model<ITodo>("Todo", todoSchema);

import { Document } from "mongoose";

// Create an interface representing a document in MongoDB.
export default interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
}
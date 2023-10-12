import { ObjectId } from "mongodb";

export type message = { 
  _id: ObjectId,
  sender: ObjectId,
  receiver: ObjectId,
  created_at: Date,
  textContent: string
}
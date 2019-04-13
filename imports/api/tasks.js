import { Mongo } from "meteor/mongo";
import { Index, MongoDBEngine } from "meteor/easy:search";

export const Tasks = new Mongo.Collection("tasks");

export const TasksIndex = new Index({
  collection: Tasks,
  fields: ["text"],
  engine: new MongoDBEngine()
});

import { Mongo } from "meteor/mongo";
import { Index, MongoDBEngine } from "meteor/easy:search";

export const Tasks = new Mongo.Collection("tasks");

// Create a new instance of ES targeting the tasks collection
export const TasksIndex = new Index({
  collection: Tasks,
  fields: ["text"],
  engine: new MongoDBEngine()
});

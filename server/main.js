import "../imports/api/tasks.js";

import { Meteor } from "meteor/meteor";
import { faker } from "meteor/gbit:faker";
import { Tasks } from "../imports/api/tasks.js";

Meteor.startup(() => {
  Tasks.remove({});
  let i;
  for (i = 0; i < 10; i++) {
    let doc = {
      text: faker.lorem.paragraph(),
      createdAt: new Date()
    };

    Tasks.insert(doc);
  }
});

// We wrap the db queries we want to preform in a Publish method
// This allows the client side to subscribe for access to the data returned
Meteor.publish("tasks.all", function() {
  return Tasks.find({
    userId: { $exists: false }
  });
});

Meteor.methods({
  // Method to insert a new task into the db
  // This method will rely on the client passing in the text for the new task
  // and then add another field for the time it was created.
  createTodo: function(text) {
    Tasks.insert({
      text,
      createdAt: new Date()
    });
  }
});

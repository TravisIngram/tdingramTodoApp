import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";

import "./task.js";
import "./body.html";

// Here we subscribe to the data returned by tasks.all defined in the publish method
Meteor.subscribe("tasks.all");

Template.body.events({
  "submit .new-task"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date() // current time
    });

    // Clear form
    target.text.value = "";
  }
});

Template.body.helpers({
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }
});

import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";
import { Session } from "meteor/session";

import "./task.js";
import "./body.html";
import "./searchResult.js";

// Here we subscribe to the data returned by tasks.all defined in the publish method
Meteor.subscribe("tasks.all");

Template.body.events({
  "submit .new-task"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Call to the create method along with the text for the new task.
    Meteor.call("createTodo", text);

    // Clear form
    target.text.value = "";
  },

  "submit .search-tasks"(event) {
    event.preventDefault();

    const searchTarget = event.target;
    const searchString = searchTarget.text.value;

    // Set a session value for the search term to make it available to other methods
    Session.set("searchString", searchString);

    searchTarget.text.value = "";
  }
});

Template.body.helpers({
  tasks: function() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }
});

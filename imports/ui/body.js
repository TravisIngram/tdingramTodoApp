import { Template } from "meteor/templating";
import { Tasks, TasksIndex } from "../api/tasks.js";
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

  // Helper to initiate a search
  "keydown .search-tasks"(event) {
    console.log("starting search!");
    if (event.key === "Enter") {
      // Set a session value for search results to display the results view
      Session.set("showResults", true);
    }
  },

  // Helper to close the results view
  "click .toggle-results"(event) {
    console.log("closing search results.");

    // Reset the search field upon dismissal of results.
    document.getElementsByClassName("search-tasks")[0].value = "";
    // Set a session value for search results to close the results view
    Session.set("showResults", false);
  }
});

Template.body.helpers({
  tasks: function() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },

  // Return the instance of the EasySearch index we created
  tasksIndex: function() {
    return TasksIndex;
  },

  // Return the value of 'showResults' from the session store.
  showResults: function() {
    return Session.get("showResults");
  },

  // Attache attributes to the search field for styling and access.
  searchInputAttributes: function() {
    return {
      placeholder: "Type here to search the tasks",
      class: "search-tasks"
    };
  }
});

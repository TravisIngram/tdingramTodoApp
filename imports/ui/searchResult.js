import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { TasksIndex } from "../api/tasks.js";

import "./searchResult.html";

// Return the instance of the EasySearch index we created
Template.searchResult.helpers({
  tasksIndex: function() {
    return TasksIndex;
  },

  // Return the value of 'showResults' from the session store.
  showResults: function() {
    return Session.get("showResults");
  }
});

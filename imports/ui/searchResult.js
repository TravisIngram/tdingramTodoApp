import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { TasksIndex } from "../api/tasks.js";

import "./searchResult.html";

Template.searchResult.helpers({
  tasksIndex: function() {
    return TasksIndex;
  },

  showResults: function() {
    return Session.get("showResults");
  }
});

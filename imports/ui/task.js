import { Template } from "meteor/templating";

import "./task.html";

Template.task.events({
  "click .toggle-checked"() {
    // A call to the updateTodo method to, well, update whether an item has been
    // checked or not.
    // We need access to the specific ID as well as the current state
    var todoItem = this._id;
    var checkedItem = this.checked;
    Meteor.call("updateTodo", todoItem, checkedItem);
  },

  // Call to the remove todo method to, well, remove a todo item
  // We need to include the specific ID of the item we want to remove
  "click .delete"() {
    var todoItem = this._id;
    Meteor.call("removeTodo", todoItem);
  }
});

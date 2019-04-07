### Meteor Todo App Challenge

Initial Readme for this challenge.

### Setup

I used the Meteor CLI to create the base project for this challenge. The instructions indicated we should create an empty application so I used the command, `Meteor create --bare todoApp`.

I then added in the imports, client, and server files provided with the challenge instructions.

### Issues

I tried to launch the app using `meteor` to see where things were at, the current state. It failed to launch and I was presented with a number of error messages that I'll need to work through.

The initial issues seems to be related to packages that are called but not currently installed within this project, specifically `Faker`. I'll add that and any others that might be missing using the `meteor add` command and see where that gets me.

---

I added the necessary package, `gbit:faker`, which is a Meteor specific wrapper for `Faker`. It was added to the `packages` file but its dependencies weren't. Which seems odd. I'm also not sure why `Blaze`, `jQuery`, and `observe-sequence` were added to the `versions` file. I'll need to look up what that's for.

Scratch that, `Faker` has no dependencies so I'm not sure why those other packages were mentioned during the install process. In general I'm not a fan of tools doing things for unexplained reasons.

`Versions` is where Meteor tracks all versioning information for the various packages necessary for the base install and those used by a given app.

---

I also added the `templating` package. It, too, added additional versions.

I tried to build and run the app again and was presented with another error message. This time it was related to the package I just installed. There's evidently a default templating / rendering package, `static-html` that is conflicting with `templating`.

I'll remove the default package and see if it helps.

The app builds and launches now. But the todo list is empty (which isn't correct based on the code) and I'm not able to add new tasks. There's one console error indicating access was denied.

---

So the two issues I have right now is an empty todo list when there should be 10 random items and an inability to add new tasks.

Meteor is different from other frameworks in that it doesn't use REST. Instead it uses a protocol they developed called Distributed Data Protocol (DDP). So instead of using REST methods for basic CRUD actions based on endpoints you write, you use use Meteor methods.

This is pretty obvious when looking over the code used in this app.

Because of this, when you send or try to retrieve data you have to specifically allow or deny the requests. So I can't create a new todo item and try to send that directly to the database, which makes sense. I'll need to modify the code on the client and server side to allow for this.

As for the lack of initial items, that also has to do with this new model. In order to share data back and forth between the client and database, they set up a `publish` and `subscribe` metaphor. You specify the data you want to make available and `publish` it, which amounts to a query of some sort. Specific elements of the client can the `subscribe` to this data and display the results.

So I need to publish the list of todo items I want displayed and then subscribe to that in order to make use of it on the client.

---

Adding the publish and subscribe methods was straightforward. Thankfully the Meteor documentation is pretty good. There's an entire section that covers the process, [Publications and Data Loading](https://guide.meteor.com/data-loading.html).

I added the publish method on the server side to query all tasks and make it available to the client side.

```
Meteor.publish("tasks.all", function() {
  return Tasks.find({
    userId: { $exists: false }
  });
});
```

I added a corresponding subscribe method on the client side to enable the data to be displayed.

```
Meteor.subscribe("tasks.all");
```

The Meteor CLI has a built in monitoring process so anytime you mondify a file the application is built and launched again. Once I added the changes listed above I was able to see the initial 10 todo items.

I still can't add new items, update, or delete existing ones.

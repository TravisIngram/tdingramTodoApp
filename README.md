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

### Meteor Todo App Challenge

Initial Readme for this challenge.

### Setup

I used the Meteor CLI to create the base project for this challenge. The instructions indicated we should create an empty application so I used the command, `Meteor create --bare todoApp`.

I then added in the imports, client, and server files provided with the challenge instructions.

### Issues

I tried to launch the app using `meteor` to see where things were at, the current state. It failed to launch and I was presented with a number of error messages that I'll need to work through.

The initial issues seems to be related to packages that are called but not currently installed within this project, specifically `Faker`. I'll add that and any others that might be missing using the `meteor add` command and see where that gets me.

import '../imports/api/tasks.js';

import { Meteor } from 'meteor/meteor';
import { faker } from 'meteor/gbit:faker';
import { Tasks } from '../imports/api/tasks.js';


Meteor.startup(() => {
	Tasks.remove({});
	let i;
	for(i = 0; i<10; i++) {
		let doc = {
			text: faker.lorem.paragraph(),
			createdAt: new Date()
		};

		Tasks.insert(doc)
	}
});

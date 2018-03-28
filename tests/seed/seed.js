const { ObjectID } = require("mongodb");
const {Ideas} = require('../../models/Idea')

const idea1ID = new ObjectID();
const idea2ID = new ObjectID();

const ideas = [
	{
		_id: idea1ID,
		title: "test 1",
		details: "details 1"
	},
	{
		_id: idea2ID,
		title: "test 2",
		details: "details 2"
	},
];

const populateIdeas = done => {
	Ideas.remove({})
	  .then(() => {
		var ideaOne = new Ideas(ideas[0]).save();
		var ideaTwo = new Ideas(ideas[1]).save();
  
		return Promise.all([ideaOne, ideaTwo]);
	  })
	  .then(() => {
		done();
	  });
  };

module.exports = {
	ideas,
	populateIdeas
};

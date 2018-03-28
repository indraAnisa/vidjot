const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../app");
const { Ideas } = require("./../models/Idea");
const { ideas, populateIdeas } = require("./seed/seed");

beforeEach(populateIdeas);
describe("POST /Ideas", () => {
	it("should create new ideas", done => {
		request(app)
			.post("/ideas")
			.send({
				title: "titletest",
				details: "detailstest"
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Ideas.findOne({ title: "titletest" })
					.then(idea => {
						expect(idea.title).toBe("titletest");
						done();
					})
					.catch(e => {
						done(e);
					});
			});
	});
});

const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')

const {
	Ideas
} = require("./models/Idea");

require("./config/config");

const app = express();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("mongodb connected...");
	})
	.catch(e => {
		console.log(e);
	});

//load Idea Model

//handlebars middleware
app.engine(
	".hbs",
	exphbs({
		defaultLayout: "main",
		extname: ".hbs"
	})
);

app.set("view engine", ".hbs");

//body parser middleware;
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

//method-override middleware;
app.use(methodOverride('_method'));

//index route
app.get("/", (req, res) => {
	const title = "Welcome";
	res.render("index", {
		title
	});
});

//Idea Index Page
app.get("/ideas", (req, res) => {
	Ideas.find({})
		.sort({
			date: "desc"
		})
		.then(ideas => {
			res.render("ideas/index", {
				ideas
			});
		});
});

//Add Idea Form
app.get("/ideas/add", (req, res) => {
	res.render("ideas/add");
});

//Edit Idea Form
app.get("/ideas/edit/:id", (req, res) => {
	Ideas.findOne({
		_id: req.params.id
	}).then(idea => {
		res.render("ideas/edit", {
			idea
		});
	})

});

//Edit form process
app.put("/ideas/:id", (req,res)=>{
	res.send('PUT')
})

//Process form
app.post("/ideas", (req, res) => {
	let errors = [];

	if (!req.body.title) {
		errors.push({
			text: "Please add a title"
		});
	}
	if (!req.body.details) {
		errors.push({
			text: "Please add some details"
		});
	}

	if (errors.length > 0) {
		res.render("ideas/add", {
			errors,
			title: req.body.title,
			details: req.body.details
		});
	} else {
		const newUser = {
			title: req.body.title,
			details: req.body.details
		};

		new Ideas(newUser).save().then(idea => {
			res.redirect("/ideas");
		});
	}
});

app.get("/about", (req, res) => {
	res.render("about");
});

const port = 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = {
	app
};
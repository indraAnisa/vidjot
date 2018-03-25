const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose
	.connect("mongodb://localhost/vidjot-dev")
	.then(() => {
		console.log("mongodb connected...");
	})
	.catch(e => {
		console.log(e);
	});

//load Idea Model
require("./models/Idea");
const Idea = mongoose.model("ideas");

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

//index route
app.get("/", (req, res) => {
	const title = "Welcome";
	res.render("index", {
		title
	});
});

//Add Idea Form
app.get("/ideas/add", (req, res) => {
	res.render("ideas/add");
});

//Process form
app.post("/ideas", (req, res) => {
	let errors = [];

	if (!req.body.title) {
		errors.push({ text: "Please add a title" });
	}
	if (!req.body.details) {
		errors.push({ text: "Please add some details" });
    }
    
    if(errors.length > 0){
        res.render('ideas/add', {
            errors,
            title: req.body.title,
            details: req.body.details
        })
    } else {
        res.send('passed');
    }
});

app.get("/about", (req, res) => {
	res.render("about");
});

const port = 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

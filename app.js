const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

//handlebars middleware
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    extname: '.hbs'
}))

app.set('view engine', '.hbs');

//index route
app.get("/", (req, res) => {

    const title = 'Welcome'
	res.render("index",{
        title
    });
});

app.get("/about", (req, res) => {
	res.render("about");
});

const port = 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

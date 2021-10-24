const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({ extended: true })); // Bodyparser
app.use(express.json()); //Bodyparser for json

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// js path
app.use('/js', express.static(path.join(__dirname, "./js")));

// css path
app.use('/assets', express.static(path.join(__dirname, "./assets")));

// Routes
app.use('/',require('./routes/routes'));


const port = process.env.PORT || 3400;

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    questionsArr = require('./questions.json'),
    bodyParser = require('body-parser');

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/', (req, res) => {
    let username = req.body.username;

    res.render('questions', {
        questionsArr
    });
});

app.listen(8080, () => console.log('listening...'));

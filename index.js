const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    bodyParser = require('body-parser'),
    questionsArr = require('./questions.json');

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/', (req, res) => {
    let username = req.body.username;
    const data = require(`./data/${username}.json`);

    res.render('questions', {
        questionsArr,
        data
    });
});

app.listen(8080, () => console.log('listening...'));

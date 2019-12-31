const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
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
    const fileName = `./data/${username}.json`;
    const data = require(fileName);

    res.render('questions', {
        questionsArr,
        data,
        helpers: {
            answer(id) {
                return data['0'][id];
            }
        }
    });
});

app.post('/save', (req, res) => {
    console.log('post request to /save');
    console.log(req.body.answer);
});

app.listen(8080, () => console.log('listening...'));

const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    questionsArr = require('./questions.json');

let username = '',
    filePath = '',
    data = '';

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/', (req, res) => {
    username = req.body.username;
    filePath = `./data/${username}.json`;

    res.redirect('/main');
});

app.get('/main', (req, res) => {
    data = require(filePath);

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

app.post('/main', (req, res) => {
    let answer = req.body,
        answerId = Object.keys(answer)[0],
        answerVal = req.body[answerId];

    data['0'][answerId] = answerVal;

    fs.writeFileSync('./data/david.json', JSON.stringify(data, null, 4));
    res.redirect('/main');
});

app.listen(8080, () => console.log('listening...'));

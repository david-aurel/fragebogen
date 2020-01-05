const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    questionsArr = require('./questions.json');

let username = '',
    filePath = '',
    data = '',
    topic = [
        'Die Erhaltung des Menschengeschlechts',
        'Ehe',
        'Frauen',
        'Hoffnung',
        'Humor',
        'Geld',
        'Freundschaft',
        'Vatersein',
        'Heimat',
        'Eigentum',
        'Tod'
    ],
    num = 1;

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

app.get('/topic/:num', (req, res) => {
    num = req.params.num;
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    try {
        data = require(filePath);
        let questionsArrSelect = questionsArr[0][num];

        res.render('questions', {
            questionsArrSelect,
            data,
            helpers: {
                answer(id) {
                    return data['0'][id];
                },
                topic() {
                    return topic[num - 1];
                }
            }
        });
    } catch {
        const newfileContent = [{ name: `${username}` }];
        let newFilePath = `./data/${username}.json`;
        fs.writeFileSync(newFilePath, JSON.stringify(newfileContent, null, 4));
        res.redirect('/main');
    }
});

app.post('/main', (req, res) => {
    let answer = req.body;
    (answerId = Object.keys(answer)[0]), (answerVal = req.body[answerId]);

    data['0'][answerId] = answerVal;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res.redirect('/main');
});

app.listen(process.env.PORT || 8080);

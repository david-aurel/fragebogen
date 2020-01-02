const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    questionsArr = require('./questions.json');

let username = '',
    filePath = '',
    data = '',
    topicSelection = ['Die Erhaltung des Menschengeschlechts', 'Ehe', 'Frauen'],
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

app.post('/topic', (req, res) => {
    num = req.body.topic;
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    try {
        data = require(filePath);
        let questionsArrSelect = questionsArr[0][num];
        console.log(questionsArrSelect);

        res.render('questions', {
            questionsArrSelect,
            data,
            helpers: {
                answer(id) {
                    return data['0'][id];
                },
                topic() {
                    return topicSelection[num - 1];
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
    let answer = req.body,
        answerId = Object.keys(answer)[0],
        answerVal = req.body[answerId];

    data['0'][answerId] = answerVal;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res.redirect('/main');
});

app.listen(8080, () => console.log('listening...'));

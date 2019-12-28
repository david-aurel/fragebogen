const express = require('express'),
    app = express(),
    hb = require('express-handlebars'),
    questionsArr = require('./questions.json');

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/main', (req, res) => {
    res.render('questions', {
        questionsArr
    });
});

app.post('/', (req, res) => {
    res.redirect('/main');
});

app.listen(8080, () => console.log('listening...'));

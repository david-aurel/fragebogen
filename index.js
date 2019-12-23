const express = require('express'),
    app = express(),
    hb = require('express-handlebars');

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/main', (req, res) => {
    res.render('questions');
});

app.listen(8080, () => console.log('listening...'));

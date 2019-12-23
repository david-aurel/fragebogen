const express = require('express'),
    app = express(),
    hb = require('express-handlebars');

app.engine('handlebars', hb());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(8080, () => console.log('listening...'));

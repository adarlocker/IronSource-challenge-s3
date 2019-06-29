var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
app.set('port', 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404
app.use(function(req, res) {
    res.status(404).send('Not Found');
});

// error handler
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send(`error: ${err.message}`);
});

app.listen(app.get('port'));

module.exports = app;

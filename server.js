var express = require('express');

var app = express();
var data = [{
    id: 1,
    name: "Ivan",
    score: 10
}, {
    id: 2,
    name: "Alex",
    score: 13
}, {
    id: 3,
    name: "Irene",
    score: 5
}];
// view engine setup
app.set('view engine', 'hjs');

app.use(express.static('public'));

app.get('/users', function (req, res) {
    res.send(data);
});

app.get('/users/:id', function (req, res) {
    var user;
    for (var i in data) {
        if (data[i] && data[i].id == req.params.id) {
            user = data[i];
        }
    }
    res.send(user);
});

// listen
app.set('port', process.env.PORT || 3000);
module.exports = app;
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
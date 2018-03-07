var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.listen(80, function () {
  console.log('Listening on port ' + port);
});
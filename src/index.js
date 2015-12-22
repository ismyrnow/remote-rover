var express = require('express');
var ipv4 = require('./ipv4');
var setupRover = require('./rover');
var app = express();

app.use(express.static('public'));

// Initialize the rover, and set our instance on the express app.
setupRover(function (r) {
  app.set('rover', r);
});

app.get('/rover/forward', roverRoute);
app.get('/rover/reverse', roverRoute);
app.get('/rover/stop', roverRoute);
app.get('/rover/left', roverRoute);
app.get('/rover/right', roverRoute);

function roverRoute(req, res) {
  var command = req.path.slice(7);
  var rover = app.get('rover');

  if (rover) {
    rover[command]();
  }

  console.log(command);
  res.sendStatus(200);
}

app.listen(3000, function () {
  console.log('Remote-rover server listening at http://%s:%s', ipv4[0], this.address().port);
});

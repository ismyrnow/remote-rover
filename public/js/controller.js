$(function () {

  $('.command').on('touchstart mousedown', function (e) {
    var command = $(e.target).data('command');
    sendCommand(command);
    return false;
  });

  $('.command').on('touchend mouseup', function () {
    sendCommand('stop');
    return false;
  });

  function sendCommand(command) {
    $.get('/rover/' + command);
  }

});

/**
 * Control dual-servo motors using the keypad (up, dwn, left, right) and a/d for accel/deccel.
 */
var five = require('johnny-five');

var stop, motors;
var speed = 30;
var board = new five.Board();

module.exports = function (cb) {

  board.on('ready', function() {
    motors = new five.Motors([
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
      five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
    ]);

    var rover = {
      forward: x => motors.fwd(speed),
      reverse: x => motors.rev(speed),
      stop: x => motors.stop(),
      left: x => motors[0].fwd(speed) && motors[1].rev(speed),
      right: x => motors[0].rev(speed) && motors[1].fwd(speed)
    };

    cb(rover);
  });

};

'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var addresses = [];

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {

    // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    addresses.push(iface.address);

  });
});

module.exports = addresses;

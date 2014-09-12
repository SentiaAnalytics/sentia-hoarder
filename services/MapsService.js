'use strict';
var db = require('./postgres'),
  Promise = require('bluebird'),
  utils = require('./streamUtils'),
  through = require('through');

exports.csv = function (req) {
  return new Promise(function (resolve, reject) {
    db.getWriteStream('Map')
      .then(function (dbStream) {
        req.pipe(utils.bufferToString())
            .pipe(utils.splitLines())
            .pipe(utils.log())
            .pipe(dbStream)
            .on('error', reject)
            .on('end', resolve);
      });
  });

};

exports.jsonToCsvStream = function (data) {
  var stream = through();
  data.data.forEach(function (e) {
    var row = [
      e.x,
      e.y,
      e.dx,
      e.dy,
      e.heat.
      data.cam.
      data.company
    ];
    stream.write(row.join(';'));
  });
  return stream;
}

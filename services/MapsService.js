'use strict';
var db = require('./postgres'),
  P = require('bluebird'),
  logger = require('bragi'),
  utils = require('./streamUtils'),
  through = require('through');

exports.csv = function (req) {
  return new P(function (resolve, reject) {
    db.getWriteStream('"Maps"')
      .then(function (dbStream) {
        req.pipe(utils.bufferToString())
            .pipe(utils.splitLines())
            .pipe(exports.transformCsv(req.query))
            .pipe(dbStream)
            .on('error', reject)
            .on('end', resolve);
      });
  });

};

exports.transformCsv = function (query) {
  return through(function (row) {
    var data = row.split(';');
    data.push(query.company); // add the company id
    logger.log('debug:maps', 'row :' + data.join(';'));
    this.emit('data',data.join(';') + '\n');
  });
};

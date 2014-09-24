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
            .pipe(utils.log())
            .pipe(dbStream)
            .on('error', function (err) {
              logger.log('maps:debug', 'ERROR:' + err);
              reject(err);
            })
            .on('end', function (data) {
              logger.log('debug', 'csv stream done: ' + data);
              resolve(data);
            });
      });
  });

};

exports.transformCsv = function (query) {
  return through(function (row) {
    var data = row.split(';');
    data.push(query.company); // add the company id
    logger.log('debug:maps', 'row :' + data.join(';'));
    this.queue(data.join(';') + '\n');
  });
};

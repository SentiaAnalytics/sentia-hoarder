'use strict';
var through = require('through'),
  logger = require('bragi'),
  P = require('bluebird'),
  db = require('./postgres'),
  utils = require('./streamUtils');

exports.csv = function (req) {
  return new P(function (resolve, reject) {
   db.getWriteStream('"Receipts"')
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
    var data = row.split(';').map(function (column) {
      if (typeof column === 'string') {
        return column.replace(',','.');
      }
      return column;
    });


    data.splice(4, 1); // remove store
    data.push(query.company); // add the company id
    data.push(1); // add the store id
    logger.log('debug:receipts', 'row :' + data.join(';'));
    this.emit('data',data.join(';') + '\n');
  });
};



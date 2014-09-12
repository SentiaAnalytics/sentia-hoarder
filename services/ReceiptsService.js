'use strict';
var through = require('through'),
  Promise = require('bluebird'),
  db = require('./postgres'),
  utils = require('./streamUtils');

exports.csv = function (req) {
  return new Promise(function (resolve, reject) {
   db.getWriteStream('receipts')
      .then(function (dbStream) {
        req.pipe(utils.bufferToString())
          .pipe(utils.splitLines())
          .pipe(exports.transformCsv())
          .pipe(utils.log())
          .pipe(dbStream)
          .on('error', reject)
          .on('end', resolve);
      });
  });
};

exports.transformCsv = function () {
  return through(function (row) {
    var data = row.split(';').map(function (column) {
      if (typeof column === 'string') {
        return column.replace(',','.');
      }
      return column;
    });

    console.log('start time: ', data[8]);
    console.log('end time: ' , data[9]);
    this.emit('data',data.join(';') + '\n');
  });
};



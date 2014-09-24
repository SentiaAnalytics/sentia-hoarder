'use strict';
var through = require('through'),
  logger = require('bragi');

exports.bufferToString = function () {
  return through(exports._bufferToStringChunk);
};
exports._bufferToStringChunk = function (chunk) {
  if (chunk) {
    // logger.log('debug:streamUtils', 'convert to string:', + chunk.toString());
    this.queue(chunk.toString());
  }
};
exports.splitLines = function () {
  var buffer = '';
  return through(function (chunk) {
    var rows, i;
    chunk = buffer + chunk;
    rows = chunk.split('\n');
    logger.log('debug:stream', 'chunk '+ chunk);
    buffer = rows.pop();
    for( i= 0; i < rows.length; i += 1) {
      if (rows[i]) {
        // logger.log('debug:stramUtils','line :' + rows[i]);
        this.queue(rows[i]);
      }
    }
  });
};

exports.log = function () {
 return through(function (chunk) {
   logger.log('Utils:debug', chunk);
   this.queue(chunk);
 });
};

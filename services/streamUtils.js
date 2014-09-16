'use strict';
var through = require('through'),
  logger = require('bragi');

exports.bufferToString = function () {
  return through(exports._bufferToStringChunk);
};
exports._bufferToStringChunk = function (chunk) {
  if (chunk) {
    logger.log('debug:streamUtils', 'convert to string:', + chunk.toString());
    this.emit('data', chunk.toString());
  }
};
exports.splitLines = function () {
  return through(function (chunk) {
    var rows = chunk.split('\n'), i;
    for( i= 0; i < rows.length; i += 1) {
      if (rows[i]) {
        logger.log('debug:stramUtils','line :' + rows[i]);
        this.emit('data', rows[i]);
      }
    }
  });
};

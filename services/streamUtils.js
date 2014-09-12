'use strict';
var through = require('through');

exports.bufferToString = function () {
  return through(exports._bufferToStringChunk);
};
exports._bufferToStringChunk = function (chunk) {
  if (chunk) {
    this.emit('data', chunk.toString());
  }
};
exports.splitLines = function () {
  return through(function (chunk) {
    var rows = chunk.split('\n'), i;
    for( i= 0; i < rows.length; i += 1) {
      if (rows[i]) {
        this.emit('data', rows[i]);
      }
    }
  });
};
exports.log = function () {
  return through(function (chunk) {
    console.log('chunk : ', chunk);
    console.log('coumns:', chunk.split(';').length);
    this.emit('data', chunk);
  });
};

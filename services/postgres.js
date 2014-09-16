//Postgres driver, to wrap the postgres client library with promises.
'use strict';
var config = require('config');
var pg = require('pg');
var when = require('when');
var copyTo = require('pg-copy-streams').to;
var copyFrom = require('pg-copy-streams').from;
//#### creates a db connection

function createConnection() {
  return when.promise(function(resolve, reject) {

    //can't lift due to non standard callback
    pg.connect(config.postgres, function(err, client, done) {
      if (err) {
        reject(err);
        return;
      }
      //resolve the client and callback into a single object
      resolve({
        repool: done,
        client: client
      });
    });
  });
}

//#### execute a sql query
exports.query = function(sqlquery) {

  return createConnection().then(function(connection) {

    return when.promise(function(resolve, reject) {

      //unable to lift via promises
      connection.client.query(sqlquery, function(err, result) {
        //close the connection to return back to the pool
        connection.repool();

        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  });
};

exports.getReadStream = function(table) {
  return createConnection()
    .then(function(connection) {
      var stream = connection.client.query(copyTo('COPY ' + table + ' FROM STDOUT DELIMITER \';\' CSV'));
      stream.on('end', function () {
        connection.repool();
      });
      return stream;
    });
};

exports.getWriteStream = function(table) {
  return createConnection()
    .then(function(connection) {
      var stream = connection.client.query(copyFrom('COPY ' + table + ' FROM STDIN DELIMITER \';\' CSV'));
      stream.on('end', function () {
        connection.repool();
      });
      return stream;
    });
};

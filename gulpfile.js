'use strict';
var gulp = require('gulp'),
  mocha = require('gulp-spawn-mocha'),
  jshint = require('gulp-jshint'),
  instance,
  config = require('config');

gulp.task('default', ['start']);

gulp.task('start', function (done) {
  instance = require('./server').listen(config.port, done);
});

gulp.task('stop', function (done) {
  instance.close(function () {
    instance = undefined;
    done();
  });
});

gulp.task('watch', function() {
  return gulp.watch([
      'server.js',
      'routes/**/*.js',
      'services/**/*.js',
      'test/**/*.js'
    ], ['unit']);
});

gulp.task('unit', function() {
  return gulp.src(['test/unit/**/*.js'])
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test', ['unit']);

gulp.task('jshint', function() {
  return gulp.src([
    'services/**/*.js',
    'app/**/*.js',
    'config/**/*.js',
    'middleware/**/*.js',
    'routes/**/*.js',
    'main.js',
    'server.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

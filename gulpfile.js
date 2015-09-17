/*globals process, require*/

/**
 * Instructions for Gulp build tool for the Sqwerl Sproutcore-generated web client application.
 */
var childProcess = require('child_process'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    gzip = require('gulp-zip'),
    moment = require('moment'),
    plugins = require('gulp-load-plugins')();

gulp.task('all', ['clean', 'lint:js', 'test', 'stage']);

gulp.task('build', ['clean', 'lint:js', 'test']);

gulp.task('clean', function () {
    'use strict';
    return del(['./builds', './tmp', './apps/sqwerl/tmp']);
});

gulp.task('default', ['clean', 'lint:js', 'test'], function () {
    'use strict';
    return gulp.start('deploy');
});

gulp.task('deploy', ['pack']);

gulp.task('lint:js', function () {
    'use strict';
    return gulp.src([
        'gulpfile.js',
        'apps/sqwerl/controllers/*.js',
        'apps/sqwerl/data_sources/*.js',
        'apps/sqwerl/en/*.js',
        'apps/sqwerl/models/*.js',
        'apps/sqwerl/resources/*.js',
        'apps/sqwerl/views/*.js',
        'apps/sqwerl/configuration.js',
        'apps/sqwerl/core.js',
        'apps/sqwerl/main.js',
        'apps/sqwerl/theme.js'
    ]).pipe(plugins.jscs())
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('pack', function () {
    'use strict';
    var time = moment().format('MM-DD-YYYY');
    return gulp.src(['./tmp/staging/**'])
        .pipe(gzip('sqwerl-' + time + '.zip'))
        .pipe(gulp.dest('./tmp/target'));
});

gulp.task('stage', ['build'], function () {
    'use strict';
    var child = childProcess.spawn('sproutcore', ['build', 'sqwerl', '-v'], { cwd: process.cwd() });
    child.stdout.on('data', function (data) {
        gutil.log(data);
    });
    child.stderr.on('data', function (data) {
        gutil.log(gutil.colors.red(data));
    });
    child.on('close', function (code) {
        gutil.log('Exit code for stage process: ', code);
    });
    return child;
});

gulp.task('test', function () {
    'use strict';
    // TODO
});
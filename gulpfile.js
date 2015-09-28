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

gulp.task('all', function () {
    'use strict';
    return gulp.start('pack');
});

gulp.task('build', function () {
    'use strict';
    var child = childProcess.spawn('sproutcore', ['build', 'sqwerl', '-v'], { cwd: process.cwd() });
    child.stdout.on('data', function (data) {
        gutil.log(data);
    });
    child.stderr.on('data', function (data) {
        gutil.log(gutil.colors.red(data));
    });
    child.on('close', function (code) {
        gutil.log('Exit code for build process: ', code);
    });
    return child;
});

gulp.task('clean', function () {
    'use strict';
    return del(['./builds', './tmp', './apps/sqwerl/tmp']);
});

gulp.task('default', function () {
    'use strict';
    return gulp.start('build');
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
    gulp.src('./tmp/build/static/sqwerl/en/*').pipe(
        plugins.map(function (file) {
            var id = file.history[0].split('/').pop();
            gulp.src('./tmp/build/static/sqwerl/en/' + id + '/stylesheet@2x-packed.css')
                .pipe(gulp.dest('./tmp/staging/static/sqwerl/en/' + id + '/'));
            gulp.src('./apps/sqwerl/themify.ttf')
                .pipe(gulp.dest('./tmp/staging/static/sqwerl/en/' + id + '/'));
            gulp.src('./apps/sqwerl/resources/small-sqwerl-logo.png')
                .pipe(gulp.dest('./tmp/staging/static/sqwerl/en/' + id + '/'));
            gulp.src('./apps/sqwerl/resources/favicon.ico')
                .pipe(gulp.dest('./tmp/staging/static/sqwerl/en/' + id + '/'));
            return gulp.src(['./tmp/staging/**'])
                .pipe(gzip('sqwerl-' + time + '.zip'))
                .pipe(gulp.dest('./tmp/target'));
        })
    );
});

gulp.task('test', function () {
    'use strict';
    // TODO
});

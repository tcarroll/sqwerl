/*globals require*/

var del = require('del'),
    gulp = require('gulp'),
    gzip = require('gulp-zip'),
    moment = require('moment'),
    plugins = require('gulp-load-plugins')();

gulp.task('all', ['default'], function () {
    'use strict';
});

gulp.task('build', ['clean', 'lint:js', 'test'], function () {
    'use strict';
});

gulp.task('clean', function () {
    'use strict';
    del(['./builds', './tmp', './apps/sqwerl/tmp']);
});

gulp.task('default', ['clean', 'lint:js', 'test'], function () {
    'use strict';
    gulp.start('deploy');
});

gulp.task('deploy', ['pack'], function () {
    'use strict';
});

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

gulp.task('pack', ['stage'], function () {
    'use strict';
    var time = moment().format('MM-DD-YYYY');
    return gulp.src(['./tmp/build'])
        .pipe(gzip('sqwerl-' + time + '.zip'))
        .pipe(gulp.dest('target'));
});

gulp.task('stage', ['build'], function () {
    'use strict';
    // TODO - Copy apps/sqwerl/jquery.flypanels.min.js to tmp/build/static
    // TODO - Copy apps/sqwerl/sweetalert2.min.js to tmp/build/static
});

gulp.task('test', function () {
    'use strict';
});
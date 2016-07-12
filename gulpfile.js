'use strict';

var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();

gulp.task( 'watch', function() {
    // Watch .less files
    gulp.watch( 'design/**/*.less', [ 'styles' ] );

    // Watch .js files
    gulp.watch( 'scripts/**/*.js', [ 'scripts' ] );

    gulp.watch( 'web/*', [ 'markup' ] );

    // Watch image files
    gulp.watch( 'design/images/**/*', [ 'images' ] );

    // Watch design assets
    gulp.watch( 'design/images/**/*', [ 'design-assets' ] );
});

gulp.task( 'styles', function() {
    var condition = function( file ) {
        return !file.lesshint.success;
    };

    return gulp.src( './design/style.less' )
        .pipe( plugins.lesshint() )
        .pipe( plugins.lesshint.reporter() )
        .pipe( plugins.notify( function ( file ) {
            if ( file.lesshint.success ) {
                // Don't show something if success
                return false;
            }

            return file.relative + ' errored with ' + file.lesshint.resultCount + ' errors';
        }) )
        .pipe( plugins.ignore.exclude( condition ) )
        .pipe( plugins.less() )
        .pipe( plugins.autoprefixer( 'last 2 version' ) )
        .pipe( plugins.rename( { suffix: '.min' } ) )
        .pipe( plugins.cssnano() )
        .pipe( gulp.dest( './dist/' ) )
});

gulp.task( 'scripts', function() {
    return gulp.src( './scripts/**/*.js' )
        .pipe( plugins.concat( 'scripts.js' ) )
        .pipe( plugins.uglify() )
        .pipe( plugins.rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( './dist/' ) );
});

gulp.task( 'images', function() {
    return gulp.src( 'design/images/**/*' )
        .pipe( plugins.cache( plugins.imagemin( {
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        } ) ) )
        .pipe( gulp.dest( 'dist/images' ));
});

gulp.task( 'design-assets', function() {
    return gulp.src( './design/assets/*' )
        .pipe( gulp.dest( './dist/assets/' ) );
});

gulp.task( 'markup', function() {
    return gulp.src( './web/*' )
        .pipe( gulp.dest( './dist/' ) );
});

gulp.task( 'start', [ 'default', 'watch' ] );

gulp.task( 'default', [ 'styles', 'scripts', 'images', 'design-assets', 'markup' ] );

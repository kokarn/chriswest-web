'use strict';

var gulp = require( 'gulp' );
var pump = require( 'pump' );
var plugins = require( 'gulp-load-plugins' )();

gulp.task( 'watch', function() {
    // Watch .less files
    gulp.watch( 'design/**/*.less', [ 'styles' ] );

    // Watch .js files
    gulp.watch( 'scripts/**/*.js', [ 'scripts' ] );

    // Watch default assets
    gulp.watch( 'web/*', [ 'markup' ] );

    // Watch image files
    gulp.watch( 'design/images/**/*', [ 'images' ] );

    // Watch design assets
    gulp.watch( 'design/images/**/*', [ 'design-assets' ] );
});

gulp.task( 'connect', function() {
    plugins.connect.server({
        root: 'dist'
    });
});

gulp.task( 'styles', function( callback ) {
    var condition = function( file ) {
        return !file.lesshint.success;
    };

    pump(
        [
            gulp.src( './design/style.less' ),
            plugins.lesshint(),
            plugins.lesshint.reporter(),
            plugins.notify( function ( file ) {
                if ( file.lesshint.success ) {
                    // Don't show something if success
                    return false;
                }

                return file.relative + ' errored with ' + file.lesshint.resultCount + ' errors';
            }),
            plugins.ignore.exclude( condition ),
            plugins.less(),
            plugins.autoprefixer( 'last 2 version' ),
            plugins.cssnano(),
            plugins.rename( { suffix: '.min' } ),
            gulp.dest( './dist/' ),
        ],
        callback
    );
});

gulp.task( 'scripts', function( callback ) {
    pump(
        [
            gulp.src( './scripts/**/*.js' ),
            plugins.concat( 'scripts.js' ),
            plugins.uglify(),
            plugins.rename( { suffix: '.min' } ),
            gulp.dest( './dist/' )
        ],
        callback
    );
});

gulp.task( 'images', function( callback ) {
    pump(
        [
            gulp.src( 'design/images/**/*' ),
            plugins.cache( plugins.imagemin( {
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            } ) ),
            gulp.dest( 'dist/images' )
        ],
        callback
    );
});

gulp.task( 'design-assets', function( callback ) {
    pump(
        [
            gulp.src( './design/assets/*' ),
            gulp.dest( './dist/assets/' )
        ],
        callback
    );
});

gulp.task( 'markup', function( callback ) {
    pump(
        [
            gulp.src( './web/*' ),
            gulp.dest( './dist/' )
        ],
        callback
    );
});

gulp.task( 'start', [ 'default', 'connect', 'watch' ] );

gulp.task( 'default', [ 'styles', 'scripts', 'images', 'design-assets', 'markup' ] );

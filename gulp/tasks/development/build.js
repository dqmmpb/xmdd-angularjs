// generated on 2016-01-06 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import {build as config}  from '../../config';

const $ = gulpLoadPlugins();

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {

  browserSync.notify('Building');

  return gulp.src(config.development.src)
    .pipe($.size({title: 'build', gzip: true}));
});

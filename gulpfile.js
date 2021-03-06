const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const ghPages = require('gulp-gh-pages');

gulp.task('lint-styles', function() {
  gulp.src('app/stylesheets/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('copy:index', function() {
  const cssStream = gulp
    .src('style.css', {read: false, cwd: __dirname + '/dist/'});
  gulp.src('app/index.html')
    .pipe(inject(cssStream, {removeTags: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:static', function() {
   gulp.src(['app/data/**/*']).pipe(gulp.dest('dist/data'));
   gulp.src(['app/images/**/*']).pipe(gulp.dest('dist/images'));
   gulp.src(['app/layers/**/*']).pipe(gulp.dest('dist/layers'));
   gulp.src(['app/favicon.ico']).pipe(gulp.dest('dist'));
 });

gulp.task('clean:dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('cp:dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
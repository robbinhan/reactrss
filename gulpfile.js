var gulp = require('gulp'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    source = require('vinyl-source-stream'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss');



gulp.task('build-jsx', function () {
  browserify({
    entries: ['index.js'],
    basedir: 'assets/js/'
  })
  .transform('babelify')
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('public/js/'));

  browserSync.reload();
});

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 2 version']}),
  ];
  gulp.src('./assets/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css/'));

  browserSync.reload();
});

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/js/*",["build-jsx"]);
    gulp.watch("assets/css/*",["css"]);
});

gulp.task('default', ['serve']);
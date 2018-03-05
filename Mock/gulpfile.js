//http://david-barreto.com/working-with-sass-bootstrap-and-gulp/
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();


//,'assets/js/vendor/*.js', 'assets/js/main.js', 'assets/js/module*.js'
gulp.task('pack-js', function () {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'])

    

    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/build/js'));
});

gulp.task('pack-css', function () {
  return gulp.src([
    'assets/css/bootstrap.css',
    'assets/css/font-awesome.css',
    'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
    'assets/css/style.css'
  ])
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest('public/build/css'));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src([
      'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('public/build/fonts/'));
});

gulp.task('webserver', function () {
  gulp.src('.')
    .pipe(webserver({
      fallback: 'index.html',
      //livereload: true,
      //directoryListing: true,
      open: true
    }));
});


gulp.task('styles', function () {
  gulp.src('assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browserSync.stream());
  //gulp.src('node_modules/font-awesome/scss/font-awesome.scss')
  //  .pipe(sass().on('error', sass.logError))
  //  .pipe(gulp.dest('./assets/css/'));
  //gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
  //  .pipe(sass().on('error', sass.logError))
  //  .pipe(gulp.dest('./assets/css/'));
  

});

gulp.task('move',
  function() {
    gulp.src('node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css')
      .pipe(gulp.dest('./assets/css/'));

  });
gulp.task('watch', function() {
    gulp.watch('assets/sass/**/*.scss', ['styles']);
  }
);
//Watch task
gulp.task('default', ['styles', 'pack-js', 'pack-css','fonts']);

//gulp.task('all', ['watch', 'webserver']);
gulp.task('all', ['move', 'pack-js','styles','fonts'],
  function() {
    browserSync.init({ server: '.' });

    gulp.watch('assets/sass/**/*.scss', ['styles']);
    gulp.watch('./*.html').on('change', browserSync.reload);

  });
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');


// CSS preprocessor
gulp.task('sass', function(){
  return gulp.src('app/resources/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/resources/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Browser-Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// Distribution with js/css minification
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Image Optimization
gulp.task('images', function(){
  return gulp.src('app/resources/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/resources/images'))
});

//Copying Icons to Dist
gulp.task('icons', function() {
  return gulp.src('app/resources/icons/**/*')
  .pipe(gulp.dest('dist/resources/icons'))
});

//Cleaning up generated files automatically
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

//Clear Cache
gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})

// Watching
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/resources/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// Build Sequences
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'icons'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
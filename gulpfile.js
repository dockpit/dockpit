var gulp = require("gulp")
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var plumber = require("gulp-plumber")
var livereload = require('gulp-livereload')

//compiles all javascript
var compile = function(watch) {
  var bundler = browserify('./src/js/app.js', { debug: true }).transform(babelify)

  var rebundle = function() {
    //@todo, copy helper files in ./src
    return bundler.bundle()
      .on('error', function (err) {
            gutil.log(gutil.colors.red("Bundling Error:"), err.toString());
            this.emit("end");
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist'))
      .pipe(livereload())
  }

  if (watch) {
    watchify(bundler).on('update', function() {
      gutil.log("Rebundling...")
      var start = new Date().getTime();
      rebundle();
      gutil.log("Done! (", (new Date().getTime()) - start, "ms )")
    })
  }

  return rebundle()
}

gulp.task('watch', function() {
  livereload.listen();
  gutil.log("Livereload (tiny-lr) listening on http://localhost:35729")
  return compile(true)
})

gulp.task('default', ['watch'])



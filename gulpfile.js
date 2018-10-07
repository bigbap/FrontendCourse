var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('copy_js', function(evt){
  gulp.src(['node_modules/jquery/dist/*.js', 
    'node_modules/bootstrap/dist/js/*.js', 
    'node_modules/requirejs/require.js',
    'node_modules/mustache/*.js']).pipe(gulp.dest('public/js/external'));
});

gulp.task('copy_css', function(evt){
  gulp.src('node_modules/bootstrap/dist/css/*.css').pipe(gulp.dest('public/css/external'));
});
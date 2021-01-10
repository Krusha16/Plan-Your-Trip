const {src, dest, series} = require('gulp');

function htmlTask(){
  return src('src/*html')
  .pipe(dest('dist'))
}

function scriptsTask(){
  return src('src/js/*.js')
  .pipe(dest('dist/js'))
}

function stylesTask(){
  return src(['src/css/*'])
  .pipe(dest('dist/css'))
}

exports.html = htmlTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.default = series(htmlTask, scriptsTask, stylesTask);

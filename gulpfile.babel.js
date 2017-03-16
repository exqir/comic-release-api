var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require("del");

gulp.task("default", ['clean','babel','watch'] ,function () {

});

gulp.task("clean", function () {
  return del("dist/**/*");
});

gulp.task("babel", function () {
  return gulp
    .src(["src/index.js","src/**/*.js"])
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
  return gulp
    .watch(["src/index.js","src/**/*.js"],["clean","babel"])
    .on("change", function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

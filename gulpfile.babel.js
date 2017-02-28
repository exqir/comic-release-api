var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", ['watch'] ,function () {

});

gulp.task("babel", function () {
  return gulp
    .src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
  return gulp
    .watch("src/**/*.js",["babel"])
    .on("change", function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

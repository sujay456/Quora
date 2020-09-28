const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

// there will be task for evry task
// here for css
gulp.task("css", function (done) {
  console.log("minifying css...");
  gulp
    .src("./assets/scss/**/*.scss") //all these files are need to be compressed
    .pipe(sass()) //this is converting scss into css
    .pipe(cssnano({ zindex: false })) //this is minifying the css
    .pipe(gulp.dest("./assets/css")); //this is storing the minfied css in the public folder for production mode

  gulp
    .src("./assets/**/*.css")
    .pipe(rev()) //reversioning
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        // cwd: "public",
        base: "./public/assets",

        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...");
  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        // cwd: "public",
        base: "./public/assets",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("img", function (done) {
  console.log("compressing images...");
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)") //regular expression regx
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        // cwd: "public",
        base: "./public/assets",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("audio", function (done) {
  console.log("Comprssing mp3");
  gulp
    .src("./assets/**/*.mp3")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        base: "./public/assets",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));

  done();
});

// empty the public/assets directory
gulp.task("clean:assets", function (done) {
  del.sync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "img", "audio"),
  function (done) {
    console.log("Building assets");
    done();
  }
);

import gulp from "gulp";
import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";

import fonter from "gulp-fonter";
import ttf2woof2 from "gulp-ttf2woff2";

function OtfToTtf() {
  return gulp
    .src(PATH.SOURCE_FOLDER + "/fonts/*.otf", {})
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(gulp.dest(PATH.SOURCE_FOLDER + "/fonts/"));
}

function ttfToWoff() {
  return gulp
    .src(PATH.SOURCE_FOLDER + "/fonts/*.ttf", {})
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fonter({ formats: ["woff"] }))
    .pipe(gulp.dest(PATH.build.fonts))

    .pipe(gulp.src(PATH.SOURCE_FOLDER + "/fonts/*.ttf"))
    .pipe(ttf2woof2())
    .pipe(gulp.dest(PATH.build.fonts));
}

export const fonts = gulp.series(OtfToTtf, ttfToWoff);

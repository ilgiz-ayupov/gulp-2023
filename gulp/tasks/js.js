import gulp from "gulp";
import webpack from "webpack-stream";

import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";


export function js() {
  return gulp
    .src(PATH.src.js, { sourcemaps: app.isDev })
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: app.isProd ? "production" : "development",
        output: {
          filename: "app.min.js",
        },
      })
    )
    .pipe(gulp.dest(PATH.build.js))
    .pipe(PLUGINS.browserSync.stream());
}

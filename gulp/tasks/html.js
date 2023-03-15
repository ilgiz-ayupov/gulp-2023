import gulp from "gulp";
import fileInclude from "gulp-file-include";
import webpHTML from "gulp-webp-html-nosvg";
import version from "gulp-version-number";

import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";

export function html() {
  return gulp
    .src(PATH.src.html)
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(PLUGINS.replace(/images\//g, "assets/images/"))
    .pipe(PLUGINS.replace(/icons\//g, "assets/icons/"))
    .pipe(PLUGINS.ifPlugin(app.isProd, webpHTML()))
    .pipe(
      PLUGINS.ifPlugin(
        app.isProd,
        version({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: { file: "gulp/version.json" },
        })
      )
    )
    .pipe(gulp.dest(PATH.build.html))
    .pipe(PLUGINS.browserSync.stream());
}

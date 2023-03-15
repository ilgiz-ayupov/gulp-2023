import gulp from "gulp";
import compilerSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpCss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";

const sass = gulpSass(compilerSass);

export function scss() {
  return gulp
    .src(PATH.src.scss, { sourcemaps: app.isDev })
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(PLUGINS.replace(/images\//g, "../assets/images/"))
    .pipe(PLUGINS.replace(/icons\//g, "../assets/icons/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(PLUGINS.ifPlugin(app.isProd, groupCssMediaQueries()))
    .pipe(
      PLUGINS.ifPlugin(
        app.isProd,
        webpCss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
          replace_from: /\.(png|jpg|jpeg)/,
          replace_to: ".webp",
        })
      )
    )
    .pipe(
      PLUGINS.ifPlugin(
        app.isProd,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(PLUGINS.ifPlugin(app.isProd, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest(PATH.build.scss))
    .pipe(PLUGINS.browserSync.stream());
}

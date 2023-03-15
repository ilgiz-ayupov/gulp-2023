import gulp from "gulp";
import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";

import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import webp from "gulp-webp";

export function images(done) {
  return gulp
    .src(PATH.src.images)
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(PLUGINS.newer(PATH.build.images))
    .pipe(PLUGINS.ifPlugin(app.isProd, webp()))
    .pipe(PLUGINS.ifPlugin(app.isProd, gulp.dest(PATH.build.images)))

    .pipe(PLUGINS.ifPlugin(app.ifProd, gulp.src(PATH.src.images)))
    .pipe(PLUGINS.ifPlugin(app.isProd, PLUGINS.newer(PATH.build.images)))
    .pipe(
      PLUGINS.ifPlugin(
        app.isProd,
        imagemin([
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
          svgo({
            plugins: [
              {
                name: "removeViewBox",
                active: true,
              },
              {
                name: "cleanupIDs",
                active: false,
              },
            ],
          }),
        ])
      )
    )

    .pipe(gulp.dest(PATH.build.images))
    .pipe(PLUGINS.browserSync.stream());
}

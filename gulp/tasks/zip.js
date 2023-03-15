import gulp from "gulp";
import { deleteAsync } from "del";
import zipPlugin from "gulp-zip";

import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";

export async function zip() {
  await deleteAsync(PATH.ROOT_FOLDER + ".zip");

  return gulp
    .src(PATH.BUILD_FOLDER + "/**/*.*", {})
    .pipe(
      PLUGINS.plumber(
        PLUGINS.notify.onError({
          title: "ZIP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(PATH.ROOT_FOLDER + ".zip"))
    .pipe(gulp.dest("./"));
}

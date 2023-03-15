import gulp from "gulp";
import { PATH } from "../config/path.js";

export function copy() {
  return gulp.src(PATH.src.files).pipe(gulp.dest(PATH.build.files));
}

import gulp from "gulp";

import { PATH } from "./gulp/config/path.js";

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { server } from "./gulp/tasks/server.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";

global.app = {
  isDev: !process.argv.includes("--build"),
  isProd: process.argv.includes("--build"),
};

function watcher() {
  gulp.watch(PATH.watch.files, copy);
  gulp.watch(PATH.watch.html, html);
  gulp.watch(PATH.watch.scss, scss);
  gulp.watch(PATH.watch.js, js);
  gulp.watch(PATH.watch.images, images);
}

const MAIN_TASKS = gulp.parallel(copy, html, scss, js, images);
const DEV_MODE = gulp.series(reset, MAIN_TASKS, gulp.parallel(server, watcher));
const PROD_MODE = gulp.series(reset, fonts, MAIN_TASKS);
const DEPLOY_MODE = gulp.series(reset, fonts, MAIN_TASKS, zip);

gulp.task("fonts", fonts);
gulp.task("default", DEV_MODE);
gulp.task("build", PROD_MODE);
gulp.task("deploy", DEPLOY_MODE);

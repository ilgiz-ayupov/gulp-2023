import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";

export const PLUGINS = {
  replace,
  plumber,
  notify,
  browserSync,
  newer,
  ifPlugin,
};

import * as path from "path";

const ROOT_FOLDER = path.basename(path.resolve());
const BUILD_FOLDER = "./dist";
const SOURCE_FOLDER = "./src";

export const PATH = {
  build: {
    files: BUILD_FOLDER + "/files/",
    html: BUILD_FOLDER,
    scss: BUILD_FOLDER + "/css/",
    js: BUILD_FOLDER + "/scripts/",
    images: BUILD_FOLDER + "/assets/",
    fonts: BUILD_FOLDER + "/fonts/",
  },
  src: {
    files: SOURCE_FOLDER + "/files/**/*.*",
    html: SOURCE_FOLDER + "/*.html",
    scss: SOURCE_FOLDER + "/scss/main.scss",
    js: SOURCE_FOLDER + "/scripts/app.js",
    images:
      SOURCE_FOLDER + "/{images,icons}/**/*.{jpg,jpeg,png,git,webp,ico,svg}",
  },
  watch: {
    files: SOURCE_FOLDER + "/files/**/*.*",
    html: SOURCE_FOLDER + "/**/*.html",
    scss: SOURCE_FOLDER + "/scss/**/*.scss",
    js: SOURCE_FOLDER + "/scripts/**/*.js",
    images:
      SOURCE_FOLDER + "/{images,icons}/**/*.{jpg,jpeg,png,git,webp,ico,svg}",
  },
  clean: BUILD_FOLDER,
  ROOT_FOLDER,
  BUILD_FOLDER,
  SOURCE_FOLDER,
  ftp: "",
};

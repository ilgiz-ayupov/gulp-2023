import { PATH } from "../config/path.js";
import { PLUGINS } from "../config/plugins.js";

export function server(done) {
  PLUGINS.browserSync.init({
    server: {
      baseDir: PATH.build.html,
    },
    notify: false,
    open: false,
    port: 3000,
  });
}

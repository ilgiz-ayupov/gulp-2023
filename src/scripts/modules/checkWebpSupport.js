export function checkWebpSupport() {
  function testWebp(callback) {
    const img = new Image();
    img.onload = function () {
      callback(true);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src =
      "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  }

  testWebp(function (support) {
    const className = support ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  });
}

/* eslint-disable */
const fs = require("fs");

const { src, dest, parallel, series } = require("gulp");
const less = require("gulp-less");
const filter = require("gulp-filter");
const minifyCSS = require("gulp-csso");
const ts = require("gulp-typescript");
const replace = require("gulp-replace");

const del = require("del");

const filterThemes = filter(file =>
  fs.existsSync(`${file.dirname}/${file.stem}.config`)
);

const tsProject = ts.createProject("tsconfig.json");

function clean() {
  return del(["dist"]);
}

function buildLess() {
  return src("src/style/*.less")
    .pipe(filterThemes)
    .pipe(less({ rewriteUrls: "all" }))
    .pipe(minifyCSS())
    .pipe(dest("dist/style"));
}

function assets() {
  return src("src/style/themes/**/assets/**/*").pipe(dest("dist/style/themes"));
}

function typescriptThemeImport() {
  return src("dist/components/HiroTheme.js")
    .pipe(replace(".less", ".css"))
    .pipe(dest("dist/components", { overwrite: true }));
}

function buildTS() {
  return src("src/**/*.{ts,tsx}", { ignore: "src/**/*.test.*" })
    .pipe(tsProject())
    .pipe(dest("dist"));
}

const css = parallel(buildLess, assets);
const typescript = series(buildTS, typescriptThemeImport);

exports.css = css;
exports.ts = typescript;
exports.clean = clean;
exports.default = series(clean, parallel(css, typescript));

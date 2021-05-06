"use strict";

const argv = require("minimist")(process.argv.slice(2));
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const del = require("del");
const fs = require("fs");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const handlebars = require("gulp-compile-handlebars");
const handlebarsHelpers = require("./config/build/helper.js").helpers();
const imagemin = require("gulp-imagemin");
const path = require("path");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-bulk-import");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");
const compiler = require("webpack");
/* Source Path file folder */
const src_assets_folder = path.resolve(__dirname, "src/assets");
const src_folder_components = path.resolve(__dirname, "src/components");
const src_folder_partials = path.resolve(__dirname, "src/partials");
const src_folder_pages = path.resolve(__dirname, "src/pages");
const dist_folder = path.resolve(__dirname, "dist");
const dist_assets_folder = path.resolve(__dirname, "dist/assets");
const srcScript = path.resolve(__dirname, "src/assets/js/index.js");
const srcPDF = path.resolve(__dirname, "PDF");

const npm_assets = {
  js: [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.js",
    "node_modules/babel-polyfill/dist/polyfill.js",
  ],
  css: [
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
};
const npm_assets_js = npm_assets.js;
const npm_assets_css = npm_assets.css;

const config = {
  development:
    argv.dev ||
    argv.development ||
    (argv.hasOwnProperty("environment") &&
      (argv.environment === "development" || argv.environment === "dev")),
  usePolling: process.platform === "win32" || process.platform === "linux",
};
const webpackConfigDev = {
  entry: srcScript,
  output: {
    path: dist_folder,
    filename: "main.min.js",
  },
  mode: "none",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
const webpackConfigProd = {
  entry: srcScript,
  output: {
    path: dist_folder,
    filename: "main.min.js",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
console.log(
  `** Current environment is: ${!config.development ? "PROD" : "DEV"}`
);

gulp.task("clear", () => del([dist_folder]));

gulp.task("html", () => {
  const tempData = JSON.parse(
    fs.readFileSync("./config/build/template-data.json")
  );
  const options = {
    batch: [src_folder_pages, src_folder_components, src_folder_partials],
    helpers: handlebarsHelpers
  };

  return gulp
    .src("src/pages/*.html")
    .pipe(handlebars(tempData, options))
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task("sass", () => {
  return gulp
    .src(src_assets_folder + "/scss/main.scss")
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass())
    .on("error", (error) => {
      if (error) {
        console.warn(error.status);
        console.warn(error.column);
        console.warn(error.message);
        console.warn(error.line);
      }
    })
    .pipe(gulpif(config.development, sourcemaps.init()))
    .pipe(autoprefixer())
    .pipe(
      cssnano({
        zindex: false,
        convertValues: false,
      })
    )
    .pipe(gulpif(config.development, sourcemaps.write()))
    .pipe(concat("main.css"))
    .pipe(gulp.dest(dist_assets_folder + "/css"))
    .pipe(browserSync.stream());
});
gulp.task("sassVendor", cb => {
  if (npm_assets_css.length === 0) {
    cb();
    return;
  }
  return gulp
    .src(npm_assets_css, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      cssnano({
        zindex: false,
        convertValues: false,
        minifyGradients: false,
        autoprefixer: {
          browsers: ["> 1%", "last 2 versions", "Firefox >= 20"],
          add: true,
        },
      })
    )
    .pipe(gulp.dest(dist_assets_folder + "/css/vendor/"));
});

gulp.task("js", () => {
  return gulp
    .src(srcScript)
    .pipe(
      webpack(
        config.development ? webpackConfigDev : webpackConfigProd,
        compiler
      )
    )
    .pipe(gulpif(!config.development, uglify()))
    .pipe(gulp.dest(dist_assets_folder + "/js"))
    .pipe(browserSync.stream());
});
gulp.task("jsVendor", (cb) => {
  if (npm_assets_js.length === 0) {
    cb();
    return;
  }
  return gulp
    .src(npm_assets.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest(dist_assets_folder + "/js/vendor/"))
    .pipe(browserSync.stream());
});

gulp.task("images", () => {
  return gulp
    .src([src_assets_folder + "/images/**/*.+(png|jpg|jpeg|gif|svg|ico|pdf)"], {
      since: gulp.lastRun("images"),
    })
    .pipe(plumber())
    .pipe(gulp.dest(dist_assets_folder + "/images"))
    .pipe(browserSync.stream());
});

gulp.task("icons", () => {
  return gulp
    .src([src_assets_folder + "/fonts/**/*"], { since: gulp.lastRun("icons") })
    .pipe(plumber())
    .pipe(gulp.dest(dist_assets_folder + "/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("pdf", () => {
  return gulp
    .src([srcPDF + "/**/*"], { since: gulp.lastRun("pdf") })
    .pipe(plumber())
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task(
  "build",
  gulp.series(
    "clear",
    "html",
    "sass",
    "sassVendor",
    "js",
    "jsVendor",
    "images",
    "icons",
    "pdf"
  )
);

gulp.task(
  "dev",
  gulp.series("html", "sass", "sassVendor", "js", "jsVendor", "pdf")
);

gulp.task("serve", () => {
  return browserSync.init({
    server: {
      baseDir: dist_folder,
      directory: true,
    },
    port: 3000,
    open: true
  });
});

gulp.task("watch", () => {
  const watchImages = ["src/assets/images/**/*.+(png|jpg|jpeg|gif|svg|ico)"];
  const watch = [
    "src/pages/*.html",
    "src/components/**/*.hbs",
    "src/components/**/*.scss",
    "src/components/**/*.js",
    "src/partials/**/*.hbs",
    "src/assets/scss/**/*.scss",
    "src/assets/js/**/*.js",
    "PDF/**/*",
  ];
  gulp.watch(watch, gulp.series("dev")).on("change", browserSync.reload);
  gulp
    .watch(watchImages, gulp.series("images"))
    .on("change", browserSync.reload);
});

gulp.task("default", gulp.series("build", gulp.parallel("serve", "watch")));

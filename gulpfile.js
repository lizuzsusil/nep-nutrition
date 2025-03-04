import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import fileinclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

// File paths
const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  html: {
    src: ['src/**/*.html', '!src/components/**'],
    dest: 'dist'
  },
  components: {
    src: 'src/components/**/*.html'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets'
  }
};

// Clean dist folder
async function clean() {
  return await deleteAsync(['dist']);
}

// Compile SCSS to CSS
function styles() {
  return gulp.src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(bs.stream());
}

// Process HTML and include components
function html() {
  return gulp.src(paths.html.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());
}

// Copy assets
function assets() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
}

// Watch files
function watch() {
  bs.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(paths.scss.src, styles);
  gulp.watch([paths.html.src, paths.components.src], html);
  gulp.watch(paths.assets.src, assets);
}

// Define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, html, assets));
const dev = gulp.series(build, watch);

// Export tasks
export {
  clean,
  styles,
  html,
  assets,
  build,
  dev
};

export default dev;
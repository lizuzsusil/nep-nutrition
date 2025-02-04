<p align="center">
  <img src="/public/logo.jpg" width="80" alt="Logo" />
</p>
<h1 align="center">NepNutrition</h1>

## Installation

Use the package manager [NPM](https://www.npmjs.com/) to install dependencies.

## Install & run

Make sure you have nodejs `18.0.0` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Setup a new project with Gulpjs

This is what your basic project structure

```
your-project/
├── src/
│   ├── scss/
│   │   ├── styles.scss
│   │   └── components/
│   ├── components/
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── nav.html
│   ├── assets/
│   │   └── images/
│   └── index.html
├── gulpfile.js
└── package.json
```

Initialize a new Node.js project:

```bash
npm init -y
```

Install Gulp globally (this allows you to run gulp commands from any directory):

```bash
npm install --global gulp-cli
```

Install Gulp and all required dependencies locally in your project:

```bash
npm install --save-dev gulp gulp-sass sass gulp-file-include browser-sync del gulp-autoprefixer gulp-clean-css
```

Modify your [package.json](./package.json). Add this line at the top level:

```bash
{
  "type": "module",
  // ... rest of your package.json
}
```

Create a newfile 'gulpfile.js' at the root directory of your project:

```bash
touch gulpfile.js
```

Add the provided code to [gulpfile.js](./gulpfile.js):

```bash
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
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
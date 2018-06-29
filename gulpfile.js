'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let autoprefixer = require('gulp-autoprefixer');
let cssnano = require('cssnano');
let pug = require('gulp-pug');
let browserSync = require('browser-sync');
let runSequence = require('run-sequence');
let del = require('del');
let sassLint = require('gulp-sass-lint');
let cache = require('gulp-cache');
let imagemin = require('gulp-imagemin');
let svgstore = require('gulp-svgstore');
let svgmin = require('gulp-svgmin');
let path = require('path');
let rename = require('gulp-rename');
let inject = require('gulp-inject');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    logPrefix: 'IDP-starter',
    open: false,
    port: 9000
  })
});

gulp.task('sass-lint', function () {
  return gulp.src(['assets/sass/blocks/**/*.sass', '!assets/sass/blocks/index.sass'])
    .pipe(sassLint({
      rules: {
        // Ковычки у аттрибутов, пример: span[lang~="en-us"]
        'attribute-quotes': 1,

        // Порядок свойств
        'property-sort-order': [
          1,
          {
            'order': 'concentric',
          }
        ],

        // Глубина БЭМ
        'bem-depth': 2,

        // Формат написания классов
        'class-name-format': [
          2,
          {
            'convention': 'strictbem',
          }
        ],

        // Формат написания переменных
        'variable-name-format': [
          2,
          {
            'convention': 'camelcase',
          }
        ],

        // Цвета должны быть переменными
        'no-color-literals': 1,
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('sass', function() {
  var processors = [
      autoprefixer,
      cssnano
  ];
  return gulp.src('assets/sass/style.sass')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ 
      stream: true
    }))
});

gulp.task('pug', function() {
  gulp.src('./templates/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
})

gulp.task('images', function() {
  return gulp.src('assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('build/images'))
});

gulp.task('svgstore', function () {
  return gulp
    .src('assets/svg/**/*.svg', { base: 'assets/svg' })
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/svg/'));
});

gulp.task('clean', function() {
  return del.sync(['build/**/*', '!build/media/img', '!build/media/img/**/*', '!build/.gitkeep']);
});

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.sass', ['sass', 'sass-lint']);
  gulp.watch('templates/**/*.pug', ['pug']);
  gulp.watch('assets/images/**/*.*', ['images']);
});

gulp.task('default', function(callback) {
  runSequence(['pug', 'sass', 'fonts', 'images', 'svgstore', 'browserSync', 'sass-lint', 'watch'],
    callback
  )
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'sass',
    'pug',
    'images',
    'svgstore',
    ['fonts'],
    callback
  )
});
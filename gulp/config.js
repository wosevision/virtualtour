'use strict';

export default {

  serverProxy: 'http://localhost:3000',
  UIPort: 3001,
  testPort: 3002,
  browserPort: 4000,

  sourceDir: './app/',
  buildDir: './build/',

  styles: {
    index: 'app/main.scss',
    src: 'app/components/**/*.scss',
    dest: 'build/css',
    prodSourcemap: false,
    sassIncludePaths: [ ]
  },

  scripts: {
    src: 'app/components/**/*.js',
    dest: 'build/js',
    test: 'test/**/*.js',
    gulp: 'gulp/**/*.js'
  },

  images: {
    src: 'app/images/**/*',
    dest: 'build/images'
  },

  fonts: {
    src: ['app/fonts/**/*'],
    dest: 'build/fonts'
  },

  assetExtensions: [
    'js',
    'css',
    'png',
    'jpe?g',
    'html',
    'gif',
    'svg',
    'eot',
    'otf',
    'ttc',
    'ttf',
    'woff2?'
  ],

  views: {
    index: 'app/index.html',
    src: 'app/components/**/*.html',
    dest: 'app/components'
  },

  gzip: {
    src: 'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'build/',
    options: {}
  },

  browserify: {
    bundleName: 'main.js',
    prodSourcemap: false
  },

  test: {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
  },

  init: function() {
    this.views.watch = [
      this.views.index,
      this.views.src
    ];
    this.styles.watch = [
      this.styles.index,
      this.styles.src
    ];

    return this;
  }

}.init();

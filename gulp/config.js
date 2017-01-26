'use strict';

export default {

  browserPort: 4000,
  UIPort: 4001,
  testPort: 4002,

  sourceDir: './app/',
  buildDir: '../virtualtour-ks/public/', //'./build/',
  componentsDir: './app/components', 
  docsDir: './docs',

  styles: {
    index: 'app/main.scss',
    src: 'app/components/**/*.scss',
    dest: '../virtualtour-ks/public/css', //'build/css',
    prodSourcemap: false,
    sassIncludePaths: [ ]
  },

  scripts: {
    src: 'app/components/**/*.js',
    dest:  '../virtualtour-ks/public/js', //'build/js',
    test: 'test/**/*.js',
    gulp: 'gulp/**/*.js'
  },

  images: {
    src: 'app/images/**/*',
    dest: '../virtualtour-ks/public/images', //'build/images'
  },

  fonts: {
    src: ['app/fonts/**/*'],
    dest: '../virtualtour-ks/public/fonts', //'build/fonts'
  },

  assetExtensions: [
    'js',
    'css',
    'dae',
    'png',
    'jpe?g',
    'html',
    'gif',
    'svg',
    'eot',
    'otf',
    'ttc',
    'ttf',
    'webp',
    'woff2?'
  ],

  views: {
    index: 'app/index.html',
    src: 'app/components/**/*.html',
    dest: 'app/components'
  },

  gzip: {
    src: '../virtualtour-ks/public/**/*.{html,xml,json,css,js,js.map,css.map}', //'build/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: '../virtualtour-ks/public/', //'build/',
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

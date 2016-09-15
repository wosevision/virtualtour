UOIT Virtual Tour
=====================================

## Version 0.0.1

This is the front-end (only) component of the UOIT Virtual Tour web application, and uses a variety of different technologies to power the application and build process:

### Application

- [AngularJS](#angularjs) – M-V-* framework
	- [Angular Material](#angular-material) – UI library based on Material Design
- [A-Frame](#a-frame) – Web VR building blocks
- [Google Maps](#google-maps)

### Build process

- [Sass](#sass) – CSS compiler
- [Browserify](#browserify) – Module requirer/bundler
- [Babel](#babel) – ES6-to-boring-JS transpiler
- [Gulp](#gulp) – Build system

Also ~~utilizes [these best AngularJS practices](https://github.com/toddmotto/angular-styleguide/tree/angular-old-es5)~~ (**NOW DEPRECATED**: architecture update to [this style](https://github.com/toddmotto/angular-styleguide) in progress) and Gulp best practices from [this resource](https://github.com/greypants/gulp-starter).

[View original boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate/)

---

### Getting up and running

1. Clone this repo from `https://github.com/wosevision/virtualtour.git`
2. Run `npm install` from the root directory
3. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
	- **NOTE:** The browser-sync server is loaded in tandem with a [nodemon](http://nodemon.io/) process with the `dev` flag, which provides the API/routing express server; **often, the timing between booting the two processes is less than ideal on first load and casuses it to hang**. This fixes itself after a page refresh for the rest of the Gulp process and does not occur in `prod`.
5. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)

Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

#### Blog resources

The following blogs are indispensable resources containing programming techniques and philosophies used in this project:

- [Ben Nadel](http://www.bennadel.com/): advanced Angular techniques
- [Dr. Axel Rauschmayer](http://www.2ality.com/): ES6 techniques and best practices

#### Libraries

This application uses the latest versions of the following libraries:

- [AngularJS](http://angularjs.org/)
- [Angular Material](https://material.angularjs.org/latest/)
- [A-Frame](https://aframe.io)
- [Google Maps](https://developers.google.com/maps/documentation/javascript/)

... and build tools:

- [Sass](http://sass-lang.com/)
- [Browserify](http://browserify.org/)
- [Babel](https://babeljs.io/)
- [Gulp](http://gulpjs.com/)

...along with many Angular modules and Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks`).

---

### [AngularJS](http://angularjs.org/)

AngularJS is a M-V-* (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this project, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `/app`, structured in the following manner:

```
.
├── components
│   ├── component
│   │   ├── example_directive.js
│   │   ├── example-part_factory.js
│   │   ├── example_service.js
│   │   ├── example_filter.js
│   │   └── childcomponent
│   │       ├── example_directive.js
│   │       ├── example-part_factory.js
│   │       ├── example_service.js
│   │       └── example_filter.js
│   ├── app_config.js 
│   ├── app_run.js
│   ├── app_templates.js
│   ├── index.js
└── main.js
```

Each folder in the `/app/components` directory represents a component and its child components. These folders contain all the files neccessary to power that component, including templates and Sass files.

##### Naming convention

Component pieces follow the naming convention **`component`**`-`**`part`****`_`****`type`**`.js`. This guides the 'main' component `index.js` on how to properly declare the modules.

##### Module organization

Controllers, services, directives, etc. should all be placed within their respective component folders, and will be automatically required and mounted via the main `index.js` using `bulk-require`. All modules must export an object of the format:

```javascript
const ExampleModule = function() {};

export default {
  name: 'ExampleModule',
  fn: ExampleModule
};

```

##### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple directive prologue of the format:

```js
function MyService($http) {
  'ngInject';
  ...
}
```

needs to be added at the very beginning of any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you to only specify the dependencies within the function parameters and nothing more.

##### [Angular Material](https://material.angularjs.org/latest/)

Angular Material is both a UI Component framework and a reference implementation of Google's [Material Design](https://material.google.com/) specification. Though most Google-specific styles have been overridden with UOIT branding, the core UI components provide the majority of user interactions, layout directives, polyfilled browser features, and accessibility additions.

---

### [Sass](http://sass-lang.com/)

Sass is a CSS extension language adding things like extending, variables, and mixins to the language. This project provides a `/app/styles` folder which contains common Sass elements, such as mixins, variables, global styles, and libraries. Explicit imports into `/app/main.scss` bootstrap the styles as well as module-specific `.scss` files. A Gulp task (discussed later) is provided for compilation and minification of the stylesheets based on this file.

---

### [Browserify](http://browserify.org/)

Browserify is a Javascript file and module loader, allowing you to `require('modules')` in all of your files in the same manner as you would on the backend in a node.js environment. The bundling and compilation is then taken care of by Gulp, discussed below.

---

### [Babel](http://babeljs.io/)

Babel is an ES6-to-ES5 transpiler. ECMAScript 2015 (or **ES6**/**ES2015**) is an ECMAScript standard that was ratified in June 2015. ES6 is a significant update to the JavaScript language, and the first major update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is underway now, but this project uses Babel to maintain support for pre-ES6 engines. Transpiling is handled by Gulp, discussed below.

---

### [Gulp](http://gulpjs.com/)

Gulp is a "streaming build system", providing a very fast and efficient method for running your build tasks.

A `/gulp` folder is included in the project, and contains a configuration file, some utilities, and a directory of `/gulp/tasks` inside containing single modules for various build processes.

```
.
├── config.js
├── index.js
├── tasks
│   └── ...example.js
└── util
    ├── bundleLogger.js
    ├── handleErrors.js
    ├── scriptFilter.js
    └── testServer.js
```

##### Web Server

Gulp is used here to provide an Express web server for viewing and testing the application as you build. It serves static files from the `/build` directory, leaving routing up to AngularJS. All Gulp tasks are configured to automatically reload the server upon file changes.

The application is served to `localhost:8080` after running the `gulp` (`dev` only) task. To take advantage of the fast live reload injection provided by browser-sync, you must load the site at the proxy address (which will be `localhost:4000` by default). To change the settings related to live-reload or browser-sync, you can access the UI at `localhost:3001`.

In a production environment, the Virtual Tour server and API replace the Gulp server.

##### Scripts

A number of build processes are automatically run on all of our JavaScript files, run in the following order:

- **ESLint:** Gulp is currently configured to run an ESLint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring. You will be notified of parsing errors that prevent compilation.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This transform uses [Babel](#babel) to provide support for ES6+ features.
- ~~**Debowerify:** Parses `require()` statements in your code, mapping them to `bower_components` when necessary. This allows you to use and include bower components just as you would npm modules.~~ **Module removed due to lack of need for Bower**
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as [mentioned previously](#dependency-injection).
- **Uglifyify:** Transform that uses UglifyJS to minify the file created by Browserify and ngAnnotate.

The resulting file (`main.js`) is placed inside the directory `/build/js/`.

##### Styles

Just one plugin is necessary for processing our SASS files, and that is `gulp-sass`. This will read the `main.scss` file, processing and importing any dependencies and then minifying the result. This file (`main.css`) is placed inside the directory `/build/css/`.

- **gulp-autoprefixer:** Gulp is currently configured to run autoprefixer after compiling the scss.  Autoprefixer will use the data based on current browser popularity and property support to apply prefixes (`-moz-`, `-webkit-`) in the final outputted CSS.

##### Images

Any images placed within `/app/images` will be automatically copied to the `build/images` directory. If running `gulp prod`, they will also be compressed via **gulp-imagemin**.

##### Views

When any changes are made to the `index.html` file, the new file is simply copied to the `/build` directory without any changes occurring.

Files inside `/app/components`, on the other hand, go through a slightly more complex process. The `gulp-angular-templatecache` module is used in order to process all views/partials, creating the `app_templates.js` file shown in the directory tree above. This file will contain all the views, now in Javascript format inside Angular's `$templateCache` service, making them all available to Angular by their full path (starting at/excluding `/app/components`). This will allow us to include them in our Javascript minification process, as well as avoid extra HTTP requests for our views.

##### Watching files

All of the Gulp processes mentioned above are run automatically when any of the corresponding files in the `/app` directory are changed, and this is thanks to our Gulp watch tasks. Running `gulp dev` will begin watching all of these files, while also serving to `localhost:8080`, and with browser-sync proxy running at `localhost:4000` (by default).

##### Production Task

Just as there is the `gulp dev` task for development, there is also a `gulp prod` task for putting the Virtual Tour into a production-ready state. This will run each of the tasks, while also adding the image minification task discussed above. There is also `gulp deploy` task *(currently in development)* that is included when running the production task. This deploy task will automatically push a production-ready app to the host.

**Reminder:** When running the production task, gulp will not fire up the express server and serve your index.html. This task is designed to be run before the `deploy` step that may copy the files from `/build` to a production web server.

##### Pre-compressing text assets

When running with `gulp prod`, a pre-compressed file is generated in addition to uncompressed file (.html.gz, .js.gz, css.gz). This is done to enable web servers serve compressed content without having to compress it on the fly. Pre-compression is handled by `gzip` task.

##### Testing

A Gulp task also exists for running the test framework (discussed in detail below). Running `gulp test` will run any and all tests inside each `/app/components` directory and show the results (and any errors) in the terminal.

---

### Testing *(still heavily under development)*

This application also includes a framework for unit and end-to-end (e2e) testing via [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/). In order to test AngularJS modules, the [angular.mocks](https://docs.angularjs.org/api/ngMock/object/angular.mock) module is used.

**NOTE: the test suite is currently in infancy and only includes a couple of examples.**

All of the tests can be run at once with the command `gulp test`. However, the tests are broken up into two main categories:

##### End-to-End (e2e) Tests

e2e tests, as hinted at by the name, consist of tests that involve multiple modules or require interaction between modules, similar to integration tests. These tests are carried out using the Angular library [Protractor](https://github.com/angular/protractor), which also utilizes Jasmine. These tests ensure that the flow of the application is performing as designed from start to finish.

Two examples were included in the project's boilerplate, located in `/tests`:

- `routes_spec.js`, which tests the functionality of the AngularJS routing
- `example_spec.js`, which tests the functionality of an example route, controller, and view

More examples can be seen at the above link for Protractor.

All e2e tests are run with `gulp protractor`.

##### Unit Tests

Unit tests are used to test a single module (or "unit") at a time in order to ensure that each module performs as intended individually. In AngularJS this could be thought of as a single controller, directive, filter, service, etc. **Each component should be accompanied by a test, which should be stored alongside the component itself for easy maintenance.**

An example test in `/tests` is provided for the following types of AngularJS modules:

- `unit/controllers/example_spec.js`
- `unit/services/example_spec.js`
- `unit/directives/example_spec.js`
- `unit/constants_spec.js`

All unit tests are run with `gulp unit`. When running unit tests, code coverage is simultaneously calculated and output as an HTML file to the `/coverage` directory.

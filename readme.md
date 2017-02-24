UOIT Virtual Tour
=====================================
> __*Version 0.2.0*__

Welcome to the Github repository of the **UOIT Virtual Tour web application**, powered by the [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) software stack! This is (only) the front-end component of the application; the server that powers the tour is currently hosted in a [separate repository](https://github.com/wosevision/virtualtour-cms). The Virtual Tour's complete documentation will be featured in this repository, with each folder containing docs for its respective contents and components documented inline.

This application includes:
* Best practices for directory/file organization in Angular (allowing for infinite horizontal app scaling)
* A suite of custom AFrame-to-Angular components
* A full-featured [ES6](https://git.io/es6features) build system
* Tasks for generating additional boilerplate Angular components
* Testing system in place _(WIP)_
* [Sass](http://sass-lang.com/) support via node-sass

# Table of Contents
* [Intro](#intro)
    * [Build system](#build-system)
        * [Dependency injection](#dependency-injection)
        * [Test suite](#test-suite)
    * [File structure](#file-structure)
        * [Naming convention](#naming-convention)
* [Development](#development)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
        * [Available scripts](#available-scripts)
    * [Testing](#testing)
    * [Generating components](#generating-components)   
* [Reference](#reference)
    * [Libraries](#libraries)
        * [AngularJS](#angularjs)
        * [A-Frame](#a-frame)
        * [Google Maps](#google-maps)
    * [Build tools](#build-tools)
        * [Webpack](#webpack)
        * [Babel](#babel)
        * [Sass](#sass)
    * [Resources](#resources)
* [Virtual Tour support and questions](#virtual-tour-support-and-questions)

# Intro
## Build system
This app uses NPM scripts, Gulp, and Webpack together for its build system, and is supported by a wide range of other additional Angular helper modules and Gulp libraries (listed in `package.json`). Any documentation specific to those libraries should be sought from the library's official docs, and will only be included in these docs if special details exist.

Although Gulp isn't technically necessary for applications being bundled with Webpack, this app's build system performs more than basic file manipulation and therefore splits responsibilities between Gulp and Webpack.

**`webpack` handles all file-related concerns:**
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* All of the above for `*.spec.js` files, plus testing

**`gulp` is the orchestrator:**
* Starting and calling Webpack
* Starting a development server
* Generating boilerplate components

### Dependency injection
Angular dependency injection is automated using the `ng-annotate` library via the `ng-annotate-loader` Webpack loader. In order to take advantage of this, a simple directive prologue needs to be added at the very beginning of any Angular functions/modules, in the following format:

```js
angular.module('MyModule')
  .controller('myController', function($http) {
    'ngInject';
    ...
  });

// without ng-annotate (dependency string array with tail fn):
angular.module('MyModule')
  .controller('myController', ['$http', function($http) {
    ...
  }]);
```

Webpack will then take care of adding any dependency injection, requiring the developer to only specify the dependencies within the function parameters and nothing more.

### Test suite
All tests are also written in ES6. Webpack takes care of the logistics of running files in the various browsers, similar to the client application files. The testing stack is as follows:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run tests, run `npm test`. Read more about testing [below](#testing).

## File structure
This application uses a componentized approach to file organization, which will help ensure a smoother transition to Angular 2 when the time is ripe.

A component is a self-contained concern – be it a feature, or a strictly-defined, ever-present element of the UI (such as a header, sidebar, or footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes, services, and specs (test files). Each component folder contains all the requisite files for the use of that component – this encapsulation affords us the comfort of isolation and structural locality, and makes individual features easier to reason about regardless of the application's scale as a whole.

The structure of a component boils down to the following layout:
```
client
⋅⋅app/
⋅⋅⋅⋅app.js /* app entry file */
⋅⋅⋅⋅app.html /* app template */
⋅⋅⋅⋅common/ /* functionality pertinent to several components propagate into this directory */
⋅⋅⋅⋅components/ /* where components live */
⋅⋅⋅⋅⋅⋅components.js /* components entry file */
⋅⋅⋅⋅⋅⋅home/ /* home component */
⋅⋅⋅⋅⋅⋅⋅⋅home.js /* home entry file (routes, configurations, and declarations occur here) */
⋅⋅⋅⋅⋅⋅⋅⋅home.component.js /* home "directive" */
⋅⋅⋅⋅⋅⋅⋅⋅home.controller.js /* home controller */
⋅⋅⋅⋅⋅⋅⋅⋅homeDialog.controller.js /* "child" controller */
⋅⋅⋅⋅⋅⋅⋅⋅home.service.js /* home service */
⋅⋅⋅⋅⋅⋅⋅⋅home.scss /* home styles */
⋅⋅⋅⋅⋅⋅⋅⋅home.html /* home template */
⋅⋅⋅⋅⋅⋅⋅⋅home.spec.js /* home specs (for entry, component, and controller) */
```

### Naming convention
Component pieces follow the naming convention **`component`**`.`**`type`**`.`**`ext`**. This aids the "main" component scripts (i.e. "`component.js`") on how to properly declare the modules.

# Development
## Dependencies
Bare minimum tools needed to run/build this app:
* `node` and `npm` (>= 4.0.0 recommended)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies

## Running the app
This app uses Gulp to build and launch the development environment. After you have installed all dependencies, the app can be run using the provided npm scripts. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.
 
### Available scripts
The list of available tasks is as follows:
* `npm run build`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js` (for scripts) and `dist/app.css` (for styles). It also prepares `index.html` to be used as application entry point by linking the injected assets on build.
* `npm run serve`
  * starts a dev server via `webpack-dev-server`, serving the client folder.
* `npm run watch`
  * alias of `serve`
* `npm start` (which is the default task that runs when typing `gulp` without providing an argument)
  * runs `serve`.
* `npm run component`
  * scaffolds a new Angular component. [Read below](#generating-components) for usage details.
  
## Testing
`Mocha` is the testing suite and `Chai` is the assertion library. To run the tests, run `npm test`.

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows the test files to remain local to the component. When developing new components, be sure to define `*.spec.js` files within their corresponding component directory so the loader can properly associate them. The file `spec.bundle.js` is the Webpack-generated bundle file for **all** spec files that Karma will run.

## Generating components
Following a consistent directory structure between components offers the certainty of predictability. The build process takes advantage of this certainty with a gulp task to automate the "instantiation" of new components. The component boilerplate task generates the following:
```
⋅⋅⋅⋅⋅⋅componentName/
⋅⋅⋅⋅⋅⋅⋅⋅componentName.js // entry file where all dependencies load
⋅⋅⋅⋅⋅⋅⋅⋅componentName.component.js // imports template and controller
⋅⋅⋅⋅⋅⋅⋅⋅componentName.controller.js // imported into the component directly
⋅⋅⋅⋅⋅⋅⋅⋅componentName.html // imported into the component directly
⋅⋅⋅⋅⋅⋅⋅⋅componentName.scss // scoped to affect only its own template
⋅⋅⋅⋅⋅⋅⋅⋅componentName.spec.js // contains passing demonstration tests
```
To generate a component, run `npm run component -- --name componentName` (including the "blank" flag, `--`).

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `client/app/components`. To change this, apply the `--parent` flag, followed by a path relative to `client/app/components`.

For example, running `npm run component -- --name signup --parent auth` will create a `signup` component at `client/app/components/auth/signup`. Running `npm run component -- --name footer --parent ../common` creates a `footer` component at `client/app/common/footer`.  

Because the argument to `--name` applies to the folder name **and** the actual component name, make sure to camelcase the component names when using multi-word names.

# Reference
## Libraries
### [AngularJS](http://angularjs.org/)
AngularJS is a M-V-* (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this project, it is used for all the application routing as well as all of the frontend views and logic.
#### Angular Material
[Angular Material](https://material.angularjs.org/latest/) is both a UI Component framework and a reference implementation of Google's [Material Design](https://material.google.com/) specification. Though most Google-specific styles have been overridden with UOIT branding, the core UI components provide the majority of user interactions, layout directives, polyfilled browser features, and accessibility additions.

### [A-Frame](https://aframe.io)
A-Frame is an open-source WebVR framework for creating virtual reality (VR) experiences with HTML. It is used to build VR scenes that work across smartphones, desktops, Oculus Rift, and consumer headsets like HTC Vive and Samsung Gear.
#### Angular integration
This project contains custom Angular directives for use with A-Frame, which include:
- `<aframe-scene>` – proxies `<a-scene>` and provides a shared controller to all elements within the scene
- `<aframe-entity>` – wraps the `<a-entity>` building block to provide Angular data-binding to entity attributes; also provides a base class that can be extended to write new A-Frame components (in line with their core philosophy)
- `<scene-link>` and `<hot-spot>` – in-scene convenience components; `<a-entity>`s that are pre-configured for tour behaviours (such as moving between scenes or viewing informational popups).

### [Google Maps](https://developers.google.com/maps/documentation/javascript/)
The **Google Maps V3 Javascript API** provides the tour with cartographical navigation and geolocation features. It is wrapped in the **[ng-map](https://ngmap.github.io/)** Angular directive for data-binding, and uses tour API data in the [GeoJSON](http://geojson.org/) format.

## Build tools

### [Webpack](https://webpack.github.io/)
Webpack is a module bundler for modern JavaScript applications, allowing developers to `require('module')` or `import * from 'module'` in the same manner they would with a module system (such as in a node.js environment or with ES6). Using "loaders", Webpack can also streamline the packaging of other non-JS assets, like CSS/Sass, HTML, and even images into an injected bundle. This application uses Webpack to componentize assets and deliver a highly optimized output.

**TODO:** Needs Webpack code splitting for route-loaded script bundles (e.g. controllers loaded by `ui-router`).

### [Babel](http://babeljs.io/)
This application's JavaScript is written in _ECMAScript 2015_ and uses Babel during compilation. 

Babel is an ES6-to-ES5 transpiler. _ECMAScript 2015_ (or **ES6**/**ES2015**) is an ECMAScript standard that was ratified in June 2015. ES6 is a significant update to the JavaScript language, and the first major update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is underway now, but this project uses Babel to maintain support for pre-ES6 engines. The transpiling step is handled by Webpack using the `babel-loader` Webpack loader (discussed above).

### [Sass](http://sass-lang.com/)
Sass is a CSS extension language adding things like extending, variables, and mixins to the language. This project places a good bulk of the common styles in the `/app/common/common.scss` file, which contains shared Sass elements, such as mixins, variables, and global styles, and libraries. This file also contains imported dependency library styles.

## Resources

This project utilizes [these best AngularJS practices](https://github.com/toddmotto/angular-styleguide) and Gulp best practices from [this resource](https://github.com/greypants/gulp-starter).

The following blogs are indispensable resources containing programming techniques and philosophies used in this project:

- [Ben Nadel](http://www.bennadel.com/): advanced Angular techniques
- [Dr. Axel Rauschmayer](http://www.2ality.com/): ES6 techniques and best practices

# Virtual Tour Support and Questions
> Contact us, anytime, regarding anything about this project.

* **Webteam:** [webteam@uoit.ca](mailto:webteam@uoit.ca)
* **Jackson:** [jackson.teather@uoit.ca](mailto:jackson.teather@uoit.ca)

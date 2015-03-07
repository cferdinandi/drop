# Drop [![Build Status](https://travis-ci.org/cferdinandi/drop.svg)](https://travis-ci.org/cferdinandi/drop)
Simple, mobile-friendly dropdown menus.

[Download Drop](https://github.com/cferdinandi/drop/archive/master.zip) / [View the demo](http://cferdinandi.github.io/drop/)

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Working with the Source Files](#working-with-the-source-files)
4. [Options & Settings](#options-and-settings)
5. [Browser Compatibility](#browser-compatibility)
6. [How to Contribute](#how-to-contribute)
7. [License](#license)
8. [Changelog](#changelog)
9. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Drop on your site.

```html
<!-- Replace the * with 'basic' or 'jumbo', depending on which you choose -->
<link rel="stylesheet" href="dist/css/drop-*-css.css">
<script src="dist/js/classList.js"></script>
<script src="dist/js/drop.js"></script>
```

Drop is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_drop-basic.css` and `_drop-jumbo.css` files right into Kraken without making any updates. Or, adjust the variables to suit your own project.

Drop also requires [classList.js](https://github.com/eligrey/classList.js), a polyfill that extends ECMAScript 5 API support to more browsers.

### 2. Add the markup to your HTML.

```html
...
	<li class="dropdown-*" data-dropdown>
		<a href="FALLBACK-URL.com">
			Dropdown 1
			<span class="dropdown-show">+</span>
			<span class="dropdown-hide">-</span>
		</a>
		<div class="dropdown-menu-*" data-dropdown-menu>
			<ul>
				<li><a href="#">Item 1</a></li>
				<li><a href="#">Item 2</a></li>
				<li><a href="#">Item 3</a></li>
			</ul>
		</div>
	</li>

	<li class="dropdown-*" data-dropdown>
		<a href="FALLBACK-URL.com">
			Dropdown 2
			<span class="dropdown-show">+</span>
			<span class="dropdown-hide">-</span>
		</a>
		<div class="dropdown-menu-* dropdown-right" data-dropdown-menu>
			<ul>
				<li><a href="#">Item 1</a></li>
				<li><a href="#">Item 2</a></li>
				<li><a href="#">Item 3</a></li>
			</ul>
		</div>
	</li>
...
```

Replace the `*` with `basic` or `jumbo` to match the version of Drop that you're using.

With Drop Basic, if a dropdown menu is close to the right edge, add the `.dropdown-right` class to avoid text clipping. In Drop Jumbo, you can wrap `dropdown-menu` content in whatever grid system you'd like. Not sure where to start? Try using [Kraken](http://cferdinandi.github.io/kraken/).

#### Fallback URLs

Drop uses modern JavaScript API's that aren't supported by older browsers (including IE 8 and lower). If a browser lacks support, the dropdown menu won't work.

Specifying a backup URL ensures that people can always access your content, even on less capable browsers. When JavaScript is supported, Drop will prevent the backup URL from redirecting people away from the current page.

### 3. Initialize Drop.

```html
<script>
	drop.init();
</script>
```

In the footer of your page, after the content, initialize Drop. And that's it, you're done. Nice work!



## Installing with Package Managers

You can install Drop with your favorite package manager.

* **NPM:** `npm install cferdinandi/drop`
* **Bower:** `bower install https://github.com/cferdinandi/drop.git`
* **Component:** `component install cferdinandi/drop`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code, and runs unit tests. It's the same build system that's used by [Kraken](http://cferdinandi.github.io/kraken/), so it includes some unnecessary tasks and Sass variables but can be dropped right in to the boilerplate without any configuration.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Ruby Sass](http://sass-lang.com/install)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## Options and Settings

Drop includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Drop through the `init()` function:

```javascript
drop.init({
	toggleClass: 'dropdown', // Class used for the dropdown <li> element
	contentClass: 'dropdown-menu', // Class used for the dropdown content <div>
	toggleActiveClass: 'active', // Class added to active dropdown toggles
	contentActiveClass: 'active', // Class added to active dropdown content
	initClass: 'js-drop', // Class added to `<html>` element when initiated
	callbackBefore: function ( toggle ) {}, // Function that's run before a dropdown is toggled
	callbackAfter: function ( toggle ) {} // Function that's run after a dropdown is toggled
});
```

`toggleSelector` and `contentSelector` are particularly useful if you're using both Drop Basic and Drop Jumbo. Simply call `drop.init()` twice, changing your selectors accordingly.

### Use Drop events in your own scripts

You can also call Drop's toggle dropdown event in your own scripts.

#### toggleDrop()
Expand or collapse a dropdown menu.

```javascript
drop.toggleDrop(
	toggle, // Link node that toggles the dropdown action. ex. document.querySelector('#toggle')
	options, // Classes and callbacks. Same options as those passed into the init() function.
	event // Optional, if a DOM event was triggered.
);
```

**Example**

```javascript
var toggle = document.querySelector('#toggle');
drop.toggleDrop( toggle );
```

#### closeDrops()
Close all open dropdown menus.

```javascript
drop.closeDrops();
```

#### destroy()
Destroy the current `drop.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
drop.destroy();
```


## Browser Compatibility

Drop works in all modern browsers, and IE 9 and above.

Drop is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, users will get a basic link instead of a drop-down menu. If you need to support older browsers, you can still [download the jQuery version of Drop on GitHub](https://github.com/cferdinandi/drop/tree/archive-v1).



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License
Drop is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

Drop uses [semantic versioning](http://semver.org/).

* v6.1.2 - March 6, 2015
	* Fixed AMD wrapper window variable.
* v6.1.1 - January 7, 2014
	* Fixed event listener bug.
* v6.1.0 - December 22, 2014
	* Updated expand/collapse styling approach.
* v6.0.0 - October 18, 2014
	* Removed `.bind` dependency and polyfill.
	* Updated `gulpfile.js` tasks and namespacing.
	* Changed namespacing to allow for multiple patterns to be used together.
* v5.0.4 - October 2, 2014
	* Fixed CommonJS bug.
	* Updated travis config file.
	* Added lazypipe to `gulpfile.js`.
* v5.0.3 - August 22, 2014
	* Removed unused variables.
* v5.0.2 - August 22, 2014
	* Updated script to allow for dropdowns within dropdowns.
* v5.0.1 - August 22, 2014
	* Fixed `eventHandler` function `event` variable reference.
* v5.0.0 - August 20, 2014
	* Switched to Ruby Sass.
	* Fixed test paths.
	* Converted to event bubbling for event listeners.
	* Updated selector options, breaking backwards compatibility.
	* Exposed `closeDrops()` as a public API.
* v4.3.2 - August 15, 2014
	* Fixed UMD structure bug.
* v4.3.1 - August 8, 2014
	* Added polyfill for `Functions.prototype.bind`.
	* Removed Sass paths from `gulpfile.js`.
* v4.3.0 - June 28, 2014
	* Added `destroy()` method.
	* Updated unit tests.
* v4.2.1 - June 28, 2014
	* Fixed `extend()` function.
* v4.2.0 - June 20, 2014
	* Converted to gulp.js workflow.
	* Added unit testing.
	* Updated naming conventions.
	* Added minified versions of files.
* v4.1.1 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v4.1.0 - June 7, 2014
	* Added UMD support.
	* Moved public APIs to exports variable.
	* Improved feature test.
	* Replaced Array.prototype.forEach hack with proper forEach function.
	* Added a more well supported trim function.
	* General code optimizations for better minification and performance.
	* Updated to JSDoc documentation (sort of).
	* Updated to three number versioning system.
	* Added package manager installation info.
* v4.0 - April 4, 2014
	* Converted from Buoy class helpers to `classList` with polyfill.
* v3.3 - April 4, 2014
	* Fixed bug that stopped dropdowns from closing when clicking outside of a dropdown.
* v3.2 - March 19, 2014
	* Passed arguments into callback functions.
* v3.1 - February 27, 2014
	* Converted `_defaults` to a literal object
* v3.0 - February 24, 2014
	* Better public/private method namespacing.
	* Require `init()` call to run.
	* New API exposes additional methods for use in your own scripts.
	* Better documentation.
* v2.5 - February 5, 2014
	* Added namespacing to IIFE.
	* Moved feature test to script itself for better progressive enhancement.
	* Updated looping method.
* v2.4 - December 4, 2013
	* Added Sass support.
* v2.3 - August 27, 2013
	* Added missing semicolons.
	* Activated strict mode.
* v2.2 - August 26, 2013
	* Converted to an IIFE pattern.
	* Added Buoy vanilla JS micro-library.
* v2.1 - August 14, 2013
	* Moved functions outside of forEach loops for better performance.
* v2.0 - August 11, 2013
	* Converted to vanilla JS.
	* Removed dependency on jQuery.
* v1.4 - August 5, 2013
	* Created a variable for `$(this)` (better performance).
* v1.3 - June 7, 2013
	* Switched to MIT license.
* v1.3 - May 20, 2013
	* Dropdown menus now close if user clicks outside of them.
* v1.2 - March 29, 2013
	* Removed changed in arrow direction on active state.
* v1.1 - February 13, 2013
	* Renamed `example.html` to `index.html`.
	* Removed "Convert to Vanilla JS" from the roadmap.
* v1.0 - February 6, 2013
	* Initial release.



## Older Docs

* [Version 4](https://github.com/cferdinandi/drop/tree/archive-v4)
* [Version 2](http://cferdinandi.github.io/drop/archive/v2/)
* [Version 1](https://github.com/cferdinandi/drop/tree/archive-v1)
# Drop [![Build Status](https://travis-ci.org/cferdinandi/drop.svg)](https://travis-ci.org/cferdinandi/drop)
Simple, mobile-friendly dropdown menus.

[Download Drop 4](https://github.com/cferdinandi/drop/archive/master.zip) / [View the demo](http://cferdinandi.github.io/drop/)

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
2. [Using Both Patterns](#using-both-patterns)
3. [Options & Settings](#options-and-settings)
4. [Browser Compatibility](#browser-compatibility)
5. [How to Contribute](#how-to-contribute)
6. [License](#license)
7. [Changelog](#changelog)
8. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Drop on your site.

```html
<!-- Replace the * with 'basic' or 'jumbo', depending on which you choose -->
<link rel="stylesheet" href="css/drop-*-css.css">
<script src="classList.js"></script>
<script src="js/drop.js"></script>
```

Drop is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_drop-basic.css` and `_drop-jumbo.css` files right into Kraken without making any updates. Or, adjust the variables to suit your own project.

Drop also requires [classList.js](https://github.com/eligrey/classList.js), a polyfill that extends `classList` support back to IE8.

### 2. Add the markup to your HTML.

```html
...
	<li class="dropdown">
		<a href="FALLBACK-URL.com">Dropdown 1</a>
		<div class="dropdown-menu dropdown-right">
			<ul>
				<li><a href="#">Item 1</a></li>
				<li><a href="#">Item 2</a></li>
				<li><a href="#">Item 3</a></li>
			</ul>
		</div>
	</li>

	<li class="dropdown">
		<a href="FALLBACK-URL.com">Dropdown 2</a>
		<div class="dropdown-menu dropdown-right">
			<ul>
				<li><a href="#">Item 1</a></li>
				<li><a href="#">Item 2</a></li>
				<li><a href="#">Item 3</a></li>
			</ul>
		</div>
	</li>
...
```

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



## Using Both Patterns

For simpicity, both dropdown menu options use the same naming conventions.

If you will be using both options on a project, you'll need to change the class names to avoid conflicts. For example, you might change `.dropdown-menu` to `.dropdown-menu-basic` and `.dropdown-menu-jumbo`, respectively.



## Options and Settings

Drop includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Drop through the `init()` function:

```javascript
drop.init({
	toggleSelector: '.dropdown', // Class used for the dropdown <li> element
	contentSelector: '.dropdown-menu', // Class used for the dropdown content <div>
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

#### destroy()
Destroy the current `drop.init()`.

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
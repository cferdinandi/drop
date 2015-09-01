# Drop [![Build Status](https://travis-ci.org/cferdinandi/drop.svg)](https://travis-ci.org/cferdinandi/drop)
Simple, mobile-friendly dropdown menus.

[Download Drop](https://github.com/cferdinandi/drop/archive/master.zip) / [View the demo](http://cferdinandi.github.io/drop/)


## Usage

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

1. Include Drop on your site.

	```html
	<!-- Replace the * with 'basic' or 'jumbo', depending on which you choose -->
	<link rel="stylesheet" href="dist/css/drop-*-css.css">
	<script src="dist/js/drop.js"></script>
	```
2. Add the markup to your HTML.

	Replace the `*` with `basic` or `jumbo` to match the version of Drop that you're using. Add unique selectors to the dropdown parent, toggle, and menu.

	```html
	...
		<li class="dropdown-* js-drop">
			<a href="FALLBACK-URL.com" class="js-drop-toggle">
				Dropdown 1
				<span class="dropdown-show">+</span>
				<span class="dropdown-hide">-</span>
			</a>
			<div class="dropdown-menu-* js-drop-menu">
				<ul>
					<li><a href="#">Item 1</a></li>
					<li><a href="#">Item 2</a></li>
					<li><a href="#">Item 3</a></li>
				</ul>
			</div>
		</li>

		<li class="dropdown-* js-drop">
			<a href="FALLBACK-URL.com" class="js-drop-toggle">
				Dropdown 2
				<span class="dropdown-show">+</span>
				<span class="dropdown-hide">-</span>
			</a>
			<div class="dropdown-menu-* dropdown-right js-drop-menu">
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

	Use the `.dropdown-show` and `.dropdown-hide` classes to include elements that should be displayed conditionally based on whether or not a dropdown menu is current open.

	**Fallback URLs**

	Drop uses modern JavaScript API's that aren't supported by older browsers (including IE 8 and lower). If a browser lacks support, the dropdown menu won't work.

	Specifying a backup URL ensures that people can always access your content, even on less capable browsers. When JavaScript is supported, Drop will prevent the backup URL from redirecting people away from the current page.
3. Initialize Drop.

	```js
	drop(
		dropdown, // The dropdown parent (uses document.querySelectorAll)
		toggle,  // The dropdown toggle (uses document.querySelectorAll)
		menu // The dropdown menu (uses document.querySelectorAll)
	);
	```



## Example

```html
<link rel="stylesheet" href="dist/css/drop-basic-css.css">
<script src="dist/js/drop.js"></script>

<nav>
	<ul>
		<li class="dropdown-basic js-drop">
			<a href="FALLBACK-URL.com" class="js-drop-toggle">
				Dropdown 1
				<span class="dropdown-show">+</span>
				<span class="dropdown-hide">-</span>
			</a>
			<div class="dropdown-menu-basic js-drop-menu">
				<ul>
					<li><a href="#">Item 1</a></li>
					<li><a href="#">Item 2</a></li>
					<li><a href="#">Item 3</a></li>
				</ul>
			</div>
		</li>
		<li>
			<a href="some-link.html">Not a dropdown</a>
		</li>
		<li class="dropdown-basic js-drop">
			<a href="FALLBACK-URL.com" class="js-drop-toggle">
				Dropdown 2
				<span class="dropdown-show">+</span>
				<span class="dropdown-hide">-</span>
			</a>
			<div class="dropdown-menu-basic dropdown-right js-drop-menu">
				<ul>
					<li><a href="#">Item 1</a></li>
					<li><a href="#">Item 2</a></li>
					<li><a href="#">Item 3</a></li>
				</ul>
			</div>
		</li>
	</ul>
</nav>

<script>
	if ( 'querySelector' in document && 'addEventListener' in window && 'classList' in document.createElement('_') ) {
		drop( '.js-drop', '.js-drop-toggle', '.js-drop-menu' );
	}
</script>
```



## Installing with Package Managers

You can install Drop with your favorite package manager.

* **NPM:** `npm install cferdinandi/drop`
* **Bower:** `bower install https://github.com/cferdinandi/drop.git`
* **Component:** `component install cferdinandi/drop`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## Browser Compatibility

Drop works in all modern browsers, and IE 9 and above.

Drop is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, users will get a basic link instead of a drop-down menu.

### Cutting the Mustard

You should check for `document.querySelector`, `window.addEventListener`, and `document.classList` support before calling `astro()`.

```js
if ( 'querySelector' in document && 'addEventListener' in window && 'classList' in document.createElement('_') ) {
	astro( ... );
}
```



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.



## License

The code is available under the [MIT License](LICENSE.md).
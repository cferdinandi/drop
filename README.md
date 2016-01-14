# Drop [![Build Status](https://travis-ci.org/cferdinandi/drop.svg)](https://travis-ci.org/cferdinandi/drop)
Simple, mobile-friendly dropdown menus.

[Download Drop](https://github.com/cferdinandi/drop/archive/master.zip) / [View the demo](http://cferdinandi.github.io/drop/)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Drop on your site.

```html
<!-- Replace the * with 'basic' or 'jumbo', depending on which you choose -->
<link rel="stylesheet" href="dist/css/drop-*.css">
<script src="dist/js/drop.js"></script>
```

### 2. Add the markup to your HTML.

Replace the `*` with `basic` or `jumbo` to match the version of Drop that you're using. Add a `[data-dropdown]` attribute to the dropdown element, and a `[data-dropdown-menu]` attribute to the dropdown menu. You can pass in different selectors in [the configuration settings](#options-and-settings).

You also need to add a `.no-js-drop` class to any parent element of your dropdown. This allows a "display on hover" fallback before your JavaScript file loads.

```html
<nav class="no-js-drop">
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
</nav>
```

With Drop Basic, if a dropdown menu is close to the right edge, add the `.dropdown-right` class to avoid text clipping. In Drop Jumbo, you can wrap `dropdown-menu` content in whatever grid system you'd like. Not sure where to start? Try using [Kraken](http://cferdinandi.github.io/kraken/).

#### noJS Fallback

Drop uses modern JavaScript API's that aren't supported by older browsers (including IE 9 and lower). Before your JavaScript file loads, or if a browser lacks support, Drop displays dropdown menu content on hover instead of on click/tap. This ensures that users can always access your dropdown content.

### 3. Initialize Drop.

In the footer of your page, after the content, initialize Drop. And that's it, you're done. Nice work!

```html
<script>
	drop.init();
</script>
```



## Installing with Package Managers

You can install Drop with your favorite package manager.

* **NPM:** `npm install cferdinandi/drop`
* **Bower:** `bower install https://github.com/cferdinandi/drop.git`
* **Component:** `component install cferdinandi/drop`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code, and runs unit tests.

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
	* `gulp test` compiles files and runs unit tests.



## Options and Settings

Drop includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Drop through the `init()` function:

```javascript
drop.init({
	selectorDropdown: '[data-dropdown]', // Selector for the dropdown (must be a valid CSS selector)
	selectorMenu: '[data-dropdown-menu]', // Selector for the dropdown menu (must be a valid CSS selector)
	toggleClass: 'dropdown', // Class used for the dropdown <li> element
	contentClass: 'dropdown-menu', // Class used for the dropdown content <div>
	toggleActiveClass: 'active', // Class added to active dropdown toggles
	contentActiveClass: 'active', // Class added to active dropdown content
	initClass: 'js-drop', // Class added to `<html>` element when initiated
	noJSClass: 'no-js-drop', // noJS fallback class to remove once initiated
	callback: function ( toggle ) {} // Function that's run after a dropdown is toggled
});
```

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

Drop works in all modern browsers, and IE 10 and above. You can push browser support back to IE 9 with the [classList.js polyfill](https://github.com/eligrey/classList.js/).

Drop is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, users will get a basic link instead of a drop-down menu.



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.



## License

The code is available under the [MIT License](LICENSE.md).
# Drop [![Build Status](https://travis-ci.org/cferdinandi/drop.svg)](https://travis-ci.org/cferdinandi/drop)
Simple, mobile-friendly dropdown menus.

[Download Drop](https://github.com/cferdinandi/drop/archive/master.zip) / [View the demo](http://cferdinandi.github.io/drop/)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Drop on your site.

```html
<link rel="stylesheet" href="dist/css/drop.css">
<script src="dist/js/drop.js"></script>
```

### 2. Add the markup to your HTML.

Add a `[data-dropdown]` attribute to the dropdown element. You can pass in different selectors in [the configuration settings](#options-and-settings). If a dropdown menu is close to the right edge, add the `.dropdown-right` class to avoid text clipping.

```html
...
	<li class="dropdown" data-dropdown>
		<a href="FALLBACK-URL.com">
			Dropdown 1
		</a>
		<div class="dropdown-menu" data-dropdown-menu>
			<ul>
				<li><a href="#">Item 1</a></li>
				<li><a href="#">Item 2</a></li>
				<li><a href="#">Item 3</a></li>
			</ul>
		</div>
	</li>

	<li class="dropdown" data-dropdown>
		<a href="FALLBACK-URL.com">
			Dropdown 2
		</a>
		<div class="dropdown-menu dropdown-right" data-dropdown-menu>
			<ul>
				<li><a href="#">Item 1</a></li>
				<li><a href="#">Item 2</a></li>
				<li><a href="#">Item 3</a></li>
			</ul>
		</div>
	</li>
...
```

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



## Changing the show more/show less icons

The +/- icons after the dropdown link are controlled using `a:after` selectors in the CSS/Sass files. Update as desired.



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
	selector: '[data-dropdown]', // Selector for the dropdown (must be a valid CSS selector)
	activeClass: 'active', // Class added to active dropdown toggles
	initClass: 'js-drop', // Class added to `<html>` element when initiated
	callback: function ( toggle ) {} // Function that's run after a dropdown is toggled
});
```

### Use Drop events in your own scripts

You can also call Drop's toggle dropdown event in your own scripts.

#### openDrop()
Open a dropdown menu.

```javascript
drop.openDrop(
	toggle, // Link node that toggles the dropdown action. ex. document.querySelector('#toggle')
	options, // Classes and callbacks. Same options as those passed into the init() function
);
```

**Example**

```javascript
var toggle = document.querySelector('#toggle');
drop.openDrop( toggle );
```

#### closeDrops()
Close all open dropdown menus.

```javascript
drop.closeDrops(
	options, // Classes and callbacks. Same options as those passed into the init() function
);
```

**Example**

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

Drop is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, users still have full access to the dropdown menus but lose the "stays open after hover" functionality.



## How to Contribute

Please review the  [contributing guidelines](CONTRIBUTING.md).



## License

The code is available under the [MIT License](LICENSE.md).
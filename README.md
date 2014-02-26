# Drop
Simple, mobile-friendly dropdown menus. [View the demo](http://cferdinandi.github.io/drop/).

**In This Documentation**

1. [Getting Started](#getting-started)
3. [Using Both Patterns](#using-both-patterns)
4. [Options & Settings](#options-and-settings)
2. [Browser Compatibility](#browser-compatibility)
6. [License](#license)
5. [Changelog](#changelog)
7. [Older Docs](#older-docs)



## Getting Started

### 1. Include Drop on your site.

```html
<!-- Replace the * with 'basic' or 'jumbo', depending on which you choose -->
<link rel="stylesheet" href="css/drop-*-css.css">
<script src="js/drop.js"></script>
<script src="buoy.js"></script>
```

Drop is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_drop-basic.css` and `_drop-jumbo.css` files right into Kraken without making any updates. Or, adjust the variables to suit your own project.

Drop also requires [Buoy](http://cferdinandi.github.io/buoy/), a vanilla JS micro-library that contains simple helper functions used by Drop.

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
	callbackBefore: function () {}, // Function that's run before a dropdown is toggled
	callbackAfter: function () {} // Function that's run after a dropdown is toggled
});
```

`toggleSelector` and `contentSelector` are particularly useful if you're using both Drop Basic and Drop Jumbo. Simply call `drop.init()` twice, changing your selectors accordingly.

### Use Drop events in your own scripts

You can also call Drop's toggle dropdown event in your own scripts:

```javascript
drop.toggleDrop(
	toggle, // Node that toggles the dropdown action. ex. document.querySelector('#toggle')
	options, // Classes and callbacks. Same options as those passed into the init() function.
	event // Optional, if a DOM event was triggered.
);
```


## Browser Compatibility

Drop works in all modern browsers, and IE 9 and above.

Drop is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, users will get a basic link instead of a drop-down menu. If you need to support older browsers, you can still [download the jQuery version of Drop on GitHub](https://github.com/cferdinandi/drop/tree/archive-v1).



## License
Drop is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

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

* [Version 2](http://cferdinandi.github.io/drop/archive/v2/)
* [Version 1](https://github.com/cferdinandi/drop/tree/archive-v1)
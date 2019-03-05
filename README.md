# Drop [![Build Status](https://travis-ci.org/cferdinandi/drop.svg)](https://travis-ci.org/cferdinandi/drop)
A small CSS component that turns browser-native `<details>` elements into dropdown menus.

**[View the demo on CodePen &rarr;](https://codepen.io/cferdinandi/pen/oVbKaK)**


<hr>

### Interested in doing more with browser-native methods and APIs? Check out my [Vanilla JS Pocket Guides](https://vanillajsguides.com/) or join the [Vanilla JS Academy](https://vanillajsacademy.com) and level-up as a web developer. 🚀

<hr>


## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Drop on your site.

In addition to a small CSS file, you should include [a `<details>` element polyfill](https://github.com/javan/details-element-polyfill) to add support to IE and Edge.

**Direct Download**

You can [download the files directly from GitHub](https://github.com/cferdinandi/drop/archive/master.zip).

```html
<link rel="stylesheet" type="text/css" href="path/to/drop.min.css">
<script src="path/to/details-element-polyfill.js"></script>
```

**CDN**

You can also use the [jsDelivr CDN](https://cdn.jsdelivr.net/gh/cferdinandi/drop/dist/). I recommend linking to a specific version number or version range to prevent major updates from breaking your site. Smooth Scroll uses semantic versioning.

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/drop/dist/drop.min.css">

<!-- Get minor updates and patch fixes within a major version -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/drop@12/dist/drop.min.css">

<!-- Get patch fixes within a minor version -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/drop@12.0/dist/drop.min.css">

<!-- Get a specific version -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/cferdinandi/drop@12.0.0/dist/drop.min.css">
```

[And here's a CDN for the polyfill.](https://cdn.jsdelivr.net/gh/javan/details-element-polyfill/dist/)

### 2. Add the markup to your HTML.

Create a standard `<details>` element, and add the `.dropdown` class. It can stand on its own, or be wrapped in a list item (`<li>`) as part of a bigger navigation menu.

The text inside the `<summary>` element is what toggles the dropdown. Add an unordered list (`<ul>`) with your dropdown items.

```html
<details class="dropdown">
	<summary>This has dropdown items</summary>
	<ul>
		<li><a href="#hi">Hi</a></li>
		<li><a href="#universe">Universe</a></li>
	</ul>
</details>
```

If the dropdown is in a navigation and will appear close to the right side of the viewport where it's content might get clipped, add the `dropdown-right` class to shift it's positioning.

```html
<details class="dropdown dropdown-right">
	<summary>This has dropdown items, too</summary>
	<ul>
		<li><a href="#hermoine">Hermione</a></li>
		<li><a href="#harry">Harry Potter</a></li>
	</ul>
</details>
```

And that's it, you're done. Nice work!

**[Explore a demo on CodePen &rarr;](https://codepen.io/cferdinandi/pen/oVbKaK)**



## Dropdown Groups

By default, the behavior of one dropdown menu does not affect the other.

If you want all other dropdown menus in a group to close when one is opened, add the included `drop.js` script.

```html
<!-- Direct Download -->
<script src="path/to/drop.min.js"></script>

<!-- CDN -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/drop@12/dist/js/drop.min.js"></script>
```

Then, instantiate it by passing in the parent element for your dropdown group (or a selector). If you changed the class for your dropdown menus, pass that in as a second argument.

```js
var dropdownGroup = new Drop('#my-nav');

// Using a different class
var otherDropdownGroup = new Drop('#another-nav', '.dropdown-alt');
```

**[Explore dropdown groups on CodePen &rarr;](https://codepen.io/cferdinandi/pen/pYNbOY)**

### Canceling a dropdown group

You can cancel this functionality with the `destroy()` method.

```js
dropdownGroup.destroy();
```



## Customizing

Drop includes very minimal styling. You're encouraged to add your own styles to match your theme and layout, including changing the color of the text and dropdown menu links.



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
	* `gulp watch` automatically compiles files when changes are made and applies changes using [LiveReload](http://livereload.com/).



## Migrating to Drop 12 from Older Versions

Drop 12 completely ditches the old JavaScript plugin and markup in favor of the browser-native `<details>` element. You'll need to recreate your markup using the new pattern.



## Browser Compatibility

Drop has the same support as the `<details>` element. That means that it works in all modern browsers, but not IE or Edge. In unsupported, the content will always be expanded.

### Polyfill

You can add Edge and IE support with the lightweight [`<details>` element polyfill](https://github.com/javan/details-element-polyfill). Once Edge migrates to Blink, it will support the element natively.



## License

The code is available under the [MIT License](LICENSE.md).
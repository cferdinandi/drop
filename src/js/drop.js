(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.drop = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var drop = {}; // Object for public APIs
	var supports = 'querySelector' in document && 'addEventListener' in root && 'classList' in document.createElement('_'); // Feature test
	var isTouch = 'ontouchstart' in document; // Check for touch support
	var settings;

	// Default settings
	var defaults = {
		selector: '[data-dropdown]',
		activeClass: 'active',
		initClass: 'js-drop',
		callback: function () {}
	};


	//
	// Methods
	//

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if (Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if (Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			for (var i = 0, len = collection.length; i < len; i++) {
				callback.call(scope, collection[i], i, collection);
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function (obj) {
			for ( var prop in obj ) {
				if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
					// If deep merge and property is an object, merge properties
					if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
						extended[prop] = buoy.extend( true, extended[prop], obj[prop] );
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for ( ; i < length; i++ ) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Get the closest matching element up the DOM tree.
	 * @private
	 * @param  {Element} elem     Starting element
	 * @param  {String}  selector Selector to match against
	 * @return {Boolean|Element}  Returns null if not match found
	 */
	var getClosest = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( elem.matches( selector ) ) return elem;
		}

		return null;

	};

	/**
	 * Close all dropdown menus
	 * @param {Object} options Custom settings
	 * @public
	 */
	drop.closeDrops = function () {

		// Get dropdowns
		var drops = document.querySelectorAll( settings.selector );

		// Close all the dropdowns
		forEach(drops, function (drop) {
			drop.classList.remove( settings.activeClass );
		});

	};

	/**
	 * Open a dropdown menu
	 * @public
	 * @param  {Element} toggle  Element that triggered the expand or collapse
	 * @param  {Object}  options Custom settings
	 */
	drop.openDrop = function ( toggle, options ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults

		// Close any open dropdown menus
		drop.closeDrops();

		// Open the toggled dropdown menu
		toggle.classList.add( settings.activeClass );

		// Run callbacks after drop toggle
		settings.callback( toggle );

	};

	/**
	 * Handle toggle and document click events
	 * @param {Event} event
	 * @private
	 */
	var clickHandler = function (event) {

		// Variables
		var toggle = event.target;
		var menu = getClosest( toggle, settings.selector );

		if ( menu ) {
			// If dropdown menu, do nothing
			return;
		} else {
			// If document body, close open dropdown menus
			drop.closeDrops();
		}

	};

	var focusHandler = function (event) {

		// Variables
		var target = event.target;
		var toggle = getClosest( target, settings.selector );

		// If focused element isn't dropdown, close all dropdowns and end
		if ( !toggle ) {
			drop.closeDrops();
			return;
		}

		// If focused element is currently active dropdown, end
		if ( toggle.classList.contains( settings.activeClass ) ) {
			return;
		}

		// Otherwise, activate the dropdown
		drop.openDrop(toggle, settings);

	};

	var hoverHandler = function (event) {

		// Variables
		var target = event.target;
		var toggle = getClosest( target, settings.selector );

		// If a dropdown menu, activate it
		if ( toggle && !toggle.classList.contains( settings.activeClass ) ) {
			drop.openDrop(toggle, settings); // Open this dropdown

			// Prevent default on touch devices
			if ( isTouch ) {
				event.preventDefault();
			}
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	drop.destroy = function () {

		if ( !settings ) return;

		// Remove init class
		document.documentElement.classList.remove( settings.initClass );

		// Remove event listeners
		document.removeEventListener('click', clickHandler, false);
		document.removeEventListener('focusin', focusHandler, false);
		document.removeEventListener('mouseover', hoverHandler, false);

		// Close all dropdowns
		drop.closeDrops();

		// Reset variables
		settings = null;

	};

	/**
	 * Initialize Drop
	 * @public
	 * @param {Object} options User settings
	 */
	drop.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		drop.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		var toggles = document.querySelectorAll( settings.selector + ' > a' );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Event listeners
		document.addEventListener('click', clickHandler, false);
		document.addEventListener('focus', focusHandler, true);
		document.addEventListener('mouseover', hoverHandler, false);
		if ( isTouch ) {
			document.addEventListener('touchstart', hoverHandler, false);
		}

	};


	//
	// Public APIs
	//

	return drop;

});
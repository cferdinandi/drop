/**
 * Astro v6.0.0
 * A collection of mobile-first navigation patterns., by Chris Ferdinandi.
 * http://github.com/cferdinandi/astro
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('astro', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.astro = factory(root);
	}
})(window || this, function (root) {

	'use strict';

	//
	// Variables
	//

	var astro = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings;

	// Default settings
	var defaults = {
		toggleActiveClass: 'active',
		navActiveClass: 'active',
		initClass: 'js-astro',
		callbackBefore: function () {},
		callbackAfter: function () {}
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
	var extend = function ( defaults, options ) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};

	/**
	 * Get the closest matching element up the DOM tree
	 * @param {Element} elem Starting element
	 * @param {String} selector Selector to match against (class, ID, or data attribute)
	 * @return {Boolean|Element} Returns false if not match found
	 */
	var getClosest = function (elem, selector) {
		var firstChar = selector.charAt(0);
		for ( ; elem && elem !== document; elem = elem.parentNode ) {
			if ( firstChar === '.' ) {
				if ( elem.classList.contains( selector.substr(1) ) ) {
					return elem;
				}
			} else if ( firstChar === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					return elem;
				}
			} else if ( firstChar === '[' ) {
				if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
					return elem;
				}
			}
		}
		return false;
	};

	/**
	 * Show and hide navigation menu
	 * @public
	 * @param  {Element} toggle Element that triggered the toggle
	 * @param  {String} navID The ID of the navigation element to toggle
	 * @param  {Object} settings
	 * @param  {Event} event
	 */
	astro.toggleNav = function ( toggle, navID, options, event ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var nav = document.querySelector(navID);

		settings.callbackBefore( toggle, navID ); // Run callbacks before toggling nav
		toggle.classList.toggle( settings.toggleActiveClass ); // Toggle the '.active' class on the toggle element
		nav.classList.toggle( settings.navActiveClass ); // Toggle the '.active' class on the menu
		settings.callbackAfter( toggle, navID ); // Run callbacks after toggling nav

	};

	/**
	 * Handle click event methods
	 * @private
	 */
	var eventHandler = function (event) {
		var toggle = getClosest(event.target, '[data-nav-toggle]');
		if ( toggle ) {
			// Prevent default click event
			if ( toggle.tagName.toLowerCase() === 'a') {
				event.preventDefault();
			}
			// Toggle nav
			astro.toggleNav( toggle, toggle.getAttribute('data-nav-toggle'), settings );
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	astro.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', eventHandler, false);
		settings = null;
	};

	/**
	 * Initialize Astro
	 * @public
	 * @param {Object} options User settings
	 */
	astro.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		astro.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults

		// Listeners and methods
		document.documentElement.classList.add( settings.initClass ); // Add class to HTML element to activate conditional CSS
		document.addEventListener('click', eventHandler, false); // Listen for click events and run event handler

	};


	//
	// Public APIs
	//

	return astro;

});
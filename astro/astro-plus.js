/**
 *
 * Astro v5.1.1
 * Mobile-first navigation patterns by Chris Ferdinandi.
 * http://github.com/cferdinandi/astro
 *
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 *
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('astro', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.astro = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test

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
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function ( defaults, options ) {
		for ( var key in options ) {
			if (Object.prototype.hasOwnProperty.call(options, key)) {
				defaults[key] = options[key];
			}
		}
		return defaults;
	};

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
	 * Show and hide navigation menu
	 * @public
	 * @param  {Element} toggle Element that triggered the toggle
	 * @param  {String} navID The ID of the navigation element to toggle
	 * @param  {Object} settings
	 * @param  {Event} event
	 */
	exports.toggleNav = function ( toggle, navID, settings, event ) {

		// Selectors and variables
		settings = extend( defaults, settings || {} ); // Merge user options with defaults
		var nav = document.querySelector(navID);


		// If a link, prevent default click event
		if ( toggle && toggle.tagName.toLowerCase() === 'a' && event ) {
			event.preventDefault();
		}

		settings.callbackBefore( toggle, navID ); // Run callbacks before toggling nav
		toggle.classList.toggle( settings.toggleActiveClass ); // Toggle the '.active' class on the toggle element
		nav.classList.toggle( settings.navActiveClass ); // Toggle the '.active' class on the menu
		settings.callbackBefore( toggle, navID ); // Run callbacks after toggling nav

	};

	/**
	 * Initialize Astro
	 * @public
	 * @param {Object} options User settings
	 */
	exports.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Selectors and variables
		options = extend( defaults, options || {} ); // Merge user options with defaults
		var navToggle = document.querySelectorAll('[data-nav-toggle]'); // Get all nav toggles

		document.documentElement.classList.add( options.initClass ); // Add class to HTML element to activate conditional CSS

		// When a nav toggle is clicked, show or hide the nav
		forEach(navToggle, function (toggle) {
			toggle.addEventListener('click', exports.toggleNav.bind( null, toggle, toggle.getAttribute('data-nav-toggle'), options ), false);
		});

	};


	//
	// Public APIs
	//

	return exports;

});
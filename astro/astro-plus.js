/* =============================================================

	Astro v5.0
	Mobile-first navigation patterns by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

 window.astro = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private {object} variable
	var _defaults = {
		toggleActiveClass: 'active',
		navActiveClass: 'active',
		initClass: 'js-astro',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

	// Show and hide the navigation menu
	// Private method
	// Run functions
	var toggleNav = function ( toggle, navID, options, event ) {

		// Selectors and variables
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var nav = document.querySelector(navID);


		// If a link, prevent default click event
		if ( toggle && toggle.tagName === 'A' && event ) {
			event.preventDefault();
		}

		options.callbackBefore( toggle, navID ); // Run callbacks before toggling nav
		toggle.classList.toggle( options.toggleActiveClass ); // Toggle the '.active' class on the toggle element
		nav.classList.toggle( options.navActiveClass ); // Toggle the '.active' class on the menu
		options.callbackBefore( toggle, navID ); // Run callbacks after toggling nav

	};

	// Initialize Astro
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var navToggle = document.querySelectorAll('[data-nav-toggle]'); // Get all nav toggles

			document.documentElement.classList.add( options.initClass ); // Add class to HTML element to activate conditional CSS

			// When a nav toggle is clicked, show or hide the nav
			Array.prototype.forEach.call(navToggle, function (toggle) {
				toggle.addEventListener('click', toggleNav.bind( null, toggle, toggle.getAttribute('data-nav-toggle'), options ), false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		toggleNav: toggleNav
	};

})(window, document);
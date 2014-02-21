/* =============================================================

	Astro v4.0
	Mobile-first navigation patterns by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

 window.astro = (function (window, document, undefined) {

	'use strict';

	// Show and hide the navigation menu
	// Private method
	var _toggleNav = function (event) {

		// SELECTORS
		var dataID = this.getAttribute('data-target');
		var dataTarget = document.querySelector(dataID);

		// EVENTS, LISTENERS, AND INITS
		event.preventDefault(); // Prevent the default link behavior
		buoy.toggleClass(dataTarget, 'active'); // Toggle the '.active' class on the menu

	};

	// Initialize Astro
	// Public method
	var init = function () {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			var navToggle = document.querySelectorAll('[data-nav-toggle]'); // Get all nav toggles
			buoy.addClass(document.documentElement, 'js-astro'); // Add class to HTML element to activate conditional CSS

			// When a nav toggle is clicked, show or hide the nav
			Array.prototype.forEach.call(navToggle, function (toggle) {
				toggle.addEventListener('click', _toggleNav, false);
			});

		}

	};

	// Return public methods
	return {
		init: init
	};

})(window, document);
/* =============================================================

	Astro v3.6
	Mobile-first navigation patterns by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

 window.astro = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		var navToggle = document.querySelectorAll('[data-nav-toggle]');


		// METHODS

		// Show and hide the navigation menu
		var toggleNav = function (event) {

			// SELECTORS
			var dataID = this.getAttribute('data-target');
			var dataTarget = document.querySelector(dataID);

			// EVENTS, LISTENERS, AND INITS
			event.preventDefault(); // Prevent the default link behavior
			buoy.toggleClass(dataTarget, 'active'); // Toggle the '.active' class on the menu

		};


		// EVENTS, LISTENERS, AND INITS

		// Add class to HTML element to activate conditional CSS
		buoy.addClass(document.documentElement, 'js-astro');

		// When a nav toggle is clicked, show or hide the nav
		Array.prototype.forEach.call(navToggle, function (toggle) {
			toggle.addEventListener('click', toggleNav, false);
		});

	}

})(window, document);
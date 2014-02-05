/* =============================================================

	Drop v2.5
	Simple, mobile-friendly dropdown menus by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.drop = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		var dropToggle = document.querySelectorAll('.dropdown > a');
		var dropWrapper = document.querySelectorAll('.dropdown');
		var dropContent = document.querySelectorAll('.dropdown-menu');


		// METHODS

		// Toggle a dropdown menu
		var toggleDrop = function (event) {

			// SELECTORS
			var toggleMenu = this.nextElementSibling;
			var toggleParent = this.parentNode;
			var toggleSiblings = buoy.getSiblings(toggleParent);

			// EVENTS, LISTENERS, AND INITS

			// Prevent defaults
			event.stopPropagation();
			event.preventDefault();

			// Add/remove '.active' class from dropdown item
			buoy.toggleClass(this, 'active');
			buoy.toggleClass(toggleMenu, 'active');
			buoy.toggleClass(toggleParent, 'active');

			// Remove '.active' class from all sibling elements and their child elements
			Array.prototype.forEach.call(toggleSiblings, function (sibling, index) {
				var siblingContent = sibling.children;
				buoy.removeClass(sibling, 'active');
				Array.prototype.forEach.call(siblingContent, function (content, index) {
					buoy.removeClass(content, 'active');
				});
			});

		};

		// Close all dropdown menus
		var closeDrops = function (event) {

			// For each dropdown toggle, remove '.active' class
			Array.prototype.forEach.call(dropToggle, function (toggle, index) {
				buoy.removeClass(toggle, 'active');
			});

			// For each dropdown toggle, remove '.active' class
			Array.prototype.forEach.call(dropWrapper, function (wrapper, index) {
				buoy.removeClass(wrapper, 'active');
			});

			// For each dropdown toggle, remove '.active' class
			Array.prototype.forEach.call(dropContent, function (content, index) {
				buoy.removeClass(content, 'active');
			});

		};

		// Don't close dropdown menus when clicking on content within them
		var handleDropdownClick = function (event) {
			event.stopPropagation();
		};


		// EVENTS, LISTENERS, AND INITS

		// Add class to HTML element to activate conditional CSS
		buoy.addClass(document.documentElement, 'js-drop');

		// When body is clicked, close all dropdowns
		document.addEventListener('click', closeDrops, false);

		// When a toggle is clicked, show/hide dropdown menu
		Array.prototype.forEach.call(dropToggle, function (toggle, index) {
			toggle.addEventListener('click', toggleDrop, false);
		});

		// When dropdown menu content is clicked, don't close the menu
		Array.prototype.forEach.call(dropContent, function (content, index) {
			content.addEventListener('click', handleDropdownClick, false);
		});

	}

})(window, document);
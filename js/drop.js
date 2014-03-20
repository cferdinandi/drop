/* =============================================================

	Drop v3.2
	Simple, mobile-friendly dropdown menus by Chris Ferdinandi.
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.drop = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private method
	// Returns an {object}
	var _defaults = {
		toggleSelector: '.dropdown',
		contentSelector: '.dropdown-menu',
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-drop',
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

	// Toggle a dropdown menu
	// Public method
	// Runs functions
	var toggleDrop = function ( toggle, options, event ) {

		// Selectors and variables
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var toggleMenu = toggle.nextElementSibling;
		var toggleParent = toggle.parentNode;
		var toggleSiblings = buoy.getSiblings(toggleParent);

		// Prevent defaults
		if ( event ) {
			event.stopPropagation();
			event.preventDefault();
		}

		options.callbackBefore( toggle ); // Run callbacks before drop toggle

		// Add/remove '.active' class from dropdown item
		buoy.toggleClass(toggle, options.toggleActiveClass);
		buoy.toggleClass(toggleMenu, options.toggleActiveClass);
		buoy.toggleClass(toggleParent, options.toggleActiveClass);

		// Remove '.active' class from all sibling elements and their child elements
		Array.prototype.forEach.call(toggleSiblings, function (sibling, index) {
			var siblingContent = sibling.children;
			buoy.removeClass(sibling, options.toggleActiveClass);
			Array.prototype.forEach.call(siblingContent, function (content, index) {
				buoy.removeClass(content, options.contentActiveClass);
			});
		});

		options.callbackAfter( toggle ); // Run callbacks after drop toggle

	};

	// Close all dropdown menus
	// Private method
	// Runs functions
	var _closeDrops = function ( options ) {

		// Selectors and variables
		var dropToggle = document.querySelectorAll(options.toggleSelector + ' > a.' + options.toggleActiveClass);
		var dropWrapper = document.querySelectorAll(options.toggleSelector + options.toggleActiveClass);
		var dropContent = document.querySelectorAll(options.contentSelector + options.contentActiveClass);

		if ( dropToggle.length > 0 || dropWrapper.length > 0 || dropContent > 0 ) {

			options.callbackBefore(); // Run callbacks before drop close

			// For each dropdown toggle, remove '.active' class
			Array.prototype.forEach.call(dropToggle, function (toggle, index) {
				buoy.removeClass(toggle, options.toggleActiveClass);
			});

			// For each dropdown toggle wrapper, remove '.active' class
			Array.prototype.forEach.call(dropWrapper, function (wrapper, index) {
				buoy.removeClass(wrapper, options.toggleActiveClass);
			});

			// For each dropdown content area, remove '.active' class
			Array.prototype.forEach.call(dropContent, function (content, index) {
				buoy.removeClass(content, options.contentActiveClass);
			});

			options.callbackAfter(); // Run callbacks after drop close

		}

	};

	// Don't close dropdown menus when clicking on content within them
	// Private method
	// Runs functions
	var _handleDropdownClick = function ( event ) {
		event.stopPropagation();
	};

	// Initialize Drop
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var dropToggle = document.querySelectorAll(options.toggleSelector + ' > a');
			var dropWrapper = document.querySelectorAll(options.toggleSelector);
			var dropContent = document.querySelectorAll(options.contentSelector);

			// Add class to HTML element to activate conditional CSS
			buoy.addClass(document.documentElement, options.initClass);

			// When body is clicked, close all dropdowns
			document.addEventListener('click', _closeDrops.bind( null, options ), false);

			// When a toggle is clicked, show/hide dropdown menu
			Array.prototype.forEach.call(dropToggle, function (toggle, index) {
				toggle.addEventListener('click', toggleDrop.bind( null, toggle, options ), false);
			});

			// When dropdown menu content is clicked, don't close the menu
			Array.prototype.forEach.call(dropContent, function (content, index) {
				content.addEventListener('click', _handleDropdownClick, false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		toggleDrop: toggleDrop
	};

})(window, document);
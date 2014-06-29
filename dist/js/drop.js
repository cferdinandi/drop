/**
 * Drop v4.3.0
 * Simple, mobile-friendly dropdown menus, by Chris Ferdinandi.
 * http://github.com/cferdinandi/drop
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define('drop', factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.drop = factory(root);
	}
})(this, function (root) {

	'use strict';

	//
	// Variables
	//

	var exports = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var eventListeners = { //Listener arrays
		toggle: [],
		menu: []
	};
	var settings, toggles, menus;

	// Default settings
	var defaults = {
		toggleSelector: '.dropdown',
		contentSelector: '.dropdown-menu',
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-drop',
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
	 * Get siblings of an element
	 * @private
	 * @param  {Element} elem
	 * @return {NodeList}
	 */
	var getSiblings = function (elem) {
		var siblings = [];
		var sibling = elem.parentNode.firstChild;
		var skipMe = elem;
		for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType == 1 && sibling != elem ) {
				siblings.push( sibling );
			}
		}
		return siblings;
	};

	/**
	 * Toggle a dropdown menu
	 * @public
	 * @param  {Element} toggle Element that triggered the expand or collapse
	 * @param  {Object} settings
	 * @param  {Event} event
	 */
	exports.toggleDrop = function ( toggle, options, event ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var toggleMenu = toggle.nextElementSibling;
		var toggleParent = toggle.parentNode;
		var toggleSiblings = getSiblings(toggleParent);

		// Prevent defaults
		if ( event ) {
			event.stopPropagation();
			event.preventDefault();
		}

		settings.callbackBefore( toggle ); // Run callbacks before drop toggle

		// Add/remove '.active' class from dropdown item
		toggle.classList.toggle( settings.toggleActiveClass );
		toggleMenu.classList.toggle( settings.contentActiveClass );
		toggleParent.classList.toggle( settings.toggleActiveClass );

		// For each toggle, remove the active class
		forEach(toggleSiblings, function (sibling) {
			var siblingContent = sibling.children;
			sibling.classList.remove( settings.toggleActiveClass );
			forEach(siblingContent, function (content) {
				content.classList.remove( settings.contentActiveClass );
			});
		});

		settings.callbackAfter( toggle ); // Run callbacks after drop toggle

	};

	/**
	 * Close all dropdown menus
	 * @private
	 * @param  {Object} settings
	 */
	var closeDrops = function ( settings ) {

		// Selectors and variables
		var dropToggle = document.querySelectorAll(settings.toggleSelector + ' > a.' + settings.toggleActiveClass);
		var dropWrapper = document.querySelectorAll(settings.toggleSelector + '.' + settings.toggleActiveClass);
		var dropContent = document.querySelectorAll(settings.contentSelector + '.' + settings.contentActiveClass);

		if ( dropToggle.length > 0 || dropWrapper.length > 0 || dropContent > 0 ) {

			settings.callbackBefore(); // Run callbacks before drop close

			// For each dropdown toggle, remove '.active' class
			forEach(dropToggle, function (toggle) {
				toggle.classList.remove( settings.toggleActiveClass );
			});

			// For each dropdown toggle wrapper, remove '.active' class
			forEach(dropWrapper, function (wrapper) {
				wrapper.classList.remove( settings.toggleActiveClass );
			});

			// For each dropdown content area, remove '.active' class
			forEach(dropContent, function (content) {
				content.classList.remove( settings.contentActiveClass );
			});

			settings.callbackAfter(); // Run callbacks after drop close

		}

	};

	/**
	 * Don't close dropdown menus when clicking on content within them
	 * @private
	 * @param  {Event} event
	 */
	var handleDropdownClick = function ( event ) {
		event.stopPropagation();
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	exports.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', closeDrops, false);
		if ( toggles ) {
			forEach( toggles, function ( toggle, index ) {
				toggle.removeEventListener( 'click', eventListeners.toggle[index], false );
			});
			eventListeners.toggle = [];
		}
		if ( menus ) {
			forEach( menus, function ( menu, index ) {
				menu.removeEventListener( 'click', eventListeners.menu[index], false );
			});
			eventListeners.menu = [];
		}
		settings = null;
		toggles = null;
		menus = null;
	};

	/**
	 * Initialize Drop
	 * @public
	 * @param {Object} options User settings
	 */
	exports.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		exports.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults
		toggles = document.querySelectorAll(settings.toggleSelector + ' > a');
		menus = document.querySelectorAll(settings.contentSelector);

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// When body is clicked, close all dropdowns
		document.addEventListener('click', closeDrops.bind( null, settings ), false);

		// When a toggle is clicked, show/hide dropdown menu
		forEach(toggles, function (toggle, index) {
			eventListeners.toggle[index] = exports.toggleDrop.bind( null, toggle, settings );
			toggle.addEventListener('click', eventListeners.toggle[index], false);
		});

		// When dropdown menu content is clicked, don't close the menu
		forEach(menus, function (menu, index) {
			eventListeners.menu[index] = handleDropdownClick;
			menu.addEventListener('click', eventListeners.menu[index], false);
		});

	};


	//
	// Public APIs
	//

	return exports;

});
/*!
 * Drop v9.1.0: Simple, mobile-friendly dropdown menus
 * (c) 2015 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/drop
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.drop = factory(root);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var drop = {}; // Object for public APIs
	var settings;

	// Default settings
	var defaults = {
		selectorDropdown: '[data-dropdown]',
		selectorMenu: '[data-dropdown-menu]',
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
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
	 * Get siblings of an element
	 * @private
	 * @param  {Element} elem
	 * @return {NodeList}
	 */
	var getSiblings = function ( elem ) {

		// Variables
		var siblings = [];
		var sibling = elem.parentNode.firstChild;

		// Loop through all sibling nodes
		for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType === 1 && sibling !== elem ) {
				siblings.push( sibling );
			}
		}

		return siblings;

	};

	/**
	 * Get closest DOM element up the tree that contains a class or data attribute
	 * @param  {Element} elem The base element
	 * @param  {String} selector The class or data attribute to look for
	 * @return {Boolean|Element} False if no match
	 */
	var getClosest = function ( elem, selector ) {

		// Variables
		var firstChar = selector.charAt(0);
		var supports = 'classList' in document.documentElement;
		var attribute, value;

		// If selector is a data attribute, split attribute from value
		if ( firstChar === '[' ) {
			selector = selector.substr(1, selector.length - 2);
			attribute = selector.split( '=' );

			if ( attribute.length > 1 ) {
				value = true;
				attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
			}
		}

		// Get closest match
		for ( ; elem && elem !== document; elem = elem.parentNode ) {

			// If selector is a class
			if ( firstChar === '.' ) {
				if ( supports ) {
					if ( elem.classList.contains( selector.substr(1) ) ) {
						return elem;
					}
				} else {
					if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
						return elem;
					}
				}
			}

			// If selector is an ID
			if ( firstChar === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					return elem;
				}
			}

			// If selector is a data attribute
			if ( firstChar === '[' ) {
				if ( elem.hasAttribute( attribute[0] ) ) {
					if ( value ) {
						if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
							return elem;
						}
					} else {
						return elem;
					}
				}
			}

			// If selector is a tag
			if ( elem.tagName.toLowerCase() === selector ) {
				return elem;
			}

		}

		return null;

	};

	/**
	 * Toggle a dropdown menu
	 * @public
	 * @param  {Element} toggle Element that triggered the expand or collapse
	 * @param  {Object} settings
	 * @param  {Event} event
	 */
	drop.toggleDrop = function ( toggle, options, event ) {

		// Selectors and variables
		var settings = extend( settings || defaults, options || {} );  // Merge user options with defaults
		var toggleMenu = toggle.nextElementSibling;
		var toggleParent = toggle.parentNode;
		var toggleSiblings = getSiblings(toggleParent);

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

		settings.callback( toggle ); // Run callbacks after drop toggle

	};

	/**
	 * Close all dropdown menus
	 * @public
	 * @param  {Object} settings
	 */
	drop.closeDrops = function () {

		// Selectors and variables
		var dropToggle = document.querySelectorAll( settings.selectorDropdown + ' > a.' + settings.toggleActiveClass );
		var dropWrapper = document.querySelectorAll( settings.selectorDropdown + '.' + settings.toggleActiveClass);
		var dropContent = document.querySelectorAll( settings.selectorMenu + '.' + settings.contentActiveClass );

		if ( dropToggle.length > 0 || dropWrapper.length > 0 || dropContent.length > 0 ) {

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

			settings.callback(); // Run callbacks after drop close

		}

	};

	/**
	 * Handle toggle and document click events
	 * @private
	 */
	var eventHandler = function (event) {
		var toggle = event.target;
		var menu = getClosest( toggle, settings.selectorMenu );
		if ( menu && toggle !== document.documentElement && !getClosest( toggle.parentNode, settings.selectorDropdown ) ) {
			// If dropdown menu, do nothing
			return;
		} else if ( toggle !== document.documentElement && getClosest( toggle, settings.selectorDropdown ) ) {
			// If dropdown toggle element, toggle dropdown menu
			event.preventDefault();
			drop.toggleDrop(toggle, settings);
		} else {
			// If document body, close open dropdown menus
			drop.closeDrops();
		}
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	drop.destroy = function () {
		if ( !settings ) return;
		document.documentElement.classList.remove( settings.initClass );
		document.removeEventListener('click', eventHandler, false);
		drop.closeDrops();
		settings = null;
	};

	/**
	 * Initialize Drop
	 * @public
	 * @param {Object} options User settings
	 */
	drop.init = function ( options ) {

		// Destroy any existing initializations
		drop.destroy();

		// Selectors and variables
		settings = extend( defaults, options || {} ); // Merge user options with defaults

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// Listen for all click events
		document.addEventListener('click', eventHandler, false);

	};


	//
	// Public APIs
	//

	return drop;

});
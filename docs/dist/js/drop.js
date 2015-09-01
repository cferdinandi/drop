/*!
 * Drop v8.0.0: Simple, mobile-friendly dropdown menus
 * (c) 2015 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/drop
 */

var drop = function ( dropdown, toggle, menu ) {

	'use strict';

	// Sanity check
	if ( !dropdown || !toggle || !menu ) return;

	// Variables
	var activeToggle = 'active';
	var activeMenu = 'active';
	var dropdowns = document.querySelectorAll( dropdown );
	var toggles = document.querySelectorAll( toggle );
	var menus = document.querySelectorAll( menu );
	var i, len;

	// If elements does exist, bail
	if ( dropdowns.length === 0 || toggles.length === 0 || menus.length === 0 ) return;

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

	// Close all dropdown menus
	var closeDrops = function () {

		// Remove .active class from parent
		for (i = 0, len = dropdowns.length; i < len; i++) {
			dropdowns[i].classList.remove( activeToggle );
		}

		// Remove .active class from toggle
		for (i = 0, len = toggles.length; i < len; i++) {
			toggles[i].classList.remove( activeToggle );
		}

		// Remove .active class from menu
		for (i = 0, len = menus.length; i < len; i++) {
			menus[i].classList.remove( activeMenu );
		}

	};

	/**
	 * Open the dropdown menu
	 * @param  {Node} toggle The dropdown menu to activate
	 */
	var openDrop = function ( toggle ) {

		// Get dropdown parent
		var parent = getClosest( toggle, dropdown );
		if ( !parent ) return;

		// Get dropdown menu
		var theMenu = parent.querySelector( menu );
		if ( !theMenu ) return;

		// Activate everything
		toggle.classList.add( activeToggle );
		parent.classList.add( activeToggle );
		theMenu.classList.add( activeMenu );

	};

	/**
	 * Toggle the dropdown menu
	 * @param  {Node} toggle The dropdown menu to toggle
	 */
	var toggleDrop = function ( toggle ) {

		// If dropdown is open or none is provided, close all dropdowns
		if ( !toggle || toggle.classList.contains( activeToggle ) ) {
			closeDrops();
			return;
		}

		// Otherwise, open the dropdown
		closeDrops();
		openDrop( toggle );

	};

	// Add class to HTML element to activate conditional CSS
	document.documentElement.classList.add( 'drop' );

	// Listen for all click events
	document.addEventListener('click', function (event) {

		// Get clicked element
		var elem = event.target;
		var getMenu = getClosest( elem, menu );

		if ( getMenu && elem !== document.documentElement ) {
			// If dropdown menu, do nothing
			return;
		} else if ( elem !== document.documentElement && getClosest( elem, dropdown ) ) {
			// If dropdown toggle element, toggle dropdown menu
			event.preventDefault();
			toggleDrop( elem );
		} else {
			// If document body, close open dropdown menus
			closeDrops();
		}

	}, false);

};
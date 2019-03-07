/*!
 * dropjs v12.1.0
 * Simple, mobile-friendly dropdown menus
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/drop
 */

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], (function () {
			return factory(root);
		}));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.Drop = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

	'use strict';

	//
	// Methods
	//

	var closeOthers = function (elem, current, selector) {
		var details = elem.querySelectorAll(selector + '[open]');
		Array.prototype.forEach.call(details, (function (detail) {
			if (detail === current) return;
			detail.removeAttribute('open');
		}));
	};

	/**
	 * Create the Constructor object
	 */
	var Constructor = function (group, selector) {

		//
		// Variables
		//

		var publicAPIs = {};
		var elem = typeof group === 'string' ? document.querySelector(group) : group;
		var dropdown = selector || '.dropdown';


		//
		// Methods
		//

		var toggleHandler = function (event) {
			if (!event.target.open) return;
			closeOthers(elem, event.target, dropdown);
		};

		publicAPIs.destroy = function () {
			elem.removeEventListener('toggle', toggleHandler, true);
		};

		var init = function () {
			if (!elem) return;
			elem.addEventListener('toggle', toggleHandler, true);
		};


		//
		// Initialize and return the Public APIs
		//

		init();
		return publicAPIs;

	};


	//
	// Return the Constructor
	//

	return Constructor;

}));
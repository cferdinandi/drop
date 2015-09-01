describe('Drop', function () {

	//
	// Helper Functions
	//

	/**
	 * Inserts markup into DOM
	 */
	var injectElem = function () {
		var elem =
			'<ul>' +
				'<li class="dropdown" data-dropdown>' +
					'<a href="#">Dropdown 1</a>' +
					'<div class="dropdown-menu" data-dropdown-menu>' +
						'<ul>' +
							'<li><a href="#">Item 1</a></li>' +
							'<li><a href="#">Item 2</a></li>' +
							'<li><a href="#">Item 3</a></li>' +
						'</ul>' +
					'</div>' +
				'</li>' +
				'<li class="dropdown" data-dropdown>' +
					'<a href="#">Dropdown 2</a>' +
					'<div class="dropdown-menu dropdown-right" data-dropdown-menu>' +
						'<ul>' +
							'<li><a href="#">Item 1</a></li>' +
							'<li><a href="#">Item 2</a></li>' +
							'<li><a href="#">Item 3</a></li>' +
						'</ul>' +
					'</div>' +
				'</li>' +
			'</ul>';
		document.body.innerHTML = elem;
	};

	/**
	 * Triggers an event
	 * @param  {String} type Type of event (ex. 'click')
	 * @param  {Element} elem The element that triggered the event
	 * @link http://stackoverflow.com/a/2490876
	 */
	var trigger = function (type, elem) {
		var event; // The custom event that will be created

		if (document.createEvent) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = type;
		}

		event.eventName = type;

		if (document.createEvent) {
			elem.dispatchEvent(event);
		} else {
			elem.fireEvent("on" + event.eventType, event);
		}
	};

	/**
	 * Bind polyfill for PhantomJS
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
	 */
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1);
			var fToBind = this;
			var fNOP = function () {};
			var fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}


	//
	// Init
	//

	describe('Should initialize plugin', function () {

		beforeEach(function () {
			drop.init();
		});

		it('Document should include the drop module', function () {
			expect(!!drop).toBe(true);
		});

		it('Document should contain init class', function () {
			expect(document.documentElement.classList.contains('js-drop')).toBe(true);
		});

	});

	describe('Should merge user options into defaults', function () {

		var toggle, toggleParent, menu, doc;

		beforeEach(function () {
			injectElem();
			drop.init({
				toggleActiveClass: 'toggle-active', // Class added to active dropdown toggles
				contentActiveClass: 'content-active', // Class added to active dropdown content
				initClass: 'js-test', // Class added to `<html>` element when initiated
				callback: function () { document.documentElement.classList.add('callback'); }
			});
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
			menu = toggle.nextElementSibling;
			doc = document.documentElement;
		});

		it('User options should be merged into defaults', function () {
			trigger('click', toggle);
			expect(toggle.classList.contains('toggle-active')).toBe(true);
			expect(toggle.classList.contains('toggle-active')).toBe(true);
			expect(menu.classList.contains('content-active')).toBe(true);
			expect(doc.classList.contains('js-test')).toBe(true);
			expect(doc.classList.contains('callback')).toBe(true);
		});

	});


	//
	// Events
	//

	describe('Should toggle expand and collapse on click', function () {

		var toggle, toggleParent, menu;

		beforeEach(function () {
			injectElem();
			drop.init();
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
			menu = toggle.nextElementSibling;
		});

		it('Toggle, toggle parent, and menu should have ".active" class on click', function () {
			trigger('click', toggle);
			expect(toggle.classList.contains('active')).toBe(true);
			expect(toggleParent.classList.contains('active')).toBe(true);
			expect(menu.classList.contains('active')).toBe(true);
		});

		it('Toggle, toggle parent, and menu should not have ".active" class if toggle is clicked again', function () {
			trigger('click', toggle);
			expect(toggle.classList.contains('active')).toBe(true);
			expect(toggleParent.classList.contains('active')).toBe(true);
			expect(menu.classList.contains('active')).toBe(true);
			trigger('click', toggle);
			expect(toggle.classList.contains('active')).toBe(false);
			expect(toggleParent.classList.contains('active')).toBe(false);
			expect(menu.classList.contains('active')).toBe(false);
		});

	});

	describe('Should close dropdown when body or another dropdown is clicked', function () {

		var toggles;

		beforeEach(function () {
			injectElem();
			drop.init();
			toggles = document.querySelectorAll('[data-dropdown] > a');
		});

		it('First dropdown should close when second dropdown is clicked', function () {
			trigger('click', toggles[0]);
			expect(toggles[0].classList.contains('active')).toBe(true);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			expect(toggles[0].nextElementSibling.classList.contains('active')).toBe(true);
			trigger('click', toggles[1]);
			expect(toggles[1].classList.contains('active')).toBe(true);
			expect(toggles[1].parentNode.classList.contains('active')).toBe(true);
			expect(toggles[1].nextElementSibling.classList.contains('active')).toBe(true);
			expect(toggles[0].classList.contains('active')).toBe(false);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(false);
			expect(toggles[0].nextElementSibling.classList.contains('active')).toBe(false);
		});

		it('Dropdown should close when body is clicked', function () {
			trigger('click', toggles[0]);
			expect(toggles[0].classList.contains('active')).toBe(true);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			expect(toggles[0].nextElementSibling.classList.contains('active')).toBe(true);
			trigger('click', document.documentElement);
			expect(toggles[0].classList.contains('active')).toBe(false);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(false);
			expect(toggles[0].nextElementSibling.classList.contains('active')).toBe(false);
		});

		it('Dropdown should stay open when menu content is clicked', function () {
			trigger('click', toggles[0]);
			expect(toggles[0].classList.contains('active')).toBe(true);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			expect(toggles[0].nextElementSibling.classList.contains('active')).toBe(true);
			trigger('click', document.querySelector('.dropdown-menu li'));
			expect(toggles[0].classList.contains('active')).toBe(true);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			expect(toggles[0].nextElementSibling.classList.contains('active')).toBe(true);
		});

	});


	//
	// APIs
	//

	describe('Should toggle from public API', function () {

		var toggle, toggleParent, menu;

		beforeEach(function () {
			injectElem();
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
			menu = toggle.nextElementSibling;
			drop.toggleDrop(toggle, null, null);
		});

		it('Toggle, toggle parent, and menu should have ".active" class when toggled', function () {
			expect(toggle.classList.contains('active')).toBe(true);
			expect(toggleParent.classList.contains('active')).toBe(true);
			expect(menu.classList.contains('active')).toBe(true);
		});

		it('Toggle, toggle parent, and menu should not have ".active" class when toggled again', function () {
			expect(toggle.classList.contains('active')).toBe(true);
			expect(toggleParent.classList.contains('active')).toBe(true);
			expect(menu.classList.contains('active')).toBe(true);
			drop.toggleDrop(toggle, null, null);
			expect(toggle.classList.contains('active')).toBe(false);
			expect(toggleParent.classList.contains('active')).toBe(false);
			expect(menu.classList.contains('active')).toBe(false);
		});

	});

	describe('Should remove initialized plugin', function () {

		var toggle, toggleParent, menu, doc;

		beforeEach(function () {
			injectElem();
			drop.init();
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
			menu = toggle.nextElementSibling;
			doc = document.documentElement;
		});

		it('Drop should be uninitialized', function () {
			trigger('click', toggle);
			expect(toggle.classList.contains('active')).toBe(true);
			expect(toggleParent.classList.contains('active')).toBe(true);
			expect(menu.classList.contains('active')).toBe(true);
			expect(doc.classList.contains('js-drop')).toBe(true);
			trigger('click', toggle);
			expect(toggle.classList.contains('active')).toBe(false);
			expect(toggleParent.classList.contains('active')).toBe(false);
			expect(menu.classList.contains('active')).toBe(false);
			drop.destroy();
			trigger('click', toggle);
			expect(toggle.classList.contains('active')).toBe(false);
			expect(toggleParent.classList.contains('active')).toBe(false);
			expect(menu.classList.contains('active')).toBe(false);
			expect(doc.classList.contains('js-drop')).toBe(false);
		});

	});

});

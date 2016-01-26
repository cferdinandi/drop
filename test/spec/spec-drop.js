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
					'<div class="dropdown-menu">' +
						'<ul>' +
							'<li><a href="#">Item 1</a></li>' +
							'<li><a href="#">Item 2</a></li>' +
							'<li><a href="#">Item 3</a></li>' +
						'</ul>' +
					'</div>' +
				'</li>' +
				'<li class="dropdown" data-dropdown>' +
					'<a href="#">Dropdown 2</a>' +
					'<div class="dropdown-menu dropdown-right">' +
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

		var toggle, toggleParent, doc;

		beforeEach(function () {
			injectElem();
			drop.init({
				activeClass: 'toggle-active', // Class added to active dropdown toggles
				initClass: 'js-test', // Class added to `<html>` element when initiated
				callback: function () { document.documentElement.classList.add('callback'); }
			});
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
			doc = document.documentElement;
		});

		it('User options should be merged into defaults', function () {
			trigger('mouseover', toggle);
			expect(toggleParent.classList.contains('toggle-active')).toBe(true);
			expect(doc.classList.contains('js-test')).toBe(true);
			expect(doc.classList.contains('callback')).toBe(true);
		});

	});


	//
	// Events
	//

	describe('Should open dropdown on hover or focus', function () {

		var toggle, toggleParent;

		beforeEach(function () {
			injectElem();
			drop.init();
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
		});

		it('Toggle should have ".active" class on :hover', function () {
			trigger('mouseover', toggle);
			expect(toggleParent.classList.contains('active')).toBe(true);
		});

		it('Toggle should have ".active" class on :focus', function () {
			trigger('focusin', toggle);
			expect(toggleParent.classList.contains('active')).toBe(true);
		});

	});

	describe('Should close dropdown when another dropdown is opened or outside dropdown is clicked', function () {

		var toggles;

		beforeEach(function () {
			injectElem();
			drop.init();
			toggles = document.querySelectorAll('[data-dropdown] > a');
		});

		it('First dropdown should close when second dropdown is opened', function () {
			trigger('mouseover', toggles[0]);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			trigger('mouseover', toggles[1]);
			expect(toggles[1].parentNode.classList.contains('active')).toBe(true);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(false);
		});

		it('Dropdown should close when body is clicked', function () {
			trigger('mouseover', toggles[0]);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			trigger('click', document.documentElement);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(false);
		});

		it('Dropdown should stay open when menu content is clicked', function () {
			trigger('mouseover', toggles[0]);
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
			trigger('click', document.querySelector('.dropdown-menu li'));
			expect(toggles[0].parentNode.classList.contains('active')).toBe(true);
		});

	});


	//
	// APIs
	//

	describe('Should open dropdown from public API', function () {

		var toggle;

		beforeEach(function () {
			injectElem();
			toggle = document.querySelector('[data-dropdown]');
			drop.openDrop(toggle, null);
		});

		it('Toggle should have ".active" class', function () {
			expect(toggle.classList.contains('active')).toBe(true);
		});

	});

	describe('Should close dropdown from public API', function () {

		var toggle, toggleParent;

		beforeEach(function () {
			injectElem();
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
		});

		it('Toggle should have ".active" class on :hover', function () {
			trigger('mouseover', toggle);
			expect(toggleParent.classList.contains('active')).toBe(true);
		});

		it('Toggle should not have ".active" class after calling closeDrops()', function () {
			drop.closeDrops();
			expect(toggleParent.classList.contains('active')).toBe(false);
		});

	});

	describe('Should remove initialized plugin', function () {

		var toggle, toggleParent, doc;

		beforeEach(function () {
			injectElem();
			drop.init();
			toggle = document.querySelector('[data-dropdown] > a');
			toggleParent = toggle.parentNode;
			doc = document.documentElement;
		});

		it('Drop should be uninitialized', function () {
			trigger('mouseover', toggle);
			expect(toggleParent.classList.contains('active')).toBe(true);
			expect(doc.classList.contains('js-drop')).toBe(true);
			drop.destroy();
			expect(toggleParent.classList.contains('active')).toBe(false);
			trigger('mouseover', toggle);
			expect(toggleParent.classList.contains('active')).toBe(false);
			expect(doc.classList.contains('js-drop')).toBe(false);
		});

	});

});

/*!
 * Drop v11.0.0: Simple, mobile-friendly dropdown menus
 * (c) 2016 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/drop
 */

/**
 * focusin/focusout polyfill for Firefox
 * @author Tobias Buschor
 * @link https://gist.github.com/nuxodin/9250e56a3ce6c0446efa
 */

;(function (w, d, undefined) {

	'use strict';

	if( w.onfocusin === undefined ){
		d.addEventListener('focus'    ,addPolyfill    ,true);
		d.addEventListener('blur'     ,addPolyfill    ,true);
		d.addEventListener('focusin'  ,removePolyfill ,true);
		d.addEventListener('focusout' ,removePolyfill ,true);
	}
	function addPolyfill(e){
		var type = e.type === 'focus' ? 'focusin' : 'focusout';
		var event = new CustomEvent(type, { bubbles:true, cancelable:false });
		event.c1Generated = true;
		e.target.dispatchEvent( event );
	}
	function removePolyfill(e){
		if(!e.c1Generated){ // focus after focusin, so chrome will the first time trigger tow times focusin
			d.removeEventListener('focus'    ,addPolyfill    ,true);
			d.removeEventListener('blur'     ,addPolyfill    ,true);
			d.removeEventListener('focusin'  ,removePolyfill ,true);
			d.removeEventListener('focusout' ,removePolyfill ,true);
		}
		setTimeout(function(){
			d.removeEventListener('focusin'  ,removePolyfill ,true);
			d.removeEventListener('focusout' ,removePolyfill ,true);
		});
	}

})(window, document);
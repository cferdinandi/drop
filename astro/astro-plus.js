/* =============================================================

    Astro v3.0
    Mobile-first navigation patterns by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */


/* =============================================================
    MICRO-FRAMEWORK
    Simple vanilla JavaScript functions to handle common tasks.
 * ============================================================= */

// Check if an element has a class
var hasClass = function (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// Add a class to an element
var addClass = function (elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

// Remove a class from an element
var removeClass = function (elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// Toggle a class on an element
var toggleClass = function (elem, className) {
    if ( hasClass(elem, className) ) {
        removeClass(elem, className);
    }
    else {
        addClass(elem, className);
    }
}


/* =============================================================
    ASTRO FUNCTIONS
    Toggle the navigation menu.
 * ============================================================= */

// "Cut the Mustard" Feature Test
if ( 'querySelector' in document && 'addEventListener' in window ) {

    // Get all '.nav-toggle' elements
    var navToggle = document.querySelectorAll('.nav-toggle');

    // For each '.nav-toggle'
    [].forEach.call(navToggle, function (toggle) {

        // When '.nav-toggle' clicked
        toggle.addEventListener('click', function(e) {

            // Prevent the default action from occurring
            e.preventDefault();

            // Get target navigation menu
            var dataID = this.dataset.target;
            var dataTarget = document.querySelector(dataID);

            // Toggle the '.active' class on the menu
            toggleClass(dataTarget, 'active');
            
        }, false);
    });
}

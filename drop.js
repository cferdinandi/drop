/* =============================================================

    Drop v2.3
    Simple, mobile-friendly dropdown menus by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */

(function() {

    'use strict';

    // Feature Test
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        // Function to toggle dropdowns
        var toggleDrop = function (toggle) {
        
            // Define the dropdown menu content, parent element, and siblings
            var toggleMenu = toggle.nextElementSibling;
            var toggleParent = toggle.parentNode;
            var toggleSiblings = buoy.getSiblings(toggleParent);

            // Add/remove '.active' class from dropdown item
            buoy.toggleClass(toggle, 'active');
            buoy.toggleClass(toggleMenu, 'active');
            buoy.toggleClass(toggleParent, 'active');

            // Remove '.active' class from all sibling elements
            [].forEach.call(toggleSiblings, function (sibling) {
                var siblingContent = sibling.children;
                buoy.removeClass(sibling, 'active');

                // Remove '.active' class from all siblings child elements
                [].forEach.call(siblingContent, function (content) {
                    buoy.removeClass(content, 'active');
                });

            });
                
        };

        // Function to close all dropdowns
        var closeDrops = function (dropToggle, dropWrapper, dropContent) {

            // For each dropdown toggle, remove '.active' class
            [].forEach.call(dropToggle, function (toggle) {
                buoy.removeClass(toggle, 'active');
            });

            // For each dropdown toggle, remove '.active' class
            [].forEach.call(dropWrapper, function (wrapper) {
                buoy.removeClass(wrapper, 'active');
            });

            // For each dropdown toggle, remove '.active' class
            [].forEach.call(dropContent, function (content) {
                buoy.removeClass(content, 'active');
            });

        };

        // Define the dropdown toggle element, wrapper and content
        var dropToggle = document.querySelectorAll('.dropdown > a');
        var dropWrapper = document.querySelectorAll('.dropdown');
        var dropContent = document.querySelectorAll('.dropdown-menu');


        // When body is clicked, close all dropdowns
        document.addEventListener('click', function(e) {

            // Close dropdowns
            closeDrops(dropToggle, dropWrapper, dropContent);

        }, false);


        // For each toggle
        [].forEach.call(dropToggle, function (toggle) {

            // When the toggle is clicked
            toggle.addEventListener('click', function(e) {

                // Prevent the "close all dropdowns" function
                e.stopPropagation();

                // Prevent default link action
                e.preventDefault();

                // Toggle dropdown menu
                toggleDrop(toggle);

            }, false);
        });


        // For each dropdown menu
        [].forEach.call(dropContent, function (content) {

            // When the menu is clicked
            content.addEventListener('click', function(e) {

                // Prevent the "close all dropdowns" function
                e.stopPropagation();

            }, false);
        });

    }

})();
/* =============================================================

    Astro v3.4
    Mobile-first navigation patterns by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */

(function() {

    // Feature Test
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        // Function to toggle navigation menu
        var toggleNav = function (toggle) {

            // Get target navigation menu
            var dataID = toggle.getAttribute('data-target');
            var dataTarget = document.querySelector(dataID);

            // Toggle the '.active' class on the menu
            buoy.toggleClass(dataTarget, 'active');

        };

        // Define the nav toggle
        var navToggle = document.querySelectorAll('.nav-toggle');

        // For each nav toggle
        [].forEach.call(navToggle, function (toggle) {

            // When nav toggle is clicked
            toggle.addEventListener('click', function(e) {

                // Prevent the default link behavior
                e.preventDefault();

                // Toggle the navigation menu
                toggleNav(toggle);
                
            }, false);
        });
    }

})();

/* =============================================================

    Astro v2.0
    Mobile-first navigation patterns by Chris Ferdinandi.
    http://gomakethings.com

    Licensed under WTFPL
    http://www.wtfpl.net/
    
 * ============================================================= */

(function($) {
    $(function () {
        $('.nav-toggle').click(function(e) { // When a link or button with the .nav-toggle class is clicked
            e.preventDefault(); // Prevent the default action from occurring
            var dataID = $(this).attr('data-target'); // Get the ID of navigation menu
            $(dataID).toggleClass('active'); // Add or remove the .active class from the navigation menu
        });
    });
})(jQuery);

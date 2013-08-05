/* =============================================================

    Drop v1.3
    Simple, progressively enhanced dropdown menus by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */

(function($) {
    $(function () {
        // Close dropdown menus when you click outside of them    
        $('body').click(function(){
          $('.dropdown > a').removeClass('active'); // Remove any '.active' classes from dropdown links
          $('.dropdown').removeClass('active'); // Remove any '.active' classes from dropdown list items
          $('.dropdown-menu').removeClass('active'); // Hide any visible dropdown menus
        });

        // When a dropdown menu link is clicked
        $('.dropdown > a').click(function(e) {
            e.stopPropagation(); // Stop the "close all dropdowns" function
            e.preventDefault(); // Prevent the default link action
            var toggle = $(this);
            toggle.toggleClass('active').next($('.dropdown-menu')).toggleClass('active'); // If the dropdown menu is hidden, show it. Otherwise, hide it.
            toggle.parent('.dropdown').toggleClass('active'); // Add/remove '.active' class to the dropdown list item
            toggle.parent().siblings('.dropdown').removeClass('active').children('a').removeClass('active').next($('.dropdown-menu')).removeClass('active'); // Hide all other dropdown menus
        });

        // When click inside a dropdown menu
        $('.dropdown-menu').click(function(e) {
            e.stopPropagation(); // Stop the "close all dropdowns" function
        });
    });
})(jQuery);





/* =============================================================

    Progressively Enhanced JS v1.0
    Adds .js class to <body> for progressive enhancement.

    Script by Chris Ferdinandi.
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */

(function($) {
    $(function () {
        $('body').addClass('js'); // On page load, add the .js class to the <body> element.
    });
})(jQuery);

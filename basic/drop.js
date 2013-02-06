/* =============================================================
 * drop.js v1.0.0
 * Simple, progressively enhanced dropdown menus.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

$(function () {
    $('.dropdown > a').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active').next($('.dropdown-menu')).toggleClass('active');
        $(this).parent().siblings('.dropdown').removeClass('current').children('a').removeClass('active').next($('.dropdown-menu')).removeClass('active');
        $(this).parent('.dropdown').toggleClass('active');
    });
});





/* =============================================================
 * js-accessibility.js v1.0.0
 * Adds .js class to <body> for progressive enhancement.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

$(function () {
    $('body').addClass('js'); // On page load, add the .js class to the <body> element.
});

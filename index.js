$(document).ready(function() {
    // Disabling the right click. 
    $(document).on("contextmenu", function(event) {
        event.preventDefault();
    });
    const menu_icon = $(".menu-icon");
    const close_icon = $(".close-icon");
    const menu = $(".menu");
    // When user clicks on menu-icon, the menu-options are shown. 
    menu_icon.on("click", function(event) {
        event.stopPropagation();
        menu_icon.hide(1000);
        close_icon.show(1000);
        menu.slideDown(500);
    });
    // When user clicks on close-icon, the menu-options are hidden. 
    close_icon.on("click", function(event) {
        event.stopPropagation();
        close_icon.hide(1000);
        menu_icon.show(1000);
        menu.slideUp(500);
    });
    // When user clicks on the menu-option, the menu is hidden. 
    menu.find("a").on("click", function(event) {
        event.preventDefault(); // Prevents immediate navigation jump. 
        event.stopPropagation();
        const targetID = $(this).attr("href");
        const targetDestiny = $(targetID);
        let offset = 0;
        const windowWidth = $(window).width();
        if (windowWidth <= 1200) {
            offset = $(".sidebar").outerHeight() || 0;
        } else {
            offset = 0;
        }
        if (targetDestiny.length) {
            $("html, body").animate({
                scrollTop: targetDestiny.offset().top - offset
            }, 1000, function() {
                history.pushState(null, null, targetID);
            });
        }
        if ($(window).width() <= 768) {
            menu_icon.show(1000);
            close_icon.hide(1000);
            menu.slideUp(500);
        }
    });
    // When user clicks anywhere on the document except the menu, menu-option, menu-icon, close-icon, the menu is hidden.
    $(document).on("click", function(event) {
        const target = $(event.target);
        if (!(target.closest(".menu").length) && !(target.closest(".menu-icon").length) && !(target.closest(".close-icon").length) && ($(window).width() <= 768)) {
            menu_icon.show(1000);
            close_icon.hide(1000);
            menu.slideUp(500);
        }
    });
    // When resizing from smaller to larger screem size, the menu-options are shown. 
    $(window).on("resize", function() {
        if ($(window).width() > 768) {
            menu_icon.hide();
            close_icon.hide();
            menu.css("display", "flex");
        } else {
            menu_icon.show();
            close_icon.hide();
            menu.css("display", "none");
        }
    });
    $(window).trigger("resize");
    // Adding scroll spy feature. 
    $(window).on("scroll", function() {
        const scrollPosition = $(window).scrollTop();
        let offset = 0;
        let windowWidth = $(window).width();
        if (windowWidth <= 1200) {
            offset = $(".sidebar").outerHeight() || 0;
        } else {
            offset = 0;
        }
        const spyLine = scrollPosition + offset + 10;
        $(".menu a").each(function () {
            const currentLink = $(this);
            const referenceElement = $(currentLink.attr("href"));
            if (referenceElement.length) {
                const elementTop = referenceElement.offset().top;
                const elementBottom = elementTop + referenceElement.outerHeight();
                if ((elementTop <= spyLine) && (elementBottom > spyLine)) {
                    $(".menu a").removeClass("active");
                    currentLink.addClass("active");
                }
            }
        });
    });
    $(window).on("hashchange", function() {
        $(window).trigger("scroll");
    });
    // Styling the skills. 
    $(".skill-fill").each(function() {
        const skillPercentage = $(this).attr("data-percent");
        $(this).css("width", skillPercentage + "%");
    });
});

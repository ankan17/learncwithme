$(function() {

    $('.sidebar-toggle').on('click', function(e) {
        e.preventDefault();
        // console.log(!($('#sidebar-checkbox').is(':checked')));
        $('#sidebar-checkbox').prop('checked', !($('#sidebar-checkbox').is(':checked')));
    });

    $('.content').bind('swiperight', function(e) {
        if (!($('#sidebar-checkbox').is(':checked'))) {
            $('#sidebar-checkbox').prop('checked', true);
        }
    });

    jQuery('.content').bind('swipeleft', function(e) {
        if ($('#sidebar-checkbox').is(':checked')) {
            $('#sidebar-checkbox').prop('checked', false);
        }
    });

    $('.post-content img').each(function() {
        $(this).addClass('img-responsive ' + $(this).attr('alt'));
    });

    $('.post-content h3,h4,h5').each(function() {
        var classname = "level" + ($(this).get(0).tagName.slice(1,2) - 2).toString();
        $('.table-of-contents ul').append("<li class=\"" + classname + "\"><a href=\"#\" scroll-to=\"#" + $(this).attr('id') + "\">" + $(this).html() + "</a></li>");
    });

    $('.table-of-contents ul li a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('scroll-to');
        $('html, body').animate({
            'scrollTop' : $(target).offset().top - 10
        }, 600);
    });

    if ($('.post-container').attr('post-serial') == "3") {
        $('table:eq(0)').addClass("character-set");
        $('table:eq(1)').addClass("keywords");
    }
    if ($('.post-container').attr('post-serial') == "4") {
        $('table:eq(0)').addClass("range");
    }
    if ($('.post-container').attr('post-serial') == "7") {
        $('table:eq(0)').addClass("ascii-values");
        $('table:eq(1)').addClass("escape-sequences");
    }
    if ($('.post-container').attr('post-serial') == "8") {
        $('table').addClass("operators");
    }

    if(window.location.pathname.indexOf("/about/") > -1) {
        var currentDate = new Date();
        var birthday = new Date(98, 0, 17);
        var age = parseInt((currentDate - birthday)/(1000*60*60*24*365));
        $('.about ul li:nth-child(2) .info').html(age + " yrs");
    }

});

$(document).ready (function() {

    applyPageHeader();
    clickScrollDown();
    provideAge();
    scrollToSection();
    $('body').scrollspy({
        target: ".navbar-sticky",
        offset: 50
    });

    $("#navbar-sticky").affix ({
        offset: {
            top : parseInt($("header").css('height')),
            bottom : parseInt($('#contact').css('height'))+100
        }
    });
});

$(window).resize (function() {
    applyPageHeader();
});

$(window).scroll (function() {
    transparentize();
    //showNavbarSticky();
    // var top;
    // if ($('.navbar-sticky').hasClass('affix-top')) {
    //     top = parseInt($('.page-header').css('height')) + 150;
    // }
    // else if ($('.navbar-sticky').hasClass('affix')) {
    //     top = 200;
    // }
    // $('.navbar-sticky').css ({
    //     'top' : top + 'px'
    // });
});

function applyPageHeader() {
    var winHeight = parseInt($(window).innerHeight());
    var height = winHeight-55;
    $('header').css({ height: height + 'px' });
}

function transparentize() {
    var wScroll = $(this).scrollTop();
    var wHeight = $(this).innerHeight()-50;
    var scrollDownTransparency = (parseInt(Math.pow((wHeight-wScroll)/wHeight,0.3)*10))/10;
    var backgroundTransparency = (parseInt(Math.pow((wHeight-wScroll)/wHeight,0.3)*10))/10;
    if (backgroundTransparency > 0) {
        $('header').css({
            'opacity' : backgroundTransparency,
            'filter' : 'alpha(opacity=' + backgroundTransparency*100 + ')'
        });
    }
    if (scrollDownTransparency > 0) {
        if ($(this).innerWidth() > 767)
            $('.move-down').css({
                'opacity' : scrollDownTransparency,
                'filter' : 'alpha(opacity=' + scrollDownTransparency*100 + ')'
            });
    }
}

function clickScrollDown() {
    $('.move-down').click (function(e) {
        e.preventDefault();
        var pos = $('header').offset().top + parseInt($('header').css('height'));
        console.log(pos);
        $('html body').animate ({
            'scrollTop' : pos
        }, 600);
    });
}

function provideAge() {
    var currentDate = new Date();
    var birthday = new Date(98, 0, 17);
    var age = parseInt((currentDate - birthday)/(1000*60*60*24*365));
    $('#about-me ul li:nth-child(2) .info').html(age + " yrs");
}

function showNavbarSticky() {
    var pos = parseInt($('header').css('height'))+150
    var translation = $(this).scrollTop() - pos + $(this).innerHeight()/2 - parseInt($('.navbar-sticky ul li').css('height'))*2;
    $('.navbar-sticky').css ({
        'top': pos + 'px'
    });
    if (translation > 0 && ($(this).scrollTop()+$(this).innerHeight()) < $('#contact').offset().top+30) {
        $('.navbar-sticky').css ({
            'transform' : 'translate(0, ' + translation + 'px)'
        });
    }
    else {
        $('.navbar-sticky').css ({
            'position': 'absolute',
            'top': pos + 'px'
        });
    }
}

function scrollToSection() {
    $('a[href^="#"]').click (function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html body').animate({
            'scrollTop' : $(target).offset().top
        }, 600);
        console.log ($(window).scrollTop(), $(target).offset().top);
    });
}

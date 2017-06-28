$(document).ready (function() {

    applyPageHeader();
    clickScrollDown();
    provideAge();
    scrollToSection();
    applyStickyNavbar();
    applyReferenceNavbar();
    scrollToHeading();
    provideCommentBoxSize();
    showAnswer();

    if ($('.post-content')) {
        if ('img') {
            var length = $('img')['length'];
            var i, name;
            for (i=0;i<length;i++) {
                name = 'img:eq(' + i + ')';
                $(name).addClass("img-responsive " + $(name).attr('alt'));
            }
        }
        if ($('.post-content').attr('post') == "3") {
            $('table:eq(0)').addClass("character-set");
            $('table:eq(1)').addClass("keywords");
        }
        if ($('.post-content').attr('post') == "4") {
            $('table:eq(0)').addClass("range");
        }
        if ($('.post-content').attr('post') == "7") {
            $('table:eq(0)').addClass("ascii-values");
            $('table:eq(1)').addClass("escape-sequences");
        }
        if ($('.post-content').attr('post') == "8") {
            $('table').addClass("operators");
        }
    }
});

$(window).resize (function() {
    applyPageHeader();
});

$(window).scroll (function() {
    transparentize();
});

function applyPageHeader() {
    var winHeight = parseInt($(window).innerHeight());
    var winWidth = parseInt($(window).innerWidth());
    var height = winHeight-55;
    var outerWidth  = parseInt(height/594*327);
    var innerHeight = parseInt(height*50/100);
    var innerWidth  = parseInt(innerHeight/291*206);
    var textHeight  = parseInt(height*7/100);
    var textWidth   = parseInt(textHeight/52*528);

    $('header').css({
        height: height + 'px'
    });

    $('.outer').css({
        'margin-left' : -parseInt(outerWidth/2)
    });

    $('.inner').css({
        'margin-left' : -parseInt(innerWidth/2),
        'margin-top'  : -parseInt(innerHeight/2)
    });

    $('.text').css({
        'margin-left' : -parseInt(textWidth/2),
        'margin-top'  : -parseInt(textHeight/2)
    });
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

function scrollToSection() {
    $('a[href^="#"]').click (function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html body').animate({
            'scrollTop' : $(target).offset().top
        }, 600);
    });
}

function scrollToHeading() {
    $('#reference-nav li a').click (function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        console.log(target);
        $('html body').animate({
            'scrollTop' : $(target).offset().top-70
        }, 400);
    });
}

function applyStickyNavbar() {
    $('body').scrollspy({
        target: ".navbar-sticky",
        offset: 50
    });
    $("#navbar-sticky").affix ({
        offset: {
            top : parseInt($("header").css('height')),
            bottom : parseInt($('#contact').css('height'))+200
        }
    });
}

function applyReferenceNavbar() {
    $("#reference-nav").affix ({
        offset: {
            top : 95,
            bottom : parseInt($('#contact').css('height'))+405
        }
    });
    provideHeadingLinks('h3');
    provideHeadingLinks('h4');
    var len = $('.post-content .heading').length, i=0, heading_element;
    while (i < len) {
        heading_element = $('.heading').eq(i);
        $('#reference-nav').append("<li><a>" + heading_element.html() + "</a></li>");
        $('#reference-nav li').eq(i).attr({
            'class' : 'level' + $(heading_element).attr('class').split(" ")[1]
        });
        $('#reference-nav li a').eq(i).attr({
            'href': "#" + heading_element.attr('id')
        });
        i++;
    }
}

function provideHeadingLinks(tag) {
    var len, heading_element, i=0;
    var len = $('.post-content .row .col-xs-12').children(tag).length;
    while (i < len) {
        $('.post-content .row .col-xs-12 ' + tag).eq(i).addClass('heading ' + String(tag.slice(1) - 2));
        i++;
    }
}

function provideCommentBoxSize() {
    if ($(window).width() > 991) {
        $('.fb-comments').attr({
            'data-width' : '700'
        });
        $('.comments').css({
            'width' : $('.fb-comments').attr('data-width')
        });
    }
}

function showAnswer() {
    $('.show-answer').click(function(e) {
        var button = $(this);
        var solution = ($(this).parent()).children('.solution');
        $(solution).slideToggle(350, function() {
            if ($(button).html() == "View Answer") {
                $(button).html("Hide Answer");
            }
            else if ($(button).html() == "Hide Answer") {
                $(button).html("View Answer");
            }
        });
    });
}

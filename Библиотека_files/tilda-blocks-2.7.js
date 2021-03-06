function t228__init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t228__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';
    setTimeout(function() {
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function() {
            if ($(this).is(".t-menu__link-item.tooltipstered, .t-menu__link-item.t-menusub__target-link, .t-menu__link-item.t794__tm-link")) { return }
            if (fixedBlock) { mobile.trigger('click') }
        });
        el.find('.t-menusub__link-item').on('click', function() { if (fixedBlock) { mobile.trigger('click') } });
        el.find('.t228__right_buttons_but .t-btn').on('click', function() { if (fixedBlock) { mobile.trigger('click') } })
    }, 500);
    el.find(".t228__centerside").removeClass("t228__centerside_hidden")
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") { url = url.slice(0, -1) }
    if (pathname.substr(pathname.length - 1) == "/") { pathname = pathname.slice(0, -1) }
    if (pathname.charAt(0) == "/") { pathname = pathname.slice(1) }
    if (pathname == "") { pathname = "/" }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active")
}

function t228_checkAnchorLinks(recid) { var el = $('#rec' + recid); if ($(window).width() > 980) { var t228_navLinks = el.find(".t228__list_item a:not(.tooltipstered)[href*='#']"); if (t228_navLinks.length > 0) { setTimeout(function() { t228_catchScroll(t228_navLinks) }, 500) } } }

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = [],
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") { t228_sections.push(t228_cursection) }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this)
    });
    t228_sections.sort(function(a, b) { return b.offset().top - a.offset().top });
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
    t228_navLinks.click(function() {
        var clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
            }, t228_interval - (t228_now - t228_lastCall))
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
        }
    })
}

function t228_getSectionByHref(curlink) { var curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, ''); if (curlink.is('[href*="#rec"]')) { return $(".r[id='" + curLinkValue + "']") } else { return $(".r[data-record-type='215']").has("a[name='" + curLinkValue + "']") } }

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop();
    var t228_valueToReturn = t228_clickedSectionId;
    if (t228_sections.length !== 0 && t228_clickedSectionId === null && t228_sections[t228_sections.length - 1].offset().top > (t228_scrollPosition + 300)) { t228_navLinks.removeClass('t-active'); return null }
    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_id = t228_curSection.attr('id'),
            t228_sectionTop = t228_curSection.offset().top,
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null
            } else { if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) { t228_valueToReturn = null } }
            return !1
        }
    });
    return t228_valueToReturn
}

function t228_setWidth(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(!0);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(!0);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function() { center_w += $(this).outerWidth(!0) });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden")
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "")
            }
        })
    }
    el.find(".t228__centerside").removeClass("t228__centerside_hidden")
}

function t228_setBg(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        el.find(".t228").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t228_appearMenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) { appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100))) }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) { el.animate({ "opacity": "1", "top": topoffset + "px" }, 200, function() {}) } else { el.animate({ "opacity": "1", "top": "0px" }, 200, function() {}) }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0")
                }
            }
        })
    }
}

function t228_changebgopacitymenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') { var menushadowvalue = menushadow } else { var menushadowvalue = '0.' + menushadow }
            if ($(window).scrollTop() > 20) { el.css("background-color", bgcolor_afterscroll); if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == !1)) { el.css("box-shadow", "none") } else { el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")") } } else { el.css("background-color", bgcolor); if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == !1)) { el.css("box-shadow", "none") } else { el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")") } }
        })
    }
}

function t228_createMobileMenu(recid) {
    var el = $("#rec" + recid);
    var menu = el.find(".t228");
    var burger = el.find(".t228__mobile");
    burger.on('click', function(e) {
        menu.fadeToggle(300);
        burger.toggleClass("t228_opened")
    });
    $(window).bind('resize', t_throttle(function() { if ($(window).width() > 980) { menu.fadeIn(0) } }))
}
t422_setHeight = function(recid) {
    if ($(window).width() > 960) { t422_checkEqualHeight(recid) } else {
        $('#rec' + recid + ' .t422__img-mobile').height(200);
        $('#rec' + recid + ' .t422__text').height('auto')
    }
};
t422_checkEqualHeight = function(recid) {
    var t422__txtel = $('#rec' + recid + ' .t422__text');
    var t422__imgel = $('#rec' + recid + ' .t422__img');
    var t422__textwrapperel = $('#rec' + recid + ' .t422__textwrapper');
    var t422__borderwidth = 0;
    if (t422__txtel.css("border-top-width") && t422__txtel.css("border-top-width")[1] != 'p') { t422__borderwidth = +(t422__txtel.css("border-top-width")[0] + t422__txtel.css('border-top-width')[1]) } else {
        if (t422__txtel.css("border-top-width"))
            t422__borderwidth = +(t422__txtel.css("border-top-width")[0])
    }
    if (t422__imgel.height() < (t422__textwrapperel.outerHeight() + t422__borderwidth * 2)) { t422__imgel.height(t422__textwrapperel.outerHeight() + t422__borderwidth * 2) } else { if ((t422__imgel.height() - t422__borderwidth * 2) > t422__textwrapperel.outerHeight()) { t422__textwrapperel.outerHeight(t422__imgel.height() - t422__borderwidth * 2) } }
};

function t585_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t585__header");
    var accordion = el.find('.t585__accordion');
    if (accordion) { accordion = accordion.attr('data-accordion') } else { accordion = "false" }
    toggler.click(function() {
        if (accordion === "true") { toggler.not(this).removeClass("t585__opened").next().slideUp() }
        $(this).toggleClass("t585__opened");
        $(this).next().slideToggle();
        if (window.lazy === 'y' || $('#allrecords').attr('data-tilda-lazy') === 'yes') { t_onFuncLoad('t_lazyload_update', function() { t_lazyload_update() }) }
    })
}

function t698_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) { hcontent += 100 }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function() {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

// function t698_onSuccess(t698_form) {
//     var t698_inputsWrapper = t698_form.find('.t-form__inputsbox');
//     var t698_inputsHeight = t698_inputsWrapper.height();
//     var t698_inputsOffset = t698_inputsWrapper.offset().top;
//     var t698_inputsBottom = t698_inputsHeight + t698_inputsOffset;
//     var t698_targetOffset = t698_form.find('.t-form__successbox').offset().top;
//     if ($(window).width() > 960) { var t698_target = t698_targetOffset - 200 } else { var t698_target = t698_targetOffset - 100 }
//     if (t698_targetOffset > $(window).scrollTop() || ($(document).height() - t698_inputsBottom) < ($(window).height() - 100)) {
//         t698_inputsWrapper.addClass('t698__inputsbox_hidden');
//         setTimeout(function() { if ($(window).height() > $('.t-body').height()) { $('.t-tildalabel').animate({ opacity: 0 }, 50) } }, 300)
//     } else {
//         $('html, body').animate({ scrollTop: t698_target }, 400);
//         setTimeout(function() { t698_inputsWrapper.addClass('t698__inputsbox_hidden') }, 400)
//     }
//     var successurl = t698_form.data('success-url');
//     if (successurl && successurl.length > 0) { setTimeout(function() { window.location.href = successurl }, 500) }
// }
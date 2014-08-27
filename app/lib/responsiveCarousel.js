 /*! responsiveCarousel.JS - v1.2.0
 * http://basilio.github.com/responsiveCarousel
 *
 * Copyright (c) 2013 Basilio C�ceres <basilio.caceres@gmail.com>;
 * Licensed under the MIT license */

(function(e) {
    "use strict";
    e.fn.carousel = function(t) {
        var n, r;
        n = {infinite: true,
            visible: 1,
            speed: "fast",
            overflow: false,
            autoRotate: false,
            navigation: e(this).data("navigation"),
            itemMinWidth: 0,
            itemEqualHeight: false,
            itemMargin: 0,
            itemClassActive: "crsl-active",
            imageWideClass: "wide-image",
            carousel: true};
        return e(this).each(function() {
            r = e(this);
            if (e.isEmptyObject(t) === false)
                e.extend(n, t);
            if (e.isEmptyObject(e(r).data("crsl")) === false)
                e.extend(n, e(r).data("crsl"));
            n.isTouch = "ontouchstart" in document.documentElement || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false;
            r.init = function() {
                n.total = e(r).find(".crsl-item").length;
                n.itemWidth = e(r).outerWidth();
                n.visibleDefault = n.visible;
                n.swipeDistance = null;
                n.swipeMinDistance = 100;
                n.startCoords = {};
                n.endCoords = {};
                e(r).css({width: "100%"});
                e(r).find(".crsl-item").css({position: "relative","float": "left",overflow: "hidden",height: "auto"});
                e(r).find("." + n.imageWideClass).each(function() {
                    e(this).css({display: "block",width: "100%",height: "auto"})
                });
                e(r).find(".crsl-item iframe").attr({width: "100%"});
                if (n.carousel)
                    e(r).find(".crsl-item:first-child").addClass(n.itemClassActive);
                if (n.carousel && n.infinite && n.visible < n.total)
                    e(r).find(".crsl-item:first-child").before(e(".crsl-item:last-child", r));
                if (n.overflow === false) {
                    e(r).css({overflow: "hidden"})
                } else {
                    e("html, body").css({"overflow-x": "hidden"})
                }
                e(r).trigger("initCarousel", [n, r]);
                r.testPreload();
                r.config();
                r.initRotate();
                r.triggerNavs()
            };
            r.testPreload = function() {
                if (e(r).find("img").length > 0) {
                    var t = e(r).find("img").length, i = 1;
                    e(r).find("img").each(function() {
                        r.preloadImage(this, i, t);
                        i++
                    })
                } else {
                    e(r).trigger("loadedCarousel", [n, r])
                }
            };
            r.preloadImage = function(t, i, s) {
                var o = new Image, u = {};
                u.src = e(t).attr("src") !== undefined ? t.src : "";
                u.alt = e(t).attr("alt") !== undefined ? t.alt : "";
                e(o).attr(u);
                e(o).on("load", function() {
                    if (i === 1)
                        e(r).trigger("loadingImagesCarousel", [n, r]);
                    if (i === s)
                        e(r).trigger("loadedImagesCarousel", [n, r])
                })
            };
            r.config = function() {
                n.itemWidth = Math.floor((e(r).outerWidth() - n.itemMargin * (n.visibleDefault - 1)) / n.visibleDefault);
                if (n.itemWidth <= n.itemMinWidth) {
                    n.visible = Math.floor((e(r).outerWidth() - n.itemMargin * (n.visible - 1)) / n.itemMinWidth) === 1 ? Math.floor(e(r).outerWidth() / n.itemMinWidth) : Math.floor((e(r).outerWidth() - n.itemMargin) / n.itemMinWidth);
                    n.visible = n.visible < 1 ? 1 : n.visible;
                    n.itemWidth = n.visible === 1 ? Math.floor(e(r).outerWidth()) : Math.floor((e(r).outerWidth() - n.itemMargin * (n.visible - 1)) / n.visible)
                } else {
                    n.visible = n.visibleDefault
                }
                if (n.carousel) {
                    r.wrapWidth = Math.floor((n.itemWidth + n.itemMargin) * n.total);
                    r.wrapMargin = r.wrapMarginDefault = n.infinite && n.visible < n.total ? parseInt((n.itemWidth + n.itemMargin) * -1, 10) : 0;
                    if (n.infinite && n.visible < n.total && e(r).find(".crsl-item." + n.itemClassActive).index() === 0) {
                        e(r).find(".crsl-item:first-child").before(e(".crsl-item:last-child", r));
                        r.wrapMargin = r.wrapMarginDefault = parseInt((n.itemWidth + n.itemMargin) * -1, 10)
                    }
                    e(r).find(".crsl-wrap").css({width: r.wrapWidth + "px",marginLeft: r.wrapMargin})
                } else {
                    r.wrapWidth = e(r).outerWidth();
                    e(r).find(".crsl-wrap").css({width: r.wrapWidth + n.itemMargin + "px"});
                    e("#" + n.navigation).hide()
                }
                e(r).find(".crsl-item").css({width: n.itemWidth + "px",marginRight: n.itemMargin + "px"});
                r.equalHeights();
                if (n.carousel) {
                    if (n.visible >= n.total) {
                        n.autoRotate = false;
                        e("#" + n.navigation).hide()
                    } else {
                        e("#" + n.navigation).show()
                    }
                }
            };
            r.equalHeights = function() {
                if (n.itemEqualHeight !== false) {
                    var t = 0;
                    e(r).find(".crsl-item").each(function() {
                        e(this).css({height: "auto"});
                        if (e(this).outerHeight() > t) {
                            t = e(this).outerHeight()
                        }
                    });
                    e(r).find(".crsl-item").css({height: t + "px"})
                }
                return true
            };
            r.initRotate = function() {
                if (n.autoRotate !== false) {
                    r.rotateTime = window.setInterval(function() {
                        r.rotate()
                    }, n.autoRotate)
                }
            };
            r.triggerNavs = function() {
                e("#" + n.navigation).delegate(".previous, .next", "click", function(t) {
                    t.preventDefault();
                    r.prepareExecute();
                    if (e(this).hasClass("previous") && r.testPrevious(r.itemActive)) {
                        r.previous()
                    } else if (e(this).hasClass("next") && r.testNext()) {
                        r.next()
                    } else {
                        return
                    }
                })
            };
            r.prepareExecute = function() {
                if (n.autoRotate) {
                    clearInterval(r.rotateTime)
                }
                r.preventAnimateEvent();
                r.itemActive = e(r).find(".crsl-item." + n.itemClassActive);
                return true
            };
            r.preventAnimateEvent = function() {
                if (e(r).find(".crsl-wrap:animated").length > 0) {
                    return false
                }
            };
            r.rotate = function() {
                r.preventAnimateEvent();
                r.itemActive = e(r).find(".crsl-item." + n.itemClassActive);
                r.next();
                return true
            };
            r.testPrevious = function(t) {
                return e(".crsl-wrap", r).find(".crsl-item").index(t) > 0
            };
            r.testNext = function() {
                return !n.infinite && r.wrapWidth >= (n.itemWidth + n.itemMargin) * (n.visible + 1) - r.wrapMargin || n.infinite
            };
            r.previous = function() {
                r.wrapMargin = n.infinite ? r.wrapMarginDefault + e(r.itemActive).outerWidth(true) : r.wrapMargin + e(r.itemActive).outerWidth(true);
                var t = e(r.itemActive).index();
                var i = e(r.itemActive).prev(".crsl-item");
                var s = "previous";
                e(r).trigger("beginCarousel", [n, r, s]);
                e(r).find(".crsl-wrap").animate({marginLeft: r.wrapMargin + "px"}, n.speed, function() {
                    e(r.itemActive).removeClass(n.itemClassActive);
                    e(i).addClass(n.itemClassActive);
                    if (n.infinite) {
                        e(this).css({marginLeft: r.wrapMarginDefault}).find(".crsl-item:first-child").before(e(".crsl-item:last-child", r))
                    } else {
                        if (r.testPrevious(i) === false)
                            e("#" + n.navigation).find(".previous").addClass("previous-inactive");
                        if (r.testNext())
                            e("#" + n.navigation).find(".next").removeClass("next-inactive")
                    }
                    e(this).trigger("endCarousel", [n, r, s])
                })
            };
            r.next = function() {
                r.wrapMargin = n.infinite ? r.wrapMarginDefault - e(r.itemActive).outerWidth(true) : r.wrapMargin - e(r.itemActive).outerWidth(true);
                var t = e(r.itemActive).index();
                var i = e(r.itemActive).next(".crsl-item");
                var s = "next";
                e(r).trigger("beginCarousel", [n, r, s]);
                e(r).find(".crsl-wrap").animate({marginLeft: r.wrapMargin + "px"}, n.speed, function() {
                    e(r.itemActive).removeClass(n.itemClassActive);
                    e(i).addClass(n.itemClassActive);
                    if (n.infinite) {
                        e(this).css({marginLeft: r.wrapMarginDefault}).find(".crsl-item:last-child").after(e(".crsl-item:first-child", r))
                    } else {
                        if (r.testPrevious(i))
                            e("#" + n.navigation).find(".previous").removeClass("previous-inactive");
                        if (r.testNext() === false)
                            e("#" + n.navigation).find(".next").addClass("next-inactive")
                    }
                    e(this).trigger("endCarousel", [n, r, s])
                })
            };
            var i = false, s;
            e(window).on("mouseleave", function(t) {
                if (t.target)
                    s = t.target;
                else if (t.srcElement)
                    s = t.srcElement;
                if (e(r).attr("id") && e(s).parents(".crsl-items").attr("id") === e(r).attr("id") || e(s).parents(".crsl-items").data("navigation") === e(r).data("navigation")) {
                    i = true
                } else {
                    i = false
                }
                return false
            });
            e(window).on("keydown", function(e) {
                if (i === true) {
                    if (e.keyCode === 37) {
                        r.prepareExecute();
                        r.previous()
                    } else if (e.keyCode === 39) {
                        r.prepareExecute();
                        r.next()
                    }
                }
                return
            });
            if (n.isTouch) {
                e(r).on("touchstart", function(t) {
                    e(r).addClass("touching");
                    n.startCoords = t.originalEvent.targetTouches[0];
                    n.endCoords = t.originalEvent.targetTouches[0];
                    e(".touching").on("touchmove", function(e) {
                        n.endCoords = e.originalEvent.targetTouches[0];
                        if (Math.abs(parseInt(n.endCoords.pageX - n.startCoords.pageX, 10)) > Math.abs(parseInt(n.endCoords.pageY - n.startCoords.pageY, 10))) {
                            e.preventDefault();
                            e.stopPropagation()
                        }
                    })
                }).on("touchend", function(t) {
                    t.preventDefault();
                    t.stopPropagation();
                    n.swipeDistance = n.endCoords.pageX - n.startCoords.pageX;
                    if (n.swipeDistance >= n.swipeMinDistance) {
                        r.previous()
                    } else if (n.swipeDistance <= -n.swipeMinDistance) {
                        r.next()
                    }
                    e(".touching").off("touchmove").removeClass("touching")
                })
            }
            e(r).on("loadedCarousel loadedImagesCarousel", function() {
                r.equalHeights()
            });
            e(window).on("carouselResizeEnd", function() {
                if (n.itemWidth !== e(r).outerWidth())
                    r.config()
            });
            e(window).ready(function() {
                e(r).trigger("prepareCarousel", [n, r]);
                r.init();
                e(window).on("resize", function() {
                    if (this.carouselResizeTo)
                        clearTimeout(this.carouselResizeTo);
                    this.carouselResizeTo = setTimeout(function() {
                        e(this).trigger("carouselResizeEnd")
                    }, 10)
                })
            });
            e(window).load(function() {
                r.testPreload();
                r.config()
            })
        })
    }
})(jQuery)

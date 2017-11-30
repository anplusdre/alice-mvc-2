$(document).ready(function () {

    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
    $('ul.tabs').each(function () {
        // For each set of tabs, we want to keep track of
        // which tab is active and its associated content
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
        $active.addClass('selectedTab');

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function (e) {
            // Make the old tab inactive.
            $active.removeClass('selectedTab');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            // Make the tab active.
            $active.addClass('selectedTab');
            $content.show();

            // Prevent the anchor's default click action
            e.preventDefault();
        });
    });

    $('img').bind('contextmenu', function (e) {
        return false;
    });

    $('.back').click(function (e) {
        e.preventDefault();
        window.history.back();
        // window.history.go(-1);
        // history.back();
        // history.go(-1);
    });

    var navSide = $('.sub-acc');
    $('.navigation-side > ul > li > a').click(function () {
        navSide.slideUp('normal');
        if ($(this).next().is(':hidden') == true) {
            $(this).next().slideDown('normal');
        }
    });
    navSide.hide();


    $('.bookBtn').click(function () {
        $('.modal-wrapper').toggleClass('open');
        $('.page-wrapper').toggleClass('blur');
        return false;
    });

    $('.btn-close').click(function () {
        $('.modal-wrapper').removeClass('open');
        $('.page-wrapper').removeClass('blur');
        return false;
    });


    var $items = $('.card');
    var $btns = $('.nav-unsorted li a').click(function (e) {
        if (this.id == 'all') {
            $items.show().fadeIn(450);
        } else {
            var $el = $('.' + this.id).show().fadeIn(450);
            $items.not($el).hide().fadeOut(450);
        }
        $btns.removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });


}); //END JQUERY SCRIPT







///////////////////// JS ///////////////////
//////////// DATE PICKER////////////////////

! function (e, t) {
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    "object" === ("undefined" == typeof exports ? "undefined" : n(exports)) ? module.exports = t(): "function" == typeof define && define.amd ? define(function () {
        return t()
    }) : e.datepicker = t()
}(this, function () {
    "use strict";

    function e(e, o) {
        var a = e.split ? document.querySelector(e) : e;
        o = t(o || n(), a, e);
        var s = a.parentElement,
            i = document.createElement("div"),
            c = o,
            u = c.startDate,
            d = c.dateSelected,
            f = a === document.body || a === document.querySelector("html"),
            p = {
                el: a,
                parent: s,
                nonInput: "INPUT" !== a.nodeName,
                noPosition: f,
                position: !f && o.position,
                startDate: u,
                dateSelected: d,
                minDate: o.minDate,
                maxDate: o.maxDate,
                noWeekends: !!o.noWeekends,
                calendar: i,
                currentMonth: (u || d).getMonth(),
                currentMonthName: (o.months || g)[(u || d).getMonth()],
                currentYear: (u || d).getFullYear(),
                setDate: h,
                remove: v,
                onSelect: o.onSelect,
                onShow: o.onShow,
                onHide: o.onHide,
                onMonthChange: o.onMonthChange,
                formatter: o.formatter,
                months: o.months || g,
                days: o.days || S,
                overlayPlaceholder: o.overlayPlaceholder || "4-digit year",
                overlayButton: o.overlayButton || "Submit",
                disableMobile: o.disableMobile,
                isMobile: "ontouchstart" in window
            };
        return d && l(a, p), i.classList.add("qs-datepicker"), i.classList.add("qs-hidden"), w.push(a), r(u || d, p), b.forEach(function (e) {
            window.addEventListener(e, q.bind(p))
        }), "static" === getComputedStyle(s).position && (s.style.position = "relative"), s.appendChild(i), p
    }

    function t(e, t) {
        if (w.includes(t)) throw new Error("A datepicker already exists on that element.");
        var n = e.position,
            r = e.maxDate,
            a = e.minDate,
            s = e.dateSelected,
            i = e.formatter,
            c = e.customMonths,
            l = e.customDays,
            u = e.overlayPlaceholder,
            d = e.overlayButton;
        if (n) {
            if (!["tr", "tl", "br", "bl"].some(function (e) {
                    return n === e
                })) throw new Error('"options.position" must be one of the following: tl, tr, bl, or br.');
            e.position = o(n)
        } else e.position = o("bl");
        if (["startDate", "dateSelected", "minDate", "maxDate"].forEach(function (t) {
                if (e[t]) {
                    if (!f(e[t]) || isNaN(+e[t])) throw new TypeError('"options.' + t + '" needs to be a valid JavaScript Date object.');
                    e[t] = p(e[t])
                }
            }), e.startDate = e.startDate || e.dateSelected || p(new Date), e.formatter = "function" == typeof i ? i : null, r < a) throw new Error('"maxDate" in options is less than "minDate".');
        if (s) {
            if (a > s) throw new Error('"dateSelected" in options is less than "minDate".');
            if (r < s) throw new Error('"dateSelected" in options is greater than "maxDate".')
        }
        return ["onSelect", "onShow", "onHide", "onMonthChange"].forEach(function (t) {
            e[t] = "function" == typeof e[t] && e[t]
        }), [c, l].forEach(function (t, n) {
            if (t) {
                var o = ['"customMonths" must be an array with 12 strings.', '"customDays" must be an array with 7 strings.'];
                if (["[object Array]" !== {}.toString.call(t), t.length !== (n ? 7 : 12), t.some(function (e) {
                        return !e.split
                    })].some(function (e) {
                        return e
                    })) throw new Error(o[n]);
                e[n ? "days" : "months"] = t
            }
        }), [u, d].forEach(function (t, n) {
            t && t.split && (n ? e.overlayButton = t : e.overlayPlaceholder = t)
        }), e
    }

    function n() {
        return {
            startDate: p(new Date),
            position: "bl"
        }
    }

    function o(e) {
        var t = {};
        return t[D[e[0]]] = 1, t[D[e[1]]] = 1, t
    }

    function r(e, t) {
        var n = a(e, t),
            o = s(e, t),
            r = i(t);
        t.calendar.innerHTML = n + o + r
    }

    function a(e, t) {
        return '\n      <div class="qs-controls">\n        <div class="qs-arrow qs-left"></div>\n        <div class="qs-month-year">\n          <span class="qs-month">' + t.months[e.getMonth()] + '</span>\n          <span class="qs-year">' + e.getFullYear() + '</span>\n        </div>\n        <div class="qs-arrow qs-right"></div>\n      </div>\n    '
    }

    function s(e, t) {
        var n = t.minDate,
            o = t.maxDate,
            r = t.dateSelected,
            a = t.currentYear,
            s = t.currentMonth,
            i = t.noWeekends,
            c = t.days,
            l = new Date,
            u = l.toJSON().slice(0, 7) === e.toJSON().slice(0, 7),
            d = new Date(new Date(e).setDate(1)),
            h = d.getDay();
        d.setMonth(d.getMonth() + 1), d.setDate(0);
        var f = d.getDate(),
            p = [],
            v = 7 * ((h + f) / 7 | 0);
        v += (h + f) % 7 ? 7 : 0;
        for (var y = 1; y <= v; y++) {
            var m = c[(y - 1) % 7],
                q = y - h,
                w = "",
                b = '<span class="qs-num">' + q + "</span>",
                S = new Date(a, s, q),
                g = q < 1 || q > f;
            if (g) w = "qs-empty", b = "";
            else {
                var D = n && S < n || o && S > o,
                    M = c[6],
                    E = c[0],
                    L = m === M || m === E,
                    N = u && !D && q === l.getDate();
                D = D || i && L, w = D ? "qs-disabled" : N ? "qs-current" : ""
            } + S != +r || g || (w += " qs-active"), p.push('<div class="qs-square qs-num ' + m + " " + w + '">' + b + "</div>")
        }
        var x = c.map(function (e) {
            return '<div class="qs-square qs-day">' + e + "</div>"
        }).concat(p);
        if (x.length % 7 != 0) {
            throw new Error("Calendar not constructed properly. The # of squares should be a multiple of 7.")
        }
        return x.unshift('<div class="qs-squares">'), x.push("</div>"), x.join("")
    }

    function i(e) {
        return '\n      <div class="qs-overlay qs-hidden">\n        <div class="qs-close">&#10005;</div>\n        <input type="number" class="qs-overlay-year" placeholder="' + e.overlayPlaceholder + '" />\n        <div class="qs-submit qs-disabled">' + e.overlayButton + "</div>\n      </div>\n    "
    }

    function c(e, t) {
        var n = t.currentMonth,
            o = t.currentYear,
            r = t.calendar,
            a = t.el,
            s = t.onSelect,
            i = r.querySelector(".qs-active"),
            c = e.textContent;
        t.dateSelected = new Date(o, n, c), i && i.classList.remove("qs-active"), e.classList.add("qs-active"), l(a, t), y(t), s && s(t)
    }

    function l(e, t) {
        if (!t.nonInput) return t.formatter ? t.formatter(e, t.dateSelected) : void(e.value = t.dateSelected.toDateString())
    }

    function u(e, t, n) {
        n ? t.currentYear = n : (t.currentMonth += e.contains("qs-right") ? 1 : -1, 12 === t.currentMonth ? (t.currentMonth = 0, t.currentYear++) : -1 === t.currentMonth && (t.currentMonth = 11, t.currentYear--)), r(new Date(t.currentYear, t.currentMonth, 1), t), t.currentMonthName = t.months[t.currentMonth], t.onMonthChange && n && t.onMonthChange(t)
    }

    function d(e) {
        if (!e.noPosition) {
            var t = e.el,
                n = e.calendar,
                o = e.position,
                r = e.parent,
                a = o.top,
                s = o.right,
                i = r.getBoundingClientRect(),
                c = t.getBoundingClientRect(),
                l = n.getBoundingClientRect(),
                u = c.top - i.top + r.scrollTop,
                d = "\n      top:" + (u - (a ? l.height : -1 * c.height)) + "px;\n      left:" + (c.left - i.left + (s ? c.width - l.width : 0)) + "px;\n    ";
            n.setAttribute("style", d)
        }
    }

    function h(e) {
        if (!f(e)) throw new TypeError("`setDate` needs a JavaScript Date object.");
        e = p(e), this.currentYear = e.getFullYear(), this.currentMonth = e.getMonth(), this.currentMonthName = this.months[e.getMonth()], this.dateSelected = e, l(this.el, this), r(e, this)
    }

    function f(e) {
        return "[object Date]" === {}.toString.call(e)
    }

    function p(e) {
        return new Date(e.toDateString())
    }

    function v() {
        var e = this.calendar,
            t = this.parent,
            n = this.el;
        b.forEach(function (e) {
            window.removeEventListener(e, q)
        }), e.remove(), e.hasOwnProperty("parentStyle") && (t.style.position = ""), w = w.filter(function (e) {
            return e !== n
        })
    }

    function y(e) {
        e.calendar.classList.add("qs-hidden"), e.onHide && e.onHide(e)
    }

    function m(e) {
        e.calendar.classList.remove("qs-hidden"), d(e), e.onShow && e.onShow(e)
    }

    function q(e) {
        function t(t) {
            var r = t.calendar,
                a = l.classList,
                s = r.querySelector(".qs-month-year"),
                d = a.contains("qs-close");
            if (a.contains("qs-num")) {
                var h = "SPAN" === l.nodeName ? l.parentNode : l;
                !["qs-disabled", "qs-active", "qs-empty"].some(function (e) {
                    return h.classList.contains(e)
                }) && c(h, t)
            } else if (a.contains("qs-arrow")) u(a, t);
            else if (i.includes(s) || d) n(r, d, t);
            else if (l.classList.contains("qs-submit")) {
                var f = r.querySelector(".qs-overlay-year");
                o(e, f, t)
            }
        }

        function n(e, t, n) {
            [".qs-overlay", ".qs-controls", ".qs-squares"].forEach(function (t, n) {
                e.querySelector(t).classList.toggle(n ? "qs-blur" : "qs-hidden")
            });
            var o = e.querySelector(".qs-overlay-year");
            t ? o.value = "" : o.focus()
        }

        function o(e, t, n) {
            var o = isNaN((new Date).setFullYear(t.value || void 0));
            if (13 === e.which || "click" === e.type) {
                if (o || t.classList.contains("qs-disabled")) return;
                u(null, n, t.value)
            } else {
                n.calendar.querySelector(".qs-submit").classList[o ? "add" : "remove"]("qs-disabled")
            }
        }
        if (!this.isMobile || !this.disableMobile) {
            if (!e.path) {
                for (var r = e.target, a = []; r !== document;) a.push(r), r = r.parentNode;
                e.path = a
            }
            var s = e.type,
                i = e.path,
                l = e.target,
                d = this.calendar,
                h = this.el,
                f = d.classList,
                p = f.contains("qs-hidden"),
                v = i.includes(d);
            if ("keydown" === s) {
                var q = d.querySelector(".qs-overlay");
                if (13 === e.which && !q.classList.contains("qs-hidden")) return e.stopPropagation(), o(e, l, this);
                if (27 === e.which) return n(d, !0, this);
                if (9 !== e.which) return
            }
            if ("focusin" === s) return l === h && m(this);
            this.noPosition ? v ? t(this) : p ? m(this) : y(this) : p ? l === h && m(this) : "click" === s && v ? t(this) : "input" === s ? o(e, l, this) : l !== h && y(this)
        }
    }
    Array.prototype.includes || (Array.prototype.includes = function (e) {
        var t = !1;
        return this.forEach(function (n) {
            n === e && (t = !0)
        }), t
    });
    var w = [],
        b = ["click", "focusin", "keydown", "input"],
        S = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        g = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        D = {
            t: "top",
            r: "right",
            b: "bottom",
            l: "left"
        };
    return e
});

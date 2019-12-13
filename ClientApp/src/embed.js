!function t(r, e, n) {
    var o = "function" == typeof hypothesisRequire && hypothesisRequire;
    function s(i, a) {
        if (!e[i]) {
            if (!r[i]) {
                var c = "function" == typeof hypothesisRequire && hypothesisRequire;
                if (!a && c)
                    return c(i, !0);
                if (o)
                    return o(i, !0);
                var u = new Error("Cannot find module '" + i + "'");
                throw u.code = "MODULE_NOT_FOUND",
                    u
            }
            var l = e[i] = {
                exports: {}
            };
            r[i][0].call(l.exports, (function(t) {
                    var e = r[i][1][t];
                    return s(e || t)
                }
            ), l, l.exports, t, r, e, n)
        }
        return e[i].exports
    }
    for (var i = 0; i < n.length; i++)
        s(n[i]);
    return s
}({
    1: [function(t, r, e) {
        "use strict";
        function n(t) {
            return function(t) {
                if (Array.isArray(t)) {
                    for (var r = 0, e = new Array(t.length); r < t.length; r++)
                        e[r] = t[r];
                    return e
                }
            }(t) || function(t) {
                if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
                    return Array.from(t)
            }(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        var o = t("https://hypothes.is/../shared/polyfills").requiredPolyfillSets;
        function s(t, r, e) {
            e.forEach((function(e) {
                    var n = r.assetRoot + "build/" + r.manifest[e];
                    n.match(/\.css/) ? function(t, r) {
                        var e = t.createElement("link");
                        e.rel = "stylesheet",
                            e.type = "text/css",
                            e.href = r,
                            t.head.appendChild(e)
                    }(t, n) : function(t, r) {
                        var e = t.createElement("script");
                        e.type = "text/javascript",
                            e.src = r,
                            e.async = !1,
                            t.head.appendChild(e)
                    }(t, n)
                }
            ))
        }
        function i(t) {
            return o(t).map((function(t) {
                    return "scripts/polyfills-".concat(t, ".bundle.js")
                }
            ))
        }
        r.exports = function(t, r) {
            t.querySelector("hypothesis-app") ? function(t, r) {
                var e = i(["es2015", "es2016", "es2017", "string.prototype.normalize", "fetch", "url"]);
                s(t, r, [].concat(n(e), ["scripts/sentry.bundle.js", "scripts/angular.bundle.js", "scripts/katex.bundle.js", "scripts/showdown.bundle.js", "scripts/sidebar.bundle.js", "styles/angular-csp.css", "styles/angular-toastr.css", "styles/icomoon.css", "styles/katex.min.css", "styles/sidebar.css"]))
            }(t, r) : function(t, r) {
                if (!t.querySelector('link[type="application/annotator+html"]')) {
                    var e = t.createElement("link");
                    e.rel = "sidebar",
                        e.href = r.sidebarAppUrl,
                        e.type = "application/annotator+html",
                        t.head.appendChild(e);
                    var o = t.createElement("link");
                    o.rel = "hypothesis-client",
                        o.href = r.assetRoot + "build/boot.js",
                        o.type = "application/annotator+javascript",
                        t.head.appendChild(o);
                    var a = i(["document.evaluate", "es2015", "es2016", "es2017", "url"]);
                    s(t, r, [].concat(n(a), ["scripts/jquery.bundle.js", "scripts/annotator.bundle.js", "styles/icomoon.css", "styles/annotator.css", "styles/pdfjs-overrides.css"]))
                }
            }(t, r)
        }
    }
        , {
            "../shared/polyfills": 4
        }],
    2: [function(t, r, e) {
        "use strict";
        var n = t("./boot")
            , o = t("../shared/settings").jsonConfigsFrom(document)
            , s = t("./url-template");
        n(document, {
            assetRoot: s(o.assetRoot || "https://cdn.hypothes.is/hypothesis/1.251.0/"),
            manifest: {
                "fonts/KaTeX_AMS-Regular.woff": "fonts/KaTeX_AMS-Regular.woff?d695b8",
                "fonts/KaTeX_Caligraphic-Bold.woff": "fonts/KaTeX_Caligraphic-Bold.woff?011f63",
                "fonts/KaTeX_Caligraphic-Regular.woff": "fonts/KaTeX_Caligraphic-Regular.woff?43014c",
                "fonts/KaTeX_Fraktur-Bold.woff": "fonts/KaTeX_Fraktur-Bold.woff?555c68",
                "fonts/KaTeX_Fraktur-Regular.woff": "fonts/KaTeX_Fraktur-Regular.woff?2b146c",
                "fonts/KaTeX_Main-Bold.woff": "fonts/KaTeX_Main-Bold.woff?516337",
                "fonts/KaTeX_Main-BoldItalic.woff": "fonts/KaTeX_Main-BoldItalic.woff?2561b4",
                "fonts/KaTeX_Main-Italic.woff": "fonts/KaTeX_Main-Italic.woff?abcdc7",
                "fonts/KaTeX_Main-Regular.woff": "fonts/KaTeX_Main-Regular.woff?6b04cf",
                "fonts/KaTeX_Math-BoldItalic.woff": "fonts/KaTeX_Math-BoldItalic.woff?3c49c7",
                "fonts/KaTeX_Math-Italic.woff": "fonts/KaTeX_Math-Italic.woff?724c26",
                "fonts/KaTeX_SansSerif-Bold.woff": "fonts/KaTeX_SansSerif-Bold.woff?dfa790",
                "fonts/KaTeX_SansSerif-Italic.woff": "fonts/KaTeX_SansSerif-Italic.woff?dafff6",
                "fonts/KaTeX_SansSerif-Regular.woff": "fonts/KaTeX_SansSerif-Regular.woff?9c9898",
                "fonts/KaTeX_Script-Regular.woff": "fonts/KaTeX_Script-Regular.woff?923fb5",
                "fonts/KaTeX_Size1-Regular.woff": "fonts/KaTeX_Size1-Regular.woff?ac3f9a",
                "fonts/KaTeX_Size2-Regular.woff": "fonts/KaTeX_Size2-Regular.woff?106cfd",
                "fonts/KaTeX_Size3-Regular.woff": "fonts/KaTeX_Size3-Regular.woff?e61a9f",
                "fonts/KaTeX_Size4-Regular.woff": "fonts/KaTeX_Size4-Regular.woff?b7132c",
                "fonts/KaTeX_Typewriter-Regular.woff": "fonts/KaTeX_Typewriter-Regular.woff?9b8bfe",
                "fonts/h.woff": "fonts/h.woff?95b92e",
                "styles/angular-csp.css": "styles/angular-csp.css?52bd9d",
                "styles/angular-toastr.css": "styles/angular-toastr.css?fc6db4",
                "styles/annotator.css": "styles/annotator.css?0d6a5e",
                "styles/icomoon.css": "styles/icomoon.css?036138",
                "styles/katex.min.css": "styles/katex.min.css?aa6b16",
                "styles/pdfjs-overrides.css": "styles/pdfjs-overrides.css?cd20bf",
                "styles/sidebar.css": "styles/sidebar.css?7c7614",
                "scripts/angular.bundle.js": "scripts/angular.bundle.js?63d101",
                "scripts/annotator.bundle.js": "scripts/annotator.bundle.js?02d5f7",
                "scripts/boot.bundle.js": "scripts/boot.bundle.js?688c56",
                "scripts/jquery.bundle.js": "scripts/jquery.bundle.js?3746d4",
                "scripts/katex.bundle.js": "scripts/katex.bundle.js?a7c5de",
                "scripts/polyfills-document.evaluate.bundle.js": "scripts/polyfills-document.evaluate.bundle.js?c6ea86",
                "scripts/polyfills-es2015.bundle.js": "scripts/polyfills-es2015.bundle.js?a9c0c0",
                "scripts/polyfills-es2016.bundle.js": "scripts/polyfills-es2016.bundle.js?ce3aee",
                "scripts/polyfills-es2017.bundle.js": "scripts/polyfills-es2017.bundle.js?60ceb4",
                "scripts/polyfills-fetch.bundle.js": "scripts/polyfills-fetch.bundle.js?63525a",
                "scripts/polyfills-string.prototype.normalize.bundle.js": "scripts/polyfills-string.prototype.normalize.bundle.js?6a154c",
                "scripts/polyfills-url.bundle.js": "scripts/polyfills-url.bundle.js?91fd83",
                "scripts/sentry.bundle.js": "scripts/sentry.bundle.js?37c09e",
                "scripts/showdown.bundle.js": "scripts/showdown.bundle.js?72c2de",
                "scripts/sidebar.bundle.js": "scripts/sidebar.bundle.js?3026b5"
            },
            sidebarAppUrl: s(o.sidebarAppUrl || "https://hypothes.is/app.html")
        })
    }
        , {
            "../shared/settings": 5,
            "./boot": 1,
            "./url-template": 3
        }],
    3: [function(t, r, e) {
        "use strict";
        r.exports = function(t) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
            if (-1 === t.indexOf("{"))
                return t;
            var e = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
                try {
                    var r = t.currentScript;
                    if (!r) {
                        var e = t.querySelectorAll("script");
                        r = e[e.length - 1]
                    }
                    return function(t) {
                        var r = t.match(/(https?):\/\/([^:/]+)/);
                        return r ? {
                            protocol: r[1],
                            hostname: r[2]
                        } : null
                    }(r.src)
                } catch (t) {
                    return null
                }
            }(r);
            return e && (t = (t = t.replace("{current_host}", e.hostname)).replace("{current_scheme}", e.protocol)),
                t
        }
    }
        , {}],
    4: [function(t, r, e) {
        "use strict";
        function n(t) {
            return function(t) {
                if (Array.isArray(t)) {
                    for (var r = 0, e = new Array(t.length); r < t.length; r++)
                        e[r] = t[r];
                    return e
                }
            }(t) || s(t) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        function o(t) {
            return function(t) {
                if (Array.isArray(t))
                    return t
            }(t) || s(t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        function s(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
                return Array.from(t)
        }
        function i(t) {
            for (var r = arguments.length, e = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
                e[n - 1] = arguments[n];
            return e.every((function(r) {
                    return "function" == typeof t[r]
                }
            ))
        }
        var a = {
            es2015: function() {
                if ("function" != typeof Promise || "function" != typeof Map || "function" != typeof Set || "function" != typeof Symbol)
                    return !0;
                for (var t = 0, r = [[Array, "from"], [Array.prototype, "fill", "find", "findIndex"], [Object, "assign"], [String.prototype, "startsWith", "endsWith"]]; t < r.length; t++) {
                    var e = o(r[t])
                        , s = e[0]
                        , a = e.slice(1);
                    if (!i.apply(void 0, [s].concat(n(a))))
                        return !0
                }
                return !1
            },
            es2016: function() {
                return !i(Array.prototype, "includes")
            },
            es2017: function() {
                return !i(Object, "entries", "values")
            },
            url: function() {
                try {
                    if ("hypothes.is" !== new window.URL("https://hypothes.is").hostname)
                        throw new Error("Broken URL constructor");
                    return !1
                } catch (t) {
                    return !0
                }
            },
            "document.evaluate": function() {
                return "function" != typeof document.evaluate
            },
            "string.prototype.normalize": function() {
                return !i(String.prototype, "normalize")
            },
            fetch: function() {
                return "function" != typeof window.fetch
            }
        };
        r.exports = {
            requiredPolyfillSets: function(t) {
                return t.filter((function(t) {
                        var r = a[t];
                        if (!r)
                            throw new Error('Unknown polyfill set "'.concat(t, '"'));
                        return r()
                    }
                ))
            }
        }
    }
        , {}],
    5: [function(t, r, e) {
        "use strict";
        function n(t, r) {
            for (var e in r)
                r.hasOwnProperty(e) && (t[e] = r[e]);
            return t
        }
        r.exports = {
            jsonConfigsFrom: function(t) {
                for (var r = {}, e = t.querySelectorAll("script.js-hypothesis-config"), o = 0; o < e.length; o++) {
                    var s = void 0;
                    try {
                        s = JSON.parse(e[o].textContent)
                    } catch (t) {
                        console.warn("Could not parse settings from js-hypothesis-config tags", t),
                            s = {}
                    }
                    n(r, s)
                }
                return r
            }
        }
    }
        , {}]
}, {}, [2]);
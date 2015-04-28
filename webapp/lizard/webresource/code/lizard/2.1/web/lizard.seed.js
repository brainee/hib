/*
RequireJS 2.1.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
Available via the MIT or new BSD license.
see: http://github.com/jrburke/requirejs for details
*/
var requirejs, require, define;
(function (aa) {
    function I(b) { return "[object Function]" === L.call(b) } function J(b) { return "[object Array]" === L.call(b) } function y(b, c) { if (b) { var d; for (d = 0; d < b.length && (!b[d] || !c(b[d], d, b)); d += 1); } } function M(b, c) { if (b) { var d; for (d = b.length - 1; -1 < d && (!b[d] || !c(b[d], d, b)); d -= 1); } } function s(b, c) { return ga.call(b, c) } function m(b, c) { return s(b, c) && b[c] } function G(b, c) { for (var d in b) if (s(b, d) && c(b[d], d)) break } function R(b, c, d, m) {
        c && G(c, function (c, j) {
            if (d || !s(b, j)) m && "string" !== typeof c ? (b[j] || (b[j] = {}), R(b[j],
c, d, m)) : b[j] = c
        }); return b
    } function u(b, c) { return function () { return c.apply(b, arguments) } } function ba(b) { if (!b) return b; var c = aa; y(b.split("."), function (b) { c = c[b] }); return c } function B(b, c, d, m) { c = Error(c + "\nhttp://requirejs.org/docs/errors.html#" + b); c.requireType = b; c.requireModules = m; d && (c.originalError = d); return c } function ha(b) {
        function c(a, f, b) {
            var e, n, c, g, d, S, i, h = f && f.split("/"); e = h; var j = k.map, l = j && j["*"]; if (a && "." === a.charAt(0)) if (f) {
                e = m(k.pkgs, f) ? h = [f] : h.slice(0, h.length - 1); f = a = e.concat(a.split("/"));
                for (e = 0; f[e]; e += 1) if (n = f[e], "." === n) f.splice(e, 1), e -= 1; else if (".." === n) if (1 === e && (".." === f[2] || ".." === f[0])) break; else 0 < e && (f.splice(e - 1, 2), e -= 2); e = m(k.pkgs, f = a[0]); a = a.join("/"); e && a === f + "/" + e.main && (a = f)
            } else 0 === a.indexOf("./") && (a = a.substring(2)); if (b && j && (h || l)) {
                f = a.split("/"); for (e = f.length; 0 < e; e -= 1) { c = f.slice(0, e).join("/"); if (h) for (n = h.length; 0 < n; n -= 1) if (b = m(j, h.slice(0, n).join("/"))) if (b = m(b, c)) { g = b; d = e; break } if (g) break; !S && (l && m(l, c)) && (S = m(l, c), i = e) } !g && S && (g = S, d = i); g && (f.splice(0, d,
g), a = f.join("/"))
            } return a
        } function d(a) { A && y(document.getElementsByTagName("script"), function (f) { if (f.getAttribute("data-requiremodule") === a && f.getAttribute("data-requirecontext") === i.contextName) return f.parentNode.removeChild(f), !0 }) } function z(a) { var f = m(k.paths, a); if (f && J(f) && 1 < f.length) return d(a), f.shift(), i.require.undef(a), i.require([a]), !0 } function h(a) { var f, b = a ? a.indexOf("!") : -1; -1 < b && (f = a.substring(0, b), a = a.substring(b + 1, a.length)); return [f, a] } function j(a, f, b, e) {
            var n, C, g = null, d = f ? f.name :
null, j = a, l = !0, k = ""; a || (l = !1, a = "_@r" + (M += 1)); a = h(a); g = a[0]; a = a[1]; g && (g = c(g, d, e), C = m(q, g)); a && (g ? k = C && C.normalize ? C.normalize(a, function (a) { return c(a, d, e) }) : c(a, d, e) : (k = c(a, d, e), a = h(k), g = a[0], k = a[1], b = !0, n = i.nameToUrl(k))); b = g && !C && !b ? "_unnormalized" + (Q += 1) : ""; return { prefix: g, name: k, parentMap: f, unnormalized: !!b, url: n, originalName: j, isDefine: l, id: (g ? g + "!" + k : k) + b}
        } function r(a) { var f = a.id, b = m(p, f); b || (b = p[f] = new i.Module(a)); return b } function t(a, f, b) {
            var e = a.id, n = m(p, e); if (s(q, e) && (!n || n.defineEmitComplete)) "defined" ===
f && b(q[e]); else r(a).on(f, b)
        } function v(a, f) { var b = a.requireModules, e = !1; if (f) f(a); else if (y(b, function (f) { if (f = m(p, f)) f.error = a, f.events.error && (e = !0, f.emit("error", a)) }), !e) l.onError(a) } function w() { T.length && (ia.apply(H, [H.length - 1, 0].concat(T)), T = []) } function x(a) { delete p[a]; delete V[a] } function F(a, f, b) { var e = a.map.id; a.error ? a.emit("error", a.error) : (f[e] = !0, y(a.depMaps, function (e, c) { var g = e.id, d = m(p, g); d && (!a.depMatched[c] && !b[g]) && (m(f, g) ? (a.defineDep(c, q[g]), a.check()) : F(d, f, b)) }), b[e] = !0) }
        function D() {
            var a, f, b, e, n = (b = 1E3 * k.waitSeconds) && i.startTime + b < (new Date).getTime(), c = [], g = [], h = !1, j = !0; if (!W) {
                W = !0; G(V, function (b) { a = b.map; f = a.id; if (b.enabled && (a.isDefine || g.push(b), !b.error)) if (!b.inited && n) z(f) ? h = e = !0 : (c.push(f), d(f)); else if (!b.inited && (b.fetched && a.isDefine) && (h = !0, !a.prefix)) return j = !1 }); if (n && c.length) return b = B("timeout", "Load timeout for modules: " + c, null, c), b.contextName = i.contextName, v(b); j && y(g, function (a) { F(a, {}, {}) }); if ((!n || e) && h) if ((A || da) && !X) X = setTimeout(function () {
                    X =
0; D()
                }, 50); W = !1
            } 
        } function E(a) { s(q, a[0]) || r(j(a[0], null, !0)).init(a[1], a[2]) } function K(a) { var a = a.currentTarget || a.srcElement, b = i.onScriptLoad; a.detachEvent && !Y ? a.detachEvent("onreadystatechange", b) : a.removeEventListener("load", b, !1); b = i.onScriptError; (!a.detachEvent || Y) && a.removeEventListener("error", b, !1); return { node: a, id: a && a.getAttribute("data-requiremodule")} } function L() {
            var a; for (w(); H.length; ) {
                a = H.shift(); if (null === a[0]) return v(B("mismatch", "Mismatched anonymous define() module: " + a[a.length -
1])); E(a)
            } 
        } var W, Z, i, N, X, k = { waitSeconds: 7, baseUrl: "./", paths: {}, pkgs: {}, shim: {}, config: {} }, p = {}, V = {}, $ = {}, H = [], q = {}, U = {}, M = 1, Q = 1; N = { require: function (a) { return a.require ? a.require : a.require = i.makeRequire(a.map) }, exports: function (a) { a.usingExports = !0; if (a.map.isDefine) return a.exports ? a.exports : a.exports = q[a.map.id] = {} }, module: function (a) { return a.module ? a.module : a.module = { id: a.map.id, uri: a.map.url, config: function () { return k.config && m(k.config, a.map.id) || {} }, exports: q[a.map.id]} } }; Z = function (a) {
            this.events =
m($, a.id) || {}; this.map = a; this.shim = m(k.shim, a.id); this.depExports = []; this.depMaps = []; this.depMatched = []; this.pluginMaps = {}; this.depCount = 0
        }; Z.prototype = { init: function (a, b, c, e) { e = e || {}; if (!this.inited) { this.factory = b; if (c) this.on("error", c); else this.events.error && (c = u(this, function (a) { this.emit("error", a) })); this.depMaps = a && a.slice(0); this.errback = c; this.inited = !0; this.ignore = e.ignore; e.enabled || this.enabled ? this.enable() : this.check() } }, defineDep: function (a, b) {
            this.depMatched[a] || (this.depMatched[a] =
!0, this.depCount -= 1, this.depExports[a] = b)
        }, fetch: function () { if (!this.fetched) { this.fetched = !0; i.startTime = (new Date).getTime(); var a = this.map; if (this.shim) i.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], u(this, function () { return a.prefix ? this.callPlugin() : this.load() })); else return a.prefix ? this.callPlugin() : this.load() } }, load: function () { var a = this.map.url; U[a] || (U[a] = !0, i.load(this.map.id, a)) }, check: function () {
            if (this.enabled && !this.enabling) {
                var a, b, c = this.map.id; b = this.depExports;
                var e = this.exports, n = this.factory; if (this.inited) if (this.error) this.emit("error", this.error); else {
                    if (!this.defining) {
                        this.defining = !0; if (1 > this.depCount && !this.defined) {
                            if (I(n)) {
                                if (this.events.error) try { e = i.execCb(c, n, b, e) } catch (d) { a = d } else e = i.execCb(c, n, b, e); this.map.isDefine && ((b = this.module) && void 0 !== b.exports && b.exports !== this.exports ? e = b.exports : void 0 === e && this.usingExports && (e = this.exports)); if (a) return a.requireMap = this.map, a.requireModules = [this.map.id], a.requireType = "define", v(this.error =
a)
                            } else e = n; this.exports = e; if (this.map.isDefine && !this.ignore && (q[c] = e, l.onResourceLoad)) l.onResourceLoad(i, this.map, this.depMaps); x(c); this.defined = !0
                        } this.defining = !1; this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                    } 
                } else this.fetch()
            } 
        }, callPlugin: function () {
            var a = this.map, b = a.id, d = j(a.prefix); this.depMaps.push(d); t(d, "defined", u(this, function (e) {
                var n, d; d = this.map.name; var g = this.map.parentMap ? this.map.parentMap.name : null, h =
i.makeRequire(a.parentMap, { enableBuildCallback: !0 }); if (this.map.unnormalized) { if (e.normalize && (d = e.normalize(d, function (a) { return c(a, g, !0) }) || ""), e = j(a.prefix + "!" + d, this.map.parentMap), t(e, "defined", u(this, function (a) { this.init([], function () { return a }, null, { enabled: !0, ignore: !0 }) })), d = m(p, e.id)) { this.depMaps.push(e); if (this.events.error) d.on("error", u(this, function (a) { this.emit("error", a) })); d.enable() } } else n = u(this, function (a) { this.init([], function () { return a }, null, { enabled: !0 }) }), n.error = u(this,
function (a) { this.inited = !0; this.error = a; a.requireModules = [b]; G(p, function (a) { 0 === a.map.id.indexOf(b + "_unnormalized") && x(a.map.id) }); v(a) }), n.fromText = u(this, function (e, c) { var d = a.name, g = j(d), C = O; c && (e = c); C && (O = !1); r(g); s(k.config, b) && (k.config[d] = k.config[b]); try { l.exec(e) } catch (ca) { return v(B("fromtexteval", "fromText eval for " + b + " failed: " + ca, ca, [b])) } C && (O = !0); this.depMaps.push(g); i.completeLoad(d); h([d], n) }), e.load(a.name, h, n, k)
            })); i.enable(d, this); this.pluginMaps[d.id] = d
        }, enable: function () {
            V[this.map.id] =
this; this.enabling = this.enabled = !0; y(this.depMaps, u(this, function (a, b) { var c, e; if ("string" === typeof a) { a = j(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap); this.depMaps[b] = a; if (c = m(N, a.id)) { this.depExports[b] = c(this); return } this.depCount += 1; t(a, "defined", u(this, function (a) { this.defineDep(b, a); this.check() })); this.errback && t(a, "error", this.errback) } c = a.id; e = p[c]; !s(N, c) && (e && !e.enabled) && i.enable(a, this) })); G(this.pluginMaps, u(this, function (a) {
    var b = m(p, a.id); b && !b.enabled && i.enable(a,
this)
})); this.enabling = !1; this.check()
        }, on: function (a, b) { var c = this.events[a]; c || (c = this.events[a] = []); c.push(b) }, emit: function (a, b) { y(this.events[a], function (a) { a(b) }); "error" === a && delete this.events[a] } 
        }; i = { config: k, contextName: b, registry: p, defined: q, urlFetched: U, defQueue: H, Module: Z, makeModuleMap: j, nextTick: l.nextTick, onError: v, configure: function (a) {
            a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/"); var b = k.pkgs, c = k.shim, e = { paths: !0, config: !0, map: !0 }; G(a, function (a, b) {
                e[b] ?
"map" === b ? (k.map || (k.map = {}), R(k[b], a, !0, !0)) : R(k[b], a, !0) : k[b] = a
            }); a.shim && (G(a.shim, function (a, b) { J(a) && (a = { deps: a }); if ((a.exports || a.init) && !a.exportsFn) a.exportsFn = i.makeShimExports(a); c[b] = a }), k.shim = c); a.packages && (y(a.packages, function (a) { a = "string" === typeof a ? { name: a} : a; b[a.name] = { name: a.name, location: a.location || a.name, main: (a.main || "main").replace(ja, "").replace(ea, "")} }), k.pkgs = b); G(p, function (a, b) { !a.inited && !a.map.unnormalized && (a.map = j(b)) }); if (a.deps || a.callback) i.require(a.deps || [],
a.callback)
        }, makeShimExports: function (a) { return function () { var b; a.init && (b = a.init.apply(aa, arguments)); return b || a.exports && ba(a.exports) } }, makeRequire: function (a, f) {
            function d(e, c, h) {
                var g, k; f.enableBuildCallback && (c && I(c)) && (c.__requireJsBuild = !0); if ("string" === typeof e) {
                    if (I(c)) return v(B("requireargs", "Invalid require call"), h); if (a && s(N, e)) return N[e](p[a.id]); if (l.get) return l.get(i, e, a, d); g = j(e, a, !1, !0); g = g.id; return !s(q, g) ? v(B("notloaded", 'Module name "' + g + '" has not been loaded yet for context: ' +
b + (a ? "" : ". Use require([])"))) : q[g]
                } L(); i.nextTick(function () { L(); k = r(j(null, a)); k.skipMap = f.skipMap; k.init(e, c, h, { enabled: !0 }); D() }); return d
            } f = f || {}; R(d, { isBrowser: A, toUrl: function (b) { var d, f = b.lastIndexOf("."), g = b.split("/")[0]; if (-1 !== f && (!("." === g || ".." === g) || 1 < f)) d = b.substring(f, b.length), b = b.substring(0, f); return i.nameToUrl(c(b, a && a.id, !0), d, !0) }, defined: function (b) { return s(q, j(b, a, !1, !0).id) }, specified: function (b) { b = j(b, a, !1, !0).id; return s(q, b) || s(p, b) } }); a || (d.undef = function (b) {
                w(); var c =
j(b, a, !0), d = m(p, b); delete q[b]; delete U[c.url]; delete $[b]; d && (d.events.defined && ($[b] = d.events), x(b))
            }); return d
        }, enable: function (a) { m(p, a.id) && r(a).enable() }, completeLoad: function (a) { var b, c, e = m(k.shim, a) || {}, d = e.exports; for (w(); H.length; ) { c = H.shift(); if (null === c[0]) { c[0] = a; if (b) break; b = !0 } else c[0] === a && (b = !0); E(c) } c = m(p, a); if (!b && !s(q, a) && c && !c.inited) { if (k.enforceDefine && (!d || !ba(d))) return z(a) ? void 0 : v(B("nodefine", "No define call for " + a, null, [a])); E([a, e.deps || [], e.exportsFn]) } D() }, nameToUrl: function (a,
b, c) { var e, d, h, g, j, i; if (l.jsExtRegExp.test(a)) g = a + (b || ""); else { e = k.paths; d = k.pkgs; g = a.split("/"); for (j = g.length; 0 < j; j -= 1) if (i = g.slice(0, j).join("/"), h = m(d, i), i = m(e, i)) { J(i) && (i = i[0]); g.splice(0, j, i); break } else if (h) { a = a === h.name ? h.location + "/" + h.main : h.location; g.splice(0, j, a); break } g = g.join("/"); g += b || (/\?/.test(g) || c ? "" : ".js"); g = ("/" === g.charAt(0) || g.match(/^[\w\+\.\-]+:/) ? "" : k.baseUrl) + g } return k.urlArgs ? g + ((-1 === g.indexOf("?") ? "?" : "&") + k.urlArgs) : g }, load: function (a, b) { l.load(i, a, b) }, execCb: function (a,
b, c, d) { return b.apply(d, c) }, onScriptLoad: function (a) { if ("load" === a.type || ka.test((a.currentTarget || a.srcElement).readyState)) P = null, a = K(a), i.completeLoad(a.id) }, onScriptError: function (a) { var b = K(a); if (!z(b.id)) return v(B("scripterror", "Script error", a, [b.id])) } 
        }; i.require = i.makeRequire(); return i
    } var l, w, x, D, t, E, P, K, Q, fa, la = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, ma = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, ea = /\.js$/, ja = /^\.\//; w = Object.prototype; var L = w.toString, ga = w.hasOwnProperty, ia =
Array.prototype.splice, A = !!("undefined" !== typeof window && navigator && document), da = !A && "undefined" !== typeof importScripts, ka = A && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, Y = "undefined" !== typeof opera && "[object Opera]" === opera.toString(), F = {}, r = {}, T = [], O = !1; if ("undefined" === typeof define) {
        if ("undefined" !== typeof requirejs) { if (I(requirejs)) return; r = requirejs; requirejs = void 0 } "undefined" !== typeof require && !I(require) && (r = require, require = void 0); l = requirejs = function (b, c, d, z) {
            var h,
j = "_"; !J(b) && "string" !== typeof b && (h = b, J(c) ? (b = c, c = d, d = z) : b = []); h && h.context && (j = h.context); (z = m(F, j)) || (z = F[j] = l.s.newContext(j)); h && z.configure(h); return z.require(b, c, d)
        }; l.config = function (b) { return l(b) }; l.nextTick = "undefined" !== typeof setTimeout ? function (b) { setTimeout(b, 4) } : function (b) { b() }; require || (require = l); l.version = "2.1.5"; l.jsExtRegExp = /^\/|:|\?|\.js$/; l.isBrowser = A; w = l.s = { contexts: F, newContext: ha }; l({}); y(["toUrl", "undef", "defined", "specified"], function (b) {
            l[b] = function () {
                var c = F._; return c.require[b].apply(c,
arguments)
            } 
        }); if (A && (x = w.head = document.getElementsByTagName("head")[0], D = document.getElementsByTagName("base")[0])) x = w.head = D.parentNode; l.onError = function (b) { throw b; }; l.load = function (b, c, d) {
            var l = b && b.config || {}, h; if (A) return h = l.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), h.type = l.scriptType || "text/javascript", h.charset = "utf-8", h.async = !0, h.setAttribute("data-requirecontext", b.contextName), h.setAttribute("data-requiremodule", c),
h.attachEvent && !(h.attachEvent.toString && 0 > h.attachEvent.toString().indexOf("[native code")) && !Y ? (O = !0, h.attachEvent("onreadystatechange", b.onScriptLoad)) : (h.addEventListener("load", b.onScriptLoad, !1), h.addEventListener("error", b.onScriptError, !1)), h.src = d, K = h, D ? x.insertBefore(h, D) : x.appendChild(h), K = null, h; if (da) try { importScripts(d), b.completeLoad(c) } catch (j) { b.onError(B("importscripts", "importScripts failed for " + c + " at " + d, j, [c])) } 
        }; A && M(document.getElementsByTagName("script"), function (b) {
            x || (x =
b.parentNode); if (t = b.getAttribute("data-main")) return r.baseUrl || (E = t.split("/"), Q = E.pop(), fa = E.length ? E.join("/") + "/" : "./", r.baseUrl = fa, t = Q), t = t.replace(ea, ""), r.deps = r.deps ? r.deps.concat(t) : [t], !0
        }); define = function (b, c, d) {
            var l, h; "string" !== typeof b && (d = c, c = b, b = null); J(c) || (d = c, c = []); !c.length && I(d) && d.length && (d.toString().replace(la, "").replace(ma, function (b, d) { c.push(d) }), c = (1 === d.length ? ["require"] : ["require", "exports", "module"]).concat(c)); if (O) {
                if (!(l = K)) P && "interactive" === P.readyState || M(document.getElementsByTagName("script"),
function (b) { if ("interactive" === b.readyState) return P = b }), l = P; l && (b || (b = l.getAttribute("data-requiremodule")), h = F[l.getAttribute("data-requirecontext")])
            } (h ? h.defQueue : T).push([b, c, d])
        }; define.amd = { jQuery: !0 }; l.exec = function (b) { return eval(b) }; l(r)
    } 
})(this);
define("R", function(){});


var __CTRIP_JS_PARAM = "?jsparam="
var __CTRIP_URL_PLUGIN = "ctrip://h5/plugin" + __CTRIP_JS_PARAM;
var __CTRIP_YOUTH_URL_PLUGIN = "ctripyouth://h5/plugin" + __CTRIP_JS_PARAM;

/**
* @class Internal
* @description bridge.js内部使用的工具类
* @brief 内部使用工具类
* @private
*/ 
var Internal = {
    /**
     * @brief 是否是iOS设备
     * @description  bridge.js内部使用，判断是否是iOS
     * @type Bool
     * @property isIOS
     */
    isIOS:false,

    /**
     * @brief 是否是Android设备
     * @description  bridge.js内部使用，判断是否是Android设备
     * @type Bool
     * @property isAndroid
     */
    isAndroid:false,

     /**
     * @brief 是否是WinPhone设备
     * @description  bridge.js内部使用，判断是否是Windows Phone设备
     * @type Bool
     * @property isWinOS
     */
    isWinOS:false,

    /**
     * @brief 当前是否是App环境
     * @description  bridge.js内部使用，判断当前是否是App环境
     * @type Bool
     * @property isInApp
     */
    isInApp:false,
    
    /**
     * @brief 当前携程旅行App版本
     * @description bridge.js内部使用，存储当前携程旅行App版本
     * @type String
     * @property appVersion
     */     
    appVersion:"",

    /**
     * @brief 当前操作系统版本
     * @description bridge.js内部使用，存储当前操作系统版本
     * @type String
     * @property osVersion
     */ 
    osVersion:"",

    /**
     * @brief 当前App是否是青春版
     * @description bridge.js内部使用，判断是否是青春版
     * @type String
     * @property isYouthApp
     */ 
    isYouthApp:false,
    
    /**
     * @brief 判断版本大小
     * @description 判断当前版本号是否大于传入的版本号
     * @param {String} verStr 版本号
     * @method isAppVersionGreatThan
     * @return {Bool} 是否大于该版本号
     * @since v5.2
     * @example
     
     * var isLarger = isAppVersionGreatThan("5.2"); <br />
     * alert(isLarger); // depends
     */
    isAppVersionGreatThan:function(verStr) {
        if (Internal.isYouthApp) { //青春版不做校验
            return true;
        }

        if ((typeof verStr == "string") && (verStr.length > 0) && Internal.appVersion) {
            var fInVerStr = verStr.replace(/\./g,'');
            var fNowVerStr = Internal.appVersion.replace(/\./g,'');

            var inVer = parseFloat(fInVerStr);
            var nowVer = parseFloat(fNowVerStr);
            if (isNaN(nowVer) || nowVer - inVer >= 0) {
                return true;
            }
        }

        return false;
    },

     /**
     * @brief 判断API是否支持
     * @description 判断API是否支持当前版本
     * @param {String} verStr 版本号
     * @method isSupportAPIWithVersion
     * @return {Bool} 是否支持该API
     * @since v5.2
     * @example
     
     * var isSupport = isSupportAPIWithVersion("5.2"); <br />
     * alert(isSupport); // depends
     */
    isSupportAPIWithVersion:function(verStr) {
        return true;
        if ((verStr != null) && (!Internal.isAppVersionGreatThan(verStr))) {
            Internal.appVersionNotSupportCallback(verStr);
            return false;
        }
        return true;
    },

   /**
     * @brief app版本过低回调
     * @description 回调H5页面，告知API开始支持的版本号及当前App的版本
     * @param {String} supportVer API支持的版本号
     * @method appVersionNotSupportCallback
     * @since v5.2
     * @author jimzhao
     */
    appVersionNotSupportCallback:function(supportVer) {
        var jsonObj = {"tagname":"app_version_too_low","start_version":supportVer,"app_version":Internal.appVersion};
        CtripTool.app_log(JSON.stringify(jsonObj));
        window.app.callback(jsonObj);
    },

    /**
     * @brief 参数错误回调
     * @description 回调H5页面，所调用的JS 参数有错误
     * @param {String} description 错误原因描述
     * @method paramErrorCallback
     * @since v5.2
     * @author jimzhao
     */
    paramErrorCallback:function(description) {
        var jsonObj = {"tagname":"app_param_error","description":description};
        CtripTool.app_log(JSON.stringify(jsonObj));
        window.app.callback(jsonObj);
    },

   /**
     * @brief 判断字符串是否为空
     * @description 判断字符串是否为空
     * @method isNotEmptyString
     * @param {String} str 需要判断的字符串
     * @since v5.2
     */
    isNotEmptyString:function(str) {
        if ((typeof str == "string") && (str.length > 0)) {
            return true;
        }

        return false;
    },


   /**
     * @brief 内部URL跳转
     * @description 内部隐藏iframe，做URL跳转
     * @method loadURL
     * @param {String} url 需要跳转的链接
     * @since v5.2
     */
    loadURL:function(url) {
        if (url.length == 0) {
            return;
        }

        var iframe = document.createElement("iframe");
        var cont = document.body || document.documentElement;

        iframe.style.display = "none";
        iframe.setAttribute('src', url);
        cont.appendChild(iframe);

        setTimeout(function(){
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }, 200);
    },

   /**
     * @brief 内部组装URL参数
     * @description  内部使用，组装URL参数
     * @return 返回序列化之后的字符串
     * @method makeParamString
     * @param {String} service app响应的plugin的名字
     * @param {String} action 该plugin响应的函数
     * @param {JSON} param 扩展参数，json对象
     * @param {String} callbackTag app回调给H5页面的tagname
     * @since v5.2
     */
    makeParamString:function(service, action, param, callbackTag) {

        if (!Internal.isNotEmptyString(service) || !Internal.isNotEmptyString(action)) {
            return "";
        }

        if (!param) {
            param = {};
        };

        param.service = service;
        param.action = action;
        param.callback_tagname = callbackTag;

        return JSON.stringify(param);
    },

    /**
     * @brief 内部组装URL
     * @description  内部使用，组装URL
     * @return {String} encode之后的URL
     * @method makeURLWithParam
     * @param {String} paramString 拼接URL参数
     * @since v5.2
     */
    makeURLWithParam:function(paramString) {
        if (paramString == null) {
            paramString = "";
        }

        paramString = encodeURIComponent(paramString);
        if (Internal.isYouthApp) {
            return __CTRIP_YOUTH_URL_PLUGIN + paramString;
        } else {
            return  __CTRIP_URL_PLUGIN + paramString;
        }
    },

     /**
     * @brief JS调用Win8 native
     * @description  内部使用，用于js调用win8
     * @param {String} 传递给win8的参数
     * @method callWin8App
     * @since v5.3
     */
    callWin8App:function(paramString) {
        window.external.notify(paramString);
    }

//     execAPI:function(supportVersion, modelName, actionName, params, callbackTagName) {
//         console.log("start exec execAPIA");
//         if ((supportVersion != null) && !Internal.isSupportAPIWithVersion(supportVersion)) {
//             return;
//         }
// //        Internal.execAPI("5.4","NavBar", "setNavBarHidden",params,"set_navbar_hidden");

//         paramString = Internal.makeParamString(modelName, actionName, params, callbackTagName);
//         console.log("start exec execAPIB:" + paramString);

//         if (Internal.isIOS) {
//             url = Internal.makeURLWithParam(paramString);
//             Internal.loadURL(url);
//         }
//         else if(Internal.isAndroid) {
//             try {
//                 var pluginModelName = modelName + "_a";
//                 var pluginCmd = window[pluginModelName];
//                 if (pluginCmd != null) {
//                     pluginCmd = pluginCmd[actionName];
//                     console.log("start exec execAPID:" + pluginCmd);

//                     if (pluginCmd != null) {
//                         console.log("start exec execAPIE:" + pluginCmd);
//                         //pluginCmd=window.Util_a.setNavBarHidden
//                         vard = pluginCmd(paramString);
//                         console.log("start exec vard:" + vard);
//                         eval(vard);      
//                         console.log("start exec execAPIF:" + pluginCmd);
                  
//                     }
//                 }
//             } catch(e) {
//                  console.log("start exec ErrorG:" + e);
//             }
//         }
//         else if (Internal.isWinOS) {
//                 Internal.callWin8App(paramString);
//         }
//     }
};

var originalConsole = console;

var console = originalConsole;


var CtripConsole = {
    
    log:function(log) {
        if (Internal.isWinOS) {
            Internal.callWin8App("wp-log:#wp#Log:"+log);
        }
         else if (Internal.isIOS) {
            Internal.loadURL("ios-log:#iOS#Log:" + log);            
        }
    },
    
    debug:function(log) {
        if (Internal.isWinOS) {
            Internal.callWin8App("wp-log:#wp#Debug:"+log);
        } 
        else if (Internal.isIOS) {
            Internal.loadURL("ios-log:#iOS#Debug:" + log);
        }
    },
    
    info:function(log) {
        if (Internal.isWinOS) {
            Internal.callWin8App("wp-log:#wp#info:"+log);
        } 
        else if (Internal.isIOS) {
            Internal.loadURL("ios-log:#iOS#Info:" + log);
        }
    },
    
    warn:function(log) {
       if (Internal.isWinOS) {
            Internal.callWin8App("wp-log:#wp#warn:"+log);
        } 
        else if (Internal.isIOS) {
            Internal.loadURL("ios-log:#iOS#warn:" + log);
        }
    },

    error:function(log) {
        if (Internal.isWinOS) {
            Internal.callWin8App("wp-log:#wp#Error:"+log);
        } 
        else if (Internal.isIOS) {
            Internal.loadURL("ios-log:#iOS#Error:" + log);
        }
    }
};

/**
 * @brief app回调bridge.js
 * @description 将native的callback数据转换给H5页面的app.callback(JSON)
 * @method __bridge_callback
 * @param {String} param native传给H5的字符串,该字符串在app组装的时候做过URLEncode
 * @since v5.2
 * @author jimzhao
 */
function __bridge_callback(param) {
    param = decodeURIComponent(param);
    
    var jsonObj = JSON.parse(param);

    if (jsonObj != null) {
        if (jsonObj.param != null && jsonObj.param.hasOwnProperty("platform")) {
            var ua = navigator.userAgent;
            if (ua.indexOf("Youth_CtripWireless") > 0) { 
                Internal.isYouthApp = true;
            } 
            
            platform = jsonObj.param.platform;
            var typePf = typeof platform;

            if (typePf == "number") { //iOS
                if (platform == 1 || platform == 2 || platform == 3) {
                    Internal.isIOS = (platform == 1);
                    Internal.isAndroid = (platform == 2);
                    Internal.isWinOS = (platform == 3);
                }
            }
            else if (typePf == "string") { //Android
                if (platform == "1" || platform == "2" || platform == "3") {
                    Internal.isIOS = (platform == "1");
                    Internal.isAndroid = (platform == "2");
                    Internal.isWinOS = (platform == "3");     
                }
            }

            Internal.isInApp = true;
            Internal.appVersion = jsonObj.param.version;
            Internal.osVersion = jsonObj.param.osVersion;

            if (Internal.isWinOS) {
                window.navigator.userAgent.winPhoneUserAgent = window.navigator.userAgent+"_CtripWireless_"+Internal.appVersion; 
                console = CtripConsole;                
            }
            else if (Internal.isIOS) {
                console = CtripConsole;
            }
        }

        val = window.app.callback(jsonObj);
        
        if (Internal.isWinOS) {
            if (val) {
                val = "true";
            } else {
                val = "false";
            }
        }

        return val;
    }

    return -1;
};

/**
 * @brief app写localstorage
 * @description 写key/value数据到H5页面的local storage
 * @method __writeLocalStorage
 * @param {String} key 需要写入数据库的key
 * @param {String} value 需要写入数据库的value
 * @since v5.2
 * @author jimzhao
 */
function __writeLocalStorage(key, jsonValue) {
    if (Internal.isNotEmptyString(key)) {
        localStorage.setItem(key, jsonValue);
    }
};

/**
 * @class CtripTool
 * @brief 工具类
 * @description 工具类,和App无交互，纯JS处理
 */
var CtripTool = {

    /**
     * @brief 判断当前是否是在App内
     * @description  判断当前H5页面是否是在App内
     * @since 5.2
     * @method app_is_in_ctrip_app
     * @author jimzhao
     * @return bool, true代表在app环境，false表示不在app环境
     * @example 

     * var ret = CtripTool.app_is_in_ctrip_app();
     * alert("isInApp=="+ret);
     */
    app_is_in_ctrip_app:function() {
        if (Internal.isInApp) {
            return true;
        }

        var isInCtripApp = false;

         var ua = navigator.userAgent;
         if (ua.indexOf("CtripWireless")>0) {
            isInCtripApp = true;
         }
        
        return isInCtripApp;
    }
};

/**
 * @class CtripUtil
 * @description 常用Util
 * @brief 常用Util
 */
var CtripUtil = {

    /**
     * @description 进入H5模块，初始化数据
     * H5接收到web_view_did_finished_load的回调之后，调用该函数，初始化数据会通过callback传递给H5
     * @brief 初始化H5模块数据
     * @method app_init_member_H5_info
     * @since version 5.2
     * @author jimzhao
     * @callback tagname="init_member_H5_info"
     * @example

         CtripUtil.app_init_member_H5_info();
         //调用完成，H5页面会收到如下返回数据
         var json_obj =
         {
            tagname:"init_member_H5_info",
            param:{
                timestamp:135333222,
                version:"5.2",
                device:"iPhone4S",
                appId:"com.ctrip.wrieless",
                osVersion:"iOS_6.0",
                serverVersion:"5.7.1",
                platform:1, //区分平台，iPhone为1, Android为2, winPhone为3
                isPreProduction:0,//UAT:2, FAT:0,堡垒:1,生产不会有该字段
                extSouceID:"8888",//外部渠道ID,since 5.4
                clientID:"1323333333333333", //客户端唯一标识, since5.4
                systemCode:16, //标准版-iOS:12, android:32; 学生版－ios:16, Android:36, since 5.6
                latitude:32.011111,//缓存的纬度 since 5.7
                longitude:121.000332,//缓存的经度 since 5.7
                screenWidth:320,//晶赞广告系统使用 since 5.7
                screenHeight:480,//晶赞广告系统使用 since 5.7
                screenPxDensity:1,//晶赞广告系统使用 since 5.7
                deviceOSVersion:4.3,//晶赞广告系统使用 since 5.7
                internalVersion:"5.71",//app内部版本，和mobile server通讯需要，学生版可用该参数做版本更新判断，since 5.8
                allianceId:"xxxxxxx", //5.9加入，营销业绩使用
                sId:"ssssssss",//5.9加入，营销业绩使用
                ouId:"ssseeeeee",//5.9加入，营销业绩使用
                telephone:"999999999"//5.9加入，营销业绩使用
                networkStatus:"4G", //5.9加入，返回当前网络状态 2G/3G/4G/WIFI/None
                isSaveFlow:true, //是否是省流量模式，since 6.0
                isAppNeedUpdate:false, //5.10加入
                idfa:"guid_xxxx_3333_16字节",// iOS设备的IDFA，android设备无此字段，since 6.1
                deviceToken:"guid_xxxx_3333_32字节",// iOS设备的push deviceToken，android设备无此字段，since 6.1
                userInfo={USERINFO},//USERINFO内部结构参考CtripUser.app_member_login();    
            }
         }
         app.callback(json_obj);
     */
    app_init_member_H5_info:function() {
        var paramString = Internal.makeParamString("User", "initMemberH5Info", null, "init_member_H5_info");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if(Internal.isAndroid) {
            window.User_a.initMemberH5Info(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 拨打电话
     * @brief 拨打电话
     * @param {String} phone 需要拨打的电话号码，为空时候，会拨打ctrip呼叫中心号码
     * @param {String} pageId 页面PageId，可以为空，呼叫中心BI统计之用, 6.1加入
     * @param {String} businessCode 拨打电话的业务标识号，可以为空，呼叫中心BI统计之用, 6.1加入
     * @method app_call_phone
     * @since v5.2
     * @author jimzhao
     * @example 

     CtripUtil.app_call_phone("13800138000");

     CtripUtil.app_call_phone("400666668","page_car_333", "car_phone_111");

     //或者直接拨打呼叫中心
     CtripUtil.app_call_phone();
     */
    app_call_phone:function(phone, pageId, businessCode) {  

        if(!phone) {
            phone = "";
        }
        
        var params = {};
        params.pageId = pageId;
        params.phone = phone;
        params.businessCode = businessCode;

        var paramString = Internal.makeParamString("Util", "callPhone", params, "call_phone")
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url); 
        }
        else if (Internal.isAndroid){
            window.Util_a.callPhone(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 退回到首页，离开H5
     * @brief 回到首页
     * @since v5.2
     * @method app_back_to_home
     * @author jimzhao
     * @example 

     CtripUtil.app_back_to_home();
     */
    app_back_to_home:function() {
        var paramString = Internal.makeParamString("Util", "backToHome", null, "back_to_home");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
           window.Util_a.backToHome(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 退回到H5页面的上一个页面，离开H5. v5.3开始支持带参数给上一个H5页面
     * @brief 离开H5回上一个页面
     * @method app_back_to_last_page
     * @param {String} callbackString 离开H5页面，需要传递给上一个H5页面的数据，上一个H5页面在web_view_did_appear回调里面将会收到该数据
     * @param {Bool} isDeleteH5Page 是否是直接删除该H5页面。直接删除H5页面时候，页面切换会没有动画效果
     * @since v5.2
     * @author jimzhao
     * @example 

        CtripUtil.app_back_to_last_page("This is a json string for my previous H5 page", false);

     */
    app_back_to_last_page:function(callbackString, isDeleteH5Page) {
        var params = {};
        if(!callbackString) {
            callbackString = "";
        }

        params.callbackString = callbackString;
        params.isDeleteH5Page = isDeleteH5Page;
        var paramString = Internal.makeParamString("Util", "backToLast", params, "back_to_last_page");

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.backToLast(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description Hybrid页面，打开链接URL地址，兼容App和浏览器
     * @brief Hybrid页面打开链接URL
     * @param {String} openUrl @required<br> 需要打开的URL，可以为ctrip://,http(s)://,file://等协议的URL
     * @param {int} targetMode @required<br>
     0.当前页面刷新url, 该参数类似于js的location.href="", 注：只支持打online地址 <br/>
     1.处理ctrip://协议; 注：只处理ctrip协议的URL Schema<br/>
     2.开启新的H5页面,title生效; 注：只支持online地址<br/>
     3.使用系统浏览器打开; 注：只支持online地址和其它App的URL Schema，例如微信的weixin://home<br/>
     4.开启新的H5页面，title生效，打开webapp目录下的相对路径；注：和2对应，2打开online地址，4打开相对路径<br/>
     5.当前页面打开webapp目录下相对路径；注：和0对应，0是打开online地址，5是打开本地相对路径。 5.8之前版本，内部自动调用app_cross_package_href
     * @param {String} title @optional 当targetMode＝2时候，新打开的H5页面的title
     * @param {String} pageName @optional 当targetMode＝0、2、4时候，本页面，或者新打开的H5页面，此时pageName有效，pageName当作H5页面唯一标识，可用于刷新页面；5.6版本加入
     * @param {boolean} isShowLoadingPage  @optional 开启新的webview的时候，是否加载app的loading 
     * @method app_open_url
     * @since v5.2
     * @author jimzhao
     * @example 

     //当前H5页面打开ctrip.com
     CtripUtil.app_open_url("http://www.ctrip.com", 0);
     //进入App的酒店详情页
     CtripUtil.app_open_url("ctrip://wireless/hotel?id=1234", 1);
     //开启新的H5页面，进入m.ctrip.com
     CtripUtil.app_open_url("http://m.ctrip.com", 2, "Ctrip H5首页", "ctrip_home_page_id");
     //开启新的H5页面，进入webapp/car/index.html
     CtripUtil.app_open_url("car/index.html", 4, "用车首页", "car_index_page_id");
     //当前H5页面，跨包跳转进入webapp/car/index.html
     CtripUtil.app_open_url("car/index.html", 5, "用车首页", null);

     */
     app_open_url:function(openUrl, targetMode, title, pageName, isShowLoadingPage) {
        var params = {};
        if(!openUrl) {
            openUrl = "";
        }
        if (!title) {
            title = "";
        }
        if (!pageName) {
            pageName = "";
        }

        params.openUrl = openUrl;
        params.title = title;
        params.targetMode = targetMode;
        params.pageName = pageName;
        params.isShowLoadingPage = isShowLoadingPage;
        var paramString = Internal.makeParamString("Util", "openUrl", params, "open_url");
        
        if (Internal.appVersion) { //有AppVersion，为5.3及之后版本，或者5.2本地H5页面
            var isHandled = false;

            if (targetMode == 5) { //targetMode=5,5.8新增,可以兼容到以前版本,5.9之前版本使用cross做内部替换
                if (!Internal.isAppVersionGreatThan("5.9")) {
                    var firstSplashIndex = openUrl.indexOf("/");
                    if (firstSplashIndex > 0) {
                        var packageName = openUrl.substr(0, firstSplashIndex);
                        var pageParam = openUrl.substr(firstSplashIndex+1)
                        CtripUtil.app_cross_package_href(packageName, pageParam);
                    } else {
                        Internal.appVersionNotSupportCallback("传入URL有错误，eg. car/index.html#xxooee");
                    }
                    isHandled = true;
                } 
            }

            if (!isHandled) {
                if (Internal.isIOS) {
                    var url = Internal.makeURLWithParam(paramString);
                    Internal.loadURL(url);
                }
                else if (Internal.isAndroid) {
                    window.Util_a.openUrl(paramString);
                }
                else if (Internal.isWinOS) {
                    Internal.callWin8App(paramString);
                }
            }
        } 
        else
        {
            var ua = navigator.userAgent;
            var isAndroid52Version = (ua.indexOf("Android")>0) && (ua.indexOf("CtripWireless")>0);
            if(isAndroid52Version) {
                try {
                    window.Util_a.openUrl(paramString);
                } 
                catch(e){
                    window.location.href = openUrl;
                }
            } 
            else {
                window.location.href = openUrl;
            }
        }
    },

    /**
     * @description H5跨模块/站点跳转
     * @brief H5跨模块/站点跳转
     * @param {String} path 模块名称，如hotel, car, myctrip,
     * @param {String} param 作为URL，拼接在path后面的页面和其它参数 index.html#cashcouponindex?cash=xxxx
     * @method app_cross_package_href
     * @since v5.2
     * @author jimzhao
     * @example
     *
      //跳转到我的携程首页
      CtripUtil.app_cross_package_href("myctrip", "index.html?ver=5.2"); 

     */
    app_cross_package_href:function(path, param) {
        var params = {};
        if (!path) {
            path = "";
        }
        if (!param) {
            param = "";
        }

        params.path = path;
        params.param = param;

        var paramString = Internal.makeParamString("Util", "crossPackageJumpUrl", params, "cross_package_href");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.crossPackageJumpUrl(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 检查当前App网络状况
     * @brief 检查当前App网络状况
     * @since v5.2
     * @method app_check_network_status
     * @author jimzhao
     * @example 

     CtripUtil.app_check_network_status();
     //调用完成后，H5页面会收到如下回调数据
     var json_obj = 
     {
        tagname:"check_network_status",
        param = {
            hasNetwork:true,//布尔值返回是否有网络
            networkType:"4G", //5.8开始加入， None-无网络, 2G-蜂窝数据网EDGE/GPRS, 3G-蜂窝数据网HSPDA,CDMAVOD, 4G-LTE(4G为5.9加入), WIFI-WLAN网络    
        }
     }
     app.callback(json_obj);
     
     */
    app_check_network_status:function() {
        var paramString = Internal.makeParamString("Util", "checkNetworkStatus", null, "check_network_status");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.checkNetworkStatus(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 检查是否安装App
     * @brief 检查是否安装App
     * @param {String} openUrl 尝试打开的URL，iOS使用
     * @param {String} packageName app的包名，android使用
     * @method app_check_app_install_status
     * @since v5.2
     * @author jimzhao
     * @example 

     CtripUtil.app_check_app_install_status("ctrip://wireless", "com.ctrip.view");
     //调用完成后，H5页面会收到如下回调数据
     var json_obj = 
     {
        tagname:"check_app_install_status",
        param: {
            isInstalledApp:true,//布尔值返回是否有安装    
        }
     }
     app.callback(json_obj);
     */
    app_check_app_install_status:function(openUrl, packageName) {
        var params = {};
        if (!openUrl) {
            openUrl = "";
        }
        if (!packageName) {
            packageName = "";
        }
        params.openUrl = openUrl;
        params.packageName = packageName;

        var paramString = Internal.makeParamString("Util", "checkAppInstallStatus", params, "check_app_install_status");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.checkAppInstallStatus(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description H5通知Native刷新
     * @brief H5通知Native刷新
     * @param {String} pageName 要刷新的页面名字,该字段需要H5和native共同约定，H5调用之后，native需要捕获该名字的boardcast/notification
     * @param {String} jsonStr 刷新该页面需要的参数
     * @method app_refresh_native_page
     * @since v5.2
     * @author jimzhao
     * @example 
        
        5.6新增说明：刷新app_open_url打开的H5页面
        CtripUtil.app_open_url();函数打开的H5页面，设置pagename:h5_page_identify
        CtripUtil.app_refresh_native_page("h5_page_identify", "xxxx_json_string");
        
        先前版本，刷新Native的页面
        //H5调用
        
        CtripUtil.app_refresh_native_page("xxxxPageName", "xxxx_json_string");

        //Native需要处理的地方
     
        //iOS:
        //1. 添加Notification的关注
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(refresh:) name:kH5NativeShouldReloadNotification object:nil];
        
        //2. 实现方法
        - (void)refresh:(NSNotification *)notification {
             NSDictionary *dic = [notification userInfo];
             NSString *value = [dic objectForKey:@"pageName"];
             NSDictionary *objDict = [dict valueForKey:@"arguments"];
             if ([value isEqualToString:@"xxxxPageName"])
             {
                 NSLog("Do Something here, objDict==%@", objDict);      
             }

        }
        
        //3. 移除Notification的关注
        [[NSNotificationCenter defaultCenter] removeObserver:self];

       // Android:
       // 1. 创建BroadcastReceiver;
        private BroadcastReceiver mFocusNewStateReceiver = new BroadcastReceiver() {
            //@Override
            public void onReceive(Context context, Intent intent) {

                if (H5UtilPlugin.TAG_UPDATE_NATIVE_PAGE.equals(intent.getAction())) {
                    String info = intent.getStringExtra("info");
                    if (!StringUtil.emptyOrNull(info)) {
                        try {
                            JSONObject jsonObject = new JSONObject(info);
                            String value = jsonObject.getString("pageName");

                            if (!StringUtil.emptyOrNull(value)) {
                                if (value.equalsIgnoreCase("xxxxPageName")) {
                                    //TODO: do your job here
                                }
                            }    

                            String jsonStr = jsonObject.getString("jsonStr");
                            if (!StringUtil.emptyOrNull(jsonStr)) {
                                JSONObject obj = new JSONObject(jsonStr);
                                //TODO:with obj from hybrid
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        } finally {

                        }
                    }
                }
            }
        };
    
        //2. 注册创建BroadcastReceiver;
            IntentFilter filter = new IntentFilter();
            filter.addAction(H5UtilPlugin.TAG_UPDATE_NATIVE_PAGE);
            LocalBroadcastManager.getInstance(getApplicationContext()).registerReceiver(mFocusNewStateReceiver, filter);
            registerReceiver(mFocusNewStateReceiver, filter);

        //3. 使用完成，移除BroadcastReceiver
            LocalBroadcastManager.getInstance(getApplicationContext()).unregisterReceiver(mFocusNewStateReceiver);
            unregisterReceiver(mFocusNewStateReceiver);

     */
    app_refresh_native_page:function(pageName, jsonStr) {
        var params = {};
        if (!pageName) {
            pageName = "";
        }
        if (!jsonStr) {
            jsonStr = "";
        }

        params.pageName = pageName;
        params.jsonStr = jsonStr;

        var paramString = Internal.makeParamString("Util", "refreshNativePage", params, "refresh_native_page");
        if(Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.refreshNativePage(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 复制文字到粘贴板
     * @brief 复制文字到粘贴板
     * @param {String} toCopyStr, 需要复制的文字
     * @method app_copy_string_to_clipboard
     * @since v5.3
     * @author jimzhao
     * @example CtripUtil.app_copy_string_to_clipboard("words_to_be_copy_xxxxxx");

     */
    app_copy_string_to_clipboard:function(toCopyStr) {
        if (!Internal.isSupportAPIWithVersion("5.3")) {
            return;
        }
        var params = {};
        if (!toCopyStr) {
            toCopyStr = "";
        }
        params.copyString = toCopyStr;

        var paramString = Internal.makeParamString("Util", "copyToClipboard", params, "copy_string_to_clipboard");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.copyToClipboard(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 从粘贴板读取复制的文字
     * @brief 从粘贴板读取复制的文字
     * @callback tagname="read_copied_string_from_clipboard";//返回当前粘贴板中的文字key=copiedString
     * @method app_read_copied_string_from_clipboard
     * @since v5.3
     * @author jimzhao
     * @example 

        Ctrip.app_read_copied_string_from_clipboard();
        //调用该函数之后，H5会收到如下回调
        var json_obj = 
        {
            tagname:"read_copied_string_from_clipboard",
            param: {
                copiedString:"words_copied_xxxxxx";
            }
        }
        app.callback(json_obj);
     */
    app_read_copied_string_from_clipboard:function() {
        var startVersion = "5.3";
         if (!Internal.isSupportAPIWithVersion("5.3")) {
            return;
        }

        var paramString = Internal.makeParamString("Util", "readCopiedStringFromClipboard", null, "read_copied_string_from_clipboard");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.readCopiedStringFromClipboard(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 根据URL下载数据
     * @brief 根据URL下载数据
     * @param {String} download_url 需要下载内容的URL
     * @param {String} suffix 保存的文件后缀
     * @param {Boolean} isIgnoreHttpsCertification 是否忽略非法的HTTPS证书
     * @method app_download_data
     * @since v5.3
     * @author jimzhao
     * @example

     CtripUtil.app_download_data("http://www.baidu.com/img/bdlogo.gif", "gif");
     //调用该函数后，native会返回H5内容
     var json_obj = {
        tagname:"download_data",
        error_code:"xxxxx",//param_error,download_faild
        param:{
            downloadUrl:"http://www.baidu.com/bdlogo.gif", 
            savedPath:"../wb_cache/pkg_name/md5_url_hash"
        }
     };
     app.callback(json_obj);
     */
    app_download_data:function(download_url, suffix, isIgnoreHttpsCertification) {
        if (!Internal.isSupportAPIWithVersion("5.3")) {
            return;
        }

        var params = {};
        if (!download_url) {
            download_url = "";
        }
        if (!suffix) {
            suffix = "";
        }
        params.downloadUrl = download_url;
        params.suffix = suffix;
        params.pageUrl = window.location.href;
        params.isIgnoreHttpsCertification = isIgnoreHttpsCertification;

        var paramString = Internal.makeParamString("Util", "downloadData",params,"download_data");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.downloadData(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 打开其它App，android可以根据包名和URL跳转，iOS只支持URL跳转
     * @brief 打开其它App
     * @param {String} packageId 需要打开的app的包名，android使用
     * @param {String} jsonParam 打开指定包名的app，所带的参数，json字符串
     * @param {String} url 需要打开的app支持的URL协议，如ctrip://xxx
     * @method app_open_other_app
     * @since v5.3
     * @author jimzhao
     * @example

     CtripUtil.app_open_other_app("com.tencent.mm", null, "weixin://xxxxx");
     //优先级说明：
     //1. android有packageId的时候，使用packageId＋jsonParam做跳转;
     //2. 无包名时候，android使用URL协议跳转;
     //3. iOS， winPhone OS都使用URL协议跳转;
     */
    app_open_other_app:function(packageId, jsonParam, url) {
        if (!Internal.isSupportAPIWithVersion("5.3")) {
            return;
        }

        var params = {};
        if (!packageId) {
            packageId = "";
        }
        if (!jsonParam) {
            jsonParam = "";
        }
        if (!url) {
            url = "";
        }
        params.packageId = packageId;
        params.jsonParam = jsonParam;
        params.url = url;
        var paramString = Internal.makeParamString("Util", "openOtherApp", params, "open_other_app");

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Util_a.openOtherApp(paramString);
        } 
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 将log写入到native的日志界面
     * @brief H5写日志到app
     * @method app_log
     * @param {String} log 需要打印打log
     * @param {String} result 上一句log执行的结果，可以为空,打印的时候会自动换行，加入时间
     * @since v5.2
     * @author jimzhao
     * @example

      CtripUtil.app_log("execute script xxxxx", "result for script is oooooo");
     */
    app_log:function(log, result) {
        if (!Internal.isNotEmptyString(log)) {
            return;
        }
        if (!Internal.isNotEmptyString(result)) {
            result = "";
        }
        var params = {};
        params.log = log;
        params.result = result;
        var paramString = Internal.makeParamString("Util", "h5Log", params, "log");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid)
        {
            window.Util_a.h5Log(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 选取图片/拍摄照片，返回图片base64字符串
     * @brief 选择图片/拍摄照片
     * @param {int} maxFileSize 选择的单张图片的最大文件大小，native会将图片做JPEG压缩到maxFileSize的范围内，单位是bit，默认200*1024
     * @param {int} maxPhotoCount 最多支持选择的图片个数,默认为1张，此时不显示多选
     * @param {JSON} meta 图片选取相关配置信息，5.8新增，5.8版本开始支持1个key， canEditSinglePhoto:单选能否编辑
     * @method app_choose_photo
     * @since v5.7
     * @author jimzhao
     * @example

       //选择一张需要编辑的图片
       var meta = {};
       meta.canEditSinglePhoto = true;
       CtripUtil.app_choose_photo(200*1024, 1, meta);
        
       //选择2张图片，单张图片大小限制200KB
       CtripUtil.app_choose_photo(200*1024, 2);
        
       //调用完成之后，返回的数据格式
       var json_obj =
        {
            tagname:"choose_photo",
            error_code:"",
            param:{
                photoList:["xx089xessewz....", "xx089xessewz...."]
            }
        }

        //未授权error_code,未授权错误返回如下，错误提示由native弹对话框处理。 6.0加入
        var json_obj =
        {
            tagname:"choose_photo",
            error_code:"(-301)相册/相机未授权",
        }

        app.callback(json_obj);
     
     */
    app_choose_photo:function(maxFileSize, maxPhotoCount, meta) {
        if (!Internal.isSupportAPIWithVersion("5.7")) {
            return;
        }
        var params = {};
        params.maxFileSize = maxFileSize;
        params.maxPhotoCount = maxPhotoCount;
        params.meta = meta;

        var paramString = Internal.makeParamString("Util", "choosePhoto", params, "choose_photo");

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Util_a.choosePhoto(paramString);
        } 
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 保存照片到相册
     * @brief  保存照片到相册
     * @param {String} photoUrl 需要保存图片的URL， 注：当photoBase64String字段不为空的时候，base64图片内容优先，URL不处理
     * @param {String} photoBase64String 需要保存图片的base64字符串,UTF8编码，
     * @param {String} imageName 图片保存到相册的名字，android有效，ios无效. 不传的时候，默认android存储为image.jpg
     * @method app_save_photo
     * @since v5.10
     * @author jimzhao
     * @example
        
       //保存图片base64内容
       CtripUtil.app_save_photo(null, "xxoooe33xxxeseee","my_img.jpg");
       //保存图片链接URL
       CtripUtil.app_save_photo("http://www.baidu.com/img/bd_logo1.png", null);

       //调用完成之后，返回的数据格式
       var json_obj =
        {
            tagname:"save_photo",
            error_code:"xxxxx",//error_code有内容时候，代表有错误，否则表示保存成功.error_code分为以下几种
            //(-200)参数错误, base64字符串转换成图片失败
            //(-201)下载成功，图片格式不正确
            //(-202)下载图片失败
            //(-203)保存到相册失败
            //(-301)相册未授权，错误提示由native弹对话框处理， 6.0加入
        }
        app.callback(json_obj);
     
     */
    app_save_photo:function(photoUrl, photoBase64String, imageName) {
        if (!Internal.isSupportAPIWithVersion("5.7")) {
            return;
        }
        var params = {};
        if (!photoUrl) {
            photoUrl = "";
        }
        if (!photoBase64String) {
            photoBase64String = "";
        }
        if (!imageName) {
            imageName = "";
        }

        params.photoUrl = photoUrl;
        params.photoBase64String = photoBase64String;
        params.imageName = imageName;
        var paramString = Internal.makeParamString("Util", "savePhoto", params, "save_photo");

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Util_a.savePhoto(paramString);
        } 
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description H5页面加载完成，通知native app，app会隐藏loading界面
     * @brief H5页面加载完成，通知native app
     * @method app_h5_page_finish_loading
     * @since v5.8
     * @author jimzhao
     * @example

       //H5页面加载完成后，通知native隐藏loading界面
       
       CtripUtil.app_h5_page_finish_loading();     
       
     */
    app_h5_page_finish_loading:function() {
        if (!Internal.isSupportAPIWithVersion("5.8")) {
            return;
        }

        var paramString = Internal.makeParamString("Util", "h5PageFinishLoading", null, "h5_page_finish_loading");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Util_a.h5PageFinishLoading(paramString);
        } 
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        } 
    }

};

/**
 * @class CtripUser
 * @description 用户相关类
 * @brief 用户相关类
 */
var CtripUser = {

    /**
     * @description 会员登录,native未登录时候，会显示会员登录界面，native会员已登录，直接完成，返回登录的用户信息
     * @brief 会员登录
     * @since 5.2
     * @method app_member_login 
     * @param {Boolean} isShowNonMemberLogin 是否现实非会员登录入， 5.7加入，默认不显示
     * @author jimzhao
     * @example 

     CtripUser.app_member_login(false);
     //调用完成后，H5会收到如下数据
     var userInfo = {
        "timeout":"2013/09/12",
        "data":
        {
          "LoginName":"wwwwww",
          "UserID":"21634352BAC43044380A7807B0699491",
          "IsNonUser":false,
          "UserName":"测试",
          "Mobile":"13845612110",
          "LoginToken":"",
          "LoginCode":0,
          "LoginErrMsg":"登录成功！",
          "Address":"",
          "Birthday":"19841010",
          "Experience":1453333973000,//微妙timestamp
          "Gender":1,
          "PostCode":"111111",
          "VipGrade":30,
          "VipGradeRemark":"钻石贵宾",
          "Email":"wang_peng@163.com",
          "ExpiredTime":"2013-09-12",
          "Auth":"079E643955C63839FF4617743DA20CFD93AFCAF6A82803A6F3ABD9219",
          "IsRemember":0,
          "BindMobile":18688888888
        },  
        "timeby":1
    }

    var json_obj =
    {
        tagname:"member_login",
        param:userInfo,
    }
    app.callback(json_obj);
     
     */
    app_member_login:function(isShowNonMemberLogin) {
        var params = {};
        params.isShowNonMemberLogin = isShowNonMemberLogin;
        var paramString =  Internal.makeParamString("User", "memberLogin", params, 'member_login');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.User_a.memberLogin(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
      * @description 非会员登录
      * @brief 非会员登录
      * @since 5.2
      * @method app_non_member_login
      * @author jimzhao
      * @see app_member_login
      * @example 

      CtripUser.app_non_member_login();
      //调用后，H5会收到native回调的数据
      //回调的数据格式参考app_member_login()
     var userInfo = {
        "timeout":"2013/09/12",
        "data":
        {
          "LoginName":"wwwwww",
          "UserID":"21634352BAC43044380A7807B0699491",
          "IsNonUser":false,
          "UserName":"测试",
          "Mobile":"13845612110",
          "LoginToken":"",
          "LoginCode":0,
          "LoginErrMsg":"登录成功！",
          "Address":"",
          "Birthday":"19841010",
          "Experience":1453333973000,//微妙timestamp
          "Gender":1,
          "PostCode":"111111",
          "VipGrade":30,
          "VipGradeRemark":"钻石贵宾",
          "Email":"wang_peng@163.com",
          "ExpiredTime":"2013-09-12",
          "Auth":"079E643955C63839FF4617743DA20CFD93AFCAF6A82803A6F3ABD9219",
          "IsRemember":0,
          "BindMobile":18688888888
        },  
        "timeby":1
        }

        var json_obj =
        {
            tagname:"member_login",
            param:userInfo,
        }
        app.callback(json_obj);
      
      */
    app_non_member_login:function() {
        var paramString =  Internal.makeParamString("User", "nonMemberLogin", null, 'non_member_login');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.User_a.nonMemberLogin(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

 
     /**
      * @description 会员自动登录,对于已经在native登陆的用户，app会通过调用callback回传登录数据，H5页面需要处理用户信息， 不显示输入用户名密码界面
      * @brief 会员自动登录
      * @since 5.2
      * @method app_member_auto_login
      * @author jimzhao
      * @see app_member_login
      * @example 

      CtripUser.app_member_auto_login();
      //调用后，H5会收到native回调的数据
      //回调的数据格式参考app_member_login()
     var userInfo = {
        "timeout":"2013/09/12",
        "data":
        {
          "LoginName":"wwwwww",
          "UserID":"21634352BAC43044380A7807B0699491",
          "IsNonUser":false,
          "UserName":"测试",
          "Mobile":"13845612110",
          "LoginToken":"",
          "LoginCode":0,
          "LoginErrMsg":"登录成功！",
          "Address":"",
          "Birthday":"19841010",
          "Experience":1453333973000,//微妙timestamp
          "Gender":1,
          "PostCode":"111111",
          "VipGrade":30,
          "VipGradeRemark":"钻石贵宾",
          "Email":"wang_peng@163.com",
          "ExpiredTime":"2013-09-12",
          "Auth":"079E643955C63839FF4617743DA20CFD93AFCAF6A82803A6F3ABD9219",
          "IsRemember":0,
          "BindMobile":18688888888
        },  
        "timeby":1
        }

        var json_obj =
        {
            tagname:"member_login",
            param:userInfo,
        }
        app.callback(json_obj);
      
      */
    app_member_auto_login:function() {
        var paramString =  Internal.makeParamString("User", "memberAutoLogin", null, 'member_auto_login');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.User_a.memberAutoLogin(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },


     /**
      * @description 用户注册
      * @brief 用户注册
      * @since 5.2
      * @method app_member_register
      * @author jimzhao
      * @see app_member_login
      * @example 

      CtripUser.app_member_register();
      //调用后，H5会收到native回调的数据
      //回调的数据格式参考app_member_login()
     var userInfo = {
        "timeout":"2013/09/12",
        "data":
        {
          "LoginName":"wwwwww",
          "UserID":"21634352BAC43044380A7807B0699491",
          "IsNonUser":false,
          "UserName":"测试",
          "Mobile":"13845612110",
          "LoginToken":"",
          "LoginCode":0,
          "LoginErrMsg":"登录成功！",
          "Address":"",
          "Birthday":"19841010",
          "Experience":1453333973000,//微妙timestamp
          "Gender":1,
          "PostCode":"111111",
          "VipGrade":30,
          "VipGradeRemark":"钻石贵宾",
          "Email":"wang_peng@163.com",
          "ExpiredTime":"2013-09-12",
          "Auth":"079E643955C63839FF4617743DA20CFD93AFCAF6A82803A6F3ABD9219",
          "IsRemember":0,
          "BindMobile":18688888888
        },  
        "timeby":1
        }

        var json_obj =
        {
            tagname:"member_login",
            param:userInfo,
        }
        app.callback(json_obj);
          
      */
    app_member_register:function() {
        var paramString = Internal.makeParamString("User", "memberRegister", null, 'member_register');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.User_a.memberRegister(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },


     /**
     * @description H5完成注册，将注册信用户息告知Native，native做登录
     * @brief H5完成注册，通知Native登录
     * @method app_finished_register
     * @param {JSON} userInfoJson 注册完成的用户信息
     * @since v5.7
     * @author jimzhao
     * @example 
        
        var userInfo = {};
        userInfo.userID = "xxxxxx";
        userInfo.phone="13900000000";
        userInfo.password="asdzxc";

        CtripUser.app_finished_register(userInfo)

     */
    app_finished_register:function(userInfoJson) {
        if (!Internal.isSupportAPIWithVersion("5.7")) {
            return;
        }

        if (!userInfoJson) {
            userInfoJson = "";
        }

        var params = {};
        params.userInfoJson = userInfoJson;

        var paramString = Internal.makeParamString("User", "finishedRegister", params, "finished_register");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.User_a.finishedRegister(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description H5登陆完成，将注册信息告知Native，native写入memory，修改登录态
     * @brief H5完成登录，通知Native修改登录态
     * @method app_finished_login
     * @param {JSON} userInfoJson 登录完成，服务器返回的用户信息
     * @since v5.8
     * @author jimzhao
     * @example 
                
        //.... json对象为服务器返回的用户信息对象
        var userModel = {};
        userModel.UserID = "132220000";
        userModel.UserName = "U2SB";
        userModel.Mobilephone = "13899999999";
        userModel.BindedMobilePhone = "13899999999";
        userModel.Telephone = "021-9999999"
        userModel.Gender =  0;
        userModel.Address = "火星，上海，月球";
        userModel.PostCode = "210000";
        userModel.Birthday = "1900-08-01";
        userModel.Email =  "US2B@gmail.com";
        userModel.Experience = 1344;
        userModel.VipGrade = 32;//
        userModel.VipGradeRemark = "蓝宝石";
        userModel.SignUpdate = "1911-09-09";
        userModel.Authentication = "2cxesescvdsfew32w3sxcq23";
        userModel.UserIconList = [];

        CtripUser.app_finished_login(userInfo)

     */
    app_finished_login:function(userInfoJson) {
        if (!Internal.isSupportAPIWithVersion("5.8")) {
            return;
        }
        if (!userInfoJson) {
            userInfoJson = "";
        }

        var params = {};
        params.userInfoJson = userInfoJson;

        var paramString = Internal.makeParamString("User", "finishedLogin", params, "finished_login");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.User_a.finishedLogin(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }

};


/**
 * @class CtripEncrypt
 * @description 加解密/HASH/编码相关类
 * @brief 提供给H5试用，通用加解密/HASH/编码相关类
 */
 var CtripEncrypt = {
    /**
      * @description  base64 UTF8编码
      * @brief base64 UTF8编码
      * @since 5.4
      * @method app_base64_encode
      * @param {String} toIncodeString 需要做base64 encode的字符串
      * @author jimzhao
      * @example 

      CtripEncrypt.app_base64_encode("xxxxxx");
      //调用后，H5会收到native回调的数据
        var json_obj =
        {
            tagname:"base64_encode",
            param:
            {
                inString:"xxxxxx",
                encodedString:"eHh4eHh4",
            },
        }
        app.callback(json_obj);
          
      */
    app_base64_encode:function(toIncodeString) {
        if (!Internal.isSupportAPIWithVersion("5.3")) {
            return;
        }

        if (!toIncodeString) {
            toIncodeString = "";
        }

        params = {};
        params.toIncodeString = toIncodeString;

        var paramString = Internal.makeParamString("Encrypt", "base64Encode", params, 'base64_encode');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Encrypt_a.base64Encode(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
      * @description MD5 哈希算法，长度32，大写
      * @brief MD5 哈希算法
      * @since 5.4
      * @method app_md5_hash
      * @param {String} inString 需要做MD5 哈希的字符串
      * @author jimzhao
      * @example 

      CtripEncrypt.app_md5_hash("abcdxxxx");
      //调用后，H5会收到native回调的数据
        var json_obj =
        {
            tagname:"md5_hash",
            param:
            {   
                inString:"abcdxxxx"
                outString:"FDA820BA864415E2451BE1C67F1F304A",
            },
        }
        app.callback(json_obj);
          
      */
    app_md5_hash:function(inString) {
        if (!Internal.isSupportAPIWithVersion("5.5")) {
            return;
        }

        if (!inString) {
            inString = "";
        }

        params = {};
        params.inString = inString;

        var paramString = Internal.makeParamString("Encrypt", "md5Hash", params, 'md5_hash');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Encrypt_a.md5Hash(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
      * @description Ctrip私有加解密算法
      * @brief Ctrip私有加解密算法
      * @since 5.5
      * @method app_ctrip_encrypt
      * @param {String} inString 需要做加解密的字符串
      * @param {String} encType 加解密类型，加密为1， 解密为2，其它不处理
      * @author jimzhao
      * @example 

      CtripEncrypt.app_ctrip_encrypt("abcdxxxx",1);
      //调用后，H5会收到native回调的数据
        var json_obj =
        {
            tagname:"ctrip_encrypt",
            param:
            {
                inString:"abcdxxxx",
                outString:"ABScdXkYZunwXVF5kQpffnY+oL/MFmJGkn8ra8Ab5cI=",
                encType:1
            },
        }
        app.callback(json_obj);
          
      */
    app_ctrip_encrypt:function(inString, encType) {
        if (!Internal.isSupportAPIWithVersion("5.5")) {
            return;
        }
        if (!inString) {
            inString = "";
        }

        params = {};
        params.inString = inString;
        params.encType = encType;
        var paramString = Internal.makeParamString("Encrypt", "ctripEncrypt", params, 'ctrip_encrypt');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Encrypt_a.ctripEncrypt(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }

 };


/**
 * @class CtripPay
 * @description Ctrip相关支付控件
 * @brief 提供Ctrip业务相关的支付功能
 */
 var CtripPay = {

     /**
      * @description  检查支付相关App安装情况
      * @brief  检查支付相关App安装情况
      * @since 5.4
      * @method app_check_pay_app_install_status
      * @author jimzhao
      * @example 

      CtripPay.app_check_pay_app_install_status();
      //调用后，H5会收到native回调的数据
        var json_obj =
        {
            tagname:"check_pay_app_install_status",
            param:
            {
                platform:"iOS", //Android
                weixinPay:true,
                aliWalet:true,
                aliQuickPay:true,
            },
        }

        app.callback(json_obj);
      */
    app_check_pay_app_install_status:function() {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        var paramString = Internal.makeParamString("Pay","checkPayAppInstallStatus",null,'check_pay_app_install_status');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Pay_a.checkPayAppInstallStatus(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
      * @description  根据URL打开支付App
      * @brief  根据URL打开支付App
      * @param {String} payAppName 支付App的URL，暂固定为以下4个， aliWalet/aliQuickPay/wapAliPay/weixinPay(微信支付暂未支持)
      * @param {String} payMeta 服务器返回的支付配置信息，ali相关为URL，微信支付为xml
      * @param {String} successRelativeURL 支付成功跳转的URL
      * @param {String} detailRelativeURL  支付失败或者支付
      * @since 5.4
      * @method app_open_pay_app_by_url
      * @author jimzhao
      * @example 

      CtripPay.app_open_pay_app_by_url("aliWalet","alipay://orderId=123","car/paySuccess.html", "car/payDetail.html");
      //调用后，App会做相应的页面跳转

      */
    app_open_pay_app_by_url:function(payAppName, payMeta, successRelativeURL, detailRelativeURL) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!payMeta) {
            payMeta = "";
        }
        
        if (!payAppName) {
            payAppName = "";
        }

        if (!successRelativeURL) {
            successRelativeURL = "";
        }

        if (!detailRelativeURL) {
            detailRelativeURL = "";
        }

        var params = {};
        params.payMeta = payMeta;
        params.payAppName = payAppName;
        params.successRelativeURL = successRelativeURL;
        params.detailRelativeURL = detailRelativeURL;

        var paramString = Internal.makeParamString("Pay","openPayAppByURL",params,'open_pay_app_by_url');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Pay_a.openPayAppByURL(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
      * @description  用于hybrid bu进入支付时统一调用，用于读取native 中保存的payment_route_[bustype]
      * @brief  用于hybrid bu进入支付时统一调用，用于读取native 中保存的payment_route_[bustype]
      * @param {Object} paymentParam bu传递进入支付页面的参数集合{path: "payment2",param: n,callback: "PaymentCallback"}
 
      * @method app_call_pay
      * @author jianggd@Ctrip.com
      * @example
 
      CtripPay.app_call_pay({path: "payment2",param: n,callback: "PaymentCallback"});
      //调用后，会取到对应bu的跳转路由
    **/
    app_call_pay: function(paymentParam) {
        paymentParam = paymentParam || {};
        paymentParam.param = paymentParam.param || "";
        if(typeof(paymentParam.param) != "string"){
            return;
        }
        var _urlParam = paymentParam.param.split("?")[1] || "";
        var _urlDic = _urlParam.split("&") || [];
        var _bustype = "";
 
        for(var i = 0; i < _urlDic.length; i++){
           var _res = _urlDic[i].split("=") || [];
           var _key = _res[0];
           var _value = _res[1];
           if(_key === "bustype"){
               _bustype = _value;
               break;
           }
        }
 
        paymentParam.names = ["payment_route_" + _bustype];
 
        var paramString = Internal.makeParamString("Pay","callPay", paymentParam, "call_pay");
   
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else {
            if (Internal.isAndroid) {
                window.Pay_a.callPay(paramString);
            } else {
                if (Internal.isWinOS) {
                    Internal.callWin8App(paramString)
                }
            }
        }
    }

 };

/**
 * @class CtripPipe
 * @description App给H5提供的通讯管道
 * @brief 提供标准HTTP和H5管道服务
 */
var CtripPipe = {

    /**
     * @description H5通过App发送服务
     * @brief H5通过App发送服务
     * @method app_send_HTTP_pipe_request
     * @param {String} baseURL HTTP请求发送的URL地址     
     * @param {String} path HTTP请求发送的URL的路径
     * @param {String} method HTTP请求方式GET/POST
     * @param {String} header HTTP头，JSON字符串格式key/value，cookie作为一个key存储再HEADER内部
     * @param {Array}  parameters key=value形式的字符串数组,请做好参数的Encode，app端只负责拼接
     * @param {Boolean}  isIgnoreHTTPSCertification 是否忽略HTTPS证书
     * @param {String} sequenceId 发送服务的序列号，随机生存即可
     * @since v5.4
     * @author jimzhao
     * @example 

     //GET http://www.baidu.com/s?wd=good+day&rsv_bp=0&ch=&tn=baidu&bar=&rsv_spt=3&ie=utf-8&rsv_sug3=4&rsv_sug4=469&rsv_sug1=2&rsv_sug2=0&inputT=166
    
      var paramArr = new Array();
      paramArr[0]="wd=good+day";
      paramArr[1]="rsv_bp=0";
      paramArr[2]="ch=";
      paramArr[3]="tn=";
      paramArr[4]="baidu=";
      paramArr[5]="bar=";
      paramArr[6]="rsv_spt=3";
      paramArr[7]="ie=utf-8";
      paramArr[8]="rsv_sug3=4";
      paramArr[9]="rsv_sug4=469";
      //。。。。其它参数依次类推，请做好参数的Encode，app端只负责拼接

      CtripPipe.app_send_HTTP_pipe_request("http://www.baidu.com", "/s","GET",null,paramArr, false, "13222222");

     //调用后，H5会收到native回调的数据
        var json_obj =
        {
            tagname:"send_http_pipe_request",
            param:
            {
                responseString:"eHh4eHh4",
                responseCookie : {
                     "BAIDUID":"2959D035E2F5D7C979687934D558DCD3:FG=1",
                     "BDSVRTM":10,
                     "BD_CK_SAM":1,
                     "H_PS_PSSID":"1429_5225_5287_5722_5848_4261_5830_4759_5659_5857"
                },

                sequenceId:"13222222"
            },
        }
        app.callback(json_obj);

     */
    app_send_HTTP_pipe_request:function(baseURL, path, method, header, parameters, isIgnoreHTTPSCertification, sequenceId) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!baseURL) {
            baseURL = "";
        }
        if (!path) {
            path = "";
        }
        if (!method) {
            method = "";
        }
        if (!header) {
            header = "";
        }
        if (!parameters) {
            parameters = "";
        }

        if (!sequenceId) {
            sequenceId = "";
        }
        var params = {};
        params.baseURL = baseURL;
        params.path = path;
        params.method = method;
        params.header = header;
        params.parameters = parameters;
        params.sequenceId = sequenceId;
        params.isIgnoreHTTPSCertification = isIgnoreHTTPSCertification;

        var paramString = Internal.makeParamString("Pipe", "sendHTTPPipeRequest", params, 'send_http_pipe_request');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Pipe_a.sendHTTPPipeRequest(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }

    },

     /**
     * @description 根据发送的sequenceId，终止正在发送的HTTP请求
     * @brief 终止正在发送的HTTP请求
     * @method app_abort_HTTP_pipe_request
     * @param {String} sequenceId 发送服务的序列号，随机生存即可
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripPipe.app_abort_HTTP_pipe_request("13523333333");

     */
    app_abort_HTTP_pipe_request:function(sequenceId) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!sequenceId) {
            sequenceId = "";
        }

        var params = {};
        params.sequenceId = sequenceId;
        var paramString = Internal.makeParamString("Pipe", "abortHTTPRequest", params, 'abort_http_pipe_request');
        
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Pipe_a.abortHTTPRequest(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description H5通过App发送服务
     * @brief H5通过App发送服务
     * @method app_send_H5_pipe_request
     * @param {String} serviceCode 需要发送服务的服务号
     * @param {String} header 服务的header
     * @param {String} data 服务所需要的数据部分，各个服务都不同
     * @param {String} sequenceId 发送服务的序列号，随机生存即可
     * @param {int} pipeType 管道类型，因mobileServer原因，5.4的管道是支付专用，默认是0=支付管道，1＝公共管道
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripUtil.app_send_H5_pipe_request("9500001", "H5Agent","{}","13523333333");
     //调用后，H5会收到native回调的数据

        //成功 
        var json_obj =
        {
            tagname:"send_h5_pipe_request",
            param:
            {
                sequenceId:"13523333333",
                resultMessage:"eHh4eHh4",
                resultHead:"eHh4eHh4",
                resultBody:"eHh4eHh4",
                result:1,
            },
        }

        //失败
        //  code定义，返回给Hybrid时候，为负数，iOS/Android －200开始，递减
        //  CONN_FAIL_TYPE_NO_FAIL = 200------------------正确，无错误
        //  CONN_FAIL_TYPE_GETCONN_UNKOWN = 201-----------从连接池获取长连接失败
        //  CONN_FAIL_TYPE_GETIP = 202--------------------获取IP地址失败
        //  CONN_FAIL_TYPE_CONNECT = 203------------------创建连接失败
        //  CONN_FAIL_TYPE_SEND_DATA = 204----------------发送数据失败
        //  CONN_FAIL_TYPE_RECEIVE_LENGTH = 205-----------读报文头失败
        //  CONN_FAIL_TYPE_RECEIVE_BODY = 206-------------读报文体失败
        //  CONN_FAIL_TYPE_BUILE_REQUESTDATAFAIL = 207----创建请求报文失败
        //  CONN_FAIL_TYPE_BUILE_RESPONSEDATAFAIL = 208---解析返回报文失败
        //  CONN_FAIL_TYPE_SERIALIZE_REQUEST_FAIL = 209---序列化请求报文失败
        //  CONN_FAIL_TYPE_SERIALIZE_RESPONSE_FAIL = 210--序列化返回报文失败
        //  CONN_FAIL_TYPE_RESPONSE_REPEAT = 211----------服务端下发需要重试
        var json_obj =
        {
            tagname:"send_h5_pipe_request",
            param:
            {
                sequenceId:"13523333333",
                errorInformation:"抱歉！加载失败，请重试(-203)", //括号内的code为errorCode，5.8.1加入
                serverErrorCode:"eHh4eHh4",
            },
        }
        app.callback(json_obj);

     */
    app_send_H5_pipe_request:function(serviceCode,header,data, sequenceId, pipeType) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!serviceCode) {
            serviceCode = "";
        }
        if (!header) {
            header = "";
        }
        if (!data) {
            data = "";
        }
        if (!sequenceId) {
            sequenceId = "";
        }

        if (!pipeType) {
            pipeType = 0;
        }

        var params = {};
        params.serviceCode = serviceCode;
        params.header = header;
        params.data = data;
        params.sequenceId = sequenceId;
        params.pipeType = pipeType;

        var paramString = Internal.makeParamString("Pipe", "sendH5PipeRequest", params, 'send_h5_pipe_request');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Pipe_a.sendH5PipeRequest(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }
};



/**
 * @class CtripSumSungWallet
 * @description 三星钱包相关API
 * @brief 三星钱包相关API
 */
var CtripSumSungWallet = {

     /**
     * @description 检查ticket是否在三星钱包app中
     * @brief 检查ticket是否在三星钱包app中
     * @method app_check_ticket_in_samsung_wallet
     * @param {String} ticketID ticket的ID，服务器返回
     * @since v5.3.2
     * @author jimzhao
     * @example 
     * 
     * CtripSumSungWallet.app_check_ticket_in_samsung_wallet("ID123333");

       //调用之后会收到
        var json_obj = {
            tagname : "check_ticket_in_samsung_wallet",
            param : {
                insInSamSungWallet: false, //true
            }
        }
        
        app.callback(json_obj);
     */
    app_check_ticket_in_samsung_wallet:function(ticketID) {
        if (!ticketID) {
            ticketID = "";
        }

        var param = {};
        param.ticketID = ticketID;

        paramString = Internal.makeParamString("SamSungWallet", "checkTicketInSamSungWallet", param, 'check_ticket_in_samsung_wallet');
        if (Internal.isAndroid) {
            window.SamSungWallet_a.checkTicketInSamSungWallet(paramString);
        }
    },

     /**
     * @description 到三星钱包中下载ticket
     * @brief 到三星钱包中下载ticket
     * @method app_download_ticket_in_samsung_wallet
     * @param {String} ticketID ticket的ID，服务器返回
     * @since v5.32
     * @author jimzhao
     * @example 
     * 
     * CtripSumSungWallet.app_download_ticket_in_samsung_wallet("ID123333");
    
        //调用之后会收到
        var json_obj = {
            tagname : "download_ticket_in_samsung_wallet",
            param : {
                isDownloadSuccess: false, //true，下载成功的时候没有errorInfo
                errorInfo: "网络故障", 
            }
        }

        app.callback(json_obj);
     */
    app_download_ticket_in_samsung_wallet:function(ticketID) {
        if (!ticketID) {
            ticketID = "";
        }

        var param = {};
        param.ticketID = ticketID;

        paramString = Internal.makeParamString("SamSungWallet", "downloadTicketInSamSungWallet", param, 'download_ticket_in_samsung_wallet');
        if (Internal.isAndroid) {
            window.SamSungWallet_a.downloadTicketInSamSungWallet(paramString);
        }
    },

     /**
     * @description 在三星钱包app中查看Ticket
     * @brief 在三星钱包app中查看Ticket
     * @method app_show_ticket_in_samsung_wallet
     * @param {String} ticketID ticket的ID，服务器返回
     * @since v5.32
     * @author jimzhao
     * @example 
     
      CtripSumSungWallet.app_show_ticket_in_samsung_wallet("ID123333");

     //调用之后会收到
        var json_obj = {
            tagname : "show_ticket_in_samsung_wallet",
            param : {
                errorInfo: "Ticket ID不存在", //true
            }
        }
        
        app.callback(json_obj);
     */
    app_show_ticket_in_samsung_wallet:function(ticketID) {
        if (!ticketID) {
            ticketID = "";
        }

        var param = {};
        param.ticketID = ticketID;

        paramString = Internal.makeParamString("SamSungWallet", "showTicketInSamSungWallet", param, 'show_ticket_in_samsung_wallet');
        if (Internal.isAndroid) {
            window.SamSungWallet_a.showTicketInSamSungWallet(paramString);
        }
    }

};

/**
 * @class CtripFile
 * @description 文件IO操作相关API
 * @brief 文件IO操作相关API
 */
var CtripFile  = {
    /**
     * @description 获取当前web页面的sandbox目录，在webapp/wb_cache/xxxx/目录下xxxx即为当前sandbox的名字
     * @brief 获取当前web页面的sandbox目录
     * @method app_get_current_sandbox_name
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_get_current_sandbox_name();

     //调用之后会收到
        var json_obj = {
            tagname : "get_current_sandbox_name",
            param : {
                sandboxName: "car", 
            }
        }
        
        app.callback(json_obj);
     */
    app_get_current_sandbox_name:function() {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        var params = {};
        params.pageUrl = window.location.href;

        var paramString = Internal.makeParamString("File", "getCurrentSandboxName", params, 'get_current_sandbox_name');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.File_a.getCurrentSandboxName(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },
    
     /**
     * @description 文本写入文件中，UTF8编码。可以指定文件名，或者相对路径
     * @brief 写文本到本地文件
     * @method app_write_text_to_file
     * @param {String} text 需要写入文件的文本内容
     * @param {String} fileName 写入的文件路径
     * @param {String} relativeFilePath 写入的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @param {BOOL} isAppend 是否是将当前文件append到已有文件
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_write_text_to_file("Hello,世界", "log.txt", null, false); //文件存储在本地的/webapp/wb_cache/car/log.txt
      CtripFile.app_write_text_to_file("Hello2,世界", null, /car/mydir/log.txt, false); //文件存储在本地的/webapp/wb_cache/car/mydir/log.txt

     //调用之后会收到
        var json_obj = {
            tagname : "write_text_to_file",
            param : {
                isSuccess: true, 
            }
        }
        
        app.callback(json_obj);
     */
    app_write_text_to_file:function(text, fileName, relativeFilePath, isAppend) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!text) {
            text = "";
        }
        if (!fileName) {
            fileName = "";
        }
        if (!relativeFilePath) {
            relativeFilePath = "";
        }
        var params = {};
        params.pageUrl = window.location.href;
        params.text = text;
        params.fileName = fileName;
        params.relativeFilePath = relativeFilePath;
        params.isAppend = isAppend;
        var paramString = Internal.makeParamString("File", "writeTextToFile", params, 'write_text_to_file');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.File_a.writeTextToFile(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 删除文件/目录。可以指定文件名，或者相对路径
     * @brief 删除文件/目录
     * @method app_delete_file
     * @param {String} fileName 需要删除的文件路径
     * @param {String} relativeFilePath 需要删除的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_delete_file("log.txt", null); //删除文件/webapp/wb_cache/car/log.txt
      CtripFile.app_delete_file(null,"/car/mydir/log.txt"; //删除文件/webapp/wb_cache/car/mydir/log.txt

     //调用之后会收到
        var json_obj = {
            tagname : "delete_file",
            param : {
                isSuccess: true, 
            }
        }
        
        app.callback(json_obj);
     */    
    app_delete_file:function(fileName, relativeFilePath) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!fileName) {
            fileName = "";
        }
        if (!relativeFilePath) {
            relativeFilePath = "";
        }

        var params = {};
        params.fileName = fileName;
        params.relativeFilePath = relativeFilePath;
        params.pageUrl = window.location.href;
        var paramString = Internal.makeParamString("File", "deleteFile", params, 'delete_file');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.File_a.deleteFile(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },
    
    /**
     * @description 读取文本文件内容，UTF-8编码。可以指定文件名，或者相对路径
     * @brief 读取文本文件内容
     * @method app_read_text_from_file
     * @param {String} fileName 需要读取内容的文件路径
     * @param {String} relativeFilePath 需要读取内容的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_read_text_from_file("log.txt", null); //从文件/webapp/wb_cache/car/log.txt读取内容
      CtripFile.app_read_text_from_file(null,"/car/mydir/log.txt"; //从文件/webapp/wb_cache/car/mydir/log.txt读取内容

     //调用之后会收到
        var json_obj = {
            tagname : "read_text_from_file",
            param : {
                text: "Hello,世界", 
            }
        }
        
        app.callback(json_obj);
     */ 
    app_read_text_from_file:function(fileName, relativeFilePath) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!fileName) {
            fileName = "";
        }
        if (!relativeFilePath) {
            relativeFilePath = "";
        }

        var params = {};
        params.fileName = fileName;
        params.pageUrl = window.location.href;
        params.relativeFilePath = relativeFilePath;
        var paramString = Internal.makeParamString("File", "readTextFromFile", params, 'read_text_from_file');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.File_a.readTextFromFile(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },
    
    /**
     * @description 读取文件大小。可以指定文件名，或者相对路径
     * @brief 读取文件大小
     * @method app_get_file_size
     * @param {String} fileName 需要读取文件大小的文件路径
     * @param {String} relativeFilePath 需要读取文件大小的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_get_file_size("log.txt", null); //从文件/webapp/wb_cache/car/log.txt读取内容
      CtripFile.app_get_file_size(null,"/car/mydir/log.txt"; //从文件/webapp/wb_cache/car/mydir/log.txt读取内容

     //调用之后会收到
        var json_obj = {
            tagname : "get_file_size",
            param : {
                fileSize: 8 
            }
        }
        
        app.callback(json_obj);
     */ 
    app_get_file_size:function(fileName, relativeFilePath) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!fileName) {
            fileName = "";
        }
        if (!relativeFilePath) {
            relativeFilePath = "";
        }

        var params = {};
        params.fileName = fileName;
        params.relativeFilePath = relativeFilePath;
        params.pageUrl = window.location.href;
        var paramString = Internal.makeParamString("File", "getFileSize", params, 'get_file_size');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.File_a.getFileSize(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },
    
      /**
     * @description 检查文件是否存在。可以指定文件名，或者相对路径
     * @brief 检查文件是否存在
     * @method app_check_file_exist
     * @param {String} fileName 需要读取文件大小的文件路径
     * @param {String} relativeFilePath 需要读取文件大小的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_check_file_exist("log.txt", null); //从文件/webapp/wb_cache/car/log.txt读取内容
      CtripFile.app_check_file_exist(null,"/car/mydir/log.txt"; //从文件/webapp/wb_cache/car/mydir/log.txt读取内容

     //调用之后会收到
        var json_obj = {
            tagname : "check_file_exist",
            param : {
                isExist: true 
            }
        }
        
        app.callback(json_obj);
     */ 
    app_check_file_exist:function(fileName, relativeFilePath) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!fileName) {
            fileName = "";
        }
        if (!relativeFilePath) {
            relativeFilePath = "";
        }

        var params = {};
        params.fileName = fileName;
        params.relativeFilePath = relativeFilePath;
        params.pageUrl = window.location.href;
        var paramString = Internal.makeParamString("File", "checkFileExist", params, 'check_file_exist');
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.File_a.checkFileExist(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },
    
    /**
     * @description 创建文件夹。可以指定文件名，或者相对路径
     * @brief 创建文件夹
     * @method app_make_dir
     * @param {String} dirName 需要创建的文件夹路径
     * @param {String} relativeDirPath 需要创建的文件夹相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @since v5.4
     * @author jimzhao
     * @example 
     
      CtripFile.app_make_dir("mydir2", null); //创建文件夹/webapp/wb_cache/car/mydir2/
      CtripFile.app_make_dir(null,"/car/mydir/innerDir"; //创建文件夹/webapp/wb_cache/car/mydir/innerDir/

     //调用之后会收到
        var json_obj = {
            tagname : "make_dir",
            param : {
                isSuccess: true 
            }
        }
        
        app.callback(json_obj);
     */ 
    app_make_dir:function(dirName,relativeDirPath) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }

        if (!dirName) {
            dirName = "";
        }
        if (!relativeDirPath) {
            relativeDirPath = "";
        }

        var params = {};
        params.dirName = dirName;
        params.pageUrl = window.location.href;
        params.relativeDirPath = relativeDirPath;

        var paramString = Internal.makeParamString("File", "makeDir", params, 'make_dir');

         if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.File_a.makeDir(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }
    
};

/**
 * @class CtripBar
 * @description H5页面顶部导航栏和底部工具栏的控制
 * @brief H5页面顶部/底部导航栏控制
 */
var CtripBar = {
     /**
     * @description 刷新顶部条按钮和文字
     * @brief 刷新顶部条按钮和文字
     * @param {String} nav_bar_config_json 顶部条配置json串
     * @method app_refresh_nav_bar
     * @author jimzhao
     * @since v5.2
     * @example

        //导航栏总共分为3部分:
        1.左侧，返回按钮，不能修改; 

        2.中间title，可以自定义，样式总共3种;
            a.标题[1行或者2行subtitle]；key=center;
           center:[
                {
                    "tagname": "title", 
                    "value":"携程" //标题文字
                },
                {
                    "tagname":"subtitle",//子标题的tagname必须为subtitle
                     value:"上海到北京", //子标题文字
                }
            ],
            b.带事件的标题；key=centerButtons;
            centerButtons:[
                {
                    "tagname": "cityChoose",  //点击标题回调H5的tagname
                    "value":"上海",  //标题文字
                    "a_icon":"icon_arrowx", //标题文字后面的按钮图片名，for android @deprecated
                    "i_icon":"icon_arrowx.png", //标题文字后面的按钮图片名，for iOS @deprecated
                    "imagePath":"car/res/logo.png", //标题文字后面的按钮图片名，图片路径，相对于业务模块的路径，比如car/res/logo.png， v5.8开始支持
                    "pressedImagePath":"car/res/logo.png"  //标题文字后面的按钮图片名，选中状态图片路径，相对于业务模块的路径，比如car/res/logo.png， v5.8开始支持
                }
            ], 

        3.右侧按钮,key=right, 可以自定义，样式总共3种， 
            A.1个文字按钮;
            B.1个图片按钮；
            C.2个图片按钮；
            单个右侧按钮样式的定义格式为
            right:[{
                tagname:"xxxx",  //点击之后 callback给H5的事件名字,
                value:"btn_title", //按钮上的文字
                imagePath:"car/res/logo.png",  //按钮上的图片，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                pressedImagePath:"car/res/logo.png" //按钮上的图片选中的效果图，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
            }]
           

        4.跟多按钮,key=moreMenus 5.9新增 多个menu的配置
            moreMenus:[
                {
                    tagname:"xxxx",  //点击之后 callback给H5的事件名字,
                    value:"btn_title", //按钮上的文字
                    imagePath:"car/res/logo.png",  //按钮上的图片，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                    pressedImagePath:"car/res/logo.png" //按钮上的图片选中的效果图，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                }

                {
                    tagname:"xxxx",  //点击之后 callback给H5的事件名字,
                    value:"btn_title", //按钮上的文字
                    imagePath:"car/res/logo.png",  //按钮上的图片，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                    pressedImagePath:"car/res/logo.png" //按钮上的图片选中的效果图，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                }

                {
                    tagname:"xxxx",  //点击之后 callback给H5的事件名字,
                    value:"btn_title", //按钮上的文字
                    imagePath:"car/res/logo.png",  //按钮上的图片，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                    pressedImagePath:"car/res/logo.png" //按钮上的图片选中的效果图，可以是相对于业务模块的路径，比如 car/res/logo.png， v5.8开始支持
                }

            ]

        5.  app预置tagname定义及说明(hybrid开发人员请避免使用以下预置的tagname)：
            1). tagname=home, 返回app首页，图片，事件 都不需要H5处理；
            2). tagname=call, 拨打呼叫中心，图片，事件 都不需要H5处理；                 @电话CTI统一出口，6.1开始，当前tagname需要，json对象中需要配置businessCode， pageId字段
            3). tagname=phone, 拨打电话，图片-native预置，事件交由H5处理；v5.8开始支持； 
            4). tagname=share, 分享，图片-native预置，事件将会交给H5处理；v5.8开始支持；
            5). tagname=favorite, 收藏，图片-native预置, 事件交给H5处理；v5.8开始支持；
            6). tagname=favorited, 已经收藏，图片-native预置，事件交给H5处理；v5.8开始支持；
            7). tagname=more, 图片，事件 都不需要H5处理；
            8). tagname=more_my_order, 更多菜单-我的订单, 图片-native预置，事件需要H5处理;
            9). tagname=more_message_center, 更多菜单-消息中心, 图片-native预置，事件需要H5处理;
           10). tagname=more_home, 更多菜单-App首页, 图片／事件都由native处理;
           11). tagname-more_my_favorite 更多菜单－我的收藏, 图片-native预置，事件需要H5处理;
           12). tagname-more_share 更多菜单－分享, 图片-native预置，事件需要H5处理;
           13). tagname=search, 搜索，图片有native预置，事件交由H5处理；v5.9开始支持；
           14). tagname=more_phone, 更多菜单－电话，图片有native预置，事件交由H5处理；v5.9开始支持；
           15). tagname=more_share, 更多菜单－分享，图片有native预置，事件交由H5处理；v5.9开始支持；
           16). 其他tagname，图片有H5提供，事件H5处理；

        示例：
        var nav_json = {   
            "right": [{"tagname": "click_tag_name", "value":"Click", "imagePath":"car/res/logo.png", "pressedImagePath":"car/res/logo_pressed.png"}],
            "center": [{"tagname": "title", "value":"携程"},{"tagname":"subtitle", value:"上海到北京"}],
            "centerButtons": [{"tagname": "cityChoose", "value":"上海", "a_icon":"icon_arrowx", "i_icon":"icon_arrowx.png","imagePath":"car/res/logo.png", "pressedImagePath":"car/res/logo_pressed.png"}], 
        }
        
        //拨打电话增加CTI统一出口demo
        var nav_json = {
            "center": [{"tagname": "title", "value":"携程"}],
            "right": [{"tagname": "call", "businessCode":"tour_call_id_0001", "pageId":"tour_page_id_1111"}],//businessCode, pageId为6.1开始识别
        }

        var json_str = JSON.stringify(nav_json);
        CtripBar.app_refresh_nav_bar(json_str);

        //调用完成，顶部条title为携程，右侧有一个按钮，按钮文字为Click，用户点击按钮后，H5页面会收到如下回调
        var cb_json = {tagname:"click_tag_name"};
        app.callback(cb_json);
        //H5页面需要处理tagname为click_tag_name的事件

     */
    app_refresh_nav_bar:function(nav_bar_config_json) {
        if (Internal.isNotEmptyString(nav_bar_config_json)) {
            jsonObj = JSON.parse(nav_bar_config_json);

            jsonObj.service = "NavBar";
            jsonObj.action = "refresh";
            jsonObj.callback_tagname = "refresh_nav_bar";
            
            var paramString = JSON.stringify(jsonObj);

            if (Internal.isIOS) {
                var url = Internal.makeURLWithParam(paramString);
                Internal.loadURL(url);
            }
            else if (Internal.isAndroid) {
                window.NavBar_a.refresh(paramString);
            }
            else if (Internal.isWinOS) {
                Internal.callWin8App(paramString);
            }
        }
    },


      /**
     * @description 设置顶部导航栏隐藏／显示，使用该函数的隐藏顶部栏之后，必须保证页面有离开H5页面的功能，否则用户无法离开，必须要kill掉app。
     * @brief 顶部导航隐藏／显示
     * @param {boolean} isHidden 是否隐藏顶部导航栏
     * @since 5.4
     * @method app_set_navbar_hidden
     * @author jimzhao
     * @example 

     CtripBar.app_set_navbar_hidden(false);
     */
    app_set_navbar_hidden:function(isHidden) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }  

        var params = {};
        params.isHidden = isHidden;
        var paramString = Internal.makeParamString("NavBar","setNavBarHidden",params,"set_navbar_hidden");
        
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.NavBar_a.setNavBarHidden(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }   
    },

      /**
     * @description 设置底部工具栏隐藏／显示
     * @brief 底部工具栏隐藏／显示
     * @param {boolean} isHidden 是否隐藏底部工具栏
     * @since 5.4
     * @method app_set_toolbar_hidden
     * @author jimzhao
     * @example 

     CtripBar.app_set_toolbar_hidden(false);
     */
    app_set_toolbar_hidden:function(isHidden) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        }
        var params = {};
        params.isHidden = isHidden;
        var paramString = Internal.makeParamString("NavBar","setToolBarHidden",params,"set_toolbar_hidden");
        
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.NavBar_a.setToolBarHidden(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }   
    }
};


/**
 * @class CtripMap
 * @description 地图相关类，定位/导航
 * @brief 地图相关类，定位/导航
 */

var CtripMap = {
 /**
     * @description 定位，定位完成会有2－3次callback，第一次返回经纬度信息，第二次返回逆地址解析的信息， 第三次返回ctripCity信息(调用参数isNeedCtripCity需要设置成true)
     * @brief 定位
     * @param {int} timeout 定位timeout，设置timeout<=1或者timeout>=60,都会默认设置为15s
     * @param {Boolean} isNeedCtripCity 是否需要携程的城市定位，如果需要，会返回酒店&攻略的城市ID信息
     * @param {Boolean} isForceLocate 是否强制定位，如果是强制定位，native会发起定位，不用缓存中的数据 v6.0加入
     * @param {String} sequenceId 定位是异步调用，调用的时候传入该字段，取消的时候，可以根据该sequenceId取消/停止定位 v6.0加入
     * @method app_locate
     * @author jimzhao
     * @since v5.1
     * @example
        //调用定位
        CtripUtil.app_locate(15, true, true, "222222");

        //0. 定位失败－－5.10加入
        var json_obj = {
            tagname:'locate',
            error_code:"(-201)定位未开启" 
        };
        //error_code定义：
        a.(-201)定位未开启
        b.(-202)获取经纬度失败
        c.(-203)定位超时
        d.(-204)逆地址解析失败
        e.(-205)获取Ctrip城市信息失败
    
        //1. 返回定位的经纬度信息-------5.8版本加入
        var json_obj = 
         {
            tagname:'locate',
            param:{
                "value":{
                    lat:'121.487899',
                    lng:'31.249162'
                },
                "type":"geo" //表明是获取经纬度成功的返回值
            }
        }
        app.callback(json_obj);


        //2. 返回定位的逆地址解析信息
        var json_obj =
        {
            tagname:'locate',
            param:{
                "value":{
                    country:"中国",//5.9加入
                    countryShortName:"CN",//5.9加入
                    city:"上海", //5.9加入
                    ctyName: '上海', //后续版本将会废弃，使用city代替
                    province: '上海',    //5.8.1版本加入
                    district:"浦东新区", //5.8.1版本加入
                    addrs:'上海市浦东南路22号',
                    lat:'121.487899',
                    lng:'31.249162'
                },
                "type":"address" //表明是逆地址解析成功的返回值
            }
        }

        //3. 返回CtripCity信息，isNeedCtripCity参数为true的时候才有返回，5.10加入
        var json_obj = {
            tagname:'locate',
            param:{
                "value":{
                    "CountryName":"中国",       //所在国家
                    "ProvinceName":"江苏",      //所在省份
                    "CityEntities":[            //城市名列表，城市等级从低到高，先是县级市，然后是地级市，使用者应按列表顺序匹配，匹配到即结束
                        {"CityName":"昆山","CityID":100}, 
                        {"CityName":"苏州","CityID":1000} 
                        ]
                },
                "type":"CtripCity" //表明是CtripCity成功的返回值
            }
        }

        app.callback(json_obj);
     * 
     */
    app_locate:function(timeout, isNeedCtripCity, isForceLocate, sequenceId) {
        var params = {};
        params.timeout = timeout;
        params.isNeedCtripCity = isNeedCtripCity;
        params.isForceLocate = isForceLocate;
        params.sequenceId = sequenceId;
        var paramString = Internal.makeParamString("Locate", "locate", params, 'locate')
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Locate_a.locate(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 停止定位定位，传入定位app_locate时候，传递过去的sequenceId
     * @brief 停止定位
     * @param {String} sequenceId 定位app_locate时候，传递过去的sequenceId
     * @method app_stop_locate
     * @author jimzhao
     * @since v6.0
        
        //使用
        CtripMap.app_stop_locate("222222");

     */
    app_stop_locate:function(sequenceId) {
        if (!Internal.isSupportAPIWithVersion("6.0")) {
            return;
        }
        var params = {};
        params.sequenceId = sequenceId;

        var paramString = Internal.makeParamString("Locate", "stopLocate", params, 'stop_locate')
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Locate_a.stopLocate(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 在地图上显示某个位置
     * @brief 在地图上显示某个位置/导航
     * @param {double} latitude, 纬度
     * @param {double} longitude, 经度
     * @param {String} title, 在地图上显示的点的主标题
     * @param {String} subtitle, 在地图上显示点的附标题
     * @method app_show_map
     * @author jimzhao
     * @since v5.5
     * @example
        
        CtripMap.app_show_map(31.3222323, 121.32232332, "上海野生动物园", "浦东新区陆家嘴1234号");
     *
     */
    app_show_map:function(latitude, longitude, title, subtitle) {
        if (!Internal.isSupportAPIWithVersion("5.5")) {
            return;
        }

        if (!title) {
            title = "";
        }
        if (!subtitle) {
            subtitle = "";
        }

        var params = {};
        params.latitude = latitude;
        params.longitude = longitude;
        params.title = title;
        params.subtitle = subtitle;
        var paramString = Internal.makeParamString("Locate", "showMap",params, 'show_map');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Locate_a.showMap(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 在地图上显示多个POI位置点
     * @brief 在地图上显示多个位置/导航
     * @param {Array} poiList poi列表, list中为JSON对象，key为：latitude, longitude, title, subtitle
     * @method app_show_map_with_POI_list
     * @author jimzhao
     * @since v5.8
     * @example
        
        var poi0 = {};
        poi0.latitude = 31.3222323; //must
        poi0.longitude = 121.32232332;//must
        poi0.title = "上海野生动物园"; //must
        poi0.subtitle = "浦东新区陆家嘴1234号";//optional

        var poi1 = {};
        poi1.latitude = 30.3222323; //must
        poi1.longitude = 120.32232332;//must
        poi1.title = "上海野生动物园A"; //must
        poi1.subtitle = "浦东新区陆家嘴1234号A";//optional


        var poi2 = {};
        poi2.latitude = 32.3222323; //must
        poi2.longitude = 122.32232332;//must
        poi2.title = "上海野生动物园B"; //must
        poi2.subtitle = "浦东新区陆家嘴1234号B";//optional
        
        var poiList = new Array();
        poiList[0] = poi0;
        poiList[1] = poi1;
        poiList[2] = poi2;

        CtripMap.app_show_map(poiList);
     *
     */
    app_show_map_with_POI_list:function(poiList) {
        if (!Internal.isSupportAPIWithVersion("5.8")) {
            return;
        }

        var params = {};
        params.poiList = poiList;

        var paramString = Internal.makeParamString("Locate", "showMapWithPOIList",params, 'show_map_with_POI_list');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Locate_a.showMapWithPOIList(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 获取native缓存的ctrip city信息, app会定时获取ctrip city, hybrid获取缓存命中率在99%以上，可以直接使用，获取不到的时候再进行定位
     * @brief 获取native缓存的ctrip city信息
     * @method app_get_cached_ctrip_city
     * @author jimzhao
     * @since v6.0
     * @example
     *
       //调用
        CtripMap.app_get_cached_ctrip_city()

       //返回数据
        var json_obj = {
            tagname:'get_cached_ctrip_city',
            param:{                         //param字段没有的时候，代表无ctripcity缓存                   
                "CountryName":"中国",       //所在国家
                    "ProvinceName":"江苏",      //所在省份
                    "CityEntities":[            //城市名列表，城市等级从低到高，先是县级市，然后是地级市，使用者应按列表顺序匹配，匹配到即结束
                        {"CityName":"昆山","CityID":100}, 
                        {"CityName":"苏州","CityID":1000} 
                        ]
            }
        }

        app.callback(json_obj);
     */
    app_get_cached_ctrip_city:function() {
        if (!Internal.isSupportAPIWithVersion("6.0")) {
            return;
        }

        var paramString = Internal.makeParamString("Locate", "getCachedCtripCity", null, 'get_cached_ctrip_city');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Locate_a.getCachedCtripCity(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }
};

/**
 * @class CtripBusiness
 * @description Ctrip业务相关，需要返回数据给H5页面
 * @brief Ctrip业务相关，需要返回数据给H5页面
 */
var CtripBusiness = {

    /**
     * @description 选择常用发票title
     * @brief 选择常用发票title
     * @param {String} selectedInvoiceTitle 当前已经选择好的发票title
     * @method app_choose_invoice_title
     * @author jimzhao
     * @since v5.6
     * @example
     *
     * 
        CtripBusiness.app_choose_invoice_title("上次选择的发票title，或者为空，用于标记已选title");
        
        //调用之后，H5页面会收到回调数据
        var json_obj =
        {
            tagname:'choose_invoice_title',
            param:{
                selectedInvoiceTitle:"所选择的发票title"
            }
        }
        
        app.callback(json_obj);
     */
    app_choose_invoice_title:function(selectedInvoiceTitle) {
        if (!Internal.isSupportAPIWithVersion("5.6")) {
            return;
        }

        if (!selectedInvoiceTitle) {
            selectedInvoiceTitle = "";
        }
        var params = {};
        params.selectedInvoiceTitle = selectedInvoiceTitle;
        var paramString = Internal.makeParamString("Business", "chooseInvoiceTitle", params, 'choose_invoice_title');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Business_a.chooseInvoiceTitle(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    //

    /**
     * @description 进入语音搜索,5.7版本，语音搜索之后的结果，不需要BU处理，只需调用即可，后续版本，可能只做语音解析，解析结果传递给H5，BU自行处理
     * @brief 进入语音搜索
     * @param {int} businessType 业务类型(0. 无（默认）1. 机票 2. 酒店3 . 火车票 5. 目的地 6. 攻略 7.景点门票 8.周末/短途游)  61：团队游 62：周末游  63：自由行 64：邮轮  
     * @method app_show_voice_search
     * @author jimzhao
     * @since v5.7
     * @example
     *
     * 
        CtripBusiness.app_show_voice_search(7);
        
        //调用之后，H5页面会收到回调数据
        var json_obj =
        {
            tagname:'show_voice_search',
           //param:{} 后续版本使用，返回语音解析的数据map，5.7暂不提供
        }
        
        app.callback(json_obj);
     */
    app_show_voice_search:function(businessType) {
        if (!Internal.isSupportAPIWithVersion("5.7")) {
            return;
        }

        var params = {};
        params.businessType = businessType;
        var paramString = Internal.makeParamString("Business", "showVoiceSearch", params, 'show_voice_search');

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Business_a.showVoiceSearch(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 打开Hybrid广告页面，会自动显示底部栏，且右上角有分享安妮
     * @brief 打开Hybrid广告页面
     * @method app_open_adv_page
     * @param {String} advUrl 广告URL， URL参数带title=xxx,设置xxx为标题
     * @since v5.4
     * @author jimzhao
     * @example

      CtripBusiness.app_open_adv_page("http://pages.ctrip.com/adv.html?title=标题xxx");
     */
    app_open_adv_page:function(advUrl) {
        if (!Internal.isSupportAPIWithVersion("5.4")) {
            return;
        } 

        var params = {};
        params.advUrl = advUrl;
        paramString = Internal.makeParamString("Util", "openAdvPage", params, "open_adv_page");
        if (Internal.isIOS) {
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) 
        {
            window.Util_a.openAdvPage(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 查看最新版本功能介绍
     * @brief 查看最新版本功能介绍
     * @since v5.2
     * @method app_show_newest_introduction
     * @author jimzhao
     * @example 

     CtripUtil.app_show_newest_introduction();
     */
    app_show_newest_introduction:function() {
        var paramString = Internal.makeParamString("Util", "showNewestIntroduction", null, "show_newest_introduction");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.showNewestIntroduction(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 检查App的版本更新
     * @brief 检查App的版本更新
     * @since v5.2
     * @method app_check_update
     * @author jimzhao
     * @example 

     CtripBusiness.app_check_update();
     *
     */
    app_check_update:function() {
        var paramString = Internal.makeParamString("Util", "checkUpdate", null, "check_update");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.checkUpdate(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 推荐携程旅行给好友
     * @brief 推荐携程旅行给好友
     * @since v5.2
     * @method app_recommend_app_to_friends
     * @author jimzhao
     * @example 

        CtripBusiness.app_recommend_app_to_friends();
     *
     */
    app_recommend_app_to_friends:function() {
        var paramString = Internal.makeParamString("Util", "recommendAppToFriends", null, "recommend_app_to_friends");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.recommendAppToFriends(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 添加微信好友
     * @brief 添加微信好友
     * @since v5.2
     * @method app_add_weixin_friend
     * @author jimzhao
     * @example 

        CtripBusiness.app_add_weixin_friend();

     */
    app_add_weixin_friend:function() {
        var paramString = Internal.makeParamString("Util", "addWeixinFriend", null, "add_weixin_friend");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.addWeixinFriend(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 调用App的分享
     * @brief 调用App的分享(Moved to CtripShare)
     * @param {String} imageRelativePath 将要分享的图片相对路径，相对webapp的路径
     * @param {String} text 需要分享的文字,微博分享文字限制在140
     * @param {String} title 需要分享的标题, v5.4开始支持该字段，微信和email支持；
     * @param {String} linkUrl 需要分享的链接, v5.4开始支持该字段
     * @method app_call_system_share
     * @since v5.3
     * @author jimzhao
      @example

      参考CtripShare.app_call_system_share(....);
     */
    app_call_system_share:function(imageRelativePath, text, title, linkUrl) {
        CtripShare.app_call_system_share(imageRelativePath, text, title, linkUrl);
    },

    /**
     * @description Native收集用户行为,该日志会被上传
     * H5页面调用该函数，需要将增加的event_name告知native，native需要整理纪录
     * @brief 收集ActionLog
     * @method app_log_event
     * @param {String} event_name 需要纪录的事件名
     * @since v5.2
     * @author jimzhao
     * @example 

        CtripBusiness.app_log_event('GoodDay')
     */
    app_log_event:function(event_name) {
        if (Internal.isNotEmptyString(event_name)) {
            var params = {};
            params.event = event_name;
            var paramString =  Internal.makeParamString("Util", "logEvent", params, "log_event");

            if (Internal.isIOS) {
                var url = Internal.makeURLWithParam(paramString);
                Internal.loadURL(url);
            }
            else if (Internal.isAndroid) {
                window.Util_a.logEvent(paramString);
            }
            else if (Internal.isWinOS) {
                Internal.callWin8App(paramString);
            }
        }
    },

     /**
     * @description 获取设备相关信息，相关部门需要
     * @brief 获取设备相关信息，相关部门需要
     * @method app_get_device_info
     * @since v5.7
     * @author jimzhao
     * @example 

        CtripBusiness.app_get_device_info()
        调用之后，返回数据

        var json_obj = {
            tagname:"get_device_info",
            param: {
                IP:"",
                OS:"\U82f9\U679c",
                account:"",
                areaCode:"",
                baseStation:"",
                clientID:12933032900000135327,
                latitude:0,
                longitude:0,
                mac:"10:DD:B1:CF:C1:80",
                port:"",
                wifiMac:""
            }
        };

        app.callback(json_obj);
     */
    app_get_device_info:function() {
        if (!Internal.isSupportAPIWithVersion("5.7")) {
            return;
        }

        var paramString = Internal.makeParamString("Business", "getDeviceInfo", null, "get_device_info");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.getDeviceInfo(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },


     /**
     * @description 获取短信中的验证码
     * @brief 获取短信中的验证码,iPhone不能读取，直接callback
     * @method app_read_verification_code_from_sms
     * @callback read_verification_code_from_sms
     * @since v5.8
     * @author jimzhao
     * @example 

        CtripBusiness.app_read_verification_code_from_sms()
        调用之后，返回数据

        var json_obj = {
            tagname = "read_verification_code_from_sms",
            param: {
                verificationCode = "8890"
            }
        };

        app.callback(json_obj);
     */
    app_read_verification_code_from_sms:function() {
        if (!Internal.isSupportAPIWithVersion("5.8")) {
            return;
        }

        var paramString = Internal.makeParamString("Business", "readVerificationCodeFromSMS", null, "read_verification_code_from_sms");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.readVerificationCodeFromSMS(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 记录google remarkting的screenName
     * @brief 记录google remarkting的screenName
     * @param {String} screenName 需要纪录的页面名
     * @method app_log_google_remarkting
     * @since v5.8
     * @author jimzhao
     * @example 

        CtripBusiness.app_log_google_remarkting(window.location.href);
     */
    app_log_google_remarkting:function(screenName) {
        if (!Internal.isSupportAPIWithVersion("5.8")) {
            return;
        }
        if (!screenName) {
            screenName = "";
        }

        var params = {};
        params.screenName = screenName;
        var paramString = Internal.makeParamString("Business", "logGoogleRemarking", params, "log_google_remarkting");

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.logGoogleRemarking(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 从通讯录选取联系人
     * @brief 从通讯录选取联系人
     * @method app_choose_contact_from_addressbook
     * @author jimzhao
     * @since v5.9
     * @example
     *
     * 
        //调用API
        CtripBusiness.app_choose_contact_from_addressbook();
         
        //调用之后，app返回
        var json_obj = {
            name:"xxx",
            phoneList:[{"家庭":1320000000}, {"工作":021888888888}], //手机号码有一个标签＋号码
            emailList:[{"家庭":a@gmail.com}, {"工作":b@yahoo.com}]  //email有标签＋号码
        };

        app.callback(json_obj);

     */
    app_choose_contact_from_addressbook:function() {
        if (!Internal.isSupportAPIWithVersion("5.9")) {
            return;
        }
        var paramString = Internal.makeParamString("Business", "chooseContactFromAddressbook", null, "choose_contact_from_addressbook");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.chooseContactFromAddressbook(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description hybrid统计页面流量，框架使用，BU请勿使用
     * @brief hybrid统计页面流量
     * @method app_send_ubt_log
     * @param {JSON} tags 页面带的配置信息，可自定义，会传到UBT server，由BI分析
     * @author jimzhao
     * @since v5.9
     * @example
     *
     * 
        //调用API
        CtripBusiness.app_send_ubt_log({pageId:'xxxx',a:'bbb'});

     */
    app_send_ubt_log:function(tags) {
        if (!Internal.isSupportAPIWithVersion("5.9")) {
            return;
        }
        var params = {};
        params.tags = tags;

        var paramString = Internal.makeParamString("Business", "sendUBTLog", params, "send_ubt_log");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.sendUBTLog(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 使用native统计UBT trace日志
     * @brief 使用native统计UBT trace日志
     * @method app_send_ubt_trace
     * @param {String} traceName 需要纪录的trace名
     * @param {JSON} tags 页面带的配置信息，可自定义，会传到UBT server，由BI分析
     * @author jimzhao
     * @since v6.1
     * @example
     *
     * 
        //调用API
        CtripBusiness.app_send_ubt_trace('trace_name_here', {pageId:'xxxx',a:'bbb'});

     */
    app_send_ubt_trace:function(traceName, tags) {
        if (!Internal.isSupportAPIWithVersion("6.1")) {
            return;
        }
        var params = {};
        params.tags = tags;
        params.traceName = traceName;

        var paramString = Internal.makeParamString("Business", "sendUBTTrace", params, "send_ubt_trace");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.sendUBTTrace(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

     /**
     * @description 使用native统计UBT metrics日志，metrics日志是有个double的数字的
     * @brief 使用native统计UBT metrics日志
     * @method app_send_ubt_metrics
     * @param {String} metricsName 需要纪录metrics名
     * @param {double} numValue 需要纪录的metrics的数值
     * @param {JSON} tags 页面带的配置信息，可自定义，会传到UBT server，由BI分析
     * @author jimzhao
     * @since v6.1
     * @example
     *
     * 
        //调用API
        CtripBusiness.app_send_ubt_metrics('metrics_name_here', 10.2, {pageId:'xxxx',a:'bbb'});

     */
    app_send_ubt_metrics:function(metricsName, numValue, tags) {
        if (!Internal.isSupportAPIWithVersion("6.1")) {
            return;
        }
        var params = {};
        params.tags = tags;
        params.metricsName = metricsName;
        params.numValue = numValue;

        var paramString = Internal.makeParamString("Business", "sendUBTMetrics", params, "send_ubt_metrics");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.sendUBTMetrics(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description hybrid调用Native业务通用接口
     * @brief  hybrid调用Native业务通用接口
     * @method app_do_business_job
     * @param {int} businessType 业务类型，1=公共相关，2=酒店，3=机票，4=支付,5=火车票,6=攻略
     * @param {String} businessCode 业务方hybrid和native开发人员协商定义
     * @param {JSON} jsonParam hybrid传给Native的数据，JSON对象
     * @param {String} sequenceId 调用的序列号，调用该API时，如果native需要异步处理(比如发送网络请求)的，hybrid需要设置该值,可以取当前timestamp. native处理完成，会在回调的数据里面带回该字段
     * @author jimzhao
     * @since v6.0
     * @example
     *
     * 
        //调用API
        CtripBusiness.app_do_business_job(1, 10001, {aa:'aa_value',bb:'bb_value'}, 1111111);

        //回调数据
        var json_obj = {
            tagname:"do_business_job",
            error_code:"(-201) businessType不支持",//error_code,失败的时候才有error_code
            param:{
                sequenceId:"1111111",
                xxbusinessObj:{}, //自定义数据
                yy:32232332       //自定义数据

            }//param内容不固定，native／hybrid人员定义
         };

        // error_code定义：
        // (-201) businessType不支持
        // (-202) businessCode不支持
        // (-203) 业务处理失败
        // (-204)＋其它业务自定义错误

         app.callback(json_obj);
     */
    app_do_business_job:function(businessType, businessCode, jsonParam, sequenceId) {
        if (!Internal.isSupportAPIWithVersion("6.0")) {
            return;
        }

        var params = {};
        params.businessType = businessType;
        params.businessCode = businessCode;
        params.jsonParam = jsonParam;
        params.sequenceId = sequenceId;

        var paramString = Internal.makeParamString("Business", "doBusinessJob", params, "do_business_job");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Business_a.doBusinessJob(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }
};

/**
 * @class CtripPage
 * @description 页面跳转，导航，刷新相关API

    通过CtripUtil.app_open_url(....)打开新的webview，可以给webview设置pageName <br/>
    也可以调用CtripPage.app_set_page_name(...)给当前webview设置pageName；<br/>


    页面跳转举例说明：<br/>

    native-->a(na)-->b(nb)-->c(nc)-->d(nd)-->e(ne) //括号内na,nb,nc,nd,ne为页面pageName <br/>
    1.native打开webview页面a，此时a的名字为设置，hybrid调用CtripPage.app_set_page_name(..), 设置当前页面名字为na；<br/>
    2.在a页面用新的webview打开b页面，Ctrip.app_open_url(...),可以给b页面设置pageName为nb，或者调用CtripPage.app_set_page_name(..)，设置nb；<br/>
    3.按照2的方式打开c(nc)，d(nd)，e(ne)；<br/>
    4.如果需要从当前页面e(ne), 会退到c(nc), 调用CtripPage.app_back_to_page("nc"); <br/>

 * @brief 页面跳转，导航，刷新相关API
 */
var CtripPage = {

    /**
     * @description 设置当前页面名，可用于页面导航，刷新
     * @brief 设置当前页面名，可用于页面导航，刷新
     * @param {String} pageName 设置当前页面名
     * @method app_set_page_name
     * @author jimzhao
     * @since v5.6
     * @example
     *
     * 
        CtripPage.app_set_page_name("USE_CAR_PAGE_IDENTIFY");

     */
    app_set_page_name:function(pageName) {
        if (!Internal.isSupportAPIWithVersion("5.6")) {
            return;
        }

        if (!pageName) {
            pageName = "";
        }

        var params = {};
        params.pageName = pageName;

        var paramString = Internal.makeParamString("Page", "setPageName", params, "set_page_name");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Page_a.setPageName(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

   /**
     * @description 多webview app，回退到指定的webview页面
     * @brief 回退到指定的webview页面
     * @param {String} pageName 需要回退的页面名
     * @method app_back_to_page
     * @callback back_to_page
     * @author jimzhao
     * @since v5.8
     * @example
     *
     * 

        CtripPage.app_back_to_page("USE_CAR_PAGE_IDENTIFY");

        //调用之后，如果back失败，返回数据如下 since 6.0
        var json_obj = {
            tagname:"back_to_page",
            error_code:"(-201)指定的PageName未找到" //成功的时候，不会有error_code
        }

        app.callback(json_obj);

     */
    app_back_to_page:function(pageName) {
        if (!Internal.isSupportAPIWithVersion("5.8")) {
            return;
        }

        if (!pageName) {
            pageName = "";
        }

        var params = {};
        params.pageName = pageName;

        var paramString = Internal.makeParamString("Page", "backToPage", params, "back_to_page");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Page_a.backToPage(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 显示native的loading界面
     * @brief 显示native的loading界面
     * @method app_show_loading_page
     * @author jimzhao
     * @since v5.9
     * @example
     *
     * 
        CtripPage.app_show_loading_page();

     */
    app_show_loading_page:function() {
        if (!Internal.isSupportAPIWithVersion("5.9")) {
            return;
        }

        var paramString = Internal.makeParamString("Page", "showLoadingPage", null, "show_loading_page");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Page_a.showLoadingPage(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },


    /**
     * @description 隐藏native的loading界面
     * @brief 隐藏native的loading界面
     * @method app_hide_loading_page
     * @author jimzhao
     * @since v5.9
     * @example
     *
     * 
        CtripPage.app_hide_loading_page();

     */
    app_hide_loading_page:function() {
        if (!Internal.isSupportAPIWithVersion("5.9")) {
            return;
        }

        var paramString = Internal.makeParamString("Page", "hideLoadingPage", null, "hide_loading_page");
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            window.Page_a.hideLoadingPage(paramString);
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },


    /**
     * @description 打开/关闭app的拖动手势，默认是关闭的
     * @brief 打开/关闭app的拖动手势
     * @method app_enable_drag_animation
     * @author jimzhao
     * @since v5.9
     * @example
     *
     * 
        CtripPage.app_enable_drag_animation(true);

     */
    app_enable_drag_animation:function(isEnable) {
        if (!Internal.isSupportAPIWithVersion("5.9")) {
            return;
        }
        var params = {};
        params.isEnable = isEnable;

        var paramString = Internal.makeParamString("Page", "enableDragAnimation", params, "enable_drag_animation");
        if (Internal.isIOS) {
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } else if (Internal.isAndroid) {
            ;//do nothing for android
        } else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }
};

/**
 * @class CtripShare
 * @description 调用native的第三方分享

        通用参数，
        1. 分享平台(shareType)定义
        WeixinFriend------微信好友
        WeixinCircle----微信朋友圈
        SinaWeibo---------新浪微博
        QQ----------------QQ
        QQZone------------QQ空间
        SMS---------------短信
        Email-------------邮件
        Copy--------------复制
        OSMore------------系统更多分享

        Default-----------不是一种shareType，参考下面的demo，分享到多个平台的时候，可以只指定其中1-2个特殊定义，其他都是默认。
        
        2.分享error_code定义
        (-201)分享失败
        (-202)分享被取消
        (-203)分享参数有错误

        3. 分享规则

        微信(微信朋友/微信朋友圈)分享说明：
        1. 图片分享，只能分享图片，所传的文字，title都无效；
        2. 链接分享，所传的图片为分享网页的缩略图，title有效；
        3. 纯文本分享，只能分享text，title无效；
        4. 优先级 链接分享>图片分享>纯文本分享。
           a. 如果有linkUrl，会被当作网页分享，图片作为缩略图；
           b. 如果没有linkUrl，有图片，当作图片分享，text,title无效;
           c. 如果没有linkUrl，没有图片，当作纯文本分享；
        
        微博分享：
        1. 图片为所分享的图片；
        2. 分享title不起作用；
        3. 如果linkUrl有， 分享的text后面会自动添加linkUrl
    
        Email分享：
        1. 图片为所分享的图片；
        2. 分享title作为Email标题；
        3. 如果有linkUrl，分享的text后面会自动添加linkUrl;

        短信分享：
        1. 图片为所分享的图片；注：iOS7.0之后才支持；
        2. 分享title不起作用；
        3. 如果有linkUrl，分享的text后面会自动添加linkUrl;

        复制分享：
        1. 分享的图片不起作用;
        2. 分享的title不起作用;
        3. 如果有linkUrl，分享的text后面会自动添加linkUrl;

        QQ分享说明：
         1. 图片分享，只能分享图片，所传的文字，title都无效；
         2. 链接分享，所传的图片为分享网页的缩略图，title有效；
         3. 纯文本分享，只能分享text，title无效；
         4. 优先级 链接分享>图片分享>纯文本分享。
         a. 如果有linkUrl，会被当作网页分享，图片作为缩略图；
         b. 如果没有linkUrl，有图片，当作图片分享，text,title无效;
         c. 如果没有linkUrl，没有图片，当作纯文本分享；

        QQ空间分享
         只能分享新闻类消息，该消息必须要带URL，如果没有的情况下，默认使用m.ctrip.com


 * @brief 第三方分享 
*/
var CtripShare = {

    /**
     * @description 调用App的分享-兼容老的分享，调用之后，无回调信息，6.1之后不建议使用该API
     * @brief 调用App的分享－兼容6.1之前版本
     * @param {String} imageRelativePath 将要分享的图片相对路径，相对webapp的路径;需要调用CtripUtil.app_download_data()下载图片；
     * @param {String} text 需要分享的文字,微博分享文字限制在140
     * @param {String} title 需要分享的标题, v5.4开始支持该字段，微信和email支持；
     * @param {String} linkUrl 需要分享的链接, v5.4开始支持该字段
     * @method app_call_system_share
     * @since v5.3
     * @author jimzhao
     * @example
        
        CtripBusiness.app_call_system_share("../wb_cache/pkg_name/md5_url_hash", "text to share weibo", "this is titile", "http://www.ctrip.com/");

     */
    app_call_system_share:function(imageRelativePath, text, title, linkUrl) {
        if (!Internal.isSupportAPIWithVersion("5.3")) {
            return;
        }
        var params = {};
        params.title = title;
        params.text = text;
        params.linkUrl = linkUrl;
        params.imageRelativePath = imageRelativePath;

        var paramString = Internal.makeParamString("Util", "callSystemShare", params, "call_system_share");

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        }
        else if (Internal.isAndroid) {
            window.Util_a.callSystemShare(paramString);
        }
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },

    /**
     * @description 分享默认内容到各个平台，此API 为Javascript简化包装app_call_custom_share
     * @brief 分享默认内容到各个平台(JS 二次包装)
     * @method wrap_call_default_share
     * @param{String} imageUrl 分享图片的imageUrl，图片下载失败后，继续分享，不带图片
     * @param{String} title 分享的标题
     * @param{String} text 分享的内容
     * @param{String} linkUrl 分享的链接
     * @param{String} businessCode 分享的业务ID，可以为空，设置后，方便BI统计数据
     * @callback call_custom_share 为app_call_custom_share的callBackTag名字
     * @author jimzhao
     * @since v6.1
     * @example

        CtripShare.wrap_call_default_share("http://s0.ifengimg.com/2014/11/19/03ee1773b2262aa40a226b97f5b44c97.jpg", "chen title", "我的描述", "http://www.ifeng.com");

        //调用之后回调数据请参考 CtripShare.app_call_custom_share()的 example

     */
    wrap_call_default_share:function(imageUrl, title, text, linkUrl, businessCode) {
        var shareData = {};
        shareData.shareType = "Default";
        shareData.imageUrl = imageUrl;
        shareData.title = title;
        shareData.text = text;
        shareData.linkUrl = linkUrl;

        var dataList = [];
        dataList.push(shareData);
        CtripShare.app_call_custom_share(dataList, businessCode);
    },

    /**
     * @description 自定义分享，各个平台可以分享不同的内容
     * @brief 自定义分享内容到第三方平台
     * @method app_call_custom_share
     * @param{JSON} dataList 分享的内容，格式参考下面的example
     * @param{String} businessCode 分享的业务ID，可以为空，设置后，方便BI统计数据
     * @callback call_custom_share
     * @author jimzhao
     * @since v6.1
     * @example

        var dataList = [
            {
                shareType:"QQ",
                imageUrl:"http://share.csdn.net/uploads/24bd27fd3ad6a559873c4aff3bd64a60/24bd27fd3ad6a559873c4aff3bd64a60_thumb.jpg",
                title:"分享图书",
                text:"这本书的简介大概是这样",
                linkUrl:"http://csdn.net"
            },
            {
                shareType:"WeiXin",
                imageUrl:"http://share.csdn.net/uploads/24bd27fd3ad6a559873c4aff3bd64a60/24bd27fd3ad6a559873c4aff3bd64a60_thumb.jpg",
                title:"分享图书给微信",
                text:"这本书的简介是专门为微信定制",
                linkUrl:"http://csdn.net/w"
            },
            {
                shareType:"Default", //表示其他未指定的平台，都适用该分享内容
                imageUrl:"http://share.csdn.net/uploads/24bd27fd3ad6a559873c4aff3bd64a60/24bd27fd3ad6a559873c4aff3bd64a60_thumb.jpg",
                title:"通用分享图书",
                text:"这本书的简介是为其他分享定制的",
                linkUrl:"http://csdn.net/common_test"
            }  
        ];

        CtripShare.app_call_custom_share(dataList);

        //调用处理完成之后
        //1. 没有分享成功返回数据如下
        var json_obj = {
            tagname:"call_custom_share",
            error_code:"(-201)分享失败" //error_code定义参考CtripShare通用参数定义
        }

        //2. 分享成功
        var json_obj = {
            tagname:"call_custom_share",
            param:{
                shareType:"WeiXin"
            }
        }

        app.callback(json_obj);
     */
    app_call_custom_share:function(dataList, businessCode) {
        var params = {};
        params.dataList = dataList;
        params.businessCode = businessCode;

        var paramString = Internal.makeParamString("Share", "callCustomShare", params, "call_custom_share");

        if (Internal.isIOS) {
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Share_a.callCustomShare(paramString);
        } 
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    },


    /**
     * @description 指定内容，分享到特定平台
     * @brief 指定内容，分享到特定平台
     * @method app_call_one_share
     * @param{String} shareType 分享的平台类型
     * @param{String} imageUrl 分享图片的imageUrl，图片下载失败后，继续分享，不带图片
     * @param{String} title 分享的标题
     * @param{String} text 分享的内容
     * @param{String} linkUrl 分享的链接
     * @param{String} businessCode 分享的业务ID，可以为空，设置后，方便BI统计数据
     * @callback call_one_share
     * @author jimzhao
     * @since v6.1
     * @example

     //调用
        CtripShare.app_call_one_share("QQZone", "http://a.hiphotos.baidu.com/ting/pic/item/314e251f95cad1c8ea16a3567d3e6709c93d5115.jpg" , "我是title", "我是text", "", "ctrip_share_11111");

        //调用处理完成之后
        //1. 没有分享成功返回数据如下
        var json_obj = {
            tagname:"call_custom_share",
            error_code:"(-201)分享失败" //error_code定义参考CtripShare通用参数定义
        }

        //2. 分享成功
        var json_obj = {
            tagname:"call_one_share",
        }

        app.callback(json_obj);
     */
    app_call_one_share:function(shareType, imageUrl, title, text, linkUrl, businessCode) {
        var params = {};
        params.shareType = shareType;
        params.imageUrl = imageUrl;
        params.title = title;
        params.text = text;
        params.linkUrl = linkUrl;
        params.businessCode = businessCode;

        var paramString = Internal.makeParamString("Share", "callOneShare", params, "call_one_share");
        if (Internal.isIOS) {
            url = Internal.makeURLWithParam(paramString);
            Internal.loadURL(url);
        } 
        else if (Internal.isAndroid) {
            window.Share_a.callOneShare(paramString);
        } 
        else if (Internal.isWinOS) {
            Internal.callWin8App(paramString);
        }
    }

};
define("bridge", function(){});

//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

var Zepto = (function () {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    getComputedStyle = document.defaultView.getComputedStyle,
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,

  // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = ['after', 'prepend', 'before', 'append'],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    classSelectorRE = /^\.([\w-]+)$/,
    idSelectorRE = /^#([\w-]*)$/,
    tagSelectorRE = /^[\w-]+$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div')

  zepto.matches = function (element, selector) {
    if (!element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj) { return obj != null && obj == obj.window }
  function isDocument(obj) { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj) { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
  }
  function isArray(value) { return value instanceof Array }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function (item) { return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function (str) { return str.replace(/-+(.)?/g, function (match, chr) { return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function (array) { return filter.call(array, function (item, idx) { return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function (node) { if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function (html, name, properties) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    var nodes, dom, container = containers[name]
    container.innerHTML = '' + html
    dom = $.each(slice.call(container.childNodes), function () {
      container.removeChild(this)
    })
    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function (key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }
    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function (dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function (object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function (selector, context) {
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, juts return it
    else if (zepto.isZ(selector)) return selector
    else {
      var dom
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes. If a plain object is given, duplicate it.
      else if (isObject(selector))
        dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector)
    }
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function (selector, context) {
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
    }

    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    $.extend = function (target) {
      var deep, args = slice.call(arguments, 1)
      if (typeof target == 'boolean') {
        deep = target
        target = args.shift()
      }
      args.forEach(function (arg) { extend(target, arg, deep) })
      return target
    }

    // `$.zepto.qsa` is Zepto's CSS selector implementation which
    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
    // This method can be overriden in plugins.
    zepto.qsa = function (element, selector) {
      var found
      return (isDocument(element) && idSelectorRE.test(selector)) ?
      ((found = element.getElementById(RegExp.$1)) ? [found] : []) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
        tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
        element.querySelectorAll(selector)
      )
    }

    function filtered(nodes, selector) {
      return selector === undefined ? $(nodes) : $(nodes).filter(selector)
    }

    $.contains = function (parent, node) {
      return parent !== node && parent.contains(node)
    }

    function funcArg(context, arg, idx, payload) {
      return isFunction(arg) ? arg.call(context, idx, payload) : arg
    }

    function setAttribute(node, name, value) {
      value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
    }

    // access className property while respecting SVGAnimatedString
    function className(node, value) {
      var klass = node.className,
        svg = klass && klass.baseVal !== undefined

      if (value === undefined) return svg ? klass.baseVal : klass
      svg ? (klass.baseVal = value) : (node.className = value)
    }

    // "true"  => true
    // "false" => false
    // "null"  => null
    // "42"    => 42
    // "42.5"  => 42.5
    // JSON    => parse if valid
    // String  => self
    function deserializeValue(value) {
      var num
      try {
        return value ?
        value == "true" ||
        (value == "false" ? false :
          value == "null" ? null :
          !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value)
        : value
      } catch (e) {
        return value
      }
    }

    $.type = type
    $.isFunction = isFunction
    $.isWindow = isWindow
    $.isArray = isArray
    $.isPlainObject = isPlainObject

    $.isEmptyObject = function (obj) {
      var name
      for (name in obj) return false
      return true
    }

    $.inArray = function (elem, array, i) {
      return emptyArray.indexOf.call(array, elem, i)
    }

    $.camelCase = camelize
    $.trim = function (str) { return str.trim() }

    // plugin compatibility
    $.uuid = 0
    $.support = {}
    $.expr = {}

    $.map = function (elements, callback) {
      var value, values = [], i, key
      if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
          value = callback(elements[i], i)
          if (value != null) values.push(value)
        }
      else
        for (key in elements) {
          value = callback(elements[key], key)
          if (value != null) values.push(value)
        }
      return flatten(values)
    }

    $.each = function (elements, callback) {
      var i, key
      if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++)
          if (callback.call(elements[i], i, elements[i]) === false) return elements
        } else {
          for (key in elements)
            if (callback.call(elements[key], key, elements[key]) === false) return elements
          }

          return elements
        }

        $.grep = function (elements, callback) {
          return filter.call(elements, callback)
        }

        if (window.JSON) $.parseJSON = JSON.parse

        // Populate the class2type map
        $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase()
        })

        // Define methods that will be available on all
        // Zepto collections
        $.fn = {
          // Because a collection acts like an array
          // copy over these useful array functions.
          forEach: emptyArray.forEach,
          reduce: emptyArray.reduce,
          push: emptyArray.push,
          sort: emptyArray.sort,
          indexOf: emptyArray.indexOf,
          concat: emptyArray.concat,

          // `map` and `slice` in the jQuery API work differently
          // from their array counterparts
          map: function (fn) {
            return $($.map(this, function (el, i) { return fn.call(el, i, el) }))
          },
          slice: function () {
            return $(slice.apply(this, arguments))
          },

          ready: function (callback) {
            if (readyRE.test(document.readyState)) callback($)
            else document.addEventListener('DOMContentLoaded', function () { callback($) }, false)
            return this
          },
          get: function (idx) {
            return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
          },
          toArray: function () { return this.get() },
          size: function () {
            return this.length
          },
          remove: function () {
            return this.each(function () {
              if (this.parentNode != null)
                this.parentNode.removeChild(this)
            })
          },
          each: function (callback) {
            emptyArray.every.call(this, function (el, idx) {
              return callback.call(el, idx, el) !== false
            })
            return this
          },
          filter: function (selector) {
            if (isFunction(selector)) return this.not(this.not(selector))
            return $(filter.call(this, function (element) {
              return zepto.matches(element, selector)
            }))
          },
          add: function (selector, context) {
            return $(uniq(this.concat($(selector, context))))
          },
          is: function (selector) {
            return this.length > 0 && zepto.matches(this[0], selector)
          },
          not: function (selector) {
            var nodes = []
            if (isFunction(selector) && selector.call !== undefined)
              this.each(function (idx) {
                if (!selector.call(this, idx)) nodes.push(this)
              })
            else {
              var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
              this.forEach(function (el) {
                if (excludes.indexOf(el) < 0) nodes.push(el)
              })
            }
            return $(nodes)
          },
          has: function (selector) {
            return this.filter(function () {
              return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
            })
          },
          eq: function (idx) {
            return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
          },
          first: function () {
            var el = this[0]
            return el && !isObject(el) ? el : $(el)
          },
          last: function () {
            var el = this[this.length - 1]
            return el && !isObject(el) ? el : $(el)
          },
          find: function (selector) {
            var result, $this = this
            if (typeof selector == 'object')
              result = $(selector).filter(function () {
                var node = this
                return emptyArray.some.call($this, function (parent) {
                  return $.contains(parent, node)
                })
              })
            else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
            else result = this.map(function () { return zepto.qsa(this, selector) })
            return result
          },
          closest: function (selector, context) {
            var node = this[0], collection = false
            if (typeof selector == 'object') collection = $(selector)
            while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
              node = node !== context && !isDocument(node) && node.parentNode
            return $(node)
          },
          parents: function (selector) {
            var ancestors = [], nodes = this
            while (nodes.length > 0)
              nodes = $.map(nodes, function (node) {
                if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
                  ancestors.push(node)
                  return node
                }
              })
            return filtered(ancestors, selector)
          },
          parent: function (selector) {
            return filtered(uniq(this.pluck('parentNode')), selector)
          },
          children: function (selector) {
            return filtered(this.map(function () { return children(this) }), selector)
          },
          contents: function () {
            return this.map(function () { return slice.call(this.childNodes) })
          },
          siblings: function (selector) {
            return filtered(this.map(function (i, el) {
              return filter.call(children(el.parentNode), function (child) { return child !== el })
            }), selector)
          },
          empty: function () {
            return this.each(function () { this.innerHTML = '' })
          },
          // `pluck` is borrowed from Prototype.js
          pluck: function (property) {
            return $.map(this, function (el) { return el[property] })
          },
          show: function () {
            return this.each(function () {
              this.style.display == "none" && (this.style.display = null)
              if (getComputedStyle(this, '').getPropertyValue("display") == "none")
                this.style.display = defaultDisplay(this.nodeName)
            })
          },
          replaceWith: function (newContent) {
            return this.before(newContent).remove()
          },
          wrap: function (structure) {
            var func = isFunction(structure)
            if (this[0] && !func)
              var dom = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

            return this.each(function (index) {
              $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
            })
          },
          wrapAll: function (structure) {
            if (this[0]) {
              $(this[0]).before(structure = $(structure))
              var children
              // drill down to the inmost element
              while ((children = structure.children()).length) structure = children.first()
              $(structure).append(this)
            }
            return this
          },
          wrapInner: function (structure) {
            var func = isFunction(structure)
            return this.each(function (index) {
              var self = $(this), contents = self.contents(),
            dom = func ? structure.call(this, index) : structure
              contents.length ? contents.wrapAll(dom) : self.append(dom)
            })
          },
          unwrap: function () {
            this.parent().each(function () {
              $(this).replaceWith($(this).children())
            })
            return this
          },
          clone: function () {
            return this.map(function () { return this.cloneNode(true) })
          },
          hide: function () {
            return this.css("display", "none")
          },
          toggle: function (setting) {
            return this.each(function () {
              var el = $(this)
        ; (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
            })
          },
          prev: function (selector) { return $(this.pluck('previousElementSibling')).filter(selector || '*') },
          next: function (selector) { return $(this.pluck('nextElementSibling')).filter(selector || '*') },
          html: function (html) {
            return html === undefined ?
        (this.length > 0 ? this[0].innerHTML : null) :
        this.each(function (idx) {
          var originHtml = this.innerHTML
          $(this).empty().append(funcArg(this, html, idx, originHtml))
        })
          },
          text: function (text) {
            return text === undefined ?
        (this.length > 0 ? this[0].textContent : null) :
        this.each(function () { this.textContent = text })
          },
          attr: function (name, value) {
            var result
            return (typeof name == 'string' && value === undefined) ?
        (this.length == 0 || this[0].nodeType !== 1 ? undefined :
          (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function (idx) {
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
          },
          removeAttr: function (name) {
            return this.each(function () { this.nodeType === 1 && setAttribute(this, name) })
          },
          prop: function (name, value) {
            return (value === undefined) ?
        (this[0] && this[0][name]) :
        this.each(function (idx) {
          this[name] = funcArg(this, value, idx, this[name])
        })
          },
          data: function (name, value) {
            var data = this.attr('data-' + dasherize(name), value)
            return data !== null ? deserializeValue(data) : undefined
          },
          val: function (value) {
            return (value === undefined) ?
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function (o) { return this.selected }).pluck('value') :
           this[0].value)
        ) :
        this.each(function (idx) {
          this.value = funcArg(this, value, idx, this.value)
        })
          },
          offset: function (coordinates) {
            if (coordinates) return this.each(function (index) {
              var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top: coords.top - parentOffset.top,
              left: coords.left - parentOffset.left
            }

              if ($this.css('position') == 'static') props['position'] = 'relative'
              $this.css(props)
            })
            if (this.length == 0) return null
            var obj = this[0].getBoundingClientRect()
            return {
              left: obj.left + window.pageXOffset,
              top: obj.top + window.pageYOffset,
              width: Math.round(obj.width),
              height: Math.round(obj.height)
            }
          },
          css: function (property, value) {
            if (arguments.length < 2 && typeof property == 'string')
              return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))

            var css = ''
            if (type(property) == 'string') {
              if (!value && value !== 0)
                this.each(function () { this.style.removeProperty(dasherize(property)) })
              else
                css = dasherize(property) + ":" + maybeAddPx(property, value)
            } else {
              for (key in property)
                if (!property[key] && property[key] !== 0)
                  this.each(function () { this.style.removeProperty(dasherize(key)) })
                else
                  css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
              }

              return this.each(function () { this.style.cssText += ';' + css })
            },
            index: function (element) {
              return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function (name) {
              return emptyArray.some.call(this, function (el) {
                return this.test(className(el))
              }, classRE(name))
            },
            addClass: function (name) {
              return this.each(function (idx) {
                classList = []
                var cls = className(this), newName = funcArg(this, name, idx, cls)
                newName.split(/\s+/g).forEach(function (klass) {
                  if (!$(this).hasClass(klass)) classList.push(klass)
                }, this)
                classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
              })
            },
            removeClass: function (name) {
              return this.each(function (idx) {
                if (name === undefined) return className(this, '')
                classList = className(this)
                funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
                  classList = classList.replace(classRE(klass), " ")
                })
                className(this, classList.trim())
              })
            },
            toggleClass: function (name, when) {
              return this.each(function (idx) {
                var $this = $(this), names = funcArg(this, name, idx, className(this))
                names.split(/\s+/g).forEach(function (klass) {
                  (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
                })
              })
            },
            scrollTop: function () {
              if (!this.length) return
              return ('scrollTop' in this[0]) ? this[0].scrollTop : this[0].scrollY
            },
            position: function () {
              if (!this.length) return

              var elem = this[0],
              // Get *real* offsetParent
        offsetParent = this.offsetParent(),
              // Get correct offsets
        offset = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0} : offsetParent.offset()

              // Subtract element margins
              // note: when an element has margin: auto the offsetLeft and marginLeft
              // are the same in Safari causing offset.left to incorrectly be 0
              offset.top -= parseFloat($(elem).css('margin-top')) || 0
              offset.left -= parseFloat($(elem).css('margin-left')) || 0

              // Add offsetParent borders
              parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0
              parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0

              // Subtract the two offsets
              return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
              }
            },
            offsetParent: function () {
              return this.map(function () {
                var parent = this.offsetParent || document.body
                while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
                  parent = parent.offsetParent
                return parent
              })
            }
          }

          // for now
          $.fn.detach = $.fn.remove

          // Generate the `width` and `height` functions
  ; ['width', 'height'].forEach(function (dimension) {
    $.fn[dimension] = function (value) {
      var offset, el = this[0],
        Dimension = dimension.replace(/./, function (m) { return m[0].toUpperCase() })
      if (value === undefined) return isWindow(el) ? el['inner' + Dimension] :
        isDocument(el) ? el.documentElement['offset' + Dimension] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function (idx) {
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

          function traverseNode(node, fun) {
            fun(node)
            for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
          }

          // Generate the `after`, `prepend`, `before`, `append`,
          // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
          adjacencyOperators.forEach(function (operator, operatorIndex) {
            var inside = operatorIndex % 2 //=> prepend, append

            $.fn[operator] = function () {
              // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
              var argType, nodes = $.map(arguments, function (arg) {
                argType = type(arg)
                return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
              }),
          parent, copyByClone = this.length > 1
              if (nodes.length < 1) return this

              return this.each(function (_, target) {
                parent = inside ? target : target.parentNode

                // convert all methods to a "before" operation
                target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

                nodes.forEach(function (node) {
                  if (copyByClone) node = node.cloneNode(true)
                  else if (!parent) return $(node).remove()

                  traverseNode(parent.insertBefore(node, target), function (el) {
                    if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
                      window['eval'].call(window, el.innerHTML)
                  })
                })
              })
            }

            // after    => insertAfter
            // prepend  => prependTo
            // before   => insertBefore
            // append   => appendTo
            $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
              $(html)[operator](this)
              return this
            }
          })

          zepto.Z.prototype = $.fn

          // Export internal API functions in the `$.zepto` namespace
          zepto.uniq = uniq
          zepto.deserializeValue = deserializeValue
          $.zepto = zepto

          return $
        })()


        // If `$` is not yet defined, point it to `Zepto`
        window.Zepto = Zepto
        window.$ === undefined && (window.$ = Zepto)

; (function ($) {
  function detect(ua) {
    var os = this.os = {}, browser = this.browser = {},
      webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      ie = ua.match(/MSIE\s([\d.]+)/),
      safari = webkit && ua.match(/Mobile\//) && !chrome,
      webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) browser.version = webkit[1]

    if (android) os.android = true, os.version = android[2]
    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
    if (webos) os.webos = true, os.version = webos[2]
    if (touchpad) os.touchpad = true
    if (blackberry) os.blackberry = true, os.version = blackberry[2]
    if (bb10) os.bb10 = true, os.version = bb10[2]
    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
    if (playbook) browser.playbook = true
    if (kindle) os.kindle = true, os.version = kindle[1]
    if (silk) browser.silk = true, browser.version = silk[1]
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
    if (chrome) browser.chrome = true, browser.version = chrome[1]
    if (firefox) browser.firefox = true, browser.version = firefox[1]
    if (ie) browser.ie = true, browser.version = ie[1]
    if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true
    if (webview) browser.webview = true

    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
    os.phone = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
  }

  detect.call($, navigator.userAgent)
  // make available to unit tests
  $.__detect = detect

})(Zepto)

; (function ($) {
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function (obj) { return typeof obj == 'string' },
      handlers = {},
      specialEvents = {},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function (handler) {
      return handler
        && (!event.e || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return { e: parts[0], ns: parts.slice(1).sort().join(' ') }
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture) {
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function (event) {
      if (event == 'ready') return $(document).ready(fn)
      var handler = parse(event)
      handler.fn = fn
      handler.sel = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function (e) {
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del = delegator
      var callback = delegator || fn
      handler.proxy = function (e) {
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture) {
    var id = zid(element)
    ; (events || '').split(/\s/).forEach(function (event) {
      findHandlers(element, event, fn, selector).forEach(function (handler) {
        delete handlers[id][handler.i]
        if ('removeEventListener' in element)
          element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function (fn, context) {
    if (isFunction(fn)) {
      var proxyFn = function () { return fn.apply(context, arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      return $.proxy(fn[context], fn)
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function (event, data, callback) {
    return this.on(event, data, callback)
  }
  $.fn.unbind = function (event, callback) {
    return this.off(event, callback)
  }
  $.fn.one = function (event, selector, data, callback) {
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function () { return true },
      returnFalse = function () { return false },
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function (name, predicate) {
        var sourceMethod = source[name]
        event[name] = function () {
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

      return compatible(proxy, event)
    }

    $.fn.delegate = function (selector, event, callback) {
      return this.on(event, selector, callback)
    }
    $.fn.undelegate = function (selector, event, callback) {
      return this.off(event, selector, callback)
    }

    $.fn.live = function (event, callback) {
      $(document.body).delegate(this.selector, event, callback)
      return this
    }
    $.fn.die = function (event, callback) {
      $(document.body).undelegate(this.selector, event, callback)
      return this
    }

    $.fn.on = function (event, selector, data, callback, one) {
      var autoRemove, delegator, $this = this
      if (event && !isString(event)) {
        $.each(event, function (type, fn) {
          $this.on(type, selector, data, fn, one)
        })
        return $this
      }

      if (!isString(selector) && !isFunction(callback) && callback !== false)
        callback = data, data = selector, selector = undefined
      if (isFunction(data) || data === false)
        callback = data, data = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function (_, element) {
        if (one) autoRemove = function (e) {
          remove(element, e.type, callback)
          return callback.apply(this, arguments)
        }

        if (selector) delegator = function (e) {
          var evt, match = $(e.target).closest(selector, element).get(0)
          if (match && match !== element) {
            evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element })
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
          }
        }

        add(element, event, callback, data, selector, delegator || autoRemove)
      })
    }
    $.fn.off = function (event, selector, callback) {
      var $this = this
      if (event && !isString(event)) {
        $.each(event, function (type, fn) {
          $this.off(type, selector, fn)
        })
        return $this
      }

      if (!isString(selector) && !isFunction(callback) && callback !== false)
        callback = selector, selector = undefined

      if (callback === false) callback = returnFalse

      return $this.each(function () {
        remove(this, event, callback, selector)
      })
    }

    $.fn.trigger = function (event, args) {
      event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
      event._args = args
      return this.each(function () {
        // items in the collection might not be DOM elements
        if ('dispatchEvent' in this) this.dispatchEvent(event)
        else $(this).triggerHandler(event, args)
      })
    }

    // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    $.fn.triggerHandler = function (event, args) {
      var e, result
      this.each(function (i, element) {
        e = createProxy(isString(event) ? $.Event(event) : event)
        e._args = args
        e.target = element
        $.each(findHandlers(element, event.type || event), function (i, handler) {
          result = handler.proxy(e)
          if (e.isImmediatePropagationStopped()) return false
        })
      })
      return result
    }

    // shortcut methods for `.bind(event, fn)` for each event type
  ; ('focusin focusout load resize scroll unload click dblclick ' +
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
  'change select keydown keypress keyup error').split(' ').forEach(function (event) {
    $.fn[event] = function (callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ; ['focus', 'blur'].forEach(function (name) {
    $.fn[name] = function (callback) {
      if (callback) this.bind(name, callback)
      else this.each(function () {
        try { this[name]() }
        catch (e) { }
      })
      return this
    }
  })
    $.Event = function (type, props) {
      if (!isString(type)) props = type, type = props.type
      var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
      if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])

            event.initEvent(type, bubbles, true)
      return compatible(event)
    }

  })(Zepto)

; (function ($) {
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() { }

  $.ajaxJSONP = function (options, deferred) {
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function (errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function (e, errorType) {
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function () {
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function () {
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json: jsonType,
      xml: 'application/xml, text/xml',
      html: htmlType,
      text: 'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && (mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml') || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function (options) {
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred()
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)
    if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now())

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (dataType == 'jsonp' || hasPlaceholder) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = {},
        setHeader = function (name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script') (1, eval)(result)
            else if (dataType == 'xml') result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function () {
      xhr.onreadystatechange = empty
      xhr.abort()
      ajaxError(null, 'timeout', xhr, settings, deferred)
    }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function (/* url, data, success, dataType */) {
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function (/* url, data, success, dataType */) {
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function (/* url, data, success */) {
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function (url, data, success) {
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function (response) {
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope) {
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function (key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function (obj, traditional) {
    var params = []
    params.add = function (k, v) { this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

; (function ($) {
  $.fn.serializeArray = function () {
    var result = [], el
    $([].slice.call(this.get(0).elements)).each(function () {
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function () {
    var result = []
    this.serializeArray().forEach(function (elm) {
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function (callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

; (function ($, undefined) {
  var prefix = '', eventPrefix, endEventName, endAnimationName,
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    transform,
    transitionProperty, transitionDuration, transitionTiming, transitionDelay,
    animationName, animationDuration, animationTiming, animationDelay,
    cssReset = {}

  function dasherize(str) { return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }

  $.each(vendors, function (vendor, event) {
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-'
      eventPrefix = event
      return false
    }
  })

  transform = prefix + 'transform'
  cssReset[transitionProperty = prefix + 'transition-property'] =
  cssReset[transitionDuration = prefix + 'transition-duration'] =
  cssReset[transitionDelay = prefix + 'transition-delay'] =
  cssReset[transitionTiming = prefix + 'transition-timing-function'] =
  cssReset[animationName = prefix + 'animation-name'] =
  cssReset[animationDuration = prefix + 'animation-duration'] =
  cssReset[animationDelay = prefix + 'animation-delay'] =
  cssReset[animationTiming = prefix + 'animation-timing-function'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    speeds: { _default: 400, fast: 200, slow: 600 },
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function (properties, duration, ease, callback, delay) {
    if ($.isFunction(duration))
      callback = duration, ease = undefined, duration = undefined
    if ($.isFunction(ease))
      callback = ease, ease = undefined
    if ($.isPlainObject(duration))
      ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
    if (duration) duration = (typeof duration == 'number' ? duration :
                    ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
    if (delay) delay = parseFloat(delay) / 1000
    return this.anim(properties, duration, ease, callback, delay)
  }

  $.fn.anim = function (properties, duration, ease, callback, delay) {
    var key, cssValues = {}, cssProperties, transforms = '',
        that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
        fired = false

    if (duration === undefined) duration = $.fx.speeds._default / 1000
    if (delay === undefined) delay = 0
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssValues[animationName] = properties
      cssValues[animationDuration] = duration + 's'
      cssValues[animationDelay] = delay + 's'
      cssValues[animationTiming] = (ease || 'linear')
      endEvent = $.fx.animationEnd
    } else {
      cssProperties = []
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
        else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

      if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
      if (duration > 0 && typeof properties === 'object') {
        cssValues[transitionProperty] = cssProperties.join(', ')
        cssValues[transitionDuration] = duration + 's'
        cssValues[transitionDelay] = delay + 's'
        cssValues[transitionTiming] = (ease || 'linear')
      }
    }

    wrappedCallback = function (event) {
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, wrappedCallback)
      } else
        $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

      fired = true
      $(this).css(cssReset)
      callback && callback.call(this)
    }
    if (duration > 0) {
      this.bind(endEvent, wrappedCallback)
      // transitionEnd is not always firing on older Android phones
      // so make sure it gets fired
      setTimeout(function () {
        if (fired) return
        wrappedCallback.call(that)
      }, (duration * 1000) + 25)
    }

    // trigger page reflow so new elements can animate
    this.size() && this.get(0).clientLeft

    this.css(cssValues)

    if (duration <= 0) setTimeout(function () {
      that.each(function () { wrappedCallback.call(this) })
    }, 0)

    return this
  }

  testEl = null
})(Zepto)
;
define("$", function(){});

// Underscore.js 1.4.4
// ===================

// > http://underscorejs.org
// > (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
// > Underscore may be freely distributed under the MIT license.

// Baseline setup
// --------------
(function () {

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
    slice = ArrayProto.slice,
    concat = ArrayProto.concat,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach = ArrayProto.forEach,
    nativeMap = ArrayProto.map,
    nativeReduce = ArrayProto.reduce,
    nativeReduceRight = ArrayProto.reduceRight,
    nativeFilter = ArrayProto.filter,
    nativeEvery = ArrayProto.every,
    nativeSome = ArrayProto.some,
    nativeIndexOf = ArrayProto.indexOf,
    nativeLastIndexOf = ArrayProto.lastIndexOf,
    nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeBind = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function (obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function (value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function (obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function (value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function (obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function (value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function (obj, iterator, context) {
    var result;
    any(obj, function (value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function (obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function (value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function (obj, iterator, context) {
    return _.filter(obj, function (value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function (obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function (value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function (obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function (value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function (obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function (value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function (obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function (value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function (obj, key) {
    return _.map(obj, function (value) {
      return value[key];
    });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function (obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function (value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function (obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function (obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed: -Infinity, value: -Infinity};
    each(obj, function (value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value: value, computed: computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function (obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed: Infinity, value: Infinity};
    each(obj, function (value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value: value, computed: computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function (obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function (value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function (value) {
    return _.isFunction(value) ? value : function (obj) {
      return obj[value];
    };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function (obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function (value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function (left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function (obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function (value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function (obj, value, context) {
    return group(obj, value, context, function (result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function (obj, value, context) {
    return group(obj, value, context, function (result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function (array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function (obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function (obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function (array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function (array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function (array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function (array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function (array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function (input, shallow, output) {
    each(input, function (value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function (array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function (array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function (array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function (value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function () {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function (array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function (item) {
      return _.every(rest, function (other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function (value) {
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function () {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function (list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function (array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function (array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function (start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while (idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function (func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function () {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function (func) {
    var args = slice.call(arguments, 1);
    return function () {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function (obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function (f) {
      obj[f] = _.bind(obj[f], obj);
    });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function (func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function () {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function (func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function (func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function (func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function () {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function (func, wait, immediate) {
    var timeout, result;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function (func) {
    var ran = false, memo;
    return function () {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function (func, wrapper) {
    return function () {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function () {
    var funcs = arguments;
    return function () {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function (times, func) {
    if (times <= 0) return func();
    return function () {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function (obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function (obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function (obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function (obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function (obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function (obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function (key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

  // Return a copy of the object without the blacklisted properties.
  _.omit = function (obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function (obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function (obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function (a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
          a.global == b.global &&
          a.multiline == b.multiline &&
          a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
        _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function (a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function (obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function (obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function (obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
    _['is' + name] = function (obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function (obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function (obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function (obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function (obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function (obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function (obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function () {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function (value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function (min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function (method) {
    _[method] = function (string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function (match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function (object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function (obj) {
    each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function (prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function (text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function (match) {
          return '\\' + escapes[match];
        });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function (data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function (obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function (obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
    var method = ArrayProto[name];
    _.prototype[name] = function () {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function (name) {
    var method = ArrayProto[name];
    _.prototype[name] = function () {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function () {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function () {
      return this._wrapped;
    }

  });

}).call(this);


define("_", function(){});

//     Backbone.js 1.0.0

//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function () {

    // Initial Setup
    // -------------

    // Save a reference to the global object (`window` in the browser, `exports`
    // on the server).
    var root = this;

    // Save the previous value of the `Backbone` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousBackbone = root.Backbone;

    // Create local references to array methods we'll want to use later.
    var array = [];
    var push = array.push;
    var slice = array.slice;
    var splice = array.splice;

    // The top-level namespace. All public Backbone classes and modules will
    // be attached to this. Exported for both the browser and the server.
    var Backbone;
    if (typeof exports !== 'undefined') {
        Backbone = exports;
    } else {
        Backbone = root.Backbone = {};
    }

    // Current version of the library. Keep in sync with `package.json`.
    Backbone.VERSION = '1.0.0';

    // Require Underscore, if we're on the server, and it's not already present.
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

    // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
    // the `$` variable.
    Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;

    // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
    // to its previous owner. Returns a reference to this Backbone object.
    Backbone.noConflict = function () {
        root.Backbone = previousBackbone;
        return this;
    };

    // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
    // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
    // set a `X-Http-Method-Override` header.
    Backbone.emulateHTTP = false;

    // Turn on `emulateJSON` to support legacy servers that can't deal with direct
    // `application/json` requests ... will encode the body as
    // `application/x-www-form-urlencoded` instead and will send the model in a
    // form param named `model`.
    Backbone.emulateJSON = false;

    // Backbone.Events
    // ---------------

    // A module that can be mixed in to *any object* in order to provide it with
    // custom events. You may bind with `on` or remove with `off` callback
    // functions to an event; `trigger`-ing an event fires all callbacks in
    // succession.
    //
    //     var object = {};
    //     _.extend(object, Backbone.Events);
    //     object.on('expand', function(){ alert('expanded'); });
    //     object.trigger('expand');
    //
    var Events = Backbone.Events = {

        // Bind an event to a `callback` function. Passing `"all"` will bind
        // the callback to all events fired.
        on: function (name, callback, context) {
            if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            events.push({ callback: callback, context: context, ctx: context || this });
            return this;
        },

        // Bind an event to only be triggered a single time. After the first time
        // the callback is invoked, it will be removed.
        once: function (name, callback, context) {
            if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
            var self = this;
            var once = _.once(function () {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            return this.on(name, once, context);
        },

        // Remove one or many callbacks. If `context` is null, removes all
        // callbacks with that function. If `callback` is null, removes all
        // callbacks for the event. If `name` is null, removes all bound
        // callbacks for all events.
        off: function (name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }

            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (events = this._events[name]) {
                    this._events[name] = retain = [];
                    if (callback || context) {
                        for (j = 0, k = events.length; j < k; j++) {
                            ev = events[j];
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                                retain.push(ev);
                            }
                        }
                    }
                    if (!retain.length) delete this._events[name];
                }
            }

            return this;
        },

        // Trigger one or many events, firing all bound callbacks. Callbacks are
        // passed the same arguments as `trigger` is, apart from the event name
        // (unless you're listening on `"all"`, which will cause your callback to
        // receive the true name of the event as the first argument).
        trigger: function (name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, arguments);
            return this;
        },

        // Tell this object to stop listening to either specific events ... or
        // to every object it's currently listening to.
        stopListening: function (obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            if (typeof name === 'object') callback = this;
            if (obj) (listeners = {})[obj._listenerId] = obj;
            for (var id in listeners) {
                listeners[id].off(name, callback, this);
                if (deleteListener) delete this._listeners[id];
            }
            return this;
        }

    };

    // Regular expression used to split event strings.
    var eventSplitter = /\s+/;

    // Implement fancy features of the Events API such as multiple event
    // names `"change blur"` and jQuery-style event maps `{change: action}`
    // in terms of the existing API.
    var eventsApi = function (obj, action, name, rest) {
        if (!name) return true;

        // Handle event maps.
        if (typeof name === 'object') {
            for (var key in name) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
            return false;
        }

        // Handle space separated event names.
        if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [names[i]].concat(rest));
            }
            return false;
        }

        return true;
    };

    // A difficult-to-believe, but optimized internal dispatch function for
    // triggering events. Tries to keep the usual cases speedy (most internal
    // Backbone events have 3 arguments).
    var triggerEvents = function (events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
            case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
            case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
            case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
            case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
            default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
        }
    };

    var listenMethods = { listenTo: 'on', listenToOnce: 'once' };

    // Inversion-of-control versions of `on` and `once`. Tell *this* object to
    // listen to an event in another object ... keeping track of what it's
    // listening to.
    _.each(listenMethods, function (implementation, method) {
        Events[method] = function (obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
            listeners[id] = obj;
            if (typeof name === 'object') callback = this;
            obj[implementation](name, callback, this);
            return this;
        };
    });

    // Aliases for backwards compatibility.
    Events.bind = Events.on;
    Events.unbind = Events.off;

    // Allow the `Backbone` object to serve as a global event bus, for folks who
    // want global "pubsub" in a convenient place.
    _.extend(Backbone, Events);


    // Backbone.View
    // -------------

    // Backbone Views are almost more convention than they are actual code. A View
    // is simply a JavaScript object that represents a logical chunk of UI in the
    // DOM. This might be a single item, an entire list, a sidebar or panel, or
    // even the surrounding frame which wraps your whole app. Defining a chunk of
    // UI as a **View** allows you to define your DOM events declaratively, without
    // having to worry about render order ... and makes it easy for the view to
    // react to specific changes in the state of your models.

    // Creating a Backbone.View creates its initial element outside of the DOM,
    // if an existing element is not provided...
    var View = Backbone.View = function (options) {
        this.cid = _.uniqueId('view');
        this._configure(options || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };

    // Cached regex to split keys for `delegate`.
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    // List of view options to be merged as properties.
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

    // Set up all inheritable **Backbone.View** properties and methods.
    _.extend(View.prototype, Events, {

        // The default `tagName` of a View's element is `"div"`.
        tagName: 'div',

        // jQuery delegate for element lookup, scoped to DOM elements within the
        // current view. This should be prefered to global lookups where possible.
        $: function (selector) {
            return this.$el.find(selector);
        },

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () { },

        // **render** is the core function that your view should override, in order
        // to populate its element (`this.el`), with the appropriate HTML. The
        // convention is for **render** to always return `this`.
        render: function () {
            return this;
        },

        // Remove this view by taking the element out of the DOM, and removing any
        // applicable Backbone.Events listeners.
        remove: function () {
            this.$el.remove();
            this.stopListening();
            return this;
        },

        // Change the view's element (`this.el` property), including event
        // re-delegation.
        setElement: function (element, delegate) {
            if (this.$el) this.undelegateEvents();
            this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
            this.el = this.$el[0];
            if (delegate !== false) this.delegateEvents();
            return this;
        },

        // Set callbacks, where `this.events` is a hash of
        //
        // *{"event selector": "callback"}*
        //
        //     {
        //       'mousedown .title':  'edit',
        //       'click .button':     'save'
        //       'click .open':       function(e) { ... }
        //     }
        //
        // pairs. Callbacks will be bound to the view, with `this` set properly.
        // Uses event delegation for efficiency.
        // Omitting the selector binds the event to `this.el`.
        // This only works for delegate-able events: not `focus`, `blur`, and
        // not `change`, `submit`, and `reset` in Internet Explorer.
        delegateEvents: function (events) {
            if (!(events || (events = _.result(this, 'events')))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;

                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, this);

                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }
            return this;
        },

        // Clears all callbacks previously bound to the view with `delegateEvents`.
        // You usually don't need to use this, but may wish to if you have multiple
        // Backbone views attached to the same DOM element.
        undelegateEvents: function () {
            this.$el.off('.delegateEvents' + this.cid);
            return this;
        },

        // Performs the initial configuration of a View with a set of options.
        // Keys with special meaning *(e.g. model, collection, id, className)* are
        // attached directly to the view.  See `viewOptions` for an exhaustive
        // list.
        _configure: function (options) {
            if (this.options) options = _.extend({}, _.result(this, 'options'), options);
            _.extend(this, _.pick(options, viewOptions));
            this.options = options;
        },

        // Ensure that the View has a DOM element to render into.
        // If `this.el` is a string, pass it through `$()`, take the first
        // matching element, and re-assign it to `el`. Otherwise, create
        // an element from the `id`, `className` and `tagName` properties.
        _ensureElement: function () {
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
                this.setElement($el, false);
            } else {
                this.setElement(_.result(this, 'el'), false);
            }
        }

    });



    // Helpers
    // -------

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () { return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function () { this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    // Set up inheritance for the model, collection, router, view and history.
    View.extend = extend;



}).call(this);
define("B", function(){});

(function ($) {
  /***************************
  l_wang 提升点击响应速度
  *****************************/

  //需要用到的变量定义
  var trackingClick = false,
    trackingStart = 0, lastClickTime = 0, cancelNextClick = false, el = null, startX = 0, startY = 0, endX = 0, endY = 0, boundary = 4, isAndriond = navigator.userAgent.indexOf('Android') > 0, isIOS = /iP(ad|hone|od)/.test(navigator.userAgent), lastTouchIdentifier = 0, IOSWithBadTarget = isIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);

  function onTouchStart(e) {
    if (e.targetTouches.length > 1) {
      return true;
    }

    //改变获取焦点位置，解决获取焦点难问题
    el = e.target;

    var no_el = $(el).closest('.nofastclick');
    if (no_el.length > 0) return true;

    if (isIOS) {
      var selection = window.getSelection();
      if (selection.rangeCount && !selection.isCollapsed) {
        return true;
      }
      if (e.targetTouches[0].identifier === lastTouchIdentifier) {
        event.preventDefault();
        return false;
      }
      lastTouchIdentifier = e.targetTouches[0].identifier;
    }

    trackingClick = true;
    trackingStart = e.timeStamp;
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;

    //解决用户修改服务器时间问题
    if (e.timeStamp - lastClickTime < 0) lastClickTime = e.timeStamp;

    if (e.timeStamp - lastClickTime < 200) e.preventDefault();

    return true;
  }
  function onTouchMove(e) {
    if (!trackingClick) return true;
    endX = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;

    if (Math.abs(endX - startX) > boundary || Math.abs(endY - startY) > boundary) {
      el = null;
      trackingClick = false;
    }
    return true; ;
  }

  function onTouchEnd(e) {
    if (!trackingClick) return true;

    if ((e.timeStamp - lastClickTime) < 200) { cancelNextClick = true; return true; }

    lastClickTime = e.timeStamp;
    trackingClick = false;
    var tagName = el.tagName.toLowerCase();
    if (tagName == 'label') {
      var forEl = findControl(el);
      if (forEl) {
        var _el = $(forEl);
        if (_el.attr('type') == 'checkbox' || _el.attr('type') == 'radio') {
          if (_el.attr('checked')) _el.removeAttr('checked');
          else _el.attr('checked', 'checked')
        } else {
          $(forEl).focus();
        }
        if (isAndriond) return false;
        el = forEl;
      }
    }

    else if (needFocus(el)) {
      if ((e.timeStamp - trackingStart) > 100) {
        el = null;
        return false;
      }
      //      if (IOSWithBadTarget) {
      //        //解决ios7点击问题，看着这个代码我真想打自己......
      //        el.blur();
      //      }

      var length;
      if (isIOS && el.setSelectionRange && el.type.indexOf('date') !== 0 && el.type !== 'time') {
        length = el.value.length;
        el.setSelectionRange(length, length);
      } else {
        el.focus();
      }

      if (tagName !== 'select') {
        el = null;
        e.preventDefault();
      }
      return false;
    }

    trackingStart = 0;

    if (!needClick(el)) {
      e.preventDefault();
      sendClick(el, e);
    }
    return false;
  }

  function onTouchCancel(e) {
    trackingClick = false;
    el = null;
  }
  function onMouse(e) {
    var el1 = e.target;
    var no_el = $(el1).closest('.nofastclick');
    if (no_el.length > 0) return true;

    if (!el) return true;
    if (e.touchEvent) return true; //表示为自己触发便跳出了
    if (!e.cancelable) return true;
    if (!needClick(el) || cancelNextClick) {
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      else e.propagationStopped = true;
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    return true;
  }
  function onClick(e) {
    //只有touchend才能让他为true，所以这里直接跳出了
    if (trackingClick) {
      trackingClick = false;
      el = null;
      return true;
    }
    if (e.target.type === 'submit' && e.detail === 0) return true;
    var permitted = onMouse(e);
    if (!permitted) el = null;
    return permitted;
  }
  function needClick(el) {
    switch (el.nodeName.toLowerCase()) {
      case 'button':
      case 'select':
      case 'textarea':
        if (el.disabled) return true;
        break;
      case 'input':
        if ((isIOS && el.type === 'file') || el.disabled) return true;
        break;
      //	    case 'label':                
      case 'video':
        return true;
    }
    return (/\bneedclick\b/).test(el.className);
  }
  function needFocus(el) {
    switch (el.nodeName.toLowerCase()) {
      case 'textarea':
      case 'select':
        return true;
      case 'input':
        switch (el.type) {
          case 'button':
          case 'checkbox':
          case 'file':
          case 'image':
          case 'radio':
          case 'submit':
            return false;
        }
        return !el.disabled && !el.readOnly;
      default:
        return (/\bneedfocus\b/).test(el.className);
    }
  }
  function findControl(el) {
    if (el.control !== undefined) return el.control;
    if (el.htmlFor) return document.getElementById(el.htmlFor);
    return el.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
  }
  function sendClick(el, e) {
    var clickEvent, touch;
    if (document.activeElement && document.activeElement !== el) {
      document.activeElement.blur();
    }
    touch = e.changedTouches[0];
    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.touchEvent = true;
    el.dispatchEvent(clickEvent);
  }
  function needFast() {

    //    if (navigator.userAgent.indexOf('MQQBrowser') > 0) return false;
    if (typeof window.ontouchstart === 'undefined') return false;
    return true;
  }

  //该接口公开
  $.needFocus = needFocus;

  $.bindFastClick = function () {
    if (!needFast()) {
      return true;
    }

    $(document).ready(function () {
      if (isAndriond) {
        document.addEventListener('mouseover', onMouse, true);
        document.addEventListener('mousedown', onMouse, true);
        document.addEventListener('mouseup', onMouse, true);
      }
      document.addEventListener('click', onClick, true);
      $(document).on('touchstart', onTouchStart)
            .on('touchmove', onTouchMove)
            .on('touchend', onTouchEnd)
            .on('touchcancel', onTouchCancel);
    });
  }
  $.unbindFastClick = function () {
    if (!needFast()) {
      return true;
    }
    if (isAndriond) {
      document.removeEventListener('mouseover', onMouse, true);
      document.removeEventListener('mousedown', onMouse, true);
      document.removeEventListener('mouseup', onMouse, true);
    }
    document.removeEventListener('click', onClick, true);
    $(document).off('touchstart', onTouchStart)
        .off('touchmove', onTouchMove)
        .off('touchend', onTouchEnd)
        .off('touchcancel', onTouchCancel);
  }
})(Zepto)


;
define("F", function(){});

require.config({
//  baseUrl: '/webapp/',
  shim: {
    $: {
      exports: 'zepto'
    },
    _: {
      exports: '_'
    },
    B: {
      deps: [
        '_',
        '$'
      ],
      exports: 'Backbone'
    },
    common: {
      deps: [
        'libs'
      ]
    }
  },
  paths: {
    '$': 'res/libs/zepto',
    '_': 'res/libs/underscore',
    'B': 'res/libs/backbone',
    'libs': 'libs_r',
    'common': 'app/common'
  }
});

require(['$', '_', 'B'], function () {

});
define("libs", function(){});

/**
 * @license RequireJS text 2.0.5+ Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
 define, window, process, Packages,
 java, location, Components, FileUtils */

define('text',['module'], function (module) {
  

  var text, fs, Cc, Ci,
    progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
    xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
    bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
    hasLocation = typeof location !== 'undefined' && location.href,
    defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
    defaultHostName = hasLocation && location.hostname,
    defaultPort = hasLocation && (location.port || undefined),
    buildMap = [],
    masterConfig = (module.config && module.config()) || {};

  text = {
    version: '2.0.5+',

    strip: function (content) {
      //Strips <?xml ...?> declarations so that external SVG and XML
      //documents can be added to a document without worry. Also, if the string
      //is an HTML document, only the part inside the body tag is returned.
      if (content) {
        content = content.replace(xmlRegExp, "");
        var matches = content.match(bodyRegExp);
        if (matches) {
          content = matches[1];
        }
      } else {
        content = "";
      }
      return content;
    },

    jsEscape: function (content) {
      return content.replace(/(['\\])/g, '\\$1')
        .replace(/[\f]/g, "\\f")
        .replace(/[\b]/g, "\\b")
        .replace(/[\n]/g, "\\n")
        .replace(/[\t]/g, "\\t")
        .replace(/[\r]/g, "\\r")
        .replace(/[\u2028]/g, "\\u2028")
        .replace(/[\u2029]/g, "\\u2029");
    },

    createXhr: masterConfig.createXhr || function () {
      //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
      var xhr, i, progId;
      if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
      } else if (typeof ActiveXObject !== "undefined") {
        for (i = 0; i < 3; i += 1) {
          progId = progIds[i];
          try {
            xhr = new ActiveXObject(progId);
          } catch (e) {}

          if (xhr) {
            progIds = [progId];  // so faster next time
            break;
          }
        }
      }

      return xhr;
    },

    /**
     * Parses a resource name into its component parts. Resource names
     * look like: module/name.ext!strip, where the !strip part is
     * optional.
     * @param {String} name the resource name
     * @returns {Object} with properties "moduleName", "ext" and "strip"
     * where strip is a boolean.
     */
    parseName: function (name) {
      var modName, ext, temp,
        strip = false,
        index = name.indexOf("."),
        isRelative = name.indexOf('./') === 0 ||
          name.indexOf('../') === 0;

      if (index !== -1 && (!isRelative || index > 1)) {
        modName = name.substring(0, index);
        ext = name.substring(index + 1, name.length);
      } else {
        modName = name;
      }

      temp = ext || modName;
      index = temp.indexOf("!");
      if (index !== -1) {
        //Pull off the strip arg.
        strip = temp.substring(index + 1) === "strip";
        temp = temp.substring(0, index);
        if (ext) {
          ext = temp;
        } else {
          modName = temp;
        }
      }

      return {
        moduleName: modName,
        ext: ext,
        strip: strip
      };
    },

    xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

    /**
     * Is an URL on another domain. Only works for browser use, returns
     * false in non-browser environments. Only used to know if an
     * optimized .js version of a text resource should be loaded
     * instead.
     * @param {String} url
     * @returns Boolean
     */
    useXhr: function (url, protocol, hostname, port) {
      var uProtocol, uHostName, uPort,
        match = text.xdRegExp.exec(url);
      if (!match) {
        return true;
      }
      uProtocol = match[2];
      uHostName = match[3];

      uHostName = uHostName.split(':');
      uPort = uHostName[1];
      uHostName = uHostName[0];

      return (!uProtocol || uProtocol === protocol) &&
        (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
        ((!uPort && !uHostName) || uPort === port);
    },

    finishLoad: function (name, strip, content, onLoad) {
      content = strip ? text.strip(content) : content;
      if (masterConfig.isBuild) {
        buildMap[name] = content;
      }
      onLoad(content);
    },

    load: function (name, req, onLoad, config) {
      //Name has format: some.module.filext!strip
      //The strip part is optional.
      //if strip is present, then that means only get the string contents
      //inside a body tag in an HTML string. For XML/SVG content it means
      //removing the <?xml ...?> declarations so the content can be inserted
      //into the current doc without problems.

      // Do not bother with the work if a build and text will
      // not be inlined.
      if (config.isBuild && !config.inlineText) {
        onLoad();
        return;
      }

      masterConfig.isBuild = config.isBuild;

      var parsed = text.parseName(name),
        nonStripName = parsed.moduleName +
          (parsed.ext ? '.' + parsed.ext : ''),
        url = req.toUrl(nonStripName),
        useXhr = (masterConfig.useXhr) ||
          text.useXhr;

      //Load the text. Use XHR if possible and in a browser.
      if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
        text.get(url, function (content) {
          text.finishLoad(name, parsed.strip, content, onLoad);
        }, function (err) {
          if (onLoad.error) {
            onLoad.error(err);
          }
        });
      } else {
        //Need to fetch the resource across domains. Assume
        //the resource has been optimized into a JS module. Fetch
        //by the module name + extension, but do not include the
        //!strip part to avoid file system issues.
        req([nonStripName], function (content) {
          text.finishLoad(parsed.moduleName + '.' + parsed.ext,
            parsed.strip, content, onLoad);
        });
      }
    },

    write: function (pluginName, moduleName, write, config) {
      if (buildMap.hasOwnProperty(moduleName)) {
        var content = text.jsEscape(buildMap[moduleName]);
        write.asModule(pluginName + "!" + moduleName,
          "define(function () { return '" +
            content +
            "';});\n");
      }
    },

    writeFile: function (pluginName, moduleName, req, write, config) {
      var parsed = text.parseName(moduleName),
        extPart = parsed.ext ? '.' + parsed.ext : '',
        nonStripName = parsed.moduleName + extPart,
      //Use a '.js' file name so that it indicates it is a
      //script that can be loaded across domains.
        fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

      //Leverage own load() method to load plugin value, but only
      //write out values that do not have the strip argument,
      //to avoid any potential issues with ! in file names.
      text.load(nonStripName, req, function (value) {
        //Use own write() method to construct full module value.
        //But need to create shell that translates writeFile's
        //write() to the right interface.
        var textWrite = function (contents) {
          return write(fileName, contents);
        };
        textWrite.asModule = function (moduleName, contents) {
          return write.asModule(moduleName, fileName, contents);
        };

        text.write(pluginName, nonStripName, textWrite, config);
      }, config);
    }
  };

  if (masterConfig.env === 'node' || (!masterConfig.env &&
    typeof process !== "undefined" &&
    process.versions &&
    !!process.versions.node)) {
    //Using special require.nodeRequire, something added by r.js.
    fs = require.nodeRequire('fs');

    text.get = function (url, callback) {
      var file = fs.readFileSync(url, 'utf8');
      //Remove BOM (Byte Mark Order) from utf8 files if it is there.
      if (file.indexOf('\uFEFF') === 0) {
        file = file.substring(1);
      }
      callback(file);
    };
  } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
    text.createXhr())) {
    text.get = function (url, callback, errback, headers) {
      var xhr = text.createXhr(), header;
      xhr.open('GET', url, true);

      //Allow plugins direct access to xhr headers
      if (headers) {
        for (header in headers) {
          if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header.toLowerCase(), headers[header]);
          }
        }
      }

      //Allow overrides specified in config
      if (masterConfig.onXhr) {
        masterConfig.onXhr(xhr, url);
      }

      xhr.onreadystatechange = function (evt) {
        var status, err;
        //Do not explicitly handle errors, those should be
        //visible via console output in the browser.
        if (xhr.readyState === 4) {
          status = xhr.status;
          if (status > 399 && status < 600) {
            //An http 4xx or 5xx error. Signal an error.
            err = new Error(url + ' HTTP status: ' + status);
            err.xhr = xhr;
            errback(err);
          } else {
            callback(xhr.responseText);
          }
        }
      };
      xhr.send(null);
    };
  } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
    typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
    //Why Java, why is this so awkward?
    text.get = function (url, callback) {
      var stringBuffer, line,
        encoding = "utf-8",
        file = new java.io.File(url),
        lineSeparator = java.lang.System.getProperty("line.separator"),
        input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
        content = '';
      try {
        stringBuffer = new java.lang.StringBuffer();
        line = input.readLine();

        // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
        // http://www.unicode.org/faq/utf_bom.html

        // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
        // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
        if (line && line.length() && line.charAt(0) === 0xfeff) {
          // Eat the BOM, since we've already found the encoding on this file,
          // and we plan to concatenating this buffer with others; the BOM should
          // only appear at the top of a file.
          line = line.substring(1);
        }

        stringBuffer.append(line);

        while ((line = input.readLine()) !== null) {
          stringBuffer.append(lineSeparator);
          stringBuffer.append(line);
        }
        //Make sure we return a JavaScript string and not a Java string.
        content = String(stringBuffer.toString()); //String
      } finally {
        input.close();
      }
      callback(content);
    };
  } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
    typeof Components !== 'undefined' && Components.classes &&
    Components.interfaces)) {
    //Avert your gaze!
    Cc = Components.classes,
      Ci = Components.interfaces;
    Components.utils['import']('resource://gre/modules/FileUtils.jsm');

    text.get = function (url, callback) {
      var inStream, convertStream,
        readData = {},
        fileObj = new FileUtils.File(url);

      //XPCOM, you so crazy
      try {
        inStream = Cc['@mozilla.org/network/file-input-stream;1']
          .createInstance(Ci.nsIFileInputStream);
        inStream.init(fileObj, 1, 0, false);

        convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
          .createInstance(Ci.nsIConverterInputStream);
        convertStream.init(inStream, "utf-8", inStream.available(),
          Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

        convertStream.readString(inStream.available(), readData);
        convertStream.close();
        inStream.close();
        callback(readData.value);
      } catch (e) {
        throw new Error((fileObj && fileObj.path || '') + ': ' + e);
      }
    };
  }
  return text;
});
/**
 * @File lizard.seed.js
 * Lizard基础类，框架种子文件
 * @author wxj@ctrip.com/luwei@ctripcom
 * @version V2.1
 */
/**
 * Lizard框架的基础类,全局属性,绑定了一写常用的方法
 * @namespace Global.Lizard
 * @example
 *
 * //页面跳转
 * Lizard.goTo()
 * //页面回退
 * Lizard.goBack()
 * //跨页面跳转
 * Lizard.jump()
 *
 * //读取URL变量
 * Lizard.P()
 * //读取模板配置
 * Lizard.T()
 * //读取Model配置
 * Lizard.D()
 * //读取LocalStorage
 * Lizard.S()
 */

(function () {
  //初始化Lizard命名空间
  Lizard = typeof Lizard != 'undefined' ? Lizard : {
    /**
     * Lizard 版本
     * @var {String} [Global.Lizard.version=2.1]
     */
    version     : "2.1",
    /**
     * 判断现在运行的包是否是Hybrid包
     * @var {Boolean} Global.Lizard.isHybrid
     */
    isHybrid    : !!(window.LizardLocalroute),
    /**
     * 判断是否在携程的APP中打开H5页面
     * @var {Boolean} Global.Lizard.isInCtripApp
     */
    isInCtripApp: !!(navigator.userAgent.match(/ctripwireless/i) && (window.location.protocol != "file:")),

    /**
     * 当页面切换完成时调用,用于Lizard与外部的借口,外部可以注册这个方法
     * @method Global.Lizard.viewReady
     * @param {View} view 切换完成后,当前的view对象
     */
    viewReady  : function () {
    },
    notpackaged: typeof require == 'undefined'
  };
  //初始化lizard属性
  initLizardConfig();
  //加载资源文件
  loadRes();
  window.Lizard = Lizard;


  /*
   * 组织UI组件路径
   * @param path
   * @returns {string}
   */
  window.getAppUITemplatePath = function (path) {
    if (!Lizard.notpackaged) return 'text!' + 'ui/' + path + '.html';
    if (document.location.href.indexOf('172.16.140.104:5389') > 0 || document.location.href.indexOf('localhost') > 0)
      return 'text!' + Lizard.dir + 'ui/' + path + '.html';

    return 'text!' + 'ui/' + path + '.html';
  }

  /*
   * 加载单个js文件
   * @param url
   * @param callback
   */
  function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.async = true;
    script.onload = callback;
    script.src = url;
    document.body.appendChild(script);
  }

  /*
   * 加载多个js文件
   * @param scripts
   * @param callback
   */
  function mutileLoad(scripts, callback) {
    var len = scripts.length;
    var no = 0;
    if (!len) {
      end();
      return;
    }
    for (var i = 0; i < len; i++) {
      var url = scripts[i];
      loadScript(url, end);
    }

    function end() {
      no++;
      if (no >= len) {
        callback();
      }
    }
  }

  /*
   * 解析lizard.seed.js标签的属性，初始化izard.dir,Lizard.pdConfig
   * Lizard.config 三个属性
   */
  function initLizardConfig() {
    var scripts = document.getElementsByTagName('script') || [];
    var reg = /lizard\.seed\.(src\.)*js.*$/ig;
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src");
      if (src && reg.test(src)) {
        Lizard.dir = src.replace(reg, '');
        var configStr = scripts[i].getAttribute("pdConfig") || '';
        Lizard.pdConfig = JSON.parse('["' + configStr.split(',').join('","') + '"]');
        if (scripts[i].getAttribute("lizardConfig")) {
          try {
            eval('Lizard.config = {' + scripts[i].getAttribute("lizardConfig") + '}')
          } catch (e) {
            console.log(e.stack)
          }
        } else {
          Lizard.config = {};
        }
        break;
      }
    }
  }


  /*
   * 加载AMD模块文件
   * @param e
   */
  function amdLoaderLoaded(e) {
    var configModel = Lizard.notpackaged ? [Lizard.dir + 'config.js'] : ['config']
    require(configModel, function () {
      var reqs = [];
      if (!Lizard.isHybrid) {
        if (Lizard.isInCtripApp) {
          reqs.push('cHybridAppInit');
          reqs.push('cStatic');
        }
        else {
          reqs.push('cWebAppInit');
        }
      }
      else {
        reqs.push('cHybridAppInit');
      }
      if (!Lizard.notpackaged) {
        if (Lizard.isHybrid || Lizard.isInCtripApp) {
          reqs.push('cBaseInit');
        }
        define("_", function () {
        });
        define("$", function () {
        });
        define("B", function () {
        });
        define("F", function () {
        });
      }
      require(['_', '$'], function () {
        /**
         * webresources站点的根目录地址,获取meta中webresourceBaseUrl的值,可以在html的meta属性指定
         * @var {String} Global.Lizard.webresourceBaseUrl
         * @example
         * meta name="webresourceBaseUrl" content="http://webresource.c-ctrip.com/" lizardExpansion="true"
         */

        /**
         * PD的webresources站点的根目录地址,获取meta中WebresourcePDBaseUrl的值,可以在html的meta属性指定
         * @var {String} Global.Lizard.WebresourcePDBaseUrl
         * @example
         * meta name="WebresourcePDBaseUrl" content="/webapp/car/webresource/" lizardExpansion="true"
         */

        /**
         * BU app的根目录地址,获取meta中appBaseUrl的值,可以在html的meta属性指定
         * @var {String} Global.Lizard.appBaseUrl
         * @example
         *  meta name="appBaseUrl" content="/webapp/car/" lizardExpansion="true"
         */

        /**
         * restfullApi 是获取http数据的地址,获取meta中restfullApi的值,可以在html的meta属性指定
         * @var {String} Global.Lizard.restfullApi
         * @example
         * meta name="restfullApi" content="http://m.ctrip.com/restapi/soa2/10134" lizardExpansion="true"
         */

        /**
         * restfullApiHttps 是获取https数据的地址,获取meta中restfullApiHttps的值,可以在html的meta属性指定
         * @var {String} Global.Lizard.restfullApiHttps
         */

        /**
         * timeout 全局的ajax取数据的超时时间,默认为30s, 可以在html的meta属性指定
         * @var {String} [Global.Lizard.timeout=30s]
         * @example
         * meta name="timeout" content="5000" lizardExpansion="true"
         */

        /**
         * multiView hybrid下,是否开通多webView,默认为false
         * @var {String} [Global.Lizard.multiView=off]
         * @example
         * meta name="multiView" content="off" lizardExpansion="true"
         */
        var lizardExpansions = ["appBaseUrl", "webresourceBaseUrl", "restfullApi", "restfullApiHttps", "WebresourcePDBaseUrl"];
        _.each($('meta'), function (metatag) {
          var tagObj = $(metatag);
          if (tagObj.attr('lizardExpansion') || _.contains(lizardExpansions, tagObj.attr('name'))) {
            Lizard[tagObj.attr('name')] = tagObj.attr('content');
          }
        });
        require(reqs, function () {
          if (_.isFunction(arguments[arguments.length - 1])) {
            arguments[arguments.length - 1]();
          }
        });
      });
    });
  }

  /*
   * 加载资源文件
   */
  function loadRes() {
    var basescripts = [];
    if (Lizard.notpackaged) {
      basescripts = [Lizard.dir + "3rdlibs/require.min.js"];
    } else {
      if (!Lizard.isHybrid && !Lizard.isInCtripApp) {
        basescripts.push(Lizard.dir + 'lizard.web.js');
      }
      if (Lizard.isHybrid) {
        //hybrid 环境下,根据引用目录,载入UBT文件 shbzhang
        var src = "ubt/_mubt.min.js";
        var lizardDir = Lizard.dir;
        if (lizardDir) {
          var path = lizardDir.substr(0, lizardDir.indexOf('lizard/webresource'));
          src = path + src;
        }
        basescripts.push(src);
      }
    }
    if (Lizard.isHybrid || Lizard.isInCtripApp) {
      Lizard.mutileLoad = function () {
        mutileLoad(basescripts, amdLoaderLoaded);
      };
    } else {
      mutileLoad(basescripts, amdLoaderLoaded);
    }
  }
})();
define("seed", function(){});

/**
 * @namespace Common.cCoreInherit
 * @description Class类，框架的基础类体系
 * @author cmli@ctrip.com / oxz欧新志 <ouxz@Ctrip.com> / vzyq张有泉 <yq.zhang@Ctrip.com>
 */
define('cCoreInherit',['libs'], function (libs) {

  var slice = [].slice;
  var Core = function () {
  };


  /**
   * @description Class方法，js的继承
   * @method Common.cCoreInherit.Class
   * @param {function} supClass 可选，要继承的类
   * @param {object} subProperty 被创建类的成员
   * @return {function} 被创建的类
   * @example
   * var Parent = cCoreInherit.Class({
   *  //定义类属性
   *  __propertys__ : function () {
   *    this.Name = 'Parent';
   *    this.Type = 'Animal'
   *  },
   *  //构造方法
   *  initialize: function (options) {
   *
	 *  },
	 *
	 *  //定义类方法
	 *  sayHello: function(name){
	 *    console.log('parent say : hello '+ name +'!');
	 *  }
   * });
   *
   * var Child = cCoreInherit.Class(Parent,{
   *  //定义类属性
   *  __propertys__ : function () {
   *    this.Name = 'Child'
   *  },
   *  //构造方法
   *  initialize: function ($super, options) {
   *   //调用父类的构造方法
   *   $super(options);
   *  },
   *
   *  sayHello: function($super, name){
	 *    //调用父类的方法
	 *    $super(name);
	 *    console.log('child say : hello '+ name +'!');
	 *  }
   * });
   *
   * var parent = new Parent();
   * var child = new Child ();
   * parent.sayHello('anders')
   * //parent say : hello anders!
   * child.sayHello('jack');
   * //parent say : hello jack!
   * //child say : hello jack!
   */
  Core.Class = function () {
    if (arguments.length == 0 || arguments.length > 2) throw '参数错误';

    var parent = null;
    //将参数转换为数组
    var properties = slice.call(arguments);

    //如果第一个参数为类（function），那么就将之取出
    if (typeof properties[0] === 'function')
      parent = properties.shift();
    properties = properties[0];

    function klass() {
      this.__propertys__();
      this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;
    klass.subclasses = [];

    var sup__propertys__ = function () {
    };
    var sub__propertys__ = properties.__propertys__ || function () {
    };

    if (parent) {
      if (parent.prototype.__propertys__) sup__propertys__ = parent.prototype.__propertys__;

      var subclass = function () {
      };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }


    var ancestor = klass.superclass && klass.superclass.prototype;
    for (var k in properties) {
      var value = properties[k];

      //满足条件就重写
      if (ancestor && typeof value == 'function') {
        var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/i, '').split(',');
        //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）
        if (argslist[0] === '$super' && ancestor[k]) {
          value = (function (methodName, fn) {
            return function () {
              var scope = this;
              var args = [function () {
                return ancestor[methodName].apply(scope, arguments);
              } ];
              return fn.apply(this, args.concat(slice.call(arguments)));
            };
          })(k, value);
        }
      }

      klass.prototype[k] = value;
    }

    if (!klass.prototype.initialize)
      klass.prototype.initialize = function () {
      };

    //兼容现有框架，__propertys__方法直接重写
    klass.prototype.__propertys__ = function () {
      sup__propertys__.call(this);
      sub__propertys__.call(this);
    };

//   //兼容代码，非原型属性也需要进行继承
//   for (key in parent) {
//     if (parent.hasOwnProperty(key) && key !== 'prototype')
//       klass[key] = parent[key];
//   }

    //兼容代码，非原型属性也需要进行继承
    for (key in parent) {
      if (parent.hasOwnProperty(key) && key !== 'prototype' && key !== 'superclass')
        klass[key] = parent[key];
    }

    klass.prototype.constructor = klass;

    return klass;
  };


  /**
   * @description 对象扩展
   * @method Common.cCoreInherit.extend
   * @param {object} targetObj 原型对象
   * @param {object} sourceObj1 要继承的对象1
   * @param {object} ... 要继承的对象2
   * @returns {object} res
   * @example
   *  var O1 = {
   *    "name" : "jim"
   *  };
   *
   *  var O2 = {
   *    "age": 18
   *  }
   *
   *  var O3 = {};
   *  cCoreInherit.extend(O3,O1,O2)
   *  // O3 = {
   *    "name" : "jim",
   *    "age": 18
   *  }
   */
  Core.extend = function () {
    var args = slice.call(arguments);
    var source = args.shift() || {};

    if (!source) return false;

    for (var i = 0, l = args.length; i < l; i++) {
      if (typeof args[i] === 'object') {
        for (var key in args[i]) {
          source[key] = args[i][key];
        }
      }
    }

    return source;
  };

  /**
   * @description 对原型链的扩充
   * @method Common.cCoreInherit.implement
   * @param {function} fn 构造函数
   * @param {object} propertys 需要補充在原型链上的方法和属性
   * @returns {Function}
   */
  Core.implement = function (fn, propertys) {
    if (typeof fn !== 'function') return false;

    for (var i in propertys) {
      fn.prototype[i] = propertys[i];
    }

    return fn;
  };

  return Core;
});
/**
 * @File c.util.data.js
 * @Description: Date常用工具方法
 * @author oxzhi@ctrip.com/shbzhang@ctrip.com
 * @date 2014-09-28 11:05:37
 * @version V1.0
 */

/**
 *  @namespace Util.cUtilDate
 *  @name Util.cUtilDate
 */
define('cUtilDate',['cCoreInherit'], function (inherit, cUtilCommon) {
  //var cDate = {};

  var cDate = new inherit.Class({
    /**
     * 生成一个CDate实例
     * @class CDate
     * @memberof Util.cUtilDate
     * @param {Date} [date] 日期
     * @type {Core.Class}
     */
    initialize: function (date) {
      date = date || new Date();
      this.date = new Date(date);
    },

    /**
     * @description 当前时间加n天
     * @method addDay
     * @memberof Util.cUtilDate.CDate
     * @param {Number} n
     * @returns {cDate}
     */
    addDay: function (n) {
      n = n || 0;
      this.date.setDate(this.date.getDate() + n);
      return this;
    },

    /**
     * @description 当前时间加n月
     * @memberof Util.cUtilDate.CDate
     * @param {Number} n
     * @returns {cDate}
     */
    addMonth: function (n) {
      n = n || 0;
      this.date.setMonth(this.date.getMonth() + n);
      return this;
    },

    /**
     * @description 当前时间加n个小时
     * @memberof Util.cUtilDate.CDate
     * @param {Number} n
     * @returns {cDate}
     */
    addHours: function (n) {
      n = n || 0;
      this.date.setHours(this.date.getHours() + n);
      return this;
    },

    /**
     * 当前时间基础上增加n分
     * @memberof Util.cUtilDate.CDate
     * @param {Number} n
     * @returns {cDate}
     */
    addMinutes: function (n) {
      n = n || 0;
      this.date.setMinutes(this.date.getMinutes() + n);
      return this;
    },
    /**
     * 当前时间基础上增加n秒
     * @memberof Util.cUtilDate.CDate
     * @param {Number} n
     * @returns {cDate}
     */
    addSeconds: function (n) {
      n = n || 0;
      this.date.setSeconds(this.date.getSeconds() + n);
      return this;
    },

    /**
     * @description 当前时间加n年
     * @memberof Util.cUtilDate.CDate
     * @param {Number} n
     * @returns {cDate}
     */
    addYear: function (n) {
      n = n || 0;
      this.date.setYear(this.date.getFullYear() + n);
      return this;
    },

    /**
     * @description 设置当前时间的小时，分，秒
     * @memberof Util.cUtilDate.CDate
     */
    setHours: function () {
      this.date.setHours.apply(this.date, arguments);
      return this;
    },

    /**
     * 获得原生Date对象
     * @memberof Util.cUtilDate.CDate
     * @returns {Date}
     */
    valueOf: function () {
      return this.date;
    },

    /**
     * 获得毫秒数
     * @memberof Util.cUtilDate.CDate
     * @returns {number} 毫秒
     */
    getTime: function () {
      return this.date.valueOf();
    },

    /**
     * 获得utc时间字符串
     * @memberof Util.cUtilDate.CDate
     */
    toString: function () {
      return this.date.toString();
    },

    /**
     * @description 格式化时间,格式化参数请参考php中date函数说明
     * @memberof Util.cUtilDate.CDate
     * @param {String} format
     * @returns {String}
     * @see http://www.php.net/manual/zh/function.date.php
     */
    format: function (format) {
      if (typeof format !== 'string')
        format = '';

      for (var key in this._MAPS) {
        format = this._MAPS[key].call(this, format, this.date, key);
      }
      return format;
    },

    /**
     * @description 返回输入Date的相差的月份数
     * @memberof Util.cUtilDate.CDate
     * @param {Date} 要计算的时间
     * @return {Number} 月数
     */
    diffMonth: function (date) {
      var curY = parseInt(this.format('Y'), 10),
        curM = parseInt(this.format('m'), 10),
        cdate = new cDate(date),
        cdateY = parseInt(cdate.format('Y'), 10),
        cdateM = parseInt(cdate.format('m'), 10);

      return (cdateY - curY) * 12 + (cdateM - curM);
    },
    //星期数据
    _DAY1: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    _DAY2: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    //时间格式化函数集
    _MAPS: {
      //有前导零的日期值
      'd': function (str, date, key) {
        var d = date.getDate().toString();
        if (d.length < 2) d = '0' + d;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //无前导零的日期值
      'j': function (str, date, key) {
        return str.replace(new RegExp(key, 'mg'), date.getDate());
      },
      //星期中的第几天 1-7
      'N': function (str, date, key) {
        var d = date.getDay();
        if (d === 0) d = 7;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      'w': function (str, date, key) {
        var d = date.getDay();
        var title = this._DAY1[d];
        return str.replace(new RegExp(key, 'mg'), title);
      },
      'W': function (str, date, key) {
        var d = date.getDay();
        var title = this._DAY2[d];
        return str.replace(new RegExp(key, 'mg'), title);
      },
      //有前导零的月份
      'm': function (str, date, key) {
        var d = (date.getMonth() + 1).toString();
        if (d.length < 2) d = '0' + d;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //无前导零的月份
      'n': function (str, date, key) {
        return str.replace(key, date.getMonth() + 1);
      },
      //四位年份
      'Y': function (str, date, key) {
        return str.replace(new RegExp(key, 'mg'), date.getFullYear());
      },
      //两位年份
      'y': function (str, date, key) {
        return str.replace(new RegExp(key, 'mg'), date.getYear());
      },
      //无前导零的小时,12小时制
      'g': function (str, date, key) {
        var d = date.getHours();
        if (d >= 12) d = d - 12;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //无前导零的小时，24小时制
      'G': function (str, date, key) {
        return str.replace(new RegExp(key, 'mg'), date.getHours());
      },
      //有前导零的小时，12小时制
      'h': function (str, date, key) {
        var d = date.getHours();
        if (d >= 12) d = d - 12;
        d += '';
        if (d.length < 2) d = '0' + d;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //有前导零的小时，24小时制
      'H': function (str, date, key) {
        var d = date.getHours().toString();
        if (d.length < 2) d = '0' + d;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //有前导零的分钟
      'i': function (str, date, key) {
        var d = date.getMinutes().toString();
        if (d.length < 2) d = '0' + d;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //有前导零的秒
      's': function (str, date, key) {
        var d = date.getSeconds().toString();
        if (d.length < 2) d = '0' + d;
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //无前导零的分钟
      'I': function (str, date, key) {
        var d = date.getMinutes().toString();
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //无前导零的秒
      'S': function (str, date, key) {
        var d = date.getSeconds().toString();
        return str.replace(new RegExp(key, 'mg'), d);
      },
      //转换为今天/明天/后天
      'D': function (str, date, key) {
        var now = cDate.getServerDate();
        now.setHours(0, 0, 0, 0);
        date = new Date(date.valueOf());
        date.setHours(0, 0, 0, 0);
        var day = 60 * 60 * 24 * 1000,
          tit = '',
          diff = date - now;
        if (diff >= 0) {
          if (diff < day) {
            tit = '今天';
          } else if (diff < 2 * day) {
            tit = '明天';
          } else if (diff < 3 * day) {
            tit = '后天';
          }
        }
        return str.replace(new RegExp(key, 'mg'), tit);
      }
    }
  });

  inherit.extend(cDate, {
    /**
     * 将字符串转换为CDate对象
     * @static
     * @memberof Util.cUtilDate
     * @param {String} str
     * @returns {cDate}
     */
    parse: function (str, isNative) {
      if (typeof str === 'undefined') {
        return new Date();
      }
      if (typeof str === 'string') {
        str = str || '';
        var regtime = /^(\d{4})\-?(\d{1,2})\-?(\d{1,2})/i;
        if (str.match(regtime)) {
          str = str.replace(regtime, "$2/$3/$1");
        }
        var st = Date.parse(str);
        var t = new Date(st || new Date());
        return isNative ? t : new cDate(t);
      } else if (typeof str === 'number') {
        return new Date(str);
      } else {
        return new Date();
      }
    },

    /**
     * 返回HH：MM格式
     * @static
     * @memberof Util.cUtilDate
     * @param {string} timeStr 日期字符串
     */
    getHM: function (timeStr) {
      var d = this._getDate(timeStr);
      var h = d.getHours();
      var m = d.getMinutes();
      return (h < 10 ? '0' + h : '' + h) + ':' + (m < 10 ? '0' + m : '' + m);
    },

    /**
     * 返回两个日期相差的天数
     * @static
     * @memberof Util.cUtilDate
     * @param {String} ds1  日期1
     * @param {Stirng} ds2  日期2
     * @returns {Number} num 相差天数
     */
    getIntervalDay: function (ds1, ds2) {
      var d1 = this._getDate(ds1);
      var d2 = this._getDate(ds2);
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      return parseInt((d2 - d1) / 86400000);
    },

    /**
     * 将分钟转还为小时字符串，如90输出为1小时30分钟
     * @static
     * @memberof Util.cUtilDate
     * @param {Number} min 分钟
     * @returns {string} 转换结果
     */
    m2H: function (min) {
      var h = Math.floor(min / 60);
      var m = min % 60;
      return (h > 0 ? h + '小时' : '') + (m > 0 ? m + '分钟' : '');
    },

    _getDate: function (ds) {
      var t = cDate.parse(ds, true);
      var d = new Date();
      d.setTime(t);
      return d;
    },

    /**
     * 日期类型格式化为指定字符串
     * @static
     * @memberof Util.cUtilDate
     * @param {Date} obj
     * @param {String} str
     * @returns {String|*}
     */
    format: function (obj, str) {
      return new cDate(obj).format(str);
    },
    /**
     *  获取周几，d为日期C.parse(d);
     *  @static
     *  @memberof Util.cUtilDate
     *  @param {date|string} date 输入
     *  @return {string} 结果 周日，周一...周六
     */
    weekday: function (d) {
      var day = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var dd = new Date(d);
      return day[dd.getDay()];
    },
    /**
     * 计算两个时间的相隔月份数
     * @static
     * @memberof Util.cUtilDate
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    diffMonth: function (d1, d2) {
      d1 = new cDate(d1);
      return d1.diffMonth(d2);
    },

    /**
     * @static
     * @method getServerDate
     * @memberof Util.cUtilDate
     * @param {function} [callback]
     * @returns {date} date 服务器时间
     * @description 获取服务端时间
     */
    getServerDate : function(callback) {
      var now = new Date();
      var applyCallback = function (date) {
        if (typeof callback === 'function') {
          return callback(date);
        }
        return date;
      };

      /** 在App层调用的回调部分 */
      var hybridCallback = function () {
        var serverdate = window.localStorage.getItem('SERVERDATE');

        /** 如果没有从LocalStorage中获得数据直接返回 */
        if (!serverdate) {
          return applyCallback(now);
        }
        /** servertime的计算逻辑：第一次进入取本地时间和服务器时间的差值，保存差值。每次再取差值加上本地时间，计算出服务端时间 */
        try {
          serverdate = JSON.parse(serverdate);
          if (serverdate && serverdate.server && serverdate.local) {
            var servertime = window.parseInt(serverdate.server);
            var localtime = window.parseInt(serverdate.local);
            var currenttime = (new Date()).getTime();
            var cServertime = new Date(servertime + currenttime - localtime);

            return applyCallback(cServertime);
          } else {
            return applyCallback(now);
          }
        } catch (e) {

          return applyCallback(now);
        }
      };

      /** 在Web层调用的回调 */
      var webCallback = function () {
        if (typeof __SERVERDATE__ === 'undefined' || !__SERVERDATE__.server) {
          return applyCallback(now);
        }
        /** 计算server time的时间  */
        var servertime = new Date(__SERVERDATE__.server.valueOf() + (new Date().valueOf() - __SERVERDATE__.local.valueOf()));
        return applyCallback(servertime);
      };

      return Lizard.isHybrid ? hybridCallback() : webCallback();
    }
  });

  return cDate;
});
/**
 * @File c.util.object.js
 * @Description: hybrid环境的常用工具方法
 * @author shbzhang@ctrip.com
 * @date 2014-09-28 15:10:38
 * @version V1.0
 */

/**
 * 与Hybrid相关的工具方法
 * @namespace Util.cUtilObject
 */
define('cUtilObject',[], function () {

  var Obj = {};

  /**
   * @description 设置对象某个路径上的值
   * @method Util.cUtilObject.set
   * @param {object} obj
   * @param {string} string
   * @param {object|array|int} value
   * @returns {object}
   */
  Obj.set = function (obj, path, value) {
    if (!path) return null;

    var array = path.split('.');

    obj = obj || {};

    for (var i = 0, len = array.length, last = Math.max(len - 1, 0); i < len; i++) {
      if (i < last) {
        obj = (obj[array[i]] = obj[array[i]] || {});
      } else {
        obj[array[i]] = value;
      }
    }

    return obj;
  };

  /**
   * @description 获得对象在某个路径上的值
   * @method Util.cUtilObject.get
   * @param {object} obj
   * @param {string} path
   * @returns {object}
   */
  Obj.get = function (obj, path) {
    if (!obj || !path)
      return null;

    var array = path.split('.');

    obj = obj || {};

    for (var i = 0, len = array.length, last = Math.max(len - 1, 0); i < len; i++) {
      obj = obj[array[i]];

      if (obj === null || typeof obj === 'undefined') {
        return null;
      }
    }

    return obj;
  };


  return Obj;
});
/**
 * @File c.abstract.store.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @description 抽象Store
 */
/**
 * store抽象类,封装对本地缓存的操作
 * 一般不直接使用此类,而使用继承自该类的{@link Store.cLocalStore}和{@link Store.cSessionStore}
 * @namespace Store.cAbstractStore
 * @example
 *  var data = {name:'jim'}
 *  var store = DemoStore.getInstance();
 *  store.set(data);
 *  store.setAttr('name','james');
 */
define('cAbstractStore',['cCoreInherit',  'cUtilDate', 'cUtilObject'], function (cCoreInherit, CDate, cUtilObject) {

  HObject = cUtilObject;

  var Store = new cCoreInherit.Class({

    __propertys__: function () {
	    /*
	     * 空对象
	     * @var {object} Store.cAbstractStore.NULL
	     */
      this.NULL = {};
	    /**
	     * Store键值
	     * @var {String} Store.cAbstractStore.key
	     */
      this.key = this.NULL;

	    /**
	     * 数据存活时间, 参数传递格式为“时间+时间单位",如30M
	     * 时间单位有D:day,H:hour,M:minutes,S:secend,
	     * 如过不传递时间单位,默认时间单位为M
	     * @var {String} Store.cAbstractStore.lifeTime
	     */
      this.lifeTime = '30M';

	    /**
	     * 要否需要使用服务器时间
	     * @var {boolean} Store.cAbstractStore.useServerTime
	     */
      this.useServerTime = false;

      /**
       * 默认返回数据
       * @var {object} Store.cAbstractStore.defaultData
       */
      this.defaultData = null;

	    /**
	     * 本地存储对象
	     * @var {object} Store.cAbstractStore.sProxy
	     */
      this.sProxy = this.NULL;

      /**
       * 是否为用户级别数据
       * @var {boolean} [Store.cAbstractStore.userData=false]
       */
      this.userData = false;

      /**
       * 是否允许数据回滚
       * @var {boolean} {Store.cAbstractStore.rollbackEnabled=false}
       */
      this.rollbackEnabled = false;
    },

    /**
     * @method Store.cAbstractStore.initialize
     * @param {Object} obj
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function (options) {
      for (var opt in options) {
        this[opt] = options[opt];
      }
      this.assert();
    },

    assert: function () {
      if (this.key === this.NULL) {
        throw 'not override key property';
      }
    },

    /**
     * 向Store中添加数据
     * @method Store.cAbstractStore.set
     * @param {Object} value 要添加的数据
     * @param {String} [tag] 数据标记，这里的tag，是在get()方法调用时起作用，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
     * @param {Object} {oldVal} 如果启用了数据回滚机制,此参数可以设置备份数据,如rollbackEnabled为true,此参数不传,默认为value
     */
    set: function (value, tag,oldVal) {
      var time = this._getNowTime();
      time.addSeconds(this._getLifeTime());
      if (this.rollbackEnabled && !oldVal) {
        oldVal = value;
      }
      this.sProxy.set(this.key, value, time, tag, null, oldVal);
    },

    /**
     * 设置属性值
     * @method Store.cAbstractStore.setAttr
     * @param {String} attrName  支持通过路径的方式，如 setAttr('global.user.name','张三')
     * @param {Object} attrVal 属性值
     * @param {String|Number} tag 数据标记，这里的tag，是在get()方法调用时起作用，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
     */
    setAttr: function (attrName, attrVal, tag) {
      if (_.isObject(attrName)) {
        for (var i in attrName) {
          if (attrName.hasOwnProperty(i)) this.setAttr(i, attrName[i], attrVal);
        }
        return;
      }
      tag = tag || this.getTag();
      var obj = this.get(tag) || {}, oldVal = {};
      if (obj) {
        if (this.rollbackEnabled) {
          oldVal = this.get(tag, true);
          //增加属性名做路径，操作属性
          var oval = HObject.get(obj, attrName);
          HObject.set(oldVal, attrName, oval);
        }
        HObject.set(obj, attrName, attrVal);
        return this.set(obj, tag, oldVal);
      }
      return false;
    },

    /**
     * 设置当前对象的过期时间
     * @method Store.cAbstractStore.setLifeTime
     * @param {String} lifeTime 字符串
     * @param {Boolean}  [override=false] 是否在当前时间点修改,如为否则在saveDate上修改,默认为false
     */
    setLifeTime: function (lifeTime, override) {
      this.lifeTime = lifeTime;
      var tag = this.getTag(),
        value = this.get(),
        time;
      //覆盖
      if (override) {
        time = this._getNowTime();
        //在原时间点修改时间
      } else {
        time = this.sProxy.getSaveDate(this.key, true) || this._getNowTime();
      }
      var stime = (new CDate(time.valueOf())).format('Y/m/d H:i:s');
      time.addSeconds(this._getLifeTime());
      this.sProxy.set(this.key, value, time, tag, stime);
    },


    /**
     * 获取已存取数据
     * @method Store.cAbstractStore.get
     * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
     * @param {boolean} [oldFlag=false] 是否取原始数据
     * @return {Object} result Store中存储的数据
     */
    get: function (tag, oldFlag) {
      var result = null, isEmpty = true;
      if (Object.prototype.toString.call(this.defaultData) === '[object Array]') {
        result = this.defaultData.slice(0);
      } else if (this.defaultData) {
        result = _.clone(this.defaultData);
      }
      var obj = this.sProxy.get(this.key, tag, oldFlag);
      var type = typeof obj;
      if (({ 'string': true, 'number': true, 'boolean': true })[type]) return obj;
      if (obj) {
        if (Object.prototype.toString.call(obj) == '[object Array]') {
          result = [];
          for (var i = 0, ln = obj.length; i < ln; i++) {
            result[i] = obj[i];
          }
        } else {
          if (obj && !result) result = {};
          cCoreInherit.extend(result, obj);
        }
      }
      for (var a in result) {
        isEmpty = false;
        break;
      }
      return !isEmpty ? result : null;
    },

    /**
     * @method Store.cAbstractStore.getAttr
     * @param {String} attrName 支持通过路径的方式，如 getAttr('global.user.name')
     * @param {String|Number} [tag] 数据标记，当时间不过期时，参数中的tag和数据中tag不一致，则认为数据过期，tag一致则未过期。
     * @returns {Object} value 数据的属性值
     * @description 获取已存取对象的属性
     */
    getAttr: function (attrName, tag) {
      var obj = this.get(tag);
      var attrVal = null;
      if (obj) {
        attrVal = HObject.get(obj, attrName);
      }
      return attrVal;
    },
    /**
     * 获取数据tag
     * @method Store.cAbstractStore.getTag
     * @returns {String} tag 返回Store的版本标识
     */
    getTag: function () {
      return this.sProxy.getTag(this.key);
    },
    /**
     * 移除数据存储
     * @method Store.cAbstractStore.remove
     */
    remove: function () {
      this.sProxy.remove(this.key);
    },

    /**
     * 移除存储对象的指定属性
     * @method Store.cAbstractStore.removeAttr
     * @param {String} attrName
     */
    removeAttr: function (attrName) {
      var obj = this.get() || {};
      if (obj[attrName]) {
        delete obj[attrName];
      }
      this.set(obj);
    },

	  /**
     * 返回失效时间
	   * @method Store.cAbstractStore.getExpireTime
	   * @returns {object} exprieTime 过期时间
	   */
    getExpireTime: function () {
      var result = null;
      try {
        result = this.sProxy.getExpireTime(this.key);
      } catch (e) {
        console && console.log(e);
      }
      return result;
    },

    /**
     * 设置过期时间
     * @method Store.cAbstractStore.setExpireTime
     * @param {Date} time 过期时间
     */
    setExpireTime: function (time) {
      var value = this.get();
      var cTime = CDate.parse(time);
      this.sProxy.set(this.key, value, cTime);
    },

    /**
     * @method Store.cAbstractStore._getNowTime
     * @description 活动当前时间 useServerTime:true 返回服务器时间,false返回本地时间
     */
    _getNowTime: function () {
      return this.useServerTime ? new CDate(cUtilityServertime.getServerDate()) : new CDate();
    },

    /*
     * @method Store.cAbstractStore._getLifeTime
     * @returns {number} 根据liftTime 计算要增加的毫秒数
     * @description } 根据liftTime 计算要增加的毫秒数
     */
    _getLifeTime: function () {
      var timeout = 0;
      var str = this.lifeTime + "";
      var unit = str.charAt(str.length - 1);
      var num = +str.substring(0, str.length - 1);
      if (typeof unit == 'number') {
        unit = 'M';
      } else {
        unit = unit.toUpperCase();
      }

      if (unit == 'D') {
        timeout = num * 24 * 60 * 60;
      } else if (unit == 'H') {
        timeout = num * 60 * 60;
      } else if (unit == 'M') {
        timeout = num * 60;
      } else if (unit == 'S') {
        timeout = num;
      } else {
        //默认为秒
        timeout = num * 60;
      }
      return timeout;
    },

    /**
     * 回滚至上个版本
     * @method rollback
     * @param {Array} [optional] attrs 可选，属性名数组，如传递此参数只回滚指定属性，如不指定全部回滚
     */
    rollback: function (attrs) {
      if (this.rollbackEnabled) {
        var tag = this.getTag();
        var value = this.sProxy.get(this.key, tag);
        var oldVal = this.sProxy.get(this.key, tag, true);
        if (attrs && attrs instanceof Array) {
          for (var x in attrs) {
            var attr = attrs[x]
            var v = oldVal[attr];
            if (typeof v != 'undefined') {
              value[attr] = v;
            }
          }
        } else {
          value = oldVal;
          oldVal = {}
        }
        this.set(value, tag, oldVal);
      }
    }
  });

  /**
   * 单例方法,获取Store的实例
   * @returns {*}
   */
  Store.getInstance = function () {
    if (this.instance) {
      return this.instance;
    } else {
      return this.instance = new this();
    }
  };
  return Store;
});
/**
 * @File c.abstract.storage.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @Description Storage抽象类
 */
/**
 * stoage抽象类
 * @namespace Storage.cAbstractStorage
 * @example
 * 数据格式为
 * {
 *  value: '',
 *  tag: '',
 *  timeout: ''
 * }
 */
define('cAbstractStorage',['cUtilDate', 'cCoreInherit'], function (CDate, cCoreInherit) {

  

  var EJSON = window.JSON;

  var AbstractStorage = new cCoreInherit.Class({

    __propertys__: function () {
	    /**
	     * localstorage
	     * @var  {object} Storage.cAbstractStorage.proxy
	     */
      this.proxy = null;
	    /*
	     * 存储缓存中的key和过期时间
	     * @type {string}
	     */
	    this.overdueClearKey = "C_CLEAR_OVERDUE_CATCH";//修改key值
    },

	  /**
	   * @method Storage.cAbstractStorage.initialize
	   * @param {Object} $super
	   * @param {Object} options
	   * @description 复写自顶层Class的initialize，赋值队列
	   */
	  initialize: function ($super, options) {

	  },

	  /**
	   *@method Storage.cAbstractStorage.removeOverdueCathch
	   *@description 删除过期缓存
	   */
	  removeOverdueCathch : function () {
		  //比较缓存中的过期时间是否超过了最新时间
		  var dateNow = new CDate().getTime(),
			  objsdInCatchStr = this.proxy.getItem(this.overdueClearKey),
			  objsdInCatch = [],
			  objsCatchNew = [];
		  if (!objsdInCatchStr) {
			  return;
		  }
		  objsdInCatch = JSON.parse(objsdInCatchStr);
		  for (var i = 0, tempObj; i < objsdInCatch.length; i++) {
			  tempObj = objsdInCatch[i];
			  if (new Date(tempObj.timeout).getTime() <= dateNow) {
				  //过期的删除
				  this.proxy.removeItem(tempObj.key);
			  } else {
				  //未过期添加到新的数组中
				  objsCatchNew.push(tempObj);
			  }
		  };
		  //最后将新数组放到缓存中
		  this.proxy.setItem(this.overdueClearKey, JSON.stringify(objsCatchNew));
	  },

	  /*
	   * @method Storage.cAbstractStorage._removeOdCLately
	   * @param {String| Int}num
	   * @description 删除离过期时间最近的缓存
	   */
	  _removeOdCLately : function (num) {
		  num = num || 5;
		  var objsdInCatchStr = this.proxy.getItem(this.overdueClearKey),
			  objsdInCatch = [];
		  if (objsdInCatchStr) {
			  objsdInCatch = JSON.parse(objsdInCatchStr);
			  //排序删除第一个，排序比较耗时
			  objsdInCatch.sort(function (a, b) {
				  var timeA = new Date(a.timeout).getTime(),
					  timeB = new Date(b.timeout).getTime();
				  return timeA - timeB
			  });
			  //删除N个 缓存
			  var delCatch = objsdInCatch.splice(0,num) || [];
			  for(var i=0;i<delCatch.length;i++){
				  this.proxy.removeItem(delCatch[i].key);
			  }
			  //将剩余的key存入缓存中
			  this.proxy.removeItem(this.overdueClearKey);
			  if(objsdInCatch.length > 0){
				  this.proxy.setItem(this.overdueClearKey, JSON.stringify(objsdInCatch));
			  }
		  }
	  },
	  /*
	   * @method Storage.cAbstractStorage._setOverdueCathch
	   * @param {String} key
	   * @param {String} timeout
	   * @description 将缓存的key和过期时间放到缓存中
	   */
	  _setOverdueCathch : function (key, timeout) {
		  if (!key || !timeout || CDate.parse(timeout, true) < new Date()) {
			  return;
		  };
		  var overdueObj = {},
			  oldObjs = [],
			  oldObjsStr = this.proxy.getItem(this.overdueClearKey);
		  overdueObj.key = key;
		  overdueObj.timeout = timeout;
		  if (oldObjsStr) {
			  oldObjs = JSON.parse(oldObjsStr);
		  }
		  var isKeyAlreadyIn = false;
		  for (var i = 0, tempObj; i < oldObjs.length; i++) {
			  tempObj = oldObjs[i];
			  if (tempObj.key == key) {
				  //更新最新的过期时间
				  oldObjs[i] = overdueObj;
				  isKeyAlreadyIn = true;
			  }
		  }
		  if (!isKeyAlreadyIn) {
			  //添加新的过期时间对象
			  oldObjs.push(overdueObj);
		  }
		  //最后将新数组放到缓存中
		  this.proxy.setItem(this.overdueClearKey, JSON.stringify(oldObjs));
	  },

    /*
     * @method Storage.cAbstractStorage._buildStorageObj
     * @param value
     * @param timeout
     * @param tag
     * @param savedate
     * @param oldVal
     * @returns {object}
     * @private
     */
    _buildStorageObj: function (value, timeout, tag, savedate,oldVal) {
      var obj = {
        value:    value,
        timeout:  timeout,
        tag:      tag,
        savedate: savedate
      }
      if(oldVal){
        obj.oldvalue =oldVal;
      }
      return obj;
    },

    /**
     * @method Storage.cAbstractStorage.set
     * @param {String} key 数据Key值
     * @param {Object} value 数据对象
     * @param {Date} [timeout] 可选,数据失效时间,如不传,默认过期时间为当前日期过会30天
     * @param {String} [tag] 可选,数据版本标识,如传递此参数,在使用get()时,只有tag相符,才能取到数据
     * @param {Date} [savedate] 可选,数据保存时间
     * @param [Object] [oldVal] 可选,备份数据
     * @return {Boolean} 成功true,失败false
     * @desctription 向Store中存放数据
     */
    set: function (key, value, timeout, tag, savedate, oldVal) {
      savedate = savedate || (new CDate()).format('Y/m/d H:i:s');
      timeout = timeout ? new CDate(timeout) : new CDate().addDay(30);
      var formatTime = timeout.format('Y/m/d H:i:s');
      //将key和过期时间放到缓存中
      this._setOverdueCathch(key, formatTime);
      var entity = this._buildStorageObj(value, formatTime, tag, savedate, oldVal);
      try {
        this.proxy.setItem(key, EJSON.stringify(entity));
        return true;
      } catch (e) {
        //localstorage写满时,全清掉
        if (e.name == 'QuotaExceededError') {
          //            this.proxy.clear();
          //localstorage写满时，选择离过期时间最近的数据删除，这样也会有些影响，但是感觉比全清除好些，如果缓存过多，此过程比较耗时，100ms以内
          this._removeOdCLately();
          this.set(key, value, timeout, tag, savedate, oldVal);
        }
        console && console.log(e);
      }
      return false;
    },

    /**
     * @method Storage.cAbstractStorage.get
     * @param {String} key 数据Key会值
     * @param {String} tag 版本表示,如传递版本参数,则会验证保存的版本与参数是否相符,相符才返回数据,否则返回null,不传此参数
     * 则不会比较
     * @param {boolean}
     * @return {Object} 取回保存的数据
     * @description 根据key获取value值,如指定的key或attrName未定义返回null
     */
    get: function (key, tag, oldFlag) {
      var result, value = null;
      try {
        result = this.proxy.getItem(key);
        if (result) {
          result = EJSON.parse(result);
          if (CDate.parse(result.timeout, true) >= new Date()) {
            if (tag) {
              if (tag === result.tag) {
                value = oldFlag ? result.oldvalue : result.value;
              }
            } else {
              value = oldFlag ? result.oldvalue : result.value;
            }
          }
        }
      } catch (e) {
        console && console.log(e);
      }
      return value;
    },

    /**
     * @method Storage.cAbstractStorage.getTag
     * @param {String} key 数据Key
     * @returns {String} 返回此Storager的版本标识
     * @description 返回存放Storage的tag
     */
    getTag: function (key) {
      var result, value = null, tag = null;
      try {
        result = this.proxy.getItem(key);
        if (result) {
          result = EJSON.parse(result);
          tag = result && result.tag
        }
      } catch (e) {
        console && console.log(e);
      }
      return tag;
    },

    /**
     * @method Storage.cAbstractStorage.getSaveDate
     * @param {String} key 数据key
     * @param {Boolean} useCDate 是否返回CDate类型,默认为false
     * @returns {CDate|Number} 返回Store保存时间
     * @description 获得某个storage的保存时间
     */
    getSaveDate:   function (key, useCDate) {
      var result, value = null;
      try {
        result = this.proxy.getItem(key);
        if (result) {
          result = EJSON.parse(result);
          if (result.savedate) {
            value = CDate.parse(result.savedate);
            if (!useCDate) value = value.valueOf();
          }
        }
      } catch (e) {
        console && console.log(e);
      }
      return value;
    },

    /**
     * @method Storage.cAbstractStorage.getExpireTime
     * @param {String} key storage key值
     * @return {Number} timeout 超时时间,距离1970年的毫秒数
     * @description 返回指定key的超时时间
     */
    getExpireTime: function (key) {
      var result = null, time = null;
      try {
        result = this.proxy.getItem(key);
        if (result) {
          result = EJSON.parse(result);
          time = Date.parse(result.timeout);
        }
      } catch (e) {
        console && console.log(e);
      }
      return time;
    },

    /**
     * @method Storage.cAbstractStorage.remove
     * @param {String} key 数据key值
     * @description 清除指定key
     */
    remove: function (key) {
      return this.proxy.removeItem(key);
    },

    /**
     * @method Storage.cAbstractStorage.getAll
     * @return {Array} result,形式如[{key:'aa',value:{}}]
     * @description 返回storage存储的所有数据
     */
    getAll: function () {
      var ln = this.proxy.length;
      var vs = [];
      for (var i = 0; i < ln; i++) {
        var key = this.proxy.key(i);
        var obj = {
          key:   key,
          value: this.get(key)
        }
        vs.push(obj);
      }
      return vs;
    },

    /**
     * @method Storage.cAbstractStorage.clear
     * @discription 清空所有storage内容
     */
    clear: function () {
      this.proxy.clear();
    },

    /**
     * @method Storage.cAbstractStorage.gc
     * @discription 垃圾收集,清掉失效的数据
     */
    gc: function () {
      var storage = this.proxy,
        ln = this.proxy.length;
      for (var i = 0; i < ln; i++) {
        var name = storage.key(i);
        if(name =='GUID'){
          break;
        }
        try{
          if (!this.get(name)) {
            this.remove(name);
          }
        }catch(e){

        }
      }
    }

  });


  return AbstractStorage;
});

/**
 * @File c.local.storage.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @description LocalStorage 存储类
 */
/**
 * 封装本地缓存localstorage存储类,继承自cAbstractStorage
 * @namespace Storage.cLocalStorage
 * @extends Storage.cAbstractStorage
 */
define('cLocalStorage',['cCoreInherit', 'cUtilDate', 'cAbstractStorage'], function (cCoreInherit, cDate, cAbstractStorage) {

  var Storage = new cCoreInherit.Class(cAbstractStorage, {
    __propertys__: function () {

    },
    /**
     * @method Storage.cLocalStorage.initialize
     * @param {Object} $super
     * @param {Object} options
     * @description 复写自顶层继承自cAbstractStorage的initialize，赋值队列
     */
    initialize: function ($super, opts) {
      this.proxy = window.localStorage;
	    $super(opts);
    },

    /**
     * @method Storage.cLocalStorage.oldGet
     * @param {String} key 数据key值
     * @returns {Object} 数据值
     * @description 读取H5老的localstorage的方法,数据不在value中
     */
    oldGet: function (key) {
      var v = localStorage.getItem(key);
      var d = v ? JSON.parse(v) : null;
      if (d && d.timeout) {
        /*验证是否过期*/
        var n = new Date();
        var t = cDate.parse(d.timeout).valueOf();
        if (d.timeby) {
          if (t - n >= 0) {
            return d;
          }
        } else {
          if (t - cDate.parse(cDate.format(n, 'Y-m-d')).valueOf() >= 0) {
            return d;
          }
        }
        localStorage.removeItem(key);
        return null;
      }
      return d;
    },

    /**
     * @method Storage.cLocalStorage.oldSet
     * @param {String} key 数据key值
     * @param {Object} value
     * @description 写老的getStorage格式
     */
    oldSet: function (key, value) {
      localStorage.setItem(key, value);
    },


    /**
     * @method Storage.cLocalStorage.getExpireTime
     * @param {String} key
     * @returns {CData} cDate 过期时间
     * @description 获得旧的H5格式失效时间
     */
    getExpireTime: function (key) {
      var v = localStorage.getItem(key);
      var d = v ? JSON.parse(v) : null;
      if (d && d.timeout) {
        return d.timeout;
      } else {
        return new cDate(cDate.getServerDate()).addDay(2).format('Y-m-d');
      }
    },
    /**
     * @method Storage.cLocalStorage.oldRemove
     * @param {String} key 数据key值
     * @description 旧的H5格式,移除对应key的Storage
     */
    oldRemove: function (key) {
      localStorage.removeItem(key);
    }

  });


  Storage.getInstance = function () {
    if (this.instance) {
      return this.instance;
    } else {
      return this.instance = new this();
    }
  };

  Storage.localStorage = Storage.getInstance();
  return Storage;
});
/**
 * @File c.local.store.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @description 以localstorage为数据存储的Store
 */
/**
 * 以localstorage为数据存储的Store
 * @namespace Store.cLocalStore
 * @augments Store.cAbstractStore
 * @example
 *  define(['cCoreInherit','cLocalStore'], function (cCoreInherit,cLocalStore ) {
 *    var StoreCase = new cCoreInherit.Class(cLocalStore, {
 *      __propertys__: function () {
 *        this.key = 'STORAGE_EXAMPLE', //设置key值
 *        this.lifeTime = '2D',          //超时时间两天
 *        this.defaultData = {
 *          name : ""
 *        }
 *      },
 *      initialize:    function ($super, options) {
 *        $super(options);
 *      }
 *    });
 *
 *    return  StoreCase;
 *  });
 *
 * var demoStore = StoreCase.getInstance();
 * var data = {'name':'擎天柱'}
 * demoStore.set(data);
 */
define('cLocalStore',['cCoreInherit','cAbstractStore','cLocalStorage'], function (cCoreInherit,cAbstractStore,cLocalStorage) {

  var LocalStore = new cCoreInherit.Class(cAbstractStore,{
    __propertys__: function () {
	    /*
	     * 本地存储对象
	     * @var {Object} cStore.sProxy
	     */
      this.sProxy = cLocalStorage.getInstance();
    },
	  /**
	   * @method cStore.initialize
	   * @param $super
	   * @param options
	   * @description 复写自顶层Class的initialize，赋值队列
	   */
    initialize: function ($super, options) {
      $super(options);
    }
  });

  return LocalStore;
});
/**
 * @File c.util.common.js
 * @Description: 常用工具方法
 * @author shbzhang@ctrip.com
 * @date 2014-09-24 11:06:12
 * @version V1.0
 */

/**
 * 推荐用cUtilCommon代替，此命名空间已不推荐使用
 * @namespace Util.cUtility
 * @deprecated
 */

/**
 * 常用的Util方法类，兼用了2.0之前版本的cUtility命名空间，但已不推荐引用老的命名空间
 * @namespace Util.cUtilCommon
 * @alias cUtility
 */
define('cUtilCommon',['cUtilDate'],function (cDate) {
  var Util = {};

  /**
   * cUtilDate 类型
   * @var Util.cUtilCommon.Date
   */
  Util.Date = cDate;
  /**
    * 获取服务端时间，cUtilDate.getServerDate快捷方式
    * @method Util.cUtilCommon.getServerDate
    * @param {function} [callback]
    * @returns {date} date 服务器时间
    */
  Util.getServerDate = cDate.getServerDate;
  /**
   * 是否在app中打开，app
   * @static
   * @var Util.cUtilCommon.isInApp
   * @type {boolean}
   */
  Util.isInApp = Lizard.isHybrid;

  /**
   * 浏览器是否支持pushState方法
   * @var Util.cUtilCommon.isSupportPushState
   * @type {boolean}
   */
  Util.isSupportPushState = (function () {
    //如果是hybrid则走hashchange,不走pushstate
    if (Lizard.isHybrid)return false;
    // return false;
    return !!(window.history && window.history.pushState && window.history.replaceState);
    /**/
  })();


  /**
   * 是否外链
   * @method Util.cUtilCommon.isSupportPushState
   * @param {string} url url链接
   * @returns {boolean}
   */
  Util.isExternalLink = function (url) {
    var RegH5NewType = new RegExp(/^mailto:|^tel:|^javascript:/);
    return RegH5NewType.test(url);
  }


  /**
   * 通过一个url唤醒app
   * @method Util.cUtilCommon.weakUpApp
   * @param {string} url 唤醒url，如ctripwireless://hoteml;
   */
  Util.weakUpApp =function (url) {
    var iframe = document.createElement('iframe');
    iframe.height = 1;
    iframe.width = 1;
    iframe.frameBorder = 0;
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    document.body.appendChild(iframe);

    Util.weakUpApp = function (url) {
      iframe.src = url;
    };

    Util.weakUpApp(url);
  }

  /**
   * 每次调用生成一个GUID随意数 格式为f5b6bfaa-09ec-6bdd-2c81-c1f435dca270
   * @method Util.cUtilCommon.createGuid
   * @return {String} GUID 唯一标示
   */
  Util.createGuid = function () {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function NewGuid() {
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    return NewGuid();
  };

  /**
   * 返回GUID，与createGuid不同的是，会首先检查LocalStorage中的值
   * @method Util.cUtilCommon.getGuid
   * @returns {string} GUID 唯一标示
   */
  Util.getGuid = function () {
    var ws = window.localStorage;
    var guid = ws.getItem('GUID') || '';

    if (!guid) {
      guid = Util.createGuid();
      try {
        ws.setItem('GUID', guid);
      } catch (e) {
      }
    }
    return guid;
  };

  /**
   * 返回是否为android平台
   * @var Util.cUtilCommon.isAndroid
   * @type {boolean}
   */
  Util.isAndroid = (function () {
    return $.os['android'] == 'android';
  })();

  /**
   * 返回是否为iPhone平台
   * @var Util.cUtilCommon.isIPhone
   * @type {boolean}
   */
  Util.isIphone = (function () {
    return $.os['iphone'] == 'iphone';
  })();

  /**
   * 返回是否为iPad平台
   * @var Util.cUtilCommon.isIpad
   * @type {boolean}
   */
  Util.isIpad = (function () {
    return $.os['ipad'] == 'ipad';
  })();

  /**
   * 返回是否为Window Phone平台
   * @var Util.cUtilCommon.isWPhone
   * @type {boolean}
   */
  Util.isWPhone = (function () {
    return window.navigator.userAgent.indexOf('Windows Phone') > 1;
  })();

  Util.isUrl = function (url) {
    return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(url);
  };

  return Util;
});

/**
 * @File c.user.store.js
 * @author zsb张淑滨 <oxz@ctrip.com|shbzhang@ctrip.com>
 * @description  用户数据Store
 */

define('cUserStore',['cCoreInherit', 'cLocalStore', 'cLocalStorage', 'cUtilCommon'], function (cCoreInherit, cLocalStore, cLocalStorage,cUtilCommon) {

  var ls = cLocalStorage.localStorage;
  /**
   * 用户数据Store,同时操作USER和USERINFO, 其中USERINFO是兼容老的数据格式,可以去掉.
   * 大部分的操作，已封装至cMemberService,
   * @namespace Store.cCommonStore.cUserStore
   * @example 使用方式
   *  var userStore = UserStore.getInstance();
   * @example 数据格式为
   * {
   *  "Address": "",
   *  "Auth": "E82047658BD3D8321E1EEB0F7F5D63EB1A5566AA70098AFE847505E34BD8BD5B",
   *  "Birthday": "19920624",
   *  "BMobile": "13814555555",
   *  "Email": "",
   *  "Experience": 106663,
   *  "ExpiredTime": "/Date(-62135596800000-0000)/",
   *  "Gender": 1,
   *  "IsNonUser": false,
   *  "LoginName": "",
   *  "Mobile": "13814555555",
   *  "PostCode": "",
   *  "UserID": "21634352BAC43044380A7807B0699491",
   *  "UserName": "ggggg",
   *  "VipGrade": 30,
   *  "VipGradeRemark": "钻石贵宾"
   * }
   */
  var UserStore = new cCoreInherit.Class(cLocalStore, {
    __propertys__: function () {
      /**
       * Store Key值为USER
       * @readonly
       * @var {string} [Store.cCommonStore.cUserStore.key=USER]
       */
      this.key = 'USER';

      /**
       * Store数据过期时间，默认为30D
       * @var {string} [Store.cCommonStore.cUserStore.lifeTime=30D]
       */
      this.lifeTime = '30D';
    },
    /*
     * @method cCommonStore.UserStore.initialize
     * @param $super
     * @param options
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function ($super, options) {
      $super(options);
    },

    /**
     * 返回用户信息
     * @method Store.cCommonStore.cUserStore.getUser
     * @returns {Object} userinfo 用户信息
     * @example 格式为
     * value": {
		 *    "Address": "",
		 *    "Auth": "CF7D8226D139CF771E2C860CA32EDEA01DDD8DDF07B72BB372B5C8726F718475",
		 *    "Birthday": "20071211",
		 *    "BMobile": "13814555555",
		 *    "Email": "",
		 *    "Experience": 106663,
		 *    "ExpiredTime": "/Date(-62135596800000-0000)/",
		 *    "Gender": 1,
		 *    "IsNonUser": false,
		 *    "LoginName": "",
		 *    "Mobile": "13814555555",
		 *    "PostCode": "",
		 *    "UserID": "21634352BAC43044380A7807B0699491",
		 *    "UserName": "呵呵呵呵呵呵",
		 *    "VipGrade": 30,
		 *    "VipGradeRemark": "钻石贵宾"
		 * }
     * @deprecated cServiceMember.getUser
     */
    getUser: function () {
      var userinfo = ls.oldGet('USERINFO');
      userinfo = userinfo && userinfo.data || null
      if (userinfo) {
        this.set(userinfo)
      }
      return userinfo || this.get();
    },

    /**
     * 保存用户信息
     * @method Store.cCommonStore.cUserStore.setUser
     * @param {Object}  data UserInfo用户信息
     */
    setUser: function (data) {
      this.set(data);
      var timeout = ls.getExpireTime('USERINFO');
      var userinfo = { data: data, timeout: timeout };
      ls.oldSet('USERINFO', JSON.stringify(userinfo));
    },

    /**
     * 移除用户信息，只清空本地登录状态
     * @method Store.cCommonStore.cUserStore.removeUser
     * @description 建议使用cMemberService.logout
     */
    removeUser: function () {
      ls.oldRemove('USERINFO');
      this.remove();
    },

    /**
     * 返回当前用户是否是未注册用户
     * @method Store.cCommonStore.cUserStore.isNonUser
     * @returns {boolean} isNonUser 返回当前用户是否是未注册用户
     * @deprecated
     */
    isNonUser: function () {
      var user = this.getUser();
      return user && !!user.IsNonUser;
    },

    /**
     * 判断当前用户是否登陆
     * @method UserStore.isLogin
     * @returns {Object|boolean} isLogin 当前用户是否登陆
     * @deprecated 建议使用memberService.isLogin代替
     */
    isLogin: function () {
      var user = this.getUser();
      return user && !!user.Auth && !user.IsNonUser;
    },

    /**
     * 返回当前登陆用户的用户名
     * @method Store.cCommonStore.cUserStore.getUserName
     * @returns {String} UserName 用户名
     * @deprecated 建议使用cMemberService.getUserName代替
     */
    getUserName: function () {
      var user = this.getUser();
      return user.UserName;
    },

    /**
     * 返回当前登陆用户的ID
     * @method Store.cCommonStore.cUserStore.getUserId
     * @returns {*|string} userId 用户Id
     */
    getUserId: function () {
      var user = this.getUser() || {};
      return user.UserID || cUtilCommon.getGuid();
    },

    /**
     * @method Store.cCommonStore.cUserStore.getAuth
     * @returns {*|string}
     * @description 返回当前登陆用户的Auth值
     */
    getAuth: function () {
      var userinfo = this.getUser();
      return userinfo && userinfo.Auth;
    },

    /**
     * @method Store.cCommonStore.cUserStore.setAuth
     * @param {String} auth 用户auth字段
     * @description 返回当前登陆用户的Auth值
     * @
     */
    setAuth: function (auth) {
      var isLogin = this.isLogin(),
        userinfo = this.getUser() || {};
      userinfo.Auth = auth;
      userinfo.IsNonUser = isLogin ? false : true;
      this.setUser(userinfo);
    },

    /**
     * @method Store.cCommonStore.cUserStore.setNonUser
     * @param {String} auth 用户auth
     * @description 设置当前用户为非注册用户
     */
    setNonUser: function (auth) {
      var HeadStore = Common.HeadStore.getInstance();
      HeadStore.setAttr('auth', auth);
      var data = {};
      data.Auth = auth;
      data.IsNonUser = true;
      this.setUser(data);
    },

    /**
     * @method Store.cCommonStore.cUserStore.setExpireTime
     * @param $super
     * @param timeout
     * @description 设置过期时间，同时会操作USERINFO
     */
    setExpireTime: function ($super, timeout) {
      $super(timeout);
      var data = this.get();
      var userinfo = { data: data, timeout: timeout };
      ls.oldSet('USERINFO', JSON.stringify(userinfo));
    }


  });

  return UserStore;
});
/**
 * Created by shbzhang on 14/10/13.
 */
/**
 * @File c.head.store.js
 * @author zsb张淑滨 <oxz@ctrip.com|shbzhang@ctrip.com>
 * @description Restful 服务的HeadStore
 */
/**
 * Restful 服务的HeadStore
 * @namespace Store.cCommonStore.cHeadStore
 * @example
 * {
   *  "cid": "27410422-09d4-867b-1458-42d7fa238ee5",  //设备唯一标示，hybird下为10位数字
   *  "ctok": "351858059049938",                      //ctok，遗留结构
   *  "cver": "1.0",                                  //版本号,web为1.0，hybrid为实际内部版本号如509
   *  "lang": "01",                                   //语言，遗留结构，默认01
   *  "sid": "8888",                                  //渠道号，默认8888
   *  "syscode": '09',                                //默认09
   *  "auth": ""                                      //用户auth,未登录为“”
   *  }
 */
define('cHeadStore',['cCoreInherit','cLocalStore', 'cUtilCommon'], function (cCoreInherit, cLocalStore,cUtilCommon) {


  var HeadStore = new cCoreInherit.Class(cLocalStore, {
    __propertys__: function () {
      /**
       * HeadStore的键值，默认为HEADSTORE
       * @var {string} cHeadStore.key
       */
      this.key = 'HEADSTORE';
      /**
       * HeadStore的数据过期时间,默认为15D
       * @var {string} cHeadStore.lifeTime
       */
      this.lifeTime = '15D';
      /*
       * HeadStore的默认数据
       * @type {object} cCommonStore.HeadStore.defaultData
       */
      this.defaultData = {
        "cid": cUtilCommon.getGuid(),
        "ctok": "351858059049938",
        "cver": "1.0",
        "lang": "01",
        "sid": "8888",
        "syscode": '09',
        "auth": ""
      };

      //this.defaultData = "sssss";
    },
    /*
     * @method cCommonStore.HeadStore.initialize
     * @param $super
     * @param options
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function ($super, options) {
      $super(options);
    },

    /**
     * 设置head中的auth字段
     * @method cHeadStore.setAuth
     * @param {string} auth 用户auth
     */
    setAuth: function (auth) {
      this.setAttr('auth', auth);
    }
  });


  return HeadStore;
});
/**
 * Created by shbzhang on 14/10/13.
 */
/**
 * @File c.common.store.js
 * @author zsb张淑滨 <oxz@ctrip.com|shbzhang@ctrip.com>
 * @description 存放H5使用的一些通用Store,如用户信息Store,HeadStore,分销联盟Store,渠道参数Store,渠道信息Store
 */

/**
 * 市场营销Store
 * @nameSpace Store.cMarketStore
 */
define('cMarketStore',['cCoreInherit', 'cLocalStore', 'cLocalStorage', 'cUtilCommon'], function (cCoreInherit, cLocalStore, cLocalStorage,cUtilCommon) {
  var Common = {};
  var ls = cLocalStorage.localStorage;


  /**
   * @namespace Store.cMarketStore.UnionStore
   * @description 分销联盟Store
   */
  Common.UnionStore = new cCoreInherit.Class(cLocalStore, {
    __propertys__: function () {
      /**
       * UnionStore的键值
       * @var {String} UnionStore.key
       */
      this.key = 'UNION';
      /**
       * UnionStore的数据过期时间
       * @var {String} [UnionStore.lifeTime=7D] 过期时间，默认七天
       */
      this.lifeTime = '7D';
      /*
       * UnionStore的本地存储对象
       * @var {object} UnionStore.store
       */
      this.store = cLocalStorage.localStorage;
    },
    /**
     * @method CommonStore.UnionStore.initialize
     * @param $super
     * @param options
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function ($super, options) {
      $super(options);
    },

    /**
     * 返回分销联盟数据
     * @method UnionStore.get
     * @returns {*|null} data 分销联盟数据
     */
    get: function () {
      var data = this.store.oldGet(this.key);
      return data && data.data || null;
    }
  });

  /**
   * 保存渠道参数Store
   * @namespace Store.cMarketStore.SalesStore
   */
  Common.SalesStore = new cCoreInherit.Class(cLocalStore, {
    __propertys__: function () {
      /**
       * SalesStore 的键值
       * @var {String} [Store.cMarketStore.SalesStore.key=SALES]
       */
      this.key = 'SALES';
      /**
       * SalesStore的数据过期时间
       * @var {String} [Store.cMarketStore.SalesStore.lifeTime = 30D]
       */
      this.lifeTime = '30D';
      /*
       * SalesStore的数据过期时间
       * @var {Object} SalesStore.store
       */
      this.store = cLocalStorage.localStorage;
    },
    /*
     * @method SalesStore.initialize
     * @param $super
     * @param options
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function ($super, options) {
      $super(options);
    },

    /**
     * @method SalesStore.get
     * @returns {Object} data
     * @description 返回Store中保存的数据
     */
    get: function () {
      var data = this.store.oldGet(this.key);
      return data && data.data || null;
    }

  });

  /**
   * @description   渠道信息Store
   * @namespace Store.cMarketStore.SalesObjectStore
   */
  Common.SalesObjectStore = new cCoreInherit.Class(cLocalStore, {
    __propertys__: function () {
      /*
       * SalesObjectStore的键值
       * @type {String}
       */
      this.key = 'SALES_OBJECT';
      /*
       * SalesObjectStore的过期时间
       * @type {string}
       */
      this.lifeTime = '30D';
    },
    /**
     * @method CommonStore.SalesObjectStore.initialize
     * @param $super
     * @param options
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function ($super, options) {
      $super(options);
    }
  });

  Common.UnionStore.getInstance = Common.SalesStore.getInstance = function() {
    return this.instance || new this();
  };
  return Common;
});
/**
 * @File c.common.store.js
 * @author zsb张淑滨 <oxz@ctrip.com|shbzhang@ctrip.com>
 * @description 存放H5使用的一些通用Store,如用户信息Store,HeadStore,分销联盟Store,渠道参数Store,渠道信息Store
 */
/**
 * 与用户登录相关的工具方法
 * @namespace Store.cCommonStore
 */
define('cCommonStore',['cCoreInherit', 'cUserStore', 'cHeadStore', 'cMarketStore'], function (cCoreInherit, cUserStore, cHeadStore, cMarketStore) {
  var Common = {};

  /**
   * {@link Store.cCommonStore.cUserStore} 的引用
   * @var Store.cCommonStore.UserStore
   */
  Common.UserStore = cUserStore;

  /**
   * {@link Store.cCommonStore.cHeadStore} 的引用
   * @var Store.cCommonStore.HeadStore
   */
  Common.HeadStore = cHeadStore;
	/**
   * 分销联盟Store,{@link Store.cMarketStore.UnionStore} 的引用,不建议BU使用
	 * @var Store.cCommonStore.UnionStore
   * @deprecated
	 */
  Common.UnionStore = cMarketStore.UnionStore;

  /**
   * 保存渠道参数Store,{@link Store.cMarketStore.SalesStore} 的引用,不建议BU使用
   * @var Store.cCommonStore.SalesStore
   * @deprecated
   */
  Common.SalesStore = cMarketStore.SalesStore;

  /**
   * 保存渠道参数Store,{@link Store.cMarketStore.SalesObjectStore} 的引用,不建议BU使用
   * @var Store.cCommonStore.SalesObjectStore
   * @deprecated
   */
  Common.SalesObjectStore = cMarketStore.SalesObjectStore;


  return Common;
});
(function () {
  var mutileLoad = Lizard.mutileLoad;
  delete Lizard.mutileLoad;
  window.appInstance = false;
  window.localStorage.setItem('ISINAPP', '1');
  window.app = {};

  window.app.callback = function (options) {
    var methods = {
      'web_view_finished_load': function () {
        if (window.localStorage) {
          var appInfo = options.param;
          if (appInfo)
            window.localStorage.setItem('APPINFO', JSON.stringify(appInfo));
        }
        //CtripBar.app_set_navbar_hidden(true);
        CtripUtil.app_init_member_H5_info();
      },

      'init_member_H5_info': function (params) {
        define("_", function () {
        });
        define("$", function () {
        });
        define("B", function () {
        });
        define("F", function () {
        });
        require(['libs', 'cCommonStore'],
          function (libs, CommonStore) {
            window.appInstance = true;
            var wStore = window.localStorage;
            if (wStore && params) {
              var headStore = CommonStore.HeadStore.getInstance();
              var userStore = CommonStore.UserStore.getInstance();
              var unionStore = CommonStore.UnionStore.getInstance();
              var headInfo = headStore.get();

              //用户信息
              if (params.userInfo) {
                try {
                  var userInfo = userStore.getUser();
                  params.userInfo.data.BMobile = params.userInfo.data.BindMobile;
                  userStore.setUser(params.userInfo.data);
                  headInfo.auth = params.userInfo.data.Auth;
                } catch (e) {
                  alert('set data error');
                }
              } else {
                userStore.removeUser();
              }

              if (params.device) {
                var deviceInfo = {
                  device: params.device
                }
                wStore.setItem('DEVICEINFO', JSON.stringify(deviceInfo));
              }

              if (params.appId) {
                var appInfo = {
                  version: params.version,
                  appId: params.appId,
                  serverVersion: params.serverVersion,
                  platform: params.platform
                }
                wStore.setItem('APPINFO', JSON.stringify(appInfo));
              }

              if (params.timestamp) {
                var date = new Date();
                var serverdate = {
                  server: params.timestamp,
                  local: date.getTime()
                }
                wStore.setItem('SERVERDATE', JSON.stringify(serverdate));
              }

              if (params.sourceId) {
                headInfo.sid = params.sourceId;
                wStore.setItem('SOURCEID', params.sourceId);
              }

              if (params.isPreProduction) {
                wStore.setItem('isPreProduction', params.isPreProduction);
              }

              //接受clientId,供UBT使用
              if (params.clientID) {
                headInfo.cid = params.clientID;
                wStore.setItem('GUID', params.clientID);
              }
              //外部渠道号
              if (params.extSouceID) {
                headInfo.xsid = params.extSouceID;
              }
              //soa2.0 syscode 可以接受非09的值, restful 待定
              if (params.platform) {
                headInfo.syscode = params.platform == '1' ? 12 : 32;
              }
              if (params.version) {
                headInfo.cver = params.version;
              }

              //分销联盟参数
              //ctrip://wireless/allianceID=123&ouID=456&sID=789&extendSourceID=11111
              if (params.allianceID && params.sID) {
                var union = {
                  "AllianceID": params.allianceID,
                  "SID": params.sID,
                  "OUID": params.ouID ? params.ouID : ""
                }
                unionStore.set(union);
              }

              headStore.set(headInfo);

              //保存原始参数值
              wStore.setItem('CINFO',JSON.stringify(params));
            }

            if (Lizard.isInCtripApp)
              mutileLoad();
          });
      },

      'app_h5_need_refresh': function () {
        mutileLoad();
      }
    }
    if (options && typeof methods[options.tagname] === 'function') {
      methods[options.tagname](options.param);
    }
  };
  if (!Lizard.isInCtripApp)
    mutileLoad();
})();

define("cHybridStart", function(){});

define('config',[],function () {
  //TODO jquery 加载判断
  var libs = Lizard.dir + '3rdlibs/zepto';
  var iswinphone = window.navigator.userAgent.indexOf('IEMobile') > -1;
  if (iswinphone) {
    version = window.navigator.userAgent.match(/IEMobile\/\d+/);
    if (version.length > 0) {
      version = version[0].split('/');
      version = version[1];
    }
    ;
  }
  ;
  /*by wxj start*/
  if (!('__proto__' in {}) || (iswinphone && version < 10))
  /*by wxj end*/
  {
    //if ( (isie && !iswinphone) || (iswinphone && version < 10)){
    libs = Lizard.dir + '3rdlibs/jquery';
  }

  require.config({
    waitSeconds: 20,
    shim       : {
      $             : {
        exports: 'zepto'
      },
      _             : {
        exports: '_'
      },
      B             : {
        deps   : ['_', '$'],
        exports: 'Backbone'
      },
      F             : {
        deps   : ['$'],
        exports: 'Fastclick'
      },
      libs          : {
        deps   : ['_', '$', 'B'],
        exports: 'libs'
      },
      common        : {
        deps: ['libs']
      },
      cAjax         : {
        exports: 'cAjax'
      },
      UIView        : {
        deps   : ['B'],
        exports: 'UIView'
      },
      cServiceGuider: {
        deps   : ['_'],
        exports: 'cServiceGuider'
      }
    },
    "paths"    : {
      "json2"       : Lizard.dir + "3rdlibs/json2",
      "bridge"      : Lizard.dir + "3rdlibs/bridge",
      "R"           : Lizard.dir + "3rdlibs/require",
      '$'           : libs,
      "_"           : Lizard.dir + "3rdlibs/underscore",
      "B"           : Lizard.dir + "3rdlibs/backbone",
      "F"           : Lizard.dir + "3rdlibs/fastclick",
      "libs"        : Lizard.dir + "3rdlibs/libs",
      "text"        : Lizard.dir + "3rdlibs/require.text",
      "cCoreInherit": Lizard.dir + "common/c.class.inherit",

      "cBusinessCommon": Lizard.dir + "app/c.app.interface",

      "cMessageCenter": Lizard.dir + "common/c.message.center",
      "cAjax"         : Lizard.dir + "common/c.ajax",
      "cImgLazyload"  : Lizard.dir + "common/c.img.lazyload",

      "cUtil"           : Lizard.dir + "util/c.util",
      "cUtilCacheView"  : Lizard.dir + "util/c.util.cacheview",
      "cUtilCommon"     : Lizard.dir + "util/c.util.common",
      "cUtilDate"       : Lizard.dir + "util/c.util.date",
      "cUtilHybrid"     : Lizard.dir + "util/c.util.hybrid",
      "cUtilObject"     : Lizard.dir + "util/c.util.object",
      "cUtilPath"       : Lizard.dir + "util/c.util.path",
      "cUtilPerformance": Lizard.dir + "util/c.util.performance",
      "cUtilValidate"   : Lizard.dir + "util/c.util.validate",
      "cUtilCryptBase64": Lizard.dir + "util/crypt/c.crypt.base64",
      "cUtilCryptRSA"   : Lizard.dir + "util/crypt/c.crypt.rsa",

      "cPageParser"        : Lizard.dir + "app/c.page.parser",
      "cParserUtil"        : Lizard.dir + "app/c.parser.util",
      "cPageModelProcessor": Lizard.dir + "app/c.page.model.processor",

      "cPageView": Lizard.dir + "page/c.page.view",
      "cPageList": Lizard.dir + "page/c.page.list",

      "cAbstractModel": Lizard.dir + "data/model/c.abstract.model",
      "cModel"        : Lizard.dir + "data/model/c.model",
      "cUserModel"    : Lizard.dir + "data/model/c.user.model",

      "cAbstractStore": Lizard.dir + "data/store/c.abstract.store",
      "cLocalStore"   : Lizard.dir + "data/store/c.local.store",
      "cSessionStore" : Lizard.dir + "data/store/c.session.store",
      "cMemoryStore"  : Lizard.dir + "data/store/c.memory.store",
      "cCommonStore"  : Lizard.dir + "data/store/c.common.store",
      "cHeadStore"    : Lizard.dir + "data/store/common/c.head.store",
      "cUserStore"    : Lizard.dir + "data/store/common/c.user.store",
      "cMarketStore"  : Lizard.dir + "data/store/common/c.market.store",

      "cAbstractStorage": Lizard.dir + "data/storage/c.abstract.storage",
      "cLocalStorage"   : Lizard.dir + "data/storage/c.local.storage",
      "cSessionStorage" : Lizard.dir + "data/storage/c.session.storage",
      "cMemoryStorage"  : Lizard.dir + "data/storage/c.memory.storage",

      "cUIInputClear" : Lizard.dir + "ui/c.ui.input.clear",
      "cUIBase"       : Lizard.dir + "ui/c.ui.base",

      //新UI组件
      'UIView'        : Lizard.dir + 'ui/ui.abstract.view',
      'UILayer'       : Lizard.dir + 'ui/ui.layer',
      'UIAlert'       : Lizard.dir + 'ui/ui.alert',
      'UIMask'        : Lizard.dir + 'ui/ui.mask',
      'UILoadingLayer': Lizard.dir + 'ui/ui.loading.layer',
      'UIToast'       : Lizard.dir + 'ui/ui.toast',
      'UIInlineView'  : Lizard.dir + 'ui/ui.inline.view',
      'UINum'         : Lizard.dir + 'ui/ui.num',
      'UISwitch'      : Lizard.dir + 'ui/ui.switch',
      'UIBubbleLayer' : Lizard.dir + 'ui/ui.bubble.layer',
      'UITab'         : Lizard.dir + 'ui/ui.tab',
      'UIScroll'      : Lizard.dir + 'ui/ui.scroll',
      'UIScrollLayer' : Lizard.dir + 'ui/ui.scroll.layer',
      'UIRadioList'   : Lizard.dir + 'ui/ui.radio.list',
      'UISelect'      : Lizard.dir + 'ui/ui.select',
      'UIGroupSelect' : Lizard.dir + 'ui/ui.group.select',
      'UIGroupList'   : Lizard.dir + 'ui/ui.group.list',
      'UICalendar'    : Lizard.dir + 'ui/ui.calendar',
      'UISlider'      : Lizard.dir + 'ui/ui.slider',
      'UIImageSlider' : Lizard.dir + 'ui/ui.image.slider',
      'UIWarning404'  : Lizard.dir + 'ui/ui.warning404',
      'UIHeader'      : Lizard.dir + 'ui/ui.header',

      'UIIdentitycard': Lizard.dir + 'ui/ui.identitycard',
      'UILayerList'   : Lizard.dir + 'ui/ui.layer.list',
      'UIAnimation'   : Lizard.dir + 'ui/c.ui.animation',

      //所有模板在此
//      'UITemplates': Lizard.dir + 'ui/ui.templates',

      "cGeoService"   : Lizard.dir + "service/c.service.geo",
      "cMemberService": Lizard.dir + "service/c.service.member",
      "cGuiderService": Lizard.dir + "service/c.service.guider",

      "cHybridMember"     : Lizard.dir + "service/hybrid/c.hybrid.memberService",
      "cHybridGuider"     : Lizard.dir + "service/hybrid/c.hybrid.guider",
      "cHybridGeolocation": Lizard.dir + "service/hybrid/c.hybrid.geolocation",
      "cGeoHelper"        : Lizard.dir + "service/web/c.geo.helper",
      "cWebMember"        : Lizard.dir + "service/web/c.web.memberService",
      "cWebGuider"        : Lizard.dir + "service/web/c.web.guider",
      "cWebGeolocation"   : Lizard.dir + "service/web/c.web.geolocation",

      "cStatic"       : Lizard.dir + "app/web/c.web.static",
      "cBaseInit"     : Lizard.dir + "app/c.base.init",
      "cAbstractApp"  : Lizard.dir + "app/c.abstract.app",
      "cWebApp"       : Lizard.dir + "app/web/c.web.app",
      "cHybridApp"    : Lizard.dir + "app/hybrid/c.hybrid.app",
      "cWebViewApp"   : Lizard.dir + "app/hybrid/c.webview.app",
      "cHybridFacade" : Lizard.dir + "app/hybrid/c.hybrid.facade",
      "cHybridShell"  : Lizard.dir + "app/hybrid/c.hybrid.shell",
      //"cHybridHeader": Lizard.dir + "app/hybrid/c.hybrid.header",
      "cHybridAppInit": Lizard.dir + "app/hybrid/c.hybrid.init",
      "cWebAppInit"   : Lizard.dir + "app/web/c.web.init",

      "cJsonPlugin"      : Lizard.dir + "plugins/c.json.plugin",
      "cMarketPlugin"    : Lizard.dir + "plugins/c.market.plugin",
      "cSafariPlugin"    : Lizard.dir + "plugins/c.safari.plugin",
      "cStatisticsPlugin": Lizard.dir + "plugins/c.statistics.plugin",
      "cUnderscorePlugin": Lizard.dir + "plugins/c.underscore.plugin",
      "cPlugins"         : Lizard.dir + "plugins/c.plugins"
    },
    "map"      : {
      "*": {
        "cUtility"   : "cUtilCommon",
        "cStore"     : "cLocalStore",
        "cGuider"    : "cGuiderService",
        "CommonStore": "cCommonStore"
      }
    }
  });
});
/**
* @author l_wang王磊 <l_wang@Ctrip.com>
* @namespace Common.cMessageCenter
* @description 消息广播机制
*/
define('cMessageCenter',[], function () {
  var messageQueue = {};
  var MessageCenter = {
    /**
     * 发布消息
     * @method Common.cMessageCenter.publish
     * @param {string} message 消息标示
     * @param {array} args 参数
     */
    publish: function(message, args)
    {
      if (messageQueue[message])
      {
        _.each(messageQueue[message], function(item){
          item.handler.apply(item.scope?item.scope: window, args);  
        });
      }  
    },

    /**
     * 订阅消息
     * @method Common.cMessageCenter.subscribe
     * @param {string} message 消息标示
     * @param {function} handler 消息处理
     * @param {object} [scope] 函数作用域
     */
    subscribe: function(message, handler, scope)
    {
      if (!messageQueue[message]) messageQueue[message] = [];
      messageQueue[message].push({scope: scope, handler: handler});
    },

    /**
     * 取消订阅
     * @method Common.cMessageCenter.unsubscribe
     * @param {string} message 消息标示
     * @param {function} handler 消息处理函数句柄
     */
    unsubscribe: function(message, handler)
    {
      if (messageQueue[message]) {
        if (handler) {
          messageQueue[message] = _.reject(messageQueue[message], function(item){ return item.handler !=  handler});
        } else {
          delete messageQueue[message];
        }
      }
    }
  }
  return MessageCenter;
});
/**
 * @File c.util.perfomance.js
 * @Description: 性能统计工具类
 * @author jiangjing@ctrip.com
 * @date 2014-09-28 13:11:48
 * @version V1.0
 */

/**
 * 与性能统计相关方法,内部使用
 * @namespace Util.cUtilPerformance
 */
define('cUtilPerformance',[],function(){
    /*ubt性能采集*/
    function Performance() {
      this.performance = {};
      this.isapp = Lizard.isHybrid ? "1" : "0";
      this.defaults = {
        "Domready":       {
          "name": "JS.Lizard.Domready",
          "tags": {}
        },
        "Onload":         {
          "name": "JS.Lizard.Onload",
          "tags": {}
        },
        "AjaxReady":      {
          "name": "JS.Lizard.AjaxReady",
          "tags": {
            "url": ""
          }
        },

        /* JIANG Jing … 2014-08-19 */
        /* 记录 AJAX 响应的消息体长度信息 */
        "AjaxMessageSize":     {
          "name": "JS.Lizard.AjaxMessageSize",
          "tags": {
            "url": ""
            /*"contentEncoding" : "" tag暂时不能传空字符串，java端没有修复完毕*/
            /* 暂不记录分布区间信息 */
          }
        },

        "TemplateRender": {
          "name": "JS.Lizard.TemplateRender",
          "tags": {
            "url":""
          }
        },
        "GeoRequest": {
          "name": "JS.Lizard.GeoRequest",
          "tags": {
            "url":"",
            //+1……2014-09-12……JIANGJing
            "errno":"0"
          }
        }
      }
      this.uuid = 0;
    }
    
    if (!window.__bfi) {
      window.__bfi = [];
    }

    Performance.prototype = {

      send:     function (name, tag, value, ts) {
        var sendKey = ['_trackMatrix', name, tag, value, ts];
        //+1……2014-09-10……JIANGJing……临时禁用GeoRequest中除指定之外的其他性能监控点
        if (name == 'JS.Lizard.GeoRequest' && (typeof tag.url != 'string' || !tag.url.match(/^(Native|Web) function (number|detail|error)$/))) { return; }
        window.__bfi.push(sendKey);
      },

      //+…2014-08-19
      /* 获取规范格式的当前时间 */
      getTime: function() {
        return (new Date).getTime();
      },
      
      //+…2014-08-19
      /* 初始化选项值 */
      initOptions: function(opt) {
        //opt.startTime = this.getTime();
        opt.version = Lizard.version; /*lizard版本号*/
        opt.isapp =  this.isapp;  /*web/hybrid*/
        opt.network   = Lizard.networkType || 'unknown';  /*网络状况2g/3g/wifi*/
      },
      
      //+…2014-08-19
      /* 用于记录非时间长度值 */
      /**
       * 用于记录非时间长度值
       * @param opt
       * @param value
       */
      log: function(opt, value) {
        if (opt.url && _.isString(opt.url)) 
        {
          opt.url = opt.url.replace(new RegExp((+new Date()+'').slice(0,8)+'\\d{5}'),'__TIME__');
        }
        var def  = this.defaults[opt.name], tags = {};

        this.initOptions(tags);

        // 标签数据
        for (var key in def.tags) {
          tags[key] = (opt[key] || def.tags[key]) + '';
        }

        
        
        /*if (tags.distribution) {
          tags.distribution = this.distribution(value);
        }*/
        if(opt.name != "AjaxMessageSize"){/*ajaxmessagesize暂时不记录distribution*/
          tags.distribution = this.distribution(value);
        }

        this.send(def.name, tags, value, this.getTime());
      },

      group:    function (id, opt) {
        //-1…2014-08-19
        // opt.startTime = (new Date).getTime();
        //+1…2014-08-19
        opt.startTime = this.getTime();
        //-1…2014-08-19
        // opt.network = Lizard.networkType || 'unknown';
        this.performance[id] = opt;        
      },

      //+……2014-09-12……JIANGJing……读写 tag 值
      groupTag: function(id, tagname, /*OPTIONAL*/ value) {        
        var opt = this.performance[id];
        if (!opt) { 
          this.performance[id] = opt = {};
        }

        if (arguments.length == 3) {
          opt[tagname] = value;
        }

        return opt[tagname];
      },

      groupEnd: function (id) {
        var opt = this.performance[id] || {};

        //-15…2014-08-19…主要功能移至 Performace.prototype.log()
        // var defaults = this.defaults
        // var def = defaults[opt.name];
        // var tags = def.tags;
        // var matrixName = def.name;
        // var matrixTag = {};
        // for (var key in tags) {
        //   matrixTag[key] = opt[key] || tags[key];
        // }
        // //matrixTag = { url: 'http://mubt.test.sh.ctriptravel.com/index.html', distribution: "200-800" }
        // var ts = (new Date).getTime();
        // var matrixValue = ts - opt["startTime"]; 
        // if (matrixTag.distribution) {
        //   matrixTag.distribution = this.distribution(matrixValue);
        // }
        // this.send(matrixName, matrixTag, matrixValue, ts)
        //+1…2014-08-19
        this.log(opt, this.getTime() - opt.startTime);
      },
      getUuid:  function () {
        return "Performance_" + (++this.uuid);
      },
      
      distribution: function (time) {
        var ret = "";
        if (0 <= time & time <= 500) {
          ret = '[0,500]';
        } else if (501 <= time & time <= 1000) {
          ret = '[501,1000]';
        } else if (1001 <= time & time <= 2000) {
          ret = '[1001,2000]';
        } else if (2001 <= time & time <= 3000) {
          ret = '[2001,3000]';
        } else if (3001 <= time & time <= 4000) {
          ret = '[3001,4000]';
        } else if (4001 <= time) {
          ret = '[4001,--]';
        }
        return ret + "(ms)";
      }
    }
    
    return new Performance; 
});

/**
 * 封装常用的Ajax 访问
 * @namespace Common.cAjax
 * @author shbzhang@ctrip.com
 * @date 2013年6月23日
 */
define('cAjax',['libs', 'cUtilPerformance'], function (libs, cperformance) {
  //为兼容lizard2.0, json去掉charset=utf-8 
  var contentTypeMap = {
    'json': 'application/json',
    'jsonp': 'application/json'
  };

  var _getContentType = function (contentType) {
    if (contentType) contentType = contentTypeMap[contentType] ? contentTypeMap[contentType] : contentType;
    return contentType;
  };

  var ajax = (function ($) {

    /**
     *  AJAX GET方式访问接口
     * @method Common.cAjax.get
     * @param {string} url 请求的url
     * @param {object} data json格式的数据
     * @param {function} successCallback 成功回调
     * @param {function} [errorCallback] 错误回调
     * @param {number} [timeout=30000] 超时时间
     * @returns {XMLHttpRequest} XMLHttpRequest ajax句柄
     */
    function get(url, data, callback, error, timeout) {
      var opt = _getCommonOpt(url, data, callback, error);
      opt.type = 'GET';
      opt.timeout = timeout;
      return _sendReq(opt);
    };


    /**
     * AJAX POST方式访问接口
     * @method Common.cAjax.get
     * @param {string} url 请求的url
     * @param {object} data json格式的数据
     * @param {function} successCallback 成功回调
     * @param {function} [errorCallback] 错误回调
     * @param {number} [timeout=30000] 超时时间
     * @returns {XMLHttpRequest} XMLHttpRequest ajax句柄
     */
    function post(url, data, callback, error,timout) {
      var contentType = data.contentType;
      // data = JSON.stringify(data);
      data = JSON.stringify(data);
      var opt = _getCommonOpt(url, data, callback, error);
      opt.type = 'POST';
      opt.dataType = 'json';
      opt.timeout = timout;
      opt.contentType = _getContentType(contentType) || 'application/json';
      return _sendReq(opt);
    };


    /**
     * 以JSONP方式跨域访问外部接口
     * @method Common.cAjax.jsonp
     * @param {string} url 请求的url
     * @param {object} data json格式的数据
     * @param {function} successCallback 成功回调
     * @param {function} [errorCallback] 错误回调
     * @param {number} [timeout=30000] 超时时间
     * @returns {XMLHttpRequest} XMLHttpRequest ajax句柄
     */
    function jsonp(url, data, callback, error,timeout) {
      var opt = _getCommonOpt(url, data, callback, error);
      opt.type = 'GET';
      opt.dataType = 'jsonp';
      opt.crossDomain = true;
      opt.timeout = timeout;
      return _sendReq(opt);
    };


    /**
     * Cros方法提交Ajax请求
     * @method Common.cAjax.cros
     * @param {string} url 请求的url
     * @param {string} [type=POST] 请求提交方式 POST|GET
     * @param {object} data json格式的数据
     * @param {function} successCallback 成功回调
     * @param {function} [errorCallback] 错误回调
     * @param {number} [timeout=30000] 超时时间
     * @returns {XMLHttpRequest} XMLHttpRequest ajax句柄
     */
    function cros(url, type, data, callback, error,timeout) {
      var contentType = data.contentType;

      if (type.toLowerCase() !== 'get')
      // data = JSON.stringify(data);
        data = JSON.stringify(data);
      var opt = _getCommonOpt(url, data, callback, error);
      opt.type = type;
      opt.dataType = 'json';
      opt.crossDomain = true;
      opt.data = data;
      opt.contentType = _getContentType(contentType) || 'application/json';
      opt.timeout = timeout;
      /* if (window.XDomainRequest) {
       return _iecros(opt);
       } else {*/
      return _sendReq(opt);
      //}
    };

    /**
     * AJAX 提交表单,不能跨域
     * @param {url} url
     * @param {Object} form 可以是dom对象，dom id 或者jquery 对象
     * @param {function} callback 回调
     * @param {function} error 可选
     */
    function form(url, form, callback, error) {
      var jdom = null, data = '';
      if (typeof form == 'string') {
        jdom = $('#' + form);
      } else {
        jdom = $(form);
      }
      if (jdom && jdom.length > 0) {
        data = jdom.serialize();
      }
      var opt = _getCommonOpt(url, data, callback, error);
      return _sendReq(opt);
    };

    function _sendReq(opt) {
      var uuidXhrSend = cperformance.getUuid();
      cperformance.group(uuidXhrSend, {
        name: "AjaxReady",
        url: opt.url,
        data: opt.data
      });

      //+…2014-08-19
      var loadedLength = 0;

      var obj = {
        url: opt.url,
        type: opt.type,
        dataType: opt.dataType,
        data: opt.data,
        contentType: opt.contentType,
        timeout: Lizard.timeout || opt.timeout || 50000,

        //+…2014-08-19
        // 获取响应的字节长度（responseText.length 系字符数）
        beforeSend: function (xhr) {
          xhr.onprogress = function (event) {
            loadedLength = event.loaded ? event.loaded : event.position;
          }
        },

        //-1…2014-08-19
        // success: function (res) {
        //+1…2014-08-19
        success: function (res, status, xhr) {
          //+5…2014-08-19          
          cperformance.log({
            name: 'AjaxMessageSize',
            // contentEncoding: xhr && typeof xhr.getResponseHeader == 'function' ? xhr.getResponseHeader('content-encoding') : undefined, // 确保不要报错
            url: opt.url
          }, loadedLength);

          cperformance.groupEnd(uuidXhrSend);
          opt.callback(res);
        },
        error: function (err) {
          cperformance.groupEnd(uuidXhrSend);
          opt.error && opt.error(err);
        }
      };
      //是否是跨域则加上这条
      if (opt.url.indexOf(window.location.host) === -1) obj.crossDomain = !!opt.crossDomain;
      return $.ajax(obj);
    };

    /**
     * ie 调用 crors
     */
    function _iecros(opt) {
      if (window.XDomainRequest) {
        var xdr = new XDomainRequest();
        if (xdr) {
          if (opt.error && typeof opt.error == "function") {
            xdr.onerror = function () {
              opt.error();
              ;
            };
          }
          //handle timeout callback function
          if (opt.timeout && typeof opt.timeout == "function") {
            xdr.ontimeout = function () {
              opt.timeout();
            };
          }
          //handle success callback function
          if (opt.success && typeof opt.success == "function") {
            xdr.onload = function () {
              if (opt.dataType) {//handle json formart data
                if (opt.dataType.toLowerCase() == "json") {
                  opt.callback(JSON.parse(xdr.responseText));
                }
              } else {
                opt.callback(xdr.responseText);
              }
            };
          }

          //wrap param to send
          var data = "";
          if (opt.type == "POST") {
            data = opt.data;
          } else {
            data = $.param(opt.data);
          }
          xdr.open(opt.type, opt.url);
          xdr.send(data);
        }
      }
    };

    function _getCommonOpt(url, data, callback, error) {
      return {
        url: url,
        data: data,
        callback: callback,
        error: error
      }
    };

    return {
      get: get,
      post: post,
      jsonp: jsonp,
      cros: cros,
      form: form
    }
  })($);

  return ajax;
});
define('cImgLazyload',['libs'], function (libs) {
  

  var ImgLazyload = _.inherit({
    __propertys__: function () {
      this.isError = false;
      this.uuid = _.uniqueId() + new Date().getTime();
    },

    initialize: function (opts) {
      this.handleOpts(opts);
      //this.checkWrapperDisplay();
      this.init();
    },

    //用以解决父容器不显示导致高度失效问题
    checkWrapperDisplay: function () {
      //如果容器高度为0，一定是父容器高度不显示导致
      if (this.isError) return;
      this.TIMERRES && clearInterval(this.TIMERRES);
      if ($(this.imgs[0]).offset().top == 0) {
        this.isError = true;
        this.TIMERRES = setInterval($.proxy(function () {
          console.log('检测img offset.....');
          if ($(this.imgs[0]).offset().top > 0) {
            this.TIMERRES && clearInterval(this.TIMERRES);
            console.log('检测img offset结束，重设高度');
            this.isError = false;
            this.refresh();
          }
        }, this), 100);
      }
    },

    handleOpts: function (opts) {
      this.isError = false;
      if (!opts || !opts.imgs || !opts.imgs.length) { this.isError = true; return };
      this.imgs = opts.imgs;
      this.container = opts.container || $(window);
      this.width = opts.width;
      this.height = opts.height;

      this.loadingImg = opts.loadingImg || 'http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png';
      this.loadingBg = opts.loadingBg || '#ebebeb';

      this.needWrapper = false;
      if (this.width || this.height)
        this.needWrapper = true;

      this.wrapper = opts.wrapper || '<div class="cui_lazyload_wrapper" style="text-align: center; vertical-align: middle; "></div>';
      this.imgContainer = {};
    },

    init: function () {
      if (this.isError) return;
      this.initImgContainer();
      this.lazyLoad();
      this.bindEvents();
    },

    refresh: function (opts) {
      if (opts) {
        this.handleOpts(opts);
      }
      this.init();
    },

    bindEvents: function () {
      if (this.isError) return;

      this.destroy();

      //为container绑定事件
      this.container.on('scroll.imglazyload' + this.uuid, $.proxy(function () {
        this.lazyLoad();
      }, this));

      $(window).on('resize.imglazyload' + this.uuid, $.proxy(function () {
        this.initImgContainer();
      }, this));

      //图片加载失败相关逻辑

    },

    initImgContainer: function () {
      if (this.isError) return;

      var el, i, len, offset;
      for (i = 0, len = this.imgs.length; i < len; i++) {
        el = $(this.imgs[i]);
        if (!el.attr('data-src') || el.attr('data-src') == '' || el.attr('data-load') == '1') continue;

        offset = el.offset();
        if (!this.imgContainer[offset.top]) {
          this.imgContainer[offset.top] = [];
        }
        this.imgContainer[offset.top].push(el);
      }
    },

    //实际操作图片处
    _handleImg: function (tmpImg) {
      var sysImg, wrapper, scope;
      if (tmpImg.attr('data-src') && tmpImg.attr('data-src') != '') {
        if (this.needWrapper) {
          wrapper = $(this.wrapper);
          wrapper.css({
            width: this.width + 'px',
            height: this.height + 'px',
            'background-color': this.loadingBg
          });
          wrapper.insertBefore(tmpImg);
          wrapper.append(tmpImg);
        }

        sysImg = $(new Image());

        if (!tmpImg.attr('src'))
          tmpImg.attr('src', this.loadingImg);

        sysImg.on('error', function () {
          tmpImg.attr('src', this.loadingImg);
        }).on('load', function () {
          tmpImg.attr('src', tmpImg.attr('data-src'));
          tmpImg.attr('data-load', '1');

          setTimeout(function () {
            if (wrapper && wrapper[0]) {
              tmpImg.insertBefore(wrapper);
              wrapper.remove();
            }
          }, 1);
        }).attr('src', tmpImg.attr('data-src'));

      }
    },

    lazyLoad: function () {
      if (this.isError) return;

      var height = this.container.height();
      var srollHeight = this.container.scrollTop();
      var k, _imgs, tmpImg, i, len;

      for (k in this.imgContainer) {
        if (parseInt(k) < srollHeight + height) {
          _imgs = this.imgContainer[k];
          for (i = 0, len = _imgs.length; i < len; i++) {
            tmpImg = $(_imgs[i]);
            this._handleImg(tmpImg);
          }
          delete this.imgContainer[k];
        }
      } // for
    },

    destroy: function () {
      if (this.isError) return;
      this.TIMERRES && clearInterval(this.TIMERRES);
      //为container绑定事件
      this.container.off('.imglazyload' + this.uuid);

      $(window).off('.imglazyload' + this.uuid);
    }

  });

  //  ImgLazyload.lazyload = function (opts) {
  //    return new ImgLazyload(opts);
  //  };

  return ImgLazyload;

});

/**
 * @File c.parser.util.js
 * parser的工具类
 * @author luwei@ctrip.com
 * @version V2.1
 */
define('cParserUtil',[],function(){
  var ParseUtil = {}, uuid = 0;
  ParseUtil.getID = function(url){
    var id= "client_id_viewport_"+(++uuid)+"_"+(new Date().getTime());
    return id;
  }
  
  ParseUtil._containFunc = function(obj, expr)
  {
    var ret = false;
    for (var p in obj)
    {
      if (ret)
      {
        return true;
      }
      if (_.isFunction(obj[p]) && obj[p].toString().indexOf(expr.trim()) > -1)
      {
        obj[p] = obj[p].toString().trim();
        return true;
      }   
      else if (_.isObject(obj[p]) || _.isArray(obj[p]))
      {
        ret = ParseUtil._containFunc(obj[p], expr);
      }       
    }
    return ret;         
  }  
  
  function reString(str) {
    var h = {
        '\r': '\\r',
        '\n': '\\n',
        '\t': '\\t'
    };
    var re1 = /([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g;
    var re2 = /[\r\t\n]/g;
    return str.replace(re1, "\\$1").replace(re2, function (a) {
      return h[a];
    });
  }
  
  function fixReString(str){
    var chars=str.split('');
    var isInCharDict=false; // []
    var t='';
    var ret=[];
    while (t=chars.shift()){
      ret.push(t);
      if (t=='\\'){
        ret.push(chars.shift());
      }else if (t=='['&&!isInCharDict){
        isInCharDict=true;
      }else if (t==']'&&isInCharDict){
        isInCharDict=false;
       }else if (t=='('&&!isInCharDict){
        if (chars[0] == '?') {
          if (chars[1] == '!') {
          } else if (chars[1] == ':' || chars[1] == '=') {
            chars.shift();
            chars.shift();
            ret.push('?');
            ret.push(':');
          } else {
            ret.push('?');
            ret.push(':');    
          }
        }
      }
    }
    return ret.join('');
  }
  
  function urlParse(urlSchema, url){    
    var paraArr = [], tArr = [], params = {};
    var reStr = urlSchema.replace(/\{\{(.+?)\}\}/g,function(a,b){
      tArr.push(b);
      return '{@'+(tArr.length-1)+'}';
      }).replace(/\{(@?)(.+?)\}|[^\{\}]+/g,function(a,b,c){
        var ret = '';
        if (c){
          if (b){
            var pArr=tArr[c].match(/^(?:(?:\((\w+)\))?([^!=]+?)|([^!=]+?)=(.*))$/);
            if (pArr){
              if (pArr[2]){
                switch (pArr[1]){
                  case 'number':
                    ret='(\\d+(?:\\.\\d*)?|\\.\\d+)';
                    break;
                  case 'int':
                    ret='(\\d+)';
                    break;
                  case 'letter':
                    ret='([a-z _\\-\\$]+)';
                    break;
                  default:
                    ret='([^\\\/]*)';
                    break;
                }
                paraArr.push(pArr[2]);
              }else{
                paraArr.push(pArr[3]);
                if (/^\/.*\/$/.test(pArr[4])){
                  ret='('+fixReString(pArr[4].slice(1,-1))+')';
                }else{
                  var arr = pArr[4].split('||');
                  for (var j = 0;j < arr.length; j++){
                    arr[j]=reString(arr[j]);
                  }
                  ret='('+arr.join('|')+')';
                }
              }
            }else{
              ret='';
            }
          }else{
            paraArr.push(c);
            ret='([^\\\/]*)';
          }
        }else{
          ret=reString(a);
        }
        return ret;
    });        
 
    url = url.replace(/[#\?].*$/g,'');    
    var matches = url.match(new RegExp(reStr,'i')), pathRe = '/([^\/]*)';
    if (reStr[reStr.length - 1] != '\\')
    {
      pathRe = '\\/([^\/]*)'
    }     
    var morePathmatches = url.match(new RegExp(reStr + pathRe,'i'));
    if (matches && !morePathmatches){
      for (var i=0;i<paraArr.length;i++) {
        params[paraArr[i]] = matches[i+1]||null;
      }
      return {reStr: reStr, param: params, index: matches.index};
    } 
    return {};
  }
  
  ParseUtil.getPageUrlschema = function(configStr)
  {
    var ret = '';
    var arr=configStr.match(/([\'\"])?url_schema\1\s*:\s*([\'\"])(.*?)\2/) || configStr.match(/([\'\"])?url_schema\1\s*:\s*\[\s*([\'\"])((.|\s)*?)\2(\s*|,)]/);
    if (arr){
      eval('ret = {' + arr[0] + '}[\'url_schema\']');
      return ret;
    }
    else
    {
      return '';
    }
  }
  
  ParseUtil.getPageParams = function(url, urlschema) {
    url = decodeURIComponent(url);
    var ret = {};
    if (typeof urlschema == 'string')
    {
      urlschema = [urlschema];
    }
    _.each(urlschema, function(item){
      var paraArr = [], paraHash = {};
      var parseRet = Lizard.schema2re(item, url);
      if (parseRet.reStr && parseRet.param)       
      {
        ret = parseRet.param;
      }        
    }); 
    // parseQuery: here cant replace hash to blank coz someone use querystring "from" which contain hash to show where the page come from  
    var queryStr=url.replace(/^[^\?#]*\??/g,'').replace(/#DIALOG_.*$/g,'').replace(/#\|cui-.*$/g,'');
    var searchReg = /([^&=?]+)=([^&]+)/g;
    var urlReg = /\/+.*\?/;
    var arrayReg = /(.+)\[\]$/;
    var match, name, value, isArray;    
    while (match = searchReg.exec(queryStr)) {
      name = match[1].toLowerCase();
      value = match[2];
      isArray = name.match(arrayReg);
      if (urlReg.test(value)) {
        ret[name] = queryStr.substr(queryStr.indexOf(value));
        break;
      } else {
        if (isArray) {
          name = isArray[1];
          ret[name] = ret[name] || [];
          ret[name].push(value);
        } else {
          ret[name] = value;
        }
      }
    }
    
    return ret;
  }
  
  ParseUtil.parseDepend = function(configStr) {
    var ajaxDataMatch = configStr.match(/Lizard.D\(([\'\"])(.*?)([\'\"])\)(.*?)(,|\s)/g), dataexpr = [];
    if (ajaxDataMatch)
    {
      _.each(ajaxDataMatch, function(match){
        var dataexprStr = match.split(',').join('').split('}').join('');
        dataexpr.push(dataexprStr);
      })
    }
    return dataexpr;
  }
  
  ParseUtil._runUnderscore = function(tmpl,datas){
    if (!datas){
      datas={};
    }
    var ret='';
    if (tmpl){
      var compiled = _.template(tmpl);
      var handler = Lizard.T;      
      ret = compiled(datas,{
        Lizard:Lizard
      }).trim();
    }
    return ret;
  }
  
  Lizard.getModels = function(pageConfig)
  {
    if(!pageConfig.model) pageConfig.model= {};
    var apis = pageConfig.model.apis || [], ret = [], dataexpr = pageConfig.dataexpr;
    _.each(apis, function(api){
      api.runat = api.runat||"all";
      if((api.runat == Lizard.renderAt) || api.runat=="all"){
        ret.push(api);
      }   
      if ('suspend' in api)
      {
        api.suspend = api.suspend.toString();
      }
      else
      {
        api.suspend = false;
      }
      _.each(dataexpr, function(p)
      {
        var postdataStr = JSON.stringify(api.postdata);
        if (JSON.stringify(postdataStr).indexOf(p) > -1 || ParseUtil._containFunc(api.postdata, p) || (api.suspend && api.suspend.indexOf(p) > -1))
        {
          if (!api.depends)
          {
            api.depends = [];
            api.expressionMap = {};
          }
          api.depends.push(eval(p.match(/Lizard.D\(([\'\"])(.*?)([\'\"])\)/g)[0].split('Lizard.D').join('')));
          api.expressionMap[p] = dataexpr[p];
        }
      });
    });
    if (_.isFunction(pageConfig.errorBack))
    {
      Lizard.errorBack = pageConfig.errorBack;
    }
    else
    {
      Lizard.errorBack = null;
    }
    return apis;
  } 
    
  /**
   * 根据ID 获取相应的模板
   * @param {String} tmplId 模板的id
   * @param {Object} datas 模板中对应变量属性值
   * @returns {String} result
   * @Method Global.Lizard.T
   * @example
   * //返回值
   * var domString  = Lizard.T("testId")
   * console.log(domString) //" < d i v > < s p a n> 测试字符串</ s p a n></ d i v>"
   */
  Lizard.T = Lizard._T = function(tmplId,datas)
  {
    if (arguments.length == 1)
    {
      var ret = "";
      var t=Lizard.T.lizTmpl[tmplId];
      if (t&&t.runat!=('server')){
        ret = t.text;
      }
      return ret;
    }
    else
    {
      return _runUnderscore(Lizard._T(tmplId),datas);
    }
}
  /**
   * 根据属性Key,获取Url中得参数值
   * @param {String} key 参数名
   * @param {Object|*} [val] 参数值
   * @returns {Object | *}
   * @Method Global.Lizard.P
   * @example
   * //location.href = 'http://ctrip.com/html5/search/index?k=1&from=http:/ctrip.com?a=1&b=3';
   * var k = Lizard.P('k');
   * console.log(k)  //1
   * Lizard.P('k',5)
   * console.log(k)  //5
   */
  Lizard.P = function(key, val)
  {
    var ret=null;
    if (_.isUndefined(val)){
      ret= Lizard.P.lizParam[key] || Lizard.P.lizParam[key.toLowerCase()];
    }else{
      ret=Lizard.P.lizParam[key]=val;
    }
    return ret;
  }  
  Lizard.schema2re = urlParse;

  return ParseUtil;  
});
/**
 * @File c.page.parser.js
 * Lizard 解析类
 * @author wxj@ctrip.com/luwei@ctripcom
 * @version V2.1
 */
define('cPageParser',['cCoreInherit', 'cLocalStore', 'cCommonStore', 'cParserUtil'], function(cCoreInherit, cStore, CommonStore, ParseUtil){
  var pageDocNode = null;
  _.each(_.keys(ParseUtil), function(key){
    window[key] = ParseUtil[key];
  })
  
  function getPageConfigStr()
  {    
    var configStr = pageDocNode.find('script[type="text/lizard-config"]').text();
    if (!configStr)
    {
      configStr = '{"url_schema": "","model": {"apis": []},"view":{}}';
    }
    return configStr;
  }
  /**
    获取页面配置
   */
  function getPageConfig(){  
    var configStr = getPageConfigStr();  
    var dataexpr = parseDepend(configStr);
    eval('var ret = ' + configStr);
    if (!ret.viewName)
    {
      var viewName = ret.controller.substring(ret.controller.lastIndexOf('/') + 1);
      ret.viewName = viewName.substring(0, viewName.indexOf('.'));
    }
    ret.dataexpr = dataexpr;
    return ret;
  }
  /**
    获取页面templates
  */
  function getPageTemplates(){    
    var ret={}, templates = pageDocNode.find('script[type="text/lizard-template"]');
    _.each(templates, function(template){
      var tmplNode = $(template);
      if (tmplNode.attr('id')){
        ret[tmplNode.attr('id')]={
          'runat': tmplNode.attr('runat')||'all',
          'text': removeTags(tmplNode.text(), 'client')
        };
      }
    });
    return ret;
  }
  function removeTags(html,runat){
    var pageNode = $('<SCRIPT>' + html + '</SCRIPT>');
    pageNode.find('[runat=' + runat + ']').remove();
    return pageNode.text();
  }
  
  Lizard._initParser = function(url, html)
  {
    pageDocNode = $('<DIV>' + html + '</DIV>'); 
    Lizard.T.lizTmpl = getPageTemplates();
    Lizard.P.lizParam = getPageParams(url, getPageUrlschema(getPageConfigStr()));
    var pageConfig = getPageConfig();
    pageConfig.pageUrl = url;
    return pageConfig;
  }  

  /**
   * 获取localStorage, 主要是在模板的filter中使用
   * @param {String} storeName 要存取到localStorage中的key
   * @param {String} [key]  返回对象的某个属性值
   * @param {Object|*} defaultvalue 缓存中没有值时，默认返回的值
   * @returns {Object|*} 返回存储的数据
   * @Method Global.Lizard.S
   * @example
   * //参数 storename值
   * 'SALES','SALES_OBJECT','UNION'等等
   */
  Lizard.S = function(stroename, key, defaultvalue)
  {
    if (!this.loacaStores)
    {
      this.loacaStores = {};
    }
    if (!this.loacaStores[stroename])
    {
      if (stroename == 'SALES')
      {
        this.loacaStores[stroename] = CommonStore.SalesStore;
      }
      else if (stroename == 'SALES_OBJECT')
      {
        this.loacaStores[stroename] = CommonStore.SalesObjectStore;
      }
      else if (stroename == 'UNION')
      {
        this.loacaStores[stroename] = CommonStore.UnionStore;
      }
      else
      {
        this.loacaStores[stroename]  = new cCoreInherit.Class(cStore, {
          __propertys__: function () {
            this.key = stroename;
          }
        });
      }
    }
    if (!key)
    {
      return this.loacaStores[stroename].getInstance().get();
    }
    if (!this.loacaStores[stroename].getInstance().get())
    {
      return defaultvalue;
    }
    return this.loacaStores[stroename].getInstance().get().hasOwnProperty(key)? this.loacaStores[stroename].getInstance().get()[key] :defaultvalue;         
  }

 /**
  * 根据lizard-config的Models的配置，获取相应ajax请求值
  * @param {String} apiName  models中的apis
  * @return {Object| null} api的请求返回值
  * @Method Global.Lizard.D
  * @example
  * "model":{
  *    apis:[
  *       {
  *         url:'http://m.ctrip.com/d/list2',
  *         postdata: {
  *           limit: 2
  *         },
  *         name: 'list2'
  *       }
  *    ]
  * }
  * Lizard.D('list2')
  */
  Lizard.D = function(apiName)
  {
    if (this.ajaxDatas && this.ajaxDatas[apiName])
    {
      return this.ajaxDatas[apiName];
    }       
    return null;
  }  
  
  function _setTDKInfo(datas, pageConfig)
  {
    var TDKStr = [];
    var TDK = pageConfig.model.setTDK ? pageConfig.model.setTDK(datas) : {};
    var title = pageDocNode.find('title');
    if (TDK.title) {
      if(title) title.remove();
      TDKStr.push('<title>'+TDK.title+'</title>');
    }
    _.each(TDK, function(val, key){
      if (!val)
      {
        return;
      } 
      var metaNode = pageDocNode.find('meta[name="' + key + '"]');
      if (metaNode) metaNode.remove();
      TDKStr.push('<meta name="' + key + '" content="' + val + '" />');
    });
            
    return {TDK: TDK, TDKStr: TDKStr.join('')};            
  }
  
  function _setUBTInfo()
  {
    var varNames = ['page_id', 'bf_ubt_orderid', 'ab_testing_tracker'];
    _.each(varNames,function(varName){
      var values = '';
      var node = pageDocNode.find('#' + varName);
      if (node.get(0))
      {
        values = node.val();
      }
      eval(varName + ' = \'' + values + '\'')
    });
    if(_.isArray(ab_testing_tracker) ){
      var ret = [];
      _.each(ab_testing_tracker, function(val,key){
        _.each(val.attr("value").split(";"),function(val1,key1){
          if(val1){
            ret.push(val1);
          }
        });
      });
      ab_testing_tracker = ret.join(";");
    }
  }
  
  Lizard.render = function(pageConfig, datas, dialogInfo)
  {
    var ret = {
      header: '',
      viewport: ''
    };
    
    var validateRet = true;
    if (_.isFunction(pageConfig.validate))
    {
      validateRet = pageConfig.validate(datas);
      if (!validateRet && _.isFunction(pageConfig.modelOnError))
      {
        ret = pageConfig.modelOnError(datas);
      }         
    }
    else
    {
      var result = _setTDKInfo(datas, pageConfig);
      if (arguments.length == 2)
      {
        _setUBTInfo();
      }
      if (pageConfig.model.filter){
        datas = pageConfig.model.filter.call(this, datas, result.TDK);
      }
    }
    
    for (var tmplName in pageConfig.view){
      if (pageConfig.view.hasOwnProperty(tmplName)){
        ret[tmplName] = _runUnderscore(pageConfig.view[tmplName],datas);
      }
    }

    var id = dialogInfo? dialogInfo.pageID + "$" + dialogInfo.dialogName: getID(pageConfig.pageUrl); 
    
    ret.viewport = ['<div id="', id, '" page-url="', pageConfig.pageUrl, '">', ret.viewport, '</div>'].join('').trim();
    ret.id = id;
    ret.controller = pageConfig.controller;
    ret.config = pageConfig;
    ret.datas = datas;
    ret.lizTmpl = Lizard.T.lizTmpl;
    ret.lizParam = Lizard.P.lizParam;
    ret.TDK = result.TDKStr;
    ret.validateRet = validateRet;
    if (dialogInfo)
    {
      ret = _.extend(ret, dialogInfo.ubtInfo)
    }
    else
    {
      ret.page_id = page_id;
      ret.ab_testing_tracker = ab_testing_tracker;
      ret.bf_ubt_orderid = bf_ubt_orderid;
    }
    return ret; 
  }
  
  Lizard.getController = function(pageConfig)
  {
    return pageConfig.controller
  }
});
/**
 * @File c.util.cacheViews.js
 * @Description: 维护了一个views的集合
 * @author weixj@ctrip.com
 * @date 2014-09-28 14:31:45
 * @version V1.0
 */

/**
 * lizard 内部使用的一个view容器类
 * @namespace Util.cUtilCacheViews
 */
define('cUtilCacheView',[],function () {
  function CacheViews() {
    //缓存view实例
    this.catchs = {};
    //缓存view的重要信息，以便可以恢复view实例
    this.backups = {};
    this.orderCaches = [];
  }

  CacheViews.prototype = {
    /**
     * 向views添加新的view
     * @param key
     * @param val
     */
    add: function (key, val) {

      this.catchs[key] = val;

      this.orderCaches.push({
        key: key,
        url: val.url,
        viewName: val.viewName
      });
      this.backups[key] = {
        url: val.url,
        opts: val.opts,
        text: val.text,
        datas: val.datas,
        viewName: val.viewName
      };
    },

    _delElemFromCollection: function (collection, key, val) {
      collection = _.reject(collection, function (item) {
        return item[key] == val;
      });
    },

    delOrderCaches: function (key, val) {
      this._delElemFromCollection(this.orderCaches, key, val);
    },

    /**
     * 根据id 删除view
     * @param key
     */
    delById: function (key) {
      if (this.catchs[key]) {
        delete this.catchs[key];
      }
      this.delOrderCaches("key", key)
    },

    /**
     * 根据viewname删除view
     * @param viewName
     */
    delByName: function (viewName) {
      this._delElemFromCollection(this.catchs, 'viewName', viewName);
      this.delOrderCaches("viewName", viewName);
    },

    /**
     * 根据url删除view
     * @param URL
     */
    delByURL: function (URL) {
      this._delElemFromCollection(this.catchs, 'url', URL);
      this.delOrderCaches("url", URL);
    },

    delByIdFromBackups: function (key) {
      if (this.backups[key]) {
        delete this.backups[key];
      }
      this.delOrderCaches("key", key);
    },

    delByNameFromBackups: function (viewName) {
      this._delElemFromCollection(this.backups, 'viewName', viewName);
      this.delOrderCaches("viewName", viewName);
    },

    delByURLFromBackups: function (URL) {
      this._delElemFromCollection(this.backups, 'url', URL);
      this.delOrderCaches("url", URL);
    },
    /**
     * 根据id找到view
     * @param key
     * @returns {*}
     */
    findById: function (key) {
      return this.catchs[key];
    },

    /**
     * 根据viewName找到view
     * @param viewName
     * @returns {*}
     */
    findByName: function (viewName) {
      return _.findWhere(this.catchs, {viewName: viewName});
    },


    findByIdFromBackups: function (key) {
      return this.backups[key];
    },

    findByNameFromBackups: function (viewName) {
      return _.findWhere(this.backups, {viewName: viewName});
    },

    findByURLFromBackups: function (URL) {
      return _.findWhere(this.backups, {url: URL});
    },

    /**
     * view的个数
     * @returns {*}
     */
    length: function () {
      return _.size(this.catchs);
    },
    /**
     * 遍历views
     * @param callback
     */
    each: function (callback) {
      if (_.isFunction(callback)) {
        _.each(this.catchs, function (val, key) {
          callback(key, val);
        });
      }
    }
  }

  return CacheViews;
});

/**
 * @File c.util.hybrid.js
 * @Description: hybrid环境的常用工具方法
 * @author shbzhang@ctrip.com
 * @date 2014-09-24 11:06:12
 * @version V1.0
 */

/**
 * 与Hybrid相关的工具方法
 * @namespace Util.cUtilHybrid
 */
define('cUtilHybrid',[], function () {

  var userAgent = window.navigator.userAgent,
    storage = window.localStorage;

  var Util = {};

  /**
 * 获取当前App 环境，fat/uat/dev/project ,2.0不再依据App判定环境
 * @static
 * @method Util.cUtilHybrid.isPreProduction
 * @deprecated
 * @returns {string} 0:测试 1:堡垒 2:UAT  null；生产
 */
  Util.isPreProduction = function () {
    return storage.getItem('isPreProduction');
  };

  /**
   * 获取App 平台类型
   * @static
   * @method Util.cUtilHybrid.getAppSys
   * @returns {string} ctrip:标准版,pro:Pro版,unicom:联通版,youth:青春版,ctriplite:轻量版
   */
  Util.getAppSys = function () {
    if (userAgent.indexOf('CtripLite') > -1) {
      return 'ctriplite';
    }
    var reg = /.+_(\w+)_CtripWireless_(\w+)/;
    var arr = reg.exec(userAgent);
    if (arr && arr[1]) return arr[1].toLowerCase();
    return null;
  };

  /**
   * 获取版本号
   * @static
   * @method Util.cUtilHybrid.getAppVer
   * @returns {string} 版本号
   */
  Util.getAppVer = function () {
    var arr = userAgent.match(/_([^_]+)$/);
    if (arr && arr[1]) return arr[1];
    return "1.0"
  };

  /**
   * 是否在app中打开，app
   * @static
   * @var Util.cUtilHybrid.isInApp
   * @type {boolean}
   */
  Util.isInApp = Lizard.isHybrid;


  /**
   * 判定是否在微信中
   * @static
   * @var Util.cUtilHybrid.isInWeichat
   * @type {boolean}
   */
  Util.isInWeichat = (function () {
    return userAgent.indexOf('MicroMessenger') > -1 ? true : false;
  })();


  /**
   * 判定是否为轻量版
   * @static
   * @var Util.cUtilHybrid.isLite
   * @type {boolean}
   */
  Util.isLite = (function () {
    return Util.getAppSys() == 'ctriplite';
  })();

  /**
   * 判定是否为标准版
   * @static
   * @var Util.cUtilHybrid.isStandard
   * @type {boolean}
   */
  Util.isStandard = (function () {
    return Util.getAppSys() == 'ctrip';
  })();

  /**
   * 判断是否为pro版
   * @static
   * @var Util.cUtilHybrid.isPro
   * @type {boolean}
   */
  Util.isPro = (function () {
    return Util.getAppSys() == 'pro';
  })();

  /**
   * 判断是否为联通版
   * @static
   * @var Util.cUtilHybrid.isUnicom
   * @type {boolean}
   */
  Util.isUnicom = (function () {
    return Util.getAppSys() == 'unicom';
  })();

  /**
   * 判断是否为青春版
   * @var Util.cUtilHybrid.isYounth
   * @type {boolean}
   */
  Util.isYounth = (function () {
    return Util.getAppSys() == 'youth';
  })();

  /**
   * 获取当前的网络状态
   * @method Util.cUtilHybrid.getNetStates
   * @return {string} netStatus 网络状态 None-无网络, 2G-蜂窝数据网EDGE/GPRS, 3G-蜂窝数据网HSPDA,CDMAVOD, 4G-LTE(4G为5.9加入), WIFI-WLAN网络
   * @since 5.8
   */
  Util.getNetStatus = function(){
    var cinfo = storage.getItem('CINFO');
    var status = 'None';
    try{
      var data = JSON.parse(cinfo);
      status = data.networkStatus || '';
    }catch (e){

    }
    return status;
  };

  /**
   * 判断当前是否处于省流量模式
   * @var Util.cUtilHybrid.isSaveFlow;
   * @type {boolean}
   */
  Object.defineProperty(Util, 'isSaveFlow', {
    get: function() {
      try {
        var cinfo = window.localStorage.getItem('CINFO');
        var data = JSON.parse(cinfo);
        return data.isSaveFlow;
      } 
      catch (ex) {
        return undefined;
      }
    }
  });

  return Util;
});
/**
 * @File c.util.Path.js
 * @Description: url处理常用工具方法
 * @author weixj@ctrip.com,shbzhang@ctrip.com
 * @date 2014-09-28 13:30:45
 * @version V1.0
 */

/**
 * url处理常用工具方法
 * @namespace Util.cUtilPath
 */
define('cUtilPath',['$'], function () {

  var Path = {};

  /**
   * 解析URL中的各项参数
   * @method Util.cUtilPath.parseUrl
   * @param url
   * @returns {{href: (*|string), hrefNoHash: (*|string), hrefNoSearch: (*|string), domain: (*|string), protocol: (*|string), doubleSlash: (*|string), authority: (*|string), username: (*|string), password: (*|string), host: (*|string), hostname: (*|string), port: (*|string), pathname: (*|string), directory: (*|string), filename: (*|string), search: (*|string), hash: (*|string)}}
   */
  Path.parseUrl = function (url) {
    var urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
    var matches = urlParseRE.exec(url || "") || [];
    return {
      href: matches[0] || "",
      hrefNoHash: matches[1] || "",
      hrefNoSearch: matches[2] || "",
      domain: matches[3] || "",
      protocol: matches[4] || "",
      doubleSlash: matches[5] || "",
      authority: matches[6] || "",
      username: matches[8] || "",
      password: matches[9] || "",
      host: matches[10] || "",
      hostname: matches[11] || "",
      port: matches[12] || "",
      pathname: matches[13] || "",
      directory: matches[14] || "",
      filename: matches[15] || "",
      search: matches[16] || "",
      hash: matches[17] || ""
    };
  };

  /**
   * 截取URL参数
   * @method Util.cUtilPath.getUrlParam
   * @param {url} url
   * @param {String} key 参数key名
   * @returns {String} value 参数值
   */
  Path.getUrlParam = function (url, name) {
    var re = new RegExp("(\\?|&)" + name + "=([^&]+)(&|$)", "i"), m = url.match(re);
    return m ? m[2] : "";
  };

  /**
   * 解析URL参数为json对象
   * @method Util.cUtilPath.getUrlParams
   * @static
   * @param {url} url
   * @returns {Json} object
   */
  Path.getUrlParams = function (url) {
    var url = url.split('://');
    var searchReg = /([^&=?]+)=([^&]+)/g;
    var urlParams = {};
    var match, value, length, name;

    while (match = searchReg.exec(url[0])) {
      name = match[1];
      value = match[2];
      urlParams[name] = value;
    }

    if (url[1]) {
      var idx = 0;
      length = _.size(urlParams);
      _.each(urlParams, function (value, key) {
        if (++idx == length) {
          urlParams[key] += '://' + url[1];
        }
      });
    }

    return urlParams;
  }


  return Path;
});

    
/**
 * @File c.util.validate.js
 * @Description: 常用的验证方法
 * @author shbzhang@ctrip.com
 * @date 2014-09-24 11:06:12
 * @version V1.0
 */

/**
 * 与验证相关的工具方法
 * @namespace Util.cUtilValidate
 */
define('cUtilValidate',['$'], function () {

  /**
   var result = {};
   _toString = Object.prototype.toString;
   $.each("String Function Boolean RegExp Number Date Object Null Undefined".split(" "), function (i, name) {
    var fn;
    _toString
    switch (name) {
      case 'Null':
        fn = function (obj) { return obj === null; };
        break;
      case 'Undefined':
        fn = function (obj) { return obj === undefined; };
        break;
      default:

        //        if (typeof obj === 'object') {
        //          obj = Object.prototype.toString.call(obj);
        //        }
        fn = function (obj) { return new RegExp(name + ']', 'i').test(_toString.call(obj)); };
        //fn = function (obj) { return new RegExp(name + ']', 'i').test(obj); };
        break;
    }
    result['is' + name] = fn;

  });*/



  /**
   * 是否为函数
   * @deprecated since version 2.1 使用_.isFunction代替，见{@link http://underscorejs.org/#isFunction underscorejs}
   * @method Util.cUtilValidate.isFunction
   * @param {*} agr1
   * @return {boolean} flag
   */

  /**
   * 是否为字符串
   * @deprecated since version 2.1 使用_.isString代替，见{@link http://underscorejs.org/#isString underscorejs}
   * @method Util.cUtilValidate.isString
   * @param {*} agr1
   * @return {boolean} flag
   */
  /**
   * 是否为布尔型
   * @deprecated since version 2.1 使用_.isBoolean，见{@link http://underscorejs.org/#isBoolean underscorejs}
   * @method Util.cUtilValidate.isBoolean
   * @param {*} agr1
   * @return {boolean} flag
   */

  /**
   * 是否为正则
   * @deprecated since version 2.1 使用_.isRegExp，见{@link http://underscorejs.org/#isRegExp underscorejs}
   * @method Util.cUtilValidate.isRegExp
   * @param {*} agr1
   * @return {boolean} flag
   */


  /**
   * 是否为数字
   * @deprecated since version 2.1 使用_.isNumber，见{@link http://underscorejs.org/#isNumber underscorejs}
   * @method Util.cUtilValidate.isNumber
   * @param {*} agr1
   * @return {boolean} flag
   */

  /**
   * 是否为Object
   * @deprecated since version 2.1 使用_.isObject，见{@link http://underscorejs.org/#isObject underscorejs}
   * @method Util.cUtilValidate.isObject
   * @param {*} agr1
   * @return {boolean} flag
   */

  /**
   * 是否为Null
   * @deprecated since version 2.1 使用_.isNull，见{@link http://underscorejs.org/#isNull underscorejs}
   * @method Util.cUtilValidate.isNull
   * @param {*} agr1
   * @return {boolean} flag
   */

  /**
   * 是否为Undefined
   * @deprecated since version 2.1 使用_.isUndefined，见{@link http://underscorejs.org/#isUndefined underscorejs}
   * @method Util.cUtilValidate.isUndefined
   * @param {*} agr1
   * @return {boolean} flag
   */

  var validators = {
    /**
     * 是否为Email
     * @method Util.cUtilValidate.isEmail
     * @param {String} agr1
     * @return {boolean} flag
     */
    isEmail: function (text) {
      var reg = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;
      return reg.test(text);
    },

    /**
     * 是否为合法密码，6-20位字母数字
     * @method Util.cUtilValidate.isPassword
     * @param {String} agr1
     * @return {boolean} flag
     */
    isPassword: function (text) {
      var reg = /^[a-zA-Z0-9]{6,20}$/;
      return reg.test(text);
    },

    /**
     * 是否为合法手机号
     * @method Util.cUtilValidate.isMobile
     * @param {string}  text
     * @returns {boolean}
     */
    isMobile: function (text) {
      var reg = /^(1[3-8][0-9])\d{8}$/;
      return reg.test(text);
    },

    /**
     * 是否为中文字符
     * @method Util.cUtilValidate.isChinese
     * @param {string}  text
     * @returns {boolean}
     */
    isChinese: function (text) {
      var reg = /^[\u4e00-\u9fff]{0,}$/;
      return reg.test(text);
    },

    /**
     * 是否为英文字符
     * @method Util.cUtilValidate.isEnglish
     * @param {string}  text
     * @returns {boolean}
     */
    isEnglish: function (text) {
      var reg = /^[A-Za-z]+$/;
      return reg.test(text);
    },

    /**
     * 是否为6位数字邮编
     * @method Util.cUtilValidate.isZip
     * @param {string} text
     * @returns {boolean}
     */
    isZip: function (text) {
      var reg = /^\d{6}$/;
      return reg.test(text);
    },

    /**
     * 是否为日期格式字符串
     * @method Util.cUtilValidate.isDateStr
     * @param {string} text
     * @returns {boolean}
     */
    isDateStr: function (text) {
      //yyyyMMdd格式正则加入润年2月
      var reg = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)$/;
      if (!reg.test(text)) {
        return false;
      }
      return true;
    },

    /**
     * 是否包含繁体字
     * @method Util.cUtilValidate.isTraditional
     * @param {String} text
     * @returns {boolean} flag
     */
    isTraditional: function (text) { //判断是否包含繁体字
      var sTraditional = '萬與醜專業叢東絲兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壟壚壘墾堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒儘臟拚';
      for (var i = 0; i < text.length; i++) {
        var tmp = text.charAt(i);
        if (sTraditional.indexOf(tmp) > -1) {
          return true;
        }
      }
      return false;
    },
    /**
     * 是否为合法身份证有效证
     * @method Util.cUtilValidate.isIdCard
     * @param {String} text
     * @returns {boolean} flag
     */
    isIdCard: function (idCard) {
      var num = idCard.toLowerCase().match(/\w/g);
      if (idCard.match(/^\d{17}[\dx]$/i)) {
        var sum = 0, times = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        for (var i = 0; i < 17; i++)
          sum += parseInt(num[i], 10) * times[i];
        if ("10x98765432".charAt(sum % 11) != num[17]) {
          return false;
        }
        return !!idCard.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3");
      }
      if (idCard.match(/^\d{15}$/)) {
        return !!idCard.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3");
      }
      return false;
    },


    /**
     * 是否为合法QQ号码
     * @method Util.cUtilValidate.isQq
     * @param {String} target
     * @returns {boolean} flag
     */
    isQq: function (target) {
      return /^[1-9]\d{4,}$/.test(target);
    },


    /**
     * 是否为合法Url
     * @method Util.cUtilValidate.isUrl
     * @param {String} target
     * @returns {boolean} flag
     */
    isUrl: function (target) {
      return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(target);
    },


    /**
     * 是否为合法Ip
     * @method Util.cUtilValidate.isIP
     * @param {String} text
     * @returns {boolean} flag
     */
    isIP: function (obj) { //是否为IP
      if (!obj || result.isNull(obj)) return false;

      var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
      if (re.test(obj)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
      }

      return false;
    },


    isCharsLenWithinRange: function (value, max) {
      if (!result.isString(value)) return false;

      var reg = value.match(/\W/g);
      var length = reg == null ? value.length : value.length + reg.length;
      var isValidate = length >= 0 && length <= max;

      if (!isValidate) {
        return false;
      } else {
        this.cutLen = value.length;
      }

      return true;
    }
  };


  return validators;
});
/*
 * $Id: base64.js,v 2.12 2013/05/06 07:54:20 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *    http://opensource.org/licenses/mit-license
 *
 *  References:
 *    https://github.com/leewind/js-base64
 *    http://en.wikipedia.org/wiki/Base64
 */


/**
 * @File c.crypt.base64.js
 * @Description: base64加解密模块
 * @author shbzhang@ctrip.com
 * @date 2014-09-26 16:21:02
 * @version V1.0
 */

/**
 * Base64加解密模块
 * @namespace Util.cUtilCryptBase64
 */
define('cUtilCryptBase64',[], function(){
  

  var Crypt = {};

//  if (typeof window.btoa === 'function' && typeof window.atob === 'function') {
//    Crypt.Base64 = {
//      encode: window.btoa,
//      decode: window.atob
//    };

//    return Crypt;
//  }

  // existing version for noConflict()
  var _Base64 = Crypt.Base64;
  var version = "2.1.4";
  // if node.js, we use Buffer
  var buffer;
  if (typeof module !== 'undefined' && module.exports) {
    buffer = require('buffer').Buffer;
  }
  // constants
  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var b64tab = function(bin) {
    var t = {};
    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
    return t;
  }(b64chars);
  var fromCharCode = String.fromCharCode;
  // encoder stuff
  var cb_utob = function(c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f))) : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f)));
    } else {
      var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
      return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) + fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) + fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) + fromCharCode(0x80 | (cc & 0x3f)));
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = function(u) {
    return u.replace(re_utob, cb_utob);
  };
  var cb_encode = function(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
      ord = ccc.charCodeAt(0) << 16 | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
      chars = [
        b64chars.charAt(ord >>> 18),
        b64chars.charAt((ord >>> 12) & 63),
        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
      ];
    return chars.join('');
  };
  var btoa = Crypt.btoa ? function(b) {
      return Crypt.btoa(b);
    } : function(b) {
      return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
  var _encode = buffer ? function(u) {
      return (new buffer(u)).toString('base64')
    } : function(u) {
      return btoa(utob(u))
    };
  /**
   * base64加密
   * @method Util.cUtilCryptBase64.encode
   * @param {string} encodeStr 加密字符串
   * @param {boolen} urisafe uri是否转义，默认为false
   */
  var encode = function(u, urisafe) {
    return !urisafe ? _encode(u) : _encode(u).replace(/[+\/]/g, function(m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
  };
  var encodeURI = function(u) {
    return encode(u, true)
  };
  // decoder stuff
  var re_btou = new RegExp([
    '[\xC0-\xDF][\x80-\xBF]',
    '[\xE0-\xEF][\x80-\xBF]{2}',
    '[\xF0-\xF7][\x80-\xBF]{3}'
  ].join('|'), 'g');
  var cb_btou = function(cccc) {
    switch (cccc.length) {
      case 4:
        var cp = ((0x07 & cccc.charCodeAt(0)) << 18) | ((0x3f & cccc.charCodeAt(1)) << 12) | ((0x3f & cccc.charCodeAt(2)) << 6) | (0x3f & cccc.charCodeAt(3)),
          offset = cp - 0x10000;
        return (fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00));
      case 3:
        return fromCharCode(
          ((0x0f & cccc.charCodeAt(0)) << 12) | ((0x3f & cccc.charCodeAt(1)) << 6) | (0x3f & cccc.charCodeAt(2))
        );
      default:
        return fromCharCode(
          ((0x1f & cccc.charCodeAt(0)) << 6) | (0x3f & cccc.charCodeAt(1))
        );
    }
  };
  var btou = function(b) {
    return b.replace(re_btou, cb_btou);
  };
  var cb_decode = function(cccc) {
    var len = cccc.length,
      padlen = len % 4,
      n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
      chars = [
        fromCharCode(n >>> 16),
        fromCharCode((n >>> 8) & 0xff),
        fromCharCode(n & 0xff)
      ];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
  };
  var atob = Crypt.atob ? function(a) {
      return Crypt.atob(a);
    } : function(a) {
      return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
  var _decode = buffer ? function(a) {
      return (new buffer(a, 'base64')).toString()
    } : function(a) {
      return btou(atob(a))
    };

  /**
   * base64解密
   * @method Util.cUtilCryptBase64.decode
   * @param  {String} decodeStr 解密字符串
   * @return {String}  解密后结果
   */
  var decode = function(a) {
    return _decode(
      a.replace(/[-_]/g, function(m0) {
        return m0 == '-' ? '+' : '/'
      })
      .replace(/[^A-Za-z0-9\+\/]/g, '')
    );
  };
  var noConflict = function() {
    var Base64 = Crypt.Base64;
    Crypt.Base64 = _Base64;
    return Base64;
  };
  // export Base64
  Crypt.Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode,
    noConflict: noConflict
  };
  // if ES5 is available, make Base64.extendString() available
  if (typeof Object.defineProperty === 'function') {
    var noEnum = function(v) {
      return {
        value: v,
        enumerable: false,
        writable: true,
        configurable: true
      };
    };
    Crypt.Base64.extendString = function() {
      Object.defineProperty(
        String.prototype, 'fromBase64', noEnum(function() {
          return decode(this)
        }));
      Object.defineProperty(
        String.prototype, 'toBase64', noEnum(function(urisafe) {
          return encode(this, urisafe)
        }));
      Object.defineProperty(
        String.prototype, 'toBase64URI', noEnum(function() {
          return encode(this, true)
        }));
    };
  }

  return Crypt;

});
// BigInt, a suite of routines for performing multiple-precision arithmetic in
// JavaScript.
//
// Copyright 1998-2005 David Shapiro.
//
// You may use, re-use, abuse,
// copy, and modify this code to your liking, but please keep this header.
// Thanks!
//
// Dave Shapiro
// dave@ohdave.com

// IMPORTANT THING: Be sure to set maxDigits according to your precision
// needs. Use the setMaxDigits() function to do this. See comments below.
//
// Tweaked by Ian Bunning
// Alterations:
// Fix bug in function biFromHex(s) to allow
// parsing of strings of length != 0 (mod 4)

// Changes made by Dave Shapiro as of 12/30/2004:
//
// The BigInt() constructor doesn't take a string anymore. If you want to
// create a BigInt from a string, use biFromDecimal() for base-10
// representations, biFromHex() for base-16 representations, or
// biFromString() for base-2-to-36 representations.
//
// biFromArray() has been removed. Use biCopy() instead, passing a BigInt
// instead of an array.
//
// The BigInt() constructor now only constructs a zeroed-out array.
// Alternatively, if you pass <true>, it won't construct any array. See the
// biCopy() method for an example of this.
//
// Be sure to set maxDigits depending on your precision needs. The default
// zeroed-out array ZERO_ARRAY is constructed inside the setMaxDigits()
// function. So use this function to set the variable. DON'T JUST SET THE
// VALUE. USE THE FUNCTION.
//
// ZERO_ARRAY exists to hopefully speed up construction of BigInts(). By
// precalculating the zero array, we can just use slice(0) to make copies of
// it. Presumably this calls faster native code, as opposed to setting the
// elements one at a time. I have not done any timing tests to verify this
// claim.

// Max number = 10^16 - 2 = 9999999999999998;
//               2^53     = 9007199254740992;
// add

/**
 * @File c.util.rsa.js
 * @Description: RSA加密模块
 * @author shbzhang@ctrip.com
 * @date 2014-09-26 16:21:29
 * @version V1.0
 */

/**
 * RSA加密模块
 * @namespace Util.cUtilCryptRSA
 */
define('cUtilCryptRSA',[], function () {
  var biRadixBase = 2;
  var biRadixBits = 16;
  var bitsPerDigit = biRadixBits;
  var biRadix = 1 << 16; // = 2^16 = 65536
  var biHalfRadix = biRadix >>> 1;
  var biRadixSquared = biRadix * biRadix;
  var maxDigitVal = biRadix - 1;
  var maxInteger = 9999999999999998;

  // maxDigits:
  // Change this to accommodate your largest number size. Use setMaxDigits()
  // to change it!
  //
  // In general, if you're working with numbers of size N bits, you'll need 2*N
  // bits of storage. Each digit holds 16 bits. So, a 1024-bit key will need
  //
  // 1024 * 2 / 16 = 128 digits of storage.
  //

  var maxDigits;
  var ZERO_ARRAY;
  var bigZero, bigOne;

  function setMaxDigits(value) {
    maxDigits = value;
    ZERO_ARRAY = new Array(maxDigits);
    for (var iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0;
    bigZero = new BigInt();
    bigOne = new BigInt();
    bigOne.digits[0] = 1;
  }

  setMaxDigits(20);

  // The maximum number of digits in base 10 you can convert to an
  // integer without JavaScript throwing up on you.
  var dpl10 = 15;
  // lr10 = 10 ^ dpl10
  var lr10 = biFromNumber(1000000000000000);

  function BigInt(flag) {
    if (typeof flag == "boolean" && flag == true) {
      this.digits = null;
    }
    else {
      this.digits = ZERO_ARRAY.slice(0);
    }
    this.isNeg = false;
  }

  function biFromDecimal(s) {
    var isNeg = s.charAt(0) == '-';
    var i = isNeg ? 1 : 0;
    var result;
    // Skip leading zeros.
    while (i < s.length && s.charAt(i) == '0') ++i;
    if (i == s.length) {
      result = new BigInt();
    }
    else {
      var digitCount = s.length - i;
      var fgl = digitCount % dpl10;
      if (fgl == 0) fgl = dpl10;
      result = biFromNumber(Number(s.substr(i, fgl)));
      i += fgl;
      while (i < s.length) {
        result = biAdd(biMultiply(result, lr10),
          biFromNumber(Number(s.substr(i, dpl10))));
        i += dpl10;
      }
      result.isNeg = isNeg;
    }
    return result;
  }

  function biCopy(bi) {
    var result = new BigInt(true);
    result.digits = bi.digits.slice(0);
    result.isNeg = bi.isNeg;
    return result;
  }

  function biFromNumber(i) {
    var result = new BigInt();
    result.isNeg = i < 0;
    i = Math.abs(i);
    var j = 0;
    while (i > 0) {
      result.digits[j++] = i & maxDigitVal;
      i = Math.floor(i / biRadix);
    }
    return result;
  }

  function reverseStr(s) {
    var result = "";
    for (var i = s.length - 1; i > -1; --i) {
      result += s.charAt(i);
    }
    return result;
  }

  var hexatrigesimalToChar = new Array(
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  );

  function biToString(x, radix)
    // 2 <= radix <= 36
  {
    var b = new BigInt();
    b.digits[0] = radix;
    var qr = biDivideModulo(x, b);
    var result = hexatrigesimalToChar[qr[1].digits[0]];
    while (biCompare(qr[0], bigZero) == 1) {
      qr = biDivideModulo(qr[0], b);
      digit = qr[1].digits[0];
      result += hexatrigesimalToChar[qr[1].digits[0]];
    }
    return (x.isNeg ? "-" : "") + reverseStr(result);
  }

  function biToDecimal(x) {
    var b = new BigInt();
    b.digits[0] = 10;
    var qr = biDivideModulo(x, b);
    var result = String(qr[1].digits[0]);
    while (biCompare(qr[0], bigZero) == 1) {
      qr = biDivideModulo(qr[0], b);
      result += String(qr[1].digits[0]);
    }
    return (x.isNeg ? "-" : "") + reverseStr(result);
  }

  var hexToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f');

  function digitToHex(n) {
    var mask = 0xf;
    var result = "";
    for (i = 0; i < 4; ++i) {
      result += hexToChar[n & mask];
      n >>>= 4;
    }
    return reverseStr(result);
  }

  function biToHex(x) {
    var result = "";
    var n = biHighIndex(x);
    for (var i = biHighIndex(x); i > -1; --i) {
      result += digitToHex(x.digits[i]);
    }
    return result;
  }

  function charToHex(c) {
    var ZERO = 48;
    var NINE = ZERO + 9;
    var littleA = 97;
    var littleZ = littleA + 25;
    var bigA = 65;
    var bigZ = 65 + 25;
    var result;

    if (c >= ZERO && c <= NINE) {
      result = c - ZERO;
    } else if (c >= bigA && c <= bigZ) {
      result = 10 + c - bigA;
    } else if (c >= littleA && c <= littleZ) {
      result = 10 + c - littleA;
    } else {
      result = 0;
    }
    return result;
  }

  function hexToDigit(s) {
    var result = 0;
    var sl = Math.min(s.length, 4);
    for (var i = 0; i < sl; ++i) {
      result <<= 4;
      result |= charToHex(s.charCodeAt(i))
    }
    return result;
  }

  function biFromHex(s) {
    var result = new BigInt();
    var sl = s.length;
    for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
      result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
    }
    return result;
  }

  function biFromString(s, radix) {
    var isNeg = s.charAt(0) == '-';
    var istop = isNeg ? 1 : 0;
    var result = new BigInt();
    var place = new BigInt();
    place.digits[0] = 1; // radix^0
    for (var i = s.length - 1; i >= istop; i--) {
      var c = s.charCodeAt(i);
      var digit = charToHex(c);
      var biDigit = biMultiplyDigit(place, digit);
      result = biAdd(result, biDigit);
      place = biMultiplyDigit(place, radix);
    }
    result.isNeg = isNeg;
    return result;
  }

  function biDump(b) {
    return (b.isNeg ? "-" : "") + b.digits.join(" ");
  }

  function biAdd(x, y) {
    var result;

    if (x.isNeg != y.isNeg) {
      y.isNeg = !y.isNeg;
      result = biSubtract(x, y);
      y.isNeg = !y.isNeg;
    }
    else {
      result = new BigInt();
      var c = 0;
      var n;
      for (var i = 0; i < x.digits.length; ++i) {
        n = x.digits[i] + y.digits[i] + c;
        result.digits[i] = n % biRadix;
        c = Number(n >= biRadix);
      }
      result.isNeg = x.isNeg;
    }
    return result;
  }

  function biSubtract(x, y) {
    var result;
    if (x.isNeg != y.isNeg) {
      y.isNeg = !y.isNeg;
      result = biAdd(x, y);
      y.isNeg = !y.isNeg;
    } else {
      result = new BigInt();
      var n, c;
      c = 0;
      for (var i = 0; i < x.digits.length; ++i) {
        n = x.digits[i] - y.digits[i] + c;
        result.digits[i] = n % biRadix;
        // Stupid non-conforming modulus operation.
        if (result.digits[i] < 0) result.digits[i] += biRadix;
        c = 0 - Number(n < 0);
      }
      // Fix up the negative sign, if any.
      if (c == -1) {
        c = 0;
        for (var i = 0; i < x.digits.length; ++i) {
          n = 0 - result.digits[i] + c;
          result.digits[i] = n % biRadix;
          // Stupid non-conforming modulus operation.
          if (result.digits[i] < 0) result.digits[i] += biRadix;
          c = 0 - Number(n < 0);
        }
        // Result is opposite sign of arguments.
        result.isNeg = !x.isNeg;
      } else {
        // Result is same sign.
        result.isNeg = x.isNeg;
      }
    }
    return result;
  }

  function biHighIndex(x) {
    var result = x.digits.length - 1;
    while (result > 0 && x.digits[result] == 0) --result;
    return result;
  }

  function biNumBits(x) {
    var n = biHighIndex(x);
    var d = x.digits[n];
    var m = (n + 1) * bitsPerDigit;
    var result;
    for (result = m; result > m - bitsPerDigit; --result) {
      if ((d & 0x8000) != 0) break;
      d <<= 1;
    }
    return result;
  }

  function biMultiply(x, y) {
    var result = new BigInt();
    var c;
    var n = biHighIndex(x);
    var t = biHighIndex(y);
    var u, uv, k;

    for (var i = 0; i <= t; ++i) {
      c = 0;
      k = i;
      for (j = 0; j <= n; ++j, ++k) {
        uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
        result.digits[k] = uv & maxDigitVal;
        c = uv >>> biRadixBits;
        //c = Math.floor(uv / biRadix);
      }
      result.digits[i + n + 1] = c;
    }
    // Someone give me a logical xor, please.
    result.isNeg = x.isNeg != y.isNeg;
    return result;
  }

  function biMultiplyDigit(x, y) {
    var n, c, uv;

    result = new BigInt();
    n = biHighIndex(x);
    c = 0;
    for (var j = 0; j <= n; ++j) {
      uv = result.digits[j] + x.digits[j] * y + c;
      result.digits[j] = uv & maxDigitVal;
      c = uv >>> biRadixBits;
      //c = Math.floor(uv / biRadix);
    }
    result.digits[1 + n] = c;
    return result;
  }

  function arrayCopy(src, srcStart, dest, destStart, n) {
    var m = Math.min(srcStart + n, src.length);
    for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
      dest[j] = src[i];
    }
  }

  var highBitMasks = new Array(0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800,
    0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0,
    0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF);

  function biShiftLeft(x, n) {
    var digitCount = Math.floor(n / bitsPerDigit);
    var result = new BigInt();
    arrayCopy(x.digits, 0, result.digits, digitCount,
        result.digits.length - digitCount);
    var bits = n % bitsPerDigit;
    var rightBits = bitsPerDigit - bits;
    for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
      result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) |
        ((result.digits[i1] & highBitMasks[bits]) >>>
          (rightBits));
    }
    result.digits[0] = ((result.digits[i] << bits) & maxDigitVal);
    result.isNeg = x.isNeg;
    return result;
  }

  var lowBitMasks = new Array(0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
    0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
    0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF);

  function biShiftRight(x, n) {
    var digitCount = Math.floor(n / bitsPerDigit);
    var result = new BigInt();
    arrayCopy(x.digits, digitCount, result.digits, 0,
        x.digits.length - digitCount);
    var bits = n % bitsPerDigit;
    var leftBits = bitsPerDigit - bits;
    for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
      result.digits[i] = (result.digits[i] >>> bits) |
        ((result.digits[i1] & lowBitMasks[bits]) << leftBits);
    }
    result.digits[result.digits.length - 1] >>>= bits;
    result.isNeg = x.isNeg;
    return result;
  }

  function biMultiplyByRadixPower(x, n) {
    var result = new BigInt();
    arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
    return result;
  }

  function biDivideByRadixPower(x, n) {
    var result = new BigInt();
    arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
    return result;
  }

  function biModuloByRadixPower(x, n) {
    var result = new BigInt();
    arrayCopy(x.digits, 0, result.digits, 0, n);
    return result;
  }

  function biCompare(x, y) {
    if (x.isNeg != y.isNeg) {
      return 1 - 2 * Number(x.isNeg);
    }
    for (var i = x.digits.length - 1; i >= 0; --i) {
      if (x.digits[i] != y.digits[i]) {
        if (x.isNeg) {
          return 1 - 2 * Number(x.digits[i] > y.digits[i]);
        } else {
          return 1 - 2 * Number(x.digits[i] < y.digits[i]);
        }
      }
    }
    return 0;
  }

  function biDivideModulo(x, y) {
    var nb = biNumBits(x);
    var tb = biNumBits(y);
    var origYIsNeg = y.isNeg;
    var q, r;
    if (nb < tb) {
      // |x| < |y|
      if (x.isNeg) {
        q = biCopy(bigOne);
        q.isNeg = !y.isNeg;
        x.isNeg = false;
        y.isNeg = false;
        r = biSubtract(y, x);
        // Restore signs, 'cause they're references.
        x.isNeg = true;
        y.isNeg = origYIsNeg;
      } else {
        q = new BigInt();
        r = biCopy(x);
      }
      return new Array(q, r);
    }

    q = new BigInt();
    r = x;

    // Normalize Y.
    var t = Math.ceil(tb / bitsPerDigit) - 1;
    var lambda = 0;
    while (y.digits[t] < biHalfRadix) {
      y = biShiftLeft(y, 1);
      ++lambda;
      ++tb;
      t = Math.ceil(tb / bitsPerDigit) - 1;
    }
    // Shift r over to keep the quotient constant. We'll shift the
    // remainder back at the end.
    r = biShiftLeft(r, lambda);
    nb += lambda; // Update the bit count for x.
    var n = Math.ceil(nb / bitsPerDigit) - 1;

    var b = biMultiplyByRadixPower(y, n - t);
    while (biCompare(r, b) != -1) {
      ++q.digits[n - t];
      r = biSubtract(r, b);
    }
    for (var i = n; i > t; --i) {
      var ri = (i >= r.digits.length) ? 0 : r.digits[i];
      var ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1];
      var ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2];
      var yt = (t >= y.digits.length) ? 0 : y.digits[t];
      var yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1];
      if (ri == yt) {
        q.digits[i - t - 1] = maxDigitVal;
      } else {
        q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
      }

      var c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1);
      var c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2);
      while (c1 > c2) {
        --q.digits[i - t - 1];
        c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1);
        c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2);
      }

      b = biMultiplyByRadixPower(y, i - t - 1);
      r = biSubtract(r, biMultiplyDigit(b, q.digits[i - t - 1]));
      if (r.isNeg) {
        r = biAdd(r, b);
        --q.digits[i - t - 1];
      }
    }
    r = biShiftRight(r, lambda);
    // Fiddle with the signs and stuff to make sure that 0 <= r < y.
    q.isNeg = x.isNeg != origYIsNeg;
    if (x.isNeg) {
      if (origYIsNeg) {
        q = biAdd(q, bigOne);
      } else {
        q = biSubtract(q, bigOne);
      }
      y = biShiftRight(y, lambda);
      r = biSubtract(y, r);
    }
    // Check for the unbelievably stupid degenerate case of r == -0.
    if (r.digits[0] == 0 && biHighIndex(r) == 0) r.isNeg = false;

    return new Array(q, r);
  }

  function biDivide(x, y) {
    return biDivideModulo(x, y)[0];
  }

  function biModulo(x, y) {
    return biDivideModulo(x, y)[1];
  }

  function biMultiplyMod(x, y, m) {
    return biModulo(biMultiply(x, y), m);
  }

  function biPow(x, y) {
    var result = bigOne;
    var a = x;
    while (true) {
      if ((y & 1) != 0) result = biMultiply(result, a);
      y >>= 1;
      if (y == 0) break;
      a = biMultiply(a, a);
    }
    return result;
  }

  function biPowMod(x, y, m) {
    var result = bigOne;
    var a = x;
    var k = y;
    while (true) {
      if ((k.digits[0] & 1) != 0) result = biMultiplyMod(result, a, m);
      k = biShiftRight(k, 1);
      if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
      a = biMultiplyMod(a, a, m);
    }
    return result;
  }

  // BarrettMu, a class for performing Barrett modular reduction computations in
  // JavaScript.
  //
  // Requires BigInt.js.
  //
  // Copyright 2004-2005 David Shapiro.
  //
  // You may use, re-use, abuse, copy, and modify this code to your liking, but
  // please keep this header.
  //
  // Thanks!
  //
  // Dave Shapiro
  // dave@ohdave.com

  function BarrettMu(m) {
    this.modulus = biCopy(m);
    this.k = biHighIndex(this.modulus) + 1;
    var b2k = new BigInt();
    b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
    this.mu = biDivide(b2k, this.modulus);
    this.bkplus1 = new BigInt();
    this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod;
  }

  function BarrettMu_modulo(x) {
    var q1 = biDivideByRadixPower(x, this.k - 1);
    var q2 = biMultiply(q1, this.mu);
    var q3 = biDivideByRadixPower(q2, this.k + 1);
    var r1 = biModuloByRadixPower(x, this.k + 1);
    var r2term = biMultiply(q3, this.modulus);
    var r2 = biModuloByRadixPower(r2term, this.k + 1);
    var r = biSubtract(r1, r2);
    if (r.isNeg) {
      r = biAdd(r, this.bkplus1);
    }
    var rgtem = biCompare(r, this.modulus) >= 0;
    while (rgtem) {
      r = biSubtract(r, this.modulus);
      rgtem = biCompare(r, this.modulus) >= 0;
    }
    return r;
  }

  function BarrettMu_multiplyMod(x, y) {
    /*
     x = this.modulo(x);
     y = this.modulo(y);
     */
    var xy = biMultiply(x, y);
    return this.modulo(xy);
  }

  function BarrettMu_powMod(x, y) {
    var result = new BigInt();
    result.digits[0] = 1;
    var a = x;
    var k = y;
    while (true) {
      if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
      k = biShiftRight(k, 1);
      if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
      a = this.multiplyMod(a, a);
    }
    return result;
  }

  // RSA, a suite of routines for performing RSA public-key computations in
  // JavaScript.
  //
  // Requires BigInt.js and Barrett.js.
  //
  // Copyright 1998-2005 David Shapiro.
  //
  // You may use, re-use, abuse, copy, and modify this code to your liking, but
  // please keep this header.
  //
  // Thanks!
  //
  // Dave Shapiro
  // dave@ohdave.com

  function RSAKeyPair(encryptionExponent, decryptionExponent, modulus) {
    this.e = biFromHex(encryptionExponent);
    this.d = biFromHex(decryptionExponent);
    this.m = biFromHex(modulus);

    // We can do two bytes per digit, so
    // chunkSize = 2 * (number of digits in modulus - 1).
    // Since biHighIndex returns the high index, not the number of digits, 1 has
    // already been subtracted.
    //this.chunkSize = 2 * biHighIndex(this.m);

    ////////////////////////////////// TYF
    this.digitSize = 2 * biHighIndex(this.m) + 2;
    this.chunkSize = this.digitSize - 11; // maximum, anything lower is fine
    ////////////////////////////////// TYF

    this.radix = 16;
    this.barrett = new BarrettMu(this.m);
  }

  function twoDigit(n) {
    return (n < 10 ? "0" : "") + String(n);
  }

  function encryptedString(key, s)
    // Altered by Rob Saunders (rob@robsaunders.net). New routine pads the
    // string after it has been converted to an array. This fixes an
    // incompatibility with Flash MX's ActionScript.
    // Altered by Tang Yu Feng for interoperability with Microsoft's
    // RSACryptoServiceProvider implementation.
  {
    ////////////////////////////////// TYF
    if (key.chunkSize > key.digitSize - 11) {
      return "Error";
    }
    ////////////////////////////////// TYF


    var a = new Array();
    var sl = s.length;

    var i = 0;
    while (i < sl) {
      a[i] = s.charCodeAt(i);
      i++;
    }

    //while (a.length % key.chunkSize != 0) {
    //	a[i++] = 0;
    //}

    var al = a.length;
    var result = "";
    var j, k, block;
    for (i = 0; i < al; i += key.chunkSize) {
      block = new BigInt();
      j = 0;

      //for (k = i; k < i + key.chunkSize; ++j) {
      //	block.digits[j] = a[k++];
      //	block.digits[j] += a[k++] << 8;
      //}

      ////////////////////////////////// TYF
      // Add PKCS#1 v1.5 padding
      // 0x00 || 0x02 || PseudoRandomNonZeroBytes || 0x00 || Message
      // Variable a before padding must be of at most digitSize-11
      // That is for 3 marker bytes plus at least 8 random non-zero bytes
      var x;
      var msgLength = (i + key.chunkSize) > al ? al % key.chunkSize : key.chunkSize;

      // Variable b with 0x00 || 0x02 at the highest index.
      var b = new Array();
      for (x = 0; x < msgLength; x++) {
        b[x] = a[i + msgLength - 1 - x];
      }
      b[msgLength] = 0; // marker
      var paddedSize = Math.max(8, key.digitSize - 3 - msgLength);

      for (x = 0; x < paddedSize; x++) {
        b[msgLength + 1 + x] = Math.floor(Math.random() * 254) + 1; // [1,255]
      }
      // It can be asserted that msgLength+paddedSize == key.digitSize-3
      b[key.digitSize - 2] = 2; // marker
      b[key.digitSize - 1] = 0; // marker

      for (k = 0; k < key.digitSize; ++j) {
        block.digits[j] = b[k++];
        block.digits[j] += b[k++] << 8;
      }
      ////////////////////////////////// TYF

      var crypt = key.barrett.powMod(block, key.e);
      var text = key.radix == 16 ? biToHex(crypt) : biToString(crypt, key.radix);
      result += text + " ";
    }
    return result.substring(0, result.length - 1); // Remove last space.
  }

  function decryptedString(key, s) {
    var blocks = s.split(" ");
    var result = "";
    var i, j, block;
    for (i = 0; i < blocks.length; ++i) {
      var bi;
      if (key.radix == 16) {
        bi = biFromHex(blocks[i]);
      }
      else {
        bi = biFromString(blocks[i], key.radix);
      }
      block = key.barrett.powMod(bi, key.d);
      for (j = 0; j <= biHighIndex(block); ++j) {
        result += String.fromCharCode(block.digits[j] & 255,
            block.digits[j] >> 8);
      }
    }
    // Remove trailing null, if any.
    if (result.charCodeAt(result.length - 1) == 0) {
      result = result.substring(0, result.length - 1);
    }
    return result;
  }


  function base64encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
  }

  //rsa 1024
  setMaxDigits(131);
  var rsaKey = new RSAKeyPair("10001", "", "B7273B08845EB1D93C9A6EB9C45BE087AF9E692C8B7DD6D38DECFA732E9A6CDCB52106BDDB9E13100AEF3638358D5B5EB9011C33B7AC3F697078C0572585B94119196F627025C6E7FA9AA5C82B149E2BB30FEA7D777AA453324A301FD46413E11A7DB4A9D5B2D4BD6330AE2C477D48250F057ABEF2BD76DC7574897254736A71");


  /**
   * RSA加密
   * @method Util.cUtilCryptRSA.encode
   * @param {string} inputStr 输入字符串
   * @returns {string} outString 输出字符串
   */
  function encode(str) {
    var result = encryptedString(rsaKey, base64encode(str));
    return result;
  };

  /**
   * RSA加密
   * @deprecated 建议使用encode
   * @method Util.cUtilCryptRSA.rsaEncrypted
   * @param {string} inputStr 输入字符串
   * @returns {string} outString 输出字符串
   */
  var rsaEncrypted = encode;

  return {
    rsaEncrypted: rsaEncrypted,
    encode:encode
  };

});
/**
 * @File c.session.storage.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @description SessionStorage 存储类
 */
/**
 * 封装SessionStore存储类,继承自cAbstractStorage
 * @namespace Storage.cSessionStorage
 * @extends Storage.cAbstractStorage
 */
define('cSessionStorage',['cCoreInherit', 'cAbstractStorage'], function (cCoreInherit, cAbstractStorage) {

  var Storage = new cCoreInherit.Class(cAbstractStorage, {
    __propertys__: function () {

    },

    /**
     * @method Storage.cSessionStorage.initialize
     * @param {Object} $super
     * @param {Object} options
     * @description 复写自顶层继承自cAbstractStorage的initialize，赋值队列
     */
    initialize: function ($super, opts) {
      this.proxy = window.sessionStorage;
      $super(opts);
    }
  });


  Storage.getInstance = function () {
    if (this.instance) {
      return this.instance;
    } else {
      return this.instance = new this();
    }
  };

  Storage.sessionStorage = Storage.getInstance();
  return Storage;
});
/**
 * @File c.session.store.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @description 以SessionStorage为数据存储的Store
 */
/**
 * 以SessionStorage为数据存储的Store
 * @namespace Store.cSessionStore
 * @augments Store.cAbstractStore
 * @example
 *  define(['cCoreInherit','cSessionStore'], function (cCoreInherit,cSessionStore ) {
 *    var StoreCase = new cCoreInherit.Class(cSessionStore, {
 *      __propertys__: function () {
 *        this.key = 'STORAGE_EXAMPLE', //设置key值
 *        this.lifeTime = '2D',          //浏览器不关闭情况下,超时时间两天
 *        this.defaultData = {
 *          name : ""
 *        }
 *      },
 *      initialize:    function ($super, options) {
 *        $super(options);
 *      }
 *    });
 *
 *    return  StoreCase;
 *  });
 *
 * var demoStore = StoreCase.getInstance();
 * var data = {'name':'擎天柱'}
 * demoStore.set(data);
 */
define('cSessionStore',['cCoreInherit','cAbstractStore','cSessionStorage'], function (cCoreInherit,cAbstractStore,cSessionStorage) {

  var sessionStore = new cCoreInherit.Class(cAbstractStore,{
    __propertys__: function () {
	    /*
	     *store的数据存储对象
	     * @type {*|e.UnionStore.getInstance|e.SalesStore.getInstance|Object|c.common.store.UnionStore.getInstance|c.common.store.SalesStore.getInstance}
	     */
      this.sProxy = cSessionStorage.getInstance();
    },
	  /**
	   * @method cSessionStore.initialize
	   * @param $super
	   * @param options
	   * @description 复写自顶层Class的initialize，赋值队列
	   */
    initialize: function ($super, options) {
      $super(options);
    }
  });

  return sessionStore;
});
/**
 * @File c.local.storage.js
 * @author zsb张淑滨 <shbzhang@Ctrip.com>
 * @description LocalStorage 存储类
 */
/**
 * 内存对象模拟LocalStorage储类,继承自cAbstractStorage
 * @namespace Storage.cMemoryStorage
 * @extends Storage.cAbstractStorage
 */
define('cMemoryStorage',['cCoreInherit', 'cUtilDate', 'cAbstractStorage'], function (cCoreInherit, cDate, cAbstractStorage) {
  var MemoryStorage = {
    dataMap : {},
    setItem : function(key,val){
      this.dataMap[key] = val
    },
    getItem: function(key){
      return this.dataMap[key];
    },
    removeItem :function(key){
      delete this.dataMap[key]
    },
    clear :function(){
      this.dataMap = {}
    }
  }


  var Storage = new cCoreInherit.Class(cAbstractStorage, {
    __propertys__: function () {

    },

    /**
     * @method Storage.cMemoryStorage.initialize
     * @param {Object} $super
     * @param {Object} options
     * @description 复写自顶层继承自cAbstractStorage的initialize，赋值队列
     */
    initialize: function ($super, opts) {
      this.proxy = MemoryStorage;
      $super(opts);
    }
  });

  Storage.getInstance = function () {
    if (this.instance) {
      return this.instance;
    } else {
      return this.instance = new this();
    }
  };

  return Storage;

});
/**
 * @File c.memory.store.js
 * @author zsb张淑滨 <oxz@ctrip.com|shbzhang@ctrip.com>
 * @description 将数据放到内存中，根据useLocalStore属性判断是否放到本地
 */
/**
 * 将数据放到内存中，根据useLocalStore属性判断是否放到本地
 * @namespace Store.cMemoryStore
 */
define('cMemoryStore',['cCoreInherit','cAbstractStore','cMemoryStorage'], function(cCoreInherit,cAbstractStore,cMemoryStorage){
  
  var MemStore = new cCoreInherit.Class(cAbstractStore,{
    __propertys__: function () {

	    /**
	     * 内存区数据
	     * @var {*|Object} Store.cMemoryStore.data
	     */
      this.data = null;

      this.key = "memory_store";

      this.sProxy = cMemoryStorage.getInstance();
    },

		/**
		 * @method Store.cMemoryStore.initialize
		 * @param {Object} options
		 * @description 复写自顶层Class的initialize，赋值队列
		 */
    initialize: function ($super,options) {
      $super(options);
    }

  });


  return MemStore;
});
/**
 * @File c.abstract.model
 * @Description: Model抽象类，封装ajax访问
 * @author ouxingzhi@vip.qq.com l_wang@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
/**
 * Model抽象类，封装ajax访问
 * @namespace Model.cAbstractModel
 */
define('cAbstractModel',['libs', 'cCoreInherit', 'cAjax', 'cUtilCommon', 'cUtilPath'], function (libs, cCoreInherit, cAjax, cUtilCommon, pathUtil) {

  var AbstractModel = new cCoreInherit.Class({

    __propertys__: function () {

      /**
       * 数据请求url, 必填
       * @var {string} Model.cAbstractModel.url 请求url
       */
      this.url = null;

      /**
       * 请求参数,必选,
       * @var {Object|Store} Model.cAbstractModel.param 请求参数
       */
      this.param = null;

      /**
       * 数据返回时的自定义格式化函数
       * @var {Function} [Model.cAbstractModel.dataformat] 数据返回时的自定义格式化函数
       */
      this.dataformat = null;

      /**
       * 验证返回结果正确性的函数集合
       * @var {Function} [Model.cAbstractModel.validates] 可选，存放用于验证的函数集合
       */
      this.validates = [];


      /**
       * 通讯协议,http/https
       * @var {String} [cAbstractModel.protocol=http] 可覆盖，通讯协议,http/https
       */
      this.protocol = (window.location.protocol.indexOf("https") > -1) ? "https" : "http";


      /**
       * 提交数据格式 json/form/jsonp
       * @var {String} [Model.cAbstractModel.contentType=json] 可选，提交数据格式
       */
      this.contentType = AbstractModel.CONTENT_TYPE_JSON;
      /**
       * 数据提交方式,post/get
       * @var {String} [Model.cAbstractModel.method] 可选， 提交数据的方法,post/get
       */
      this.method = 'POST';

      /**
       * 是否强制Ajax获取,
       * @var {boolean}  [Model.cAbstractModel.ajaxOnly=false] 是否强制Ajax获取
       */
      this.ajaxOnly = false;

      /**
       * 超时时间
       * @var {number} [Model.cAbstractModel.timeout=3000] 超时时间
       */
      this.timeout = 30000;

      //当前的ajax对象
      this.ajax;
      //是否主动取消当前ajax
      this.isAbort = false;

      //参数设置函数
      this.onBeforeCompleteCallback = null;
    },

    /**
     * @method initialize
     * @param {Object} obj
     * @description 复写自顶层Class的initialize，赋值队列
     */
    initialize: function (options) {
      this.assert();
      for (var key in options) {
        this[key] = options[key];
      }
    },


    assert: function () {
//      if (this.url === null) {
//        throw 'not override url property';
//      }
//      if (this.param === null) {
//        throw 'not override param property';
//      }
    },

    /**
     * 设置model属性值
     * @method Model.cAbstractModel.setAttr
     * @param {string} key 属性名，如url,protocol
     * @param {object} val 属性值
     */
    setAttr:function(key,val){
      this[key] = val;
    },

    /**
     * @method pushValidates
     * @param {function} handler
     * @description  将返回数据毁掉函数放到队列中
     */
    pushValidates: function (handler) {
      if (typeof handler === 'function') {
        this.validates.push($.proxy(handler, this));
      }
    },
    /**
     * 设置提交参数的值，如只传key一个参数，则置
     * @method Model.cAbstractModel.setParam
     * @param {string|object} key 参数
     * @param {object} val 参数值
     */
    setParam: function (key, val) {
      if (typeof key === 'object' && !val) {
        this.param = key;
      } else {
        this.param[key] = val;
      }
    },
    /**
     * 获取model的查询参数
     * @method Model.cAbstractModel.getParam
     * @returns {json|Store} param  查询参数
     */
    getParam: function () {
      return this.param;
    },

    /**
     *  获得查询结果结果
     *  @method Model.cAbstractModel.getResult
     *  @returns {json|Store} result  查询结果
     */
    getResult: function () {
      return this.result;
    },
    /**
     *  获得查询结果结果，建议使用Model.cAbstractModel.getResult
     *  @deprecated 建议使用Model.cAbstractModel.getResult
     *  @method Model.cAbstractModel.getResultStore
     *  @returns {json|Store} result  查询结果
     */
    getResultStore: function () {
      return this.getResult();
    },
    /**
     * 构建url请求地址，子类可复写，返回优先级为model.url是一个完整的url结构 -> Lizard.restfullApi|restfullApiHttps +model.url
     * -> 默认值m.ctrip.com/restapi/soa2+model.url
     * @method Model.cAbstractModel.buildurl
     */
    buildurl: function () {
      if (cUtilCommon.isUrl(this.url)) {
        return this.url;
      }
      var domain = 'm.ctrip.com/restapi/soa2',restfulApi = "";

      if( this.protocol == "http" && Lizard.restfullApi){
        restfulApi = Lizard.restfullApi;
      }else if(this.protocol == "https" && Lizard.restfullApiHttps){
        restfulApi = Lizard.restfullApiHttps;
      }

      if (restfulApi && cUtilCommon.isUrl(restfulApi)) {
        domain = pathUtil.parseUrl(restfulApi).hostname;
      }

      return this.protocol + '://' + domain + '/restapi' +  this.url;
    },


    /*
     * 发送数据请求数据
     * @method Model.cAbstractModel.execute
     * @param {Function} onComplete 取完的回调函数
     * @param {Function} onError 发生错误时的回调
     * @param {Boolean} [ajaxOnly] 可选，默认为false当为true时只使用ajax调取数据
     * @param {Boolean} [scope] 可选，设定回调函数this指向的对象
     * @param {Function} [onAbort] 可选，取消时会调用的函数
     */
    _execute: function (onComplete, onError, scope, onAbort, params) {

      // @description 定义是否需要退出ajax请求
      this.isAbort = false;

      // @description 请求数据的地址
      var url = this.buildurl();

      var self = this;

      var __onComplete = $.proxy(function (data) {
        //保存服务请求日志
        // cLog.serverLog(self.buildurl(), self.getParam(), data);

        if (this.validates && this.validates.length > 0) {

          // @description 开发者可以传入一组验证方法进行验证
          for (var i = 0, len = this.validates.length; i < len; i++) {
            var validates = this.validates[i](data);
            if ((typeof validates === 'boolean')) {
              if (!validates) {

                // @description 如果一个验证不通过就返回
                if (typeof onError === 'function') {
                  return onError.call(scope || this, data);
                } else {
                  return false;
                }
              }
            } else {
              if (validates && validates.overdue) {
                require([(Lizard.isHybrid || Lizard.isInCtripApp) ? 'cHybridMember' : 'cWebMember'], function (Member) {
                  Member.memberLogin({'param': 'from=' + encodeURIComponent(window.location.href)});
                });
                return;
              }
            }
          }
        }

        // @description 对获取的数据做字段映射
        var datamodel = typeof this.dataformat === 'function' ? this.dataformat(data) : data;

        if (typeof this.onBeforeCompleteCallback === 'function') {
          this.onBeforeCompleteCallback(datamodel);
        }

        if (typeof onComplete === 'function') {
          onComplete.call(scope || this, datamodel, data);
        }

      }, this);

      var __onError = $.proxy(function (e) {
        if (self.isAbort) {
          self.isAbort = false;

          if (typeof onAbort === 'function') {
            return onAbort.call(scope || this, e);
          } else {
            return false;
          }
        }

        if (typeof onError === 'function') {
          onError.call(scope || this, e);
        }

      }, this);

      // @description 从this.param中获得数据，做深copy
      var params = params || _.clone(this.getParam() || {});

      //设置contentType无效BUG，改动一，将contentType保存
      params.contentType = this.contentType;

      if (this.contentType === AbstractModel.CONTENT_TYPE_JSON) {

        // @description 跨域请求
        return this.ajax = cAjax.cros(url, this.method, params, __onComplete, __onError,this.timeout);
      } else if (this.contentType === AbstractModel.CONTENT_TYPE_JSONP) {

        // @description jsonp的跨域请求
        return this.ajax = cAjax.jsonp(url, params, __onComplete, __onError,this.timeout);
      } else {

        // @description 默认post请求
        return this.ajax = cAjax.post(url, params, __onComplete, __onError,this.timeout);
      }
    },

    /**
     * 发送数据请求数据
     * @method Model.cAbstractModel.execute
     * @param {Function} onComplete 取完的回调函数
     * @param {Function} onError 发生错误时的回调
     * @param {Boolean} [ajaxOnly] 可选，默认为false当为true时只使用ajax调取数据
     * @param {Boolean} [scope] 可选，设定回调函数this指向的对象
     * @param {Function} [onAbort] 可选，取消时会调用的函数
     */
    execute: function (onComplete, onError, scope, onAbort, params) {
      this._execute(onComplete, onError, scope, onAbort, params);
    },
    /**
     * 终止请求
     * @method Model.cAbstractModel.abort
     */
    abort: function () {
      this.isAbort = true;
      this.ajax && this.ajax.abort && this.ajax.abort();
    }

  });

  /**
   * Model的单例获取方式
   * @method Model.cAbstractModel.getInstance
   * @returns {*}
   */
  AbstractModel.getInstance = function () {
    if (this.instance instanceof this) {
      return this.instance;
    } else {
      return this.instance = new this;
    }
  };

  /**
   * @const {string} Model.cAbstractModel.CONTENT_TYPE_JSON JSON方式提交请求
   */
  AbstractModel.CONTENT_TYPE_JSON = 'json';
  /**
   * @const {string} Model.cAbstractModel.CONTENT_TYPE_FORM FORM方式提交请求
   */
  AbstractModel.CONTENT_TYPE_FORM = 'form';
  /**
   * @const {string} Model.cAbstractModel.CONTENT_TYPE_JSONP JSONP方式提交请求
   */
  AbstractModel.CONTENT_TYPE_JSONP = 'jsonp';

  return AbstractModel;
});



/**
 * @File c.model
 * @Description: Model类,封装SOA2访问
 * @author ouxingzhi@vip.qq.com l_wang@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
/**
 * Model类,继承自cAbstractModel,封装SOA2访问，和Store缓存
 * @namespace Model.cModel
 * @extends Model.cAbstractModel
 * @example
 * define('cCoreInherit','cMmodel',function(cCoreInherit,cModel)(){
 *   DemoModel = new cCoreInherit.Class(cModel, {
 *       __propertys__: function () {
 *          this.url = '/Taxi/MarketingInfo/Query';
 *      },
 *      initialize: function ($super, options) {
 *          $super(options);
 *      }
 *   });
 *
 *   DemoModel.execute(function(data){
 *    console.log('success handler');
 *   },function(e){
 *    console.log('error handler')
 *   },true);
 * })
 *
 */
define('cModel',['cCoreInherit', 'cAbstractStore', 'cHeadStore','cUserStore','cMarketStore','cAbstractModel', 'cUtilObject'],
  function (cCoreInherit, AbstractStore, cHeadStore, cUserStore,cMarketStore,baseModel, cObject) {

    var Model = new cCoreInherit.Class(baseModel, {
	    /**
	     * @method __propertys__
	     * @description 复写自顶层Class的__propertys__，初始化队列
	     * @private
	     */
      __propertys__: function () {
        /**
         * @var {boolean} [Model.cModel.usehead=true] 报文是否加入head部分
         */
        this.usehead = true;
        //head数据
        this.headStore = cHeadStore.getInstance();
        //user 
        this.userStore = cUserStore.getInstance();
        //营销数据
        this.salesStore = cMarketStore.SalesStore.getInstance();
        /**
         * @var {object} [Model.cModel.headinfo] 自定义head结构
         */
        this.headinfo = null;
        /*
         * 查询结果
         * @var {object|store} [result] 查询结果
         */
        this.result = null;

        /**
         * 请求如果返回auth是否，是否跳转至登录页
         * @var {boolean} [Model.cModel.checkAuth=true]
         */
        this.checkAuth = true;
      },
	    /**
	     * @method initialize
	     * @param $super
	     * @param options
	     * @description 复写自顶层Class的initialize，赋值队列
	     */
      initialize: function ($super, options) {
        $super(options);
      },


	    /**
       * 用户数据，返回数据存储的tag
       * @method Model.cModel.getTag
	     * @returns {*|JSON.stringify}
	     */
      getTag: function () {
        var params = _.clone(this.getParamData() || {});
        return JSON.stringify(params);
      },
      /**
       * 获取查询参数，如果param设置的一个Store,则返回store的值
       * @method Model.cModel.getParamData
       * @returns {*}
       */
      getParamData: function () {
        return this.param instanceof AbstractStore ? this.param.get() : this.param;
      },


      /**
       * @method Model.cModel.execute
       * @param onComplete 取完的回调函 传入的第一个参数为model的数第二个数据为元数据，元数据为ajax下发时的ServerCode,Message等数
       * @param onError 发生错误时的回调
       * @param ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
       * @param scope 可选，设定回调函数this指向的对象
       * @param onAbort 可选，但取消时会调用的函数
       * @description 取model数据
       */
      execute: function (onComplete, onError, ajaxOnly, scope, onAbort) {
        //每次请求前设置用户Auth
        this.headStore.setAuth(this.userStore.getAuth());
        //设置头部的sid
        this.headStore.setAttr('sid',this.salesStore.getAttr('sourceid')||'8888');

        var params = _.clone(this.getParamData() || {});

        //验证错误码
        this.pushValidates(function (data) {
          //兼容soa2.0 和 restful api
          var rsphead = this._getResponseHead(data);
          if (rsphead.overdue) {
            return {'overdue': rsphead.overdue};
          }
          return rsphead.success;

        });

        // @description 业务相关，获得localstorage的tag
        var tag = this.getTag();
        // @description 业务相关，从localstorage中获取上次请求的数据缓存
        var cache = this.result && this.result.get(tag);

        //如果没有缓存，或者指定网络请求，则发起ajax请求
        if (!cache || this.ajaxOnly || ajaxOnly) {

          if (this.method.toLowerCase() !== 'get' && this.usehead && this.contentType !== baseModel.CONTENT_TYPE_JSONP) {
            params.head = this.headStore.get();
            params.head.time = (new Date()).getTime();
          } else if (this.method.toLowerCase() !== 'get' && !this.usehead && this.contentType !== baseModel.CONTENT_TYPE_JSONP) {
            if (this.headinfo) {
              params.head = this.headinfo;
            }
          }

          this.onBeforeCompleteCallback = function (datamodel) {
            if (this.result instanceof AbstractStore) {
              //soa 数据量大,为精简locastorage,去掉ResponseStatus部分 shbzhang 2014.4.17
              try {
                //              if(datamodel.ResponseStatus){
                //                delete datamodel.ResponseStatus;
                //              }
              } catch (e) {

              }
              this.result.set(datamodel, tag);
            }
          }
          //调用父类的数据请求方法
          this._execute(onComplete, onError, scope, onAbort, params)

        } else {
          if (typeof onComplete === 'function') {
            onComplete.call(scope || this, cache);
          }
        }
      },
	    /**
       * 发送数据请求
       * @method Model.cModel.excute
       * @deprecated 建议使用Model.cModel.execute
	     * @param onComplete 取完的回调函 传入的第一个参数为model的数第二个数据为元数据，元数据为ajax下发时的ServerCode,Message等数
	     * @param onError 发生错误时的回调
	     * @param ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
	     * @param scope 可选，设定回调函数this指向的对象
	     * @param onAbort 可选，但取消时会调用的函数
	     */
      excute: function (onComplete, onError, ajaxOnly, scope, onAbort) {
        this.execute(onComplete, onError, ajaxOnly, scope, onAbort);
      },

      /*
       * 返回response head,兼容restful和SOA2
       * @param {Object} data 返回数据
       * @return {Object} head 格式为{'success':true}
       * @private
       */
      _getResponseHead: function (data) {
        var fromSOA = !!data.ResponseStatus;
        var head = fromSOA ? data.ResponseStatus : data.head,
           success = false, overdue = false;
        if (fromSOA && head) {
          var ack = head.Ack;
          //酒店模块报错ack返回值是1
          if (ack === 'Failure' || ack == 1) {
            var errors = head.Errors;
            if ((errors instanceof Array) && errors.length > 0) {
              //考虑到可能存在多个error的情况
              for (var i = 0, error; i < errors.length; i++) {
                error = errors[i];
                if (error && error.ErrorCode && error.ErrorCode == 'MobileRequestFilterException') {
                  //auth 过期，用户重新登录 2.01 09 16 modefy by byl  此处添加BU 控制，判断是否调用登陆界面
                  if (this.checkAuth) {
                    overdue = true;
                    //在此将所有的auth信息都置空
                    this.headStore.setAuth("");
                    this.userStore.removeUser();
                  }
                  break;
                }
              }
            }
          }

          //SOA2.0的成功判断增加枚举类型
          success = head.Ack === 'Success' || head.Ack == '0';
        } else {
          success = (head && head.errcode === 0);
        }
        return {
          'success': success,
          'overdue': overdue
        };
      },
      
      /**
       * 设置model 的param对象，有两种使用情况
       * 1. 当只传一个参数key，且key为对象，此时key为要设置的值
       * 2. 传两个参数，第一个参数key为字符串(允许.分隔),第二个参数val为要设置的值
       * 注意两次调用setParam,两次参数会做合并处理
       * 
       * @method Model.cModel.setParam
       * @param {Object|string} key 参数，
       * @param {Object} [val] 参数值
       */
      setParam: function (key, val) {
        var param = {};
        if (typeof key === 'object' && !val) {
          param = key;
        } else {
          param[key] = val;
        }
        for (var i in param) {
          if (this.param instanceof AbstractStore) {
            this.param.setAttr(i, param[i]);
          } else {
            cObject.set(this.param, i, param[i]);
          }
        }
      },

      /**
       * 清空结果数据
       * @method Model.cModel.clearResult
       */
      clearResult: function () {
        if (this.result && typeof this.result.remove === 'function') {
          this.result.remove();
        } else {
          this.result = null;
        }
      }
    });


    return Model;
  });
/*
 * @File c.user.model
 * @Description: 封装H5的用户登录操作
 * @author ouxingzhi@vip.qq.com l_wang@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
/*
 * @author cmli@ctrip.com / oxz欧新志 <ouxz@Ctrip.com>
 * @namespace cUserModel
 */
define('cUserModel',['cCoreInherit', 'cModel', 'cCommonStore', 'cUtilCommon'],
  function(cCoreInherit, cModel, CommonStore, cUtilCommon) {

    

    var UserStore = CommonStore.UserStore.getInstance();
    var HeadStore = CommonStore.HeadStore.getInstance();

    var UserModel = {};

	  /*
	   * 非会员登录
	   * @namespace cUserModel.NotUserLoginModel
	   */
    UserModel.NotUserLoginModel = new cCoreInherit.Class(cModel, {

      /**
       * @private
       * @method cUserModel.NotUserLoginModel.__propertys__
       * @returns void
       */
      __propertys__: function() {
        this.url = "/html5/Account/NonUserLogin";
        this.param = {};
        //this.baseurl = cModel.baseurl.call(this);
        this._abortres = {};
        this.isAbort = false;
      },

      /**
       * @private
       * @method cUserModel.NotUserLoginModel.initialize
       * @param {function} $super
       * @param {object} options
       * @description 对象初始化工作
       * @returns void
       */
      initialize: function($super, options) {
        $super(options);
      },

      /**
       * @public
       * @method cUserModel.NotUserLoginModel.excute
       * @param {function} onComplete 取完的回调函
       * @param {function} onError 发生错误时的回调
       * @param {boolean} ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
       * @param {boolean} scope 可选，设定回调函数this指向的对象
       * @param {function} onAbort 可选，但取消时会调用的函数
       * @description 向服务端做非会员登陆
       * @returns void
       */
      excute: function(onComplete, onError, ajaxOnly, scope, onAbort) {
        //add by byl 此处添加，如果已经是非会员登录，则不重新调用非会员登录，并且执行成功的回调函数
        var userData = UserStore.getUser();
        if(userData && !!userData.Auth && !userData.IsNonUser){
          if(typeof onComplete === 'function'){
            onComplete.call(scope, UserStore.getUser());
          }
          return;
        }
        this.isAbort = false;
        // var url = 'http://' + this.baseurl.domain + this.url;
        var host = window.location.host
        if(host == 'localhost' || host.match(/\.fat/i)){
          host = 'm.fat19.qa.nt.ctripcorp.com';
        }
        var url = 'http://' + host + this.url;
		
        var successCallback = function(data) {
          if (data.ServerCode == 1 && data.Data) {
            UserStore.setUser(data.Data);

            if (typeof onComplete === 'function') {
              onComplete.call(scope, data);
            }
          } else {
            if (typeof onError === 'function') {
              onError.call(scope);
            }
          }
        };

        var errorCallback = function() {
          if (this.isAbort) {
            if (typeof onAbort === 'function') {
              onAbort.call(scope);
            }

            this.isAbort = false;
            return;
          }

          if (typeof onError === 'function') {
            onError.apply(scope, arguments);
          }
        };

        this._abortres = $.ajax({
          'type': 'get',
          'url': url,
          'dataType': 'json',
          'crossDomain': true,
          'success': $.proxy(successCallback, this),
          'error': $.proxy(errorCallback, this),
          'timeout': 25000
        });
      },

      /**
       * @description 终止请求
       * @method cUserModel.NotUserLoginModel.abort
       * @returns void
       */
      abort: function() {
        this.isAbort = true;
        if (this._abortres && typeof this._abortres.abort === 'function') {
          this._abortres.abort();
        }
      }
    });

    /*
     * 用户登录model
     * @namespace cUserModel.UserLoginModel
     */
    UserModel.UserLoginModel = new cCoreInherit.Class(cModel, {
      /**
       * @private
       * @method cUserModel.UserLoginModel.__propertys__
       * @returns void
       */
      __propertys__: function() {
        this.param = {};
        this.url = '10090/GetUserInfoToH5.json';
      },
      /**
       * @private
       * @method cUserModel.UserLoginModel.initialize
       * @param {function} $super
       * @param {object} options
       * @description 对象初始化工作
       * @returns void
       */
      initialize: function($super, options) {
        $super(options);
        this.baseurl = this.seturl();
      },
	    /*
	     * @method cUserModel.UserLoginModel.seturl
	     * @description 获取用户登录页面的服务器地址，供内部使用
	     */
      seturl:function(){
        var host = window.location.host,
          path = 'restapi/soa2/',
          domain = "m.ctrip.com";
        if (host.match(/^m\.ctrip\.com/i)){
          domain = "m.ctrip.com";
        }else if (host.match(/\.uat\.qa/i)){
          domain = "gateway.m.uat.qa.nt.ctripcorp.com";
        }else if (host.match(/\.fat/i)){
          domain = "gateway.m.fws.qa.nt.ctripcorp.com";
        }
        return {
          'domain': domain,
          'path': path
        }
      },
      
      buildurl: function () { 
        if (cUtilCommon.isUrl(this.url)) {
          return this.url;
        }  
        return this.protocol + '://' + this.baseurl.domain + '/restapi/soa2/' +  this.url;
      }
    });

    /**
     * @description 新的登录方式
     * @type {Class}
     */
    UserModel.NewUserLoginModel = new cCoreInherit.Class(cModel,{
      /**
       * @private
       * @method __propertys__
       * @returns void
       */
      __propertys__: function() {
        this.param = {};
        this.contentType = "jsonp";
        this.url = 'CrossDomainGetTicket/ajax/ajaxgetticket.ashx';
        this._abortres = {};
        this.isAbort = false;
      },
      /**
       * @private
       * @method initialize
       * @param {function} $super
       * @param {object} options
       * @description 对象初始化工作
       * @returns void
       */
      initialize: function($super, options) {
        $super(options);
      },
      buildurl:function(){
        var host = window.location.host,
          domain = "accounts.ctrip.com";
        if (host.match(/^m\.ctrip\.com/i)){
          domain = "accounts.ctrip.com";
        }else if (host.match(/\.uat\.qa/i)){
          domain = "accounts.uat.qa.nt.ctripcorp.com";
        }else if (host.match(/\.fat/i) || (host.match(/\.lpt/i))|| host.match(/\.fws/i) || host.match(/^(localhost|172\.16|127\.0)/i)) {
          domain = "accounts.fat49.qa.nt.ctripcorp.com";
        }
        return ['https://',domain, '/',this.url].join("");
      },
      //重写此处的jsonP请求
      excute: function(onComplete, onError, ajaxOnly, scope, onAbort) {
        this.isAbort = false;
        var url = this.buildurl();
        var successCallback = function(info) {
          if (info.RetCode == 0 && info.UserData) {
            if (typeof onComplete === 'function') {
              onComplete.call(scope, info.UserData);
            }
          } else {
            if (typeof onError === 'function') {
              onError.call(scope);
            }
          }
        };
        var errorCallback = function() {
          if (this.isAbort) {
            if (typeof onAbort === 'function') {
              onAbort.call(scope);
            }
            this.isAbort = false;
            return;
          }
          if (typeof onError === 'function') {
            onError.apply(scope, arguments);
          }
        };

        this._abortres = $.ajax({
          'type': 'get',
          'url': url,
          'dataType': 'jsonp',
          'data':this.param,
          'crossDomain': true,
          'jsonpCallback': "callbackfn",
          'success': $.proxy(successCallback, this),
          'error': $.proxy(errorCallback, this),
          'timeout': 50000
        });
      },
      /**
       * @public
       * @method abort
       * @returns void
       */
      abort: function() {
        this.isAbort = true;
        if (this._abortres && typeof this._abortres.abort === 'function') {
          this._abortres.abort();
        }
      }
    })
    return UserModel;
  });
/**
* @author cmli@Ctrip.com
* @class cBase
* @description 提供ui构建的基本方法
*/
define('cUIBase',[], function(){

  var base = {};

  /** 框架内所有生成的元素的id，class都会加上此前缀 */
  base.config = {
    prefix: 'cui-'
  };

  /**
  * @method setConfig
  * @param         name {String} 参数名
  * @param         value {Any Object} 值
  */
  base.setConfig = function (name, value) {
    base.config[name] = value;
  };

  /**
  * @method getElementPos
  * @param         el {Element} 元素对象
  * @description 返回元素el在页面中的位置信息
  */
  base.getElementPos = function (el) {
    var top = 0, left = 0;
    do {
      top += el.offsetTop;
      left += el.offsetLeft;
    } while (el = el.offsetParent);

    return {
      top: top,
      left: left
    };
  };

  /**
  * @method getCreateId
  * @description 返回唯一的字符串
  */
  base.getCreateId = (function () {
    var diviso = new Date().getTime();
    return function () {
      return base.config.prefix + (++diviso);
    };
  })();

  /**
  * @method getBiggerzIndex
  * @description 获得更大的zIndex值，每次调用该函数，都会产生一个更大值的z-index

  */
  base.getBiggerzIndex = (function () {
    var diviso = 3000;
    return function () {
      return ++diviso;
    };
  })();

  /**
  * @method getCurStyleOfEl
  * @param         el {Element} 元素对象
  * @param     样式名
  * @description 获得某个元素的最终（实时）的样式值
  */
  base.getCurStyleOfEl = function (el, styleName) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(el).getPropertyValue(styleName);
    } else if (el.currentStyle) {
      var sec = styleName.split('-'),
      cen = [],
      arr;
      for (var i = 0; i < sec.length; i++) {
        if (i == 0) {
          cen.push(sec[i]);
        } else {
          arr = sec[i].split('');
          arr[0] = arr[0].toUpperCase();
          cen.push(arr.join(''));
        }
      }
      cen = cen.join('');
      return el.currentStyle[cen];
    }
  };

  /**
  * @method bindthis
  * @param         fn 回调函数
  * @param     obj 作用域
  * @description 修改函数作用域
  */
  base.bindthis = function (fn, obj) {
    return function () {
      fn.apply(obj, arguments);
    };
  };

  /**
  * @method strToNum
  * @param     str 字符串
  * @description 安全的将字符串转换为数字
  */
  base.strToNum = function (str) {
    var num = parseInt(str.replace(/[a-z]/i, ''));
    return isNaN(num) ? 0 : num;
  };

  /**
  * @method getElementRealSize
  * @param         el {Element} 元素对象
  * @description 获得元素占位的高宽
  */
  base.getElementRealSize = function (el) {
      var $el = $(el);
      return {
          width: $el.width(),
          height: $el.height()
      };
  };

  /**
  * @method getPageSize
  * @description 返回包含高宽的对象
  */
  base.getPageSize = function () {
    var width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    return {
      width: width,
      height: height
    };
  };

  /**
  * @method getPageScrollPos
  * @description 获得窗口滚动条的位置
  */
  base.getPageScrollPos = function () {
      var left = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
    top = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
    height = Math.min(document.documentElement.clientHeight, document.body.clientHeight),
          width = Math.min(document.documentElement.clientWidth, document.body.clientWidth),
          pageWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      return {
          top: top,
          left: left,
          height: height,
          width: width,
          pageWidth: pageWidth,
          pageHeight: pageHeight
      };
  };

  base.getMousePos = function (event) {
      var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop),
          left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
      return {
          top: top + event.clientY,
          left: left + event.clientX
      };
  };

  /**
  * @method getMousePosOfElement
  * @param               {Object Event} 时间对象
  * @param               {Object Element} 元素对象
  * @description 获得event在元素上的位置
  */
  base.getMousePosOfElement = function (event, el) {
    var mpos = base.getMousePos(event), pos = base.getElementPos(el), w = el.clientWidth, h = el.clientHeight;
    var x = mpos.left - pos.left, y = mpos.top - pos.top;
    x = x < 0 ? 0 : (x > w ? w : x);
    y = y < 0 ? 0 : (y > h ? h : y);
    return { x: x, y: y };
  };

  /**
  * @method createElement
  * @param               tag {String} 标签名称
  * @param               attr {Object} 可选 属性
  * @param               styles {Object} 可选 样式
  * @param               html {String} 可选 内容
  * @description 便捷创建元素方法
  */
  base.createElement = function (tag, options) {
    var el = document.createElement(tag), i, t
    if (options) for (i in options) {
      switch (i) {
        case 'attr':
          if (typeof options[i] === 'object') for (t in options[i]) {
            if (options[i][t] != null) el.setAttribute(t, options[i][t]);
          }
          break;
        case 'styles':
          if (typeof options[i] === 'object') for (t in options[i]) {
            if (options[i][t] != null) el.style[t] = options[i][t];
          }
          break;
        case 'id':
          el.id = options[i];
          break;
        case 'class':
          el.className = options[i];
          break;
        case 'html':
          el.innerHTML = options[i];
          break;
      }
    }
    return el;
  };

  return base;

});
/**
* @File ui.abstract.view.js
* @Description: UI组件基类
* @author l_wang@ctrip.com
* @date 2014-10-09
* @version V1.0
*/

/**
* UI组件基类，提供一个UI类基本功能，并可注册各个事件点：
① onPreCreate 在dom创建时触发，只触发一次
② onCreate 在dom创建后触发，只触发一次

* @namespace UIView
*/
define('UIView',[], function () {

  /**
  * @description 闭包保存所有UI共用的信息，这里是z-index
  * @method getBiggerzIndex
  * @param {Number} level
  * @returns {Number}
  */
  var getBiggerzIndex = (function () {
    var index = 3000;
    return function (level) {
      return level + (++index);
    };
  })();

  var UIContainerUtil = (function () {
    //一个闭包对象存放所有实例化的ui实例
    var UIContainer = {};

    return {
      addItem: function (id, ui) {
        UIContainer[id] = ui;
      },

      removeItem: function (id) {
        if (UIContainer[id]) delete UIContainer[id];
      },

      getItem: function (id) {
        if (id) return UIContainer[id];
        return UIContainer;
      }
    };
  })();


  return _.inherit({

    /**
    * @description 设置实例默认属性
    * @method propertys
    */
    propertys: function () {
      //模板状态
      this.wrapper = $('body');
      this.id = _.uniqueId('ui-view-');

      this.template = '';
      this.datamodel = {};
      this.events = {};

      //自定义事件
      //此处需要注意mask 绑定事件前后问题，考虑scroll.radio插件类型的mask应用，考虑组件通信
      this.eventArr = {};

      //初始状态为实例化
      this.status = 'init';

      //要开启动画，需要配置以下3个属性
      this.needAnimat = false;
      this.animateShowAction = null;
      this.animateHideAction = null;

      //是否需要div包裹根元素
      this.needRootWrapper = true;
      //      this.availableFn = function () { }

    },

    //子类事件绑定若想保留父级的，应该使用该方法
    addEvents: function (events) {
      if (_.isObject(events)) _.extend(this.events, events);
    },

    //阻止默认冒泡事件
    _preventDefault: function (e) {
      e.preventDefault();
    },

    /**
    * @description 绑定事件点回调，这里应该提供一个方法，表明是insert 或者 push，这样有一定手段可以控制各个同一事件集合的执行顺序
    * @param {String} type
    * @param {Function} fn
    * @param {Boolean} insert
    * @method on
    */
    on: function (type, fn, insert) {
      if (!this.eventArr[type]) this.eventArr[type] = [];

      //头部插入
      if (insert) {
        this.eventArr[type].splice(0, 0, fn);
      } else {
        this.eventArr[type].push(fn);
      }
    },

    /**
    * @description 移除某一事件回调点集合中的一项
    * @param {String} type
    * @param {Function} fn
    * @method off
    */
    off: function (type, fn) {
      if (!this.eventArr[type]) return;
      if (fn) {
        this.eventArr[type] = _.without(this.eventArr[type], fn);
      } else {
        this.eventArr[type] = [];
      }
    },

    /**
    * @description 触发某一事件点集合回调，按顺序触发
    * @method trigger
    * @param {String} type
    * @returns {Array}
    */
    //PS：这里做的好点还可以参考js事件机制，冒泡捕获处于阶段
    trigger: function (type) {
      var _slice = Array.prototype.slice;
      var args = _slice.call(arguments, 1);
      var events = this.eventArr;
      var results = [], i, l;

      if (events[type]) {
        for (i = 0, l = events[type].length; i < l; i++) {
          results[results.length] = events[type][i].apply(this, args);
        }
      }
      return results;
    },

    /**
    * @description 创建dom根元素，并组装形成UI Dom树
    * @override 这里可以重写该接口，比如有些场景不希望自己创建div为包裹层
    * @method createRoot
    * @param {String} html
    */
    createRoot: function (html) {
      if (this.needRootWrapper) {
        this.$el = $('<div class="view" style="display: none; " id="' + this.id + '"></div>');
        this.$el.html(html);
      } else {
        this.$el = $(html).hide().attr('id', this.id);
      }
    },

    _isAddEvent: function (key) {
      if (key == 'onCreate' || key == 'onPreShow' || key == 'onShow' || key == 'onRefresh' || key == 'onHide')
        return true;
      return false;
    },

    /**
    * @description 设置参数，重写默认属性
    * @override 
    * @method setOption
    * @param {Object} options
    */
    setOption: function (options) {
      //这里可以写成switch，开始没有想到有这么多分支
      for (var k in options) {
        if (k == 'datamodel' || k == 'events') {
          _.extend(this[k], options[k]);
          continue;
        } else if (this._isAddEvent(k)) {
          this.on(k, options[k])
          continue;
        }
        this[k] = options[k];
      }
      //      _.extend(this, options);
    },

    /**
    * @description 构造函数
    * @method initialize
    * @param {Object} opts
    */
    initialize: function (opts) {
      this.propertys();
      this.setOption(opts);
      this.resetPropery();
      //添加系统级别事件
      this.addEvent();
      //开始创建dom
      this.create();
      this.addSysEvents();

      this.initElement();

      //将当前的ui实例装入容器
      UIContainerUtil.addItem(this.id, this);

    },

    //返回所有实例化的UI组件集合
    getUIContainer: function () {
      return UIContainerUtil.getItem();
    },

    //内部重置event，加入全局控制类事件
    addSysEvents: function () {
      if (typeof this.availableFn != 'function') return;
      this.removeSysEvents();
      this.$el.on('click.system' + this.id, $.proxy(function (e) {
        if (!this.availableFn()) {
          e.preventDefault();
          e.stopImmediatePropagation && e.stopImmediatePropagation();
        }
      }, this));
    },

    removeSysEvents: function () {
      this.$el.off('.system' + this.id);
    },

    $: function (selector) {
      return this.$el.find(selector);
    },

    //提供属性重置功能，对属性做检查
    resetPropery: function () {
    },

    //各事件注册点，用于被继承
    addEvent: function () {
    },

    create: function () {
      this.trigger('onPreCreate');
      this.createRoot(this.render());

      this.status = 'create';
      this.trigger('onCreate');
    },

    //实例化需要用到到dom元素
    initElement: function () { },

    render: function (callback) {
      data = this.getViewModel() || {};
      var html = this.template;
      if (!this.template) return '';
      if (data) {
        html = _.template(this.template)(data);
      }
      typeof callback == 'function' && callback.call(this);
      return html;
    },

    //刷新根据传入参数判断是否走onCreate事件
    //这里原来的dom会被移除，事件会全部丢失 需要修复*****************************
    refresh: function (needEvent) {
      this.resetPropery();
      if (needEvent) {
        this.create();
      } else {
        this.$el.html(this.render());
      }
      this.initElement();
      if (this.status == 'show') this.show();
      this.trigger('onRefresh');
    },

    show: function () {
      if (!this.wrapper[0] || !this.$el[0]) return;
      //如果包含就不要乱搞了
      if (!$.contains(this.wrapper[0], this.$el[0])) {
        this.wrapper.append(this.$el);
      }

      this.trigger('onPreShow');

      if (this.needAnimat && (this.animateInClass ? this.hasAnimationProperty(this.animateInClass) : (typeof this.animateShowAction == 'function')) && this.status != 'show') {
        this.animateShowAction.call(this, this.$el);
      } else
        this.$el.show();

      this.status = 'show';
      this.bindEvents();
      this.trigger('onShow');
    },

    hide: function () {
      if (!this.$el || this.status !== 'show') return;

      this.trigger('onPreHide');

      if (this.needAnimat && (this.animateOutClass ? this.hasAnimationProperty(this.animateOutClass) : (typeof this.animateShowAction == 'function')) && this.status != 'hide') {
        this.animateHideAction.call(this, this.$el);
      } else
        this.$el.hide();

      this.status = 'hide';
      this.unBindEvents();
      this.removeSysEvents();
      this.trigger('onHide');
    },

    //检测某class是否包含动画特性
    hasAnimationProperty: function (className) {
      var animateProprtys = [
      //有什么判断的便新增
        $.fx.cssPrefix + 'animation-name'
      ];
      var el = $('<div></div>');

      var i, len;

      //赋予其class
      el.attr('class', className);
      $('body').append(el);

      if (el.css(animateProprtys[0]) != 'none') {
        el.remove();
        return true;
      }
      el.remove();
      return false;
    },

    destroy: function () {
      this.status = 'destroy';
      this.unBindEvents();
      this.removeSysEvents();
      UIContainerUtil.removeItem(this.id);
      this.$el.remove();
      this.trigger('onDestroy');
      delete this;
    },

    getViewModel: function () {
      return this.datamodel;
    },

    setzIndexTop: function (el, level) {
      if (!el) el = this.$el;
      if (!level || level > 10) level = 0;
      level = level * 1000;
      el.css('z-index', getBiggerzIndex(level));

    },

    /**
    * 解析events，根据events的设置在dom上设置事件
    */
    bindEvents: function () {
      var events = this.events;

      if (!(events || (events = _.result(this, 'events')))) return this;
      this.unBindEvents();

      // 解析event参数的正则
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      var key, method, match, eventName, selector;

      // 做简单的字符串数据解析
      for (key in events) {
        method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        match = key.match(delegateEventSplitter);
        eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateUIEvents' + this.id;

        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }

      return this;
    },

    /**
    * 冻结dom上所有元素的所有事件
    *
    * @return {object} 执行作用域
    */
    unBindEvents: function () {
      this.$el.off('.delegateUIEvents' + this.id);
      return this;
    }

  });

});


/*
用于继承的类，会自动垂直居中

*/
define('UIMask',['UIView', getAppUITemplatePath('ui.mask')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

    },

    resetDefaultProperty: function () {
      this.events = {};

//      this.animateInClass = 'cm-up-in';
      this.animateOutClass = 'cm-overlay-out';

      //阻止浏览器默认事件，这里是阻止滚动
      this.addEvents({
        'touchmove': '_preventDefault'
      });
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    setRootStyle: function () {
      var h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      this.$el.css({
        width: '100%',
        height: h + 'px',
        position: 'absolute',
        left: '0px',
        top: '0px'
      });
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-mask');
      });

      this.on('onShow', function () {
        this.setRootStyle();
        this.setzIndexTop();
      });

    }

  });


});


/*
用于继承的类，会自动垂直居中

*/
define('UILayer',['UIView', 'UIMask'], function (UIView, UIMask) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();
      this.mask = new UIMask();
      //类型为layer
      this.type = 'layer';

      this.resetDefaultProperty();

    },

    resetDefaultProperty: function () {
      //需要蒙版

      this.mask.resetDefaultProperty();

      this.needMask = true;

      this.needAnimat = true;

      //需要点击蒙版删除
      this.maskToHide = true;

      //需要居中定位
      this.needReposition = true;

      //是否具有后退关闭弹出层需求
      this.hasPushState = (history && history.pushState);
      this.hasPushState = false;

      //是否为浏览器回退
      this.historyBack = false;

      this.animateInClass = 'cm-up-in';
      this.animateOutClass = 'cm-up-out';

      this.animateShowAction = null;
      this.animateHideAction = null;

      //调整事件绑定位置
      this.events = {
        'touchmove': '_preventDefault'
      };

    },

    initialize: function ($super, opts) {
      $super(opts);

      this.clearRes();
    },

    resetPropery: function () {
      var scope = this;
      if (this.needAnimat) {
        if (!this.animateShowAction)
          this.animateShowAction = function (el) {
            var isTrigger = false;

            el.show();
            el.addClass(scope.animateInClass);
            //防止class不存在的情况下导致动画不执行，而程序出错
            el.one($.fx.animationEnd, function () {
              isTrigger = true;

              el.removeClass(scope.animateInClass);
            });

            setTimeout(function () {
              if (isTrigger) return;

              el.removeClass(scope.animateInClass);
              el.off($.fx.animationEnd);
            }, 350);

          };

        if (!this.animateHideAction)
          this.animateHideAction = function (el) {
            var isTrigger = false;

            el.addClass(scope.animateOutClass);
            el.one($.fx.animationEnd, function () {
              isTrigger = true;

              el.removeClass(scope.animateOutClass);
              el.hide();
            });

            setTimeout(function () {
              if (isTrigger) return;

              el.removeClass(scope.animateOutClass);
              el.off($.fx.animationEnd);
              el.hide();
            }, 350);
          };
      }

      //如果存在关闭动画接口，需要为mask加动画
      if (this.animateHideAction) {
        this.mask.needAnimat = true;
        this.mask.animateHideAction = function (el) {
          var isTrigger = false;
          el.addClass(scope.mask.animateOutClass);
          el.one($.fx.animationEnd, function () {
            isTrigger = true;
            el.removeClass(scope.mask.animateOutClass);
            el.hide();
          });

          setTimeout(function () {
            if (isTrigger) return;

            el.removeClass(scope.mask.animateOutClass);
            el.off($.fx.animationEnd);
            el.hide();
          }, 350);
        };
      } else {
        this.mask.animateHideAction = null;
      }
      this._setMaskEvent();
    },

    _setMaskEvent: function () {
      var scope = this;
      //这里处理是否点击关闭蒙版的操作
      if (this.needMask && this.maskToHide) {
        //mask显示之前为mask绑定关闭事件，一次执行便不予理睬了
        this.mask.addEvents({
          'click': function () {
            scope.hide();
          }
        });
      }
    },

    //资源清理
    clearRes: function () {
      //      if (this.needMask == false) this.mask = null;
    },

    _addPushStateEvent: function () {
      if (!this.hasPushState) return;
      history.pushState({}, document.title, location.href);
      this.historyBack = false;
      $(window).on('popstate.pageviewpopstate' + this.id, $.proxy(function (e) {
        this.historyBack = true;
        this.hide();
      }, this));
    },

    _removePushStateEvent: function () {
      if (!this.hasPushState) return;
      $(window).off('.pageviewpopstate' + this.id);
    },

    addEvent: function () {
      this.on('onCreate', function () {
        this.$el.addClass('cui-layer');
      });

      this.on('onPreShow', function () {
        if (this.needMask) this.mask.show();

      });

      this.on('onShow', function () {
        this.setzIndexTop();
        this._addPushStateEvent();
        if (this.needReposition) this.reposition();

      });

      this.on('onPreHide', function () {
        //执行两次hide方法
        if (this.hasPushState && !this.historyBack) {
          history.back();
          return;
        }

      });

      this.on('onHide', function () {
        if (this.hasPushState && !this.historyBack) {
          return;
        }
        this.mask.hide();
        this._removePushStateEvent();

      });

      this.on('onDestroy', function () {
        this.mask.destroy();
      });

    },

    //弹出层类垂直居中使用
    reposition: function () {
      this.$el.css({
        'margin-left': -(this.$el.width() / 2) + 'px',
        'margin-top': -(this.$el.height() / 2) + 'px'
      });
    }

  });

});


/*
用于继承的类，会自动垂直居中

*/
define('UIAlert',['UILayer', getAppUITemplatePath('ui.alert')], function (UILayer, template) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
    },

    resetDefaultProperty: function ($super) {
      $super();

      this.maskToHide = false;

      //数据模型
      this.datamodel = {
        title: '',
        content: 'content',
        btns: [
          { name: '知道了', className: 'cui-btns-ok' }
        ]
      };

      //html模板
      this.template = template;

      //事件机制
      this.events = {
        'click .cui-btns-ok': 'okAction',
        'click .cui-btns-cancel': 'cancelAction'
      };

      this.okAction = function () {
        this.hide();
      };

      this.cancelAction = function () {
        this.hide();
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
//        this.$el.addClass('cui-alert');
      });
    },

    setDatamodel: function (datamodel, okAction, cancelAction) {
      if (!datamodel) datamodel = {};
      _.extend(this.datamodel, datamodel);
      okAction && (this.okAction = okAction);
      cancelAction && (this.cancelAction = cancelAction);
      this.refresh();
    }

  });

});


/*
用于继承的类，会自动垂直居中

*/
define('UILoading',['UILayer', getAppUITemplatePath('ui.loading')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.maskToHide = false;

      this.hasPushState = false;

      //重写Type定义
      this.type = "loading";
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-loading');
      });

    }

  });


});


/*
用于继承的类，会自动垂直居中

*/
define('UILoadingLayer',['UILayer', getAppUITemplatePath('ui.loading.layer')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();

    },

    resetDefaultProperty: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.datamodel = {
        closeBtn: false,
        content: ''
      };

      this.events = {
        'click .cui-grayload-close': 'closeAction'
      };

      this.maskToHide = false;
      this.hasPushState = false;

      this.closeAction = function (e) {
        this.hide();
      };

    },

    initElement: function () {
      this.el = this.$('.cui-grayload-text');
    },

    reposition: function () {
      this.el.css({
        'margin-left': -(this.el.width() / 2) + 'px',
        'margin-top': -(this.el.height() / 2) + 'px'
      });
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-loading');
      });
    },

    setDatamodel: function (content, fn) {
      var isChange = false;
      if (content) {
        this.datamodel.content = content;
        isChange = true;
      } else {
        this.datamodel.content = '';
      }
      if (fn) {
        this.closeAction = fn; isChange = true;
        this.datamodel.closeBtn = true;
      } else {
        this.datamodel.closeBtn = false;
      }
      if (isChange) this.refresh();
    }

  });


});


/*
用于继承的类，会自动垂直居中

*/
define('UIToast',['UILayer', getAppUITemplatePath('ui.toast')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
    },

    resetDefaultProperty: function ($super) {
      $super();
      this.template = template;
      this.datamodel = {
        content: 'toast'
      };
      this.hideSec = 2000;
      this.hasPushState = false;
      this.TIMERRES = null;

      this.hideAction = function () {
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-toast');
      });

      this.on('onShow', function () {
        //显示指定时间后需要关闭
        if (this.TIMERRES) clearTimeout(this.TIMERRES);
        this.TIMERRES = setTimeout($.proxy(function () {
          this.hide();
        }, this), this.hideSec);
      });

      this.on('onHide', function () {
        //显示指定时间后需要关闭
        if (this.TIMERRES) clearTimeout(this.TIMERRES);
        this.hideAction();
      });
    },

    /**
    * 显示Toast
    * @param title 标题
    * @param timeout 显示时长
    * @param callback 隐藏时回调
    * @param clickToHide 是否允许点击界面任一处,隐藏Toast
    */
    setDatamodel: function (content, timeout, hideAction, clickToHide) {
      this.datamodel.content = content;
      timeout && (this.hideSec = timeout);
      hideAction && (this.hideAction = hideAction);
      this.maskToHide = clickToHide;

      this.refresh();
    }


  });


});


/*
用于继承的类，在页面内的view
*/
define('UIInlineView',['UIView'], function (UIView) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();


    },

    initialize: function ($super, opts) {
      $super(opts);


    }

  });

});

/*
这里需要考虑这个方案是否值得
每一次数据的改变皆会引发dom 的重组事件的解绑与绑定，datamodel方案是否真的就是好？
*/
define('UINum',['UIView', getAppUITemplatePath('ui.num')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      this.datamodel = {
        min: 1,
        max: 9,
        curNum: 1,
        unit: '',
        needText: false
      };

      this.template = template;

      this.events = {
        'click .js_num_minus': 'minusAction',
        'click .js_num_plus': 'addAction',
        'focus .js_cur_num': 'txtFocus',
        'blur .js_cur_num': 'txtBlur'
      };

      this.needRootWrapper = false;

    },

    initElement: function () {
      this.curNum = this.$('.js_cur_num');
    },

    txtFocus: function () {
      this.curNum.html('');
    },

    txtBlur: function () {
      this.setVal(this.curNum.html());
    },

    addAction: function () {
      this.setVal(this.datamodel.curNum + 1);
    },

    minusAction: function () {
      this.setVal(this.datamodel.curNum - 1);
    },

    //用于重写
    changed: function (num) {
      console.log('num changed ' + num);
    },

    getVal: function () {
      return this.datamodel.curNum;
    },

    setVal: function (v) {
      var isChange = true;
      var tmp = this.datamodel.curNum;
      if (v === '') v = tmp;
      if (v == parseInt(v)) {
        //设置值不等的时候才触发reset
        v = parseInt(v);
        this.datamodel.curNum = v;
        if (v < this.datamodel.min) {
          this.datamodel.curNum = this.datamodel.min;
        }
        if (v > this.datamodel.max) {
          this.datamodel.curNum = this.datamodel.max;
        }
        this.curNum.val(this.datamodel.curNum);
        isChange = (this.datamodel.curNum != tmp);
      }

      this.resetNum(isChange);

    },

    //重置当前值，由于数值不满足条件
    resetNum: function (isChange) {
      this.refresh();
      if (isChange) this.changed.call(this, this.datamodel.curNum);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    //这里需要做数据验证
    resetPropery: function () {
      if (this.datamodel.curNum > this.datamodel.max) {
        this.datamodel.curNum = this.datamodel.max;
      } else if (this.datamodel.curNum < this.datamodel.min) {
        this.datamodel.curNum = this.datamodel.min;
      }
    },

    addEvent: function ($super) {
      $super();
    }

  });


});

/*
与num组件一样，此类datamodel的方案是否会浪费资源，是否影响手机渲染，需要实际验证了
因为switch不太复杂，便抛弃完全render的做法
*/
define('UISwitch',['UIView', getAppUITemplatePath('ui.switch')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        checkedFlag: false,
        checkedClass: 'current'
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    changed: function (status) {
      console.log(status);
    },

    initElement: function () {
      this.el = this.$el;
      this.switchBar = this.$('.cui-switch-bg');
    },

    checked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
          return;
      }

      if (this.getStatus()) return;
      this.el.addClass('current');
      this.switchBar.addClass('current');
      this.datamodel.checkedFlag = true;
      this._triggerChanged();
    },

    unChecked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
        return;
      }

      if (!this.getStatus()) return;
      this.el.removeClass('current');
      this.switchBar.removeClass('current');
      this.datamodel.checkedFlag = false;
      this._triggerChanged();
    },

    _triggerChanged: function () {
      if (typeof this.changed == 'function') this.changed.call(this, this.getStatus());
    },

    //这里不以dom判断，以内置变量判断
    getStatus: function () {
      return this.datamodel.checkedFlag;
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
//        this.$el.addClass('cui-switch');
      });

      this.on('onShow', function () {
        _.flip(this.$el, 'left', $.proxy(function () {
          this.unChecked();
        }, this));

        _.flip(this.$el, 'right', $.proxy(function () {
          this.checked();
        }, this));

        _.flip(this.$el, 'tap', $.proxy(function () {
          if (this.getStatus()) {
            this.unChecked();
          } else {
            this.checked();
          }
          return;
        }, this));
      });

      this.on('onHide', function () {
        _.flipDestroy(this.$el);
      });
    }

  });


});


define('UIBubbleLayer',['UILayer', getAppUITemplatePath('ui.bubble.layer')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = true;

      this.needReposition = true;
      this.animateInClass = 'cm-fade-in';
      this.animateOutClass = 'cm-fade-out';

      this.datamodel = {
        scope: this,
        data: [],
        upClass: 'cm-pop--triangle-up',
        downClass: 'cm-pop--triangle-down',
        wrapperClass: 'cm-pop--border',
        curClass: 'active',
        itemStyleClass: '',
        needBorder: true,
        index: -1,
        dir: 'up'  //箭头方向默认值
      };

      this.addEvents({
        'click .cm-pop-list>li': 'clickAction'
      });

      this.onClick = function (data, index, el, e) {
        console.log(arguments);
        this.setIndex(index);
        var e = '';
      };

      this.width = null;

      //三角图标偏移量
      this.triangleLeft = null;
      this.triangleRight = null;

      //由于该组件的triggerEL处于头部每次都会重新渲染，这里保存的仅仅是一个映射，而且是无效的映射，所以这里需要重建映射关系
      //这里由于event参数已经过期，所以这层映射关系建立不起来咯，所以这里还是保存位置信息
      this.triggerEl = null;
      this.needAnimat = true;

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      this.onClick.call(this, data, i, el, e);
    },

    initElement: function () {
      this.el = this.$el;
      this.triangleEl = this.$('.icon-pop-triangle');
      this.windowWidth = $(window).width();
    },

    setIndex: function (i) {
      var curClass = this.datamodel.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.datamodel.data.length || i == this.datamodel.index) return;
      this.datamodel.index = i;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('.cm-pop-list li').removeClass(curClass);
      this.$('li[data-index="' + i + '"]').addClass(curClass);
    },

    //位置定位
    //此处如果设置width如果导致换行将引起定位出问题
    reposition: function () {
      if (!this.triggerEl) return;
      if (this.width) {
        this.el.css('width', this.width);
      }
      var offset = this.triggerEl.offset();

      //这里保留位置信息，防止triggerEl的映射丢失
      if (!this.triggerEl.offset)
        this.triggerEl.offset = offset;
      if (offset.width === 0 && this.triggerEl.offset) {
        offset = this.triggerEl.offset;
      }

      var step = 6, w = offset.width - step;
      var top = 0, left = 0, right;
      if (this.datamodel.dir == 'up') {
        top = (offset.top + offset.height + 8) + 'px';
      } else {
        top = (offset.top - this.el.offset().height - 8) + 'px';
      }

      left = (offset.left + 2) + 'px';


      if (offset.left + (parseInt(this.width) || w) > this.windowWidth) {
        this.el.css({
          width: this.width || w,
          top: top,
          right: '2px'
        });
      } else {
        this.el.css({
          width: this.width || w,
          top: top,
          left: left
        });
      }

      if (this.triangleLeft) {
        this.triangleEl.css({ 'left': this.triangleLeft, 'right': 'auto' });
      }
      if (this.triangleRight) {
        this.triangleEl.css({ 'right': this.triangleRight, 'left': 'auto' });
      }

    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
        this.mask.$el.addClass('cm-overlay--transparent');
        this.mask.$el.removeClass('cui-mask');

        this.$el.css({ position: 'absolute' });
      });
      this.on('onShow', function () {
        this.setzIndexTop(this.el);

      });
    }

  });

});

define('UITab',['UIView', getAppUITemplatePath('ui.tab')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.datamodel = {
        data: [],
        curClass: 'cui-tab-current',
        index: 0
      };

      this.events = {
        'click .cui-tab-mod>li': 'clickAction'
      };

      this.onChange = function (data) {

        console.log(arguments);
      };

    },

    //重置index与值的关系
    resetPropery: function () {
      if (this.datamodel.index < 0 || this.datamodel.index > this.datamodel.data.length) {
        this.datamodel.index = 0;
      }

      if (!this.datamodel.selectedKey) {
        this.datamodel.selectedKey = this.datamodel.data[this.datamodel.index].id;
        return;
      }

      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.selectedKey == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    initElement: function () {
      this.el = this.$('.cui-tab-current');
      this.tab = this.$('.cui-tab-scrollbar')
      this.tabs = this.$('li');

    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      var isChange = false;

      this.datamodel.selectedKey = i;
      this.setIndex(i);

    },

    setVal: function (v) {
      this.el = this.$('li[data-key="' + v + '"]');
      var index = this.el.attr('data-index');
      var d = this.datamodel.data[index];
      if (!d) { console.log('设置值有误'); return; }

      //如果当前值与设置的值不相等就change了 
      var isChange = this.datamodel.selectedKey == v;
      this.datamodel.selectedKey = v;

      this.tabs.removeClass(this.datamodel.curClass);
      this.el && this.el.addClass(this.datamodel.curClass);

      //三星手机渲染有问题，这里动态引起一次回流，这个逻辑需要加入到基类
      if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
        var width = this._tab.css('width');
        setTimeout($.proxy(function () {
          this._tab.css('width', width);
        }, this), 0);
      }

      if (isChange == false && typeof this.onChange == 'function') {
        this.onChange.call(this, d);
      }

    },

    getVal: function () {
      return this.datamodel.selectedKey;
    },

    setIndex: function (i) {
      //如果设置值无意义便不予关注
      if (i < 0 || i > this.datamodel.data.length - 1) return;
      this.setVal(this.datamodel.data[i].id);
    },

    getIndex: function () {
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.getVal() == this.datamodel.data[i].id) return i;
      }
      return -1;
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      //      this.on('onCreate', function () {
      //        this.$el.addClass('cui-loading');
      //      });

    }

  });


});

/*
待修复
1 设置step时候，在达到max值时候会有问题
2 设置step时候会导致滚动条不消失

*/
define('UIScroll',[], function () {

  var utils = (function () {
    var me = {};
    var _elementStyle = document.createElement('div').style;

    //获得需要兼容CSS3前缀
    var _vendor = (function () {
      var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
      var transform;
      var i = 0;
      var l = vendors.length;

      for (; i < l; i++) {
        transform = vendors[i] + 'ransform';
        if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
      }
      return false;
    })();

    //获取样式（CSS3兼容）
    function _prefixStyle(style) {
      if (_vendor === false) return false;
      if (_vendor === '') return style;
      return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }

    me.getTime = Date.now || function getTime() { return new Date().getTime(); };

    me.addEvent = function (el, type, fn, capture) {
      if (el[0] && el != window.top) el = el[0];
      el.addEventListener(type, fn, !!capture);
    };

    me.removeEvent = function (el, type, fn, capture) {
      if (el[0] && el != window.top) el = el[0];
      el.removeEventListener(type, fn, !!capture);
    };

    /*
    current：当前鼠标位置
    start：touchStart时候记录的Y（可能是X）的开始位置，但是在touchmove时候可能被重写
    time： touchstart到手指离开时候经历的时间，同样可能被touchmove重写
    lowerMargin：y可移动的最大距离，这个一般为计算得出 this.wrapperHeight - this.scrollerHeight
    wrapperSize：如果有边界距离的话就是可拖动，不然碰到0的时候便停止
    */
    me.momentum = function (current, start, time, lowerMargin, wrapperSize) {
      var distance = current - start,
		speed = Math.abs(distance) / time,
		destination,
		duration,
		deceleration = 0.0006;

      destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
      duration = speed / deceleration;

      if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }

      return {
        destination: Math.round(destination),
        duration: duration
      };

    };

    $.extend(me, {
      hasTouch: 'ontouchstart' in window
    });


    //我们暂时只判断touch 和 mouse即可
    $.extend(me.style = {}, {
      transform: _prefixStyle('transform'),
      transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
      transitionDuration: _prefixStyle('transitionDuration'),
      transitionDelay: _prefixStyle('transitionDelay'),
      transformOrigin: _prefixStyle('transformOrigin')
    });

    $.extend(me.eventType = {}, {
      touchstart: 1,
      touchmove: 1,
      touchend: 1,

      mousedown: 2,
      mousemove: 2,
      mouseup: 2
    });

    $.extend(me.ease = {}, {
      quadratic: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function (k) {
          return k * (2 - k);
        }
      },
      circular: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
        fn: function (k) {
          return Math.sqrt(1 - (--k * k));
        }
      },
      back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fn: function (k) {
          var b = 4;
          return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
      },
      bounce: {
        style: '',
        fn: function (k) {
          if ((k /= 1) < (1 / 2.75)) {
            return 7.5625 * k * k;
          } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
          } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
          } else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
          }
        }
      },
      elastic: {
        style: '',
        fn: function (k) {
          var f = 0.22,
		e = 0.4;

          if (k === 0) { return 0; }
          if (k == 1) { return 1; }

          return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
        }
      }
    });
    return me;
  })();

  function IScroll(opts) {
    this.wrapper = typeof opts.wrapper == 'string' ? $(opts.wrapper) : opts.wrapper;
    this.scroller = typeof opts.scroller == 'string' ? $(opts.scroller) : opts.scroller;
    if (!opts.wrapper[0] || !opts.scroller[0]) throw 'param error';

    this.swrapper = this.wrapper;
    this.wrapper = this.wrapper[0];
    this.scroller = this.scroller[0];

    //这个属性会被动态改变的，如果这里
    this.scrollerStyle = this.scroller.style;

    this.options = {
      //每次要求移动的步长
      step: false,
      //是否具有滚动条
      scrollbars: true,
      // 其实时期Y的位置
      startY: 0,
      preventDefault: true,

      scrollOffset: 0,

      //默认竖向滚动
      scrollType: 'y',

      //超出边界还原时间点
      bounceTime: 400,
      //超出边界返回的动画
      bounceEasing: utils.ease.circular,

      //超出边界时候是否还能拖动
      bounce: true,

      momentum: true,

      bindToWrapper: true,

      //当window触发resize事件60ms后还原
      resizePolling: 60,
      startX: 0,
      startY: 0
    };

    for (var i in opts) {
      this.options[i] = opts[i];
    }

    this.translateZ = ' translateZ(0)';

    this.x = 0;
    this.y = 0;
    this._events = {};

    //默认方向是向前
    this.dir = 'forward';

    //尺寸不过关便不要实例化了
    //    if (this.options.scrollType == 'x') {
    //      if (this.wrapper.clientWidth > this.scroller.clientWidth) return;
    //    } else {
    //      if (this.wrapper.clientHeight > this.scroller.clientHeight)   return;
    //    }

    this._init();

    //更新滚动条位置
    this.refresh();

    //更新本身位置
    this.scrollTo(this.options.startX, this.options.startY);

    this.enable();

  };

  IScroll.prototype = {
    _init: function () {
      this._initEvents();

      //初始化滚动条，滚动条此处需要做重要处理
      if (this.options.scrollbars) {
        this._initIndicator();
      }
    },
    refresh: function () {
      var rf = this.wrapper.offsetHeight; 	// Force reflow

      this.wrapperWidth = this.wrapper.clientWidth;
      this.scrollerWidth = this.scroller.offsetWidth;
      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;

      this.wrapperHeight = this.wrapper.clientHeight;
      this.scrollerHeight = this.scroller.offsetHeight;
      this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

      //增加偏移量概念
      this.maxScrollX = this.maxScrollX - this.options.scrollOffset
      this.maxScrollY = this.maxScrollY - this.options.scrollOffset;


      //处理步长问题
      //      if (this.options.step) {
      //        if (this.maxScrollX % this.options.step != 0) {
      //          this.maxScrollX = Math.round(this.maxScrollX / this.options.step) * this.options.step;
      //          var s = '';
      //        }
      //        if (this.maxScrollY % this.options.step != 0) {
      //          this.maxScrollY = Math.round(this.maxScrollY / this.options.step) * this.options.step;
      //        }
      //      }

      if (this.options.scrollType == 'y') {
        this.maxScrollX = 0;
      } else {
        this.maxScrollY = 0;
      }

      this.endTime = 0;

      this._execEvent('refresh');

      this.resetPosition();

    },
    _initEvents: function (remove) {
      var eventType = remove ? utils.removeEvent : utils.addEvent;
      var target = this.options.bindToWrapper ? this.wrapper : window;

      eventType(window, 'orientationchange', this);
      eventType(window, 'resize', this);

      if (utils.hasTouch) {
        eventType(this.wrapper, 'touchstart', this);
        eventType(target, 'touchmove', this);
        eventType(target, 'touchcancel', this);
        eventType(target, 'touchend', this);
      } else {
        eventType(this.wrapper, 'mousedown', this);
        eventType(target, 'mousemove', this);
        eventType(target, 'mousecancel', this);
        eventType(target, 'mouseup', this);
      }

      eventType(this.scroller, 'transitionend', this);
      eventType(this.scroller, 'webkitTransitionEnd', this);
      eventType(this.scroller, 'oTransitionEnd', this);
      eventType(this.scroller, 'MSTransitionEnd', this);
    },
    _start: function (e) {
      if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
        return;
      }

      var point = e.touches ? e.touches[0] : e, pos;
      this.initiated = utils.eventType[e.type];

      this.moved = false;

      this.distY = 0;

      //开启动画时间，如果之前有动画的话，便要停止动画，这里因为没有传时间，所以动画便直接停止了
      this._transitionTime();

      this.startTime = utils.getTime();

      //如果正在进行动画，需要停止，并且触发滑动结束事件
      if (this.isInTransition) {
        this.isInTransition = false;
        pos = this.getComputedPosition();
        var _x = Math.round(pos.x);
        var _y = Math.round(pos.y);

        //移动过去
        this._translate(_x, _y);
        this._execEvent('scrollEnd');

      }

      this.startX = this.x;
      this.startY = this.y;
      this.absStartX = this.x;
      this.absStartY = this.y;
      this.pointX = point.pageX;
      this.pointY = point.pageY;

      this._execEvent('beforeScrollStart');

      //解决三星问题
      if (this.options.preventDefault) {
        e.preventDefault();
      }

    },

    _move: function (e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }

      var point = e.touches ? e.touches[0] : e,
      deltaX = point.pageX - this.pointX,
      deltaY = point.pageY - this.pointY,
      timestamp = utils.getTime(),
      newX, newY,
      absDistX, absDistY;

      var x1 = this.x;
      var y1 = this.y;
      var x2 = this.x + deltaX
      var y2 = this.y + deltaY;

      var dir = Math.abs(deltaX) >= Math.abs(deltaY) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');

      this.pointX = point.pageX;
      this.pointY = point.pageY;

      this.distX += deltaX;
      this.distY += deltaY;
      absDistX = Math.abs(this.distX);
      absDistY = Math.abs(this.distY);

      // 如果一直按着没反应的话这里就直接返回了
      if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
        return;
      }

      if (this.options.scrollType == 'y') {
        if (this.options.preventDefault && (dir == 'up' || dir == 'down')) {
          e.preventDefault();
        }
        deltaX = 0;
      } else {
        if (this.options.preventDefault && (dir == 'left' || dir == 'right')) {
          e.preventDefault();
        }
        deltaY = 0;
      }

      this.flipDir = dir;

      newX = this.x + deltaX;
      newY = this.y + deltaY;

      if (newX > this.options.scrollOffset || newX < this.maxScrollX) {
        newX = this.options.bounce ? this.x + deltaX / 3 : newX > this.options.scrollOffset ? this.options.scrollOffset : this.maxScrollX;
      }

      if (newY > this.options.scrollOffset || newY < this.maxScrollY) {
        newY = this.options.bounce ? this.y + deltaY / 3 : newY > this.options.scrollOffset ? this.options.scrollOffset : this.maxScrollY;
      }

      if (!this.moved) {
        this._execEvent('scrollStart');
      }

      this.moved = true;

      //暂时只考虑input问题，有效再扩展
      var el = document.activeElement;
      if (el.nodeName.toLowerCase() == 'input') {
        el.blur();
        this.disable();
        setTimeout($.proxy(function () {
          this.enable();
        }, this), 250);
        return;
      }

      if (newX > this.x || newY > this.y) {
        this.dir = 'forward';
      } else {
        this.dir = 'back';
      }

      this._translate(newX, newY, true);

      //防止过于灵敏
      //      if (timestamp - this.startTime > 300) {
      //        this.startTime = timestamp;
      //        this.startX = this.x;
      //        this.startY = this.y;
      //      }


    },
    _end: function (e) {

      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }

      var point = e.changedTouches ? e.changedTouches[0] : e, momentumX,
      momentumY,
      duration = utils.getTime() - this.startTime,
      newX = Math.round(this.x),
      newY = Math.round(this.y),
      distanceX = Math.abs(newX - this.startX),
      distanceY = Math.abs(newY - this.startY),

      tdistanceX = Math.abs(newX - this.startX),
      tdistanceY = Math.abs(newY - this.startY),

      time = 0,
      easing = '';

      this.isInTransition = 0;
      this.initiated = 0;
      this.endTime = utils.getTime();

      if (this.resetPosition(this.options.bounceTime)) {
        return;
      }

      this.scrollTo(newX, newY);
      if (!this.moved) {

        //这里需要监听使用步长问题
        this._execEvent('scrollCancel');
        return;
      }

      if (this.options.momentum && duration < 300) {
        momentumX = utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0);
        momentumY = utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0);
        newX = momentumX.destination;
        newY = momentumY.destination;

        if (this.options.scrollType == 'y') {
          time = Math.max(0, momentumY.duration);
        } else {
          time = Math.max(momentumX.duration, 0);
        }
        this.isInTransition = 1;
      }

      tdistanceX = Math.abs(newX - this.startX);
      tdistanceY = Math.abs(newY - this.startY);

      //处理步长
      //这块处理有问题，需要重新写*******************************
      if (this.options.step) {
        var x = newX, y = newY;
        var left = Math.abs(x);
        var top = Math.abs(y);

        var flag1 = x > 0 ? 1 : -1;
        var flag2 = y > 0 ? 1 : -1;

        var difStepX = this.options.step - (tdistanceX % this.options.step);
        var difStepY = this.options.step - (tdistanceY % this.options.step);

        //        console.log('left: ' + left + ', newX: ' + +newX + ', distanceX: ' + tdistanceX + ', step: ' + this.options.step + ', difStepX: ' + difStepX + ', scrollOffset: ' + this.options.scrollOffset + ', maxX: ' + this.maxScrollX + ', minX: ' + this.options.scrollOffset);

        if (this.dir == 'forward') {
          if (x > 0) {
            x = left + difStepX;
          } else {
            x = left - difStepX;
          }
          if (y > 0) {
            y = top + difStepY;
          } else {
            y = top - difStepY;
          }
        } else {

          if (x > 0) {
            x = left - difStepX;
          } else {
            x = left + difStepX;
          }
          if (y > 0) {
            y = top - difStepY;
          } else {
            y = top + difStepY;
          }
        }

        if (x % this.options.step != 0) {
          x = Math.round((x / this.options.step)) * this.options.step;
        }

        if (y % this.options.step != 0) {
          y = Math.round((y / this.options.step)) * this.options.step;
        }

        x = x * flag1;
        y = y * flag2;

        time = this.options.stepTime || 200;
        if ((this.options.scrollType == 'x' && tdistanceX < 50) || (this.options.scrollType == 'y' && tdistanceY < 50)) time = 100;

        newX = x;
        newY = y;

        //        console.log('newX: ' + newX + '===' + newX / this.options.step);

        easing = this.options.bounceEasing;
      }

      if (newX != this.x || newY != this.y) {
        if (newX > this.options.scrollOffset || newX < this.maxScrollX || newY > this.options.scrollOffset || newY < this.maxScrollY) {
          easing = utils.ease.quadratic;
        }
        if (time == 0) time = 1;

        this.scrollTo(newX, newY, time, easing);
        return;
      }

      this._execEvent('scrollEnd');
    },

    _resize: function () {
      var that = this;

      clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(function () {
        that.refresh();
      }, this.options.resizePolling);
    },

    _transitionTimingFunction: function (easing) {
      this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

      this.indicator && this.indicator.transitionTimingFunction(easing);
    },

    //开始或者停止动画
    _transitionTime: function (time) {
      time = time || 0;
      this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

      //滚动条，我们这里只会出现一个滚动条就不搞那么复杂了
      this.indicator && this.indicator.transitionTime(time);

    },

    getComputedPosition: function () {
      var matrix = window.getComputedStyle(this.scroller, null), x, y;

      matrix = matrix[utils.style.transform].split(')')[0].split(', ');
      x = +(matrix[12] || matrix[4]);
      y = +(matrix[13] || matrix[5]);

      return { x: x, y: y };
    },

    _initIndicator: function () {
      //滚动条
      var el = createDefaultScrollbar((this.options.scrollType == 'y' ? 'x' : 'y'));

      this.wrapper.appendChild(el);
      this.indicator = new Indicator(this, { el: el, scrollType: this.options.scrollType });

      this.on('scrollEnd', function () {
        this.indicator.fade();
      });

      var scope = this;
      this.on('scrollCancel', function () {
        scope.indicator.fade();
      });

      this.on('scrollStart', function () {
        scope.indicator.fade(1);
      });

      this.on('beforeScrollStart', function () {
        scope.indicator.fade(1, true);
      });

      this.on('refresh', function () {
        scope.indicator.refresh();
      });

    },

    //移动x，y这里比较简单就不分离y了
    _translate: function (x, y, isStep) {

      if (this.options.scrollType == 'y') {
        x = 0;
      } else {
        y = 0;
      }

      this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

      this.x = x;
      this.y = y;

      if (this.options.scrollbars) {
        this.indicator.updatePosition();
      }

    },

    resetPosition: function (time) {
      var x = this.x,
		y = this.y;

      time = time || 0;

      if (this.options.scrollType == 'x') {
        if (this.x > this.options.scrollOffset) {
          x = this.options.scrollOffset;
        }
        if (this.x < this.maxScrollX) {
          x = this.maxScrollX;
        }
      } else {
        if (this.y > this.options.scrollOffset) {
          y = this.options.scrollOffset;
        }
        if (this.y < this.maxScrollY) {
          y = this.maxScrollY;
        }
      }

      if ((this.options.scrollType == 'x' && x == this.x) || (this.options.scrollType == 'y' && y == this.y)) {
        return false;
      }

      this.scrollTo(x, y, time, this.options.bounceEasing);
      return true;
    },

    //移动
    scrollTo: function (x, y, time, easing) {
      easing = easing || utils.ease.circular;


      this.isInTransition = time > 0;

      if (!time || easing.style) {
        this._transitionTimingFunction(easing.style);
        this._transitionTime(time);
        this._translate(x, y);
      }
    },

    //统一的关闭接口
    disable: function () {
      this.enabled = false;
    },
    //统一的open接口
    enable: function () {
      this.enabled = true;
    },

    on: function (type, fn) {
      if (!this._events[type]) {
        this._events[type] = [];
      }

      this._events[type].push(fn);
    },

    _execEvent: function (type) {
      if (!this._events[type]) {
        return;
      }

      var i = 0,
			l = this._events[type].length;

      if (!l) {
        return;
      }

      for (; i < l; i++) {
        this._events[type][i].call(this);
      }
    },
    destroy: function () {
      this.TIMERRES && clearInterval(this.TIMERRES);
      this._initEvents(true);
      this._execEvent('destroy');
      this.indicator && this.indicator.destroy();

    },

    _transitionEnd: function (e) {
      if (e.target != this.scroller || !this.isInTransition) {
        return;
      }

      this._transitionTime();

      this._execEvent('animatEnd');

      if (!this.resetPosition(this.options.bounceTime)) {
        this.isInTransition = false;
        this._execEvent('scrollEnd');
      }
    },

    //事件具体触发点
    handleEvent: function (e) {
      switch (e.type) {
        case 'touchstart':
        case 'mousedown':
          this._start(e);
          break;
        case 'touchmove':
        case 'mousemove':
          this._move(e);
          break;
        case 'touchend':
        case 'mouseup':
        case 'touchcancel':
        case 'mousecancel':
          this._end(e);
          break;
        case 'orientationchange':
        case 'resize':
          this._resize();
          break;
        case 'transitionend':
        case 'webkitTransitionEnd':
        case 'oTransitionEnd':
        case 'MSTransitionEnd':
          this._transitionEnd(e);
          break;
      }
    }

  };

  function createDefaultScrollbar(direction) {
    var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

    scrollbar.style.cssText = 'position:absolute;z-index:9999';
    indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';

    if (direction == 'y') {
      scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
      indicator.style.height = '100%';
    } else {
      scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
      indicator.style.width = '100%';
    }

    scrollbar.style.cssText += ';overflow:hidden';

    scrollbar.appendChild(indicator);

    return scrollbar;
  }

  function Indicator(scroller, opts) {
    this.wrapper = typeof opts.el == 'string' ? document.querySelector(opts.el) : opts.el;
    this.indicator = this.wrapper.children[0];
    this.scrollType = opts.scrollType;

    this.wrapperStyle = this.wrapper.style;
    this.indicatorStyle = this.indicator.style;
    this.scroller = scroller;

    this.sizeRatioX = 1;
    this.sizeRatioY = 1;
    this.maxPosX = 0;
    this.maxPosY = 0;

    this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
    this.wrapperStyle[utils.style.transitionDuration] = '0ms';
    this.wrapperStyle.opacity = '0';
  }

  Indicator.prototype = {
    transitionTime: function (time) {
      time = time || 0;
      this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';
    },
    transitionTimingFunction: function (easing) {
      this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
    },
    refresh: function () {

      this.transitionTime();

      var r = this.wrapper.offsetHeight; // force refresh

      if (this.scrollType == 'y') {
        this.wrapperHeight = this.wrapper.clientHeight;

        this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
        this.indicatorStyle.height = this.indicatorHeight + 'px';

        this.maxPosY = this.wrapperHeight - this.indicatorHeight;
        this.sizeRatioY = (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
      } else {

        this.wrapperWidth = this.wrapper.clientWidth;

        this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
        this.indicatorStyle.width = this.indicatorWidth + 'px';

        this.maxPosX = this.wrapperWidth - this.indicatorWidth;

        this.sizeRatioX = (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
      }

      this.updatePosition();
    },
    destroy: function () {
      //remove bug
      $(this.wrapper).remove();
    },
    updatePosition: function () {
      var x = (this.scrollType == 'x') && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			y = (this.scrollType == 'y') && Math.round(this.sizeRatioY * this.scroller.y) || 0;

      this.x = x;
      this.y = y;

      //不需要兼容方式了
      this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;

    },
    fade: function (val, hold) {
      if (hold && !this.visible) {
        return;
      }
      var scope = this;

      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;

      var time = val ? 250 : 500,
			delay = val ? 0 : 300;

      val = val ? '1' : '0';

      this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

      this.fadeTimeout = setTimeout((function (val) {
        scope.wrapperStyle.opacity = val;
        scope.visible = +val;
      })(val), delay);
    }
  };

  IScroll.utils = utils;

  return IScroll;

});
define('UIScrollLayer',['UILayer', getAppUITemplatePath('ui.scroll.layer'), 'UIScroll'], function (UILayer, template, UIScroll) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        title: '',
        btns: [
          { name: 'cancel', className: 'cui-btns-cancel' },
          { name: 'ok', className: 'cui-btns-ok' }
        ]
      };

      //事件机制
      this.events = {
        'click .cui-btns-ok': 'okAction',
        'click .cui-btns-cancel': 'cancelAction',
        'click .cui-top-close': 'closeAction'
      };

      //body内部需要装载的dom结构，可能是包装过的dom结构
      this.html = null;

      this.html = '';

      this.maxHeight = 300;
      this.sheight = 0;
      this.scrollOpts = {};

    },

    okAction: function () {
      console.log('ok');
    },

    cancelAction: function () {
      console.log('cancel');
    },

    closeAction: function () {
      this.hide();
    },

    initElement: function () {
      this.swrapper = this.$('.cui-bd');
      this.box_wrapper = this.$('.cui-pop-box');
    },

    initSize: function () {
      if (!this.html) return;

      this.html = $(this.html);

      if (this.html.length > 1) this.html = $('<div></div>').append(this.html);

      this.html.css({
        'background-color': 'white',
//        'width': '100%',
        'position': 'absolute'
      });

      this.swrapper.append(this.html);
      this._initWrapperSize();
    },

    _initWrapperSize: function () {
      var h = 0;
      this.sheight = this.html.height()
      h = Math.min(this.sheight, this.maxHeight);
      this.swrapper.height(h);

      if (this.width)
        this.box_wrapper.width(this.width);

    },

    //内部高度变化时要刷新操作
    refreshHeight: function () {
      this._initWrapperSize();
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
      this._initScroll();
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    _initScroll: function () {
      if (this.scroll && this.scroll.destory) this.scroll.destory();
      if (this.sheight >= this.maxHeight) {
        this.scrollOpts.wrapper = this.swrapper;
        this.scrollOpts.scroller = this.html;
        this.scroll = new UIScroll(this.scrollOpts);
      }
    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();
      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });

    }

  });


});

define('UIRadioList',['UILayer', getAppUITemplatePath('ui.radio.list'), 'UIScroll'], function (UILayer, template, UIScroll) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        title: '标题',
        data: [],
        selectId: null,
        index: 1
      };

      this.itemNum = this.datamodel.data.length;

      this.displayNum = 5;

      this.scroll = null;

      this.events = {
        'click .cui-select-view> li': 'clickAction'
      };

      this.onClick = function (data, index, e) {
        console.log(data);
      };

    },

    //要求唯一标识，根据id确定index
    resetPropery: function ($super) {
      $super();

      this._resetNum();
      this._resetIndex();
    },

    _resetIndex: function () {
      if (!this.datamodel.selectId) return;
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.selectId == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    _resetNum: function () {
      this.displayNum = this.displayNum % 2 == 0 ? this.displayNum + 1 : this.displayNum;
      this.itemNum = this.datamodel.data.length;

    },

    clickAction: function (e) {
      var el = $(e.currentTarget)
      var i = el.attr('data-index');
      this.setIndex(i);
      if (this.onClick) this.onClick.call(this, this.getSelected(), i, e);

    },

    setId: function (id) {
      if (!id) return;
      var index = -1, i, len;
      for (i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i].id == id) { index = i; break; }
      }
      if (index == -1) return;
      this.datamodel.selectId = id;
      this.datamodel.index = index;
      this.setIndex(index);
    },

    //动态更新数据
    setDatamodel: function (data) {
      _.extend(this.datamodel, data);
      this.itemNum = this.datamodel.data.length;
      this.refresh();
    },

    getId: function () {
      return this.datamodel.selectId;
    },

    setIndex: function (i, position) {
      i = parseInt(i);
      if (i < 0 || i >= this.datamodel.data.length) return;
      this.datamodel.index = i;
      this.datamodel.selectId = this.datamodel.data[i].id;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('li').removeClass('current');
      this.$('li[data-index="' + i + '"]').addClass('current');
      if (position) this._position();
    },

    getIndex: function () {
      return this.datamodel.index;
    },

    getSelected: function () {
      return this.datamodel.data[this.datamodel.index];
    },

    initElement: function () {
      this.swrapper = this.$('.cui-bd');
      this.scroller = this.$('.cui-select-view');

    },

    initSize: function () {
      var num = this.displayNum
      this.sheight = this.scroller.height();
      this.itemHeight = parseInt(this.sheight / this.itemNum);
      if (num > this.itemNum) num = this.itemNum;
      this.swrapper.height(this.itemHeight * num);
    },

    _position: function () {
      if (!this.scroll) return;
      var index = this.datamodel.index, _top;
      if (this.itemNum - index < this.displayNum) index = this.itemNum - this.displayNum;

      _top = (this.itemHeight * index) * (-1);
      this.scroll.scrollTo(0, _top);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        if (this.scroll && this.scroll.destory) this.scroll.destory();
        if (this.itemNum > this.displayNum) {
          this.scroll = new UIScroll({
            wrapper: this.swrapper,
            scroller: this.scroller
          });
          this._position();
        }

      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });
    }
  });

});

define('UISelect',['UIView', getAppUITemplatePath('ui.select'), 'UIScroll'], function (UIView, template, UIScroll) {
  /*
  该组件使用时，其父容器一定是显示状态，如果不是显示状态，高度计算会失效
  */

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        curClass: 'current',
        data: [],
        id: null,
        index: 0
      };

      this.animatTime = 100;

      this.stepTime = 150;

      this.itemNum = this.datamodel.data.length;

      //这里便只有一个接口了
      this.displayNum = 5;

      //选择时候的偏移量
      this.scrollOffset = 0;

      //滚动对象
      this.scroll = null;

      this.changed = function (item) {
        console.log(item);
      };

    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this._resetNum();
      this._resetIndex();
    },

    _resetIndex: function () {
      if (!this.datamodel.id) return;
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.id == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    _resetNum: function () {
      this.displayNum = this.displayNum % 2 == 0 ? this.displayNum + 1 : this.displayNum;
      this.itemNum = this.datamodel.data.length;
    },

    initElement: function () {

      //几个容器的高度必须统一
      this.swrapper = this.$el;
      this.scroller = this.$('.ul-list');
    },

    initSize: function () {
      //      this.sheight = Math.max(this.scroller.height(), this.scroller[0].scrollHeight);
      //      this.sheight =  this.scroller.height() 
      //      this.itemHeight = parseInt(this.sheight / this.itemNum);

      //偶尔不能正确获取高度，这里要处理
      //      if (this.itemHeight == 0) {
      this.itemHeight = parseInt(window.getComputedStyle && getComputedStyle(this.scroller.find('li').eq(0)[0]).height);
      this.scroller.height(this.itemHeight * this.itemNum);
      //      }
      this.swrapper.height(this.itemHeight * this.displayNum);
      this.scrollOffset = ((this.displayNum - 1) / 2) * (this.itemHeight);
    },

    //修正位置信息
    adjustPosition: function (hasAnimate) {
      if (!this.scroll) return;
      if (this.datamodel.index < 0) this.datamodel.index = 0
      if (this.datamodel.index > this.itemNum - 1) this.datamodel.index = this.itemNum - 1;

      var index = this.datamodel.index, _top, time = 0;
      //index数据验证
      _top = (this.itemHeight * index) * (-1) + this.scrollOffset;
      if (hasAnimate) time = this.animatTime;
      this.scroll.scrollTo(0, _top, time);
    },

    _initScroll: function () {
      if (this.scroll) {
        this.scroll.refresh();
        return;
      }

      this.scroll = new UIScroll({
        scrollbars: false,
        scrollOffset: this.scrollOffset,
        step: this.itemHeight,
        wrapper: this.swrapper,
        bounceTime: 200,
        scroller: this.scroller

      });

      this.scroll.on('scrollEnd', $.proxy(function () {
        this.setIndex(this.getIndexByPosition(), true)
      }, this));

      //为了解决鼠标离屏幕时导致的问题
      this.scroll.on('scrollCancel', $.proxy(function () {
        this.setIndex(this.getIndexByPosition(), false)
      }, this));

    },

    reload: function (datamodel) {
      if (typeof datamodel == 'object')
        if (datamodel instanceof Array) this.datamodel.data = datamodel;
        else {
          _.extend(this.datamodel, datamodel);
        }
      if (this.scroll) {
        this.scroll.destroy();
        this.scroll = null;
      }

      //执行reload的话，数据源便发生了变化
      this._dataChanged = true;

      this.refresh();
    },

    //检测当前选项是否可选，首次不予关注
    checkDisable: function (dir) {
      dir = dir || 'down'; //默认向下搜索
      var isFind = false, index = this.datamodel.index;
      if (this.datamodel.data[index] && (typeof this.datamodel.data[index].disabled != 'undefined' && this.datamodel.data[index].disabled == false)) {
        //向下的情况
        if (dir == 'up') {
          this.datamodel.index = this._checkSelectedDown(index);
          if (typeof this.datamodel.index != 'number') this.datamodel.index = this._checkSelectedUp(index);
        } else {
          this.datamodel.index = this._checkSelectedUp(index);
          if (typeof this.datamodel.index != 'number') this.datamodel.index = this._checkSelectedDown(index);
        }
      }
      if (typeof this.datamodel.index != 'number') this.datamodel.index = index;

    },

    /**
    * @class _checkSelectedUp
    * @param index {int}    索引
    * @description 向上搜索
    */
    _checkSelectedUp: function (index) {
      var isFind = false;
      for (var i = index; i != -1; i--) {
        if (this.datamodel.data[i] && (typeof this.datamodel.data[i].disabled == 'undefined' || this.datamodel.data[i].disabled == true)) {
          index = i;
          isFind = true;
          break;
        }
      }
      return isFind ? index : null;
    },

    /**
    * @class _checkSelectedDown
    * @param index {int}    索引
    * @description 向下搜索
    */
    _checkSelectedDown: function (index) {
      var isFind = false;
      for (var i = index, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i] && (typeof this.datamodel.data[i].disabled == 'undefined' || this.datamodel.data[i].disabled == true)) {
          index = i;
          isFind = true;
          break;
        }
      }
      return isFind ? index : null
    },

    //这里要处理不可选的状况
    /*
    这段逻辑比较复杂，处理的逻辑较多
    1 每次赋值时候判断是否改变，改变需要触发changed事件
    2 每次赋值还得判断当前选项是否是disabled的，如果是disabled的话还得重置index
    3 以上逻辑会加重changed触发事件以及重新设置index的复杂度

    */
    setIndex: function (i, noPosition, noEvent) {
      if (typeof noPosition == 'undefined' && i == this.datamodel.index) noPosition = true;
      var tmpIndex = i;
      var tmpIndex2;

      //index值是否改变
      var isChange = this.datamodel.index != i;
      var dir = i > this.datamodel.index ? 'up' : 'down';

      i = parseInt(i);
      if (i < 0 || i >= this.itemNum) return;

      tmpIndex2 = this.datamodel.index;

      this.datamodel.index = i;
      this.checkDisable(dir);

      //被改变过了
      if (tmpIndex2 != this.datamodel.index) {
        isChange = true;
      } else {
        isChange = false;
      }

      if (tmpIndex != this.datamodel.index) {
        noPosition = false;
      }

      if (!noPosition) this.adjustPosition(true);
      this.resetCss();

      //如果数据源发生变化一定会执行changed事件，否则一定会判断原有逻辑
      if (this._dataChanged) {
        this.triggerChangedAction();
        this._dataChanged = false;
      } else {
        if (noEvent !== true && isChange) this.triggerChangedAction();
      }
    },

    //触发change事件
    triggerChangedAction: function () {
      this.changed && this.changed.call(this, this.getSelected());
    },

    resetCss: function () {
      this.$('li').removeClass('current');
      this.$('li[data-index="' + this.datamodel.index + '"]').addClass('current');
    },

    resetIndex: function () {
      this.setIndex(this.datamodel.index, true, true);
    },

    getIndex: function () {
      return this.datamodel.index;
    },

    setId: function (id) {
      if (!id) return;
      var index = -1, i, len;
      for (i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i].id == id) { index = i; break; }
      }
      if (index == -1) return;
      this.datamodel.index = index;
      this.setIndex(index, false);
    },

    getId: function () {
      return this.getSelected().id;
    },

    getSelected: function () {
      return this.datamodel.data[this.datamodel.index];
    },

    //根据位置信息重新设置当前选项
    getIndexByPosition: function () {
      var pos = this.scroll.y - this.scrollOffset;
      var index = Math.abs(pos) / this.itemHeight;
      return Math.round(index);
    },

    initialize: function ($super, opts) {
      $super(opts);

    },

    addEvent: function ($super) {
      $super();

      this.on('onCreate', function () {
        this.$el.addClass('cui-roller-bd');
        this.$el.addClass('cui-roller');

      });

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();

        this.adjustPosition();
        this.resetCss();
        //防止初始化定义index为不可选index
        this.resetIndex();

      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });
    }

  });


});

/*
对select组件的使用，当前最复杂的组件

*/
define('UIGroupSelect',['UILayer', getAppUITemplatePath('ui.group.select'), 'UISelect'], function (UILayer, template, UISelect) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.scrollCreated = false;

      this.datamodel = {
        title: 'scrollLayer',
        tips: 'tips',
        btns: [
          { name: '取消', className: 'cui-btns-cancel' },
          { name: '确定', className: 'cui-btns-ok' }
        ]
      };

      this.data = [];
      this.indexArr = [0, 0, 0];
      this.idArr = [];
      this.scrollArr = [];
      this.changedArr = [
        function (item) {
        },
        function (item) {
        },
        function (item) {
        }
      ];

      this.onOkAction = function (items) {

      };

      this.onCancelAction = function (items) {
        this.hide();
      };

      //这里便只有一个接口了
      this.displayNum = 5;

      this.events = {
        'click .cui-btns-ok': 'okAction',
        'click .cui-btns-cancel': 'cancelAction'
      };

    },

    okAction: function (e) {
      var items = [];
      for (i = 0, len = this.scrollArr.length; i < len; i++) {
        items.push(this.scrollArr[i].getSelected());
      }
      this.onOkAction.call(this, items);
    },

    cancelAction: function (e) {
      var items = [];
      for (i = 0, len = this.scrollArr.length; i < len; i++) {
        items.push(this.scrollArr[i].getSelected());
      }
      this.onCancelAction.call(this, items);
    },

    initElement: function () {
      this.scrollWrapper = this.$('.cui-roller');
      this.tips = this.$('.cui-roller-tips');
    },


    _initScroll: function () {
      if (this.scrollCreated) return;
      this.scrollCreated = true;
//      this._destroyScroll();
      var i, len, item, changeAction;
      for (i = 0, len = this.data.length; i < len; i++) {
        item = this.data[i];
        changeAction = this.changedArr[i] || function () { };
        this.scrollArr[i] = new UISelect({
          datamodel: {
            data: item,
            index: this.indexArr[i],
            id: this.idArr[i]
          },
          displayNum: this.displayNum,
          changed: $.proxy(changeAction, this),
          wrapper: this.scrollWrapper
        });

        //纯粹业务需求
        if (i == 0 && len == 3) {
          this.scrollArr[i].on('onShow', function () {
            this.$el.addClass('cui-flex2');
          });
        }

        this.scrollArr[i].show();
      }
    },

    //缺少接口
    setTips: function (msg) {
      this.datamodel.tips = msg;
      this.tips.html(msg);
    },

    _destroyScroll: function () {
      var i, len;
      for (i = 0, len = this.data.length; i < len; i++) {
        if (this.scrollArr[i]) {
          this.scrollArr[i].destroy();
          this.scrollArr[i] = null;
        }
      }
      this.scrollCreated = false;
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this._initScroll();

      }, 1);

      this.on('onHide', function () {
//        this._destroyScroll();

      }, 1);

    }

  });

});

/*
getFilterList这块需要重新处理，不然事件会丢失
*/
define('UIGroupList',['UIView', getAppUITemplatePath('ui.group.list')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.template = template;

      this.datamodel = {
        data: [],
        filter: 'name'
      };

      this.addEvents({
        'click .cui-city-t': 'groupAction',
        'click .cui-city-n>li': 'itemAction'
      });

      this.onGroupClick = function (index, items, e) {
      };

      this.onItemClick = function (item, groupIndex, index, e) {
        console.log(arguments);
      };
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var gindex = el.attr('data-group');
      var index = el.attr('data-index');
      var item = this.datamodel.data[gindex].data[index];

      if (this.onItemClick) this.onItemClick.call(this, item, gindex, index, e);
    },

    groupAction: function (e) {
      var el = $(e.currentTarget).parent();
      var index = el.attr('data-groupindex');
      var items = this.datamodel.data[index];

      if (el.hasClass('cui-arrow-open')) {
        this.closeGroup(index);
      } else {
        this.openGroup(index);
      }

      if (this.onGroupClick) this.onGroupClick.call(this, index, items, e);
    },

    getFilterList: function (key) {
      var list = this.$('li[data-filter*="' + key + '"]');
      return list.clone(); ;
    },

    openGroup: function (i) {
      this._switchStatus(i, 'cui-arrow-close', 'cui-arrow-open')
    },

    closeGroup: function (i) {
      this._switchStatus(i, 'cui-arrow-open', 'cui-arrow-close')
    },

    _switchStatus: function (i, cls1, cls2) {
      if (typeof i == 'undefined') {
        this.groups.removeClass(cls1);
        this.groups.addClass(cls2);
        return;
      }
      var el = this.$('li[data-groupindex="' + i + '"]')
      el.addClass(cls2);
      el.removeClass(cls1);
    },

    initElement: function () {
      this.groups = this.$('.cui-city-itmes>li');
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});


define('UICalendar',['UIView', getAppUITemplatePath('ui.calendar')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.dateObj = new Date();

      //阳历节日
      this.solarHoliday = {
        '0101': '元旦',
        '0214': '情人节',
        '0308': '妇女节',
        '0312': '植树节',
        '0314': '白情',
        '0401': '愚人节',
        '0405': '清明',
        '0501': '劳动节',
        '0504': '青年',
        '0531': '无烟',
        '0601': '儿童',
        '0910': '教师',
        '1001': '国庆',
        '1225': '圣诞节'
      };

      //阴历节日
      this.lunarHoliday = {
        '20150218': '除夕',
        '20150219': '春节',
        '20150305': '元宵',
        '20150405': '清明',
        '20150620': '端午',
        '20150820': '七夕',
        '20150828': '中元',
        '20150927': '中秋',
        '20151021': '重阳',

        '20160207': '除夕',
        '20160208': '春节',
        '20160222': '元宵',
        '20160404': '清明',
        '20160609': '端午',
        '20160809': '七夕',
        '20160817': '中元',
        '20160915': '中秋',
        '20161009': '重阳',

        '20170127': '除夕',
        '20170128': '春节',
        '20170211': '元宵',
        '20170404': '清明',
        '20170530': '端午',
        '20170828': '七夕',
        '20170905': '中元',
        '20171004': '中秋',
        '20171028': '重阳',

        '20180215': '除夕',
        '20180216': '春节',
        '20180302': '元宵',
        '20180405': '清明',
        '20180618': '端午',
        '20180817': '七夕',
        '20180825': '中元',
        '20180924': '中秋',
        '20181017': '重阳'

      };

      //特殊时刻
      this.specialDates = false;

      //要求必须要传入日期对象
      this.datamodel = {
        scope: this,
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        displayMonthNum: 5,
        curTime: (new Date(this.dateObj.getFullYear(), this.dateObj.getMonth(), this.dateObj.getDate())).getTime(),

        //当前选择的日期
        selectDate: null,
        //分割月之间的显示
        MonthClapFn: function (year, month) {
          month = month + 1;
          return year + '年' + (month) + '月';
        },
        //具体显示项目定制化
        dayItemFn: function (year, month, day, dateObj, difftime) {

          var dayObj = {
            day: day
          };
          var dayStrArr = [];
          var _solarHoliday = _.dateUtil.formatNum(month + 1) + _.dateUtil.formatNum(day);
          var _lunarHoliday = year.toString() + _.dateUtil.formatNum(month + 1) + _.dateUtil.formatNum(day);

          //处理日
          if (difftime == 0) {
            dayObj.day1 = '今天';
          } else if (difftime / 3600000 == 24) {
            dayObj.day1 = '明天';
          } else if (difftime / 3600000 == 48) {
            dayObj.day1 = '后天';
          }

          //处理节日
          if (this.solarHoliday[_solarHoliday]) {
            dayObj.solarHoliday = this.solarHoliday[_solarHoliday];
          }

          //阴历节日
          if (this.lunarHoliday[_lunarHoliday]) {
            dayObj.lunarHoliday = this.lunarHoliday[_lunarHoliday];
          }

          //处理特殊标志
          if (this.specialDates) {
            //默认不处理特殊标志，但是阴历需要处理
          }

          dayStrArr[0] = '<em>' + (dayObj.day1 || dayObj.day) + '</em>';

          if (dayObj.solarHoliday || dayObj.lunarHoliday) {
            dayStrArr[1] = '<i>' + (dayObj.lunarHoliday || dayObj.solarHoliday) + '</i>';
          }

          if (this.dayItemAction) {
            return this.dayItemAction.call(this, dayObj, year, month, day, dateObj, difftime);
          }
          else return dayStrArr.join('');
        }
      };

      this.dayItemAction = null;

      this.events = {
        'click .cui_calendar_item ': 'itemAction'
      };

      this.onItemClick = function (date, el, e) {
        console.log(arguments);
      };

    },

    addDisplayMonth: function (num) {
      this.datamodel.displayMonthNum = this.datamodel.displayMonthNum + num;
      this.refresh();
    },

    //操作某一日期
    handleDay: function (selectorDay, callback) {
      var dayStr = selectorDay, dayArr = [], el;
      if (_.isString(selectorDay) && selectorDay.split('-').length == 3) {
        el = this.$('li[data-date="' + selectorDay + '"]');
        if (el[0] && _.isFunction(callback)) {
          callback.call(this, el);
        }
      }
    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this.datamodel.year = this.dateObj.getFullYear();
      this.datamodel.month = this.dateObj.getMonth();
      //结束日期
      this.datamodel.endDate = new Date(this.datamodel.year, this.datamodel.month + this.datamodel.displayMonthNum, 0);
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      if (el.hasClass('cui_cld_daypass')) return;
      var date = el.attr('data-date');
      date = date.split('-');
      if (date.length != 3) return false;

      date = new Date(date[0], date[1], date[2]);

      if (this.onItemClick) this.onItemClick.call(this, date, el, e);
    },

    initElement: function () {
      this.weekDay = this.$('.cui_cldweek');
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});

define('UISlider',['UIView', getAppUITemplatePath('ui.slider'), 'UIScroll'], function (UIView, template, UIScroll) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.template = template;

      this.datamodel = {
        //当前选择id
        key: this.id,
        //滚动层的class，感觉没有意义
        className: '',
        curClass: 'current',
        data: [],
        //索引，内部以此为准
        index: 0
      };

      this.itemNum = 0;
      this.displayNum = 3;
      this.animatTime = 100;
      this.momentum = true;

      //是否需要循环功能
      this.needLoop = false;

      //该组件一定要设置宽高
      this.itemWidth = 0;
      this.itemHeight = 0;
      this.scrollWidth = 0;

      //不需要包裹层
      this.needRootWrapper = false;

      //选择时候的偏移量
      this.scrollOffset = 0;

      //滚动对象
      this.scroll = null;

      this.events = {
        'click .js_scroller>li': 'itemClickAction'

      };

      this.changed = function (item) {
        //        console.log(item);
      };

      this.itemClick = function (item) {
        //        console.log(item);
      };

    },

    //重新父类创建根节点方法
    //    createRoot: function (html) {
    //      this.$el = $(html).hide().attr('id', this.id);
    //    },

    itemClickAction: function (e) {
      var el = $(e.currentTarget);
      var index = el.attr('data-index');
      this.setIndex(index);
      this.itemClick.call(this, this.getSelected());
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    resetPropery: function () {
      this._resetLoop();
      this._resetNum();
      this._resetIndex();
    },

    _resetLoop: function () {
      if (!this.needLoop) return;
      this.datamodel.firstLoopItem = $.extend({}, this.datamodel.data[this.datamodel.data.length - 1], true);
      this.datamodel.lastLoopItem = $.extend({}, this.datamodel.data[0], true);
    },

    //这里差一个index值判断**************************
    _resetIndex: function () {
      if (!this.datamodel.id) return;
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.id == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    _resetNum: function () {
      //      this.displayNum = this.displayNum % 2 == 0 ? this.displayNum + 1 : this.displayNum;
      this.itemNum = this.datamodel.data.length;
    },

    initElement: function () {

      //几个容器的高度必须统一
      this.swrapper = this.$el;
      this.scroller = this.$('.js_scroller');
    },

    initSize: function () {
      var item = this.scroller.find('li').eq(0);
      var itemOffset = item.offset();
      var parent = this.$el.parent();
      var ph = (parent[0] && parent[0].clientHeight) || parent.height();
      var _itemNum = this.needLoop ? this.itemNum + 2 : this.itemNum;
      this.wrapeWidth = (this.swrapper[0] && this.swrapper[0].clientWidth) || this.swrapper.width();

      this.itemWidth = parseInt(this.wrapeWidth / this.displayNum);

      this.scroller.find('li').width(this.itemWidth);

      this.scroller.width(this.itemWidth * _itemNum);

      this.itemHeight = this.scroller.height();

      //无论如何itemHeight都要相等才行
      //      if (ph != this.itemHeight) this.itemHeight = ph;
      this.itemHeight = ph;

      this.scroller.find('li').height(this.itemHeight);

      //样式还需调整
      this.swrapper.css({
        height: this.itemHeight + 'px'
      });

      this.scrollOffset = ((this.displayNum - 1) / 2) * (this.itemWidth);
    },

    reload: function (datamodel) {
      _.extend(this.datamodel, datamodel);
      if (this.scroll) {
        this.scroll.destroy();
        this.scroll = null;
      }
      this.refresh();
    },

    _initScroll: function () {
      if (this.scroll) {
        this.scroll.destroy();
      }

      this.scroll = new UIScroll({
        scrollbars: false,
        scrollOffset: this.scrollOffset,
        scrollType: 'x',
        step: this.itemWidth,
        wrapper: this.swrapper,
        bounceTime: 200,
        momentum: this.momentum,
        scroller: this.scroller

      });

      //重置包裹层尺寸，一定要是一个
      //      this.swrapper.width(this.itemWidth * this.displayNum);

      this.scroll.on('scrollEnd', $.proxy(function () {
        var index;
        //处理循环滚动
        if (this.needLoop) {

          index = this.getIndexByPosition();
          if (index == this.itemNum) {
            this.setIndex(0, null, null, 0);
            return;
          }

          if (index == -1) {
            //多增了两项
            this.setIndex(this.itemNum - 1, null, null, 0);
            return;
          }

        }

        this.setIndex(this.getIndexByPosition(), true);
      }, this));


      //为了解决鼠标离屏幕时导致的问题
      this.scroll.on('scrollCancel', $.proxy(function () {
        this.setIndex(this.getIndexByPosition(), false);
      }, this));

      //解决resize问题
      $(window).off('.silder' + this.id);
      $(window).on('resize.silder' + this.id, $.proxy(function () {
        this.resizeRefresh();
      }, this));

    },

    //当window.resize事件时候不需要重新搞页面
    resizeRefresh: function () {
      this.initSize();
      this._initScroll();
      this.adjustPosition();
      this.resetCss();
      this.resetIndex();
    },

    adjustPosition: function (hasAnimate, time) {
      if (!this.scroll) return;
      var index = this.datamodel.index, _dis, _time = 0;

      if (this.needLoop) {
        if (index === 0) {
          index = 1;
        } else {
          index++;
        }
      }

      _dis = (this.itemWidth * index) * (-1) + this.scrollOffset;
      if (hasAnimate) _time = this.animatTime;
      if (_.isNumber(time)) _time = time;

      this.scroll.scrollTo(_dis, 0, _time);
    },

    resetCss: function () {
      this.$('li').removeClass('current');
      this.$('li[data-index="' + this.datamodel.index + '"]').addClass('current');
    },

    resetIndex: function () {
      this.setIndex(this.datamodel.index, true, true);
    },

    //根据位置信息重新设置当前选项
    getIndexByPosition: function () {
      var pos = this.scroll.x - this.scrollOffset;
      var index = Math.round(Math.abs(pos) / this.itemWidth);

      //如果要循环的话，需要前进一
      if (this.needLoop) index--;

      return index;
    },

    getIndex: function () {
      return this.datamodel.index;
    },

    setIndex: function (i, noPosition, noEvent, time) {
      if (typeof noPosition == 'undefined' && i == this.datamodel.index) noPosition = true;

      //index值是否改变
      var isChange = this.datamodel.index != i;
      this.datamodel.index = i;

      if (!noPosition) this.adjustPosition(true, time);
      this.resetCss();
      if (noEvent !== true && isChange) {
        this.changedAction && this.changedAction.call(this, this.getSelected());
        this.changed && this.changed.call(this, this.getSelected());
      }
    },

    setId: function (id) {
      if (!id) return;
      var index = -1, i, len;
      for (i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i].id == id) { index = i; break; }
      }
      if (index == -1) return;
      this.setIndex(index, false);
    },

    getId: function () {
      return this.getSelected().id;
    },

    getSelected: function () {
      return this.datamodel.data[this.datamodel.index];
    },

    addEvent: function ($super) {
      $super();

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();
        this.adjustPosition();
        this.resetCss();
        this.resetIndex();

      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
          $(window).off('.silder' + this.id);
          this.freeInstance();
        }
      });
    }
  });

});

define('UIImageSlider',['UISlider'], function (UISlider) {
  return _.inherit(UISlider, {
    propertys: function ($super) {
      $super();

      this.momentum = false;
      this.autoPlay = false;
      this.timerSrc = null;
      this.delaySec = 3000;
      this.playTime = 500;
      this.sliderNav = null;
      this.displayNum = 1;
      this.needLoop = true;

    },

    //循环播放
    play: function () {
      if (!this.autoPlay) return
      this.stop();
      this.timerSrc = setInterval($.proxy(function () {
        var index = this.datamodel.index;
        index++;
        if (index == this.itemNum) index = 0
        this.setIndex(index, null, null, this.playTime);
      }, this), this.delaySec);
    },

    stop: function () {
      if (this.timerSrc) {
        clearInterval(this.timerSrc);
        this.timerSrc = null;
      }
    },

    //导航条
    createNav: function () {
      if (this.sliderNav) return;
      var nav = '<div class="cui-navContainer" style="color: rgb(20, 145, 197); position: absolute;">';
      for (var i = 0; i < this.itemNum; i++) {
        nav += '<span class="cui-slide-nav-item" data-index="' + i + '"></span>';
      }
      nav += '</div>';
      this.sliderNav = $(nav);
      this.$el.append(this.sliderNav);
      this._setNavPos();
      this.setzIndexTop(this.sliderNav);
      this._setNavIndex(this.datamodel.index);
    },

    //父级元素resize事件重写
    resizeRefresh: function ($super) {
      $super();
      this._setNavPos();
    },

    _setNavPos: function () {
      var left = (parseInt(this.wrapper.width()) - 2 * (this.itemNum * 10)) / 2; //居中计算LEFT值
      this.sliderNav.css({ "left": left, 'bottom': '10px' });
    },

    _addTouchEvent: function () {
      var scope = this;
      this._removeTouchEvent();

      var _handlerStop = function (e) {
        scope.stop();
      };

      var _handlerPlay = function (e) {
        scope.play();
      };

      this.$el.on('touchstart.imageslidertouchmove' + this.id, _handlerStop);
      this.$el.on('touchmove.imageslidertouchmove' + this.id, _handlerStop);
      this.$el.on('touchend.imageslidertouchmove' + this.id, _handlerPlay);

      this.$el.on('mousedown.imageslidertouchmove' + this.id, _handlerStop);
      this.$el.on('mousemove.imageslidertouchmove' + this.id, _handlerStop);
      this.$el.on('mouseup.imageslidertouchmove' + this.id, _handlerPlay);

    },

    _removeTouchEvent: function () {
      this.$el.off('.imageslidertouchmove' + this.id);
    },

    _setNavIndex: function (index) {
      this.$('.cui-navContainer').find('span').removeClass('cui-slide-nav-item-current');
      this.$('.cui-navContainer').find('span[data-index="' + index + '"]').addClass('cui-slide-nav-item-current');
    },

    changedAction: function (item) {
      this._setNavIndex(this.datamodel.index);
    },

    addEvent: function ($super) {
      $super();
      this.on('onRefresh', function () {
        this.sliderNav = null;
      });

      this.on('onCreate', function () {
        this.$el.addClass('cm-slide--full-img');
      });
      
      this.on('onShow', function () {
        this.createNav();
        this.play();
        this._addTouchEvent();
      });

      this.on('onHide', function () {
        this.stop();
        this._removeTouchEvent();
      });
    }

  });
});

/**
* @author oxz欧新志 <ouxz@Ctrip.com> / l_wang王磊 <l_wang@Ctrip.com>
* @class cUIInputClear
* @description 带删除按钮的文本框
*/
define('cUIInputClear',['libs'], function (libs) {

  var InputClear = (function () {

    /** 判断浏览器是否支持placeholder */
    var isPlaceHolder = 'placeholder' in document.createElement('input');

    /**
    * @method InputClear
    * @param input {dom}                 需要添加功能的文本框
    * @param clearClass {String}         自定义class
    * @param clearCallback {function}    清空后的回调函数
    * @param offset {object}             设置点击按钮的位置
    * @description input框带文字清除按钮
    */
    var InputClear = function (input, clearClass, clearCallback, offset, isNew) {
      clearClass || (clearClass = '');
      offset = offset || {}
      var $input = typeof input == 'string' ? $(input) : input;
      $input.each(function () {
        var clearButton = $('<a class="clear-input ' + clearClass + '" href="javascript:;"><span></span></a>'),
                $input = $(this);
        if (isNew) {
          clearButton = $('<span class="cui-focus-close ' + clearClass + '">×</span>')
        }
        if (offset.left) {
          clearButton.css({
            left: offset.left + 'px',
            right: 'auto'
          });
        }
        if (offset.top) {
          clearButton.css({
            top: offset.top + 'px',
            bottom: 'auto'
          });
        }
        if (offset.right) {
          clearButton.css({
            right: offset.right + 'px',
            left: 'auto'
          });
        }
        if (offset.bottom) {
          clearButton.css({
            bottom: offset.bottom + 'px',
            top: 'auto'
          });
        }
        $input.parent().addClass('clear-input-box');
        if (!isPlaceHolder) {
          var placeholder = $input.attr('placeholder'),
                    placeholderNode = $('<span class="placeholder-title' + (clearClass ? ' placeholder-' + clearClass : '') + '">' + placeholder + '</span>');
        }
        clearButton.hide();
        $input.bind({
          'focus': function () {
            var val = $.trim($input.val());
            if (val != '') {
              clearButton.show();
            }
          },
          'input': function () {
            window.setTimeout(function () {
              var val = $input.val();
              if (val == '') {
                clearButton.hide();
              } else {
                clearButton.show();
              }
              if (!isPlaceHolder) {
                if (val == '') {
                  placeholderNode.show();
                } else {
                  placeholderNode.hide();
                }
              }
            }, 10)

          },
          'blur': function () {
            var val = $.trim($input.val());
            if (!isPlaceHolder) {
              if (val == '') {
                placeholderNode.show();
              } else {
                placeholderNode.hide();
              }
            }
            setTimeout(function () {
              clearButton.hide();
            },
                        200);
          }
        });
        clearButton.bind('click',
                function () {
                  $input.val('');
                  $input.keyup();
                  clearButton.hide();
                  $input.focus();
                  $input.trigger('input');
                  typeof clearCallback == 'function' && clearCallback.call(this);
                });
        $input.after(clearButton);
        if (!isPlaceHolder) {
          $input.after(placeholderNode);
          placeholderNode.bind('click',
                    function () {
                      $input.focus();
                    });
        }

        $input.blur();
      });
    };
    return InputClear;
  })();

  return InputClear;

});
/**
 * @File c.guider.js
 * @Description: 屏蔽hybrid与web环境的不同
 * @author shbzhang@ctrip.com
 * @date 2014-09-24 11:06:12
 * @version V1.0
 */

/**
 * 屏蔽hybrid与web环境的不同
 *
 * 对于h5和hybrid同样都有实现的方法,建议用guider
 *
 * 只在Hybrid的调用的方式, 建议使用cHybridShell代替
 * @namespace Service.cGuiderService
 */
define('cGuiderService',[(Lizard.isHybrid || Lizard.isInCtripApp) ? 'cHybridGuider' : 'cWebGuider'], function (TGuider) {

  /*
   * guilder所有的实现方法
   */
  var metheds = [
    'jump', 'apply', 'call', 'init', 'log', 'print', 'callService', 'backToLastPage',
    'checkUpdate', 'recommend', 'addWeixinFriend', 'showNewestIntroduction', 'register',
    'create', 'home', 'jumpHotel', 'checkAppInstall', 'callPhone', 'cross', 'refreshNative',
    'copyToClipboard', 'readFromClipboard', 'shareToVendor', 'downloadData', 'encode',
    'chooseContactFromAddressbook', 'hideLoadingPage', 'showLoadingPage', 'choose_invoice_title',
    'get_device_info', 'show_voice_search', 'choose_photo', 'finished_register', 'app_call_system_share',
    'app_check_network_status', 'app_check_android_package_info', 'app_log_google_remarkting', 'app_read_verification_code_from_sms',
    'app_h5_page_finish_loading','registerAppearEvent','unregisterAppearEvent','save_photo',
    {file: ['isFileExist', 'deleteFile', 'getCurrentSandboxName', 'getFileSize', 'makeDir', 'readTextFromFile', 'writeTextToFile']},
    {pipe: ['socketRequest', 'httpRequest', 'abortRequest', 'abortSocketRequest']},
    {pay: ['checkStatus', 'payOut', 'callPay']},
    {encrypt: ['ctrip_encrypt', 'ctrip_decrypt']}
  ]

  var Guider = {},emptyFun = function(){return false};

  //先将空方法实现
  _.each(metheds,function(item){
    if(_.isString(item)){
      Guider[item] = emptyFun;
    }else if(_.isObject(item)){
      var keys = _.keys(item);
      _.each(keys,function(key){
        Guider[key] = {};
        _.each(item[key],function(subItem){
          Guider[key][subItem] = emptyFun;
        })
      })
    }
  })

  //将各环境的实现继承出来
  _.extend(Guider,TGuider);
  return Guider;
});
define('UIWarning404',['UIView', getAppUITemplatePath('ui.warning404'), 'cGuiderService'], function (UIView, template, Guider) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.resetDefaultProperty();

    },

    resetDefaultProperty: function () {

      //html模板
      this.template = template;
      this.datamodel = {
        tel: '4000086666',
        loadFail: '加载失败，请稍后再试试吧',
        telText: '或者拨打携程客服电话',
        tryAgain: '重试',
        contact: '联系客服',
        showContact: true
      };

      this.events = {
        'click .cui-btns-tel': 'callTelAction',
        'click .cui-btns-retry': 'retryAction'
      };

      this.retryAction = function (e) {
        console.log('override retryAction');
      };

      this.callTelAction = function (e) {
        //      window.location.href = 'tel:' + self.tel;

        Guider.apply({
          hybridCallback: function () {
            Guider.callService();
          },
          callback: function () {
            window.location.href = 'tel:' + self.tel;
          }
        });

      };

    },


    //重新父类创建根节点方法
    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    setDatamodel: function (datamodel, retryAction, telAction) {
      if (!datamodel) datamodel = {};
      _.extend(this.datamodel, datamodel);
      this.retryAction = retryAction;
      this.callTelAction = telAction;
      this.refresh();
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});

/**
 * @file c.hybrid.shell
 * @description 
 * 自 Lizard 1.1/2.0/2.1 for APP 6.0 起，对于 Native vs Hybrid / H5(inApp) 之间互相调用的封装，我们采用了新的策略： *
 * ⑴ 对于 H5 中尚未对等实现的功能（如调取系统联系人），我们将通过 cHybridShell 对 bridge.js 中的方法提供二次封装；
 * ⑵ 对于 H5 中已经对等实现的功能（如定位），我们将通过 Guider 等功能类提供二次封装；
 * 更多细节请参考{@link http://conf.ctripcorp.com/pages/viewpage.action?pageId=57531569|cHybridShell 使用方法}
 * @namespace Hybrid.cHybridShell
 * @author jiangjing@ctrip.com
 * @example
 *
 * // 不需要回调
 * cHybridShell.Fn('call_system_share').run(imageRelativePath, text, title, linkUrl);
 *
 * // 需要一次性回调函数
 * cHybridShell.Fn('choose_photo’, callback).run(maxFileSize, maxPhotoCount, meta);
 */

//--No.1--
// 根据 H5 vs Hybrid 的约定：
// ⑴ 调用 HybridAPI 的同时，将以方法标签名（Hybrid）为索引注册回调函数；
// ⑵ HybridAPI 异步执行，执行完毕后将调用 window.app.callback() 反馈信息，其中应包括同样的方法标签名（Hybrid）；
// ⑶ 方法标签名应与 HybridAPI（见 bridge.js）中对应的方法名除去前缀 app_ 后的剩余部分一致；
// ⑷ HybridAPI 必须确保不同的类中的方法不重名，否则无法以标签名为依据正确执行回调函数。

define('cHybridShell',[], function() {
	

	var HYBRID = {};

	HYBRID.CLASSES = [];
	for (var i in window) if (i.substr(0, 5) == 'Ctrip') HYBRID.CLASSES.push(window[i]);
	// var HYBRID.CLASSES = [
	// 	CtripBar            ,
	// 	CtripBusiness       ,
	// 	CtripEncrypt        ,
	// 	CtripFile           ,
	// 	CtripGeoHelper      ,
	// 	CtripMap            ,
	// 	CtripPage           ,
	// 	CtripPay            ,
	// 	CtripPipe           ,
	// 	CtripSumSungWallet  ,
	// 	CtripTool           ,
	// 	CtripUser           ,
	// 	CtripUtil           ];

	HYBRID.FNINFO = {
		abort_http_pipe_request            : { realname: 'app_abort_HTTP_pipe_request' },
	//	check_network_status               : { paramsMixed: true },  // 反馈信息是否混淆在回调参数中。
		do_business_job                    : { sidIndex: 3 },  // sequenceId 在形参中的位置，顺序自 0 起始。
		send_h5_pipe_request               : { realname: 'app_send_H5_pipe_request' },
		send_http_pipe_request             : { realname: 'app_send_HTTP_pipe_request' }
	};
	// paramsMixed 指该方法回调时将反馈信息和元信息（tagname, error_code）混杂在一起，而没有单独放在 param 属性中。
	// e.g. locate: { klass: CtripMap, realname: 'app_locate' },

	// 	refresh_nav_bar                    : { klass: CtripBar },

	// 	choose_contact_from_addressbook    : { klass: CtripBusiness },
	// 	choose_invoice_title               : { klass: CtripBusiness },
	// 	get_device_info                    : { klass: CtripBusiness },
	// 	log_google_remarkting              : { klass: CtripBusiness },
	// 	read_verification_code_from_sms    : { klass: CtripBusiness },
		
	// 	base64_encode                      : { klass: CtripEncrypt },
	// 	ctrip_encrypt                      : { klass: CtripEncrypt },
		
	// 	check_file_exist                   : { klass: CtripFile },
	// 	delete_file                        : { klass: CtripFile },
	// 	get_current_sandbox_name           : { klass: CtripFile },
	// 	get_file_size                      : { klass: CtripFile },
	// 	make_dir                           : { klass: CtripFile },
	// 	read_text_from_file                : { klass: CtripFile },
	// 	write_text_to_file                 : { klass: CtripFile },
		
	// 	locate                             : { klass: CtripMap },
	// 	show_map_with_POI_list             : { klass: CtripMap },
		
	// 	enable_drag_animation              : { klass: CtripPage },
	// 	hide_loading_page                  : { klass: CtripPage },
	// 	show_loading_page                  : { klass: CtripPage },
		
	// 	check_pay_app_install_status       : { klass: CtripPay },
		
		
	// 	finished_login                     : { klass: CtripUser },
	// 	member_auto_login                  : { klass: CtripUser },
	// 	member_login                       : { klass: CtripUser },
	// 	member_register                    : { klass: CtripUser },
	// 	non_member_login                   : { klass: CtripUser },
		
	// 	check_app_install_status           : { klass: CtripUtil },
	// 	check_network_status               : { klass: CtripUtil },
	// 	choose_photo                       : { klass: CtripUtil },
	// 	download_data                      : { klass: CtripUtil },
	// 	init_member_H5_info                : { klass: CtripUtil },
	// 	read_copied_string_from_clipboard  : { klass: CtripUtil },
	// 	save_photo                         : { klass: CtripUtil },	

	// 获取 tagname 对应 Hybrid API 方法的相关信息。
	HYBRID.fninfo = function(tagname) {
		var info = _ME.ifHasnot(HYBRID.FNINFO, tagname, {});

		if (!info._READY) {
			// 关于 tagname 的命名规则，参见注释 No.1 第⑶条。
			_ME.ifHasnot(info, 'realname', 'app_' + tagname);

			// 此处不使用 _ME.ifHasnot() 方法系因 _.find() 运算成本较高。
			if (!info.hasOwnProperty('klass')) info.klass = _.find(HYBRID.CLASSES, function(klass) { return !!klass[info.realname]; });

			// 信息初始化不会反复尝试。
			info._READY = true;
		}

		return info;
	};

	// 仅供内部调用的成员集合（包括常量、变量和方法）。
	var _ME = {
		EXCEPTION: new Error('HYBRID-SHEL-2014'),

		SN: {
			DEFAULT : 0,
			UPON    : 'UPON.2014' ,
			PRE     : 'PRE.2014'  ,
			POST    : 'POST.2014' ,
			PX      : 'PX.2014'   ,

			gen     : function() { return (new Date).getTime(); }
		},

		// ⑴ 指定参数，则判断该异常是否为内部异常。
		//    对于非内部异常，仍然抛出以免干扰其他依赖类似机制的功能及程序调试。
		// ⑵ 未指定参数，则抛出内部异常。
		abort: function(ex) {
			if (ex) {
				if (ex == _ME.EXCEPTION) return true;
				throw ex;
			}
			else throw _ME.EXCEPTION;
		},

		// 根据方法标签名（Hybrid）取得对应的 HybridAPI 方法句柄。
		// 为确保方法在正确的上下文中执行，须对该方法进行封装，即返回的并非原始句柄。
		apiFn: function(tagname) {
			var method = function() {}, info = HYBRID.fninfo(tagname);
			if (info.klass) {
				method = function() {
					var args = arguments, abort = false;
					
					// 对参数进行预处理。
					// 在预处理过程中，如果预处理方法抛出错误，则中止执行后续预处理方法，并且阻断对 Hybrid API 的请求。
					_.find(_ME.fn('find', tagname, _ME.SN.PRE), function(fn) {
						try { args = fn.apply(null, args); }
						catch (ex) { return _ME.abort(ex); }
					});

					// 在 HybridAPI 类的上下文中执行关联方法。
					abort || info.klass[info.realname].apply(info.klass, args);
				};
			}
			return method;
		},

		fn: (function() {
			// 存储容器
			var STORAGE = {};

			return function(action, tagname, sequenceId, callback) {
				// 参数兼容
				if (!callback && (sequenceId instanceof Function)) {
					callback = sequenceId;
					// delete sequenceId; // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode. 
					sequenceId = undefined;  // _.noop() returns undefined
				}

				// × 方法标签名（Hybrid）是大小写敏感的。
				// // 方法标签名（Hybrid）规范化
				// tagname = tagname.toLowerCase();

				// 设置默认顺序号。
				if (!sequenceId) sequenceId = _ME.SN.DEFAULT;

				// 初始化容器。
				var storage = _ME.ifHasnot(STORAGE, tagname, {});
				storage = _ME.ifHasnot(storage, sequenceId, { fns: [], times: {} });

				switch (action) {
					// 注册回调函数（仅供使用一次）。
					case 'once':
						if (callback) storage.times[callback] = 1;
					// 注册回调函数（可无限次使用）。
					case 'on':
						if (callback) storage.fns.push(callback);
						return;

					// 返回所有已注册的回调函数。
					case 'find':
						return storage.fns;

					// 削减已注册回调函数的可使用次数，自动删除即将失效的回调函数。
					case 'try':
						var i = storage.times[callback];
						if (_.isNumber(i)) {
							if (i == 1) { // 仅剩最后一次
								arguments[0] = 'off';
								_ME.fn.apply(_ME, arguments);
							}
							else storage.times[callback] -= 1;
						}
						return;

					// case 'pop':
					// 	storage[sequenceId] = [];
					// 	return callbacks;

					// 删除（取消注册）回调函数，如未指定回调函数，则删除所有的。
					case 'off':
						storage.fns = callback ? 
							_.reject(storage.fns, function(item) { return item === callback; })
							: 
							[];
						delete storage.times[callback];
						return;
				}
			};
			
			// return {
			// 	// 根据方法标签名（Hybrid）和顺序号登记回调函数。
			// 	push: function(tagname, sequenceId, callback) {
			// 		return fn('on', tagname, sequenceId, callback);
			// 	},

			// 	// 根据方法标签名（Hybrid）和顺序号读取回调函数。
			// 	/*Array*/ find: function(tagname, sequenceId) {
			// 		return fn('find', tagname, sequenceId);
			// 	},

			// 	// 根据方法标签名（Hybrid）和顺序号读取回调函数，并取消登记。
			// 	/*Array*/ pop: function(tagname, sequenceId) {					
			// 		return fn('pop', tagname, sequenceId);
			// 	},

			// 	// 根据方法标签名（Hybrid）和顺序号取消对指定回调函数的登记。
			// 	remove: function(tagname, sequenceId, callback) {
			// 		return fn('off', tagname, sequenceId, callback);
			// 	}
			// };
		})(),

		// 返回第一个非假的参数值，如均非真，则返回最后一个参数值（比如 0 或 ''）。
		// 辅助方法，仅供本模块内部为简化代码使用。
		ifEmpty: function() {
			for (var i = 0, args = arguments; i < args.length - 1; i++) if (args[i]) return args[i];
			return args[i];
		},

		// 判断对象是否存在指定属性，若不存在，则使用缺省值初始化该属性，并返回属性值。
		ifHasnot: function(obj, propname, value) {
			if (!obj.hasOwnProperty(propname)) obj[propname] = value;
			return obj[propname];
		},

		// @deprecated
		//
		// // ⑴ 判断父对象（obj）是否存在指定子对象（keyname），如果不存在，则将其初始化为一个空对象；
		// // ⑵ 如果指定了 subKeyname，则以 obj.keyname 为父对象，重复上述步骤；
		// // ⑶ 如果存在更多参数，则依次类推；
		// // ⑷ 返回最末端的对象。
		// initHash: function(/*object*/ obj, /*string*/ keyname, /*OPTIONAL string*/ subKeyname /*, ... */) {
		// 	for (var i = 1; keyname = arguments[i]; i++) {
		// 		if (!obj[keyname]) obj[keyname] = {};
		// 		obj = obj[keyname];
		// 	}
		// 	return obj;
		// },
		//
		findHash: function(/*object*/ obj, /*string*/ keyname, /*OPTIONAL string*/ subKeyname /*, ... */) {
			for (var i = 1; obj && (keyname = arguments[i]); i++) obj = obj[keyname];
			return obj;
		}
	};

	var exports = {
		/**
		 * 可在预处理函数或后处理函数中调用，用于中止本次与 Hybrid API 请求有关的后续任务的执行。
		 * @method Hybrid.cHybridShell.abort
		 */
		abort: _ME.abort,

		/**
		 * 返回 HybridAPI 句柄供调用，也可以同时注册回调方法。
		 * 建议按链式语法调用，如 
		 *   var callback = function(params) { alert(params.outString); };
		 *   cHybridShell.fn('ctrip_encrypt', callback)('hello world!', '1');		 
		 *
		 * @method Hybrid.cHybridShell.fn
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {string}         [sequenceId]  顺序号，并行调用同一方法时可能需要指定顺序号
		 * @param  {function}       [callback]    回调函数
		 * @return {function}                     对应的 HybridAPI 函数句柄
		 */
		// 此方法可取代原 request() 和 register() 的功能，但书写方式有所不同。
		fn: function(tagname, sequenceId, callback) {
			// 登记回调函数
			this.on(tagname, sequenceId, callback);

			// 取得对应的 HybridAPI 函数句柄。
			var fn = _ME.apiFn(tagname);

			// 为了与 .Fn() 在形式上相对应，有此兼容。
			fn.run = fn;

			return fn;
		},

		/**
		 * 初始化。
		 * @singleton
		 */
		init: _.once(function() {
			// var _me = this.init;
			// if (_me.called) return; _me.called = true;

			/**
			 * 与 Hybrid 约定的回调函数。
			 * 按约定 Hybrid 将按以下方式回调：
			 *   window.app.callback({ tagname: '...', param: { ... } });
			 *
			 * @method window.app.callback
			 * @param  {object}   options               参数集合
			 * @param  {string}   options.tagname       方法标签名（Hybrid）
			 * @param  {object}   options.param         返回的参数集合
			 * @return {boolen}   true = 成功执行回调，或毋须回调；false = 出现故障
			 */
			if (!window.app) window.app = {};
			window.app.callback = function(options) {
				var params, err;

				// 容错处理：某些 Hybrid 方法在回调时未严格遵守约定。
				if (typeof options == 'string') {
					try {
						options = window.JSON.parse(window.decodeURIComponent(options));
					} catch (ex) {
						return; // 老版本中此处未终止函数执行。
					}
				}

				var tagname = options.tagname;

				// params = _ME.ifEmpty(options.param, options); 
				// 容错处理：某些 Hybrid 方法在回调时未严格遵守约定，未将返回的参数集合放在回调参数的 param 属性中。
				// 但是这种容错也造成一个问题，即如果 param 不是一个集合，而是一个非真值，那么这种处理将会导致歧义。
				params = HYBRID.fninfo(tagname).paramsMixed ? options : options.param;

				// 容错处理
				if (typeof params == 'string') {
					// 老版本中此处未尝试捕获错误。
					// 但是，老版本中如果 options.param 为非真值（包括空字符串），则会以 options 替代，因此不会出现尝试解析空字符串导致出错的情形。
					try {
						params = window.JSON.parse(params); 
					} catch (ex) {}
				}

				// 错误信息规范化处理
				if (options.error_code) {
					/^(\((-?\d+)\))?(.+)$/.exec(options.error_code);
					err = new Error();
					err.number = parseInt(RegExp.$2);
					err.message = RegExp.$3;
				}

				// 根据 tagname 和 sequenceId 选择回调函数并执行该回调函数。
				// 如未发现匹配的回调函数，则认为毋须回调。
				/**
				 * @todo sequenceId 是 options 的属性还是 options.param 的属性？按常理它应当与 tagname 属同一级别，即应属前者，但现在是按后者处理。
				 */
				var sequenceId = params ? params.sequenceId : undefined;  // _.noop() returns undefined
				var 
					upons     = _ME.fn('find', tagname, _ME.SN.UPON),
					posts     = _ME.fn('find', tagname, _ME.SN.POST),
					callbacks = _ME.fn('find', tagname, sequenceId );
				var abort = false;
				
				if (upons.length + callbacks.length) {
					// 参数后处理：此处“后”的意思是指在调用 Hybrid API 之后，相对于回调函数，它们是“预”处理方法。
					// 如果扣处理函数抛出异常，将中止后续预处理函数及回调函数的执行。
					_.find(posts, function(fn) { 
						try { params = fn(params, err); }
						catch (ex) { return _ME.abort(ex); }			
					});

					var fnTry = function(sequenceId, callback) { 
						_ME.fn('try', tagname, sequenceId, callback);
						return abort = callback(params, err) === false;
					};

					// 执行全局回调
					// 如果回调函数返回 false，将中止后后续回调函数的执行。
					if (!abort) _.find(upons, function(callback) { return fnTry(_ME.SN.UPON, callback); });

					// 执行回调
					// 如果回调函数返回 false，将中止后后续回调函数的执行。
					if (!abort) _.find(callbacks, function(callback) { return fnTry(sequenceId, callback); });

					return true;
				}

				// 明确一点：如果参数应该是一个集合，那么它就必须是一个集合！
				// 换言之，用户不必在回调函数中作 if (params && params.somthing) 这样的容错处理，可以直接判断 if (params.somthing)。
				// 除非，在定义回调函数的时候，就已明知（根据 API Docs for: Ctrip Hybrid Javascript Lib）返回值可能是 undefined。
				
				// 无匹配回调函数时，返回 undefined。
				// return true;
			};
		}),

		/**
		 * 注册方法，将回调函数与方法标签名（Hybrid）和顺序号（如有）绑定。
		 * @see cHybridShell.on
		 *
		 * @method cHybridShell.on
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {string}         [sequenceId]  顺序号，并行调用同一 HybridAPI 方法且需要反馈时必须指定顺序号
		 * @param  {function}        callback     回调函数
		 */
		on: function(tagname, sequenceId, callback) {
			_ME.fn('on', tagname, sequenceId, callback);
			return this;
		},

		/**
		 * 注册方法，将回调函数与方法标签名（Hybrid）和顺序号（如有）绑定。
		 * 该方法被回调后即销毁！
		 * @see cHybridShell.on
		 *
		 * @method cHybridShell.on
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {string}         [sequenceId]  顺序号，并行调用同一 HybridAPI 方法且需要反馈时必须指定顺序号
		 * @param  {function}        callback     回调函数
		 */
		once: function(tagname, sequenceId, callback) {
			_ME.fn('once', tagname, sequenceId, callback);
			return this;
		},

		/**
		 * 注册预处理方法，在发起对 HybridAPI 的请求之前执行，可用于对请求实参进行预处理。
		 * 预处理方法的返回值为实参数组（如未处理，请返回原始实参数组 arguments）。
		 * 如果预处理方法抛出指定错误（调用 cHybridShell.abort() 方法），则中止后续预处理，并且将阻断对 Hybrid API 的请求。
		 *
		 * @method cHybridShell.preTreat
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {function}        pretreat     预处理函数
		 */
		preTreat: function(tagname, pretreater) {
			_ME.fn('on', tagname, _ME.SN.PRE, pretreater);
			return this;
		},

		/**
		 * 注册后处理方法，在执行回调函数前执行，在执行中可修改回调参数实参内容。
		 * 后处理方法的返回值为实参数组（如未处理，请返回原始实参数组 arguments）。
		 * 如果后处理方法抛出指定错误（调用 cHybridShell.abort() 方法），则中止执行后续后处理方法和所有回调函数。
		 * @see cHybridShell.on 
		 *
		 * @method cHybridShell.postTreat
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {function}        posttreater  后处理函数，可用于对返回参数集进行预处理。
		 */
		postTreat: function(tagname, posttreater) {			
			_ME.fn('on', tagname, _ME.SN.POST, posttreater);
			return this;
		},

		/**
		 * 取消方法注册。
		 * @method cHybridShell.off
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {string}         [sequenceId]  顺序号，并行调用同一方法时可能需要指定顺序号
		 * @param  {function}        callback     回调函数
		 * @return {function}                     对应的 HybridAPI 函数句柄
		 */
		off: function(tagname, sequenceId, callback) {
			// 取消回调函数登记
			_ME.fn('off', tagname, sequenceId, callback);
			return this;
		},

		/**
		 * 注册方法，将回调函数与方法标签名（Hybrid）绑定。
		 * 当多个回调函数并存时：
		 *   ⑴ 按注册的先后顺序执行；
		 *   ⑵ 回调函数返回 false 将阻断后续回调函数的执行。
		 *
		 * upon vs on 
		 *   ⑴ 前者在关于指定功能的任意异步调用引发的回调中都将被执行；
		 *   ⑵ 前者在执行顺序上优先于后者。
		 *
		 * on vs once
		 *   ⑴ 前者可以被多次回调执行，即使这些回调由不同的异步调用引发；
		 *   ⑵ 后者只能被回调执行一次，即使这些回调由同一个异步调用引发。
		 *
		 * upon vs postTreat
		 *   ⑴ 前者将在任意回调函数之前执行，换言之，如果没有注册回调函数，则 posttreater 也不会被执行；
		 *   ⑵ 前者可以改变回调函数的实参。
		 *
		 * @method cHybridShell.upon
		 * @param  {string}          tagname      方法标签名（Hybrid）
		 * @param  {function}        callback     回调函数 ({}, [, Error])
		 */
		upon: function(tagname, callback) {
			_ME.fn('on', tagname, _ME.SN.UPON, callback);
			return this;
		},

		// Fn: (function() {
		// 	var tagname, sequenceId;
		// 	return function(T, S, callback) {
		// 		if (this === exports) return new this.Fn(T, S, callback);

		// 		tagname = T;
		// 		if (callback || typeof S != 'function') sequenceId = S;
		// 		exports.once(T, S, callback);

		// 		var that = this;
		// 		_.each(['on', 'once', 'off'], function(action) {
		// 			that[action] = function(callback) {
		// 				exports[action](tagname, sequenceId, callback);
		// 				return this;
		// 			};
		// 		});

		// 		this.run = function() {
		// 			_ME.apiFn(tagname).apply(null, arguments);
		// 			return this;
		// 		};
		// 	};
		// })()
		
		Fn: (function() {
			var tagname, sequenceId, sidIndex;
			return function(T, callback) {
				if (this === exports) return new this.Fn(T, callback);

				tagname = T;

				sidIndex = HYBRID.fninfo(tagname).sidIndex;
				if (_.isNumber(sidIndex)) sequenceId = _ME.SN.gen();

				exports.once(T, sequenceId, callback);

				var that = this;
				_.each(['on', 'once', 'off'], function(action) {
					that[action] = function(callback) {
						exports[action](tagname, sequenceId, callback);
						return this;
					};
				});

				this.run = function() {
					var args = arguments;
					// 在实参中插入序列号至预定位置
					if (_.isNumber(sidIndex)) {
						args = [];
						for (var i = 0, n = Math.max(sidIndex + 1, arguments.length); i < n; i++) {
							if (i == sidIndex) args.push(sequenceId);
							args.push(arguments[i]);
						}
					}
					_ME.apiFn(tagname).apply(null, args);
					return this;
				};
			};
		})()		
	};

	// var Fn = function(tagname, sequenceId, callback) {
	// 	// 兼容：可作为普通函数调用，仍创建并返回对象实例。
	// 	if (this === exports) return new Fn(tagname, sequenceId, callback);

	// 	this.tagname = tagname;
	// 	if (callback || typeof sequenceId != 'function') this.sn = sequenceId;
	// 	exports.once(tagname, sequenceId, callback);
	// };
	// _.extend(Fn.prototype, {
	// 	on: function(callback) {
	// 		exports.on(this.tagname, this.sn, callback);
	// 		return this;
	// 	},
	// 	once: function(callback) {
	// 		exports.once(this.tagname, this.sn, callback);
	// 		return this;
	// 	},
	// 	off: function(callback) {
	// 		exports.off(this.tagname, this.sn, callback);
	// 		return this;
	// 	},
	// 	run: function() {
	// 		_ME.apiFn(this.tagname).apply(null, arguments);
	// 		return this;
	// 	}
	// });
	// exports.Fn = Fn;

	return exports;
});
define('cHybridHeader',['cHybridShell'], function (cHybridShell) {
  function Header(opt) {
    this.root = this.rootBox = $('#headerview');
    //当前header所属的view对象
    this.parent = opt.parent;
    this.root.hide();
  };

  Header.prototype = {
    set: function (headData) {
      this.headerData = headData;
      var events = this.headerData.events || {}
      var head = {
        'left'         : [],
        'center'       : [],
        'centerButtons': [],
        'right'        : []
      }, self = headData.view || this;


      //      _.each(head.right, function (menuItem) {
      //        menuItem.callback && cHybridShell.off(menuItem.tagname).on(menuItem.tagname, function () {
      //          menuItem.callback.call(self);
      //        });
      //      });


      //l_wang，对新header接口做桥接，修复新API调用方法对Hybrid的冲击

      //如果left是数组的情况，现实情况left一定是长度为1
      if (_.isArray(headData.left) && headData.left.length == 0) {
        headData.back = headData.left[0];
      }

      //如果back现在是一个对象的话，需要处理
      if (_.isObject(headData.back)) {
        //将returnHandler装载进去
        if (_.isFunction(headData.back.callback)) {
          events.returnHandler = headData.back.callback;
        }
        headData.back = true;
      }

      //这里开始处理title的问题，title现有：
      //① 一般情况
      //② subTitle情况
      //③ select情况，其中select具有回调

      //首先处理直接传入center，或者title是Object的情况
      if (_.isObject(headData.center) || _.isObject(headData.title)) {
        var titleObj = headData.center || headData.title;


        if(titleObj.tagname == 'title'){
          //处理一般情况
          if(_.isString(titleObj.value)){
            headData.title = titleObj.value;
          }else if(_.isArray(titleObj.value) && titleObj.value.length >0){
            headData.title = titleObj.value[0];
            //判断subtitle
            if(titleObj.value.length == 2){
              headData.subtitle = titleObj.value[1];
            }
          }
        }

        //处理select场景
        if (titleObj.tagname == 'select') {
          headData.citybtn = titleObj.value;
          if (_.isFunction(titleObj.callback)) {
            events.citybtnHandler = titleObj.callback;
          }
        }

      }

      //处理right按钮群
      if (_.isArray(headData.right)) {
        for (var i = 0, len = headData.right.length; i < len; i++) {
          var temp_item = headData.right[i];

          //自定义文字按钮，如果当value存在则是文字，下面都是图标的情况
          if (_.isString(temp_item.value)) {
            headData.btn = { title: temp_item.value };
          } else {

            //电话逻辑
            if (temp_item.tagname == 'tel') {
              headData.tel = { number: temp_item.number };
            }

            //更多列表
            if (temp_item.tagname == 'list' && temp_item.data) {
              headData.moreMenus = temp_item.data;
            }

            if (
              temp_item.tagname == 'share'
              || temp_item.tagname == 'favorite'
              || temp_item.tagname == 'favorited'
              || temp_item.tagname == 'phone'
              || temp_item.tagname == 'home'
              || temp_item.tagname == 'search'
              ) {
              headData[temp_item.tagname] = true;
            }
          }

          if (_.isFunction(temp_item.callback)) {
            if (temp_item.tagname == 'search') {
              events.searchHandler = temp_item.callback;
            } else {
              events.commitHandler = temp_item.callback;
            }
          }

        }
      }
      //清空
      headData.right = headData.left = headData.center = [];

      if (headData.back) {
        head.left.push({
          'tagname': 'back'
        });
        var returnCb = function () {
          if (Lizard) {
            if (Lizard.instance._alert.status == 'show') {
              Lizard.hideMessage();
              return;
            }
            if (Lizard.instance._confirm.status == 'show') {
              Lizard.hideConfirm();
              return;
            }
            if (Lizard.instance._toast.status == 'show') {
              Lizard.hideToast();
              return;
            }
          }
          events.returnHandler.call(self);
        }
        cHybridShell.off('back').on('back', returnCb);
      }
      if (headData.title) {
        head.center.push({ 'tagname': 'title', 'value': headData.title });
      }
      if (headData.subtitle) {
        head.center.push({ 'tagname': 'subtitle', 'value': headData.subtitle });
      }
      if (headData.btn) {
        if (_.isFunction(events.commitHandler)) {
          head.right.push({ 'tagname': 'commit', 'value': headData.btn.title });
          var commitCb = function () {
            events.commitHandler.call(self);
          }
          cHybridShell.off('commit').on('commit', commitCb);
        }
      }

      if (_.isFunction(events.searchHandler)) {
        head.right.push({ 'tagname': 'search'});
        var searchCb = function () {
          events.searchHandler.call(self);
        }
        cHybridShell.off('search').on('search', searchCb);
      }

      if (headData.tel) {
        var telObj = {
          'tagname': 'call'
        };
        if (Lizard && Lizard.instance && Lizard.instance.curView) {
          var curView = Lizard.instance.curView;
          if (curView.businessCode) {
            telObj.businessCode = curView.businessCode;
            telObj.pageId = curView.hpageid;
          }
        }
        head.right.push(telObj);
      }
      if (headData.home) {
        head.right.push({ 'tagname': 'home' });
      }
      if (headData.citybtn) {
        var cityBynobj = {
          "tagname": "cityChoose",
          "value"  : headData.citybtn,
          "a_icon" : "icon_arrowx",
          "i_icon" : "icon_arrowx.png"
        }
        if (headData.citybtnImagePath) {
          cityBynobj.imagePath = headData.citybtnImagePath;
          if (headData.citybtnPressedImagePath) {
            cityBynobj.pressedImagePath = headData.citybtnPressedImagePath;
          } else {
            cityBynobj.pressedImagePath = cityBynobj.imagePath;
          }
        }
        if (headData.citybtnIcon) {
          cityBynobj.a_icon = cityBynobj.i_icon = headData.citybtnIcon;
        }
        head.centerButtons.push(cityBynobj);
        var cityBtnCb = function () {
          events.citybtnHandler.call(self);
        }
        cHybridShell.off('cityChoose').on('cityChoose', cityBtnCb);
      }
      if (headData.share) {
        head.right.push({ 'tagname': 'share' });
      }
      if (headData.favorite) {
        head.right.push({ 'tagname': 'favorite' });
      }
      if (headData.favorited) {
        head.right.push({ 'tagname': 'favorited' });
      }
      if (headData.phone) {
        head.right.push({ 'tagname': 'phone' });
      }
      if (headData.moreMenus) {
        head.moreMenus = headData.moreMenus;
        head.right.push({ 'tagname': 'more' });
        _.each(headData.moreMenus,
          function (menuItem) {
            var tagname = menuItem.tagname;
            if (tagname.indexOf('more') == -1) {
              //tagname = 'more_' + tagname;
            }
            menuItem.callback && cHybridShell.off(tagname).on(tagname, function () {
              menuItem.callback.call(self);
            });
          });
      }
      if (headData.moreRightMenus) {
        head.right = head.right.concat(headData.moreRightMenus)
        _.each(head.moreRightMenus, function (menuItem) {
          menuItem.callback && cHybridShell.off(menuItem.tagname).on(menuItem.tagname, function () {
            menuItem.callback.call(self);
          });
        });
      }
      try {
        var headInfo = JSON.stringify(head);
        var fn = new cHybridShell.Fn('refresh_nav_bar');
        fn.run(headInfo);
      } catch (e) {
      }
    },

    updateHeader: function (name, val) {
      if (val) {
        this.headerData[name] = val;
      } else if (_.isObject(name)) {
        _.extend(this.headerData, name);
      }
      this.set(this.headerData);
    },

    show: function () {
      var fn = new cHybridShell.Fn('set_navbar_hidden ');
      fn.run(false);
    },

    hide: function () {
      var fn = new cHybridShell.Fn('set_navbar_hidden ');
      fn.run(true);
    }
  };

  return Header;
});

define('UIIdentitycard',['UILayer', getAppUITemplatePath('ui.identitycard')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();

      this.template = template;
      this.needMask = false;
      this.needReposition = false;

      this.addEvents({
        'click .js_ok': 'closeAction',
        'click .js_num_item li': 'itemAction'
      });

      this.animateInClass = 'cm-down-in';
      this.animateOutClass = 'cm-down-out';

      //不要包裹层
      this.needRootWrapper = false;

      //目标元素，必填
      this.targetEl = null;
      this.emptyEl = $('<div style="height: 1000px"></div>');

    },

    deleteAction: function () {
      console.log('delete');
    },

    itemClickAction: function (val) {
      console.log(val);
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);

      if (el.hasClass('js_item_del')) {
        this.deleteAction();
        return;
      }
      var val = el.html();
      this.itemClickAction(val);
    },

    closeAction: function () {
      this.hide();
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    initElement: function () {
      this.el = this.$el;
    },

    _scrollToTarget: function () {
      var offset = this.targetEl.offset();
      window.scrollTo(0, offset.top - 50);
    },

    addEvent: function ($super) {
      $super();

      this.on('onShow', function () {
        this.$el.removeClass('cui-layer');
      });

      this.on('onShow', function () {
        this.setzIndexTop(this.$el);
        $('body').append(this.emptyEl);
        this._scrollToTarget();
      });

      this.on('onHide', function () {
        this.emptyEl.remove();
      });
    }
  });

});


define('UILayerList',['UILayer', getAppUITemplatePath('ui.layer.list')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needReposition = false;

      this.datamodel = {
        list: [],
        cancelText: '取消',
        className: 'popup-operate',
        index: -1
      };

      this.events = {
        'click .cancel': 'cancelAction',
        'click .list li': 'itemAction'
      };

      this.onItemAction = function (data, index, e) {
      };
      this.animateInClass = 'cm-down-in';
      this.animateOutClass = 'cm-down-out';
    },

    initialize: function ($super, opts) {
      $super(opts);
    },
    setIndex: function (i) {
      if (i < 0 || i > this.datamodel.list.length) return;
      this.datamodel.index = i;
      this.$('li').removeClass('current');
      this.$('li[data-index="' + i + '"]').addClass("current");
    },

    cancelAction: function (e) {
      this.hide();
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var index = el.attr('data-index');
      var data = this.datamodel.list[index];
      this.setIndex(index);
      this.onItemAction.call(this, data, index, e);

    },

    createHtml: function () {
      return _.template(this.template)(this.datamodel);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
        this.$el.addClass('popup-operate');

      });

      this.on('onShow', function () {

      });
    }

  });

});

/**
* @author zsb张淑滨 <shbzhang@Ctrip.com> / ghj龚汉金 <hjgong@Ctrip.com>
* @class cLog
* @description 提供App在手机端的后门
* @comment 需要zsb与新代码再核对一遍
*/
define('UIAnimation',[], function () {

  return {
    //        slideleft: function (inView, outView, callback, scope) {
    //            this.body.addClass('hiddenx');
    //            inView.$el.addClass('animatestart');
    //            outView.$el.addClass('slideleftout');
    //            inView.$el.addClass('sliderightin');
    //            var self = this;
    //            return setTimeout(function () {
    //                self.body.removeClass('hiddenx');
    //                inView.$el.removeClass('animatestart');
    //                inView.$el.removeClass('sliderightin');
    //                inView.$el.show();
    //                outView.$el.removeClass('slideleftout');
    //                outView.$el.hide();
    //                callback && callback.call(scope);
    //            }, 700);
    //        },
    //        slideright: function (inView, outView, callback, scope) {
    //            this.body.addClass('hiddenx');
    //            inView.$el.addClass('animatestart');
    //            outView.$el.addClass('sliderightout');
    //            inView.$el.addClass('slideleftin');
    //            var self = this;
    //            return setTimeout(function () {
    //                self.body.removeClass('hiddenx');
    //                inView.$el.removeClass('animatestart');
    //                inView.$el.removeClass('slideleftin');
    //                inView.$el.show();
    //                outView.$el.removeClass('sliderightout');
    //                outView.$el.hide();
    //                callback && callback.call(scope);
    //            }, 700);
    //        },

    //以下为复写
    //                slideleft: function (inView, outView, callback, scope) {
    //                    this.body.addClass('hiddenx');
    //                    var self = this;
    //                    inView.$el.addClass('animatestart');
    //                    inView.$el.css({
    //                        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
    //                        '-moz-transform': 'translate3d(100%, 0px, 0px)'
    //                    });

    //                    inView.$el.animate({
    //                        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
    //                        '-moz-transform': 'translate3d(0px, 0px, 0px)'
    //                    }, 300, 'linear', function () {
    //                        self.body.removeClass('hiddenx');
    //                        inView.$el.removeClass('animatestart');
    //                        outView.$el.hide();
    //                        callback && callback.call(scope);
    //                    })
    //                },
    //                slideright: function (inView, outView, callback, scope) {
    //                    this.body.addClass('hiddenx');
    //                    var self = this;
    //                    outView.$el.addClass('animatestart');
    //                    outView.$el.css({
    //                        '-webkit-transform': 'translate3d(0%, 0px, 0px)',
    //                        '-moz-transform': 'translate3d(0%, 0px, 0px)'
    //                    });
    //                    outView.$el.animate({
    //                        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
    //                        '-moz-transform': 'translate3d(100%, 0px, 0px)'
    //                    }, 300, 'linear', function () {
    //                        self.body.removeClass('hiddenx');
    //                        outView.$el.removeClass('animatestart');
    //                        outView.$el.hide();
    //                        callback && callback.call(scope);
    //                    });
    //                },

    //        slideleft: function (inView, outView, callback, scope) {
    //            this.body.addClass('hiddenx');
    //            inView.$el.addClass('animatestart');
    //            inView.$el.addClass('sliderightin');

    //            outView.$el.addClass('animatestart');
    //            outView.$el.addClass('slideleftout');

    //            var self = this;
    //            return setTimeout(function () {
    //                self.body.removeClass('hiddenx');
    //                inView.$el.removeClass('animatestart');
    //                inView.$el.removeClass('sliderightin');

    //                outView.$el.removeClass('animatestart');
    //                outView.$el.removeClass('slideleftout');

    //                outView.$el.hide();
    //                callback && callback.call(scope);
    //            }, 390);
    //        },

    //        slideright: function (inView, outView, callback, scope) {
    //            this.body.addClass('hiddenx');
    //            inView.$el.addClass('animatestart');
    //            inView.$el.addClass('slideleftin');

    //            outView.$el.addClass('animatestart');
    //            outView.$el.addClass('sliderightout');

    //            var self = this;
    //            return setTimeout(function () {
    //                self.body.removeClass('hiddenx');
    //                inView.$el.removeClass('animatestart');
    //                inView.$el.removeClass('slideleftin');

    //                outView.$el.removeClass('animatestart');
    //                outView.$el.removeClass('sliderightout');

    //                outView.$el.hide();
    //                callback && callback.call(scope);
    //            }, 390);
    //        },

    //    fadeIn: function (inView, outView, callback, scope) {
    //      this.mainframe.hide();
    //      //原逻辑存在两个view可能同时出现在页面中的bug，这里强制先将所有view隐藏，在显示当前view
    //      this.viewport.children('.sub-viewport').hide();
    //      inView.$el.show();
    //      this.mainframe.show();
    //      callback && callback.call(scope || this);
    //    },

    slideleft: function (inView, outView, callback, scope) {
      var $inView = inView.$el;
      var $outView = outView.$el;
      outView.hide();
      $inView.show();
      $inView.bind('webkitAnimationEnd',
        function (event) {
          $inView.unbind('webkitAnimationEnd');
          $('body').removeClass('hiddenx');
          $inView.removeClass('animatestart');
          $inView.removeClass('sliderightin');
          inView.show();
          (typeof callback == 'function' && (scope?callback.call(scope, inView, outView): callback(inView, outView)));
        });
      $('body').addClass('hiddenx');
      $inView.addClass('animatestart');
      $inView.addClass('sliderightin');
      /***
      $('body').addClass('hiddenx');
      inView.addClass('animatestart');
      inView.addClass('sliderightin');

      inView.__show();

      var self = this;
      return setTimeout(function () {
        $('body').removeClass('hiddenx');
        inView.removeClass('animatestart');
        inView.removeClass('sliderightin');

        if (outView) outView.__hide(inView.viewname);

        callback && callback.call(scope, inView, outView);
      }, 340);
      **/
    },
    slideright: function (inView, outView, callback, scope) {
      /***    
      $('body').addClass('hiddenx');

      if (outView) {
        outView.addClass('animatestart');
        outView.addClass('sliderightout');
      }

      inView.__show();

      var self = this;
      return setTimeout(function () {
        $('body').removeClass('hiddenx');
        if (outView) {
          outView.removeClass('animatestart');
          outView.removeClass('sliderightout');
          outView.__hide(inView.viewname);
        }

        callback && callback.call(scope, inView, outView);

      }, 340);
      ****/
      var $inView = inView.$el;
      var $outView = outView.$el;
      //l_wang 缺少兼容处理
      $outView.bind('webkitAnimationEnd', function (event) {
        $outView.unbind('webkitAnimationEnd');
        $('body').removeClass('hiddenx');
        $outView.removeClass('animatestart');
        $outView.removeClass('sliderightout');
        outView.hide();
        inView.show();
        (typeof callback == 'function' && (scope?callback.call(scope, inView, outView): callback(inView, outView)));
      });

      $('body').addClass('hiddenx');
      $outView.addClass('animatestart');
      $outView.addClass('sliderightout');
    },


    noAnimate: function (inView, outView, callback, scope) {
      //减少重绘和回流，但是会引起页面滚动条BUG
//      this.mainframe.hide();

      //in 一定会有 out则不一定
      if (outView) outView.__hide(inView.viewname);
      inView.__show();

//      this.mainframe.show();

      callback && callback.call(scope, inView, outView);

    }

  };
});

define('text!ui/ui.alert.html',[],function () { return '<div class="cui-pop-box">\r\n<%if(typeof title == \'string\' && title.length > 0){ %>\r\n  <div class="cui-hd">\r\n      <%=title%>\r\n  </div>\r\n<%} %>\r\n  <div class="cui-bd">\r\n    <div class="cui-error-tips">\r\n      <%=content%></div>\r\n    <div class="cui-roller-btns">\r\n      <% for(var i = 0, len = btns.length; i < len; i++ ) {%>\r\n      <div class="cui-flexbd <%=btns[i].className%>">\r\n        <%=btns[i].name%></div>\r\n      <% } %>\r\n    </div>\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.bubble.layer.html',[],function () { return '<section class="cm-pop cm-pop--radius <%=wrapperClass %>  <%if(dir == \'up\'){ %> <%=upClass %> <% } else { %> <%=downClass %> <% } %>">\r\n<i class="icon-pop-triangle"></i>\r\n<div class="cm-pop-bd">\r\n  <ul class="cm-pop-list <%=itemStyleClass %>">\r\n    <% for(var i = 0, len = data.length; i < len; i++) { %>\r\n    <% var itemData = data[i]; %>\r\n    <li data-index="<%=i%>" data-flag="c" class="<% if(index == i){ %><%=curClass %><%} %>"  ><%if(typeof itemFn == \'function\') { %><%=itemFn.call(scope, itemData, i) %> <% } else { %><%=itemData.name%><%} %></li>\r\n    <% } %>\r\n  </ul>\r\n</div>\r\n</section>\r\n\r\n';});


define('text!ui/ui.calendar.html',[],function () { return '<ul class="cui_cldweek" style=" position: static; ">\r\n<% var i = 0, day1 = 0;  %>\r\n<%for(day1 = 0; day1 < 7; day1++) { %>\r\n<li><%=weekDayArr[day1] %></li>\r\n<%} %>\r\n</ul>\r\n\r\n<section class="cui_cldunit">\r\n<%for(var j = 0; j < displayMonthNum; j++) { %>\r\n<%\r\n  var changedMonth = month + j;\r\n  var yyy =  parseInt(( month + j ) / 12);\r\n  if(changedMonth > 11) { \r\n    changedMonth = changedMonth - 12 * yyy;\r\n  }\r\n  changedYear = year + yyy;\r\n  var d = new Date(changedYear, changedMonth);\r\n  var days = _.dateUtil.getDaysOfMonth(d);\r\n  var beginWeek = _.dateUtil.getBeginDayOfMouth(d);\r\n  var endDateTime = endDate.getTime();\r\n\r\n  var str_month = MonthClapFn(changedYear, changedMonth);\r\n%>\r\n  <%if(str_month.length > 0 ) { %>\r\n  <h1 class="cui_cldmonth">\r\n    <%=str_month %>\r\n  </h1>\r\n    <% } %>\r\n  <ul class="cui_cld_daybox">\r\n     <% for(i = 0; i < beginWeek; i++) { %>\r\n        <li class="cui_invalid"></li>\r\n      <% } %>\r\n      <% for(i = 0; i < days; i++) { %>\r\n        <% var day = i + 1; %>\r\n        <% var calendar_time = (new Date(changedYear, changedMonth, day )).getTime(); %>\r\n        <% var difftime = calendar_time - curTime; %>\r\n        <% var dateObj = new Date(changedYear, changedMonth, day ); %>\r\n        <% var isSelectDate = (typeof selectDate != \'undefined\' && _.isDate(selectDate) && selectDate.getTime() == calendar_time ); %>\r\n\r\n        <li class=" <%if(isSelectDate){ %> selected-departdate <%} %>cui_calendar_item cui_cld_day_havetxt <%if(calendar_time == endDateTime){ %>cui_endDate <%} %> <%if(difftime < 0) { %> cui_cld_daypass <%} %>"data-date="<%=changedYear%>-<%=changedMonth%>-<%=day%>"><%=dayItemFn.call(scope, changedYear, changedMonth, day, dateObj, difftime)%> </li>\r\n      <% } %>\r\n  </ul>\r\n<%} %>\r\n</section>';});


define('text!ui/ui.group.list.html',[],function () { return '<%filter = filter.replace(/\\s+/g, "").split(\',\'); %>\r\n\r\n<ul class="cui-city-itmes">\r\n<%for(var i = 0, len = data.length; i < len; i++) { %>\r\n  <li data-groupindex="<%=i %>" class="<%if(typeof data[i].needFold != \'undefined\' && data[i].needFold == true) { %>cui-arrow-close<%} else{ %> cui-arrow-open<% } %>" >\r\n  <span class="cui-city-t">\r\n   <%=data[i].name %> </span>\r\n   <%var item = data[i].data; %>\r\n   <%if(item && item.length > 0) { %>\r\n    <ul class="cui-city-n">\r\n\r\n     <%for(var j = 0, len1 = item.length; j < len1; j++) { %>\r\n      <li data-index="<%=j %>" data-group="<%=i %>" data-filter="<%for(var k in filter){ var v = filter[k]; if(typeof item[j][v]==\'string\') { %><%=item[j][v] %> <% } %><% } %>" ><%=item[j].name %> </li>\r\n     <% } %>\r\n    </ul>\r\n\r\n   <% } %>\r\n   \r\n<% } %>\r\n\r\n</ul>\r\n';});


define('text!ui/ui.group.select.html',[],function () { return '<div class="cui-pop-box" style="border-radius: 0; ">\r\n  <div class="cui-hd">\r\n    <div class="cui-text-center">\r\n      <%=title %></div>\r\n  </div>\r\n  <div class="cui-bd ">\r\n    <div class="cui-roller">\r\n    </div>\r\n    <div class="cui-roller-tips">\r\n      <%=tips %></div>\r\n    <div class="cui-roller-btns">\r\n      <% for(var i = 0, len = btns.length; i < len; i++ ) {%>\r\n      <div class="cui-flexbd <%=btns[i].className%>">\r\n        <%=btns[i].name%></div>\r\n      <% } %>\r\n    </div>\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.loading.html',[],function () { return '<div class="cui-breaking-load">\r\n  <div class="cui-i cui-w-loading">\r\n  </div>\r\n  <div class="cui-i cui-m-logo">\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.mask.html',[],function () { return '<div class="cui-pop-box">\r\n  <div class="cui-hd">\r\n      <%=title%>\r\n  </div>\r\n  <div class="cui-bd">\r\n    <div class="cui-error-tips">\r\n      <%=content%></div>\r\n    <div class="cui-roller-btns">\r\n      <% for(var i = 0, len = btns.length; i < len; i++ ) {%>\r\n      <div class="cui-flexbd <%=btns[i].className%>">\r\n        <%=btns[i].name%></div>\r\n      <% } %>\r\n    </div>\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.num.html',[],function () { return '<div class="cm-num-adjust">\r\n  <span class="cm-adjust-minus js_num_minus <% if(min == curNum) { %> disabled <% } %> "></span><span class="cm-adjust-view js_cur_num " <%if(needText == true){ %>contenteditable="true"<%} %>><%=curNum %><%=unit %></span>\r\n  <span class="cm-adjust-plus js_num_plus <% if(max == curNum) { %> disabled <% } %>"></span>\r\n</div>\r\n';});


define('text!ui/ui.radio.list.html',[],function () { return '<div class="cui-pop-box">\r\n<%if(typeof title == \'string\' && title.length > 0){ %>\r\n  <div class="cui-hd">\r\n    <div class="cui-text-center">\r\n      <%=title %></div>\r\n  </div>\r\n<%} %>\r\n\r\n  <div class="cui-bd cui-roller-bd" style="overflow: hidden; position: relative;">\r\n    <ul class="cui-select-view " style="position: absolute; width: 100%; ">\r\n      <%for(var i = 0, len = data.length; i < len; i++) { %>\r\n        <li data-index="<%=i %>" <%if(i == index){ %>class="current"<%} %> ><%=data[i].name || data[i].id %></li>\r\n      <% } %>\r\n    </ul>\r\n  </div>\r\n</div>';});


define('text!ui/ui.loading.layer.html',[],function () { return '<%\r\nvar hasText = (typeof content == \'string\' && content.length > 0);\r\n %>\r\n<div class="cui-grayload-text" style=" <% if(!hasText && !closeBtn){%> width: 80px; height: 70px; <%}%> " >\r\n  <div class="cui-i cui-w-loading">\r\n  </div>\r\n  <div class="cui-i cui-m-logo">\r\n  </div>\r\n  <%if(closeBtn) %>\r\n  <div class="cui-grayload-close">\r\n  </div>\r\n  <% %>\r\n  <div class="cui-grayload-bfont">\r\n  <%if(hasText){ %>\r\n    <%=content %>\r\n    <%} %>\r\n    </div>\r\n</div>\r\n';});


define('text!ui/ui.scroll.layer.html',[],function () { return '<div class="cui-pop-box">\r\n\r\n<%if(typeof title == \'string\' && title.length > 0){ %>\r\n  <div class="cui-hd">\r\n    <%=title %><div class="lab-close-area">\r\n      <span class="cui-top-close">×</span></div>\r\n  </div>\r\n<%} %>\r\n  <div class="cui-bd" style="overflow: hidden; position: relative; background-color: #fafafa;\r\n    width: 100%;">\r\n  \r\n  </div>\r\n  <div class="cui-roller-btns">\r\n    <%if(typeof btns == \'string\'){ %>\r\n      <%=btns %>\r\n    <% } else { %>\r\n      <% for(var i = 0, len = btns.length; i < len; i++ ) {%>\r\n      <div class="cui-flexbd <%=btns[i].className%>">\r\n        <%=btns[i].name%></div>\r\n      <% } %>\r\n    <%} %>\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.select.html',[],function () { return '<ul class="ul-list" style="position: absolute; width: 100%; top: 0; left: 0;">\r\n  <%for(var i = 0, len = data.length; i < len; i++) { %>\r\n  <li data-key="<%=data[i].id %>" data-index="<%=i%>" <%if(typeof data[i].disabled != \'undefined\' && data[i].disabled == false){ %> class="disabled"\r\n    <%} %>>\r\n    <%=data[i].name %></li>\r\n  <%} %>\r\n</ul>\r\n<div class="cui-mask-gray">\r\n</div>\r\n<div class="cui-lines">\r\n  &nbsp;</div>\r\n';});


define('text!ui/ui.slider.html',[],function () { return '<div class="cm-slide">\r\n  <ul class="cm-slide-list js_scroller <%=className %>" style=" position: absolute; ">\r\n    \r\n    <%if(typeof firstLoopItem != \'undefined\'){ %> \r\n     <li class="cm-slide-item" data-key="first" >\r\n      <%=((typeof itemFn == \'function\' && itemFn(firstLoopItem, -1)) || firstLoopItem.name) %>\r\n     </li>\r\n    <%} %>\r\n\r\n    <%for(var i = 0, len = data.length; i < len; i++) { %>\r\n    <li class="cm-slide-item" data-key="<%=data[i].id %>" data-index="<%=i%>" >\r\n      <%=((typeof itemFn == \'function\' && itemFn(data[i], i)) || data[i].name) %>\r\n    </li>\r\n    <%} %>\r\n\r\n    <%if(typeof lastLoopItem != \'undefined\'){ %> \r\n     <li class="cm-slide-item" data-key="last" >\r\n      <%=((typeof itemFn == \'function\' && itemFn(lastLoopItem, -1)) || lastLoopItem.name) %>\r\n     </li>\r\n    <%} %>\r\n  </ul>\r\n</div>\r\n';});


define('text!ui/ui.switch.html',[],function () { return '<div class="cui-switch <%if(checkedFlag) { %><%=checkedClass %><% } %> ">\r\n  <div class="cui-switch-bg <%if(checkedFlag) { %><%=checkedClass %><% } %> ">\r\n  </div>\r\n  <div class="cui-switch-scroll">\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.tab.html',[],function () { return '<ul class="cui-tab-mod">\r\n  <%for(var i = 0, len = data.length; i < len; i++) { %>\r\n  <li data-key="<%=data[i].id %>" data-index="<%=i%>" <%if(i == index){ %>class=" <%=curClass %>"\r\n    <%} %>>\r\n    <%=data[i].name %></li>\r\n  <%} %>\r\n  <i class="cui-tab-scrollbar cui-tabnum<%=len %>"></i>\r\n</ul>\r\n';});


define('text!ui/ui.toast.html',[],function () { return '<div class="cui-layer-padding">\r\n  <div class="cui-layer-content">\r\n    <%=content %></div>\r\n</div>\r\n';});


define('text!ui/ui.header.html',[],function () { return '\r\n<div class="cm-header">\r\n<%\r\n\r\nvar i = 0, len = 0, j = 0, jj = 0;\r\nvar left = left;\r\nvar center = center;\r\nvar right =  right.reverse();\r\nvar item = null;\r\nvar outhtml = \'\'\r\nvar dir;\r\nvar btnObj = null;\r\n\r\n%>\r\n\r\n<%for(jj=0; jj < 2; jj++) { %>\r\n  <% \r\n    if(jj == 0) { dir = \'fl\'; btnObj = left; } else { dir = \'fr\'; btnObj = right; }\r\n  %>\r\n  <% for(i = 0, len = btnObj.length; i < len; i++) { %>\r\n    <% item = btnObj[i]; %>\r\n    <%if(typeof item.itemFn == \'function\') { %>\r\n      <%=item.itemFn() %>\r\n    <%} else { %>\r\n      <span class=" cm-header-<%=(item.value ? \'btn\' : \'icon\') %> <%=dir %>  js_<%=item.tagname %>" >\r\n        <% if(item.value) { %>\r\n          <%=item.value %>\r\n        <% } else { %>\r\n          <i class="icon-<%=item.tagname %>"></i>\r\n        <% } %>\r\n      </span>\r\n    <%} %>\r\n  <%} %>\r\n<%} %>\r\n\r\n<% item = center; %>\r\n<%if(typeof item.itemFn == \'function\') { %>\r\n  <%=item.itemFn() %>\r\n<%} else if(item.tagname==\'title\' ||  item.tagname==\'subtitle\') { %>\r\n  <h1 class="cm-page-title js_<%=item.tagname %>" >\r\n    <%if(_.isArray(item.value) && item.value.length == 2) { %>\r\n      <span class="cm-title-l"><%=item.value[0]%></span>\r\n      <span class="cm-title-s"><%=item.value[1]%></span>\r\n    <%} else { %>\r\n      <%=item.value || item.value[0]%>\r\n    <%} %>\r\n  </h1>\r\n<%} else if(item.tagname==\'select\'){ %>\r\n  <h1 class="cm-page-select-title js_<%=item.tagname %>" >\r\n    <%=item.value %>\r\n  </h1>\r\n<%} else if(item.tagname==\'tabs\') { %>\r\n  <h1 class="cm-page-tabs-title js_<%=item.tagname %>" >\r\n    <%for(j = 0; j < item.data.items.length; j ++) { %>\r\n      <span data-key="<%=item.data.items[j].id %>" data-index="<%=j %>" class="<%if(item.data.index==j){ %>active<%} %>" ><%=item.data.items[j].name %></span>\r\n    <% } %>\r\n  </h1>\r\n<% } else{ %>\r\n\r\n<%} %>\r\n\r\n</div>\r\n';});


define('text!ui/ui.warning404.html',[],function () { return '<div class="head-warning">\r\n  <div class="head-warning-padding">\r\n    <div class="head-warning-content">\r\n      <div class="cui-load-fail cui-text-center">\r\n        <div class="cui-load-error">\r\n          <div class="cui-i cui-wifi cui-fail-icon">\r\n          </div>\r\n        </div>\r\n        <p class="cui-gray">\r\n          <%=loadFail %></p>\r\n        <button type="button" class="cui-btns-retry">\r\n          <%=tryAgain %></button>\r\n        <%if(showContact) { %>\r\n          <div class="cui-404-tel">\r\n            <div class="cui-glines">\r\n            </div>\r\n            <p class="cui-grayc">\r\n              <%=telText %></p>\r\n            <span  class="cui-btns-tel"><span class="cui-i cui-warning-kf"></span><%=contact %></span></div>\r\n        <% } %>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n';});


define('text!ui/ui.identitycard.html',[],function () { return '<section class="cm-pop cm-pop--num-keyboard" style=" position: fixed; left: 0; bottom: 0;">\r\n    <div class="cm-pop-bd">\r\n        <div class="cm-keyboard-bar"><span class="btn-secondary js_ok">完成</span></div>\r\n        <ul class="cm-keyboard-list js_num_item ">\r\n            <li class="item-num">1</li>\r\n            <li class="item-num">2</li>\r\n            <li class="item-num">3</li>\r\n            <li class="item-num">4</li>\r\n            <li class="item-num">5</li>\r\n            <li class="item-num">6</li>\r\n            <li class="item-num">7</li>\r\n            <li class="item-num">8</li>\r\n            <li class="item-num">9</li>\r\n            <li class="item-num">X</li>\r\n            <li class="item-num">0</li>\r\n            <li class="item-del js_item_del"><span class="icon-del"><i class="icon-close"></i></span></li>\r\n        </ul>\r\n    </div>\r\n</section>';});


define('text!ui/ui.layer.list.html',[],function () { return '<ul class="list">\r\n  <%for(var i = 0, len = list.length; i < len; i++) {%>\r\n  <li data-index="<%=i%>" <%if(i == index) { %>class="current" <% } %>><%=((typeof itemFn == "function" && itemFn(list[i])) || list[i].name)%></li>\r\n  <%}%>\r\n</ul>\r\n<ul>\r\n  <li class="cancel"><%=cancelText%></li>\r\n</ul>\r\n';});

/**
 * @File c.page.view.js
 * @Description:多数UI View的基类，提供基础方法，以及自建事件机制
 * @author shbzhang@ctrip.com
 * @date 2014-09-30 15:23:20
 * @version V1.0
 */
/**
 * View 基类,继承自Backbone.View
 * @namespace View.cPageView
 * @example
 * defined('cPageView',function(cPageView){
 *  var view = cPageView.extend({
 *    //view初始化调用,在生命周期中只调用一次
 *    onCreate:function(){
 *    },
 *    //view显示时调用
 *    onShow:function(){
 *    ),
 *    //view隐藏调用
 *    onHide:function(){
 *    },
 *    //view获得视口时调用,此方法仅在hybrid有效
 *    onAppear:function(){
 *    }
 *  })
 * })
 */
define('cPageView',['libs',  'UIHeader', 'cGuiderService'],
  function (libs, Header, Guider) {
    


    var PageView = Backbone.View.extend({
      /**
       * 滚动条位置
       * @var
       * @private
       */
      scrollPos: { x: 0, y: 0 },
      /**
       * 标题组件
       * @var View.cPageView.header
       * @type UIHeader
       */
      header   : null,


      /**
       * UBT统计用,web 环境下使用pageid,
       * @var View.cPageView.pageid
       * @type {number|string}
       */
      pageid: 0,

      /**
       * UBT统计用,hybrid 环境下使用pageid
       * @var View.cPageView.hpageid
       * @type {number|string}
       */
      hpageid: 0,

      /**
       * 页面切换时，是否要滚动至顶部
       * @var View.cPageView.scrollZero
       * @type {boolean}
       */
      scrollZero: true,

      /**
       * 页面切换时，是否执行onShow onHide
       * @var View.cPageView.triggerShow
       * @type {boolean}
       */
      triggerShow: true,

      /**
       * 页面切换时，是否执行onShow onHide
       * @var View.cPageView.triggerHide
       * @type {boolean}
       */
      triggerHide: true,

      /**
       * 直落代码,设置此属性和pageid属性后,将会开启电话号码直落功能
       * @var View.cPageView.businessCode
       * @type {string}
       */

      /**
       * 前一个页面的viewName
       * @var View.cPageView.lastViewId
       * @type {string}
       * @deprecated
       */

      /**
       * 前一个页面的viewName
       * @var View.cPageView.referrer
       * @type {string}
       */


      /**
       * View构造函数
       */
      initialize: function () {
        this.id = this.$el.attr("id");
        this.create();
      },

      /**
       * 生成头部
       */
      _createHeader: function () {
        var hDom = $('#headerview');
        this.header = this.headerview = new Header({ 'root': hDom, 'wrapper': hDom });
      },

      /**
       * create 方法,View首次初始化是调用
       * @method View.cPageView.onCreate
       */
      create: function () {
        //调用子类onCreate
        this.onCreate && this.onCreate();
      },

      /**
       * view 销毁方法
       * @method View.cPageView.destroy
       */
      destroy: function () {
        this.$el.remove();
      },

      /**
       * View 显示时调用的方法
       * @method View.cPageView.onShow
       */
      show: function () {
        // fix ios 页面切换键盘不消失的bug shbzhang 2014-10-22 10:44:29
        document.activeElement && document.activeElement.blur();
        //生成头部
        this._createHeader();
        //调用子类onShow方法
        !this.switchByOut && this.$el.show();

        this.triggerShow && this.onShow && this.onShow();

        this.onAfterShow && this.onAfterShow();

        //注册Web_view_did_appear 事件
        Guider.registerAppearEvent(this.onAppear);

        if (this.onBottomPull) {
          this._onWidnowScroll = $.proxy(this.onWidnowScroll, this);
          this.addScrollListener();
        }

        if (this.scrollZero) {
          window.scrollTo(0, 0);
        }

        this.triggerShow = true;
        this.triggerHide = true;

        //如果定义了addScrollListener,说明要监听滚动条事,此方法在cListView中实现
        this.addScrollListener && this.addScrollListener();
      },

      /**
       * View 隐藏
       * @method View.cPageView.onHide
       */
      hide: function () {
        //取消web_view_did_appear 事件的注册
        Guider.unregisterAppearEvent();
        //调用子类onHide方法
        this.triggerHide && this.onHide && this.onHide();
        this.removeScrollListener && this.removeScrollListener();
        this.$el.hide();
      },

      /**
       * View 从Native 回来，重新获取焦点时调用，此方法只在hybrid可用
       * @method View.cPageView.onAppear
       * @param {String} data 再次唤醒事由Native传来的参数
       */
      onAppear: function (data) {
        console.log('onAppear --------------');
      },

      /**
       * 跨频道跳转,建议使用jump2代替
       * @deprecated
       * @method View.cPageView.jump
       * @param {String|JSON} opt
       */
      jump: function (opt) {
        if (_.isString(opt)) {
          window.location.href = opt;
        } else {
          Guider.jump(opt);
        }
      },
      /**
       * 处理跨频道跳转, 屏蔽web与hybrid跨频道的不同,Lizard.jump的快捷方式
       * @method View.cPageView.cross
       * @param {String} url 要跳转的页面,支持http/https/ctripwireless和部分路径
       * @param {Object} [opt]  配置参数, 详细见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
       * @param {number} [opt.targetModel=4] 新页面打开方式,4为单页面打开,5为新webview打开
       * @param {boolean} [opt.replace=false] 是否在浏览器history中增加记录
       * @example
       *  //在web环境下, href会跳转至http://m.ctrip.com/webapp/ticket/index, hybrid环境中会打开ticket/index.html#/webapp/ticket/index
       *  //方式1
       *  Lizard.jump('http://m.ctrip.com/webapp/ticket/index')
       *  //方式2, web环境下会跳转至domain/ticket/index.html,hybrid环境中会打开ticket/index.html#/webapp/ticket/index
       *  Lizard.jump('ticket/index.html')
       */
      cross   : function (url, opt) {
        Lizard.jump(url, opt);
      },
      /*add by wxj 20140527 22:33 end*/
      /**
       * 页面跳转方法,灵活使用此方法,也可实现跨页面跳转,该方法实际代理了Lizard.goTo
       * @method View.cPageView.forward
       * @param {String} url URL信息
       * @param {Object} [opt] 跨页跳转的配置参数,如不传此参数, 则为单页的view切换, 详细参数信息,见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
       * @param {String} [opt.targetModel] 打开模式  如果全局的Lizard.multiView=on开启,则取值为4
       *
       * 0.当前页面刷新url, 该参数类似于js的location.href="", 注：只支持打online地址
       *
       * 1.处理ctrip://协议; 注：只处理ctrip协议的URL Schema
       *
       * 2.开启新的H5页面,title生效; 注：只支持online地址
       *
       * 3.使用系统浏览器打开; 注：只支持online地址和其它App的URL Schema，例如微信的weixin://home
       *
       * 4.开启新的H5页面，title生效，打开webapp目录下的相对路径；注：和2对应，2打开online地址，4打开相对路径
       *
       * 5.当前页面打开webapp目录下相对路径；注：和0对应，0是打开online地址，5是打开本地相对路径。 5.8之前版本，内部自动调用app_cross_package_href
       * @param {String} [opt.pageName] view的唯一标示
       * @param {String} [opt.title]  当targetMode＝2时候，新打开的H5页面的title
       * @param {Boolean} [opt.isShowLoadingPage] 开启新的webview的时候，是否加载app的loading
       * @example
       * //新开WebView的方式打开 osd/osdindex webView的名称指定为webViewOsd
       * view.forward(Lizard.appBaseUrl + 'osd/osdindex', {targetModel: '4', pageName: 'webViewOsd'})
       * //在同一个webView中直接跳转到osd/osdindex
       * view.forward(Lizard.appBaseUrl + 'osd/osdindex')
       */
      forward: function (url, opt) {
        Lizard.forward.apply(null, arguments);
      },
      /**
       * 页面回退方法,如果在第一个页面回退,则自动会回退至native界面,该方法实际代理了Lizard.goBack
       * @method View.cPageView.back
       * @param {String} url URL信息
       * @param {Object} opt 设置信息
       * @param {String} [opt.pageName] 可选,如指定了此参数,多webview的情况,可回退至指定页面
       * @example
       * //回退至上一个页面,框架会判断如果是webview最先打开的页面会直接回退到上一个native页
       * view.goBack()
       * //多WebView的情况下,回退至已打开webViewOsd页面, {pageName: 'webViewOsd'})
       * view.goBack(Lizard.appBaseUrl + 'osd/osdindex', {pageName: 'webViewOsd'})
       */
      back   : function (url, opt) {
        Lizard.back.apply(null, arguments);
      },

      /**
       * 刷新页面
       */
      refresh  : function () {

      },
      /**
       * 唤醒App,要求返回一个app接受的字符串
       * @method View.cPageView.getAppUrl
       * @return {String} url
       */
      getAppUrl: function () {
        return "";
      },

      /**
       * 返回URL中参数的值
       * @method View.cPageView.getQuery
       * @param key
       * @returns {string} value 返回值
       */
      getQuery     : function (key) {
        return Lizard.P(key);
      },
      /**
       * 保存滚动条位置
       */
      saveScrollPos: function () {
        this.scrollPos = {
          x: window.scrollX,
          y: window.scrollY
        };
      },

      /**
       * 恢复原滚动条位置
       * @method View.cPageView.restoreScrollPos
       */
      restoreScrollPos: function () {
        window.scrollTo(this.scrollPos.x, this.scrollPos.y);
      },

      /**
       * 空方法,兼容1.1
       */
      turning    : function () {

      },
      /**
       * 显示单个按钮的alert框
       * @param message 内容
       * @param title 标题
       */
      showMessage: function (params) {
        Lizard.showMessage(params);
      },

      /**
       * 隐藏Alert框
       */
      hideMessage: function () {
        Lizard.hideMessage();
      },

      /**
       * 显示两个按钮的confirm 对话框
       * @param message 内容
       * @param title 标题
       * @param okFn  按钮1回调
       * @param cancelFn 按钮2回调
       * @param okTxt   按钮1文本
       * @param cancelTxt 按钮2文本
       */
      showConfirm: function (params) {
        Lizard.showConfirm(params);
      },

      /**
       * 隐藏confirm对话框
       */
      hideConfirm: function () {
        Lizard.hideConfirm();
      },


      /**
       * 显示showWarnig404,此组件有一个拨打电话和一个重试按钮
       *
       */
      showWarning404: function (params) {
        Lizard.showWarning404(params);

      },

      /**
       * 隐藏waring404组件
       */
      hideWarning404: function () {
        Lizard.hideWarning404();
      },

      /**
       * 显示Toast
       * @method View.cPageView.showToast
       * @param {object} params
       * @param {string} params.title 标题
       * @param {number} params.timeout 显示时长
       * @param {callback} params.callback 隐藏时回调
       * @param {boolean} params.clickToHide 是否允许点击界面任一处,隐藏Toast
       */
      showToast: function (params) {
        Lizard.showToast(params);
      },

      /**
       * 隐藏toast
       * @method View.cPageView.hideToast
       */
      hideToast: function () {
        Lizard.hideToast();
      },

      /**
       * 显示Loading
       * @method View.cPageView.showLoading
       */
      showLoading: function (params) {
        Lizard.showLoading(params);
        //        this.loading.firer = this;
      },

      /**
       * 隐藏Loading
       * @method View.cPageView.hideLoading
       */
      hideLoading: function () {
        //        if (!this.loading.firer || this.loading.firer == this)
        Lizard.hideLoading();
      },


      /**
       * 设置html的title
       * @method View.cPageView.setTitle
       * @param title
       */
      setTitle: function (title) {
        document.title = title;
      },


      /**
       * 发送UBT统计代码
       * @method View.cPageView.sendUbt
       */
      sendUbt: function () {
        Lizard.sendUbt(this);
      }
    })
    return PageView;

  });
/**
 * @File c.page.view.js
 * @Description:多数UI View的基类，提供基础方法，以及自建事件机
 * @author shbzhang@ctrip.com
 * @date 2014-09-30 15:23:20
 * @version V1.0
 */
/**
 *  ListView提供了列表的分次加载功能
 *  @namespace View.cListView
 *  @example
 *  defined('cListView',function(cListView){
 *    var listView = cListView.extend({
 *      //底部刷新
 *      onBottomPull:function(){
 *      },
 *
 *      //顶部刷新
 *      onTopPull:function(){
 *        //用法1:使用默认loading
 *        var self = this;
 *        //显示loading
 *        this.showTopLoading();
 *        setTimeout(function(){
 *          self.hideRefreshLoading();
 *        },500)
 *
 *        //用法2:不使用默认loading的时候调用
 *        //this.endPull();
 *      }
 *    });
 *  });_
 *
 */
define('cPageList',['cPageView', 'cUIBase'],
  function (CPageView, cUIBase) {
    
    var options = {};

    options._onWidnowScroll = null;
    options.__isComplete__ = false;
    options.__isLoading__ = false;
    options.refreshLoading = null;

    /*
     * 增加监听
     */
    options.addScrollListener = function () {
      this.__isComplete__ = false;
      this.__isLoading__ = false;
      $(window).bind('scroll', this._onWidnowScroll);
      var self = this;
      if (this.onTopPull) {
        _.flip(this.$el, 'down', function () {
          var pos = cUI.Tools.getPageScrollPos();
          if (pos.top <= 10 && !self.__isLoading__) {
            self.__isLoading__ = true;
            self.onTopPull();
          }
        }, function (dir) {
          var pos = cUI.Tools.getPageScrollPos();
          return  dir != 'down'||  pos.top >=10 ;
        }, 0, 5);
      }
    };

    /*
     * 移除监听
     */
    options.removeScrollListener = function () {
      $(window).unbind('scroll', this._onWidnowScroll);
      if (this.refreshLoading) {
        this.refreshLoading.remove();
        this.refreshLoading = null;
      }
      _.flipDestroy(this.$el);
    };

    options.onWidnowScroll = function () {
      var pos = cUIBase.getPageScrollPos();
      if (pos.top == 0) return;
      var h = pos.pageHeight - (pos.top + pos.height);
      //fix ios 不容易加载更多数据问题 shbzhang 2014/1/6
      if (h <= 81 && !this.__isComplete__ && !this.__isLoading__) {
        this.__isLoading__ = true;
        this.onBottomPull && this.onBottomPull();
      }
    };


    /**
     * 当滚动条位于底部时, 上拉操作时出发
     * @method View.cListView.onBottomPull
     */

    /**
     * 当滚动条位于顶部时, 下拉操作时出发
     * @method View.cListView.onTopPull
     */

    /**
     * 通知本次下拉操作完成,在不使用默认的showLoading是,需调用endPull
     * @method View.cListView.endPull
     */
    options.endPull = function () {
      this.__isLoading__ = false;
    };

    /**
     * 关闭下拉通知功能
     * @method View.cListView.closePull
     */
    options.closePull = function () {
      this.__isComplete__ = false;
    };

    /**
     * 打开下拉通知功能
     * @method View.cListView.openPull
     */
    options.openPull = function () {
      this.__isComplete__ = true;
    };
    /**
     * 在当前list顶部显示loading
     * @method View.cListView.showTopLoading
     * @param {dom} [listRoot] list的根节点,如果不指定,默认会选当前页面的第一个select 元素
     */
    options.showTopLoading = function (listRoot) {
      var listRoot = listRoot || this.$el.find('section');
      if (listRoot.length > 0) {
        listRoot.before(this.getLoading());
        this.refreshLoading.show();
      }
    };
    /**
     * 在当前list底部显示loading
     * @method View.cListView.showBottomLoading
     */
    options.showBottomLoading = function () {
      //保证每次bottomload在最下面
      this.$el.append(this.getLoading());
      this.refreshLoading.show();
    };

    /**
     * 隐藏loading图标,建议使用hideRefreshLoading代替
     * @View.cListView.showBottomLoading
     * @deprecated
     */
    options.hideBottomLoading = function () {
      this.hideRefreshLoading();
    };

    /**
     * 隐藏loading图标
     * @View.cListView.showBottomLoading
     */
    options.hideRefreshLoading = function () {
      if (this.refreshLoading) {
        this.refreshLoading.hide();
      }
      this.__isLoading__ = false;
    };

    /*
     * 活动默认的loading图标
     * @returns {null|*}
     */
    options.getLoading = function () {
      if (!this.refreshLoading) {
        this.refreshLoading = $('<div class="cui-zl-load" id="zlLoading"> <div class="cui-i cui-b-loading"></div><div class="cui-i  cui-mb-logo"></div> <p>加载中</p></div>');
      }
      return this.refreshLoading;
    };

    var PageView = CPageView.extend(options);
    return PageView;
  });
/**
 * @File c.member
 * @Description: 成员登录
 * @author shbzhang@ctrip
 * @date 2014-09-22 13:45:07
 * @version V1.0
 */

/**
 * 与用户登录相关的工具方法
 * @namespace Service.cMemberService
 */
define('cMemberService',[(Lizard.isHybrid || Lizard.isInCtripApp) ? 'cHybridMember' : 'cWebMember', 'cUserStore'], function (Member, UserStore) {

  /**
   * 判断当前用户是否登陆
   * @method Service.cMemberService.isLogin
   * @returns {Object|boolean} isLogin 当前用户是否登陆
   */
  Member.isLogin = UserStore.getInstance().isLogin;

  /**
   * 返回用户信息
   * @method Service.cMemberService.getUser
   * @returns {Object} userinfo 用户信息
   */
  Member.getUser = UserStore.getInstance().getUser;

  /**
   * 返回当前登陆用户的用户名
   * @method Service.cMemberService.getUserName
   * @returns {String} UserName 用户名
   */
  Member.getUserName = UserStore.getInstance().getUserName;


  /**
   * 返回当前登陆用户的ID
   * @method Service.cMemberService.getUserId
   * @returns {*|string} userId 用户Id
   */
  Member.getUserId = UserStore.getInstance().getUserId;


  return Member;
});
/**
 * @File
 * @Description: (用一句话描述该文件做什么)
 * @author shbzhang@ctrip.com
 * @date 2014-09-19 16:26:12
 * @version V1.0
 */
/**
 * 与用户登录相关的工具方法
 * @namespace Service.cGeoService
 */
define('cGeoService',['cUtilPerformance', 'cLocalStore', 'cCoreInherit', 'cGuiderService', (Lizard.isHybrid || Lizard.isInCtripApp) ? 'cHybridGeolocation' : 'cWebGeolocation'],
  function (cperformance, cStore, cCoreInherit, Guider, TGeoLocation) {
    var geoService = {}, GeoLocation = {};

    var KEY = '0b895f63ca21c9e82eb158f46fe7f502';

    var PositionStore = cCoreInherit.Class(cStore, {
      __propertys__: function () {
        this.key = 'POSITION_CITY';
        this.lifeTime = '10M';
      },
      initialize: function ($super, options) {
        $super(options);
      }
    });

    var posStore = PositionStore.getInstance();

    /**
     * 高德api经纬度获得周边信息
     * @param lng {Number} 经度
     * @param lat {Number} 纬度
     * @param callback {Function} 完成时回调,回传参数为高德下发城市数据
     * @param error {Function} 超时回调
     * @param timeout {Number} 超时的时间长度，默认为8秒
     */
    GeoLocation.requestAMapAround = function (lng, lat, callback, error, timeout) {
      var uuidGeoService = cperformance.getUuid();
      cperformance.group(uuidGeoService, {
        name: "GeoRequest",
        url: "http://restapi.amap.com/v3/place/around",
        type: "AMap service"
      });
      var region = '121.473704,31.230393';
      if (lng && lat) {
        region = lng + ',' + lat;
      }
      var param = $.param({
        'location': region,
        'key': KEY,
        'radius': 500,
        'offset': 4,
        'page': 1
      });

      timeout = timeout || 8000;

      $.ajax({
        url: "http://restapi.amap.com/v3/place/around?" + param,
        dataType: 'jsonp',
        success: function (data) {
          cperformance.groupEnd(uuidGeoService);
          var pois = (data && data.pois) || [];
          callback && callback(pois);
        },
        error: function (e) {
          cperformance.groupEnd(uuidGeoService);
          error && error(e);
        },
        timeout: timeout
      });
    };


    /**
     * 高德api关键字查询
     * @param lng {Number} 经度
     * @param lat {Number} 纬度
     * @param callback {Function} 完成时回调,回传参数为高德下发城市数据
     * @param error {Function} 超时回调
     * @param timeout {Number} 超时的时间长度，默认为8秒
     */
    GeoLocation.requestAMapKeyword = function (keywords, city, callback, error, timeout) {
      //var region = '121.473704,31.230393';
      //if (lng && lat) {
      //    //region = lng + ',' + lat;
      //}
      var uuidGeoService = cperformance.getUuid();
      cperformance.group(uuidGeoService, {
        name: "GeoRequest",
        url: "http://restapi.amap.com/v3/place/text",
        type: "AMap service"
      });

      var param = $.param({
        'keywords': keywords,
        'city': city,
        'key': KEY,
        'offset': 10,
        'page': 1,
        'extensions': 'all'
      });

      timeout = timeout || 8000;

      $.ajax({
        url: "http://restapi.amap.com/v3/place/text?" + param,
        dataType: 'jsonp',
        success: function (data) {
          cperformance.groupEnd(uuidGeoService);
          var pois = (data && data.pois) || [];
          callback && callback(pois);
        },
        error: function (e) {
          cperformance.groupEnd(uuidGeoService);
          error && error(e);
        },
        timeout: timeout
      });
    };

    //将不同环境的实现载入
    _.extend(GeoLocation, TGeoLocation);


    /**
     * 获得周边查询信息
     * @namespace Service.cGeoService.GeoLocation
     */
    geoService.GeoLocation = function () {
      var STATE_INITIALIZE = 0,
        STATE_START = 1,
        STATE_COMPLETE = 2,
        STATE_ERROR = 3;

      //定位回调
      var handler = {},
      //初始状态
        state = STATE_INITIALIZE,
        resource = null;
      //调用回调函数

      function RunCallback(name, args, clearHandler) {
        for (var i in handler) {
          handler[i] && (typeof handler[i][name] === 'function') && handler[i][name].apply(handler[i].scope, args);
        }
        clearHandler && (handler = {});
      }

      return {
        /**
         * 获得当前城市信息
         * @method Service.cGeoService.GeoLocation.Subscribe
         * @param {String} name 一个字符串标记，用于标记当前请求
         * @param {Object} event 要注册的事件
         * @param {function}  [event.onStart] 可选,开始时的回调
         * @param {function}  [event.onComplete] 可选,完成时的回调
         * @param {function}  [event.onError]  可选,当定位成功，但高德定位错误时的回调
         * @param {function}  [event.onPosComplete] 可选,获取经纬度成功后的回调
         * @param {function}  [event.onPosError] 可选，当定位失败的回调
         * @param {function}  [event.onCityComplete] 可选，当定位城市成功的回调
         * @param {function}  [event.onCityError] 可选，当定位城市失败的回调
         * @param {Object} [scope] 可选，当前执行上下文
         * @param {boolean} [nocache=true] 可选，是否不使用缓存
         * @param {number} [timeout=35s] 过期时间，默认为35S
         */
        Subscribe: function (name, events, scope, nocache, timeout) {
          var i;
          events = events || {};
          //之前没有注册过则加入到队列中
          if (!handler[name]) {
            handler[name] = {
              name: name,
              onStart: events.onStart,
              onComplete: events.onComplete,
              onError: events.onError,
              onPosComplete: events.onPosComplete,
              onPosError: events.onPosError,
              onCityComplete: events.onCityComplete,
                    onCityError: events.onCityError,
              scope: scope
            };
          }
          var locationinfo = posStore.get();
          //此参数为真，则强制请求
          if (nocache) {
                    locationinfo = null;
          }
          //有缓存直接调用成功回调，回传结果
          if (locationinfo && locationinfo.posinfo && locationinfo.cityInfo) {
            state = STATE_START;
            RunCallback('onStart', null);
            state = STATE_COMPLETE;
            RunCallback('onPosComplete', [locationinfo.posinfo.lng, locationinfo.posinfo.lat]);
            RunCallback('onComplete', [locationinfo.posinfo]);
            RunCallback('onCityComplete', [locationinfo.cityInfo], true);
            //无缓存则调用加载中回调，并发起请求
          } else {
            clearTimeout(resource);
            resource = setTimeout(function () {
              if (state === STATE_START) {
                state = STATE_ERROR;
                Guider.print({ log: '#cGeoService -- 22 second timeout call onError' });
                RunCallback('onError', [null], true);
              }
            }, timeout || 35000);
            //当在加载中时,加入队列
            if (state === STATE_START) {
              handler[name] && (typeof handler[name].onStart === 'function') && handler[name].onStart.call(scope);
              return;
            }
            state = STATE_START;
            RunCallback('onStart', null);
            Guider.print({ log: '#cGeoService -- start request city info' });
            GeoLocation.requestCityInfo(function (posinfo) {              
              if (!locationinfo) locationinfo = {};
              locationinfo.posinfo = posinfo;
              //add by byl 在此处判断，hybrid定位不将城市信息写到缓存中
              if (!Lizard.isInCtripApp) {
                  posStore.set(locationinfo);
              }
              RunCallback('onComplete', [posinfo]);
            }, function (msg, e) {
              state = STATE_ERROR;
              //app那边禁用定位，这个值会返回e为2
              if (typeof e === 'number' && e === 2) e = { code: 1 };
              Guider.print({ log: '#cGeoService -- locate onError' });
              RunCallback('onError', [msg, e], true);
            }, function (lng, lat) {
              RunCallback('onPosComplete', [lng, lat]);
            }, function (msg, e) {
              state = STATE_ERROR;
              //app那边禁用定位，这个值会返回e为2
              if (typeof e === 'number' && e === 2) e = { code: 1 };
              RunCallback('onPosError', [msg, e], true);
            }, true, function(cityInfo){
              state = STATE_COMPLETE;
              if (!locationinfo) locationinfo = {};
              locationinfo.cityInfo = cityInfo;
              //add by byl 在此处判断，hybrid定位不将城市信息写到缓存中
              if (!Lizard.isInCtripApp) {
                  posStore.set(locationinfo);
              }
              RunCallback('onCityComplete', [cityInfo], true);
            }, function(msg, e){
              state = STATE_ERROR;
              //app那边禁用定位，这个值会返回e为2
              if (typeof e === 'number' && e === 2) e = { code: 1 };
              Guider.print({ log: '#cGeoService -- locate onError' });
              RunCallback('onCityError', [msg, e], true);
            })
          }
        },
        /**
         * 取消某个请求服务
         * @method service.GeoLocation.UnSubscribe
         */
        UnSubscribe: function (name) {
          name = _.isArray(name) ? name : [name];
          for (var i = 0; i < name.length; i++) delete handler[name[i]];
        },
        /**
         * 清空缓存
         * @method service.GeoLocation.ClearPosition
         */
        ClearPosition: function () {
          posStore.remove();
        }
      };
    }();


    /**
     * 获得周边查询信息
     * @namespace Service.cGeoService.GeoAround
     */
    geoService.GeoAround = function () {

      return {
        /**
         * 获得周边查询信息
         * @method Service.cGeoService.GeoAround.Subscribe
         * @param {string} pos 经纬度，经纬度之间以,分割，如lng,lat
         * @param {function} onComplete  完成时的回调
         * @param {function}  onError 错误时的回调
         * @param {object} [scope] 可选，当前执行上下文
         */
        Subscribe: function (pos, onComplete, onError, scope) {
          var lng = pos.split(',')[0];
          var lat = pos.split(',')[1];
          GeoLocation.requestAMapAround(lng,lat, function (posinfo) {
            onComplete.call(scope, posinfo);
          }, function (e) {
            onError.call(scope);
          });
        }
      }

    }();

    /**
     * 获得关键字查询信息
     * @namespace Service.cGeoService.GeoKeyword
     */
    geoService.GeoKeyword = {

        /**
         * 获得关键字查询信息
         * @method Service.cGeoService.GeoKeyword.Subscribe
         * @param {string}  keywords 查询关键字
         * @param {string} city 查询所在城市
         * @param {function} onComplete  完成时的回调
         * @param {function} onError  错误时的回调
         * @param {Object} [scope] 可选，当前执行上下文
         */
        Subscribe: function (keywords, city, onComplete, onError, scope) {
          GeoLocation.requestAMapKeyword(keywords, city, function (posinfo) {
            onComplete.call(scope, posinfo);
          }, function (e) {
            onError.call(scope);
          });
        }
      };


    return geoService;
  });
define('cGeoHelper',[],function(){
  
  /**
   * @class CtripGeoHelper provided by vzxg
   * @description Geo ��ȡ������API
   * @brief Geo ��ȡ������API
   */
  var CtripGeoHelper = {

    /**
     * @brief ����
     * @description  ����
     * @type Int
     * @property Aboard
     * @author jimzhao
     */
    Aboard:2,

    /**
     * @brief ����(�����۰�̨)
     * @description  ����(�����۰�̨)
     * @type Int
     * @property Domestic
     * @author jimzhao
     */
    Domestic:1,

    /**
     * @brief δ֪������
     * @description  δ֪�����⣬��Ҫ���͹ȸ�APIȷ��
     * @type Int
     * @property Unknown
     * @author jimzhao
     */
    Unknown:-1,

    /**
     * @brief �й��ܱ߹��Ҿ�γ�ȷ�Χ
     * @description  �й��ܱ߹��Ҿ�γ�ȷ�Χ����Ҫ���պ���̩�����µ�����
     * @type Array<Rect>
     * @property aroundAboardRectList
     * @author jimzhao
     */
    aroundAboardRectList:[
        [125478833, 40538425, 135928497, 16590043],
        [128054454, 54437790, 136370032, 49918776],
        [89567309, 54351906, 115617882, 47881407],
        [71832315, 54566279, 82281980, 46323836],
        [72788974, 28001436, 85887850, 16590043],
        [92510877, 48029708, 111570476, 45034268],
        [85593493, 26157025, 97294174, 16519064],
        [97073406, 20935216, 107743838, 16305964],
        [98324422, 45190596, 109142033, 42854577],
        [71979493, 45863038, 78896877, 41817208]
    ],

    /**
     * @brief �й����ڰ����龭γ�ȷ�Χ
     * @description  �й����ڰ����龭γ�ȷ�Χ������Ϊ60��������
     * @type Array<Rect>
     * @property chinaRectList
     * @author jimzhao
     */
    chinaRectList:[
        [85374342, 41697126, 124486996, 28705892],
        [98942349, 28714002, 122527683, 23331042],
        [108012216, 23415965, 119252965, 17294543],
        [120025651, 51286036, 126391116, 41330674],
        [82936701, 46727439, 90553182, 41621242],
        [126188746, 48211817, 129757821, 42485061],
        [129518656, 47611932, 131468770, 44959641],
        [131376782, 47487374, 133805226, 46225387],
        [79753968, 41876130, 85604309, 30872189],
        [113457816, 44802677, 120117638, 41517618],
        [118977005, 23526282, 121975765, 21629857],
        [109667973, 17321053, 119050594, 14580095],
        [76258482, 40359687, 80011530, 35915704],
        [90534784, 44710915, 94030271, 41531444],
        [80710628, 45077082, 83028687, 41862379],
        [85935460, 48414308, 88437492, 46645143],
        [93975079, 42559912, 101462779, 41600531],
        [93956681, 44157262, 95354876, 42491869],
        [116695740, 46301949, 120117638, 44619006],
        [116401384, 49444657, 120191227, 48057877],
        [121000708, 53244099, 124569783, 51210984],
        [106724405, 42232628, 113494611, 41683336],
        [112133211, 44355602, 113568200, 42123151],
        [110918989, 43155464, 112206800, 42232628],
        [115150367, 45324216, 116769330, 44724032],
        [126299129, 49588397, 128102064, 48057877],
        [128065270, 49131761, 129757821, 48131826],
        [129721026, 48622090, 130530508, 47611932],
        [124349016, 52822665, 125710416, 51095279],
        [122325313, 28884167, 123760302, 25662561],
        [111029373, 14651757, 118388292, 10605300],
        [109778357, 10095218, 109778357, 10095218],
        [109631178, 10459649, 116548562, 7753573],
        [110514249, 7826971, 113678584, 4734480],
        [124330619, 41399976, 125480450, 40689610],
        [126345123, 42512290, 128046872, 41827986],
        [127973283, 42539507, 129104717, 42143692],
        [74510739, 40162360, 76350468, 38678393],
        [119087389, 21629857, 120706351, 20142916],
        [106853187, 23339537, 108067408, 21990651],
        [129707229, 44975967, 130985841, 43017244],
        [130958245, 44582859, 131169814, 43104932],
        [131418176, 46247729, 133129126, 45359896],
        [133073934, 48054793, 134269758, 47409374],
        [99701237, 23386249, 101577762, 22174986],
        [100179567, 22243514, 101559364, 21745927],
        [101485775, 23437187, 104245370, 22875776],
        [98008686, 25240784, 99057332, 24181992],
        [124463999, 40686109, 124905534, 40461646],
        [125457453, 41334141, 126055365, 40979564],
        [126368119, 41824546, 126607284, 41645397],
        [125475850, 40979564, 125687419, 40853958],
        [124477797, 40465160, 124728460, 40343852],
        [124470898, 40347371, 124618076, 40285757],
        [124891736, 40694862, 125153898, 40607283],
        [126046166, 41332407, 126262335, 41165784],
        [127214395, 41836586, 128083666, 41546995],
        [126386516, 50257998, 126386516, 50257998],
        [126280732, 50257998, 127513351, 49580921],
        [126363520, 50934256, 127117809, 50225552],
        [125669022, 52398490, 126276133, 51247082],
        [80948643, 30905163, 81403976, 30280446],
        [83574857, 30911112, 85488176, 29214825],
        [98136317, 28872274, 99079179, 27642374]
        ],

    /**
     * @brief ���л��������ο򣬰����պ���̩����ӡ�ȣ��ɹŲ�������
     * @description  �й����ڰ����龭γ�ȷ�Χ������Ϊ60��������
     * @type Rect
     * @property largeChinaRect
     * @author jimzhao
     */
    largeChinaRect:[73083331, 54006559, 135266195, 17015367],

    /**
     * @brief �Ƿ��ھ��η�Χ��
     * @description  �Ƿ��ھ��η�Χ��
     * @param {long} iLong ���ȣ�long���ͣ�������1000000
     * @param {long} iLat γ�ȣ�long���ͣ�������1000000
     * @param {Array} rectArr ���ο������ϣ����������������ߣ��������ͣ�rect
     * @return {Boolean} �Ƿ��ھ��ο���
     * @method isInRect
     * @author jimzhao
     */
    isInRect:function(iLong, iLat, rectArr) {
        if ( (iLong >= rectArr[0] && iLong <= rectArr[2]) &&
         (iLat >= rectArr[3] &&  iLat <= rectArr[1]) ) {
          return true;
        }
        return false;
    },

    /**
     * @brief �Ƿ���һ�����ο���Χ��
     * @description  �Ƿ���һ�����ο���Χ��
     * @param {long} iLong ���ȣ�long���ͣ�������1000000
     * @param {long} iLat γ�ȣ�long���ͣ�������1000000
     * @param {Array<Rect>} rectArrList  һ�������ľ��ο���rect
     * @return {Boolean} �Ƿ���һ���������ο���
     * @method isInRectList
     * @author jimzhao
     */
    isInRectList:function(iLong, iLat, rectArrList) {
        for (var i = 0; i < rectArrList.length - 1; i++) { 
            smallRect = rectArrList[i];
            if (this.isInRect(iLong, iLat,smallRect)) {
                return true;
            }
        }

        return false;
    },

    /**
     * @brief ��ȡ��������ʶ
     * @description ��ȡ��������ʶ�� ����Ϊδ֪ʱ������ʹ��Google ����ַAPI�������󣬸���google���أ�ȷ������.
     * @param {float} longitude ���ȣ���λ��ȡ
     * @param {float} latitude γ�ȣ���λ��ȡ
     * @return {Int}  Unknown=-1/Domestic=1/Aboard=2,δ֪�����ڣ�����
     * @method getCountry
     * @author jimzhao
     * @example

        japanRet = CtripGeoHelper.getCountry(130.460979,31.665179);
        if (japanRet == CtripGeoHelper.Domestic) {
            //TODO:����
        } else if (japanRet == CtripGeoHelper.Aboard) {
            //TODO:����
        } else {
            //TODOδ֪:send API request to Google, ���ݹ��Ҵ���ȷ������
            //API�������� http://ditu.google.cn/maps/api/geocode/json?latlng=37.332331410000002,-122.0312186
        }
     */
    getCountry:function(longitude, latitude) {
        var ret = this.Unknown;
        var newLat = latitude*1000000;
        var newLog = longitude*1000000;

        isInAboard = !(this.isInRect(newLog, newLat, this.largeChinaRect)); //�Ǵ��л������ж�
        if (!isInAboard) {
            isInAboard = this.isInRectList(newLog, newLat,this.aroundAboardRectList); //�й��ܱߵĹ������ң��պ���̩����ӡ�ȵȵ����ж�
        }

        if (isInAboard) {
            ret = this.Aboard; //����
        } 
        else {
            inInLand = this.isInRectList(newLog, newLat, this.chinaRectList);
            if (inInLand) {
              ret = this.Domestic; //����
            }
        }

        return ret;
      }
  };
  
  return CtripGeoHelper;
});
define('cStatic',[],function () {


  //GA代码
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-3748357-1', 'auto');
  ga('send', 'pageview');


  //UBT代码
  var s = document.getElementsByTagName('script')[0];
  var reg = /_bfa\.min\.js/i;
  if (_.some($('SCRIPT'), function (script) {
    return reg.test(script.src);
  })) {
    return;
  }
  if ((window.$_bf && window.$_bf.loaded) || window.$LAB || window.CtripJsLoader) {
    return;
  }
  var d = new Date(), v = '?v=' + d.getFullYear() + d.getMonth() + '_' + d.getDate() + '.js';

  var bf = document.createElement('script');
  bf.type = 'text/javascript';
  bf.charset = 'utf-8';
  bf.async = true;
  try {
    var p = 'https:' == document.location.protocol;
  } catch (e) {
    var p = 'https:' == document.URL.match(/[^:]+/) + ":";
  }
  bf.src = (p ? "https://webresource.c-ctrip.com/code/ubt/_mubt.min.js" + v : 'http://webresource.c-ctrip.com/code/ubt/_mubt.min.js' + v);
  s.parentNode.insertBefore(bf, s);
});
/**
 * @File c.underscore.plugin
 * @Description  underscroe的扩展方法
 * @author wang_l@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */

define('cUnderscorePlugin',[],function () {

  // 全局可能用到的变量
  var arr = [];
  var slice = arr.slice;
  /**
   * inherit方法，js的继承，默认为两个参数
   *
   * @param  {function} origin  可选，要继承的类
   * @param  {object}   methods 被创建类的成员，扩展的方法和属性
   * @return {function}         继承之后的子类
   */
  _.inherit = function (origin, methods) {

    // 参数检测，该继承方法，只支持一个参数创建类，或者两个参数继承类
    if (arguments.length === 0 || arguments.length > 2) throw '参数错误';

    var parent = null;

    // 将参数转换为数组
    var properties = slice.call(arguments);

    // 如果第一个参数为类（function），那么就将之取出
    if (typeof properties[0] === 'function')
      parent = properties.shift();
    properties = properties[0];

    // 创建新类用于返回
    function klass() {
      if (_.isFunction(this.initialize))
        this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;

    // 父类的方法不做保留，直接赋给子类
    // parent.subclasses = [];

    if (parent) {
      // 中间过渡类，防止parent的构造函数被执行
      var subclass = function () {
      };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass();

      // 父类的方法不做保留，直接赋给子类
      // parent.subclasses.push(klass);
    }

    var ancestor = klass.superclass && klass.superclass.prototype;
    for (var k in properties) {
      var value = properties[k];

      //满足条件就重写
      if (ancestor && typeof value == 'function') {
        var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/g, '').split(',');
        //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）
        if (argslist[0] === '$super' && ancestor[k]) {
          value = (function (methodName, fn) {
            return function () {
              var scope = this;
              var args = [
                function () {
                  return ancestor[methodName].apply(scope, arguments);
                }
              ];
              return fn.apply(this, args.concat(slice.call(arguments)));
            };
          })(k, value);
        }
      }

      //此处对对象进行扩展，当前原型链已经存在该对象，便进行扩展
      if (_.isObject(klass.prototype[k]) && _.isObject(value) && (typeof klass.prototype[k] != 'function' && typeof value != 'fuction')) {
        //原型链是共享的，这里处理逻辑要改
        var temp = {};
        _.extend(temp, klass.prototype[k]);
        _.extend(temp, value);
        klass.prototype[k] = temp;
      } else {
        klass.prototype[k] = value;
      }

    }

    if (!klass.prototype.initialize)
      klass.prototype.initialize = function () {
      };

    klass.prototype.constructor = klass;

    return klass;
  };


  /**
   * Underscore 的扩展方法
   * @namespace Global._
   */
//flip手势工具
  (function () {

    //偏移步长
    var step = 20;

    var touch = {};
    var down = 'touchstart';
    var move = 'touchmove';
    var up = 'touchend';
    if (!('ontouchstart' in window)) {
      down = 'mousedown';
      move = 'mousemove';
      up = 'mouseup';
    }

    //简单借鉴ccd思维做简要处理
    function swipeDirection(x1, x2, y1, y2, sensibility) {

      //x移动的步长
      var _x = Math.abs(x1 - x2);
      //y移动步长
      var _y = Math.abs(y1 - y2);
      var dir = _x >= _y ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');

      //设置灵敏度限制
      if (sensibility) {
        if (dir == 'left' || dir == 'right') {
          if ((_y / _x) > sensibility) dir = '';
        } else if (dir == 'up' || dir == 'down') {
          if ((_x / _y) > sensibility) dir = '';
        }
      }
      return dir;
    }

    //sensibility设置灵敏度，值为0-1
    function flip(el, dir, fn, noDefault, sensibility, stepSet) {
      if (!el || !el[0]) return;
      var _dir = '', _step = stepSet || step;

      /*
       这里原来的逻辑是绑定几次flip便会执行几次，这里做一次优化
       */
      el[0]['__flip_' + dir] = fn;
      if (el[0].__hasFlipEvent) {
        return;
      }
      el[0].__hasFlipEvent = true;

      //var _step = sensibility || step;
      el.on(down, function (e) {
        var pos = (e.touches && e.touches[0]) || e;
        touch.x1 = pos.pageX;
        touch.y1 = pos.pageY;

      }).on(move, function (e) {

        var pos = (e.touches && e.touches[0]) || e;
        touch.x2 = pos.pageX;
        touch.y2 = pos.pageY;

        //如果view过长滑不动是有问题的
        //if (!noDefault) { e.preventDefault(); }
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > _step) ||
          (touch.y2 && Math.abs(touch.y1 - touch.y2) > _step)) {
          _dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);
        }
        var preventDefultFlag = typeof noDefault == 'function' ? noDefault(_dir) : noDefault;
        if (!preventDefultFlag) {
          e.preventDefault();
        }
      }).on(up, function (e) {
        var pos = (e.changedTouches && e.changedTouches[0]) || e;
        touch.x2 = pos.pageX;
        touch.y2 = pos.pageY;

        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > _step) ||
          (touch.y2 && Math.abs(touch.y1 - touch.y2) > _step)) {
          var _dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);

          if (_.isFunction(el[0]['__flip_' + _dir])) {
            el[0]['__flip_' + _dir]();
          }

        } else {

          if (_.isFunction(el[0]['__flip_tap'])) {
            el[0]['__flip_tap']();
          }
        }
        //l_wang 每次up后皆重置
        touch = {};
      });
    }

    function flipDestroy(el) {
      if (!el || !el[0]) return;

      el.off(down).off(move).off(up);
      if (el[0].__hasFlipEvent) delete el[0].__hasFlipEvent;
      if (el[0].__flip_left) delete el[0].__flip_left;
      if (el[0].__flip_right) delete el[0].__flip_right;
    }

    _.flip = flip;
    _.flipDestroy = flipDestroy;
    $.flip = flip;
    $.flipDestroy = flipDestroy;
  })();

//日期操作类
  (function () {

    /**
     * @namespace  Global._.dateUtil
     * @description 静态日期操作类，封装系列日期操作方法. 输入时候月份自动减一，输出时候自动加一
     */
    _.dateUtil = {
      /**
       * @description 数字操作，
       * @return {string} 返回处理后的数字
       */
      formatNum         : function (n) {
        if (n < 10) return '0' + n;
        return n;
      },
      /**
       * @description 将字符串转换为日期，支持格式y-m-d ymd (y m r)以及标准的
       * @return {Date} 返回日期对象
       */
      parse             : function (dateStr, formatStr) {
        if (typeof dateStr === 'undefined') return null;
        if (typeof formatStr === 'string') {
          var _d = new Date(formatStr);
          //首先取得顺序相关字符串
          var arrStr = formatStr.replace(/[^ymd]/g, '').split('');
          if (!arrStr && arrStr.length != 3) return null;

          var formatStr = formatStr.replace(/y|m|d/g, function (k) {
            switch (k) {
              case 'y':
                return '(\\d{4})';
              case 'm':
                ;
              case 'd':
                return '(\\d{1,2})';
            }
          });

          var reg = new RegExp(formatStr, 'g');
          var arr = reg.exec(dateStr)

          var dateObj = {};
          for (var i = 0, len = arrStr.length; i < len; i++) {
            dateObj[arrStr[i]] = arr[i + 1];
          }
          return new Date(dateObj['y'], dateObj['m'] - 1, dateObj['d']);
        }
        return null;
      },
      /**
       * @description将日期格式化为字符串
       * @return {string} 常用格式化字符串
       */
      format            : function (date, format) {
        if (arguments.length < 2 && !date.getTime) {
          format = date;
          date = new Date();
        }
        typeof format != 'string' && (format = 'Y年M月D日 H时F分S秒');
        return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function (a) {
          switch (a) {
            case "y":
              return (date.getFullYear() + "").slice(2);
            case "Y":
              return date.getFullYear();
            case "m":
              return date.getMonth() + 1;
            case "M":
              return _.dateUtil.formatNum(date.getMonth() + 1);
            case "d":
              return date.getDate();
            case "D":
              return _.dateUtil.formatNum(date.getDate());
            case "h":
              return date.getHours();
            case "H":
              return _.dateUtil.formatNum(date.getHours());
            case "f":
              return date.getMinutes();
            case "F":
              return _.dateUtil.formatNum(date.getMinutes());
            case "s":
              return date.getSeconds();
            case "S":
              return _.dateUtil.formatNum(date.getSeconds());
          }
        });
      },
      // @description 是否为为日期对象，该方法可能有坑，使用需要慎重
      // @param year {num} 日期对象
      // @return {boolean} 返回值
      isDate            : function (d) {
        if ((typeof d == 'object') && (d instanceof Date)) return true;
        return false;
      },
      // @description 是否为闰年
      // @param year {num} 可能是年份或者为一个date时间
      // @return {boolean} 返回值
      isLeapYear        : function (year) {
        //传入为时间格式需要处理
        if (_.dateUtil.isDate(year)) year = year.getFullYear()
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) return true;
        return false;
      },

      // @description 获取一个月份的天数
      // @param year {num} 可能是年份或者为一个date时间
      // @param year {num} 月份
      // @return {num} 返回天数
      getDaysOfMonth    : function (year, month) {
        //自动减一以便操作
        month--;
        if (_.dateUtil.isDate(year)) {
          month = year.getMonth(); //注意此处月份要加1，所以我们要减一
          year = year.getFullYear();
        }
        return [31, _.dateUtil.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      },

      // @description 获取一个月份1号是星期几，注意此时的月份传入时需要自主减一
      // @param year {num} 可能是年份或者为一个date时间
      // @param year {num} 月份
      // @return {num} 当月一号为星期几0-6
      getBeginDayOfMouth: function (year, month) {
        //自动减一以便操作
        month--;
        if ((typeof year == 'object') && (year instanceof Date)) {
          month = year.getMonth();
          year = year.getFullYear();
        }
        var d = new Date(year, month, 1);
        return d.getDay();
      }
    };

  })();
});

/**
 * @File c.json.plugin
 * @Description:  Android 下 重写 JSON.stringfiy
 * @author wang_l@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
define('cJsonPlugin',[],function () {
  if (navigator.userAgent.indexOf('Android') > 0) {
    JSON.stringify = {}
  }
  (function () {
    
    function f(n) {
      return n < 10 ? '0' + n : n
    }
    if (typeof Date.prototype.toJSON !== 'function') {
      Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
      };
      String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
      }
    }
    var cx,
      escapable,
      gap,
      indent,
      meta,
      rep;
    function quote(string) {
      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable,
        function (a) {
          var c = meta[a];
          return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
      var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
      if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key)
      }
      if (typeof rep === 'function') {
        value = rep.call(holder, key, value)
      }
      switch (typeof value) {
        case 'string':
          return quote(value);
        case 'number':
          return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
          return String(value);
        case 'object':
          if (!value) {
            return 'null'
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === '[object Array]') {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || 'null'
            }
            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
            gap = mind;
            return v
          }
          if (rep && typeof rep === 'object') {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              if (typeof rep[i] === 'string') {
                k = rep[i];
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ': ' : ':') + v)
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ': ' : ':') + v)
                }
              }
            }
          }
          v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
          gap = mind;
          return v
      }
    }
    if (typeof JSON.stringify !== 'function') {
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      meta = {
        '\b' : '\\b',
        '\t' : '\\t',
        '\n' : '\\n',
        '\f' : '\\f',
        '\r' : '\\r',
        '"' : '\\"',
        '\\' : '\\\\'
      };
      JSON.stringify = function (value, replacer, space) {
        var i;
        gap = '';
        indent = '';
        if (typeof space === 'number') {
          for (i = 0; i < space; i += 1) {
            indent += ' '
          }
        } else if (typeof space === 'string') {
          indent = space
        }
        rep = replacer;
        if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
          throw new Error('JSON.stringify');
        }
        return str('', {
          '' : value
        })
      }
    }
  }());
});
/**
 * @File c.market.plugin
 * @Description 页面切换时写入隐藏域唤醒url
 * @author wang_l@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
define('cMarketPlugin',['cMessageCenter'], function (MessageCenter) {

  return function () {
    MessageCenter.subscribe('viewReady', function (inView) {
      //add by byl 在此处判断inView中的getAppUrl是否存在,如果存在将返回值添加到隐藏域app_url
      var appUrlDoom = $('#app_url');
      if (inView && typeof inView.getAppUrl === 'function') {
        var newAppUrl = inView.getAppUrl();
        if (newAppUrl && _.isString(newAppUrl)) {
          if (!appUrlDoom.length) {
            $('<INPUT type="hidden" id="app_url" value="' + newAppUrl + '"/>').appendTo($('body'));
          } else {
            appUrlDoom.val(newAppUrl);
          }
        }
      } else {
        if (appUrlDoom.length > 0) {
          appUrlDoom.val("");
        }
      }
    });
  };
});

/**
 * @File c.market.plugin
 * @Description 修复safari下,修复safari下 回退不执行JS的问题
 * @author wang_l@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
define('cSafariPlugin',[],function () {
  window.shown = false;
  window.onpageshow = function (e) {
    if (window.shown) {
      window.location.reload();
    }
    window.shown = true;
  };

  window.onunload = function () {
  };
});


/**
 * @File c.market.plugin
 * @Description 页面切换时送UBT,K
 * @author wang_l@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
define('cStatisticsPlugin',['cMessageCenter'], function (MessageCenter) {

  return function () {
    //注册切换时,发送统计数据
    MessageCenter.subscribe('viewReady', function (view) {
      Lizard.sendUbt(view);
      _sendGA();
      googleRemark(view);
      //Kenshoo统计代码 add by byl
      _sendKenshoo();
      _sendMarin();
    });


    /**
     * 发送UBT统计数据
     * @param {View} view
     */
    Lizard.sendUbt = function (view) {
      if(!view) return;
      if (!window.__bfi) window.__bfi = [];
      var url = view.$el.attr('page-url'),
        pageId = getPageId(view);
        orderid = Lizard.P("orderid") || Lizard.P("oid") || "";
      if (pageId === 0) {
        return;
      }
      $('#bf_ubt_orderid').val(orderid);
      var ubtURL = window.location.protocol + '//' + window.location.host + url;
      var refererView = Lizard.instance.views[view.referrer];
      window.__bfi.push(['_asynRefresh', {
        page_id: pageId,
        orderid: orderid,
        url: getViewUrl(view),
        refer: refererView ? getViewUrl(refererView) : document.referrer
      }]);
    };

    /*
     * 页面切换时,应首先向ubt发送unload
     */
    Lizard.unloadUbt = function (view) {
      if(!view) return;
      if (!window.__bfi) window.__bfi = [];
      window.__bfi.push(['_unload', {
        page_id: getPageId(view),
        url: getViewUrl(view),
        refer: view ? getViewUrl(view) : document.referrer
      }]);
    }

    var getViewUrl = function (view) {
      var url = "";
      if (!view) return;
      if (Lizard.isHybrid) {
        url = 'http://hybridm.ctrip.com' + view.$el.attr('page-url');
      } else {
        url = window.location.protocol + '//' + window.location.host + view.$el.attr('page-url')
      }
      return url;
    };

    var getPageId = function (view) {
      return Lizard.isHybrid ? view.hpageid : view.pageid;
    };
    /**
     * Kenshoo统计代码
     */
    var _sendKenshoo = function () {
      var orderID = Lizard.P("orderID"), // || Lizard.P("oId") ; 此处暂不写oid的统计，没有明确文档说明oid需要统计
        type = Lizard.P("type") || Lizard.P("busType") || '',
        val = Lizard.P("val") || Lizard.P("price") || '';
      if (orderID) {
        var kurl = "https://2113.xg4ken.com/media/redir.php?track=1&token=8515ce29-9946-4d41-9edc-2907d0a92490&promoCode=&valueCurrency=CNY&GCID=&kw=&product="
        kurl += "&val=" + val + "&orderId=" + orderID + "&type=" + type;
        var imgHtml = "<img style='position: absolute;' width='1' height='1' src='" + kurl + "'/>"
        $('body').append(imgHtml);
      }
    };

    /**
     * 发送Marinsm 统计
     */
    var _sendMarin = function () {
      var orderID = Lizard.P("orderID"), // || Lizard.P("oId") ;
        type = Lizard.P("type") || Lizard.P("busType") || '',
        val = Lizard.P("val") || Lizard.P("price") || '';
      if (orderID) {
        var murl = "https://tracker.marinsm.com/tp?act=2&cid=6484iki26001&script=no"
        murl += "&price=" + val + "&orderid=" + orderID + "&convtype=" + type;
        var imgHtml = "<img style='position: absolute;' width='1' height='1' src='" + murl + "'/>"
        $('body').append(imgHtml);
      }
    };

    /**
     * GA统计
     */
    var _sendGA = function () {
      if (typeof ga !== 'undefined') {
        ga('send', 'pageview', location.href);
      }
    };

    /**
     * google营销
     * @param view
     */
    var googleRemark = function (view) {
      if (Lizard.isHybrid) {
        var url = getViewUrl(view);
        var method = CtripBusiness && CtripBusiness.app_log_google_remarkting;
        typeof  method == 'function' && method(url);
      } else {

      }
    };
  };
});

/**
 * @File c.plugins
 * @Description: 插件的集合类
 * @author shbzhang@ctrip.com
 * @date  2013/6/23 16:26:12
 * @version V1.0
 */
define('cPlugins',['cUnderscorePlugin','cJsonPlugin','cMarketPlugin','cSafariPlugin','cStatisticsPlugin'],
  function (UndersorePlugin,JsonPlugin, MarketPlugin,SafariPlugin,cStatisticsPlugin) {
  return {
    regStatisticsEvent: cStatisticsPlugin,
    regMarketEvent: MarketPlugin
  };
});
define('cBaseInit',['cPlugins',Lizard.isHybrid ? 'cHybridApp' : 'cWebApp'], function (plugins,lizard) {

  function createLizardins() {
    if (Lizard.pdConfig) {
      require(Lizard.pdConfig, function () {
        _createLizardIns();
      });
    }
    else {
      _createLizardIns();
    }
  }

  function _createLizardIns() {
    //此处new Lizard 初始化
    Lizard.instance = new lizard({});
    for (var n in Lizard.instance.interface()) {
      Lizard[n] = $.proxy(Lizard.instance.interface()[n], Lizard.instance);
    }
    plugins.regStatisticsEvent();
    plugins.regMarketEvent();
  }

  return createLizardins;
});
/**
 * 面向 H5 开发人员，提供调用 HybridAPI 的界面。
 * 此界面为向前兼容而写作，新开发中请尽量直接使用 cHybridShell 中提供的方法。
 * @author jiangjing@ctrip.com （旧版作者 cmli@Ctrip.com）
 * @deprecated since Lizard 2.1 / APP 6.0
 * @see cHybridShell
 */
define('cHybridFacade',['cHybridShell', 'cCommonStore'], function(cHybridShell, CommonStore) {
	'use strict'

	// 针对每一个方法索引名：
	// ⑴ 在旧版本中，所有 cHybridFacade.request() 调用均以参数集合为为唯一参数，因此：
	//    如果方法索引名对应的 Hybrid API 方法需要参数，请将其对应的参数集合键值按顺序放在 argnames 数组中；
	// ⑵ 如果方法标签名（Hybrid）无法由方法索引名按约定规则生成，请用 tagname 属性指示其正确的方法标签名（Hybrid）；
	// ⑶ 如果方法参数需要特殊处理，请指定 parseArgs 函数；
	// ⑷ 如果方法回调函数需要特殊处理，请指定 parseCallback 函数。

	// e.g. 
	//   INDEX_NAME: { 
	//     // 匹配的方法标签名（Hybrid）
	//     tagname: 'TAG_NAME', 
	//
	//     // 参数表，顺序应与 Hybrid API 方法形参一致，以下假设 options 为 cHybridFacade.request(options) 实参。
	//     argnames: [ 
	//       // 该位置实参将取值 options.p1
	//       'p1',
	//       // 该位置实参将忽略 options，直接取值为 1000
	//       [ 1000 ],
	//       // 若 option.p3 为非真值，该位置实参取值为 0 
	//       { p3: 0 },
	//       // 将 options.p4 作为函数参数，取返回值为该位置实参
	//       { p4: function(value) { if (!value) return 1000; } }
	//     ],
	//     
	//     // Hybrid API 将以该方法的返回值为实参
	//     parseArgs: function(options) { return options; },
	//     
	//     // 回调函数预处理
	//     parseCallback: function(options) { return function() {}; } //
	//   },
	var METHOD_INFO = {
		ABORT_HTTP_PIPE_REQUEST             : { argnames: [ 'sequenceId' ] },
		ADD_WEIXIN_FRIEND                   : {},
		APP_CALL_SYSTEM_SHARE               : { argnames: [ 'imageRelativePath', 'text', 'title', 'linkUrl', 'isIOSSystemShare' ] },
		APP_CHECK_ANDROID_PACKAGE_INFO      : {},
		APP_CHECK_NETWORK_STATUS            : {},
		APP_CHOOSE_INVOICE_TITLE            : { argnames: [ 'title' ] },
		APP_CHOOSE_PHOTO                    : { argnames: [ {maxFileSize: 200}, {maxPhotoCount: 1}, {meta: { canEditSinglePhoto: false }} ] },
		APP_FINISHED_LOGIN                  : { argnames: [ 'userInfo' ] },
		APP_FINISHED_REGISTER               : { argnames: [ 'userInfo' ] },
		APP_GET_DEVICE_INFO                 : {},
		APP_LOG_GOOGLE_REMARKTING           : { argnames: [ {url: function() { return window.location.href; }} ] },
		APP_NETWORK_DID_CHANGED             : {},
		APP_READ_VERIFICATION_CODE_FROM_SMS : {},
		APP_SHOW_MAP_WITH_POI_LIST          : { tagname: 'show_map_with_POI_list', argnames: [ 'poiList' ] },
		APP_SHOW_VOICE_SEARCH               : { argnames: [ 'bussinessType' ] },
		AUTO_LOGIN                          : { tagname: 'member_auto_login' },
		BACK                                : {},
		BACK_TO_BOOK_CAR                    : {},
		BACK_TO_HOME                        : {},
		BACK_TO_LAST_PAGE                   : { argnames: [ {param: ''} ] },
		BECOME_ACTIVE                       : {},
		CALL_PHONE                          : { argnames: [ 'tel' ] },

	    // @todo 不需要提供电话号码吗？//add by byl 12/01 此处添加callphone的两个参数
	    CALL_SERVICE_CENTER                 : {  argnames: [ { tel : ''},{ pageId : ''},{ businessCode : ''}  ],tagname: 'call_phone' },

		CHECK_APP_INSTALL                   : { tagname: 'check_app_install_status', argnames: [ 'url', 'package' ] },
		CHECK_FILE_EXIST                    : { argnames: [ 'fileName', 'relativeFilePath' ] },
		CHECK_PAY_APP_INSTALL_STATUS        : {},
		CHECK_UPDATE                        : {},
		CHOOSE_CONTACT_FROM_ADDRESSBOOK     : {},
		CITY_CHOOSE                         : { tagname: 'cityChoose' },
		COMMIT                              : {},
		COPY_TO_CLIPBOARD                   : { tagname: 'copy_string_to_clipboard', argnames: [ 'content' ] },
		CROSS_DOMAIN_HREF                   : { argnames: [ 'moduleType', 'anchor', 'param' ] },
		CROSS_JUMP                          : { tagname: 'cross_package_href', argnames: [ 'path', 'param' ] },
		DELETE_FILE                         : { argnames: [ 'fileName', 'relativeFilePath' ] },
		DOWNLOAD_DATA                       : { argnames: [ 'url', 'suffix' ]},
		ENABLE_DRAG_ANIMATION               : { argnames: [ 'show' ] },
		ENCRYPT_BASE64                      : { tagname: 'base64_encode', argnames: [ 'info' ] },
		ENCRYPT_CTRIP                       : { tagname: 'ctrip_encrypt', argnames: [ 'inString', 'encType' ] },

		// @deprecated
		ENTRY                               : {}, 

		FAVORITE                            : {},
		FAVORITED                           : {},
		GET_CURRENT_SANDBOX_NAME            : {},
		GET_FILE_SIZE                       : { argnames: [ 'fileName', 'relativeFilePath' ] },
		GO_TO_BOOK_CAR_FINISHED_PAGE        : { argnames: [ 'url' ] },
		GO_TO_HOTEL_DETAIL                  : { argnames: [ 'hotelId', 'hotelName', 'cityId', 'isOverSea' ] },
		H5_NEED_REFRESH                     : {},
		H5_PAGE_FINISH_LOADING              : {},
		HIDE_LOADING_PAGE                   : {},
		INIT                                : { tagname: 'init_member_H5_info' },

		LOCATE                              : { 
			argnames: [ [3000], [true] ], 
			parseCallback: function(options) {
				return function(params) {
					try { options.success(params); } catch (ex) { options.error(params); }
				};
			}
		},

		LOG_EVENT                           : { argnames: [ 'event_name' ] },
		MAKE_DIR                            : { argnames: [ 'dirname', 'relativeFilePath' ] },
		MEMBER_LOGIN                        : { argnames: [ 'isShowNonMemberLogin' ] },
		NATIVE_LOG                          : { tagname: 'log' },
		NON_MEMBER_LOGIN                    : {},
		OPEN_ADV_PAGE                       : { argnames: [ 'url' ] },
		OPEN_PAY_APP_BY_URL                 : { argnames: [ 'payAppName', 'payURL', 'successRelativeURL', 'detailRelativeURL' ] },
		OPEN_URL                            : { argnames: [ 'openUrl', 'targetMode', {title: ''}, {pageName: ''}, {isShowLoadingPage: false}] },
		PHONE                               : {},
		READ_FROM_CLIPBOARD                 : { tagname: 'read_copied_string_from_clipboard' },
		READ_TEXT_FROM_FILE                 : { argnames: [ 'fileName', 'relativeFilePath' ] },
		RECOMMEND_APP_TO_FRIEND             : { tagname: 'recommend_app_to_friends' },
		REFRESH_NATIVE                      : { tagname: 'refresh_native_page', argnames: [ 'package', 'json' ] },
		REFRESH_NAV_BAR                     : { argnames: [ 'config' ] },
		REGISTER                            : { tagname: 'member_register' },
		SAVE_PHOTO                          : { argnames: [ 'photoUrl', 'photoBase64String', 'imageName' ] },
		SEARCH                              : {},
		SEND_H5_PIPE_REQUEST                : { argnames: [ 'serviceCode', 'header', 'data', 'sequenceId', {pipeType: ''} ] },
		SEND_HTTP_PIPE_REQUEST              : { argnames: [ 'target', 'methods', 'header', 'queryData', 'retryInfo', 'sequenceId' ] },
		SET_NAVBAR_HIDDEN                   : { argnames: [ 'isNeedHidden' ] },
		SET_TOOLBAR_HIDDEN                  : { argnames: [ 'isNeedHidden' ] },
		SHARE                               : {},
		SHARE_TO_VENDOR                     : { tagname: 'call_system_share', argnames: [ 'imgUrl', 'text', {title: ''}, {linkUrl: ''}, {isIOSSystemShare: false} ] },
		SHOW_LOADING_PAGE                   : {},
		SHOW_MAP                            : { argnames: [ 'latitude', 'longitude', 'title', 'subtitle' ] },
		SHOW_NEWEST_INTRODUCTION            : {},
		WEB_VEW_DID_APPEAR                  : { tagname: 'web_view_did_appear' },
		WEB_VIEW_DID_APPEAR                 : {},
		WEB_VIEW_FINISHED_LOAD              : {},
		WRITE_TEXT_TO_FILE                  : { argnames: [ 'text', 'fileName', 'relativeFilePath', 'isAppend' ] } 
	};

	var _ME = {
		methodInfo: function(name) {
			var info = METHOD_INFO[name];

			// 如未指定匹配的方法标签名（Hybrid），则按默认规则自动生成。
			if (!info.tagname) {
				info.tagname = name.toLowerCase().replace(/^app_/, '');
			}

			return info;
		},

		// 方法索引名转换成方法标签名（Lizard）
		name2var: function(name) { return 'METHOD_' + name; },

		// 方法标签名（Lizard）转换成方法索引名
		var2name: function(varname) { return varname.substr(7); },

		var2tagname: function(varname) {
			var name = _ME.var2name(varname), info = _ME.methodInfo(name);
			return info.tagname;
		}
	};

	var exports = {
		/**
		 * 初始化。
		 * @singleton
		 */
		init: function() {
			var _me = exports.init;
			if (_me.called) return; _me.called = true;
			
			// 执行初始化。
			cHybridShell.init();

			// 按 cHybridFacade 在程序架构中的角色，它的任务应是忠实地代理 Hybrid API，而不应介入业务逻辑处理。
			// 如确需作全局处理，应在其他特定的工具类中进行封装。
			var callback, pretreater, posttreater;

			pretreater = function(log, result) {
				if (!window.localStorage.getItem('isPreProduction')) cHybridShell.abort();
				return [ '@[Wireless H5] ' + log, result ];
			};
			cHybridShell.preTreat('log', pretreater);

			callback = function(params) {
				if (params && params.data) {
					var userStore = CommonStore.UserStore.getInstance();
					var userInfo = userStore.getUser();
					userStore.setUser(params.data);

					var headStore = CommonStore.HeadStore.getInstance();
					var headInfo = headStore.get();
					headInfo.auth = params.data.Auth;
					headStore.set(headInfo);
				}
			};
			cHybridShell
				.upon('init_member_H5_info', callback)
				.upon('member_auto_login'  , callback)
				.upon('member_login'       , callback)
				.upon('member_register'    , callback)
				.upon('non_member_login'   , callback);

			callback = function(params) {
				if (typeof params == 'undefined') return;

				var store = {
					SERVERDATE      : params.timestamp       ,
					SOURCEID        : params.sourceId        ,
					isPreProduction : params.isPreProduction 
				};

				if (params.device) {
					store.DEVICEINFO = JSON.stringify({ device: params.device });
				}   
				
				if (params.appId) {
					store.APPINFO = JSON.stringify({
						version       : params.version,
						appId         : params.appId,
						serverVersion : params.serverVersion,
						platform      : params.platform
					});
				}

				_.each(store, function(value, key) {
					if (value) window.localStorage.setItem(key, value);
				});
			};
			cHybridShell.upon('init_member_H5_info', callback);

			// 主动获取网络状态，并保持监听。
			callback = function(params) { Lizard.networkType = params.networkType; };
			cHybridShell
				.on('network_did_changed', callback)
				.fn('check_network_status', callback)();

			// 有些回调函数的开发人员认为错误代码应在主参数集中取得。
			posttreater = function(params, err) {
				if (!params) params = {};
				if (err) params.error_code = err.number;
				return params;
			};
			cHybridShell.postTreat('save_photo', posttreater);
		},

		/**
		 * @deprecated since Lizard 2.1 / APP 6.0
		 */
		getOpenUrl: function(options) {
			var url = (Internal && Internal.isYouthApp ? 'ctripyouth' : 'ctrip') + '://wireless/' + options.module + '?';
			var params = [];
			for (var i in options.param) params.push(i + '=' + options.param[i]);
			return url + params.join('&');
		},

		/**
		 * 注册方法，绑定指定的回调函数，使与 Hybrid 约定的全局回调函数能够适时地通过 window.app.callback() 调用该回调函数。
		 * 本方法是调用 Hybrid 方法前的预处理，并不会实际调用任何 Hybrid 内置方法。
		 * 特别注意：本方法参数集合中的 tagname 并不是 unix_style 而是 METHOD_UNIX_STYLE。
		 * @method cHybridFacade.register
		 * @param  {object}   options               参数集合
		 * @param  {string}   options.tagname       方法标签名（Lizard）
		 * @param  {function} options.callback      回调函数
		 * @deprecated since Lizard 2.1 / APP 6.0
		 */
		register: function(options) {
			// 因为上述的特别注意，故删除
			// cHybridShell.on(options.tagname, options.sequenceId, options.callback);

			// 有些意外的情况，程序员会不先调用 registerOne() 而直接使用 register() 为一个自定义功能注册回调函数，
			// 此时，var2tagname() 方法会报错。
			try {
				var tagname = _ME.var2tagname(options.tagname);
			} catch (ex) { return; }  // 在旧版中，遇此类情况不作为，不报错！

			cHybridShell
				.off(tagname, options.sequenceId)
				.on(tagname, options.sequenceId, options.callback);
		},

		/**
		 * 方法注册前预处理。
		 *
		 * @method cHybridFacade.registerOne
		 * @param  {string}   varname               方法标签名（Lizard）
		 * @param  {string}   [tagname]             方法标签名（Hybrid）
		 * @deprecated since Lizard 2.1 / APP 6.0
		 */
		// 在旧版中，该方法用于生成一个注册方法（用于完成方法注册的方法），以 tagname 为索引保存在 defaultRegisterHandler 中。
		// 该注册方法被调用时：
		// ⑴ 将生成一个间接回调方法，以 tagname 和 sequenceId 为索引保存在 defaultHandler 中；
		// ⑵ 将用户提供的回调函数，以 tagname 和 sequenceId 为索引保存在 defaultCallback 中。
		registerOne: function(varname, tagname) {
			METHOD_INFO[_ME.var2name(varname)] = { tagname: tagname };
		},

		/**
		 * 调用方法（通常需设定一个或多个回调函数）。
		 * @method cHybridFacade.request
		 * @param  {object}   options               参数集合
		 * @param  {string}   options.name          方法标签名（Hybrid）
		 * @param  {MIXED}    options.*             其他参数视具体方法而定
		 */
		request: function(options) {
			var info = _ME.methodInfo(_ME.var2name(options.name));      

			// ⑵ 处理参数；
			var args = [];
			if (info.parseArgs) args = info.parseArgs(options);
			else if (info.argnames) {
				_.each(info.argnames, function(argname) {
					var arg;
					if (_.isString(argname)) arg = options[argname];
					else if (_.isArray(argname)) arg = argname[0];
					else {
						var p = _.pairs(argname)[0], t = typeof p[1];
						arg = options[p[0]];
						if (typeof p[1] == 'function') arg = p[1](arg);
						else if (!arg) arg = p[1];
					}
					args.push(arg);
				});
			}
			
			// ⑴ 处理回调函数；
			var callback = info.parseCallback ? info.parseCallback(options) : options.callback;

			// ⑶ 通过代理方法发起对 Hybrid API 的请求。
			cHybridShell
				.off(info.tagname, options.sequenceId)
				.fn(info.tagname, options.sequenceId, callback).apply(null, args);
		},

		/**
		 * 解除方法注册。
		 * @method cHybridFacade.unregister
		 * @param  {object}   options               参数集合
		 * @param  {string}   options.tagname       方法标签名（Hybrid）
		 * @deprecated since Lizard 2.1 / APP 6.0
		 */
		/**
		 * 解除方法注册。
		 * @method cHybridFacade.unregister
		 * @param  {string}   tagname               参数集合
		 * @deprecated since Lizard 2.1 / APP 6.0
		 */
		unregister: function(tagname) {
			// 参数兼容
			if (typeof arguments[0] == 'object') tagname = arguments[0].tagname;
			
			// 取消回调函数登记
			cHybridShell.off(tagname);
		}
	};
	
	// 初始化常量定义
	_.each(METHOD_INFO, function(info, name) {
		var varname = _ME.name2var(name);
		exports[varname] = varname;
	})
	
	return exports;
});
/**
 * @description 与hybrid 相关的操作
 * @File c.hybrid.guider
 * @author shbzhang@ctrip.com
 * @date  2014-09-22 13:47:55
 * @version V1.0
 */
/**
 * @descrption 与hybrid 相关的操作
 */
define('cHybridGuider',['cHybridFacade', 'cHybridShell'], function (Facade, Hish) {
  

  var HybridGuider = {
    /**
     * @description Hybrid页面，打开链接URL地址，兼容App和浏览器
     * @method Service.cGuiderService.jump
     * @param {object} options 输入参数
     * @example
     * 参数：
     * {
     *    targetModel：refresh，//{String }refresh|app|h5|browser|open|open_relative
     *    title:"",// {String} 标题栏 当targetModel = 'h5'    时，新打开的H5页面的title
     *    url:''  ,  // {String } 需要打开的URL，可以为ctrip://,http(s)://,file://等协议的URL
     *    pageName:'' , //{String} 当targetModel = 'refresh'|'h5'|'open'时，本页面，或者新打开的H5页面，此时pageName有效，pageName当作H5页面唯一标识，可用于刷新页面；5.6版本加入
     *    isShowLoadingPage:false  //{boolean} 开启新的webview的时候，是否加载app的loading
     * }
     */
    jump: function (options) {
      var model = {
        refresh: function () {
          Facade.request({ name: Facade.METHOD_OPEN_URL, targetMode: 0, title: options.title, pageName: options.pageName });
        },
        app: function () {
          if (options && options.module) {
            var openUrl = Facade.getOpenUrl(options);
            Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: openUrl, targetMode: 1, title: options.title, pageName: options.pageName });
          } else if (options && options.url) {
            Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 1, title: options.title, pageName: options.pageName });
          }
        },
        h5: function () {
          if (options && options.url) {
            Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 2, title: options.title, pageName: options.pageName, isShowLoadingPage: options.isShowLoadingPage});
          }
        },
        browser: function () {
          if (options && options.url) {
            Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 3, title: options.title, pageName: options.pageName, isShowLoadingPage: options.isShowLoadingPage});
          }
        },
        open: function () {
          if (options && options.url) {
            Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 4, title: options.title, pageName: options.pageName, isShowLoadingPage: options.isShowLoadingPage});
          }
        },
        open_relative: function () {
          if (options && options.url) {
            Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 5, title: options.title, pageName: options.pageName, isShowLoadingPage: options.isShowLoadingPage});
          }
        }
      };

      if (typeof model[options.targetModel] === 'function') {
        model[options.targetModel]();
      }
    },

	  /**
	   * 根据环境不同执行不同的函数分支
	   * @method Service.cGuiderService.apply
	   * @param {Object} options 输入参数
     * @param {function} [options.hybridCallback] hybrid环境下的执行函数
     * @param {function} [options.callback] web环境下的执行函数
	   * @example
	   * //参数
	   * {
	   *   hybridCallback：function(){}
	   *  }
	   */
    apply: function (options) {
      if (_.isObject(options) && _.isFunction(options.hybridCallback)) {
        options.hybridCallback();
      }
    },

	  /**
	   * @description  进入H5模块，初始化数据 H5接收到web_view_did_finished_load的回调之后，调用该函数，初始化数据会通过callback传递给H5
	   * @method Service.cGuiderService.init
	   * @param {object} options 输入参数
     * @param {function} options.callback 回调
	   * @example
	   * //参数：
	   * {
	   *    version:5.8，callback:function(){}
	   * }
	   */
    init: function (options) {
      if (options && window.parseFloat(options.version) < 5.2) {
        Facade.request({ name: Facade.METHOD_ENTRY, callback: options.callback });
      } else {
        Facade.request({ name: Facade.METHOD_INIT, callback: options.callback });
      }
    },

	  /**
	   * @description,上传日志至服务端, H5页面调用该函数，需要将增加的event_name告知native，native需要整理纪录
	   * @method Service.cGuiderService.log
	   * @param {object} options 输入参数
     * @param {string} name 日志
	   * @example
	   * //参数：
	   * {name:""}
	   */
    log: function (options) {
      Facade.request({ name: Facade.METHOD_LOG_EVENT, event_name: options.name });
    },

	  /**
	   * @description 将log写入到native的日志界面
	   * @method Service.cGuiderService.print
	   * @param {object} options 输入参数
     * @param {string} options.log 需要打印打log
     * @param {string} [options.result] 上一句log执行的结果，可以为空,打印的时候会自动换行，加入时间
	   * @example
	   * //参数：
	   * {log:"",result:""}
	   */
    print: function (options) {
      Facade.request({ name: Facade.METHOD_NATIVE_LOG, log: options.log, result: options.result });
    },

	  /**
	   * @description 拨打ctrip呼叫中心号码
	   * @method Service.cGuiderService.callService
     * @param {object} opt 参数
     * @param {string} [opt.tel] 电话号码,如果不传,使用渠道包的默认号码
     * @param {pageid} [opt.businessCode] 业务号码
     * @param [pageId] [opt.pageId] ubt pageId,hybrid下默认取view.hpageid
	   */
    callService: function (options) {
     //add by byl 在此处添加pageid以及businessCode参数
     var curView;
     if(Lizard && Lizard.instance && Lizard.instance.curView){
       curView = Lizard.instance.curView;
     }
     if(curView && curView.businessCode){
       Facade.request({ name: Facade.METHOD_CALL_SERVICE_CENTER, tel: (options && options.tel) || '', pageId : curView.hpageid || '', businessCode : curView.businessCode || '' });
     }else{
       Facade.request({ name: Facade.METHOD_CALL_SERVICE_CENTER });
     }
    },

	  /**
	   * @description 退回到H5页面的上一个页面，离开H5. v5.3开始支持带参数给上一个H5页面
	   * @method Service.cGuiderService.backToLastPage
	   * @param {Object} options 输入参数
     * @param {object} options.param 参数
     * @since v5.3
	   * @example
	   * //参数：
	   * {
	   *    param:Object //跳转到上一个页面的参数
	   * }
	   */
    backToLastPage: function (options) {
      var param = options ? options.param : '';
      Facade.request({ name: Facade.METHOD_BACK_TO_LAST_PAGE, param: param });
    },

	  /**
	   * @description 检查App的版本更新
	   * @method Service.cGuiderService.checkUpdate
	   */
    checkUpdate: function () {
      Facade.request({ name: Facade.METHOD_CHECK_UPDATE });
    },

	  /**
	   * @description 推荐携程旅行给好友
	   * @method Service.cGuiderService.recommend
	   */
    recommend: function () {
      Facade.request({ name: Facade.METHOD_RECOMMEND_APP_TO_FRIEND });
    },

	  /**
	   * @description 添加微信好友
	   * @method Service.cGuiderService.addWeixinFriend
	   */
    addWeixinFriend: function () {
      Facade.request({ name: Facade.METHOD_ADD_WEIXIN_FRIEND });
    },

	  /**
	   *  @description 查看最新版本功能介绍
	   *  @method Service.cGuiderService.showNewestIntroduction
	   */
    showNewestIntroduction: function () {
      Facade.request({ name: Facade.METHOD_SHOW_NEWEST_INTRODUCTION });
    },

	  /**
	   * @description 自定义注册需要hybrid回调执行的方法（确保此方法会在hybrid中执行，不然不会执行回调函数
	   * @method Service.cGuiderService.register
	   * @param {Object} options 输入参数
     * @param {string} options.tagname 事件名
     * @param {string} options.callback 回调
	   * @example
	   * //参数:
	   * {tagname:"non_member_login",callback:function(){}}
	   */
    register: function (options) {
      if (options && options.tagname && options.callback) {
        Facade.register({ tagname: options.tagname, callback: options.callback });
      }
    },

	  /**
	   * @description 进入H5模块，初始化数据 H5接收到web_view_did_finished_load的回调之后，调用该函数，初始化数据会通过callback传递给H5
	   * @method Service.cGuiderService.create
	   */
    create: function () {
      Facade.init();
    },

	  /**
	   * @description 退回到首页，离开H5
	   * @method Service.cGuiderService.home
	   */
    home: function () {
      Facade.request({ name: Facade.METHOD_BACK_TO_HOME });
    },


	  /**
	   * @description 检查是否安装App
	   * @method Service.cGuiderService.checkAppInstall
	   * @param {Object} options 输入参数
     * @param {string} options.url 尝试打开的URL
     * @param {string} options.callback 返回检查的回调
	   * @example
	   * //参数:
	   * {
	   *    url:"ctrip://wireless", //尝试打开的URL
	   *    packageName:"com.ctrip.view" //app的包名，android使用
	   *    callback: function(data){ //回调数据：
	   *      var data =  {
	   *       isInstalledApp:false //布尔值返回是否有安装
	   *      }
	   *    }
	   */
    checkAppInstall: function (options) {
      Facade.request({ name: Facade.METHOD_CHECK_APP_INSTALL, url: options.url, package: options.package, callback: options.callback });
    },

	  /**
	   * @description 拨打电话
	   * @method Service.cGuiderService.callPhone
	   * @param {Object} options 输入参数
     * @param {object} options.tel  电话号码
	   * @example
	   * //参数：
	   *  {
	   *    tel:"13800138000"
	   *  }
	   */
    callPhone: function (options) {
      Facade.request({ name: Facade.METHOD_CALL_PHONE, tel: options.tel });
    },

	  /**
	   * @description H5跨模块/站点跳转
	   * @method Service.cGuiderService.cross
	   * @param {Object} options 输入参数
     * @param {string} options.path 模块名称，如hotel, car, myctrip,
     * @param {string} optiosn.param  作为URL，拼接在path后面的页面和其它参数 index.html#cashcouponindex?cash=xxxx
	   * @example
	   * //参数：
	   * {
	   *    param:"index.html#cashcouponindex?cash=xxxx",
	   *    path:"myctrip"
	   * }
	   */
    cross: function (options) {
      Facade.request({ name: Facade.METHOD_CROSS_JUMP, param: options.param, path: options.path });
    },

	  /**
	   * @description H5通知Native刷新
	   * @method Service.cGuiderService.refreshNative
	   * @param {Object} options 输入参数
     * @param {string} package 要刷新的页面名字,该字段需要H5和native共同约定，H5调用之后，native需要捕获该名字的boardcast/notification
     * @param {string} json //刷新该页面需要的参数
	   * @example
	   * //参数：
	   * {
	   *    pakage:"xxxxPageName"
	   *    json:"xxxx_json_string"
	   * }
	   */
    refreshNative: function (options) {
      Facade.request({ name: Facade.METHOD_REFRESH_NATIVE, package: options.package, json: options.json });
    },

	  /**
	   * @description 复制文字到粘贴板
	   * @method Service.cGuiderService.copyToClipboard
	   * @param {Object} options 输入参数
     * @param {string} options.content 文字内容
	   * @example
	   * //参数：
	   * {
	   *    content:"" // String 需要复制的文字
	   * }
	   */
    copyToClipboard: function (options) {
      Facade.request({ name: Facade.METHOD_COPY_TO_CLIPBOARD, content: options.content });
    },
	  /**
	   * @description 从粘贴板读取复制的文字
	   * @method Service.cGuiderService.readFromClipboard
	   * @param {Object} options 输入参数
     * @param {function} callback 读取后回调
	   * @example
	   * //参数：
	   * {
	   *    callback:function(content){
	   *      //content 回调函数
	   *    }
	   * }
	   */
    readFromClipboard: function (options) {
      Facade.request({ name: Facade.METHOD_READ_FROM_CLIPBOARD, callback: options.callback });
    },

	  /**
	   * @description 调用App的分享
	   * @method Service.cGuiderService.shareToVendor
	   * @param {Object} options 输入参数
     * @param {string} options.imgUrl 将要分享的图片相对路径，相对webapp的路径
     * @param {string} options.text 需要分享的文字,微博分享文字限制在140
     * @param {string} options.title 需要分享的标题, v5.4开始支持该字段，微信和email支持
     * @param {string} options.linkUrl 需要分享的链接, v5.4开始支持该字段
     * @param {boolean} options.isIOSSystemShare 是否支持IO6系统
	   * @example
	   * //参数：
	   * {
	   *    imgUrl:'',
	   *    text:'',
	   *    title:'',
	   *    linkUrl:','
	   *    isIOSSystemShare:false //是否是ios系统
	   * }
	   */
    shareToVendor: function (options) {
      Facade.request({ name: Facade.METHOD_SHARE_TO_VENDOR, imgUrl: options.imgUrl, text: options.text, title: options.title, linkUrl: options.linkUrl, isIOSSystemShare: options.isIOSSystemShare });
    },

	  /**
	   * @description 根据URL下载数据
	   * @method Service.cGuiderService.downloadData
	   * @param {Object} options 输入参数
     * @param {string} options.url 下载url
     * @param {string} options.suffix 需要保存文件
     * @param {boolean} [options.isIgnoreHttpsCertification=false] 是否忽略非法的HTTPS证书
     * @param {string} options.callback 回调
	   * @example
	   * //参数：
	   * {
	   *    url:"",//需要下载内容的URL
	   *    //data.downloadUrl 下载地址
	   *    //data.savedPath 保存地址
	   *    //data.isSuccess 是否成功
	   *    //error_code 错误码 param_error/download_fail
	   *    callback:function(data, error_code){
	   *      data = {
	   *
	   *      },
	   *      error_code  //错误码
	   *    },
	   *    suffix:'' //保存文件的后缀
	   * }
	   * //回调参数,此参数成功时只回调param,错误时可获取error_code
	   * //成功：
	   * {
	   *    downloadUrl:"http://www.baidu.com/bdlogo.gif",
	   *    savedPath:"../wb_cache/pkg_name/md5_url_hash", false
	   *  }
	   *  //错误error_code:"xxxxx",//param_error,download_faild
	   */
    downloadData: function (options) {
      Facade.request({ name: Facade.METHOD_DOWNLOAD_DATA, url: options.url, callback: options.callback, suffix: options.suffix });
    },

	  /**
	   * @description base64 UTF8编码
	   * @method Service.cGuiderService.encode
	   * @param {Object} options 输入参数
     * @param {string} options.info 需要做base64 encode的字符串
     * @param {function} options.callback 编码完成后执行的回调方法
	   * @example
	   * //参数：
	   * {
	   *    callback:function(data){}, //编码完成后执行的回调方法
	   *    info:'' //需要做base64 encode的字符串
	   * }
	   * //回调参数：
	   *  {
     *      inString:"xxxxxx", //传入的String
     *      encodedString:"eHh4eHh4", // 编码之后的String
     *  }
	   */
    encode: function (options) {
      if (options && options.mode === 'base64') {
        Facade.request({ name: Facade.METHOD_ENCRYPT_BASE64, callback: options.callback, info: options.info });
      }
    },

	  /**
	   * @description 从通讯录选取联系人
	   * @method Service.cGuiderService.chooseContactFromAddressbook
	   * @param {Object} options 输入参数
     * @param {function} options.callback 选取联系人之后的回调
	   * @example
	   * //回调参数:
	   *{
     *  name:"xxx",
     *  phoneList:[{"家庭":1320000000}, {"工作":021888888888}], //手机号码有一个标签＋号码
     *  emailList:[{"家庭":a@gmail.com}, {"工作":b@yahoo.com}]  //email有标签＋号码
	   *}
	   */
    chooseContactFromAddressbook: function (options) {
      Facade.request({ name: Facade.METHOD_CHOOSE_CONTACT_FROM_ADDRESSBOOK, callback: options.callback });

    },

	  /**
	   * @description 隐藏native的loading界面
	   * @method Service.cGuiderService.hideLoadingPage
	   */
    hideLoadingPage: function () {
      Facade.request({ name: Facade.METHOD_HIDE_LOADING_PAGE });
    },

	  /**
	   * @description 显示native的loading界面
	   * @method Service.cGuiderService.showLoadingPage
	   */
    showLoadingPage: function () {
      Facade.request({ name: Facade.METHOD_SHOW_LOADING_PAGE });
    },

	  /**
	   * @description 选择常用发票title
	   * @method Service.cGuiderService.choose_invoice_title
	   * @param {Object} options 输入参数
     * @param {string} options.title 标题
     * @param {function} options.callback 回调函数
	   * @example
	   * //参数：
	   * {
	   *    callback:function(){},// {function}回调函数
	   *    title:"" // {String} 当前已经选择好的发票title
	   * }
	   * //回调参数：
	   *  {
     *     selectedInvoiceTitle:"所选择的发票title"
     *   }
	   */
    choose_invoice_title: function (options) {
      Facade.request({ name: Facade.METHOD_APP_CHOOSE_INVOICE_TITLE, callback: options.callback, title: options.title });
    },

	  /**
	   * @description 获取设备相关信息，相关部门需要
	   * @method Service.cGuiderService.get_device_info
	   * @param {Object} options 输入参数
     * @param {function} options.callback 回调
	   * @example
	   * //回调参数：
	   * {
     *  IP:"",
     *  OS:"\U82f9\U679c",
     *  account:"",
     *  areaCode:"",
     *  baseStation:"",
     *  clientID:12933032900000135327,
     *  latitude:0,
     *  longitude:0,
     *  mac:"10:DD:B1:CF:C1:80",
     *  port:"",
     *  wifiMac:""
     * };
	   */
    get_device_info: function (options) {
      Facade.request({ name: Facade.METHOD_APP_GET_DEVICE_INFO, callback: options.callback });
    },

	  /**
	   * @description 进入语音搜索,5.7版本，语音搜索之后的结果，不需要BU处理，只需调用即可，后续版本，可能只做语音解析，解析结果传递给H5，BU自行处理
	   * @method Service.cGuiderService.show_voice_search
	   * @param {Object} options
     * @param {number} options.bussinessType 业务类型(0. 无（默认）1. 机票 2. 酒店3 . 火车票 5. 目的地 6. 攻略 7.景点门票 8.周末/短途游) 61：团队游 62：周末游 63：自由行 64：邮轮
	   * @example
	   * //参数：
	   * {
	   *    bussinessType:0 //业务类型(0. 无（默认）1. 机票 2. 酒店3 . 火车票 5. 目的地 6. 攻略 7.景点门票 8.周末/短途游) 61：团队游 62：周末游 63：自由行 64：邮轮
	   * }
	   */
    show_voice_search: function (options) {
      Facade.request({ name: Facade.METHOD_APP_SHOW_VOICE_SEARCH, bussinessType: options.bussinessType });
    },

	  /**
	   * @description 选取图片/拍摄照片，base64返回图片
	   * @method Service.cGuiderService.choose_photo
	   * @param {Object} options 输入参数
     * @param {number} [options.maxFileSize=200*1024] 最大的图片文件大小，单位是bit，默认200*1024
     * @param {number} [options.maxPhotoCount=1]  最多支持选择的图片个数,默认为1张，此时不显示多选
     * @param {object} {options.meta} 图片选取相关配置信息，5.8新增，5.8版本开始支持1个key， canEditSinglePhoto:单选能否编辑
     * @param {function} {options.callback} 回调
	   * @example
	   * //参数：
	   * {
	   *    maxFileSize: 200*1024 , //{int} 最大的图片文件大小，单位是bit，默认200*1024
	   *    maxPhotoCount:1,        // {int} 最多支持选择的图片个数,默认为1张，此时不显示多选
	   *    meta:{},                 //{Object} 图片选取相关配置信息，5.8新增，5.8版本开始支持1个key， canEditSinglePhoto:单选能否编辑
	   *    callback:function(data){} //{function} 图片选取后的回调函数
	   * }
	   * //回调参数
	   * {
     *    photoList:["xx089xessewz....", "xx089xessewz...."]
     * }
	   */
    choose_photo: function (options) {
      Facade.request({ name: Facade.METHOD_APP_CHOOSE_PHOTO, maxFileSize: options.maxFileSize, maxPhotoCount: options.maxPhotoCount, meta: options.meta, callback: options.callback });
    },

	  /**
	   * @description H5完成注册，将注册信用户息告知Native，native做登录
	   * @method Service.cGuiderService.finished_register
	   * @param {Object} options 输入参数
     * @param {object} options.userInfo 用户信息
     * @param {string} options.userInfo.userID userID
     * @param {string} options.userInfo.phone phone
     * @param {string} options.userInfo.password password
	   */
    finished_register: function (options) {
      Facade.request({ name: Facade.METHOD_APP_FINISHED_REGISTER, userInfo: options.userInfo });
    },

	  /**
	   * @description 调用app共享
	   * @method Service.cGuiderService.app_call_system_share
	   * @param {Object} options 输入参数
     * @param {string} options.imageRelativePath 将要分享的图片相对路径，相对webapp的路径
     * @param {string} options.text 需要分享的文字,微博分享文字限制在140
     * @param {string} options.title 需要分享的标题, v5.4开始支持该字段，微信和email支持；
     * @param {string} options.linkUrl 需要分享的链接
	   * @example
	   * //参数：
	   * {
	   *    imageRelativePath:'',//将要分享的图片相对路径，相对webapp的路径
	   *    text:'',//需要分享的文字,微博分享文字限制在140
	   *    title:'',//需要分享的标题, v5.4开始支持该字段，微信和email支持；
	   *    linkUrl:'' //需要分享的链接, v5.4开始支持该字段
	   *    isIOSSystemShare:false //是否是ios系统
	   * }
	   */
    app_call_system_share: function (options) {
      Facade.request({ name: Facade.METHOD_APP_CALL_SYSTEM_SHARE, imageRelativePath: options.imageRelativePath,
        text: options.text, title: options.title, linkUrl: options.linkUrl, isIOSSystemShare: options.isIOSSystemShare});
    },

	  /**
	   * @description 检查当前App网络状况
	   * @method Service.cGuiderService.app_check_network_status
	   * @param {Object} options
     * @param {function} options.callback 检查完成后的回调
	   * @example
	   * //回调参数：
	   * {
	   *    tagname:"check_network_status",
     *    hasNetwork:true,//布尔值返回是否有网络
     *    networkType:"4G", //5.8开始加入， None-无网络, 2G-蜂窝数据网EDGE/GPRS, 3G-蜂窝数据网HSPDA,CDMAVOD, 4G-LTE(4G为5.9加入), WIFI-WLAN网络
	   * }
	   */
    app_check_network_status: function (options) {
      Facade.request({ name: Facade.METHOD_APP_CHECK_NETWORK_STATUS, callback: options.callback });
    },

	  /**
	   * @description 检查渠道包信息 此方法目前不可用，后期会改成app_check_app_package_info
	   * @method Service.cGuiderService.app_check_android_package_info
	   * @param {Object} options
     * @param {funcion} options.callback 检查完成后的回调函数
	   * @example
	   * //回调参数：
	   * {
	   *    isHideAdv:true,
	   *    isHideAppRecommend:true
	   * }
	   */
    app_check_android_package_info: function (options) {
      Facade.request({ name: Facade.METHOD_APP_CHECK_ANDROID_PACKAGE_INFO, callback: options.callback });
    },

	  /**
	   * @description 记录google remarkting的screenName
	   * @method Service.cGuiderService.app_log_google_remarkting
	   * @param {String} url 需要纪录的页面名
	   */
    app_log_google_remarkting: function (url) {
      Facade.request({ name: Facade.METHOD_APP_LOG_GOOGLE_REMARKTING, url: url });
    },

	  /**
	   * @description 获取短信中的验证码
	   * @method Service.cGuiderService.app_read_verification_code_from_sms
	   * @param {Object} options 输入参数
     * @param {function} options.callback 获取验证码之后的回调{callback:function(data){}}
	   * @example
	   * //回调参数：
	   * {
	   *    verificationCode = "8890
	   * }
	   */
    app_read_verification_code_from_sms: function (options) {
      Facade.request({ name: Facade.METHOD_APP_READ_VERIFICATION_CODE_FROM_SMS, callback: options.callback });
    },

	  /**
	   * @description H5页面加载完成，通知native app，app会隐藏loading界面
	   * @method  Service.cGuiderService.app_h5_page_finish_loading
	   */
    app_h5_page_finish_loading: function (options) {
      Facade.request({ name: Facade.METHOD_H5_PAGE_FINISH_LOADING });
    },

	  /**
	   * @description 保存照片到相册
	   * @method Service.cGuiderService.save_photo
	   * @param {Object} options 输入参数
     * @param  {string} options.photoUrl 需要保存图片的URL
     * @param {string} options.photoBase64String 需要保存图片的base64字符串,UTF8编码
     * @param {string} options.imageName  图片保存到相册的名字
     * @param {function} options.callback 保存完成后的回调
	   * @example
	   * //参数：
	   * {
	   *    photoUrl:'',//{String} 需要保存图片的URL， 注：当photoBase64String字段不为空的时候，base64图片内容优先，URL不处理
	   *    photoBase64String:'',//{String} 需要保存图片的base64字符串,UTF8编码
	   *    imageName:"", //图片保存到相册的名字，android有效，ios无效. 不传的时候，默认android存储为image.jpg
	   *    callback；function(){} //保存完成后的回调
	   * }
	   * //回调参数：
	   *    error_code:"xxxxx",//error_code有内容时候，代表有错误，否则表示保存成功.error_code分为以下几种
	   *    //(-200)参数错误, base64字符串转换成图片失败
	   *    //(-201)下载成功，图片格式不正确
	   *    //(-202)下载图片失败
	   *    //(-203)保存到相册失败
	   */
    save_photo: function(options)
    {
      if (!options.photoUrl) options.photoUrl = null;
      if (!options.photoBase64String) options.photoBase64String = null;
      options.name = Facade.METHOD_SAVE_PHOTO;
      Facade.request(options);
    },

    /**
     * @description 注册webview appear 事件(webview 显示时，hybrid会调用此回调)
     * @method Service.cGuiderService.registerAppearEvent
     * @param {Function} callback webview 显示时的回调函数
     */
    registerAppearEvent: function (callback) {
      Facade.register({tagname: Facade.METHOD_WEB_VEW_DID_APPEAR, callback: callback})
    },
    /**
     * @description 注销webview appear 事件 配合registerAppearEvent方法使用（webview销毁时，hybrid会调用此方法）
     * @method Service.cGuiderService.unregisterAppearEvent
     */
    unregisterAppearEvent: function () {
      Facade.unregister(Facade.METHOD_WEB_VEW_DID_APPEAR)
    }
  };

  /**
   * @description 文件操作相关类
   * @namespace Service.cGuiderService.file
   */
  HybridGuider.file = {
    /**
     * @description 检查文件是否存在。可以指定文件名，或者相对路径
     * @method Service.cGuiderService.file.isFileExist
     * @param {object} options 输入参数
     * @param {string} options.fileName 需要读取文件大小的文件路径
     * @param {string} options.relativeFilePath 需要读取文件大小的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     * @param {function} options.callback 检查过后的回调
     * @example
     * 参数:
     * {
     *    fileName:"", // {String}需要读取文件大小的文件路径
     *    relativeFilePath:"", // {String} 需要读取文件大小的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     *    callback:function(data){} //检查过后的回调
     * }
     * 回调参数为
     * param : {
     *      isExist: true
     * }
     */
    isFileExist: function (options) {
      Facade.request({ name: Facade.METHOD_CHECK_FILE_EXIST, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
    },

    /**
     * @description 删除文件/目录。可以指定文件名，或者相对路径
     * @method Service.cGuiderService.file.deleteFile
     * @see http://jimzhao2012.github.io/api/classes/CtripFile.html#method_app_delete_file
     * @param {object} options 输入参数
     * @example
     * 参数：
     * {
     *    fileName:'', //{String} 需要删除的文件路径
     *    relativeFilePath:'', //{String} 需要删除的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     *    callback；fucntion(data){} //{Function}删除文件后的回调
     * }
     * 回调参数：
     *  {
     *     isSuccess: true
     *  }
     */
    deleteFile: function (options) {
      Facade.request({ name: Facade.METHOD_DELETE_FILE, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
    },

    /**
     * @description 获取当前web页面的sandbox目录，在webapp/wb_cache/xxxx/目录下xxxx即为当前sandbox的名字
     * @method Service.cGuiderService.file.getCurrentSandboxName
     * @see http://jimzhao2012.github.io/api/classes/CtripFile.html#method_app_get_current_sandbox_name
     * @param {object} options 输入参数{callback:function(data){}}
     * @example
     * 回调参数:
     *   {
     *     sandboxName: "car"
     *   }
     */
    getCurrentSandboxName: function (options) {
      Facade.request({ name: Facade.METHOD_GET_CURRENT_SANDBOX_NAME, callback: options.callback });
    },

    /**
     * @description 读取文件大小。可以指定文件名，或者相对路径
     * @method Service.cGuiderService.file.getFileSize
     * @param {object} options 输入参数
     * @example
     * //参数：
     * {
     *    fileName:"", //{String} 需要读取文件大小的文件路径
     *    relativeFilePath :"",//{String} relativeFilePath
     *    callback:function(data){} //获取之后的回调
     * }
     * //回调参数:
     *   {
     *     fileSize: 8
     *   }
     */
    getFileSize: function (options) {
      Facade.request({ name: Facade.METHOD_GET_FILE_SIZE, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
    },


    /**
     * @description 创建文件夹。可以指定文件名，或者相对路径
     * @method Service.cGuiderService.file.makeDir
     * @param {object} options 输入参数
     * @example
     * //参数
     * {
     *    dirname:"",//{String}需要创建的文件夹路径
     *    relativeDirPath :"", //{String} 需要创建的文件夹相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     *    callback:function(data){} //{Function} 创建成功后的回调
     * }
     * //回调参数：
     *  {
     *    isSuccess: true
     *  }
     */
    makeDir: function (options) {
      Facade.request({ name: Facade.METHOD_MAKE_DIR, callback: options.callback, dirname: options.dirname, relativeFilePath: options.relativeFilePath });
    },

    /**
     * @description 读取文本文件内容，UTF-8编码。可以指定文件名，或者相对路径
     * @method Service.cGuiderService.file.readTextFromFile
     * @param {object} options 输入参数
     * @example
     * //参数：
     * {
     *    fileName:"", //{String} 需要读取内容的文件路径
     *    relativeFilePath:"",//{String}需要读取内容的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     *    callback:function(data){} //读取完成后的回调
     * }
     * //回调参数：
     * {
     *      text: "Hello,世界"
     *  }
     */
    readTextFromFile: function (options) {
      Facade.request({ name: Facade.METHOD_READ_TEXT_FROM_FILE, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
    },

    /**
     * @description 文本写入文件中，UTF8编码。可以指定文件名，或者相对路径
     * @method Service.cGuiderService.file.writeTextToFile
     * @see http://jimzhao2012.github.io/api/classes/CtripFile.html#method_app_write_text_to_file
     * @param {object} options 输入参数
     * @example
     * //参数;
     * {
     *    fileName:"", //{String} 写入的文件路径
     *    relativeFilePath:"",//{String}写入的文件相对路径，需要调用app_get_current_sandbox_name获取sandbox的名字+路径
     *    text:"",//{String} 需要写入文件的文本内容
     *    isAppend:false,//{String} 是否是将当前文件append到已有文件
     *    callback:function(data){} // {Function} 写完之后的回调
     * }
     * //回调收到参数为
     * {
     *      isSuccess: true
     *  }
     */
    writeTextToFile: function (options) {
      Facade.request({ name: Facade.METHOD_WRITE_TEXT_TO_FILE, callback: options.callback, text: options.text, isAppend: options.isAppend, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
    }
  };

  /**
   * @description 管道相关类
   * @namespace Service.cGuiderService.pipe
   */
  HybridGuider.pipe = {
    /**
     * @description H5通过App发送服务 发送socket请求
     * @method Service.cGuiderService.pipe.socketRequest
     * @param {object} options 输入参数
     * @example
     * //参数：
     * {
     *    serviceCode:"", //{String} 需要发送服务的服务号
     *    header:"",   //{String} 服务的header
     *    data:""，    //{String} 服务所需要的数据部分，各个服务都不同
     *    pipeType:1  //{Int}  管道类型，因mobileServer原因，5.4的管道是支付专用，默认是0=支付管道，1＝公共管道
     *    callback:function(data){} //{Function}请求返回后的回调
     * }
     * //回调参数：
     * //成功
     *{
		 *  sequenceId:"13523333333",
		 *  resultMessage:"eHh4eHh4",
		 *  resultHead:"eHh4eHh4",
		 *  resultBody:"eHh4eHh4",
		 *  result:1,
     * },
     * //失败
     * //  code定义，返回给Hybrid时候，为负数，iOS/Android －200开始，递减
     * //  CONN_FAIL_TYPE_NO_FAIL = 200------------------正确，无错误
     * // CONN_FAIL_TYPE_GETCONN_UNKOWN = 201-----------从连接池获取长连接失败
     * //  CONN_FAIL_TYPE_GETIP = 202--------------------获取IP地址失败
     * //  CONN_FAIL_TYPE_CONNECT = 203------------------创建连接失败
     * //  CONN_FAIL_TYPE_SEND_DATA = 204----------------发送数据失败
     * //  CONN_FAIL_TYPE_RECEIVE_LENGTH = 205-----------读报文头失败
     * //  CONN_FAIL_TYPE_RECEIVE_BODY = 206-------------读报文体失败
     * //  CONN_FAIL_TYPE_BUILE_REQUESTDATAFAIL = 207----创建请求报文失败
     * //  CONN_FAIL_TYPE_BUILE_RESPONSEDATAFAIL = 208---解析返回报文失败
     * //  CONN_FAIL_TYPE_SERIALIZE_REQUEST_FAIL = 209---序列化请求报文失败
     * //  CONN_FAIL_TYPE_SERIALIZE_RESPONSE_FAIL = 210--序列化返回报文失败
     * //  CONN_FAIL_TYPE_RESPONSE_REPEAT = 211----------服务端下发需要重试
     *
     *{
		 * sequenceId:"13523333333",
		 * errorInformation:"抱歉！加载失败，请重试(-203)", //括号内的code为errorCode，5.8.1加入
		 * serverErrorCode:"eHh4eHh4",
     *},
     */
    socketRequest: function (options) {
      var timestamp = Date.now();
      Facade.request({ name: Facade.METHOD_SEND_H5_PIPE_REQUEST, callback: options.callback, serviceCode: options.serviceCode, header: options.header, data: options.data, sequenceId: timestamp, pipeType: options.pipeType });
      return timestamp;
    },

    /**
     * @description H5通过App发送服务 发送http请求
     * @method Service.cGuiderService.pipe.httpRequest
     * @param {object}  options 输入参数
     * @example
     * //参数：
     * {
     *    url:"", //{String}HTTP请求发送的URL地址
     *    method:"", //{String} HTTP请求方式GET/POST
     *    header:"", //{String} HTTP头，JSON字符串格式key/value，cookie作为一个key存储再HEADER内部
     *    param:{}, //key=value形式的字符串数组,请做好参数的Encode，app端只负责拼接
     *    sequenceId:"", //发送服务的序列号，随机生存即可
     *    retry:{} ,// 貌似bridge.js中未处理
     *    callback:function(data){} //请求成功的回调
     * }
     * //回调参数：
     * param:
     *{
		 *responseString:"eHh4eHh4",
		 *responseCookie : {
		 *			"BAIDUID":"2959D035E2F5D7C979687934D558DCD3:FG=1",
		 *			"BDSVRTM":10,
		 *			"BD_CK_SAM":1,
		 *			"H_PS_PSSID":"1429_5225_5287_5722_5848_4261_5830_4759_5659_5857"
		 *    },
		 *sequenceId:"13222222"
     *},
     */
    httpRequest: function (options) {
      var timestamp = Date.now();
      Facade.request({ name: Facade.METHOD_SEND_HTTP_PIPE_REQUEST, callback: options.callback, target: options.url, method: options.method, header: options.header, queryData: options.param, retryInfo: options.retry, sequenceId: timestamp });
      return timestamp;
    },

    /**
     * @description 根据发送的sequenceId，终止正在发送的HTTP请求 取消http请求
     * @method Service.cGuiderService.pipe.abortRequest
     * @param {object} options 输入参数
     * @param {string} [options.type=socket] 请求类型 http/socket
     * @param {string} options.id 需要取消的服务id
     * @example
     * //参数：
     * {
     *    type:"",//{String} 请求类型 'socket'/'http'
     *    id:发送服务的序列号，随机生存即可 对应socket
     *    sequenceId:发送服务的序列号，随机生存即可 对应http
     * }
     */
    abortRequest: function (options) {
      if(options.type == 'socket'){
        Facade.request({ name: Facade.METHOD_ABORT_HTTP_PIPE_REQUEST, sequenceId: options.id });
      }else{
        Facade.unregister({ name: Facade.METHOD_SEND_H5_PIPE_REQUEST, sequenceId: options.sequenceId });
      }
    }
  };

  /**
   * 支付相关类
   * @namespace Service.cGuiderService.pay
   */
  HybridGuider.pay = {

    /**
     * @description  检查支付相关App安装情况
     * @method Service.cGuiderService.pay.checkStatus
     * @see  http://jimzhao2012.github.io/api/classes/CtripPay.html#method_app_check_pay_app_install_status
     * @param {object} options 参数对象
     * @param {function} options.callback 检查支付之后的回调 {callback:function(param){}}
     * @example
     * //回调数据
     *    {
     *       platform:"iOS", //Android
     *       weixinPay:true,
     *       aliWalet:true,
     *       aliQuickPay:true,
     *    }
     */
    checkStatus: function (options) {
      Facade.request({ name: Facade.METHOD_CHECK_PAY_APP_INSTALL_STATUS, callback: options.callback });
    },

    /**
     * @description 根据URL打开支付App
     * @method Service.cGuiderService.pay.payOut
     * @see http://jimzhao2012.github.io/api/classes/CtripPay.html#method_app_check_pay_app_install_status
     * @param {object} options
     * @example
     * //参数:
     * {
     *    payAppName:"" , // {String} 支付App的URL，暂固定为以下4个， aliWalet/aliQuickPay/wapAliPay/weixinPay(微信支付暂未支持)
     *    payURL:"",//{String}服务器返回的支付配置信息，ali相关为URL，微信支付为xml
     *    successRelativeURL:"" //{String} 支付成功跳转的URL
     *    detailRelativeURL :"" //{String} 支付失败或者支付超时跳转的url
     * }
     */
    payOut: function (options) {
      Facade.request({ name: Facade.METHOD_OPEN_PAY_APP_BY_URL, payAppName: options.payAppName, payURL: options.payURL, successRelativeURL: options.successRelativeURL, detailRelativeURL: options.detailRelativeURL });
    },

    callPay: function(options) {
      Hish.Fn('call_pay').run(options);
    }
  };

  /**
   * @description 自有加解密操作类
   * @namespace Service.cGuiderService.encrypt
   */
  HybridGuider.encrypt = {

    /**
     * @description Ctrip私有加解密算法
     * @method Service.cGuiderService.encrypt.ctrip_encrypt
     * @param {object} options 参数对象
     * @param {string} options.inStr 加密字符串
     * @param {function} options.callback 
     * @example
     * //参数：
     * {
     *    inStr:"", // {String}需要做加解密的字符串
     *    callback:function(){} //{Function} 加密成功的回调
     * }
     * //回调参数
     * param:
	   *  {
		 *	 inString:"abcdxxxx",
		 *	 outString:"ABScdXkYZunwXVF5kQpffnY+oL/MFmJGkn8ra8Ab5cI=",
		 *	 encType:1
     * }
     */
    ctrip_encrypt: function (options) {
      Facade.request({ name: Facade.METHOD_ENCRYPT_CTRIP, callback: options.callback, inString: options.inStr, encType: 1 });
    },
    /**
     * @description 携程自有解密
     * @method Service.cGuiderService.encrypt.ctrip_decrypt
     * @param {object} options 参数对象
     * @param {function} options.callback 回调参数
     * @param {string} opitions.inStr 解密字符串
     * @example
     * //参数：
     * {
     *    inStr:"", // {String}需要做加解密的字符串
     *    callback:function(){} //{Function} 加密成功的回调
     * }
     * //回调参数
     * param:
     *  {
		 *	 inString:"abcdxxxx",
		 *	 outString:"ABScdXkYZunwXVF5kQpffnY+oL/MFmJGkn8ra8Ab5cI=",
		 *	 encType:1
     * },
     */
    ctrip_decrypt: function (options) {
      Facade.request({ name: Facade.METHOD_ENCRYPT_CTRIP, callback: options.callback, inString: options.inStr, encType: 2 });
    }
  };

  return HybridGuider;

});

define('cHybridAppInit',['cHybridGuider'], function(Guider){

  
  Lizard.localRoute = {
    config: {},
    addConfig: function (obj) {
      for (var urlschema in obj) {
        if (obj.hasOwnProperty(urlschema)) {
          Lizard.localRoute.config[urlschema] = obj[urlschema];
        }
      }
    },
    
    mapUrl: function (url) {
      var ret = '', lc = 0;
      _.each(Lizard.localRoute.config, function(item, urlSchema){
        if (Lizard.localRoute.config.hasOwnProperty(urlSchema)) {
          var parseRet = Lizard.schema2re(urlSchema, url);
          if (parseRet.reStr && parseRet.param) {
            if (parseRet.reStr.length > lc) {
              lc = parseRet.reStr.length;
              ret = Lizard.localRoute.config[urlSchema];
            }
          }
        }
      })      
      return ret;
    }
  };
  
  if (window.LizardLocalroute) {
    Lizard.localRoute.addConfig(window.LizardLocalroute);
    var el = document.getElementById("LizardLocalroute");
    if (el) {
      Lizard.weinre = el.getAttribute("LizardWeinre");
      Lizard.ip = el.getAttribute("LizardIP");
      Lizard.chanal = el.getAttribute("LizardChanal");
    }
  }
  
  //如果是pc端打开的话，直接主动触发init_member_H5_info
  if (Internal.isIOS || Internal.isAndroid || Internal.isWinOS) {} else {
    var isPc = (function isPc() {
      return window.navigator.platform == "Win32";
    })();
    if (!isPc) {
      Guider.create();
      return;
    }
    var appInfo = {
      "tagname": "web_view_finished_load",
      "param": {
        "platform": "2",
        "osVersion": "Android_18",
        "extSouceID": "",
        "version": "5.5"
      }
    }
    Internal.isAndroid = (appInfo.param.platform == "2");
    Internal.isInApp = true;
    Internal.appVersion = appInfo.param.version;
    Internal.osVersion = appInfo.param.osVersion;
    if (window.localStorage) {
      window.localStorage.clear();
      if (appInfo) window.localStorage.setItem('APPINFO', JSON.stringify(appInfo));
      window.localStorage.setItem('ISINAPP', '1');
    }
    window.Util_a = {};
    window.Util_a.h5Log = function(paramString) {
      console.log('h5Log::', paramString);
    }
    window.Util_a.openUrl = function(paramString) {
      console.log('h5Log::', paramString);
    }
    window.Util_a.checkNetworkStatus = function(paramString) {
      console.log('h5Log::', paramString);
    }
    window.Locate_a = {};
    window.Locate_a.locate = function(paramString) {};
    window.NavBar_a = {};
    window.NavBar_a.setNavBarHidden = function(paramString) {};
    window.User_a = {};
    window.User_a.initMemberH5Info = function(paramString) {};
    window.Business_a = {};
    window.Business_a.sendUBTLog = function(paramString) {};
    window.Business_a.logGoogleRemarking = function(paramString) {};
    window.app.callback({
      'tagname': 'web_view_finished_load'
    });
    window.app.callback({
      'tagname': 'init_member_H5_info',
      'param': {
        appId: "ctrip.android.view",
        clientID: "32043596200000129090",
        device: "samsung_GT-N7102",
        extSouceID: "",
        isPreProduction: "0",
        osVersion: "Android_18",
        platform: "2",
        serverVersion: "5.7",
        sourceId: "8892",
        timestamp: "1402930469100",
        userInfo: {
          data: {
            Auth: "",
            BMobile: "",
            BindMobile: "",
            IsNonUser: true,
            UserID: ""
          },
          timeby: 1,
          timeout: "2015/06/16"
        },
        version: "5.5"
      }
    });    
  }
  
  Guider.create();
});
define('cPageModelProcessor',['cModel', 'cMemoryStore', 'cUtilPath', 'cUtilCacheView', 'cCoreInherit', 'cLocalStore'], function(cModel, mStore, path, CacheViews, cCoreInherit, cStore){
  var cacheModels = new CacheViews;
  function callModels(pageConfig, callback, errorback)
  {
    Lizard.ajaxDatas = {};
    pageConfig.models = Lizard.getModels(pageConfig);
    _.each(pageConfig.models, function(model, index){
      model.modelIndex = index;
    });    
    _processModels(pageConfig, pageConfig.models, [], callback, errorback)
  }
  
  function _processModels(pageConfig, models, datas, callback, errorback)
  {
    if (models.length == 0) {
      callback(datas, pageConfig);
    }    
    else if (!_.some(models, function(model){ return models.error;}))
    {
      var sortedModels = _resortModels(models);
      _.each(sortedModels['todo'], function(model){
        var index = model.modelIndex;
        var url = model.url, emodel = cacheModels.findById(url);
        if (!emodel) {
          emodel = cCoreInherit.Class(cModel, {
            __propertys__: function() {
              this.urlParseRet = path.parseUrl(url);
              this.protocol = this.urlParseRet.protocol.substr(0, this.urlParseRet.protocol.length - 1);
              this.checkAuth = false;
            }
          }).getInstance();
          emodel.setAttr('url', Lizard.restfullApi?path.parseUrl(Lizard.restfullApi).domain +  emodel.urlParseRet.pathname: emodel.urlParseRet.domain + emodel.urlParseRet.pathname);
          _transfuncToVal(model.postdata);
          emodel.setAttr('param', model.postdata);
          var cacheStore = emodel.getResultStore();
          if (!cacheStore) {
            var cachStore = model.storeKey?new cStore({
                key: model.storeKey
            }): new mStore({
                key : url
            });            
            emodel.setAttr('result', cachStore);
          }
          cacheModels.add(url, emodel);
        } else {
          _transfuncToVal(model.postdata);
          emodel.setAttr('param', model.postdata);
        }
        if (model.suspend && eval('(' + model.suspend + ')()'))
        {
          model.done = true;
          datas[index] = {};
          if (_.every(models, function(model){ return model.done; }))
          {
            callback(datas, pageConfig);  
          }       
        }
        else
        {
          emodel.excute(function(data) {
            model.done = true;
            datas[index] = data;
            if (model.name) Lizard.ajaxDatas[model.name] = data;
            onSuccess(pageConfig, datas, sortedModels, callback, errorback);
          },
          function(error) {
            if (_.isFunction(pageConfig.validate) || !(error instanceof XMLHttpRequest)) {
              model.done = true;
              datas[index] = error;              
              onSuccess(pageConfig, datas, sortedModels, callback, errorback);
            } else {
              model.error = true;
              errorback(datas, pageConfig.errorBack);              
            }
          },
          model.ajaxOnly, this)
        }
      });  
    }    
  }
  
  function onSuccess(pageConfig, datas, sortedModels, callback, errorback)
  {    
    if (_.every(pageConfig.models, function(model){return model.done}))
    {
      callback(datas, pageConfig);
    } else if (_.every(sortedModels['todo'], function(model){return model.done})){
      _processModels(pageConfig, sortedModels['left'], datas, callback, errorback)
    }
  }
  
  function _transfuncToVal(obj) {
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (_.isString(obj[p]) && obj[p].indexOf('function') == 0) {
          obj[p] = eval('(' + obj[p] + ')()');
        } else if (_.isObject(obj[p]) || _.isArray(obj[p])) {
          _transfuncToVal(obj[p]);
        }
      }
    }
  }
  
  function _resortModels(models)
  {
    return _.groupBy(models, function(model){
      if (!model.depends || _.every(model.depends, function(depend) {
          return (depend in Lizard.ajaxDatas);
      }))
      {
        return 'todo';
      }
      else
      {
        return 'left';
      }        
    });    
  }
  
  return callModels;
});
/**
 * @File c.abstract.app.js
 * Lizard APP对象
 * @author wxj@ctrip.com/luwei@ctripcom
 * @version V2.1
 */
define('cAbstractApp',['cPageModelProcessor', 'cUtilPerformance', 'cUtilCommon', 'UILoadingLayer',  'UIHeader', 'UIWarning404', 'UIAlert', 'UIToast', 'cMessageCenter', 'UIAnimation', 'cPageParser'],
  function (callModels, cperformance, utils, Loading, Header, Warning404, Alert, Toast, MessageCenter, animation) {

    if (/\/html5\//i.test(location.href.replace(/[\?#].+$/, ''))) {
      $('<base/>').attr('href', location.href.replace(/\/html5\//i, '/webapp/')).prependTo($('head').eq(0));
    }

    //矫正lizard的两个静态属性 ;
    Lizard.runAt = "client"; //运行在什么环境 html5还是webapp
    var renderAt = $('.main-viewport').attr('renderat');
    Lizard.renderAt = 'server';
    if (!renderAt) Lizard.renderAt = 'client'; //判断首屏渲染的环境v8还是brower

    function APP(options) {
      this.initialize(options)
    }

    APP.subclasses = [];

    APP.defaults = {
      "mainRoot"        : '#main',
      "header"          : 'header',
      "viewport"        : '.main-viewport',
      "animForwardName" : 'slideleft',
      "animBackwardName": 'slideright',
      "isAnim"          : false,
      //是否开启动画
      "maxsize"         : 10
    };

    APP.prototype = {
      ctnrViewNames: ['lizardHisCtnrView'],

      viewReady: function (handler) {
        //TODO subscribe viewReady message
        MessageCenter.subscribe('viewReady', handler);
      },

      initialize: function initialize(options) {
        // Lizard.group();
        var opts = this.initProperty(options);
        this.options = opts;
        this.firstState = null;
        this.mainRoot = $(opts.mainRoot);
        this.header = $(opts.header);
        this.viewport = this.mainRoot.find(opts.viewport);
        this.curView = null;
        this.lastView = null;
        //实例化cathViews组件
        this.maxsize = opts.maxsize;
        this.animForwardName = opts.animForwardName;
        this.animBackwardName = opts.animBackwardName;
        this.isAnim = Lizard.animationAPI || Lizard.isAnim || opts.isAnim;
        if (Lizard.animationAPI) {
          require([Lizard.animationAPI], _.bind(function(animation){
            this.animAPIs = animation;
          }, this));
        } else {
          this.animAPIs = animation;
        }
        this.animatName = this.animForwardName;
        this._loading = new Loading();
        this._alert = new Alert();
        this._confirm = new Alert();
        this._toast = new Toast();
        this._warning404 = new Warning404();
        //是否开启hashchange,false为不开启
        this.observe = false;
        this.headerView = new Header({ 'root': $('#headerview'),'parent':this });
        if (Lizard.isHybrid) {
          this.headerView.root.addClass('cm-header-hybird-wrap');
        }
        this.bindEvents();
        this.views = {};
        this.start();
        MessageCenter.subscribe('switchview', function (inView, outView) {
          inView.$el.show();
        }, this);
      },

      /**
       * 以弹出框的形式，弹出提示信息
       * @param {String|Object} 需要弹出的信息
       * @method Lizard.showMessage
       * @example
       * //参数
       *  1."显示信息"
       *  2.{
       *    datamodel：
       *      {
       *        content："显示信息"，
       *        title："带标题",
       *        okTxt:"按钮文本",
       *      },
       *    okAction:function(){}   //按钮回调函数
       *  }
       */
      showMessage: function (params) {
        if (!params) params = {};
        if (typeof params == 'string') {
          params = {
            datamodel: {
              content: params
            }
          };
        }

        //每次需要重置属性，以防组件互相影响
        this._alert.resetDefaultProperty();
        this._alert.setOption(params);
        this._alert.refresh();
        this._alert.show();

      },

      /**
       * 隐藏由showMessage弹出的消息
       * @method Lizard.hideMessage
       */
      hideMessage: function () {
        this._alert.hide();
      },

      /**
       * 以弹出框的形式，弹出确认信息
       * @param {String|Object} 需要弹出的信息
       * @method Lizard.showConfirm
       * @example
       * //参数
       *  1."显示信息"
       *  2.{
       *    datamodel：
       *      {
       *        content："显示信息"，
       *        title："带标题",
       *         btns: [
       *              { name: '取消', className: 'cui-btns-cancel' },
       *              { name: '确定', className: 'cui-btns-ok' }
       *            ]//对应按钮
       *      },
       *    okAction:function(){},           //确认按钮回调
       *    cancleAction:function(){}       //取消按钮的回调
       *  }
       */
      showConfirm: function (params) {
        if (!params) params = {};
        if (typeof params == 'string') {
          params = {
            datamodel: {
              content: params
            }
          };
        }

        this._confirm.resetDefaultProperty();

        //与showMessage不一样的地方
        this._confirm.datamodel.btns = [
          { name: '取消', className: 'cui-btns-cancel' },
          { name: '确定', className: 'cui-btns-ok' }
        ];
        this._confirm.setOption(params);
        this._confirm.refresh();
        this._confirm.show();
      },

      /**
       * 隐藏由showConfirm 弹出的确认信息框
       * @method Lizard.hideConfirm
       */
      hideConfirm: function () {
        this._confirm.hide();
      },

      /**
       * 全局单例的warning404
       * @param {Function|Object} 点击重试的回调或者弹出框的样式
       * @method Lizard.showWarning404
       * @example
       * //参数
       * 1.function(){}   //点击重试的回调
       * 2.
       * {
       *   datamodel: {
       *     tel: '4000086666',
       *     loadFail: '加载失败，请稍后再试试吧',
       *     telText: '或者拨打携程客服电话',
       *     tryAgain: '重试',
       *     contact: '联系客服',
       *     showContact: true
       *    },
       *    callTelAction: function() {}, //拨打客服电话的回调
       *    retryAction: function(){}   // 点击重试按钮的回调
       * }
       */
      showWarning404: function (params, pageConfig, errorData) {
        var scope = this;

        if (!params) params = {};
        if (typeof params == 'function') {
          params = {
            retryAction: params
          };
        }

        //每次需要重置属性，以防组件互相影响
        this._warning404.resetDefaultProperty();
        this._warning404.setOption(params);
        this._warning404.refresh();

        Lizard.showHisCtnrView(function () {
          if (scope._warning404) {
            scope._warning404.wrapper = this.$el;
            scope._warning404.show();
            errorData && this.headerview.set(errorData.headData);
          }
        }, function () {
          if (scope._warning404) scope._warning404.hide();
        }, {triggerHide: false, addToHistory: false, viewName: 'warning404', pageConfig: pageConfig});
      },

      /**
       * 关闭由showWarning404弹出的提示框
       * @method Lizard.hideWarning404
       */
      hideWarning404: function () {
        this._warning404.hide();
      },

      /**
       * 显示提示信息，在一定时间内自动消失
       * @param {String|Object} 需要显示的消息或者样式的参数
       * @method Lizard.showToast
       * @example
       * 1."提示文本信息"
       * 2.{
       *                datamodel:
       *                {
       *                    content: 'toast'
       *                 }
       *                hideAction: function() {}//关闭消息时执行的回调
       *     }
       */
      showToast: function (params) {
        if (!params) params = {};
        if (typeof params == 'string') {
          params = {
            datamodel: {
              content: params
            }
          };
        }

        this._toast.resetDefaultProperty();
        this._toast.setOption(params);
        this._toast.refresh();
        this._toast.show();
      },

      /**
       * 关闭有showToast弹出的消息
       * @method Lizard.hideToast
       */
      hideToast: function () {
        this._toast.hide();
      },

      /**
       * 显示携程的loading 图标
       * @param {Object} 不传递参数或者传递改变样式参数
       * @method Lizard.showLoading
       * @example
       * //参数
       *{
       *   datamodel:
       *   {
       *       closeBtn: false,//是否显示关闭按钮
       *       content: ''//是否显示文字
       *      },
       *  closeAction: function(){}//点击关闭按钮执行的回调
       *}
       */
      showLoading: function (params) {
        if (this._loading._showTimeout) {
          clearTimeout(this._loading._showTimeout);
          delete this._loading._showTimeout;
        }
        if (!params) params = {};

        this._loading.resetDefaultProperty();
        this._loading.setOption(params);
        this._loading.refresh();
        this._loading._showTimeout = setTimeout(_.bind(function () {
          this._loading.show();
          delete this._loading._showTimeout;
        }, this), Lizard.showloadingtimeout || 200);
      },
      /**
       * 关闭携程的loading图标
       * @method Lizard.hideLoading
       */
      hideLoading: function () {
        if (this._loading._showTimeout) {
          clearTimeout(this._loading._showTimeout);
          delete this._loading._showTimeout;
        }
        this._loading.hide();
      },

      initProperty: function initProperty(options) {
        var opts = _.extend({}, APP.defaults, options || {});
        return opts;
      },

      bindEvents: function () {
        //l_wang提升响应速度
        $.bindFastClick && $.bindFastClick();
        //处理a标签
        this._handleLink();
      },

      _handleLink: function _handleLink() {
        if (!Lizard.isHybrid && !utils.isSupportPushState) return;
        $('body').on('click', $.proxy(function (e) {
            var el = $(e.target);
            var needhandle = false;

            while (true) {
              if (!el[0]) break;
              if (el[0].nodeName == 'BODY') break;
              if (el.hasClass('sub-viewport')) break;

              if (el[0].nodeName == 'A') {
                needhandle = true;
                break;
              }
              el = el.parent();
            }

            if (needhandle) {
              var href = el.attr('href');
              var opts = {};
              var lizard_data = el.attr('lizard-data');

              if ((el.attr('lizard-catch') == 'off') || (href && utils.isExternalLink(href))) {
                return true;
              }
              e.preventDefault();
              if (lizard_data) {
                opts.data = JSON.parse(lizard_data);
              }
              if (el.attr('data-jumptype') == 'back') {
                this.back(el.attr('href'), opts);
              } else if (el.attr('data-jumptype') == 'forward') {
                this.goTo(el.attr('href'), opts);
              }
            }
          },
          this));
      },

      start: function () {

      },

      loadView: function (url, html, options) {
        var uuidDomready = cperformance.getUuid();
        var uuidOnload = cperformance.getUuid();
        cperformance.group(uuidDomready, {
          name       : "Domready",
          landingpage: (options.landingpage == 1) ? 1 : 0,
          url        : url
        });
        cperformance.group(uuidOnload, {
          name       : "Onload",
          landingpage: (options.landingpage == 1) ? 1 : 0,
          url        : url
        });
        if ((Lizard.config && Lizard.config.isHideAllLoading) || options.hideloading) {
          this.hideLoading();
        }
        else {
          this.showLoading();
        }
        Lizard.loadingView = true;

        if (url) {
          //先向ubt发送unload
          Lizard.unloadUbt && Lizard.unloadUbt(this.curView);
        }
        var pageConfig = Lizard._initParser(url, html);
        callModels(pageConfig, _.bind(function (datas, pageConfig) {
          if (_.isFunction(this.judgeForward) && !this.judgeForward(url)) {
            return;
          }
          var uuidTemplateRender = cperformance.getUuid();
          cperformance.group(uuidTemplateRender, {
            name: "TemplateRender",
            url : url
          });
          var renderObj = Lizard.render(pageConfig, datas);
          cperformance.groupEnd(uuidTemplateRender);
          if (!Lizard.viewHtmlMap) {
            Lizard.viewHtmlMap = {};
          }
          Lizard.viewHtmlMap[renderObj.config.viewName] = html;         
          var renderNode = $('<DIV></DIV>').css({display: 'none'});
          if (options.renderAt == 'server') {
            this.hideLoading();
          } else {
            renderNode = $(renderObj.viewport).css({display: 'none'});
          }
          if (renderObj.config.showfake && (!this.views[renderObj.config.viewName] || this.views[renderObj.config.viewName].$el.attr('page-url') != url)) {
            if (_.isObject(renderObj.config.showfake) && renderObj.config.showfake.hideloading) {
              this.hideLoading();
            }
            Lizard.__fakeViewNode = renderNode.appendTo(this.viewport);
            this.curView && this.curView.$el.hide();
          }
          require([renderObj.config.controller || 'cPageView'], _.bind(function (View) {
            if (_.isFunction(this.judgeForward) && !this.judgeForward(url)) {
              return;
            }
            if (this.curView) this.lastView = this.curView;
            if (renderObj.config.viewName && this.views[renderObj.config.viewName]) {
              this.curView = this.views[renderObj.config.viewName];
              if (this.curView.$el.attr('page-url') != url) {
                this.curView.$el.remove();
                !renderObj.config.showfake && renderNode.appendTo(this.viewport);
                this.curView.$el = renderNode;
                this.curView.onCreate && this.curView.onCreate();
                this.curView.delegateEvents();
              }
            }
            else {
              !renderObj.config.showfake && renderNode.appendTo(this.viewport);
              this.curView = new View({
                el: (options.renderAt == 'server') ? this.viewport.children().first() : renderNode
              });
              this.curView.$el.attr('page-url', url);
            }
            if (options.renderAt == 'server') renderNode.remove();
            Lizard.__fakeViewNode = null;
            cperformance.groupEnd(uuidDomready);
            this.curView.text = html;
            _.extend(this.curView, _.pick(renderObj, ['datas', 'config', 'lizTmpl', 'lizParam']));
            if (this.curView && this.curView.switchByOut) {
              var self = this;
              this.curView.turning = function () {
                this.hideLoading();
                self.lastView && self.lastView.hide();
                MessageCenter.publish('switchview', [self.curView, self.lastView]);
                self.curView.$el.show();
              }
            }
            else {
              this.hideLoading();
              MessageCenter.publish('switchview', [this.curView, this.lastView]);
            }
            this.curView.lastViewId = this.curView.referrer = (this.lastView && this.lastView.config.viewName);
            this.switchView(this.curView, this.lastView);
            cperformance.groupEnd(uuidOnload);
            if (renderObj.config.viewName) {
              this.views[renderObj.config.viewName] = this.curView;
            }
          }, this))
        }, this), _.bind(function (datas, errorBack) {
          this.hideLoading();
          var errorData =
          {
            callback: function () {
              this.hideWarning404();
              Lizard.goTo(url);
            },
            headData: {
              title : '网络不给力',
              back  : true,
              events: {
                returnHandler: function () {
                  Lizard.back();
                }
              }
            }
          };
          if (errorBack) errorData = _.extend(errorData, errorBack(datas));
          this.showWarning404(_.bind(errorData.callback, this), pageConfig, errorData);
        }, this));
      },

      switchView: function(inView, outView) {
        if (outView && !document.getElementById(outView.id) && (inView && !inView.switchByOut)) {
          outView.$el.appendTo(this.viewport);
          outView.$el.hide();
        }
        if (inView && !document.getElementById(inView.id)) {
          inView.$el.appendTo(this.viewport);
          inView.$el.hide();
        }
        //inView.$el.show();
        //动画切换时执行的回调
        var switchFn;

        //此处有问题，如果inView不再的话，应该由firstState生成默认页面
        if (!inView) throw 'inview 未被实例化';

        //将T 、P的值重新设置回去
        Lizard.T.lizTmpl = inView.lizTmpl;
        Lizard.P.lizParam = inView.lizParam;

        //outView不存在的情况下就不释放动画接口
        if (outView) {
          outView.saveScrollPos();
          if (this.isAnim) {
            switchFn = this.animAPIs[this.animatName];
          }
          //switchFn = this.animAPIs[this.animatName];
          //未定义的话便使用默认的无动画
          //l_wang 此段代码需要做一个包裹，或者需要回调，否则不会执行应该执行的代码!!!
          inView.fromView = outView.config.viewName;
          if (_.indexOf(this.ctnrViewNames, inView.config.viewName) > -1) {
            MessageCenter.publish('showHisCtnrView');
            outView.hideWarning404 = _.bind(function () {
              if (this._warning404.status === 'show') {
                Lizard.goBack();
              }
            }, this)
          }
          if (switchFn && _.isFunction(switchFn)) {
            switchFn(inView, outView, $.proxy(function (inView, outView) {
              this._onSwitchEnd(inView, outView);
            }, this));
          } else {
            inView && !inView.switchByOut && outView.hide();
            inView.show();
            this._onSwitchEnd(inView, outView);
          }
        } else {
          //这里开始走view的逻辑，我这里不予关注
          if (_.indexOf(this.ctnrViewNames, inView.config.viewName) > -1) {
            MessageCenter.publish('showHisCtnrView');
          }
          inView.show();
          this._onSwitchEnd(inView, outView);
        }
      },
      //l_wang 既然使用消息机制，就应该全部使用，后期重构
      _onSwitchEnd: function (inView, outView) {
        _.each(this.viewport.children(), function (view) {
          if (view != inView.$el[0]) $(view).hide();
        })
        if (outView != inView && !inView.switchByOut) {
          setTimeout(function () {
            outView && outView.$el && outView.$el.hide()
          }, 10);
        }

        MessageCenter.publish('viewReady', [inView]);
      },

      showView: function (data) {
        this.loadView(data.url, data.text, data.options);
      },

      /**
       * 页面跳转方法,灵活使用此方法,也可实现跨页面跳转
       * @param {String} url URL信息
       * @param {Object} [opt] 跨页跳转的配置参数,如不传此参数, 则为单页的view切换, 详细参数信息,见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
       * @param {String} [opt.targetModel] 打开模式  如果全局的Lizard.multiView=on开启,则取值为4
       *
       * 0.当前页面刷新url, 该参数类似于js的location.href="", 注：只支持打online地址
       *
       * 1.处理ctrip://协议; 注：只处理ctrip协议的URL Schema
       *
       * 2.开启新的H5页面,title生效; 注：只支持online地址
       *
       * 3.使用系统浏览器打开; 注：只支持online地址和其它App的URL Schema，例如微信的weixin://home
       *
       * 4.开启新的H5页面，title生效，打开webapp目录下的相对路径；注：和2对应，2打开online地址，4打开相对路径
       *
       * 5.当前页面打开webapp目录下相对路径；注：和0对应，0是打开online地址，5是打开本地相对路径。 5.8之前版本，内部自动调用app_cross_package_href
       * @param {String} [opt.pageName] view的唯一标示
       * @param {String} [opt.title]  当targetMode＝2时候，新打开的H5页面的title
       * @param {Boolean} [opt.isShowLoadingPage] 开启新的webview的时候，是否加载app的loading
       * @method Global.Lizard.goTo
       * @example
       * //新开WebView的方式打开 osd/osdindex webView的名称指定为webViewOsd
       * Lizard.goTo(Lizard.appBaseUrl + 'osd/osdindex', {targetModel: '4', pageName: 'webViewOsd'})
       * //在同一个webView中直接跳转到osd/osdindex
       * Lizard.goTo(Lizard.appBaseUrl + 'osd/osdindex')
       */
      goTo: function (url, opt) {

      },

      /**
       * 页面回退方法,如果在第一个页面回退,则自动会回退至native界面
       * @param {String} url URL信息
       * @param {Object} opt 设置信息
       * @param {String} [opt.pageName] 可选,如指定了此参数,多webview的情况,可回退至指定页面
       * @method Global.Lizard.goBack
       * @example
       * //回退至上一个页面,框架会判断如果是webview最先打开的页面会直接回退到上一个native页
       * Lizard.goBack()
       * //多WebView的情况下,回退至已打开webViewOsd页面, {pageName: 'webViewOsd'})
       * Lizard.goBack(Lizard.appBaseUrl + 'osd/osdindex', {pageName: 'webViewOsd'})
       */
      goBack: function () {

      },

      /**
       * 处理跨频道跳转, 屏蔽web与hybrid跨频道的不同
       * @method Global.Lizard.jump
       * @param {String} url 要跳转的页面,支持http/https/ctripwireless和部分路径
       * @param {Object} [opt]  配置参数, 详细见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
       * @param {number} [opt.targetModel=4] 新页面打开方式,4为单页面打开,5为新webview打开
       * @param {boolean} [opt.replace=false] 是否在浏览器history中增加记录
       * @example
       *  //在web环境下, href会跳转至http://m.ctrip.com/webapp/ticket/index, hybrid环境中会打开ticket/index.html#/webapp/ticket/index
       *  //方式1
       *  Lizard.jump('http://m.ctrip.com/webapp/ticket/index')
       *  //方式2, web环境下会跳转至domain/ticket/index.html,hybrid环境中会打开ticket/index.html#/webapp/ticket/index
       *  Lizard.jump('ticket/index.html')
       */
      jump:function(url,opt){

      },
      /*
       * @deprecated 2.1 废弃
       * 内部调用goTo,具体参考goTo方法
       * @param url
       * @param opt
       * @method Lizard.go
       */
      go    : function () {
      },

      /**
       * 显示一个全局遮盖层
       * @param {Function} 显示遮盖层时的回调
       * @param {Function} 隐藏遮盖层时的回调
       * @param {Object}   传入参数
       * @method Lizard.showHisCtnrView
       */
      showHisCtnrView: function (onShow, onHide, options) {
        if (!this.curView && !options.pageConfig) return;
        if (!this.curView && options.pageConfig) options.addToHistory = false;
        var oldAnimFlag = this.isAnim, oldAnimName = this.animatName;
        if (this.curView) {
          this.curView.triggerShow = this.curView.triggerHide = options ? (!options.triggerFlag) : true;
          this.curView.triggerHide = options && ('triggerHide' in options) ? (options.triggerHide) : true;
        }
        this.isAnim = (options && options.isAnim) ? true : this.isAnim;
        if (this.isAnim) {
          this.animatName = this.animForwardName;
        }
        var config = _.clone(options.pageConfig ? options.pageConfig : this.curView.config);
        config.model.apis = [];
        config.view = { viewport: '' };
        config.controller = 'cPageView';
        config.viewName = options && options.viewName ? options.viewName : 'lizardHisCtnrView';
        if (_.indexOf(this.ctnrViewNames, config.viewName) == -1) {
          this.ctnrViewNames.push(config.viewName);
        }
        var url = options.pageConfig ? options.pageConfig.pageUrl : this.curView.config.pageUrl;
        if (!options || options.addToHistory !== false) {
          if (Lizard.isHybrid) {
            this.endObserver();
            window.location.hash = url;
          } else {
            history.pushState({url: url, text: ' <SCRIPT type="text/lizard-config">' + JSON.stringify(config) + '<' + '/SCRIPT>', options: {pushState: true}}, document.title, url);
          }
        }
        this.loadView(url, ' <SCRIPT type="text/lizard-config">' + JSON.stringify(config) + '<' + '/SCRIPT>', { pushState: true, hideloading: true });
        if (Lizard.isHybrid) {
          setTimeout(_.bind(this.startObserver, this), 1);
        }
        var headData = {};
        MessageCenter.unsubscribe('showHisCtnrView');
        MessageCenter.subscribe('showHisCtnrView', function () {
          var self = this;
          this.lizardHisCtnrView = this.curView;
          this.curView.onShow = function () {
            onShow && onShow.apply(this, arguments);
            setTimeout(function () {
              self.animatName = self.animBackwardName;
            }, 10);
          };
          this.curView.onHide = function () {
            onHide && onHide.apply(this, arguments);
            setTimeout(function () {
              self.isAnim = oldAnimFlag;
              self.animatName = oldAnimName;
            }, 10)
          };
          this.curView.show();
        }, this)
      },

      /**
       * 隐藏遮盖层
       * @method Lizard.hideHisCtnrView
       */
      hideHisCtnrView: function () {
        history.back();
      },

      interface: function () {
        return {
          'viewReady'      : this.viewReady,
          'showMessage'    : this.showMessage,
          'hideMessage'    : this.hideMessage,
          'showConfirm'    : this.showConfirm,
          'hideConfirm'    : this.hideConfirm,
          'showWarning404' : this.showWarning404,
          'hideWarning404' : this.hideWarning404,
          'showToast'      : this.showToast,
          'hideToast'      : this.hideToast,
          'showLoading'    : this.showLoading,
          'hideLoading'    : this.hideLoading,
          'showHisCtnrView': this.showHisCtnrView,
          'hideHisCtnrView': this.hideHisCtnrView,
          "goTo"           : this.goTo,
          "goBack"         : this.goBack,
          "forward"        : this.goTo,
          "back"           : this.goBack,
          "go"             : this.go,
          "jump"           : this.jump
        }
      }
    }

    return APP
  });
define('cHybridApp',['cUtilCommon', 'cCoreInherit', 'cAbstractApp', 'cHybridShell'], function (UtilCommon, cCoreInherit, APP, cHybridShell) {
  //继承cAbstractApp
  return cCoreInherit.Class(APP, {

    bindEvents: function ($super) {
      $super();
      $(window).bind('hashchange', _.bind(function (e) {
        if (!this.stopListening) this.loadFromRoute(this._getCurrentView(), 0);
        Lizard.__fakeViewNode && Lizard.__fakeViewNode.remove();
      }, this));
    },

    start: function () {
      this.startUrl = this._getCurrentView();
      this.loadFromRoute(this.startUrl, 1);
      if (Lizard.multiView == 'on') {
        var fn = new cHybridShell.Fn('enable_drag_animation');
        fn.run(true);
      }
    },

    loadFromRoute: function (landingpath, landingpage) {
      var localRouteRet = Lizard.localRoute.mapUrl(landingpath);
      if (localRouteRet) {
        requirejs([localRouteRet], _.bind(function (text) {
          if (landingpath == this._getCurrentView()) {
            this.loadView(landingpath, text, {pushState: false, renderAt: Lizard.renderAt, landingpage: landingpage});
          } else {
            console.log('fast click back!!!');
          }
        }, this));
      }
    },

    _getCurrentView: function () {
      var landingpath = decodeURIComponent(window.location.hash);
      if (landingpath.indexOf('#') == 0) {
        landingpath = landingpath.substr(1);
      }
      else {
        landingpath = Lizard.localRoute.config.defaultView || _.first(_.keys(Lizard.localRoute.config));
      }
      return landingpath;
    },


    /*
     * 页面跳转方法,灵活使用此方法,也可实现跨页面跳转
     * @param {String} url URL信息
     * @param {Object} [opt] 跨页跳转的配置参数,如不传此参数, 则为单页的view切换, 详细参数信息,见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
     * @param {String} [opt.targetModel] 打开模式  如果全局的Lizard.multiView=on开启,则取值为4
     *
     * 0.当前页面刷新url, 该参数类似于js的location.href="", 注：只支持打online地址
     *
     * 1.处理ctrip://协议; 注：只处理ctrip协议的URL Schema
     *
     * 2.开启新的H5页面,title生效; 注：只支持online地址
     *
     * 3.使用系统浏览器打开; 注：只支持online地址和其它App的URL Schema，例如微信的weixin://home
     *
     * 4.开启新的H5页面，title生效，打开webapp目录下的相对路径；注：和2对应，2打开online地址，4打开相对路径
     *
     * 5.当前页面打开webapp目录下相对路径；注：和0对应，0是打开online地址，5是打开本地相对路径。 5.8之前版本，内部自动调用app_cross_package_href
     * @param {String} [opt.pageName] view的唯一标示
     * @param {String} [opt.title]  当targetMode＝2时候，新打开的H5页面的title
     * @param {Boolean} [opt.isShowLoadingPage] 开启新的webview的时候，是否加载app的loading
     * @method Global.Lizard.goTo
     * @example
     * //新开WebView的方式打开 osd/osdindex webView的名称指定为webViewOsd
     * Lizard.goTo(Lizard.appBaseUrl + 'osd/osdindex', {targetModel: '4', pageName: 'webViewOsd'})
     * //在同一个webView中直接跳转到osd/osdindex
     * Lizard.goTo(Lizard.appBaseUrl + 'osd/osdindex')
     */
    goTo: function (url, opt) {
      var pageName = (opt && opt.pageName) ? opt.pageName : url;

      if (opt || Lizard.multiView == 'on') {
        var fn = new cHybridShell.Fn('open_url'),
          targetModel = (opt && opt.targetModel > 0) ? opt.targetModel : 4;

        if (targetModel >= 4) {
          url = Lizard.appBaseUrl.substr(8) + 'index.html#' + url;
        }
        fn.run(url,targetModel, opt && opt.title||"", opt && opt.pageName || url, opt && opt.isShowLoadingPage);
      }
      else {
        this.endObserver();
        window.location.hash = encodeURIComponent(url);
        if (opt && pageName && Lizard.viewHtmlMap[pageName]) {
          this.loadView(url, Lizard.viewHtmlMap[pageName], {pushState: false});
          return;
        }
        else {
          this.loadFromRoute(url, 0);
        }
        setTimeout(_.bind(this.startObserver, this), 1);
      }
    },


    /*
     * 页面回退方法,如果在第一个页面回退,则自动会回退至native界面
     * @param {String} url URL信息
     * @param {Object} opt 设置信息
     * @param {String} [opt.pageName] 可选,如指定了此参数,多webview的情况,可回退至指定页面
     * @method Global.Lizard.goBack
     * @example
     * //回退至上一个页面,框架会判断如果是webview最先打开的页面会直接回退到上一个native页
     * Lizard.goBack()
     * //多WebView的情况下,回退至已打开webViewOsd页面, {pageName: 'webViewOsd'})
     * Lizard.goBack(Lizard.appBaseUrl + 'osd/osdindex', {pageName: 'webViewOsd'})
     */
    goBack: function (url,opt) {
      if (arguments.length == 0) {
        var prelocation = window.location.hash;
        history.back();
        setTimeout(_.bind(function () {
          if (prelocation == window.location.hash) {
            var fn = new cHybridShell.Fn('back_to_last_page');
            fn.run("", false);
          }
        }, this), 100);
      } else if(opt && opt.pageName &&  !Lizard.viewHtmlMap[pageName] ) {
        //如果多view的情况,指定了pageName, 会跳转值指定页
        var fn = new cHybridShell.Fn('back_to_page');
        fn.run(opt.pageName);
      }else {
        this.goTo.apply(this, arguments);
      }
    },

    /*
     * 跨频道跳转
     */
    jump:function(url,opt){
      var openUrl = url, targetModel = Lizard.multiView == "on" ? 4 : 5;
      //如果是完整的url, 将url转换为hybrid的格式
      if(UtilCommon.isUrl(url)){
        var paths = url.match(/webapp\/([^\/]+)/);
        if(paths.length >1 ){
          var sbuName = paths[1];
          openUrl =  sbuName+"/index.html" + "#"+ url.substr(url.indexOf('/webapp'));
        }else{

        }
      }else{
        var index = url.indexOf('/webapp');
        //如果为部分url,检查是否符合跳转格式
        openUrl = index>=0? url.substr(index):url;
      }

      //判断是否opt.tagetname是否符合格式,只支持4,5,默认为4,单页跳转
      targetModel = (opt && opt.targetModel && opt.targetModel > 4) ? opt.targetModel : targetModel;

      var fn = new cHybridShell.Fn('open_url');
      fn.run(openUrl, targetModel, opt && opt.title||"", opt && opt.pageName||openUrl, opt && opt.isShowLoadingPage||false);
    },

    startObserver: function () {
      this.stopListening = false;
    },

    endObserver: function () {
      this.stopListening = true;
    },

    judgeForward: function (url) {
      if (window.location.hash) {
        return url == decodeURIComponent(window.location.hash).substr(1);
      }
      else {
        return url == (Lizard.localRoute.config.defaultView || _.first(_.keys(Lizard.localRoute.config)));
      }
    }
  })
});
/**
 * @File c.hybrid.memeberServic
 * @Description hybird下的登录服务
 * @author shbzhang@ctrip.com
 * @date  2014/09/19 15:06
 * @version V1.0
 */

/**
 * 与用户登录相关的工具方法
 */
define('cHybridMember',['cHybridFacade'], function (Facade) {
  
  var HybridMember = {
    /**
     * 跳转至用户登录
     * @method memberlogin
     * @memberof  Service.cMemberService
     * @param {object} options
     * @param {boolean} options.isShowNonMemberLogin 是否用户登录界面显示非会员登录入口
     * @param {function} [options.callback] 仅hybrid可用 登录成功失败的回调
     * @param {string} [options.from] 仅web可用，登录成功跳转页
     * @param {string} [options.backurl] 仅web可用，登录页面回退跳转页
     */
    memberLogin: function (options) {
      Facade.request({ name: Facade.METHOD_MEMBER_LOGIN, callback: options.callback, isShowNonMemberLogin: options.isShowNonMemberLogin });
    },
    /**
     * 非会员登录
     * @method nonMemberLogin
     * @memberof  Service.cMemberService
     * @param {object} options
     * @param {function} options.callback 非会员登录成功的回调
     */
    nonMemberLogin: function (options) {
      Facade.request({ name: Facade.METHOD_NON_MEMBER_LOGIN, callback: options.callback });
    },

    /**
     * 用户注册
     * @method register
     * @memberof  Service.cMemberService
     * @param {object} options
     * @param {function} options.callback 注册成功的回调
     */
    register: function (options) {
      Facade.request({ name: Facade.METHOD_REGISTER, callback: options.callback });
    },

    /**
     * 用户自动登录
     * @method autoLogin
     * @memberof  Service.cMemberService
     * @param {object} options
     * @param {function} options.callback 自动登录成功的回调
     */
    autoLogin: function (options) {
      Facade.request({ name: Facade.METHOD_AUTO_LOGIN, callback: options.callback });
    },


    /**
     * H5登陆完成，将注册信息告知Native
     * @method finishedLogin
     * @memberof  Service.cMemberService
     * @param {object} options
     * @param {object} options.userInfo H5登录用户数据
     * @param {function} options.callback Native登录成功的回调
     */
    finishedLogin: function (options) {
      Facade.request({ name: Facade.METHOD_APP_FINISHED_LOGIN, userInfo: options.userInfo, callback: options.callback });
    }
  };

  return HybridMember;
});

/**
 * @File
 * @Description: (用一句话描述该文件做什么)
 * @author shbzhang
 * @date 2014-09-19 16:28:20
 * @version V1.0
 */
define('cHybridGeolocation',['cUtilPerformance', 'cHybridFacade'], function (cperformance, Facade) {
  var Geo = {};
  /**
   * @description 待地图上显示单个POI
   * @param {JSON}
   * options.latitude, 纬度2567.
   * options.longitude, 经度2568.
   * options.title, 在地图上显示的点的主标题2569.
   * options.subtitle, 在地图上显示点的附标题
   */
  Geo.showMapWithPOI = function (poi) {
    if (!options) {
      throw new Error('function show_map error is "param is null"');
    }
    options.name = Facade.METHOD_SHOW_MAP;
    Facade.request(poi);
  };

  /**
   * @description 在地图上显示多个POI位置点
   * @param {Array} poiList
   */
  Geo.showMapWithPOIList = function (poiList) {
    Facade.request({
      name: Facade.METHOD_APP_SHOW_MAP_WITH_POI_LIST,
      poiList: poiList
    });
  };

  /*
   * 获得城市信息
   * @param callback {Function} 成功时的回调
   * @param erro {Function} 失败时的回调
   * @param posCallback {Function} 获取经纬度成功的回调
   * @param posError {Function} 获取经纬度失败的回调
   * @param isAccurate {Boolean} 是否通过高精度查询 (如果使用高精度定位会发起两次请求，定位会需要更多时间，如只需定位城市，不需开启此开关，此开关在app中无效)
   */
  Geo.requestCityInfo = function (callback, error, posCallback, posError, isAccurate, cityCallBack, cityErrorCallBack) {
    var uuidGeoRequest = {
      number: cperformance.getUuid(),
      detail: cperformance.getUuid(),
      city: cperformance.getUuid(),
      error: cperformance.getUuid()
    };

    //+……2014-09-04……JIANGJing
    for (var i in uuidGeoRequest) {
      cperformance.group(uuidGeoRequest[i], {
        name: 'GeoRequest',
        url: 'Native function ' + i
      });     
    }
    var matchLocateInfo = function (info) {
      return (info.type == 'geo' || info.type == 'address' || info.type == 'CtripCity');
    };

    //+…2014-09-03……JIANGJing
    // 根据是否使用缓存数据的情形，Native 提供的 API 会回调一次（使用缓存）或两次（不使用缓存，第一次返回经纬度，第二次返回完整信息）。
    var firstCalled = true;

    //+…2014-09-03……JIANGJing
    var successCallback = function (info,error_code) {
      var ERR_INFOs = {
        1: '网络不通，当前无法定位',
        2: '定位没有开启'
      };
      // 定义当获取的定位信息不合规时的错误代码
      var DEFAULT_ERR_NUM = 1,
        errNum = 0;
      if (!matchLocateInfo(info)) {
        errNum = DEFAULT_ERR_NUM;
      } else if (info.locateStatus > 0) {
        errNum = window.Math.abs(info.locateStatus);
      }

      if (errNum) {
        //+……2014-09-12……JIANGJing……记录错误响应代码
        cperformance.groupTag(uuidGeoRequest.error, 'errno', '10' + errNum.toString());
        cperformance.groupEnd(uuidGeoRequest.error);
        if (typeof errorCallback == 'function') {
	        errorCallback(info, error_code);
        }
      } else {
        var v = info.value,
          detailed = (typeof v.addrs != 'undefined');
        if (detailed) {
          cperformance.groupEnd(uuidGeoRequest.detail);
        }

        if (firstCalled) {
          cperformance.groupEnd(uuidGeoRequest.number);
        }
        
        if ('CityEntities' in v) {
          cperformance.groupEnd(uuidGeoRequest.city);
          if (_.isFunction(cityCallBack)) {
            cityCallBack(v);
          }
        }

        if (firstCalled && typeof posCallback == 'function') {
          posCallback(v.lng, v.lat);
        }

        if (detailed && typeof callback == 'function') {
          callback({
            lng: v.lng,
            lat: v.lat,
            city: v.city || v.ctyName || v.province,
            province: v.province,
            district: v.district,
            //+2……2014-09-04……JIANGJing
            country: v.country,
            countryShortName: v.countryShortName,
            address: v.addrs
          });
        }
      }
      firstCalled = false;
    };

    var errorCallback = function (err, error_code) {
      //+……2014-09-12……JIANGJing……记录错误响应代码
      cperformance.groupTag(uuidGeoRequest.error, 'errno', '10');
      cperformance.groupEnd(uuidGeoRequest.error);
	    var errCode = (err && err.error_code) || error_code;
      if (errCode)
      {
        if (errCode.indexOf('201') > -1)
          posError(errCode);
        else if (errCode.indexOf('202') > -1)
          posError(errCode);
        else if (errCode.indexOf('203') > -1)
          posError(errCode);
        else if (errCode.indexOf('204') > -1)
          error(errCode);
        else if (errCode.indexOf('205') > -1)
          cityErrorCallBack && cityErrorCallBack(errCode);
      } else {
	      console.log("(-201)定位未开启");
	      posError("(-201)定位未开启");
      }
    };

    Facade.request({
      name: Facade.METHOD_LOCATE,
      success: successCallback,
      error: errorCallback
    });
  };


  return Geo;

});
; /**
 * @File c.web.memeberServic
 * @Description web下的登录服务
 * @author shbzhang@ctrip.com
 * @date  2014/09/19 15:06
 * @version V1.0
 */
define('cWebMember', ['cUserModel', 'cUtilValidate', 'cUtilPath', 'cUtilCryptBase64', 'cCommonStore'], function (UserModel, cUtilValidate, cUtilPath, CryptBase64, CommonStore) {
  "use strict";

  var host = window.location.host;
  var domain = "accounts.ctrip.com";
  if (host.match(/^m\.ctrip\.com/i)) {
    domain = "accounts.ctrip.com";
  } else if (host.match(/.uat\.qa/i)) {
    domain = "accounts.uat.qa.nt.ctripcorp.com";
  } else if (host.match(/.fat/i) || host.match(/.fws/i)) {
    domain = "accounts.fat49.qa.nt.ctripcorp.com";
  } else if (host.match(/^(localhost|172\.16|127\.0)/i)) {
    domain = "accounts.fat49.qa.nt.ctripcorp.com";
  }

  var LINKS = {
    MEMBER_LOGIN: 'https://' + domain + '/H5Login/#login',
    REGISTER: 'https://' + domain + '/H5Register/'
  };

  /**
  * 获得url
  * @param link
  * @param options
  * @private
  */
  var _getLink = function (link, options) {
    var url = link, lt = location;
    var param = (options && options.param && typeof options.param === 'string') ? options.param : "";
    if (param) {
      param = cUtilPath.getUrlParams(options.param);
      var backUrl = (param && param.backurl) ? decodeURIComponent(param.backurl) : "";
      var from = (param && param.from) ? decodeURIComponent(param.from) : "";
      var pHost = lt.protocol + "//" + lt.host;
      //判断参数是否为完整url，不是的话，补全host
      if (cUtilValidate.isUrl(backUrl)) {
        param.backurl = backUrl;
      } else {
        if (backUrl !== "") {
          param.backurl = pHost + backUrl;
        }
      }
      if (cUtilValidate.isUrl(from)) {
        param.from = from;
      } else {
        if (from !== "") {
          param.from = pHost + from;
        }
      }
      var paramStr = $.param(param);
      if (paramStr != "") {
        url = url + "?" + paramStr;
      }
    }
    window.location.href = url;
  };

  var Member = {

    memberLogin: function (options) {
      _getLink(LINKS.MEMBER_LOGIN, options);
    },

    nonMemberLogin: function (options) {
      //_getLink(LINKS.NON_MEMBER_LOGIN, options);
      var model = UserModel.NotUserLoginModel.getInstance();

      options = _.extend({
        callback: function () {
        }
      }, options || {});

      model.excute(options.callback, options.callback);
    },

    register: function (options) {
      _getLink(LINKS.REGISTER, options);
    },

    /**
    * 检查url是否有token参数，如有则尝试自动登录
    * @param {object} [opt] 输入参数
    * @param {string} [opt.url=location.href] url
    */
    autoLogin: function (opt) {
      var url = opt.url || window.location.href;
      //var token = cUtilPath.getUrlParam(url, '__token__'),
      var token = window.localStorage.getItem("__TOKEN__"),
        shortToken = cUtilPath.getUrlParam(url, 'GetUserInfos'),
        userStore = CommonStore.UserStore.getInstance(),
        headStore = CommonStore.HeadStore.getInstance(),
        userInfo, self = this;
      //如果URL中存在用户auth,去取登录信息
      if (token) {
        window.localStorage.removeItem("__TOKEN__");
        try {
          var data = CryptBase64.Base64.decode(decodeURIComponent(token));
          userInfo = JSON.parse(data);
        } catch (e) {
          opt.callback && opt.callback();
          return;
        }

        //获取用户信息
        var getuUserInfo = function () {
          //用戶auth不同，或者auth相同，旧的用户为未注册用户
          userStore.removeUser();
          //headStore.setAuth(userInfo.auth);
          userStore.setAuth(userInfo.auth)
          var userModel = UserModel.UserLoginModel.getInstance();
          userModel.param = {
            'Auth': userInfo.auth
          };
          var sucCb = function (data) {
            //如果返回的没有UserID字段,认为是无效数据
            if (data.UserID) {
              data.Auth = userInfo.auth;
              data.LoginName = data.LoginName || "";
              delete data.ResponseStatus;
              delete data.Result;
              userStore.setUser(data);
              userStore.setExpireTime(userInfo.time);
            }

            //继续app初始化过程
            opt.callback && opt.callback();
          };
          var errCb = function () {
            self.memberLogin();
          }

          userModel.excute(sucCb, errCb);
        }

        //如果用户旧的auth与新传来的auth相同，需要判断旧的auth是否是注册用户
        if (userStore.getAuth() === userInfo.auth) {
          if (userStore.isNonUser()) {
            //如果是非注册用户,重新调用用户登录接口
            getuUserInfo();
          } else {
            //继续app初始化过程
            opt.callback && opt.callback();
          }
        } else if (userStore.getAuth() !== userInfo.auth) {
          //如果用户旧auth与新传来的auth不同,则取新用户信息
          getuUserInfo();
        }
      } else if (shortToken) {
        //首先删除老的用户信息
        userStore.removeUser();
        // 新的登录方式，获取需要jsonp请求,如果有值的话，直接请求新的用户信息
        var userModel = UserModel.NewUserLoginModel.getInstance();
        userModel.param = {
          'token': shortToken,
          'IsH5': 1,
          'jsonpCallback': 'callbackfn'
        };
        var sucCb = function (data) {
          //获取信息成功才替换本地用户信息
          if (data.UserID) {
            data.LoginName = data.LoginName || "";
            userStore.setAuth(data.Auth);
            userStore.setUser(data);
            userStore.setExpireTime(data.ExpiredTime);
          }
          //继续app初始化过程
          opt.callback && opt.callback();
        };
        var errCb = function () {
          //此处 不跳不跳转登录？？
          self.memberLogin();
          //opt.callback && opt.callback();
        }
        userModel.excute(sucCb, errCb);
      } else {
        //继续app初始化过程
        opt.callback && opt.callback();
      }
    },
    /**
    * 获取登录auth完成
    * @returns {boolean}
    */
    app_finished_login: function () {
      return false
    }
  };

  return Member;

});
; define('cWebAppInit', ['cBaseInit', 'cWebMember'], function (initFunc, Member) {
  Member.autoLogin({
    callback: function () {
      require(['cStatic'], function () {
        initFunc();
      });
    }
  });
});
define('UIHeader', ['UIView', getAppUITemplatePath('ui.header'), 'UIBubbleLayer'], function (UIView, template, UIBubbleLayer) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      //是否设置view所处作用域
      this.viewScope;

      this.datamodel = {
        left: [],
        right: [],
        center: {}
      };

      //html模板
      this.template = template;
      this.events = {};
    },

    resetPropery: function ($super) {
      $super();
      if (this.root && this.root[0]) this.wrapper = this.root;
    },

    //单纯的做老代码桥接......
    set: function (data) {
      this._originData = data;
      if (typeof data != 'object') return;

      //做一个容错处理
      if (!data.events) data.events = {};

      if (data.view) this.viewScope = data.view;

      var _data = {
        left: [],
        right: [],
        center: {}
      };

      //左边模块
      var _left = {};

      //处理左边模块，默认只有一个
      if (_.isObject(data.back)) {
        _data.left.push(data.back);
      } else if (_.isBoolean(data.back)) {
        _left.tagname = 'back';
        if (_.isString(data.backtext)) _left.value = data.backtext;
        if (_.isFunction(data.events.returnHandler)) _left.callback = data.events.returnHandler;
        _data.left.push(_left);
      } else if (data.back !== false && (!_.find(data.left, function (item) { return item.tagname == 'back' }))) {
        //如果没有显示定义back为false，则无论如何需要一个回退按钮，这里做老接口兼容
        _data.left.push({ tagname: 'back', callback: data.events.returnHandler });
      }

      //处理右边按钮群

      //电话
      if (_.isObject(data.tel)) {
        _data.right.push({
          tagname: 'tel',
          number: data.tel.number,
          callback: data.events.telHandler
        });
      }

      if (data.home) {
        _data.right.push({
          tagname: 'home',
          callback: data.events.homeHandler
        });
      }

      if (_.isObject(data.btn)) {
        _data.right.push({
          tagname: 'commit',
          value: data.btn.title,
          classname: data.btn.classname,
          data: data.btn.data,
          callback: data.events.commitHandler
        });
      }

      if (_.isArray(data.moreMenus)) {
        _data.right.push({
          tagname: 'list',
          data: data.moreMenus
        });
      }

      //处理标题逻辑，由于title的唯一性，这里中间便只存一个对象
      var _title = {}
      if (_.isString(data.title)) {
        _title.tagname = 'title';
        _title.value = data.title;
      }

      if (_.isString(data.subtitle)) {
        _title.tagname = 'subtitle';
        _title.value = [data.title, data.subtitle];
      }

      if (_.isString(data.citybtn)) {
        _title.tagname = 'select';
        _title.value = data.citybtn;
        _title.callback = data.events.citybtnHandler;
      }

      if (_.isObject(data.title)) {
        _title = data.title;
      }

      _data.center = _title;

      if (data.left) _data.left = data.left.concat(_data.left);
      if (data.right) _data.right = data.right.concat(_data.right);

      //将list一定放到右边
      var menuObj = _.groupBy(_data.right, function (rightItem) { return (rightItem.tagname == 'list') ? 'a' : 'b' });
      _data.right = (menuObj['b'] || []).concat(menuObj['a'] || []);

      //如果外部设置了center直接替换
      if (_.isObject(data.center)) _data.center = data.center;

      //hybrid的请求结构正确了，下面需要解析H5需要的结构，主要区别在标题处
      this.handleSpecialParam(_data);

      this.datamodel = _data;

      //在此生成具体事件绑定逻辑
      this.setEventsParam();

      //兼容处理，保持最后一次的returnHandler存根
      if (this.datamodel.left[0] && _.isFunction(this.datamodel.left[0].callback))
        this.lastReturnHandler = this.datamodel.left[0].callback;

      this.refresh(true);

      this.show();
    },

    //侧边栏默认回调，这个情况一般是用户直接使用moreMenus接口
    listDefaultCallback: function (e) {
      var i, len;

      //取出相关的数据，这里有一点定制化
      var _data = _.find(this.datamodel.right, function (obj) {
        return obj.tagname == 'list';
      });

      if (!_data) return;

      if (!this.sidebar) {
        this.sidebar = new UIBubbleLayer({
          datamodel: {
            data: _data.data,
            wrapperClass: 'cm-pop--user-nav',
            itemFn: function (item) {
              var classname = item.iconname || item.tagname;
              return '<i class="icon-' + classname + '"></i>' + item.value;
            }
          },
          triangleRight: '16px',
          triggerEl: $(e.currentTarget),
          width: '128px',
          onCreate: function () {
            this.mask.$el.addClass('cm-overlay--transparent');
            this.mask.$el.removeClass('cui-mask');
          },
          onClick: function (data, index, el) {
            if (_.isFunction(data.callback))
              data.callback.call(this.viewScope, data, index, el);
            this.hide();
          }
        });
      }

      if (this.sidebar.status == 'show') {
        this.sidebar.hide();
      } else {
        this.sidebar.show();
      }

    },

    backDefaultCallback: function () {
      if (this.lastReturnHandler) {
        this.lastReturnHandler.call(this.viewScope);
        return;
      }
      console.log('默认back回调');
      Lizard.goBack();
    },

    setEventsParam: function () {
      var item, _callback = null, data = this.datamodel.left.concat(this.datamodel.right).concat(this.datamodel.center);

      for (var i = 0, len = data.length; i < len; i++) {
        item = data[i];

        //有默认的便赋值默认
        if (_.isFunction(this[item.tagname + 'DefaultCallback']))
          _callback = this[item.tagname + 'DefaultCallback'];

        //外部传入的优先级更高
        if (_.isFunction(item.callback))
          _callback = $.proxy(item.callback, this.viewScope);

        if (_callback) {
          this.events['click .js_' + item.tagname] = _callback;
        }
        _callback = null;
      }
    },

    handleSpecialParam: function (data) {
      var k, i, len, item;
      for (k in data) {
        if (_.isArray(data[k])) {
          for (i = 0, len = data[k].length; i < len; i++) {
            item = data[k][i];
            if (this['customtHandle_' + item.tagname]) {
              this['customtHandle_' + item.tagname](data[k][i], k);
            } //if
          } //for
        } //if
      } //for
    },

    _getDir: function (dir) {
      var kv = { left: 'fl', right: 'fr' };
      return kv[dir];
    },

    //定制化信息
    customtHandle_tel: function (item, dir) {
      dir = this._getDir(dir);
      item.itemFn = function () {
        return '<a href="tel:' + item.number + '" class="cm-header-icon __hreftel__ ' + dir + ' js_' + item.tagname + ' " ><i class="icon-' + item.tagname + '"></i></a>';
      };
    },

    addEvent: function () {

      this.on('onShow', function () {
        this.$el.removeClass('cm-header--no-right');
        if (this.datamodel.right.length === 0) {
          this.$el.addClass('cm-header--no-right');
        }
      });

    },

    createRoot: function (html) {
      var hDom = $('#headerview');
      hDom.html('').css('height', '44px');
      this.$el = $(html).hide().attr('id', this.id);
    },

    updateHeader: function (name, val) {
      if (_.isObject(name)) {
        this.set(_.extend(this._originData, name));
      } else {
        if (_.isObject(this._originData)) {
          this.set(_.extend(this._originData, _.object([name], [val])));
        } else {
          this.set(_.object([name], [val]));
        }
      }
    }
  });
});
; /**
 * @File c.web.guider
 * @Description:  web 环境下的操作
 * @author shbzhang
 * @date 2014-09-24 11:08:08
 * @version V1.0
 */
define('cWebGuider', [], function () {
  "use strict";
  var Guider = {
    jump: function (options) {
      if (options && options.url && typeof options.url === 'string') {
        window.location.href = options.url;
      }
    },

    apply: function (options) {
      if (options && options.callback && typeof options.callback === 'function') {
        options.callback();
      }
    },

    call: function (options) {
      var $caller = document.getElementById('h5-hybrid-caller');

      if (!options || !options.url || !typeof options.url === 'string') {
        return false;
      } else if ($caller && $caller.src == options.url) {
        $caller.contentDocument.location.reload();
      } else if ($caller && $caller.src != options.url) {
        $caller.src = options.url;
      } else {
        $caller = document.createElement('iframe');
        $caller.id = 'h5-hybrid-caller';
        $caller.src = options.url;
        $caller.style.display = 'none';
        document.body.appendChild($caller);
      }
    },

    log: function (options) {
      if (window.console) {
        window.console.log(options.name);
      }
    },

    print: function (options) {
      return console.log(options.log, options.result);
    },

    callService: function () {
      window.location.href = 'tel:4000086666';
    },

    backToLastPage: function () {
      window.location.href = document.referrer;
    },

    home: function () {
      window.location.href = '/';
    }
  };

  return Guider;
}); ; /**
 * @File c.web.geolocation
 * @Description: web环境下定位
 * @author ouxz@ctrip.com/shbzhang@ctrip.com
 * @date 2014-09-19 17:46:07
 * @version V1.0
 */
define('cWebGeolocation', ['cGeoHelper', 'cUtilPerformance', 'cModel', 'cCoreInherit'], function (cGeoHelper, cperformance, cModel, cCoreInherit) {
  var Geo = {}, KEY = '0b895f63ca21c9e82eb158f46fe7f502';
  //add by byl 记录当前设备所处位置，默认是在国内
  Geo.isInOverseas = false;

  var cityModel = cCoreInherit.Class(cModel, {
    __propertys__: function () {
      this.url = 'http://m.ctrip.com/restapi/soa2/10398/json/LBSLocateCity';
    }
  }).getInstance();

  /**
  * @description 待地图上显示单个POI
  * @param {JSON}
  * options.latitude, 纬度2567.
  * options.longitude, 经度2568.
  * options.title, 在地图上显示的点的主标题2569.
  * options.subtitle, 在地图上显示点的附标题
  * options.zoomCallBack  地图比例变化时的回调
  */
  Geo.showMapWithPOI = function (options) {
    //自定义Google view
    function NameOverlay(point, name, map, div) {

      // 初始化参数：坐标、文字、地图
      this.point_ = point;
      this.name_ = name;
      this.map_ = map;

      // 到onAdd时才需要创建div
      this.div_ = div;
      // 加入map
      this.setMap && this.setMap(map);
    }
    //此处WebMap 和 WebMapOverseas 需要合并，都包含了多个marker节点以及marker节点的点击回调事件
    var WebMap = function (config) {
      if (!config || !config.lat || !config.lng || !config.id) {
        config.error && config.error();
        return false;
      }
      var marekrViews = {
        marekrs: [],
        overlays: []
      },
                markers,
                isOverseasAndGoogle = false,
                google = window.google;
      var isDomestic = cGeoHelper.getCountry(config.lng, config.lat);
      // @description 在web环境中，如果缺少AMap对象和定位点信息，直接返回false，标记错误，无法加载地图,唉谷歌地图api加载不完全的情况，需要处理
      if ((isDomestic != 1 || Geo.isInOverseas) && google && google.maps && google.maps.LatLng) {
        isOverseasAndGoogle = true;
        if (google.maps.OverlayView) {
          //在此处自定义一个Google View 用于展示和高德地图一样的view
          NameOverlay.prototype = new google.maps.OverlayView();
          // NameOverlay定义
          NameOverlay.prototype.onAdd = function () {
            var panes = this.getPanes();
            panes.overlayImage.appendChild(this.div_);
          }

          NameOverlay.prototype.draw = function () {
            // 利用projection获得当前视图的坐标
            var overlayProjection = this.getProjection();
            var center = overlayProjection.fromLatLngToDivPixel(this.point_);
            // 为简单，长宽是固定的，实际应该根据文字改变
            var div = this.div_;
            if (div) {
              div.style.left = center.x + 20 + 'px';
              div.style.top = center.y - 50 + 'px';
              div.style.position = 'absolute';
              var children = div.children[0];
              if (children) {
                children.style.bottom = '0px';
                children.style.left = '0px';
              }
            } else {
              return;
            }
          }
          NameOverlay.prototype.onRemove = function () {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
          }

        }
      } else {
        if (!AMap) {
          config.error && config.error();
          return false;
        }
      }
      var DEFAULT_LEVEL = 13;
      // @description 初始化地图信息
      var mapContainer;

      if (isOverseasAndGoogle) {
        mapContainer = new google.maps.Map(document.getElementById(config.id), {
          // @description 地图中心点
          center: new google.maps.LatLng(config.lat, config.lng),
          zoom: config.level || DEFAULT_LEVEL, // @description 地图显示的比例尺级别
          zoomControl: true
        });
      } else {
        mapContainer = new AMap.Map(config.id, {
          // @description 地图中心点
          center: new AMap.LngLat(config.lng, config.lat),
          level: config.level || DEFAULT_LEVEL // @description 地图显示的比例尺级别
        });
        //增加Google的支持
        var googleGD = null;
        var addGoogle = function (mapObj) {
          googleGD = new AMap.TileLayer({
            tileUrl: "http://mt{1,2,3,0}.google.cn/vt/lyrs=m@142&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil" //图块取图地址
          });
          googleGD.setMap(mapObj);
        }
        //使用高德地图，如果定位的地址是国外，或者目前设备在国外，均要添加google地图支持
        if (isDomestic != 1 || Geo.isInOverseas) {
          addGoogle(mapContainer);
        }
      }

      //绑定zoom事件
      if (config.zoomCallBack) {
        (!isOverseasAndGoogle) ? AMap.event.addListener(mapContainer, 'zoomchange', function () {
          var newMarkers = config.zoomCallBack && config.zoomCallBack(this.getZoom());
          if (newMarkers) {
            this.clearMap();
            createMarker(newMarkers, this, isOverseasAndGoogle);
          }
        }) : google.maps.event.addListener(mapContainer, 'zoom_changed', function () {
          var newMarkers = config.zoomCallBack && config.zoomCallBack(this.getZoom());
          if (newMarkers) {
            //删除原有的markers
            if (marekrViews.marekrs && marekrViews.marekrs.length > 0) {
              for (var i = 0; i < marekrViews.marekrs.length; i++) {
                marekrViews.overlays[i].setMap && marekrViews.overlays[i].setMap(null);
                marekrViews.marekrs[i].setMap && marekrViews.marekrs[i].setMap(null);
              }
              marekrViews = {
                marekrs: [],
                overlays: []
              };
            }
            createMarker(newMarkers, this, isOverseasAndGoogle);
          }
        });
      }
      if ((config.markers instanceof Array) && config.markers.length > 0) {
        markers = config.markers;
      } else {
        markers = config;
      }
      // @description 地图中心点
      createMarker(markers, mapContainer, isOverseasAndGoogle);
      //添加地图对象的返回，提供BU删除操作
      return mapContainer;
      //创建标记点
      function createMarker(params, mapObj, isDomestic) {
        if ((params instanceof Array) && params.length > 0) {
          for (var i = 0; i < params.length; i++) {
            var tempConfig = params[i];
            if (!tempConfig || !tempConfig.lat || !tempConfig.lng) {
              break;
            }
            createSingleMarekr(tempConfig, mapObj, isDomestic);
          }
        } else {
          createSingleMarekr(params, mapObj, isDomestic);
        }
        function createSingleMarekr(params, mapObj, isDomestic) {
          var markerContent = $('<DIV/>').addClass('map-content');
          if (!isDomestic) {
            $('<IMG/>').attr({
              src: 'http://res.m.ctrip.com/html5/Content/images/map_address.png'
            }).appendTo(markerContent);
          }
          if (params.content) {
            $('<SPAN/>').html(params.content).appendTo(markerContent);
          }
          var marker;
          // @description 生成标记点，并且设置position
          if (!isDomestic) {
            marker = new AMap.Marker({
              position: new AMap.LngLat(params.lng, params.lat),
              map: mapObj,
              id: params.markerId
            });
            //如果id存在设置为中心点
            if (params.id && params.id != "") {
              mapObj.setCenter(new AMap.LngLat(params.lng, params.lat));
            }
            marker.setContent(markerContent[0]);
            if (params.callBack) {
              AMap.event.addListener(marker, 'click', function () {
                params.callBack(params.markerId);
              });
              //                          mapObj.bind(marker, 'click',
              //                              function () {
              //                              });
            }
          } else {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(params.lat, params.lng),
              map: mapObj,
              icon: "http://res.m.ctrip.com/html5/Content/images/map_address.png",
              id: params.markerId
            });
            //如果id存在设置为中心点
            if (params.id && params.id != "") {
              mapObj.setCenter(new google.maps.LatLng(params.lat, params.lng));
            }
            //此处 地图标记点说明用infowindow显示
            var name1View = new NameOverlay(new google.maps.LatLng(params.lat, params.lng), params.content, mapObj, markerContent[0]);
            marekrViews.marekrs.push(marker);
            marekrViews.overlays.push(name1View);
            if (params.callBack) {
              //google marker的点击事件
              google.maps.event.addListener(marker, 'click',
                                function () {
                                  params.callBack(params.markerId);
                                });
            }
          }
        };
      }
    }
    return WebMap(options);
  };

  /**
  * @description 在地图上显示多个POI位置点
  * @param {Array} poiList
  */
  Geo.showMapWithPOIList = function (poiList) {
  };

  /**
  * 获得城市信息
  * @param callback {Function} 成功时的回调
  * @param erro {Function} 失败时的回调
  * @param posCallback {Function} 获取经纬度成功的回调
  * @param posError {Function} 获取经纬度失败的回调
  * @param isAccurate {Boolean} 是否通过高精度查询 (如果使用高精度定位会发起两次请求，定位会需要更多时间，如只需定位城市，不需开启此开关，此开关在app中无效)
  */
  Geo.requestCityInfo = function (callback, error, posCallback, posError, isAccurate, cityCallBack, cityErrorCallBack) {
    var uuidGeoRequest = {
      number: cperformance.getUuid(),
      detail: cperformance.getUuid(),
      city: cperformance.getUuid(),
      error: cperformance.getUuid()
    };

    //+……2014-09-04……JIANGJing
    for (var i in uuidGeoRequest) {
      cperformance.group(uuidGeoRequest[i], {
        name: 'GeoRequest',
        url: 'Web function ' + i
      })
    }
    var successCallback = function (pos) {
      //+1……2014-09-04……JIANGJing
      cperformance.groupEnd(uuidGeoRequest.number);

      var lng = pos.coords.longitude;
      var lat = pos.coords.latitude;
      posCallback && posCallback(lng, lat);
      var locateSuccessCallback = function (data) {
        //+1……2014-09-04……JIANGJing
        cperformance.groupEnd(uuidGeoRequest.detail);
        if (_.isFunction(cityCallBack)) {
          cityModel.setAttr('param', { Longitude: lng, Latitude: lat, CountryName: data.country, ProvinceName: data.province, L1CityName: data.city, L2CityName: data.district, TownName: '', Language: 'CN' });
          cityModel.excute(function (data) {
            cperformance.groupEnd(uuidGeoRequest.city);
            cityCallBack(data);
          }, function (err) {
            cperformance.groupTag(uuidGeoRequest.error, 'errno', '23');
            cperformance.groupEnd(uuidGeoRequest.error);
            if (cityErrorCallBack) { cityErrorCallBack(err); }
          });
        }
        if (callback) {
          callback(data);
        }
      };

      var locateErrorCallback = function (err, msg) {
        //+……2014-09-12……JIANGJing……记录错误响应代码
        cperformance.groupTag(uuidGeoRequest.error, 'errno', '21');
        //+1……2014-09-04……JIANGJing
        cperformance.groupEnd(uuidGeoRequest.error);
        if (error) {
          error();
        }
      };
      if (!isAccurate) {
        Geo.requestAMapAddress(lng, lat, locateSuccessCallback, locateErrorCallback);
      } else {
        Geo.tansformLongitude(lng, lat, function (lng, lat) {
          Geo.requestAMapAddress(lng, lat, locateSuccessCallback, locateErrorCallback);
        }, function (err) {
          //-1……2014-09-12……JIANGJing……区分错误
          //locateErrorCallback(err);
          //+2……2014-09-12……JIANGJing……重新定义错误响应
          cperformance.groupTag(uuidGeoRequest.error, 'errno', '22');
          cperformance.groupEnd(uuidGeoRequest.error);
          if (error) {
            error();
          }
        });
      }
    };

    var errorCallback = function (err, msg) {
      //-1……2014-09-04……JIANGJing
      //cperformance.groupEnd(uuidGeoService);

      //+……2014-09-12……JIANGJing……记录错误响应代码
      cperformance.groupTag(uuidGeoRequest.error, 'errno', '20');
      //+1……2014-09-04……JIANGJing
      cperformance.groupEnd(uuidGeoRequest.error);

      if (typeof posError === 'function') {
        posError(msg, err);
        return;
      }
      if (error) {
        error(msg);
      }
    };
    this.requestGeographic(successCallback, errorCallback);
  };

  /**
  * 获得设备经纬度
  * @param {function} callback 获得经纬度的回调
  * @param {function} error  发生错误时的回调
  * @param {timeout} 超时时间
  */
  Geo.requestGeographic = function (callback, error, timeout) {
    var uuidGeoService = cperformance.getUuid();
    cperformance.group(uuidGeoService, {
      name: "GeoRequest",
      url: "Google service",
      type: "Google service"
    });
    //add by byl 异步添加js，内部重写document.write，仅为下载google api使用
    var loadScript = function (url, inCallback, isWrite) {
      var script = document.createElement("script"),
                dw = document.write;
      script.type = "text/javascript";
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
            script.onreadystatechange = null;
            document.write = dw;
            if (isWrite) {
              inCallback && inCallback();
            }
          }
        };
      } else {
        script.onload = function () {
          document.write = dw;
          if (isWrite) {
            inCallback && inCallback();
          }
        };
        script.onerror = function () {
          //下载失败，需要还原document.write
          document.write = dw;
        };
      }
      script.src = url;
      document.write = function (ad) {
        var src = ad.match(/http(s)?:\/\/[A-Za-z0-9]+[\.\/=\?%\-&_~`@[\]\:+!]*([^<>])*(\.js)/);
        if (src) {
          loadScript(src[0], function () {
            document.write = dw;
          }, true);
        }
      }
      document.body.appendChild(script);
    }
    var successCallback = function (position) {
      cperformance.groupEnd(uuidGeoService);
      if (callback) {
        callback(position);
      }
      //add by byl 在定位海外地址时，尝试下载google地图
      //此处可以考虑一个异步处理
      var lng = position.coords.longitude;
      var lat = position.coords.latitude;
      var isDomestic = cGeoHelper.getCountry(lng, lat);
      //add by byl  仅仅定位成功，并且在国外时，才为true,其余都是false
      if (isDomestic == 2) {
        Geo.isInOverseas = true;
        if (typeof google === 'undefined') {
          loadScript('https://maps.googleapis.com/maps/api/js?v=3&region=zh-CN');
        }
      } else {
        Geo.isInOverseas = false;
      }
    };
    var errorCallback = function (err) {
      cperformance.groupEnd(uuidGeoService);
      var err_msg = '未能获取到您当前位置，请重试或选择城市'; // '获取经纬度失败!';
      switch (err.code) {
        case err.TIMEOUT:
          err_msg = "获取您当前位置超时，请重试或选择城市！";
          break;
        case err.PERMISSION_DENIED:
          err_msg = "您拒绝了使用位置共享服务，查询已取消，请开启位置共享或选择城市！";
          break;
        case err.POSITION_UNAVAILABLE:
          err_msg = "获取您当前位置信息失败，请重试或选择城市！";
          break;
      }
      if (error) {
        error(err, err_msg);
      }
    };

    //此处应该添加浏览器是否支持navigator的判断，并且enableHighAccuracy参数需要考虑，pc端不需要使用精确定位
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: timeout || 20000
      });
    } else {
      if (error) {
        error("", "获取您当前位置信息失败，浏览器不支持定位！");
      }
    }
  };

  /**
  * @description: 获取转换过的经纬度
  * @param lng {Number} 经度
  * @param lat {Number} 维度
  * @param callback {Function} 成功回调
  * @param error {Function} 错误回调
  * @author: ouxz
  */
  Geo.tansformLongitude = function (lng, lat, callback, error, timeout) {
    var uuidGeoService = cperformance.getUuid();
    cperformance.group(uuidGeoService, {
      name: "GeoRequest",
      url: "http://restapi.amap.com/v3/assistant/coordinate/convert",
      type: "AMap service"
    });
    //add by byl  国外的地址 不需要进行详细定位
    var isDomestic = cGeoHelper.getCountry(lng, lat);
    if (isDomestic != 1) {
      cperformance.groupEnd(uuidGeoService);
      callback(lng, lat);
      return;
    }
    var param = $.param({
      locations: lng + ',' + lat,
      key: KEY,
      coordsys: 'gps'
    });

    timeout = timeout || 8000;

    $.ajax({
      url: "http://restapi.amap.com/v3/assistant/coordinate/convert?" + param,
      dataType: 'jsonp',
      success: function (data) {
        cperformance.groupEnd(uuidGeoService);
        if (data && data.status === '1') {
          var l = data.locations.split(',');
          callback && callback(l[0], l[1]);
        } else {
          error && error();
        }
      },
      error: function (e) {
        cperformance.groupEnd(uuidGeoService);
        error && error(e);
      },
      timeout: timeout
    });
  };

  /**
  * 高德api经纬度获得详细地址信息
  * @param lng {Number} 经度
  * @param lat {Number} 纬度
  * @param callback {Function} 完成时回调,回传参数为高德下发城市数据
  * @param error {Function} 超时回调
  * @param timeout {Number} 超时的时间长度，默认为8秒
  * @author ouxingzhi
  */
  Geo.requestAMapAddress = function (lng, lat, callback, error, timeout) {
    var uuidGeoService = cperformance.getUuid();
    cperformance.group(uuidGeoService, {
      name: "GeoRequest",
      url: "http://restapi.amap.com/v3/geocode/regeo",
      type: "AMap service"
    });
    var region = '121.473704,31.230393';
    var ret = 1; //默认的region地址是国内的，所以默认使用高德地图
    if (lng && lat) {
      region = lng + ',' + lat;
      //判断是否是国内的经纬度
      ret = cGeoHelper.getCountry(lng, lat);
    }

    timeout = timeout || 8000;

    var url = (ret == 1) ? ('http://restapi.amap.com/v3/geocode/regeo?' + $.param({
      'location': region,
      'key': KEY,
      'radius': 0,
      'extensions': 'all'
    })) : ('https://maps.googleapis.com/maps/api/geocode/json?' + $.param({
      latlng: lat + ',' + lng,
      sensor: false
    }));

    $.ajax({
      url: url,
      dataType: (ret == 1) ? 'jsonp' : 'json',
      success: function (data) {
        cperformance.groupEnd(uuidGeoService);
        var info = translateGeoResult(data, ret);
        if (_.isObject(info)) {
          callback && callback(translateGeoResult(data, ret));
        } else {
          error && error(data)
        }
      },
      error: function (e) {
        cperformance.groupEnd(uuidGeoService);
        error && error(e);
      },
      timeout: timeout
    });

    function translateGeoResult(data, type) {
      if (type == 1) {
        var addrs = (data && data.regeocode) || '',
        citys = addrs.addressComponent.city,
        province = addrs.addressComponent.province,
        district = addrs.addressComponent.district,
        city = '';
        if (_.isString(citys)) {
          city = citys;
        } else if (_.isString(province)) {
          city = province;
        }
        return {
          'address': _.isString(addrs.formatted_address) ? addrs.formatted_address : '',
          'location': region,
          'info': addrs && addrs.addressComponent,
          'city': city,
          'province': province,
          'district': district,
          'lng': lng,
          'lat': lat,
          'country': '中国', //国内的固定传中国
          'countryShortName': 'CHN'
        };
      } else {
        if (data && data.status === 'OK') {
          var district = '',
          city = '',
          country = '',
          province = '',
          countryShortName = '';
          if (!data.results) {
            return false;
          }
          //从第一个详细地址中获取国家省市区信息
          var detailAdress = data.results[0] || {};
          _.find(detailAdress.address_components, function (item) {
            var politicalName = item && item.long_name;
            if (item.types) {
              //国家
              if (item.types[0] == 'country' && item.types[1] == 'political') {
                country = politicalName;
                countryShortName = item.short_name;
              }
              //省级、州级
              if (item.types[0] === 'administrative_area_level_1' && item.types[1] === 'political') {
                province = politicalName;
              }
              //城市
              if (item.types[0] === 'locality' && item.types[1] === 'political') {
                city = politicalName;
              }
              //县级
              if (item.types[0] === 'administrative_area_level_2' && item.types[1] === 'political') {
                district = politicalName;
              }
              //区（此级别和上面的县级只能取一个，暂定取sublocality）
              if (item.types[0] === 'sublocality_level_1' && item.types[1] === 'sublocality') {
                district = politicalName;
              }
            }
          });
          if (country == '' && province == '' && city == '' && district == '') {
            return false;
          }
          return {
            'address': _.isString(data.results[0].formatted_address) ? data.results[0].formatted_address : '',
            'location': region,
            'info': data.results[0].address_components,
            'lng': lng,
            'lat': lat,
            'country': country,
            'province': province,
            'city': city,
            'district': district,
            'countryShortName': countryShortName
          };
        } else {
          return false;
        }
      }
    }
  };
  return Geo;
});

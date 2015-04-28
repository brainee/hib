/**
 * Ctrip JavaScript Code
 * http://www.ctrip.com/
 * Copyright(C) 2008 - 2014, Ctrip All rights reserved.
 * Version: 140430
 * Date: 2014-04-30
 */
;!function(){function e(e,t){var r=t,s=e.replace(/[\?#].*$/,"").replace(/[^/]+$/,"").match(/^(\w+:)\/\/([^\/]*)(\/.*$)/);if(s)if(/^\w+:\/\//.test(t))r=t;else if(/^\/\//.test(t))r=s[1]+t;else if(/^\//.test(t))r=s[1]+"//"+s[2]+t;else{var n=s[1]+"//"+s[2]+s[3]+t,i="",a="";n=n.replace(/^\w+:\/\/[^\/]*/,function(e){return i=e,""
}).replace(/[\?#].*$/,function(e){return a=e,""}),n=n.replace(/\/..(?=[\/$])/g,"");var c;for(c=/\/[^\/]*\/\.(?=[\/$])/;c.test(n);)n=n.replace(c,"");for(c=/^\/\.(?=[\/$])/;c.test(n);)n=n.replace(c,"");r=i+n+a}return r}function t(){}var r=(window.console||{log:function(){}},function(){var t,r=document.currentScript;
if(r)t=r.src;else for(var s=document.getElementsByTagName("script"),n=0;n<s.length;n++)if("interactive"==s[n].readyState){t=s[n].src;break}return t=t?t:"/",e(location.href,t)}());window.LL={_status:{},_configs:[],_releaseNo:t(),_ref:document.getElementsByTagName("head")[0],_preload:function(e){var t=this;
for(var r in e)e.hasOwnProperty(r)&&!function(e){t._status[e]||(t._status[e]="loaded")}(e[r]);this._check()},_check:function(){for(var e=0;e<this._configs.length;e++)for(var t=this._configs[e],r=1;r;){r=0;for(var s in t.scripts)if(t.scripts.hasOwnProperty(s)){var n=t.scripts[s];switch(this._status[n]){case"error":delete t.scripts[s],r=1;
break;case"loaded":case"executed":var i=1,a=t.deps[s];if(a)for(var c=0;c<a.length;c++)if(t.scripts.hasOwnProperty(a[c])){i=0;break}i&&(delete t.scripts[s],this._isEmpty(t.scripts)?this._run(n,t.onload):(this._run(n),r=1))}}}},_isEmpty:function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0
},_run:function(e,t){var r=this;if("executed"!=this._status[e]){"executed"==this._status[e];var s=document.createElement("script");s.type="text/javascript",s.onload=s.onerror=function(){t&&t(),r._check()},s.async=!1,s.src=e,r._ref.parentNode.insertBefore(s,r._ref)}},_fixPath:function(t){for(var s=[],n=0;n<t.length;n++)s.push(e(r,t[n]));
return s},JS:function(t,s){var n={},i=t.scripts||{};for(var a in i)i.hasOwnProperty(a)&&(n[a]=e(t.baseOnScript?r:location.href,i[a]));this._configs.push({scripts:n,deps:t.deps||{},onload:s}),this._preload(n)}}}();

LL.JS({
	baseOnScript:true,
	scripts:{
		a:'parser.js',
		b:'lizard.js',
		c:'3rdlibs/require.min.js',
		d:'3rdlibs/zepto.js',
		e:'3rdlibs/underscore.js',
		f:'3rdlibs/backbone.js',
		g:'config.js'
	},
	deps:{
		b:['a'],
		e:['d'],
		f:['e'],
		g:['a','b','c','d','e','f']
	}
},function(){
	Lizard.app=new Lizard.APP();
});
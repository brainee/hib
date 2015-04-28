(function(){
	// console for debug
	var console=window.console||{
		log:function(){}
	};
	var selfPath=(function(){
		var src,script=document.currentScript;
		if (script){
			src=script.src;
		}else{
			var scripts=document.getElementsByTagName('script');
			for (var i=0;i<scripts.length;i++){
				if (scripts[i].readyState=='interactive'){
					src=scripts[i].src;
					break;
				}
			}
		}
		src=src?src:'/';
		return relativePath(location.href,src);
	})();
	function relativePath(baseUrl,relUrl){
		var ret=relUrl;
		var arr=baseUrl.replace(/[\?#].*$/,'').replace(/[^/]+$/,'').match(/^(\w+:)\/\/([^\/]*)(\/.*$)/);
		if (arr){
			if (/^\w+:\/\//.test(relUrl)){
				ret=relUrl;
			}else if (/^\/\//.test(relUrl)){
				ret=arr[1]+relUrl;
			}else if (/^\//.test(relUrl)){
				ret=arr[1]+'\/\/'+arr[2]+relUrl;
			}else{
				var t=arr[1]+'\/\/'+arr[2]+arr[3]+relUrl,d='',q='';
				t=t.replace(/^\w+:\/\/[^\/]*/,function(a){
					d=a;
					return '';
				}).replace(/[\?#].*$/,function(a){
					q=a;
					return '';
				});
				t=t.replace(/\/..(?=[\/$])/g,'');
				var re;
				re=/\/[^\/]*\/\.(?=[\/$])/;
				while (re.test(t)){
					t=t.replace(re,'');
				}
				re=/^\/\.(?=[\/$])/;
				while (re.test(t)){
					t=t.replace(re,'');
				}
				ret=d+t+q;
			}
		}
		return ret;
	}
	// get interactive script release no
	function getReleaseNo(){
		// todo
	}
	// define LL
	// Lizard Loader
	window.LL={
		_status:{},
		_configs:[],
		_releaseNo:getReleaseNo(),
		_ref:document.getElementsByTagName('head')[0],
		_preload:function(scripts){
			var _this=this;
			for (var key in scripts){
				if (scripts.hasOwnProperty(key)){
					(function(src){
						if (!_this._status[src]){
							_this._status[src]='loaded';
							/* img */
//							_this._status[src]='loading';
//							var img=new Image();
//							img.onload=img.onerror=function(){
//								_this._status[src]='loaded';
//								_this._check();
//							};
//							img.src=src;
							/* script */
//							var script=document.createElement('script');
//							script.type='text/lizard-preload';
//							script.onload=function(){
//								_this._status[src]='loaded';
//								_this._check();
//							};
//							script.onerror=function(){
//								_this._status[src]='error';
//								console.log('loading script failed: '+src);
//								_this._check();
//							};
//							script.async=true;
//							script.src=src;
//							_this._ref.parentNode.insertBefore(script,_this._ref);
						}
					})(scripts[key]);
				}
			}
			this._check();
		},
		_check:function(){
			for (var i=0;i<this._configs.length;i++){
				var t=this._configs[i];
				var flag=1;
				while (flag){
					flag=0;
					for (var key in t.scripts){
						if (t.scripts.hasOwnProperty(key)){
							var src=t.scripts[key];
							switch (this._status[src]){
								case 'error':
									delete t.scripts[key];
									flag=1;
									break;
								case 'loaded':
								case 'executed':
									var noDeps=1;
									var deps=t.deps[key];
									if (deps){
										for (var j=0;j<deps.length;j++){
											if (t.scripts.hasOwnProperty(deps[j])){
												noDeps=0;
												break;
											}
										}
									}
									if (noDeps){
										delete t.scripts[key];
										if (this._isEmpty(t.scripts)){
											this._run(src,t.onload);
										}else{
											this._run(src);
											flag=1;
										}
									}
									break;
							}
						}
					}
				}
			}
		},
		_isEmpty:function(obj){
			for (var key in obj){
				if (obj.hasOwnProperty(key)){
					return false;
				}
			}
			return true;
		},
		_run:function(src,onload){
			var _this=this;
			if (this._status[src]=='executed'){
				return;
			}
			this._status[src]=='executed';
			var script=document.createElement('script');
			script.type='text/javascript';
			script.onload=script.onerror=function(){
				if (onload){
					onload();
				}
				_this._check();
			};
			script.async=false;
			script.src=src;
			_this._ref.parentNode.insertBefore(script,_this._ref);
		},
		_fixPath:function(urls){
			var ret=[];
			for (var i=0;i<urls.length;i++){
				ret.push(relativePath(selfPath,urls[i]));
			}
			return ret;
		},
		JS:function(opts,onload){
			var absScripts={};
			var t=opts.scripts||{};
			for (var key in t){
				if (t.hasOwnProperty(key)){
					absScripts[key]=relativePath(opts.baseOnScript?selfPath:location.href,t[key]);
				}
			}
			this._configs.push({
				scripts:absScripts,
				deps:opts.deps||{},
				onload:onload
			});
			this._preload(absScripts);
		}
	};
})();

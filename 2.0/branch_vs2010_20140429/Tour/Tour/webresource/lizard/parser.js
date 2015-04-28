var LizardGetModels,LizardRender,Lizard;
;(function (){
	/*
	添加undersore的依赖
	*/
	// Underscore.js 1.4.4
	// ===================
	var underscore={};(function(root){var previousUnderscore=root._;var breaker={};var ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype;var push=ArrayProto.push,slice=ArrayProto.slice,concat=ArrayProto.concat,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty;var nativeForEach=ArrayProto.forEach,nativeMap=ArrayProto.map,nativeReduce=ArrayProto.reduce,nativeReduceRight=ArrayProto.reduceRight,nativeFilter=ArrayProto.filter,nativeEvery=ArrayProto.every,nativeSome=ArrayProto.some,nativeIndexOf=ArrayProto.indexOf,nativeLastIndexOf=ArrayProto.lastIndexOf,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind;var _=function(obj){if(obj instanceof _)return obj;if(!(this instanceof _))return new _(obj);this._wrapped=obj};root._=_;_.VERSION='1.4.4';var each=_.each=_.forEach=function(obj,iterator,context){if(obj==null)return;if(nativeForEach&&obj.forEach===nativeForEach){obj.forEach(iterator,context)}else if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++){if(iterator.call(context,obj[i],i,obj)===breaker)return}}else{for(var key in obj){if(_.has(obj,key)){if(iterator.call(context,obj[key],key,obj)===breaker)return}}}};_.map=_.collect=function(obj,iterator,context){var results=[];if(obj==null)return results;if(nativeMap&&obj.map===nativeMap)return obj.map(iterator,context);each(obj,function(value,index,list){results[results.length]=iterator.call(context,value,index,list)});return results};var reduceError='Reduce of empty array with no initial value';_.reduce=_.foldl=_.inject=function(obj,iterator,memo,context){var initial=arguments.length>2;if(obj==null)obj=[];if(nativeReduce&&obj.reduce===nativeReduce){if(context)iterator=_.bind(iterator,context);return initial?obj.reduce(iterator,memo):obj.reduce(iterator)};each(obj,function(value,index,list){if(!initial){memo=value;initial=true}else{memo=iterator.call(context,memo,value,index,list)}});if(!initial)throw new TypeError(reduceError);return memo};_.reduceRight=_.foldr=function(obj,iterator,memo,context){var initial=arguments.length>2;if(obj==null)obj=[];if(nativeReduceRight&&obj.reduceRight===nativeReduceRight){if(context)iterator=_.bind(iterator,context);return initial?obj.reduceRight(iterator,memo):obj.reduceRight(iterator)};var length=obj.length;if(length!==+length){var keys=_.keys(obj);length=keys.length};each(obj,function(value,index,list){index=keys?keys[--length]:--length;if(!initial){memo=obj[index];initial=true}else{memo=iterator.call(context,memo,obj[index],index,list)}});if(!initial)throw new TypeError(reduceError);return memo};_.find=_.detect=function(obj,iterator,context){var result;any(obj,function(value,index,list){if(iterator.call(context,value,index,list)){result=value;return true}});return result};_.filter=_.select=function(obj,iterator,context){var results=[];if(obj==null)return results;if(nativeFilter&&obj.filter===nativeFilter)return obj.filter(iterator,context);each(obj,function(value,index,list){if(iterator.call(context,value,index,list))results[results.length]=value});return results};_.reject=function(obj,iterator,context){return _.filter(obj,function(value,index,list){return!iterator.call(context,value,index,list)},context)};_.every=_.all=function(obj,iterator,context){iterator||(iterator=_.identity);var result=true;if(obj==null)return result;if(nativeEvery&&obj.every===nativeEvery)return obj.every(iterator,context);each(obj,function(value,index,list){if(!(result=result&&iterator.call(context,value,index,list)))return breaker});return!!result};var any=_.some=_.any=function(obj,iterator,context){iterator||(iterator=_.identity);var result=false;if(obj==null)return result;if(nativeSome&&obj.some===nativeSome)return obj.some(iterator,context);each(obj,function(value,index,list){if(result||(result=iterator.call(context,value,index,list)))return breaker});return!!result};_.contains=_.include=function(obj,target){if(obj==null)return false;if(nativeIndexOf&&obj.indexOf===nativeIndexOf)return obj.indexOf(target)!=-1;return any(obj,function(value){return value===target})};_.invoke=function(obj,method){var args=slice.call(arguments,2);var isFunc=_.isFunction(method);return _.map(obj,function(value){return(isFunc?method:value[method]).apply(value,args)})};_.pluck=function(obj,key){return _.map(obj,function(value){return value[key]})};_.where=function(obj,attrs,first){if(_.isEmpty(attrs))return first?null:[];return _[first?'find':'filter'](obj,function(value){for(var key in attrs){if(attrs[key]!==value[key])return false};return true})};_.findWhere=function(obj,attrs){return _.where(obj,attrs,true)};_.max=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535){return Math.max.apply(Math,obj)};if(!iterator&&_.isEmpty(obj))return-Infinity;var result={computed:-Infinity,value:-Infinity};each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed>=result.computed&&(result={value:value,computed:computed})});return result.value};_.min=function(obj,iterator,context){if(!iterator&&_.isArray(obj)&&obj[0]===+obj[0]&&obj.length<65535){return Math.min.apply(Math,obj)};if(!iterator&&_.isEmpty(obj))return Infinity;var result={computed:Infinity,value:Infinity};each(obj,function(value,index,list){var computed=iterator?iterator.call(context,value,index,list):value;computed<result.computed&&(result={value:value,computed:computed})});return result.value};_.shuffle=function(obj){var rand;var index=0;var shuffled=[];each(obj,function(value){rand=_.random(index++);shuffled[index-1]=shuffled[rand];shuffled[rand]=value});return shuffled};var lookupIterator=function(value){return _.isFunction(value)?value:function(obj){return obj[value]}};_.sortBy=function(obj,value,context){var iterator=lookupIterator(value);return _.pluck(_.map(obj,function(value,index,list){return{value:value,index:index,criteria:iterator.call(context,value,index,list)}}).sort(function(left,right){var a=left.criteria;var b=right.criteria;if(a!==b){if(a>b||a===void 0)return 1;if(a<b||b===void 0)return-1};return left.index<right.index?-1:1}),'value')};var group=function(obj,value,context,behavior){var result={};var iterator=lookupIterator(value||_.identity);each(obj,function(value,index){var key=iterator.call(context,value,index,obj);behavior(result,key,value)});return result};_.groupBy=function(obj,value,context){return group(obj,value,context,function(result,key,value){(_.has(result,key)?result[key]:(result[key]=[])).push(value)})};_.countBy=function(obj,value,context){return group(obj,value,context,function(result,key){if(!_.has(result,key))result[key]=0;result[key]++})};_.sortedIndex=function(array,obj,iterator,context){iterator=iterator==null?_.identity:lookupIterator(iterator);var value=iterator.call(context,obj);var low=0,high=array.length;while(low<high){var mid=(low+high)>>>1;iterator.call(context,array[mid])<value?low=mid+1:high=mid};return low};_.toArray=function(obj){if(!obj)return[];if(_.isArray(obj))return slice.call(obj);if(obj.length===+obj.length)return _.map(obj,_.identity);return _.values(obj)};_.size=function(obj){if(obj==null)return 0;return(obj.length===+obj.length)?obj.length:_.keys(obj).length};_.first=_.head=_.take=function(array,n,guard){if(array==null)return void 0;return(n!=null)&&!guard?slice.call(array,0,n):array[0]};_.initial=function(array,n,guard){return slice.call(array,0,array.length-((n==null)||guard?1:n))};_.last=function(array,n,guard){if(array==null)return void 0;if((n!=null)&&!guard){return slice.call(array,Math.max(array.length-n,0))}else{return array[array.length-1]}};_.rest=_.tail=_.drop=function(array,n,guard){return slice.call(array,(n==null)||guard?1:n)};_.compact=function(array){return _.filter(array,_.identity)};var flatten=function(input,shallow,output){each(input,function(value){if(_.isArray(value)){shallow?push.apply(output,value):flatten(value,shallow,output)}else{output.push(value)}});return output};_.flatten=function(array,shallow){return flatten(array,shallow,[])};_.without=function(array){return _.difference(array,slice.call(arguments,1))};_.uniq=_.unique=function(array,isSorted,iterator,context){if(_.isFunction(isSorted)){context=iterator;iterator=isSorted;isSorted=false};var initial=iterator?_.map(array,iterator,context):array;var results=[];var seen=[];each(initial,function(value,index){if(isSorted?(!index||seen[seen.length-1]!==value):!_.contains(seen,value)){seen.push(value);results.push(array[index])}});return results};_.union=function(){return _.uniq(concat.apply(ArrayProto,arguments))};_.intersection=function(array){var rest=slice.call(arguments,1);return _.filter(_.uniq(array),function(item){return _.every(rest,function(other){return _.indexOf(other,item)>=0})})};_.difference=function(array){var rest=concat.apply(ArrayProto,slice.call(arguments,1));return _.filter(array,function(value){return!_.contains(rest,value)})};_.zip=function(){var args=slice.call(arguments);var length=_.max(_.pluck(args,'length'));var results=new Array(length);for(var i=0;i<length;i++){results[i]=_.pluck(args,""+i)};return results};_.object=function(list,values){if(list==null)return {};var result={};for(var i=0,l=list.length;i<l;i++){if(values){result[list[i]]=values[i]}else{result[list[i][0]]=list[i][1]}};return result};_.indexOf=function(array,item,isSorted){if(array==null)return-1;var i=0,l=array.length;if(isSorted){if(typeof isSorted=='number'){i=(isSorted<0?Math.max(0,l+isSorted):isSorted)}else{i=_.sortedIndex(array,item);return array[i]===item?i:-1}};if(nativeIndexOf&&array.indexOf===nativeIndexOf)return array.indexOf(item,isSorted);for(;i<l;i++)if(array[i]===item)return i;return-1};_.lastIndexOf=function(array,item,from){if(array==null)return-1;var hasIndex=from!=null;if(nativeLastIndexOf&&array.lastIndexOf===nativeLastIndexOf){return hasIndex?array.lastIndexOf(item,from):array.lastIndexOf(item)};var i=(hasIndex?from:array.length);while(i--)if(array[i]===item)return i;return-1};_.range=function(start,stop,step){if(arguments.length<=1){stop=start||0;start=0};step=arguments[2]||1;var len=Math.max(Math.ceil((stop-start)/step),0);var idx=0;var range=new Array(len);while(idx<len){range[idx++]=start;start+=step};return range};_.bind=function(func,context){if(func.bind===nativeBind&&nativeBind)return nativeBind.apply(func,slice.call(arguments,1));var args=slice.call(arguments,2);return function(){return func.apply(context,args.concat(slice.call(arguments)))}};_.partial=function(func){var args=slice.call(arguments,1);return function(){return func.apply(this,args.concat(slice.call(arguments)))}};_.bindAll=function(obj){var funcs=slice.call(arguments,1);if(funcs.length===0)funcs=_.functions(obj);each(funcs,function(f){obj[f]=_.bind(obj[f],obj)});return obj};_.memoize=function(func,hasher){var memo={};hasher||(hasher=_.identity);return function(){var key=hasher.apply(this,arguments);return _.has(memo,key)?memo[key]:(memo[key]=func.apply(this,arguments))}};_.delay=function(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){return func.apply(null,args)},wait)};_.defer=function(func){return _.delay.apply(_,[func,1].concat(slice.call(arguments,1)))};_.throttle=function(func,wait){var context,args,timeout,result;var previous=0;var later=function(){previous=new Date;timeout=null;result=func.apply(context,args)};return function(){var now=new Date;var remaining=wait-(now-previous);context=this;args=arguments;if(remaining<=0){clearTimeout(timeout);timeout=null;previous=now;result=func.apply(context,args)}else if(!timeout){timeout=setTimeout(later,remaining)};return result}};_.debounce=function(func,wait,immediate){var timeout,result;return function(){var context=this,args=arguments;var later=function(){timeout=null;if(!immediate)result=func.apply(context,args)};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)result=func.apply(context,args);return result}};_.once=function(func){var ran=false,memo;return function(){if(ran)return memo;ran=true;memo=func.apply(this,arguments);func=null;return memo}};_.wrap=function(func,wrapper){return function(){var args=[func];push.apply(args,arguments);return wrapper.apply(this,args)}};_.compose=function(){var funcs=arguments;return function(){var args=arguments;for(var i=funcs.length-1;i>=0;i--){args=[funcs[i].apply(this,args)]};return args[0]}};_.after=function(times,func){if(times<=0)return func();return function(){if(--times<1){return func.apply(this,arguments)}}};_.keys=nativeKeys||function(obj){if(obj!==Object(obj))throw new TypeError('Invalid object');var keys=[];for(var key in obj)if(_.has(obj,key))keys[keys.length]=key;return keys};_.values=function(obj){var values=[];for(var key in obj)if(_.has(obj,key))values.push(obj[key]);return values};_.pairs=function(obj){var pairs=[];for(var key in obj)if(_.has(obj,key))pairs.push([key,obj[key]]);return pairs};_.invert=function(obj){var result={};for(var key in obj)if(_.has(obj,key))result[obj[key]]=key;return result};_.functions=_.methods=function(obj){var names=[];for(var key in obj){if(_.isFunction(obj[key]))names.push(key)};return names.sort()};_.extend=function(obj){each(slice.call(arguments,1),function(source){if(source){for(var prop in source){obj[prop]=source[prop]}}});return obj};_.pick=function(obj){var copy={};var keys=concat.apply(ArrayProto,slice.call(arguments,1));each(keys,function(key){if(key in obj)copy[key]=obj[key]});return copy};_.omit=function(obj){var copy={};var keys=concat.apply(ArrayProto,slice.call(arguments,1));for(var key in obj){if(!_.contains(keys,key))copy[key]=obj[key]};return copy};_.defaults=function(obj){each(slice.call(arguments,1),function(source){if(source){for(var prop in source){if(obj[prop]==null)obj[prop]=source[prop]}}});return obj};_.clone=function(obj){if(!_.isObject(obj))return obj;return _.isArray(obj)?obj.slice():_.extend({},obj)};_.tap=function(obj,interceptor){interceptor(obj);return obj};var eq=function(a,b,aStack,bStack){if(a===b)return a!==0||1/ a == 1 /b;if(a==null||b==null)return a===b;if(a instanceof _)a=a._wrapped;if(b instanceof _)b=b._wrapped;var className=toString.call(a);if(className!=toString.call(b))return false;switch(className){case'[object String]':return a==String(b);case'[object Number]':return a!=+a?b!=+b:(a==0?1/ a == 1 /b:a==+b);case'[object Date]':case'[object Boolean]':return+a==+b;case'[object RegExp]':return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase};if(typeof a!='object'||typeof b!='object')return false;var length=aStack.length;while(length--){if(aStack[length]==a)return bStack[length]==b};aStack.push(a);bStack.push(b);var size=0,result=true;if(className=='[object Array]'){size=a.length;result=size==b.length;if(result){while(size--){if(!(result=eq(a[size],b[size],aStack,bStack)))break}}}else{var aCtor=a.constructor,bCtor=b.constructor;if(aCtor!==bCtor&&!(_.isFunction(aCtor)&&(aCtor instanceof aCtor)&&_.isFunction(bCtor)&&(bCtor instanceof bCtor))){return false};for(var key in a){if(_.has(a,key)){size++;if(!(result=_.has(b,key)&&eq(a[key],b[key],aStack,bStack)))break}};if(result){for(key in b){if(_.has(b,key)&&!(size--))break};result=!size}};aStack.pop();bStack.pop();return result};_.isEqual=function(a,b){return eq(a,b,[],[])};_.isEmpty=function(obj){if(obj==null)return true;if(_.isArray(obj)||_.isString(obj))return obj.length===0;for(var key in obj)if(_.has(obj,key))return false;return true};_.isElement=function(obj){return!!(obj&&obj.nodeType===1)};_.isArray=nativeIsArray||function(obj){return toString.call(obj)=='[object Array]'};_.isObject=function(obj){return obj===Object(obj)};each(['Arguments','Function','String','Number','Date','RegExp'],function(name){_['is'+name]=function(obj){return toString.call(obj)=='[object '+name+']'}});if(!_.isArguments(arguments)){_.isArguments=function(obj){return!!(obj&&_.has(obj,'callee'))}};if(typeof(/./)!=='function'){_.isFunction=function(obj){return typeof obj==='function'}};_.isFinite=function(obj){return isFinite(obj)&&!isNaN(parseFloat(obj))};_.isNaN=function(obj){return _.isNumber(obj)&&obj!=+obj};_.isBoolean=function(obj){return obj===true||obj===false||toString.call(obj)=='[object Boolean]'};_.isNull=function(obj){return obj===null};_.isUndefined=function(obj){return obj===void 0};_.has=function(obj,key){return hasOwnProperty.call(obj,key)};_.noConflict=function(){root._=previousUnderscore;return this};_.identity=function(value){return value};_.times=function(n,iterator,context){var accum=Array(n);for(var i=0;i<n;i++)accum[i]=iterator.call(context,i);return accum};_.random=function(min,max){if(max==null){max=min;min=0};return min+Math.floor(Math.random()*(max-min+1))};var entityMap={escape:{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','/':'&#x2F;'}};entityMap.unescape=_.invert(entityMap.escape);var entityRegexes={escape:new RegExp('['+_.keys(entityMap.escape).join('')+']','g'),unescape:new RegExp('('+_.keys(entityMap.unescape).join('|')+')','g')};_.each(['escape','unescape'],function(method){_[method]=function(string){if(string==null)return'';return(''+string).replace(entityRegexes[method],function(match){return entityMap[method][match]})}});_.result=function(object,property){if(object==null)return null;var value=object[property];return _.isFunction(value)?value.call(object):value};_.mixin=function(obj){each(_.functions(obj),function(name){var func=_[name]=obj[name];_.prototype[name]=function(){var args=[this._wrapped];push.apply(args,arguments);return result.call(this,func.apply(_,args))}})};var idCounter=0;_.uniqueId=function(prefix){var id=++idCounter+'';return prefix?prefix+id:id};_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var noMatch=/(.)^/;var escapes={"'":"'",'\\':'\\','\r':'r','\n':'n','\t':'t','\u2028':'u2028','\u2029':'u2029'};var escaper=/\\|'|\r|\n|\t|\u2028|\u2029/g;_.template=function(text,data,settings){var render;settings=_.defaults({},settings,_.templateSettings);var matcher=new RegExp([(settings.escape||noMatch).source,(settings.interpolate||noMatch).source,(settings.evaluate||noMatch).source].join('|')+'|$','g');var index=0;var source="__p+='";text.replace(matcher,function(match,escape,interpolate,evaluate,offset){source+=text.slice(index,offset).replace(escaper,function(match){return'\\'+escapes[match]});if(escape){source+="'+\n((__t=("+escape+"))==null?'':_.escape(__t))+\n'"};if(interpolate){source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'"};if(evaluate){source+="';\n"+evaluate+"\n__p+='"};index=offset+match.length;return match});source+="';\n";if(!settings.variable)source='with(obj||{}){\n'+source+'}\n';source="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+source+"return __p;\n";try{render=new Function(settings.variable||'obj','_',source)}catch(e){e.source=source;throw e};if(data)return render(data,_);var template=function(data){return render.call(this,data,_)};template.source='function('+(settings.variable||'obj')+'){\n'+source+'}';return template};_.chain=function(obj){return _(obj).chain()};var result=function(obj){return this._chain?_(obj).chain():obj};_.mixin(_);each(['pop','push','reverse','shift','sort','splice','unshift'],function(name){var method=ArrayProto[name];_.prototype[name]=function(){var obj=this._wrapped;method.apply(obj,arguments);if((name=='shift'||name=='splice')&&obj.length===0)delete obj[0];return result.call(this,obj)}});each(['concat','join','slice'],function(name){var method=ArrayProto[name];_.prototype[name]=function(){return result.call(this,method.apply(this._wrapped,arguments))}});_.extend(_.prototype,{chain:function(){this._chain=true;return this},value:function(){return this._wrapped}})})(underscore);
	
	/*
		添加htmlparse的依赖
	*/
	;function htmlNode(t,e,r,s,h){this.parser=t,r&&(this.tagName=r,this.attrs={},this.childrens=[]),s&&(this.plainText=s),h&&(this.plainComment=h),(r||h)&&(this.htmlStart=-1,this.htmlEnd=-1,this.ohtmlStart=-1,this.ohtmlEnd=-1),this.parent=e,e&&e.childrens.push(this)}function htmlParse(t){this.html=t,this.parse()
	}htmlNode.prototype.find=function(t,e){t=(t||"*").toLowerCase(),"object"!=this.type(e)&&(e={});var r=null;if(this.tagName)for(var s=0;s<this.childrens.length;s++)if(this.childrens[s].tagName){if(("*"==t||this.childrens[s].tagName==t)&&this.compareAttr(this.childrens[s].attrs,e)){r=this.childrens[s];break
	}if(r=this.childrens[s].find(t,e))break}return r},htmlNode.prototype.findAll=function(t,e){t=(t||"*").toLowerCase(),"object"!=this.type(e)&&(e={});var r=[];if(this.tagName)for(var s=0;s<this.childrens.length;s++)this.childrens[s].tagName&&(("*"==t||this.childrens[s].tagName==t)&&this.compareAttr(this.childrens[s].attrs,e)&&r.push(this.childrens[s]),r=r.concat(this.childrens[s].findAll(t,e)));
	return r},htmlNode.prototype.comment=function(){var t=[];if(this.tagName)for(var e=0;e<this.childrens.length;e++)this.childrens[e].plainComment&&t.push(this.childrens[e]),this.childrens[e].tagName&&(t=t.concat(this.childrens[e].comment()));return t},htmlNode.prototype.compareAttr=function(t,e){for(var r in e)if(e.hasOwnProperty(r)&&t.hasOwnProperty(r))switch(this.type(e[r])){case"string":if(e[r]!=t[r])return!1;
	break;case"regexp":if(e[r].test(atts[r]))return!1}return!0},htmlNode.prototype.type=function(t){var e=Object.prototype.toString.call(t).match(/^\[object (.+)\]$/);return e?e[1].toLowerCase():""},htmlNode.prototype.html=function(){var t="";return-1!=this.htmlStart&&(t=this.parser.html.substring(this.htmlStart,this.htmlEnd+1)),t
	},htmlNode.prototype.ohtml=function(){var t="";return-1!=this.ohtmlStart&&(t=this.parser.html.substring(this.ohtmlStart,this.ohtmlEnd+1)),t},htmlNode.prototype.text=function(){var t=[];if(this.plainText)t.push(this.plainText);else if(this.tagName)for(var e=0;e<this.childrens.length;e++)t.push(this.childrens[e].text());
	return t.join(" ")},htmlParse.prototype.attr=function(t){var e=null;return this.attrs&&this.attrs.hasOwnProperty(t)&&(e=this.attrs[t]),e},htmlParse.prototype.fixPosition=function(){},htmlParse.prototype.autoCloseTag=function(){for(var t="!DOCTYPE,input,br,hr,area,base,img,meta,link".split(","),e={},r=0;r<t.length;r++)e[t[r]]=1;
	return e}(),htmlParse.prototype.ignoreTag=function(){for(var t="script,textarea,pre".split(","),e={},r=0;r<t.length;r++)e[t[r]]=1;return e}(),htmlParse.prototype.parse=function(){for(var t,e,r,s,h,i="<!--",a="-->",n=i.substr(0,1),l=a.substr(0,1),o=this.html.split(""),m=this.root=new htmlNode(this,null,"root",null,null),p="text",c=!1,d="",u="",f="",g=0;g<o.length;g++){var y=o[g],N=(o[g-1],o[g+1]),v=g==o.length-1;
	switch(p){case"text":c||y!=n||o.slice(g,g+i.length).join("")!=i?v||!c&&"<"==y&&N&&!/^\s$/.test(N)||c&&"<"==y&&o.slice(g,g+e.length+2).join("")=="</"+e&&/^[>\/\s]$/.test(o[g+e.length+2])?(this.trim(d)&&new htmlNode(this,m,null,d,null),e="",r=g,p="tagName",c=!1,"/"==N?(t=!0,g++):t=!1):d+=y:(r=g,u=i,p="comment",g+=i.length-1);
	break;case"comment":if(v||y==l&&o.slice(g,g+a.length).join("")==a){p="text";var b=new htmlNode(this,m,null,null,u+a);b.ohtmlStart=r,b.htmlStart=r+i.length,b.htmlEnd=g-1,g+=a.length-1,b.ohtmlEnd=g}else u+=y;break;case"tagName":/^[>\/\s]$/.test(y)?(t||(m=new htmlNode(this,m,e,null,null),c=this.ignoreTag.hasOwnProperty(e),m.ohtmlStart=r),s="",h="",p="attrKey",">"==y&&g--):e+=y.toLowerCase();
	break;case"attrKey":if(">"==y){if(t)for(var y=m,w=[];y;){if(y.tagName==e){for(var P=0;P<w.length;P++)w[P].htmlEnd=w[P].ohtmlEnd=r-1;y.htmlEnd=r-1,y.ohtmlEnd=g,m=y.parent;break}w.push(y),y=y.parent}else this.autoCloseTag.hasOwnProperty(e)?(m.ohtmlEnd=g,m=m.parent):m.htmlStart=g+1;d="",p="text"}else s&&"="==y?(h="",p="attrValue"):/^[\/\s]$/.test(y)?t||this.addAttr(m,s,h):s+=y;
	break;case"attrValue":f?y==f?(f=!1,t||this.addAttr(m,s,h),p="attrKey"):h+=y:!h&&/^[\'\"]$/.test(y)?f=y:h&&/^\s$/.test(y)||">"==y?(t||this.addAttr(m,s,h),s="",h="",p="attrKey",">"==y&&g--):(h||/^\s$/.test(y))&&(h+=y)}}switch(p){case"text":case"comment":case"tagName":break;case"attrKey":case"attrValue":m.parent.pop()
	}for(;m!=this.root;)y.htmlEnd=y.ohtmlEnd=o.length-1,m=m.parent},htmlParse.prototype.addAttr=function(t,e,r){e&&!t.attrs.hasOwnProperty(t)&&(t.attrs[e]=r)},htmlParse.prototype.trim=function(t){return t.replace(/^\s+|\s+$/g,"")};

	var isServer = false;
	try{
		if(!window){
			isServer = true;
		}else{
			isServer = false;

		}
	}catch(e){
		isServer =true;
	}
	var lizard = {};

	/*
		获取传过来的参数
	*/
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
	function getPageParams(url, urlschema) {
        var ret = {};
        var paraArr = [], paraHash = {};
        var reStr = urlschema.replace(/\{(.+?)\}|[^\{\}]+/g, function (a, b) {
            if (b) {
                paraArr.push(b);
                paraHash[b] = 1;
                return "([^\\\/]*)";
            } else {
                return reString(a);
            }
        });
        // parseQuery
        var queryStr = (url.match(/\?([^#]+)$/) || ["", ""])[1];
        queryStr.replace(/([^=&]+)=([^&]*)/g, function (a, b, c) {
            b = decodeURIComponent(b);
            c = decodeURIComponent(c);
            if (paraHash.hasOwnProperty(b)) {
                ret[b] = c;
            }
        });
        // parseUrl
        var re = new RegExp(reStr, 'i');
        var matches = url.match(re);
        if (matches) {
            for (var i = 0; i < paraArr.length; i++) {
                ret[decodeURIComponent(paraArr[i])] = decodeURIComponent(matches[i + 1]||"") || null;
            }
        }
        return ret;
    }
	/*
	获取页面配置项
	*/
	function getPageConfig(parser){
		var configStr=parser.root.find('script',{
			type:'text/lizard-config'
		}).text();
		var ret=new Function("Lizard","return (" + configStr + ")")(Lizard);
		return ret;
	}
	
	/*
	获取页面templates
	*/
	function getPageTemplates(parser){
		var ret={};
		var templates=parser.root.findAll('script',{
			type:'text/lizard-template'
		});
		for (var i=0;i<templates.length;i++){
			var id=templates[i].attrs.id;
			if (id){
				ret[id]={
					'runat':templates[i].attrs.runat||'all',
					'text':templates[i].text()
				};
			}
		}
		return ret;
	}
	/*
	获取页面urlschema
	*/
	function getPageUrlschema(parser){
		var ret='';
		var configStr=parser.root.find('script',{
			type:'text/lizard-config'
		}).text();
		var arr=configStr.match(/([\'\"])?url_schema\1\s*:\s*([\'\"])(.*?)\2/);
		if (arr){
			ret=arr[3];
		}
		return ret;
	}

	function _Lizard(url,html){
		this.url = url;
		this.html = html;
		this.configs = [];
		this.models = {};
		this.filters = {};
		this.urlschema = "";
		this.templates = {};
		this.params = {};
		/*
		将各自的内容填到congfig中
		*/
		this.snapshoot1 = [];
		this._init()
	}
	_Lizard.prototype = {
		_init:function(){
			var url = this.url;
			var html = this.html;
			
			var parser=new htmlParse(html);

			Lizard.T.lizTmpl = this.templates = getPageTemplates(parser);
            Lizard.P.lizParam = this.params = getPageParams(this.url, getPageUrlschema(parser));
            this.config = getPageConfig(parser);
		},
		getModels:function(){
			return this.config.model.apis || [];
		},
		render:function(datas){
			var fn = this.config.model.filter;
            if (fn) {
                datas = fn(datas);
            }

            var tmpl, compiled;
            var ret = {
                header: '',
                viewport: ''
            };
            // head
            tmpl = this.config.view.header;


            if (tmpl) {
                compiled = underscore._.template(tmpl);
				datas['Lizard'] = Lizard;
				ret.header = compiled(datas,Lizard).trim();
            }
		
            // viewport

            tmpl = this.config.view.viewport;
			var id = this.url;
			
			function getGuid(){
				
				return +new Date();
			}
			function getID(url){
				var id= getGuid()+"|"+escape(url).replace(/%/g,'$');
				return id;
			}
			id = getID(id);

            if (tmpl) {
                compiled = underscore._.template(tmpl);
                ret.viewport = (
							'<div id="' + id + '" class="'+(isServer?'lizard-animation-current':'')+' sub-viewport">'
								+'<script>window.server='+(isServer?true:false)+'</script>'
								+ compiled(datas) 
								+ '<script type="text/controller" data-src="' + this.config.controller + '"></script>'
							+'</div>').trim();

				ret.id = id;
			}

            if (isServer) {
                var temp_html =
					this.html
						.replace(/(<div class="main-viewport">)/gi, function () {
						    return arguments[1] + ret.viewport;
						})
						.replace(/(<header>)/gi, function () {
						    return arguments[1] + ret.header;
						});
                return temp_html;
            } else {
                return ret;
            }
		},
		_unint:function(){
			
		}
	}
	Lizard = {};
	Lizard.getModels = function(url,html){
		var ins = new _Lizard(url,html);
		var models = ins.getModels();
		ins._unint();
		ins = null;
		return JSON.stringify(models);
	}
	Lizard.render = function(url,html,datas){
		var ins = new _Lizard(url,html);
		var text = ins.render(datas);
		
		ins._unint();
		ins = null;
		return text;
	}
	
	Lizard.P = function (key) {
        return Lizard.P.lizParam[key];
    };
    Lizard.T = function (id) {
        var ret = "";
        var t = Lizard.T.lizTmpl[id];
        if (t) {
            if (isServer) {
                if (t.runat != "client") {
                    ret = t.text;
                }
            } else {
                if (t.runat != "server") {
                    ret = t.text;
                }
            }
        }
        return ret;
    };
	//导出对象
	LizardGetModels = Lizard.getModels;
	LizardRender = Lizard.render;
})();

;if (typeof exports !== 'undefined') {
	exports.Lizard = Lizard;
	exports.LizardGetModels = LizardGetModels;
	exports.LizardRender = LizardRender;
};


	



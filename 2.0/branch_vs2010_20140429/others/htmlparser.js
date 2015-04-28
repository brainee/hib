function htmlNode(parser,node){
	this.parser=parser;
	this._parent=parent;
	this._node=node;
}
htmlNode.prototype.children=function(){
	var ret=[];
	if (this._node.nodeType==1&&this.parser._ignoreTag.hasOwnProperty(this._node.tagName)){
		ret.push(document.createTextNode(this._node.innerHTML));
	}else{
		for (var i=0;i<this._node.childNodes.length;i++){
			ret.push(new htmlNode(this.parser,this._node.childNodes[i]));
		}
	}
	return ret.length?ret:null;
};
htmlNode.prototype.parent=function(){
	var ret=null;
	var el=this._node.parent;
	if (el){
		ret=new htmlNode(this.parser,el);
	}
	return ret;
};
htmlNode.prototype.tagName=function(){
	return this._node.tagName||null;
};
htmlNode.prototype.find=function(tagName,attrs){
	tagName=(tagName||'*').toLowerCase();
	if (this._type(attrs)!='object'){
		attrs={};
	}
	var ret=null;
	var els=this._node.getElementsByTagName(tagName);
	for (var i=0;i<els.length;i++){
		if (this._compareAttr(els[i],attrs)){
			ret=new htmlNode(this.parser,els[i]);
			break;
		}
	}
	return ret;
};
htmlNode.prototype.findAll=function(tagName,attrs){
	tagName=(tagName||'*').toLowerCase();
	if (this._type(attrs)!='object'){
		attrs={};
	}
	var ret=[];
	var els=this._node.getElementsByTagName(tagName);
	for (var i=0;i<els.length;i++){
		if (this._compareAttr(els[i],attrs)){
			ret.push(new htmlNode(this.parser,els[i]));
		}
	}
	return ret;
};
htmlNode.prototype._compareAttr=function(el,attrs){
	for (var key in attrs){
		if (attrs.hasOwnProperty(key)){
			if (el.hasAttribute(key)){
				var val=''+el.getAttribute(key);
				switch (this._type(attrs[key])){
					case 'string':
						if (attrs[key]!=val){
							return false;
						}
						break;
					case 'regexp':
						if (val.test(atts[key])){
							return false;
						}
						break;
				}
			}else{
				return false;
			}
		}
	}
	return true;
};
htmlNode.prototype._type=function(obj){
	var arr=Object.prototype.toString.call(obj).match(/^\[object (.+)\]$/);
	return arr?arr[1].toLowerCase():'';
};
htmlNode.prototype.html=function(){
	var ret='';
	if (this==this.parser.root){
		ret=new htmlNode(this.parser,this._node.documentElement).ohtml();
	}else{
		ret=this._node.innerHTML||'';
	}
	return ret;
};
htmlNode.prototype.ohtml=function(){
	var ret='';
	if (this==this.parser.root){
		ret=new htmlNode(this.parser,this._node.documentElement).ohtml();
	}else{
		ret=this._node.outerHTML||'';
		if (!ret){
			var f=this.parser._document.createElement('div');
			f.appendChild(this._node.cloneNode(true));
			ret=f.innerHTML||'';
		}
	}
	return ret;
};
htmlNode.prototype.text=function(){
	var ret='';
	if (this==this.parser.root){
		ret=new htmlNode(this.parser,this._node.documentElement).text();
	}else{
		if (this._node.nodeType==1){
			ret=this._node.innerText||this._node.textContent
		}else{
			ret=this._node.nodeValue;
		}
		ret=this.parser._trim(ret);
	}
	return ret;
};
htmlNode.prototype.attr=function(attrKey,attrValue){
	if (this._type(attrValue)=='undefined'){
		var ret=null;
		if (this._node.nodeType==1&&this._node.hasAttribute(attrKey)){
			ret=this._node.getAttribute(attrKey);
		}
		return ret;
	}else{
		if (this._node.nodeType==1){
			this._node.setAttribute(attrKey,attrValue);
		}
		return this;
	}
};
htmlNode.prototype.remove=function(){
	if (this==this.parser.root||this._node==this.parser._document.documentElement){
		this.parser._document.open();
		this.parser._document.write('');
		this.parser._document.close();
	}else{
		this._node.parentNode.removeChild(this._node);
	}
	return this.parser.root;
};


function htmlParse(html){
	this._html='';
	this._parse(html);
};
htmlParse.prototype._ignoreTag=(function(){
	var tagArr='script,textarea,pre'.split(',');
	var tagHash={};
	for (var i=0;i<tagArr.length;i++){
		tagHash[tagArr[i]]=1;
	}
	return tagHash;
})();
htmlParse.prototype._parse=function(html){
	if (htmlNode.prototype._type(html)=='string'){
		this._html=html||'';
	}
	this._document=document.implementation.createHTMLDocument();
	this._document.open();
	this._document.write(this._html);
	this._document.close();
	this.root=new htmlNode(this,this._document);
};
htmlParse.prototype._trim=function(str){
	return str.replace(/^\s+|\s+$/g,'');
};
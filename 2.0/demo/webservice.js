var express = require('express');
var app = express.createServer();
var _ = require('underscore');
var fs=require('fs');
var path = require('path');
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.static(__dirname ));

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;

  app.use(express.static(__dirname, { maxAge: oneYear }));
  app.use(express.errorHandler());
});


app.register('.html', {
  compile: function(str, options){
    var compiled = _.template(str);
    return function(locals) {
        return compiled(locals);
    };
  }
});
//http://m.ctrip.com/{site}/hotel/index/{city}/{startdate}/{enddate}
//http://localhost:3000/webapp/hotel/index/shanghai/20140328/20140329
var viewRoot = path.join(__dirname ,'templates');
/*
定义取数据的get请求
*/
var urlparse = require('url').parse;
var http = require('http');

String.prototype.replaceWithA = String.prototype.replaceWithA||function(d){
	return this.replace(/\$\{(.+?)\}/g, function (a, c) {
		if (c in d) {
			return d[c];
		} else {
			return a;
		}
	}); 
};
function get(url,callback) {
	console.log('get url',url)
	var urlinfo = urlparse(url);

	var options = {
		// method: 'GET',
		host:urlinfo.host.split(':')[0],
		path: urlinfo.pathname,
		agent:new http.Agent({
			maxSockets:500
		})
	};
	if(urlinfo.port) {
		options.port = urlinfo.port;
	}	
	if(urlinfo.search) {
		options.path += urlinfo.search;
	}
	var req = http.get(options,function(res){
		var output = '';
		res.setEncoding('utf-8');	
		res.on('data',function (chunk){
			output += chunk;
		})
		res.on('end',function(){
				console.log('end')
			
			var outputjson = JSON.parse(output);
//			var ret = {
//				status:1,
//				output:outputjson
//			}
			callback(output)
		})
		res.on('error',function(e){
//			var ret = {
//				status:0,
//				output:e.message
//			}
			callback({})
		})
	}).on('error', function(e) {
		// 响应头有错误
		console.log("Got error: " , e,url);
	});
	req.end();
}
var urlparse = require('url').parse;
function post(url,data,callback) {
	console.log("post start")
	var request = require('request');
	var options = {
		uri: url,
		method: 'POST',
		json: data
	};

	request(options, function (error, response, body) {  
		if (!error && response.statusCode == 200) {
			var output = response.body
			//var ret = JSON.parse(output);
			callback(output)
		}
	});
	return
	var querystring = require('querystring');
	var content = querystring.stringify(data);
	console.log('1==================')
		console.log(content)
	console.log('2==================')
	var urlinfo = urlparse(url);
	var options = {
		method: 'POST',
		host: urlinfo.host.split(':')[0],
		path: urlinfo.pathname,
		headers:{
			'Content-Type':'application/x-www-form-urlencoded',
			'Content-Length':content.length
		}
	};
	if(urlinfo.port) {
		options.port = urlinfo.port;
	}
	if(urlinfo.search) {
		options.path += urlinfo.search;
	}
	var req = http.request(options,function(res){
			var location = options.host+(options.port?":"+options.port:"")+res.headers.location;
			var output = '';
			res.setEncoding('utf-8');	
			res.on('data', function (chunk) {
				output += chunk;
				console.log('BODY: ' + chunk);
			 });
			res.on('end',function(){
				var ret = JSON.parse(output);
				callback(ret)
			})
			res.on('error',function(e){
				console.log(e)
				var ret = {};
				callback(ret)
			})
	})
	
	req.write(content)
	req.end()
};

function getLayout(viewPath,cb){
//	var layoutPath = path.join(viewRoot ,'layout.html');
//	fs.readFile(layoutPath,'utf-8',function(err,layoutData){
//		fs.readFile(viewPath,'utf-8',function(err,viewData){
//			var data = layoutData.replaceWithA({
//				body:viewData
//			})
//			cb(data);
//		})
//	})

	fs.readFile(viewPath,'utf-8',function(err,viewData){
		cb(viewData);
	})
}

//设置允许跨域
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    //res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
}); 

/*seo服务器*/ 
app.get('/html5/tour/:view', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	/*
		引入bridge.js
		
	*/
	
	var parser = require('../webapporigin/parser.js');
	var Lizard = parser.Lizard;	
	getLayout(viewPath,function(data){
		//==================服务器、客户端要完成的任务
		/*
			获取页面内容
		*/
		function getPageContent(){
			return  data;
		}
		/*
			获取页面url
		*/
		function getPageUrl(){
			var url =  'http://'+req.headers.host+ req.url;
			return url;
		}
		/*
			更加model的url获取数据
		*/
		function getData(models,cb){
		    var i, ajax = 0, ret = [];
			function end(){
				ajax++;
				if(ajax>=len){
					cb(ret)
				}
			}
			  
			if (models.init_data)
			{
				var len = 1, ret = {data: models.init_data};
				end();
				return;		
			}	 
			models = models.apis;	  
			var len = models.length;			
			if(!len){
				end()
				return;
			}
			for(var i=0;i<len;i++){
				var model = models[i];
				var postdata = model.postdata;
				var url = model.url;

//				data: JSON.stringify(postdata)
				
				post(url,postdata,function(data){
					ret.push(data);
					end()
				})
			}
			
			function end(){
				ajax++;
				if(ajax>=len){
					cb(ret)
				}
			}
		}
		/*
			渲染到页面上
		*/
		function renderToPage(html){
			res.writeHead(200, {"content-type": "text/html"});
			res.write(html);
			res.end();
		}
		/*
			与桥交互的api
		*/

		var url = getPageUrl();
		var html = getPageContent();
		var models = Lizard.getModels(url,html);
		getData(models,function (datas){			
			var tenderTemplate = Lizard.render(datas);
			renderToPage(tenderTemplate)
		})
	})

});

app.get('/html5/tour/:view/:salecity/:startcity/:key', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	/*
		引入bridge.js
		
	*/
	var parser = require('../webapporigin/parser.js');
	var Lizard = parser.Lizard;
	getLayout(viewPath,function(data){
		//==================服务器、客户端要完成的任务
		/*
			获取页面内容
		*/
		function getPageContent(){
			return  data;
		}
		/*
			获取页面url
		*/
		function getPageUrl(){
			var url =  'http://'+req.headers.host+ req.url;
			return url;
		}
		/*
			更加model的url获取数据
		*/
		function getData(models,cb){
			var len =models.length;
			var ajax = 0;
			var ret = [];
			if(!len){
				end()
				return;
			}
			for(var i=0;i<len;i++){
				var model = models[i];
				var postdata = model.postdata;
				var url = model.url;

//				data: JSON.stringify(postdata)
				
				post(url,postdata,function(data){
					ret.push(data);
					end()
				})
			}
			function end(){
				ajax++;
				if(ajax>=len){
					cb(ret)
				}
			}
		}
		/*
			渲染到页面上
		*/
		function renderToPage(html){
			res.writeHead(200, {"content-type": "text/html"});
			res.write(html);
			res.end();
		}
		/*
			与桥交互的api
		*/

		var url = getPageUrl();
		var html = getPageContent();
		var models = Lizard.getModels(url,html);
		getData(models,function (datas){
			
			var tenderTemplate = Lizard.render(datas);
			renderToPage(tenderTemplate)
		})
	})

});

app.get('/html5/tour/:view/:pid/:dcid', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	/*
		引入bridge.js
		
	*/
	var parser = require('../webapporigin/parser.js');
	var Lizard = parser.Lizard;
	getLayout(viewPath,function(data){
		//==================服务器、客户端要完成的任务
		/*
			获取页面内容
		*/
		function getPageContent(){
			return  data;
		}
		/*
			获取页面url
		*/
		function getPageUrl(){
			var url =  'http://'+req.headers.host+ req.url;
			return url;
		}
		/*
			更加model的url获取数据
		*/
		function getData(models,cb){
			var len =models.length;
			var ajax = 0;
			var ret = [];
			if(!len){
				end()
				return;
			}
			for(var i=0;i<len;i++){
				var model = models[i];
				var postdata = model.postdata;
				var url = model.url;

//				data: JSON.stringify(postdata)
				
				post(url,postdata,function(data){
					ret.push(data);
					end()
				})
			}
			function end(){
				ajax++;
				if(ajax>=len){
					cb(ret)
				}
			}
		}
		/*
			渲染到页面上
		*/
		function renderToPage(html){
			res.writeHead(200, {"content-type": "text/html"});
			res.write(html);
			res.end();
		}
		/*
			与桥交互的api
		*/

		var url = getPageUrl();
		var html = getPageContent();
		var models = Lizard.getModels(url,html);		
		getData(models,function (datas){			
			var tenderTemplate = Lizard.render(datas);
			renderToPage(tenderTemplate)
		})
	})

});

/*webapp服务器*/

app.get('/webapp/tour/:view', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	console.log("index=================",viewPath)
	getLayout(viewPath,function(data){
		res.writeHead(200, {"content-type": "text/html"});
		res.write(data);
		res.end();
	})
});
app.post('/webapp/tour/:view', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	console.log("index=================",viewPath)
	getLayout(viewPath,function(data){
		res.writeHead(200, {"content-type": "text/html"});
		res.write(data);
		res.end();
	})
});


//http://localhost:3000/webapp/tour/vacationslist/2/2/三亚
app.get('/webapp/tour/:view/:salecity/:startcity/:key', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	console.log("vacationslist=================",viewPath)
	getLayout(viewPath,function(data){
		res.writeHead(200, {"content-type": "text/html"});
		res.write(data);
		res.end();
	})
});
app.post('/webapp/tour/:view/:salecity/:startcity/:key', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	console.log("vacationslist=================",viewPath)
	getLayout(viewPath,function(data){
		res.writeHead(200, {"content-type": "text/html"});
		res.write(data);
		res.end();
	})
});
//http://localhost:3000/html5/tour/detail?pid=1740980&dcid=2
///webapp/tour/seo/1740980/2
app.get('/webapp/tour/:view/:pid/:dcid', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	console.log("detail=================",viewPath)
	getLayout(viewPath,function(data){
		res.writeHead(200, {"content-type": "text/html"});
		res.write(data);
		res.end();
	})
});

app.post('/webapp/tour/:view/:pid/:dcid', function(req, res){
	var params = req.params;
	var view = params.view;
	var viewPath = path.join(viewRoot ,view+'.html');
	console.log("detail=================",viewPath)
	getLayout(viewPath,function(data){
		res.writeHead(200, {"content-type": "text/html"});
		res.write(data);
		res.end();
	})
});

app.listen(3000);

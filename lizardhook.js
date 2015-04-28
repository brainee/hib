var no=0;
var http = require("http");
var dir = process.cwd();//__dirname
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

http.createServer(function(request, response) {
  console.log(++no)
  response.writeHead(200, {"Content-Type": "text/plain"});
  run();
  response.write("Hello World");
  response.end();
}).listen(6667);

console.log("start")

function git_pull(){
	exec("cd "+dir, puts);
	exec("git pull origin master", puts);
	setTimeout(function(){
		run()
	},1000*60)
}

function run(){
	git_pull();
};
run();


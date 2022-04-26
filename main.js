var http = require('http');
var url = require('url');
var temp = require("./temp");

// console.log(date);
var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
       var template = temp.templateHtml(``);
       response.writeHead(200);
       response.end(template)
    }
    else if(pathname==='/calander'){
        var date = temp.dates(queryData.year,queryData.month);
        var template = temp.templateHtml(date);
        response.writeHead(200);
        response.end(template);
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
})
app.listen(3000);
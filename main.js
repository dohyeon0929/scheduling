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
    else if(pathname==='/submitted'){
        //총합돼있는 데이터 베이스 가져와서 or연산 때리고 등록
        //이 때 로그인 한 사람이 선택한 데이터베이스를 또 따로 저장해서
        //수정이 가능하게끔 만들기
        //이후 종합 데이터 표 1/0 기준으로 달력에 색 표시
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
// JavaScript source code
var express = require('express');
var http = require('http');
var app = express();

app.get('/',function(req,res){
    res.send('<html><head><body><h2>Enter /City_name in the url. </h2></body></head></html')
});

    app.get('/:city',function(req,Res,next){
        var url = "http://api.openweathermap.org/data/2.5/weather?q=";
        var appid = "&appid=ff7204b74a2e1b80ca7283bc00f9e2e2&units=metric";
        var city = req.params.city;
        url = url+city+appid;
        console.log(url);
        var request = require('request');
        request(url, function (err, res, body) {
        
            var data = JSON.parse(body);
            Res.writeHead(200,{ 'content-type' : 'text/html' });
            Res.write("<html><body><div id = 'container'>");
            Res.write("<h1>" + 'City Name : ' + data['name'] + '<br>' + "</h1>");  
            Res.write("<h2>"+'Temperature : '+ data.main['temp'] +'<br>'+"</h2>");
            Res.write("<h2>" + 'Sunset Time : ' + new Date(data.sys['sunset']*1000) +'<br>' + "</h2>");
            Res.write("<h2>" +'Sunrise Time : ' + new Date(data.sys['sunrise']*1000) + '<br>' + "</h2>");
            Res.write("</div></body></html>");
            Res.end();
        });
    });  

app.listen(8001);
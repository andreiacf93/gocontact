var http = require('http');
// var url = 'http://api.openweathermap.org/data/2.5/find?q=London&appid=c9364eb27b16a26ac3f6ca8594a612ac&units=metric';
var fs = require('fs');
var path = require('path');

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var logger = require('./logger');

//logger.info('TESTE LOGGER')
var app = express();
app.use(express.static('public'));

http.createServer(function(req, res){

   if(req.url === "/"){
       fs.readFile('./weather.html', function (err, html){
           res.writeHead(200, {"Content-Type": "text/html"});
           res.end(html);
       });
   }else if(req.url.match("\.css$")){
       var cssPath = path.join(__dirname, 'public/css', req.url);
       var fileStream = fs.createReadStream(cssPath, "UTF-8");
       res.writeHead(200, {"Content-Type": "text/css"});
       fileStream.pipe(res);

   }else{
       res.writeHead(404, {"Content-Type": "text/html"});
       res.end("No Page Found");
   }

}).listen(8080);

async function getWeather(cities) {
   var weather_data = [];
   for (var city_obj of cities) {
      var city = city_obj.name;
      var url = 'http://api.openweathermap.org/data/2.5/find?q=${city}&appid=c9364eb27b16a26ac3f6ca8594a612ac&units=metric';

      var response_body = await request(url);
      var weather_json = JSON.parse(response_body);
      var weather = {
         city: city,
         coord: "[" + weather_json.main.latitude + ", " + weather_json.main.longitude + "]",
         icon: weather_json.weather[0].icon,
         temperature: Math.round(weather_json.main.temp),
         pressure: weather_json.main.pressure,
         description: weather_json.weather[0].description
      };
      weather_data.push(weather);
   }
   return weather_data;
}
//var city = 'Las Vegas';
app.get('/', function (req, res) {
   cityModel.find({}, function (err, cities) {
      getWeather(cities).then(function (results) {
         var weather_data = { weather_data: results };
         res.render('weather', weather_data);
      });
   });
});
app.post('/', function (req, res) {
   var newCity = new cityModel({ name: req.body.city_name });
   newCity.save();
   res.redirect('/');
});
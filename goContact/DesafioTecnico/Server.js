//Load application server with express 
const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')
var ejs = require('ejs');

const appid = 'c9364eb27b16a26ac3f6ca8594a612ac';

// Run server to listen on port 8000.
const server = app.listen(8000, () => {
  console.log("Server is up and listening on port 8000")
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('./public'))

// create a write stream (in append mode) -> LOG FILE
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'resume_requests.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

// allow express to access our html (weather.html) file
// http://localhost:8000/
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "weather.html")
});

app.post('/weathersearch', (req, res) => {
	
	let request = require('request');
	let city = req.body.searchtxt;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
	request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  
	  fs.readFile('weather.html', 'utf-8', function(err, content) {
      if (err) {
          res.end('error occurred');
          return;
      }
	let weather = JSON.parse(body)
    var cityname = `${weather.name}`;
    // var icon = icon.src = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    var icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var temp = `${parseInt(weather.main.temp - 273)}ºC`;
    var humiditydiv = `${weather.main.humidity}%`;

    var renderedHtml = ejs.render(content, {cityname: cityname, icon:icon, temp:temp, humiditydiv:humiditydiv});  //get rendered HTML code
    // var renderedHtml = ejs.render(content, {cityname: cityname}, {icon:icon}, {temp:temp}, {humiditydiv:humiditydiv});  //get rendered HTML code
    res.end(renderedHtml);
  });
  }
});
})
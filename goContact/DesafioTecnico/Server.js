//Load application server with express 
const express = require('express')
const app = express()
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')
const ejs = require('ejs');

const appid = 'c9364eb27b16a26ac3f6ca8594a612ac';

// Run server to listen on port 8000.
const server = app.listen(8000, () => {
  console.log("Server is up and listening on port 8000")
})

// cria o obj json pela primeira vez
var obj = {
  table: [],
};
// passa para json
var json = JSON.stringify(obj);
/* escrever obj json para ficheiro*/
fs.writeFileSync('myjsonfile.json', json, 'utf-8');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./public'))

// create a write stream (in append mode) -> LOG FILE
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'resume_requests.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

// allow express to access our html (weather.html) file
// http://localhost:8000/
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "weather.html")
});

app.post('/weathersearch', (req, res) => {

  let request = require('request');
  let city = req.body.searchtxt;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
  request(url, function (err, response, body) {
    if (err) {
      console.log('error:', error);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });

      fs.readFile('weather.html', 'utf-8', function (err, content) {
        if (err) {
          res.end('error occurred');
          return;
        }

        let weather = JSON.parse(body)
        var cityname = `${weather.name}`;
        var temp = `${parseInt(weather.main.temp - 273)}ºC`;
        var humiditydiv = `${weather.main.humidity}%`;

        var temp_min = `${parseInt(weather.main.temp_min - 273)}ºC`;
        var temp_max = `${parseInt(weather.main.temp_max - 273)}ºC`;

        var lat;
        var lng;
        var api_sun = `https://api.sunrise-sunset.org/json?lat=${lat}lng=${lng}`
        let sun = JSON.parse(body)
        var sunrise = `${sun.sunrise}`;
        var sunset = `${sun.sunset}`;

        var file = require('./myjsonfile.json');
        file.table.push({ cityname: cityname, temp: temp, humiditydiv: humiditydiv, temp_min: temp_min, temp_max: temp_max, sunrise: sunrise, sunset: sunset });
        fs.writeFileSync('myjsonfile.json', JSON.stringify(file), 'utf-8');

        var renderedHtml = ejs.render(content, { cityname: cityname, temp: temp, humiditydiv: humiditydiv, temp_min: temp_min, temp_max: temp_max, sunrise: sunrise, sunset: sunset });  //get rendered HTML code
        res.end(renderedHtml);
      })
    }
  })
})
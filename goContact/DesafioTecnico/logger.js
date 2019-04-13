var moment = require('moment');

exports.info = function (output_lines) {
    print("INFO: ", output_lines);
}

exports.error = function(output_lines){
    print("ERROR: ", output_lines);
}

var print = function(topic, output_lines){
    console.log(moment().format('DDMMYYYY HH:MM:SS') +topic + ':' + output_lines);
}
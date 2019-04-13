/**
O desafio consiste no desenvolvimento de uma página web que permita inserir 3 cidades.
Mostrar um gráfico de barras com as temperaturas por cidade. 
Adicionalmente, deve mostrar numa tabela as cidades, temperatura e a hora de início do dia e da noite.
A comunicação com APIs publicas tem de ser feita por uma API interna em node.js.
A página web apenas deverá invocar a API interna.
A API interna deve registar os pedidos feitos num ficheiro de log.
**/


/*
$(document).ready(function () {
    $('#searchWeather').click(function () {
        var city = $(#city).val();
        var host = "localhost";

        if(city != ' '){
            $.ajax({
                //https://api.openweathermap.org/data/2.5/weather?q=London&appid=b6907d289e10d714a6e88b30761fae22
               url: 'http://' + host + ':63342/api.openweathermap.org/data/2.5/weather?q=' +city+ "&units=metric"
                   + "appid="+"b6907d289e10d714a6e88b30761fae22",
                type: "GET",
                dataType: "JSON",
                contentType: 'application/json',
                success: function (data) {
                   console.log(data);
                }
            });
        } else {
            $("#error").html('Field cannot ne empty');
        }
    });
});
*/

$(document).ready(function () {
    $("#city").change(function () {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&",
                data: {
                    q: $("city").val(),
                    APPID: 'b1b15e88fa797225412429c1c50c122a1'
                },
                success: function (data) {
                    if (data.name) {
                        $('table').removeClass('hidden');
                        $("#cityName").html(data.name + ' / ' + data.sys.country);
                        $("#coordinates").html('Lon (º): ' + data.coord.lon + ' / Lat (º):' + data.coord.lat);
                        $("#weather").html(data.weather[0].description);
                        $("#temp").html(data.main.temp.toString() + 'ºK / ' + (data.main.temp - 273.15).toString() + 'ºC');
                        $("#pressure").html(data.main.pressure);
                        $("#allData").html(JSON.stringify(data));
                    }
                    else {
                        $('table').addClass('hidden');
                        alert(data.message);
                    }
                },
                error: function () {
                    $('table').addClass('hidden');
                    alert('Erro!');
                }
            });
        });
});


function jsonFiles(i) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this, i);
        }
    };
    xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b1b15e88fa797225412429c1c50c122a1", true);
    xmlhttp.send();
}
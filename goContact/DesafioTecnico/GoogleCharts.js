function googleCharts(){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Cidades', 'Cidade1', 'Cidade2', 'Cidade3'],
        ['Cidade1', 0, 12, 0] ,
        ['Cidade2', 0, 28, 0],
        ['Cidade3', 0, 17, 0],
    ]);

    var options = {
        chart: {
        title: 'Previsão Meteorológica',
        subtitle: 'openweathermap',
        },
        bars: 'vertical',
        vAxis: {format: 'decimal'},
        height: 400,
        colors: ['#28b2c7', '#28b2c7', '#28b2c7']
    };

    var chart = new google.charts.Bar(document.getElementById('chart_div'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
    }
}
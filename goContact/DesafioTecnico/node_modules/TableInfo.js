//Tabela
google.charts.load('current', { 'packages': ['table'] });
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Cidade');
    data.addColumn('number', 'Mínima');
    data.addColumn('number', 'Máxima');
    data.addColumn('string', 'Início do dia');
    data.addColumn('string', 'Início da noite');
    data.addRows([
      [cidade, min, max, dia, noite]
      [cidade, min, max, dia, noite]
      [cidade, min, max, dia, noite]
      [cidade, min, max, dia, noite]
      [cidade, min, max, dia, noite]
    ]);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}

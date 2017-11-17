google.charts.load("current", { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Element", "Estudiantes Activas", { role: "style" }],
        ["S1", 59, "#b87333"],
        ["S2", 50, "silver"],
        ["S3", 40, "gold"],
        ["S4", 30, "color: #e5e4e2"]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);

    var options = {
        width: 350,
        height: 200,
        bar: { groupWidth: "70%" },
        legend: { position: "none" },
        backgroundColor: 'none',



    };
    var chart = new google.visualization.ColumnChart(document.querySelector(".graficaEnroll"));
    chart.draw(view, options);
}


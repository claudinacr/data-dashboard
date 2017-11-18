//cambiar contenido segun boton del menu
var mostrarOcultar = function(e){
  var tabSeleccionado = e.target.dataset.tabSeleccionado;
  var overview = document.getElementById("overview");
  var student = document.getElementById("student");
  var teacher = document.getElementById("teacher");
  if (tabSeleccionado === "tabOverview"){
    console.log ("overview");
    student.style.display="none"; //oculta pantalla student
    teacher.style.display="none"; //oculta pantalla teacher
    overview.style.display="block"; //muestra pantalla overview
  } else if (tabSeleccionado === "tabStudent"){
    console.log("Student");
    student.style.display="block"; //muestra pantalla student
    teacher.style.display="none"; //oculta pantalla teacher
    overview.style.display="none"; //oculta pantalla overview
  }else if (tabSeleccionado === "tabTeacher"){
    console.log("Teacher");
    student.style.display="none"; //oculta pantalla student
    teacher.style.display="block"; //muestra pantalla teacher
    overview.style.display="none"; //oculta pantalla overview
  }
}
var cargarPag = function(){
  var elementosTab = document.getElementsByClassName("tab");
  for (var i = 0; i < elementosTab.length; i++) {
    elementosTab[i].addEventListener("click" , mostrarOcultar);
  }
}
cargarPag();

/* DATA GRAFICADA SANTIAGO DE CHILE */

/* GENERACIÓN 2017 II */
/* El total de estudiantes presentes por sede y generación. */
google.charts.load("current", { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChartoo);
function drawChartoo() {
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

/* El porcentaje de deserción de estudiantes. */
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawCharto);

function drawCharto() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['S1', 11],
        ['S2', 2],
        ['S3', 3],
        ['S4', 4]
    ]);

    var options = {
        title: ''
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficaachiv'));

    chart.draw(data, options);
}

/* La cantidad de estudiantes que superan la meta de puntos en promedio de todos los sprints cursados. La meta de puntos es 70% del total de puntos. */

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['S1', 1],
        ['S2', 2],
        ['S3', 2],
        ['S4', 2],
    ]);

    var options = {
        title: ''
    };

    var chart = new google.visualization.PieChart(document.getElementById('graficaNPS'));

    chart.draw(data, options);
}

/* HISTOGRAMA*/

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharttech);
function drawCharttech() {
    var data = google.visualization.arrayToDataTable([
        ['Dinosaur', 'Length'],
        ['Acrocanthosaurus (top-spined lizard)', 12.2],
        ['Albertosaurus (Alberta lizard)', 9.1],
        ['Allosaurus (other lizard)', 12.2],
        ['Apatosaurus (deceptive lizard)', 22.9],
        ['Archaeopteryx (ancient wing)', 0.9],
        ['Argentinosaurus (Argentina lizard)', 36.6],
        ['Baryonyx (heavy claws)', 9.1],
        ['Brachiosaurus (arm lizard)', 30.5],
        ['Ceratosaurus (horned lizard)', 6.1],
        ['Coelophysis (hollow form)', 2.7],
        ['Compsognathus (elegant jaw)', 0.9],
        ['Deinonychus (terrible claw)', 2.7],
        ['Diplodocus (double beam)', 27.1],
        ['Dromicelomimus (emu mimic)', 3.4],
        ['Gallimimus (fowl mimic)', 5.5],
        ['Mamenchisaurus (Mamenchi lizard)', 21.0],
        ['Megalosaurus (big lizard)', 7.9],
        ['Microvenator (small hunter)', 1.2],
        ['Ornithomimus (bird mimic)', 4.6],
        ['Oviraptor (egg robber)', 1.5],
        ['Plateosaurus (flat lizard)', 7.9],
        ['Sauronithoides (narrow-clawed lizard)', 2.0],
        ['Seismosaurus (tremor lizard)', 45.7],
        ['Spinosaurus (spiny lizard)', 12.2],
        ['Supersaurus (super lizard)', 30.5],
        ['Tyrannosaurus (tyrant lizard)', 15.2],
        ['Ultrasaurus (ultra lizard)', 30.5],
        ['Velociraptor (swift robber)', 1.8]]);

    var options = {
        title: '',
        legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('graficatech'));
    chart.draw(data, options);
}


google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharttech1);
function drawCharttech1() {
    var data = google.visualization.arrayToDataTable([
        ['Dinosaur', 'Length'],
        ['Acrocanthosaurus (top-spined lizard)', 12.2],
        ['Albertosaurus (Alberta lizard)', 9.1],
        ['Allosaurus (other lizard)', 12.2],
        ['Apatosaurus (deceptive lizard)', 22.9],
        ['Archaeopteryx (ancient wing)', 0.9],
        ['Argentinosaurus (Argentina lizard)', 36.6],
        ['Baryonyx (heavy claws)', 9.1],
        ['Brachiosaurus (arm lizard)', 30.5],
        ['Ceratosaurus (horned lizard)', 6.1],
        ['Coelophysis (hollow form)', 2.7],
        ['Compsognathus (elegant jaw)', 0.9],
        ['Deinonychus (terrible claw)', 2.7],
        ['Diplodocus (double beam)', 27.1],
        ['Dromicelomimus (emu mimic)', 3.4],
        ['Gallimimus (fowl mimic)', 5.5],
        ['Mamenchisaurus (Mamenchi lizard)', 21.0],
        ['Megalosaurus (big lizard)', 7.9],
        ['Microvenator (small hunter)', 1.2],
        ['Ornithomimus (bird mimic)', 4.6],
        ['Oviraptor (egg robber)', 1.5],
        ['Plateosaurus (flat lizard)', 7.9],
        ['Sauronithoides (narrow-clawed lizard)', 2.0],
        ['Seismosaurus (tremor lizard)', 45.7],
        ['Spinosaurus (spiny lizard)', 12.2],
        ['Supersaurus (super lizard)', 30.5],
        ['Tyrannosaurus (tyrant lizard)', 15.2],
        ['Ultrasaurus (ultra lizard)', 30.5],
        ['Velociraptor (swift robber)', 1.8]]);

    var options = {
        title: '',
        legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('grafic1'));
    chart.draw(data, options);
}

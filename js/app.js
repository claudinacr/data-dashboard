//cambiar contenido segun boton del menu
var mostrarOcultar = function (e) {
    var tabSeleccionado = e.target.dataset.tabSeleccionado;
    var overview = document.getElementById("overview");
    var student = document.getElementById("student");
    var teacher = document.getElementById("teacher");
    if (tabSeleccionado === "tabOverview") {
        console.log("overview");
        student.style.display = "none"; //oculta pantalla student
        teacher.style.display = "none"; //oculta pantalla teacher
        overview.style.display = "block"; //muestra pantalla overview
    } else if (tabSeleccionado === "tabStudent") {
        console.log("Student");
        student.style.display = "block"; //muestra pantalla student
        teacher.style.display = "none"; //oculta pantalla teacher
        overview.style.display = "none"; //oculta pantalla overview
    } else if (tabSeleccionado === "tabTeacher") {
        console.log("Teacher");
        student.style.display = "none"; //oculta pantalla student
        teacher.style.display = "block"; //muestra pantalla teacher
        overview.style.display = "none"; //oculta pantalla overview
    }
}
var cargarPag = function () {
    var elementosTab = document.getElementsByClassName("tab");
    for (var i = 0; i < elementosTab.length; i++) {
        elementosTab[i].addEventListener("click", mostrarOcultar);
    }
}
cargarPag();

// Agregar Valores de las sedes al Select de Sedes en HTML
var dropsede = document.querySelector('.sede');
var dropsedeoptions = dropsede.getElementsByTagName('option');

var dropgen = document.querySelector('.generacion');

for (let i = 0; i < dropsedeoptions.length; i++) {

    dropsedeoptions[i].setAttribute('value', (Object.keys(data)[i]));

}

dropsede.onchange = function (event) {
    genSelect(event.target.value);
    graficarTodo();
};

dropgen.onchange = function () {
    graficarTodo();
}

function genSelect(sede) {

    var datagene = Object.keys(data[sede]);

    dropgen.innerHTML = "";

    for (let i = 0; i < datagene.length; i++) {
        var option = document.createElement('option');
        option.setAttribute('value', datagene[i]);
        option.appendChild(document.createTextNode(datagene[i]));
        dropgen.appendChild(option);
    }
}



window.onload = function () {
    dropsede.options[0].setAttribute('selected', 'selected');
    genSelect(dropsede.value);

};


//FUNCIONES AUXILIARES
/* Cantidad de Alumnas por Sede */
function AlumnasSede(sede) {
    var totalEstudiantes = 0;
    for (var gen in data[sede]) {

        totalEstudiantes += data[sede][gen]['students'].length;

    }
    return totalEstudiantes;
}
// console.log(AlumnasSede('AQP'));

/* Cantidad de Alimnas por Sede */

function AlumnaporGen(sede, gen) {
    return data[sede][gen]['students'].length;
}
// console.log(AlumnaporGen('CDMX'));

/* El porcentaje de deserción de estudiantes por Sede y por Generación. */

function DeserEstGen(sede, gen) {
    var estudiantes = data[sede][gen]['students'];
    var cantDeser = 0;
    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i]['active'] === false) {
            cantDeser++;
        }


    }
    return cantDeser;
}

function promedioSprintPorGen(sede, gen) {

    var estudiantes = data[sede][gen]['students'];

    var promSprints = [];
    var sumaSprints = [0, 0, 0, 0];
    var metaSprints70 = 4000;
    var estudiantesSup = 0;
    ;
    for (let i = 0; i < estudiantes.length; i++) {
        var sumaIndiv = 0;

        const estudiante = estudiantes[i];

        var sprints = estudiante['sprints'];

        if (sprints && sprints.length > 0) {
            for (let j = 0; j < sprints.length; j++) {
                const sprint = sprints[j];

                sumaSprints[j] += sprint['score']['tech'] + sprint['score']['hse'];
                sumaIndiv += sprint['score']['tech'] + sprint['score']['hse'];
            }

            if (sumaIndiv >= metaSprints70) {
                estudiantesSup++;
            }

        }


    }


    for (let i = 0; i < sumaSprints.length; i++) {

        promSprints.push(sumaSprints[i] / estudiantes.length);

    }
    promSprints.push(estudiantesSup);
    return promSprints;

}

function NPSPorGen(sede, gen) {
    var ratings = data[sede][gen]['ratings'];
    var nps = [];
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];

        nps.push(rating['nps']['promoters'] - rating['nps']['detractors']);

    }

    return nps
}

function acumNPSPorGen(sede, gen) {
    var ratings = data[sede][gen]['ratings'];
    var npsacum = 0;
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];

        npsacum += rating['nps']['promoters'] - rating['nps']['detractors'];

    }
    npsacum /= ratings.length;

    return npsacum
}

function promNPSPorGen(sede, gen) {
    var ratings = data[sede][gen]['ratings'];
    var promnps = [0, 0, 0];
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];

        promnps[0] += rating['nps']['promoters'];
        promnps[1] += rating['nps']['passive'];
        promnps[2] += rating['nps']['detractors'];

    }

    for (let i = 0; i < promnps.length; i++) {
        promnps[i] /= 3;

    }


    return promnps
}

/* DATA GRAFICADA SANTIAGO DE CHILE */

/* GENERACIÓN 2017 II */
/* El total de estudiantes presentes por sede y generación. */
google.charts.load("current", { packages: ['corechart'] });
google.charts.setOnLoadCallback(graficarTodo);

function graficarTodo() {
    grafTortaDesercion();
    grafPromSprints();
    grafNPS();

}

// Grafica de % de Deserción
function grafTortaDesercion() {

    var txt_totalAlumnas = document.getElementById('StudCurrEnr').firstElementChild;
    var txt_porDesercion = document.getElementById('dropout').firstElementChild;

    var alumnasdeGen = AlumnaporGen(dropsede.value, dropgen.value);

    var alumnasdeser = DeserEstGen(dropsede.value, dropgen.value);
    var alumnasactivas = alumnasdeGen - alumnasdeser;

    var porcenDer = alumnasdeser / alumnasdeGen * 100;

    txt_totalAlumnas.textContent = alumnasdeGen;
    txt_porDesercion.textContent = porcenDer.toFixed(2) + "%";

    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Topping');
    datos.addColumn('number', 'Slices');
    datos.addRows([
        ['Activas', alumnasactivas],
        ['Inactivas', alumnasdeser],
    ]);

    // Set chart options
    var options = {
        title: ''

    };

    var chart = new google.visualization.PieChart(document.getElementById("graficaEnroll"));
    chart.draw(datos, options);

}

/* El porcentaje de deserción de estudiantes. */


function grafPromSprints() {

    var promSprints = promedioSprintPorGen(dropsede.value, dropgen.value);


    var txt_alumnasMeta = document.getElementById('StudCurrAchievement').firstElementChild;
    var txt_porcAlumnasMeta = document.getElementById('metasup').firstElementChild;

    var porcMeta = promSprints[4] / AlumnaporGen(dropsede.value, dropgen.value) * 100;


    var datos = google.visualization.arrayToDataTable([
        ['Sprint', 'Promedio'],
        ['S1', promSprints[0]],
        ['S2', promSprints[1]],
        ['S3', promSprints[2]],
        ['S4', promSprints[3]]
    ]);

    txt_alumnasMeta.textContent = promSprints[4];
    txt_porcAlumnasMeta.textContent = porcMeta.toFixed(2) + "%";

    var options = {
        title: ''
    };

    var chart = new google.visualization.LineChart(document.getElementById('graficaachiv'));

    chart.draw(datos, options);
}

/* La cantidad de estudiantes que superan la meta de puntos en promedio de todos los sprints cursados. La meta de puntos es 70% del total de puntos. */



function grafNPS() {

    var npsSprints = NPSPorGen(dropsede.value, dropgen.value);

    var npsacum = acumNPSPorGen(dropsede.value, dropgen.value);

    var promnps = promNPSPorGen(dropsede.value, dropgen.value);


    var txt_acumNPS = document.getElementById('StudCurrEnrNPS');
    var txt_promNPS = document.getElementById('nps');

    var label = [' Promoters', ' Passive', ' Detractors'];

    txt_acumNPS.innerHTML = "";
    txt_promNPS.innerHTML = "";

    txt_acumNPS.textContent = npsacum + '%';
    for (let i = 0; i < promnps.length; i++) {
        txt_promNPS.appendChild(document.createTextNode(promnps[i] + "%" + label[i]));
        txt_promNPS.appendChild(document.createElement('br'));
    }
    txt_promNPS.style.fontWeight = 'bold';

    var datos = google.visualization.arrayToDataTable([
        ['Sprint', 'NPS'],
        ['S1', npsSprints[0]],
        ['S2', npsSprints[1]],
        ['S3', npsSprints[2]],
        ['S4', npsSprints[3]],
    ]);

    var options = {
        title: ''
    };

    var chart = new google.visualization.LineChart(document.getElementById('graficaNPS'));

    chart.draw(datos, options);
}

/* HISTOGRAMA*/
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

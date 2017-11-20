var botones = document.getElementsByClassName('tab');

//console.log(botones);


//cambiar contenido segun boton del menu
var mostrarOcultar = function (e) {
    var tabSeleccionado = e.target.dataset.tabSeleccionado;
    var overview = document.getElementById("overview");
    var student = document.getElementById("student");
    var teacher = document.getElementById("teacher");

    if (tabSeleccionado === "tabOverview") {
        //console.log("overview");
        student.style.display = "none"; //oculta pantalla student
        teacher.style.display = "none"; //oculta pantalla teacher
        overview.style.display = "block"; //muestra pantalla overview
        botones[0].style.borderBottom = '3px #F9A91A solid';
        botones[1].style.borderBottom = '3px #E0E0E0 solid';


    } else if (tabSeleccionado === "tabStudent") {
        //console.log("Student");
        student.style.display = "block"; //muestra pantalla student
        teacher.style.display = "none"; //oculta pantalla teacher
        overview.style.display = "none"; //oculta pantalla overview
        botones[0].style.borderBottom = '3px #E0E0E0 solid';
        botones[1].style.borderBottom = '3px #F9A91A solid';
        studentByGen();
    } else if (tabSeleccionado === "tabTeacher") {
        //console.log("Teacher");
        //student.style.display = "none"; //oculta pantalla student
        //teacher.style.display = "block"; //muestra pantalla teacher
        //overview.style.display = "none"; //oculta pantalla overview

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
//Agrarrar selector class .sede
var dropsede = document.querySelector('.sede');
//Agregar las opciones que tiene el selector 
var dropsedeoptions = dropsede.getElementsByTagName('option');

//Recorrer las opciones con un for para agregar valores de las sedes al selector de sedes
for (let i = 0; i < dropsedeoptions.length; i++) {

    dropsedeoptions[i].setAttribute('value', (Object.keys(data)[i]));
    //Ejemplo: en la opcion Arequipa, se agregara el valor de data AQP
}

var dropgen = document.querySelector('.generacion');

var dropsprint = document.getElementById('sprintNum');



dropsede.onchange = function (event) {
    genSelect(event.target.value);
    graficarTodo();
    studentByGen();
};

dropgen.onchange = function () {
    graficarTodo();
    studentByGen();
}


dropsprint.onchange = function () {
    drawCharttech();
    drawCharthse();
}

//Funcion para que al seleccionar una sede cambie las generaciones en base a cada sede
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
    dropsprint.options[0].setAttribute('selected', 'selected');
    var overview = document.getElementById("overview");
    var student = document.getElementById("student");
    var teacher = document.getElementById("teacher");
    overview.style.display = "block"; //muestra panta
    student.style.display = "none"; //oculta pantalla student
    teacher.style.display = "none"; //oculta pantalla teacher
    botones[0].style.borderBottom = '3px #F9A91A solid';
    //studentByGen(dropsede.value, dropgen.value);

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

/* Array de Alumnas por Sede */

function AlumnasporGen(sede, gen) {
    return data[sede][gen]['students'];
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

                //Suma de puntaje tecnico y puntaje hse del sprint en la posición j
                sumaSprints[j] += sprint['score']['tech'] + sprint['score']['hse'];
                sumaIndiv += sprint['score']['tech'] + sprint['score']['hse'];

            }

            if (sumaIndiv >= metaSprints70) { //Si el total de sumaIndiv es igual o mayor a 4000
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

google.charts.load("current", { packages: ['corechart'] });
google.charts.setOnLoadCallback(graficarTodo);

function graficarTodo() {
    grafTortaDesercion();
    grafPromSprints();
    grafNPS();
    drawCharttech();
    drawCharthse();
    grafSatisfaccion();
    grafTeacher();
    grafJedi();

}

// Grafica de % de Deserción
function grafTortaDesercion() {

    var txt_totalAlumnas = document.getElementById('StudCurrEnr').firstElementChild;
    var txt_porDesercion = document.getElementById('dropout').firstElementChild;
    console.log(txt_porDesercion);
    var alumnasdeGen = AlumnasporGen(dropsede.value, dropgen.value).length;
    // console.log(alumnasdeGen);
    var alumnasdeser = DeserEstGen(dropsede.value, dropgen.value);
    var alumnasactivas = alumnasdeGen - alumnasdeser;

    var porcenDer = alumnasdeser / alumnasdeGen * 100;

    txt_totalAlumnas.textContent = alumnasdeGen; alumnasdeGen;
    txt_porDesercion.textContent = porcenDer.toFixed(2) + "%";

    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Topping');
    datos.addColumn('number', 'Estudiantes');
    datos.addRows([
        ['Activas', alumnasactivas],
        ['Inactivas', alumnasdeser],
    ]);

    // Set chart options
    var options = {
        title: '',
        colors: ['#F9A91A', '#333333', '#B37405', '#F7F7F7'],

    };

    var chart = new google.visualization.PieChart(document.getElementById("graficaEnroll"));
    chart.draw(datos, options);

}


// Grafica de Promedio de Sprints

function grafPromSprints() {

    var promSprints = promedioSprintPorGen(dropsede.value, dropgen.value);


    var txt_alumnasMeta = document.getElementById('StudCurrAchievement').firstElementChild;
    var txt_porcAlumnasMeta = document.getElementById('metasup').firstElementChild;

    var porcMeta = promSprints[4] / AlumnasporGen(dropsede.value, dropgen.value).length * 100;


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
        title: '',
        colors: ['#F9A91A', '#333333', '#B37405', '#F7F7F7'],
        'legend': 'top',
    };

    var chart = new google.visualization.LineChart(document.getElementById('graficaachiv'));

    chart.draw(datos, options);
}


// Grafica de NPS Promedio por Generacion
function grafNPS() {

    var npsSprints = NPSPorGen(dropsede.value, dropgen.value);

    var npsacum = acumNPSPorGen(dropsede.value, dropgen.value);

    var promnps = promNPSPorGen(dropsede.value, dropgen.value);


    var txt_acumNPS = document.getElementById('StudCurrEnrNPS');
    var txt_promNPS = document.getElementById('nps');

    var label = [' Promoters', ' Passive', ' Detractors'];

    txt_acumNPS.innerHTML = "";
    txt_promNPS.innerHTML = "";

    txt_acumNPS.textContent = npsacum.toFixed(2) + '%' + " Cumulative NPS";
    for (let i = 0; i < promnps.length; i++) {
        txt_promNPS.appendChild(document.createTextNode(promnps[i].toFixed(2) + "%" + label[i]));
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
        title: '',
        colors: ['#F9A91A', '#333333', '#B37405', '#F7F7F7'],
        'legend': 'top',
    };

    var chart = new google.visualization.LineChart(document.getElementById('graficaNPS'));

    chart.draw(datos, options);
}


//Funcion de retorna Tech Scores por Sprint
function techPorSprint(sede, gene, numSprint) {

    var students = data[sede][gene]['students'];
    var techScores = [];
    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        if (student['sprints'] && student['sprints'].length > 0) {
            techScores.push(student['sprints'][numSprint]['score']['tech']);
        }



    }

    return techScores;
}
//Funcion de retorna HSE Scores por Sprint
function hsePorSprint(sede, gene, numSprint) {

    var students = data[sede][gene]['students'];
    var hseScores = []
    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        if (student['sprints'] && student['sprints'].length > 0) {

            hseScores.push(student['sprints'][numSprint]['score']['hse']);
        }
    }

    return hseScores;
}
//Funcion de retorna lista de Nombres de Estudiantes
function studentNames(sede, gene) {

    var students = data[sede][gene]['students'];
    var nombres = [];
    for (let i = 0; i < students.length; i++) {
        nombres.push(students[i]['name']);

    }

    return nombres;
}

/* HISTOGRAMA*/
// Grafica de Tech Score por Sprint
function drawCharttech() {

    var metaTech = [1800 * 0.7, 3600 * 0.7, 1800 * 0.7, 3600 * 0.7];

    var arraydata = [['Estudiante', 'Tech Score']];
    var studentList = studentNames(dropsede.value, dropgen.value);
    var sprintScoreList = techPorSprint(dropsede.value, dropgen.value, dropsprint.value);

    var numalcameta = 0;

    for (let i = 0; i < studentList.length; i++) {
        var mergeArray = [];

        mergeArray.push(studentList[i]);
        //['Fulana']
        mergeArray.push(sprintScoreList[i]);
        //['Fulana', 1366]
        arraydata.push(mergeArray);
        //[['Estudiante', 'Tech Score'],['Fulana', 1366]];
        if (sprintScoreList[i] > metaTech[dropsprint.value]) {
            numalcameta++;
        }

    }

    var numnocumple = studentList.length - numalcameta;
    var porcencumple = numalcameta / studentList.length * 100;

    var txt_numalcameta = document.getElementById('StudentsMeetTech').firstElementChild;
    var txt_porcencumple = document.getElementById('PerStudentsMeetTech').firstElementChild;

    txt_numalcameta.textContent = numnocumple;
    txt_porcencumple.textContent = porcencumple.toFixed(2) + "%";


    var data = google.visualization.arrayToDataTable(arraydata);
    var data2 = new google.visualization.DataTable();
    data2.addColumn('string', 'Topping');
    data2.addColumn('number', 'Estudiantes');
    data2.addRows([
        ['Students that meet the target', numalcameta],
        ['Students that do not meet de target', numnocumple],
    ]);

    var options = {
        title: '',
        colors: ['#333333', '#F9A91A', '#B37405', '#F7F7F7'],
        legend: 'top'
    };
    var options2 = {
        title: '',
        colors: ['#F9A91A', '#B37405', '#F7F7F7', '#333333'],
        is3D: true
    };

    var chart = new google.visualization.Histogram(document.getElementById('graficatech'));
    chart.draw(data, options);

    var chart2 = new google.visualization.PieChart(document.getElementById('graficatechPie'));
    chart2.draw(data2, options2);
}

// Grafica de HSE Score por Sprint
function drawCharthse() {

    var metahse = [1200 * 0.7, 2400 * 0.7, 1200 * 0.7, 2400 * 0.7];

    var arraydata = [['Estudiante', 'Personal Score']];
    var studentList = studentNames(dropsede.value, dropgen.value);
    var sprintScoreList = hsePorSprint(dropsede.value, dropgen.value, dropsprint.value);

    var numalcameta = 0;


    //console.log(arraydata);

    for (let i = 0; i < studentList.length; i++) {
        var mergeArray = [];
        mergeArray.push(studentList[i]);
        mergeArray.push(sprintScoreList[i]);
        arraydata.push(mergeArray);

        if (sprintScoreList[i] > metahse[dropsprint.value]) {
            numalcameta++;
        }

    }

    var numnocumple = studentList.length - numalcameta;
    var porcencumple = numalcameta / studentList.length * 100;

    var txt_numalcameta = document.getElementById('StudentsMeetHSE').firstElementChild;
    var txt_porcencumple = document.getElementById('PerStudentsMeetHSE').firstElementChild;


    txt_numalcameta.textContent = numnocumple;
    txt_porcencumple.textContent = porcencumple.toFixed(2) + "%";


    var data = google.visualization.arrayToDataTable(arraydata);
    var data2 = new google.visualization.DataTable();
    data2.addColumn('string', 'Topping');
    data2.addColumn('number', 'Estudiantes');
    data2.addRows([
        ['Students that meet the target', numalcameta],
        ['Students that do not meet the target', numnocumple],
    ]);

    var options = {
        title: '',
        colors: ['#F9A91A', '#F7F7F7', '#333333', '#B37405'],
        legend: 'top'
    };
    var options2 = {
        title: '',
        colors: ['#F9A91A', '#B37405', '#F7F7F7', '#333333'],
        is3D: true
    };

    var chart = new google.visualization.Histogram(document.getElementById('graficaHSE'));
    chart.draw(data, options);

    var chart2 = new google.visualization.PieChart(document.getElementById('graficaHSEPie'));
    chart2.draw(data2, options2);
}


function porcAcumSupera(sede, gen) {

    var ratings = data[sede][gen]['ratings'];

    var porAcum = 0;
    for (let i = 0; i < ratings.length; i++) {
        porAcum += ratings[i]['student']['supera'];

    }

    return porAcum;
}

function promSupera(sede, gen) {

    var ratings = data[sede][gen]['ratings'];

    var supera = []

    for (let i = 0; i < ratings.length; i++) {
        supera.push(ratings[i]['student']['supera']);

    }

    return supera;
}


//Graficas de Satisfaccion y Promedio de Teachers y Jedi Masters
function grafSatisfaccion() {

    var txt_satisfacTxt = document.getElementById('satisfacTxt').firstElementChild;

    txt_satisfacTxt.textContent = porcAcumSupera(dropsede.value, dropgen.value) + "%";

    var superaSprints = promSupera(dropsede.value, dropgen.value);



    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Topping');
    datos.addColumn('number', 'SS');
    datos.addRows([
        ['S1', superaSprints[0]],
        ['S2', superaSprints[1]],
        ['S3', superaSprints[2]],
        ['S4', superaSprints[3]]
    ]);

    // Set chart options
    var options = {
        title: '',
        colors: ['#F9A91A', '#F7F7F7', '#333333', '#B37405'],
        legend: 'top'
    };

    var chart = new google.visualization.LineChart(document.getElementById("studentSatis"));
    chart.draw(datos, options);

}

function porcAcumTeacher(sede, gen) {

    var ratings = data[sede][gen]['ratings'];

    var porAcumTeacher = 0;
    for (let i = 0; i < ratings.length; i++) {
        porAcumTeacher += ratings[i]['teacher'];

    }

    return porAcumTeacher;
}

function promTeacher(sede, gen) {

    var ratings = data[sede][gen]['ratings'];

    var teacher = []

    for (let i = 0; i < ratings.length; i++) {
        teacher.push(ratings[i]['teacher']);

    }

    return teacher;
}


//Graficas de Satisfaccion y Promedio de Teachers y Jedi Masters
function grafTeacher() {

    var txt_teacherTxt = document.getElementById('teacherTxt').firstElementChild;

    txt_teacherTxt.textContent = porcAcumTeacher(dropsede.value, dropgen.value).toFixed(2) + "%";

    var teacherSprints = promTeacher(dropsede.value, dropgen.value);



    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Topping');
    datos.addColumn('number', 'TR');
    datos.addRows([
        ['S1', teacherSprints[0]],
        ['S2', teacherSprints[1]],
        ['S3', teacherSprints[2]],
        ['S4', teacherSprints[3]]
    ]);

    // Set chart options
    var options = {
        title: '',
        colors: ['#F9A91A', '#F7F7F7', '#333333', '#B37405'],
        legend: 'top'

    };

    var chart = new google.visualization.LineChart(document.getElementById("teacherScore"));
    chart.draw(datos, options);

}

function porcAcumJedi(sede, gen) {

    var ratings = data[sede][gen]['ratings'];

    var porAcumJedi = 0;
    for (let i = 0; i < ratings.length; i++) {
        porAcumJedi += ratings[i]['jedi'];

    }

    return porAcumJedi;
}

function promJedi(sede, gen) {

    var ratings = data[sede][gen]['ratings'];

    var jedi = []

    for (let i = 0; i < ratings.length; i++) {
        jedi.push(ratings[i]['jedi']);

    }

    return jedi;
}


//Graficas de Satisfaccion y Promedio de Teachers y Jedi Masters
function grafJedi() {

    var txt_jediTxt = document.getElementById('jediTxt').firstElementChild;

    txt_jediTxt.textContent = porcAcumJedi(dropsede.value, dropgen.value).toFixed(2) + "%";

    var jediSprints = promJedi(dropsede.value, dropgen.value);



    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Topping');
    datos.addColumn('number', 'JMR');
    datos.addRows([
        ['S1', jediSprints[0]],
        ['S2', jediSprints[1]],
        ['S3', jediSprints[2]],
        ['S4', jediSprints[3]]
    ]);

    // Set chart options
    var options = {
        title: '',
        colors: ['#F9A91A', '#F7F7F7', '#333333', '#B37405'],
        legend: 'top'

    };

    var chart = new google.visualization.LineChart(document.getElementById("jediScore"));
    chart.draw(datos, options);

}


// Info Sección Students

var studentinfo = document.createElement('div');
studentinfo.className = 'studentinfo';
var stuphoto = document.createElement('div');
stuphoto.className = 'stuphoto';
stuphoto.appendChild(document.createElement('img'));

var stuname = document.createElement('div');
stuname.className = 'stuname';
stuname.appendChild(document.createElement('h2'))

var stuscores = document.createElement('div');
stuscores.className = 'stuscores';
var techPer = document.createElement('div');
techPer.className = 'techPer';
techPer.appendChild(document.createElement('h3'));
var lifePer = document.createElement('div');
lifePer.className = 'lifePer';
lifePer.appendChild(document.createElement('h3'));
stuscores.appendChild(techPer);
stuscores.appendChild(lifePer);
var auxdiv = document.createElement('div');
auxdiv.className = 'infoScores';
auxdiv.appendChild(stuname);
auxdiv.appendChild(stuscores);


var deletebutton = document.createElement('button');
deletebutton.className = "deletestu";
deletebutton.setAttribute('type', 'button');
var deleteicon = document.createElement('i');
deleteicon.className = "fa fa-trash";
deleteicon.setAttribute('aria-hidden', "true");
deletebutton.appendChild(deleteicon);


studentinfo.appendChild(stuphoto);
studentinfo.appendChild(auxdiv);
studentinfo.appendChild(deletebutton);



function studentByGen() {

    var students = AlumnasporGen(dropsede.value, dropgen.value);
    //console.log(students);

    var studentsList = document.getElementById('student');
    studentsList.innerHTML = "";


    for (let i = 0; i < students.length; i++) {
        students[i];

        var newstudentInfo = studentinfo.cloneNode(true);

        newstudentInfo.querySelector('.stuname').firstElementChild.textContent = students[i]['name'];

        var newstuscore = newstudentInfo.querySelector('.stuscores');

        if (students[i]['sprints'] && students[i]['sprints'].length > 0) {
            newstudentInfo.querySelector('.stuphoto').firstElementChild.setAttribute('src', 'assets/images/girl.png');
            newstuscore.querySelector('.techPer').firstElementChild.textContent = 'Tech Score: ' + students[i]['sprints'][0]['score']['tech'];
            newstuscore.querySelector('.lifePer').firstElementChild.textContent = 'Life Score: ' + students[i]['sprints'][0]['score']['hse'];
        } else {
            newstudentInfo.querySelector('.stuphoto').firstElementChild.setAttribute('src', 'assets/images/girlsad.png');
            newstuscore.querySelector('.techPer').firstElementChild.textContent = 'Tech Score: ' + 0;
            newstuscore.querySelector('.lifePer').firstElementChild.textContent = 'Life Score: ' + 0;
        }

        studentsList.appendChild(newstudentInfo);
    }



}
//Boton Borrar de cada Caja de Estudiante
document.addEventListener("click", function (event) {

    var objetivo = event.target;
    var contenedorEstu = document.getElementById('student');
    var listaestudiantes = contenedorEstu.getElementsByClassName('studentinfo');

    if (objetivo.className.match('deletestu')) {

        var nombre = objetivo.previousSibling.firstElementChild.firstElementChild.textContent;

        var students = data[dropsede.value][dropgen.value]['students'];

        for (let i = 0; i < students.length; i++) {

            if (students[i]['name'] === nombre) {
                data[dropsede.value][dropgen.value]['students'].splice(i, 1);
                console.log("Borrado");
            }

        }

    }

    //Refrescamos las graficas y La lista de estudiantes
    studentByGen();
    graficarTodo();

});
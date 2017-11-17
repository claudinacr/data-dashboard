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

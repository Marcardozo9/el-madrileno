/* Final Turno Diciembre 2022
        Alumna: Cardozo Marcela Emilce
        DNI: 38688281
        Cátedra: Drelichman 
        Turno Noche */

//funcion para agrandar los posters al hacer click
$(".img-poster").click(function() {

  //declaro ancho y alto de la ventana, 
  var docWidth = $(window).width(),
      docHeight = $(window).height(),
      anchoImg = docHeight * 1100 / 1700,
      margenImg = (docWidth - anchoImg) / 2;

  

  //agarro el src del elemento al que le hice click
  var src = $(this).attr('src');
  
  //creamos un div que ocupa toda la pantalla, y le asignamos estilo directamente con jQuery
  var fullScreenImg = $('<div>').css({

    background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '10000',
    top: '0',
    left: '0',
    cursor: 'zoom-out'

    //al hacerle click a cualquier lado de ese div lo vamos a cerrar
  }).click(function() {
    removeModal();

    //finalmente lo insertamos al body
  }).appendTo('body');

  //al apretar Esc tambien se cierra
  $('body').on('keyup.modal-close', function(e) {
    if (e.key === 'Escape') {
      removeModal();
    }
  });

  //posicion horizontal del boton cerrar
  var positionCloseImg = anchoImg + margenImg + 15;

  //si la proporcion de la ventana deja un margen para los botones, ponemos los botones, si no no
  if (docWidth / docHeight >= 0.85) {

    //usamos btn close de bootstrap
    var btnCloseImg = $('<i class="bi bi-x-circle-fill"></i>').addClass('btnCloseImg').click(function() {
      //al hacerle click tambien tiene que cerrar la imagen
      removeModal();
    }).css({
      //pisamos left con la posicion que calculamos
      left: positionCloseImg
    }).appendTo('body');

    //usamos btn save de bootstrap
    var btnSaveImg = $('<i class="bi bi-cloud-arrow-down-fill"></i>').addClass('btnSaveImg').click(function() {
      //al hacerle click guarda la imagen
      saveImg();
    }).css({
      //pisamos left con la posicion que calculamos (misma pos horizontal que el otro boton, esta un poco mas abajo)
      left: positionCloseImg
    }).appendTo('body');

  }
  

  //funcion para cerrar la imagen
  function removeModal() {
    //sacamos el div que habiamos puesto
    fullScreenImg.remove();
    //si los botones existen (los creamos), los sacamos tambien
    if(btnCloseImg && btnSaveImg) {
      btnCloseImg.remove();
      btnSaveImg.remove();
    }
    
    $('body').off('keyup.modal-close');
  }

  //funcion para guardar el poster que abrimos
  function saveImg(){
    //creamos un a con el href a la imagen, le fijamos atributo download y automaticamente le damos click. inmediatamente despues borramos el a creado
    var link = document.createElement('a');
        link.href = src;
        link.download = 'Poster.jpg';
        document.body.appendChild(link);
        link.click();    
        document.body.removeChild(link);
  }

  //al cambiar de tamaño, vuelvo a posicionar los botones de cerrar y guardar
  $(window).on('resize', function(){
    docWidth = $(window).width();
    docHeight = $(window).height();
    anchoImg = docHeight * 1100 / 1700;
    margenImg = (docWidth - anchoImg) / 2;
    positionCloseImg = anchoImg + margenImg + 15;

    $(".btnCloseImg").css({
      left: positionCloseImg
    })
    $(".btnSaveImg").css({
      left: positionCloseImg
    })
  })
});



//Formulario

function printError(elemId, errorMessage) {
  document.getElementById(elemId).innerHTML = errorMessage;
}

function validateForm() {

// cantidad caracteres: recorro el array para ver si la longitud es correcta, limito tambien la longitud de caracteres

  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var email = document.getElementById("email").value;
  var regex = /^[a-zA-Z\s]+$/;  
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var nombreError = apellidoError  = emailError = true;

  // Validacion del nombre
  if (nombre == "") {
      
      printError("nombreError", "Ingrese un nombre");
      document.getElementById("nombre").style.color = 'red';
      document.getElementById("nombreError").style.color = 'red';
             
  } else {
      if (regex.test(nombre) === false) {
         
          printError("nombreError", "Ingrese un nombre valido");
          document.getElementById("nombre").style.color = 'red';
          document.getElementById("nombreError").style.color = 'red';
         
         
      } else {
          printError("nombreError", "");
          nombreError = false;
          document.getElementById("nombre").style.color = '#45d07d';
          
      }
  }

  // Validacion del apellido
  if (apellido == "") {
      printError("apellidoError", "Ingrese un apellido")
      document.getElementById("apellido").style.color = 'red';
      document.getElementById("apellidoError").style.color = 'red';
  } else {              
      if (regex.test(apellido) === false) {
          printError("apellidoError", "Ingrese un apellido valido");
          document.getElementById("apellido").style.color = 'red';
          document.getElementById("apellidoError").style.color = 'red';
      } else {
          printError("apellidoError", "");
          apellidoError = false;
          document.getElementById("apellido").style.color = '#45d07d';
      }
  }

  // Validacion del email
  if (email == "") {
      printError("emailError", "Ingrese un email")
      document.getElementById("emailError").style.color = 'red';
      
  } else {              
      if (emailRegex.test(email) === false) {
          printError("emailError", "Ingrese un email valido");
          document.getElementById("emailError").style.color = 'red';           
      } else {
          emailError = false;    
          printError("emailError", "");
          document.getElementById("email").style.color = '#45d07d';
      }
  }


  if (nombreError || apellidoError ||emailError) {
      return false;
  } else {
      // Aca se valido correctamente el form
      // Aca se manda mail
      alert("Se ha enviando el formulario correctamente")
      return true;
  }
}


var cardTrivia = 0;
var cantidadTrivia = 0;
var actualTrivia = 0;

//guardamos las respuestas correctas en un array, en orden
var correctas = ["c","d","b", "a", "b", "d", "b", "a", "c", "a"];

var puntos = 0;

$(document).ready(function(){
  //guardamos en una variable todas las trivias y en otra la cantidad
  cardTrivia = document.querySelectorAll(".cardTrivia");
  cantidadTrivia = cardTrivia.length;

  
  //si cantidadTrivia no es 0
  if(cantidadTrivia){
    cardTrivia.forEach(e => {
      //para cada cardTrivia la oculto
      e.style.display = 'none';
    })
    //muestro la primera cardTrivia
    cardTrivia[0].style.display = "flex";
    //oculto la cardResultado
    document.querySelector(".cardResultado").style.display = 'none';
  }
});

function siguienteTrivia () {
  //primero valido si hay algo marcado
  if(isSelected()){
    //partiendo de la base que hay algo seleccionado, me fijo que opcion es, con el primer caracter del id
    var selected = cardTrivia[actualTrivia].querySelector('input[name="answer"]:checked').id.slice(0,1);

    //sumo puntos si la seleccionada es la correcto
    if(selected == correctas[actualTrivia]){
      puntos++;
    }

    
    if(cantidadTrivia > actualTrivia + 1){
      //mientras siga habiendo mas preguntas, muestro la siguiente
      cardTrivia[actualTrivia].style.display = 'none';
      cardTrivia[actualTrivia+1].style.display = 'flex';
      actualTrivia++;
    }
    else{
      //si no hay mas preguntas, muestro la cardResultado, y actualizo el puntaje
      document.getElementById("resultadoFinal").innerHTML = puntos + "/" + cantidadTrivia;
      cardTrivia[actualTrivia].style.display = 'none';
      document.querySelector(".cardResultado").style.display = 'flex';
    }

  
  }
  else{
    //si no hay nada seleccionado
    alert("Elegí una opción para continuar")
  }
    
}

function isSelected(){
  //chequeo si hay algo seleccionado, haciendo query selector desde la card actual
  if(cardTrivia[actualTrivia].querySelector('input[name="answer"]:checked')){
    return true;
  }
  return false;
}

function jugarNuevamente(){
  //para jugar nuevamente, reinicio puntos y posicion a 0, y vuelvo a ocultar todo salvo la primera card
  document.querySelector(".cardResultado").style.display = 'none';
  cardTrivia.forEach(e => {
    e.style.display = 'none';
  })
  cardTrivia[0].style.display = "flex";
  puntos = 0;
  actualTrivia = 0;
}

// Esta aplicación es un juego de preguntas y respuestas sobre cine. 
// El objetivo es, ante dos películas, responder cuál es la más reciente. 
// El juego finaliza cuando se responde de manera incorrecta. 
// El puntaje es la sumatoria de las respuestas correctas antes de este error. Cada respuesta correcta suma 10 puntos. Cada pedido de ayuda resta 5 puntos. 

//Ranking de puntos
var ranking = [
    {nombre: "Jorge", apellido: "Fernández", puntos: 120 },  
    {nombre: "Romina", apellido: "Sanabria", puntos: 85 },
    {nombre: "Cristian", apellido: "Portillo", puntos: 70 },
    {nombre: "Laura", apellido: "Santos", puntos: 30 },
    {nombre: "Quique", apellido: "Acuña", puntos: 150 }
]


// Consulta la API de películas
const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch ('https://api.themoviedb.org/3/list/3673?api_key=7e3111bbd212965105f6b85a02ee82af');

//Constata que la respuesta sea afirmativa
        if(respuesta.status === 200){
//Baja a la const datos la información del JSON
            const datos = await respuesta.json();

//Crea el array de películas 
            const peliculas = datos.items;

//Crea dos números aleatorios para seleccionar dentro del array de películas
            var aleatorio = Math.floor(Math.random() *    peliculas.length)
            var aleatorio2 = Math.floor(Math.random() *    peliculas.length)

//Crea el objeto peli1 y peli2
            peli1 = {titulo: peliculas[aleatorio].title, fecha: peliculas[aleatorio].release_date, id: peliculas[aleatorio].id, poster: peliculas[aleatorio].poster_path}
            peli2 = {titulo: peliculas[aleatorio2].title, fecha: peliculas[aleatorio2].release_date, id: peliculas[aleatorio2].id, poster: peliculas[aleatorio2].poster_path}

//Transforma el dato de fecha para que sea comparable
            date1 = new Date(peli1.fecha);
            date2 = new Date(peli2.fecha);

//Transforma el dato de fecha en formato mostrable
            fecha1 = date1.toLocaleDateString();
            fecha2 = date2.toLocaleDateString();

// Lleva al HTML las opciones de películas del juego
            $("#pelicula1").append('<div id="op1" class="col-auto"><img src="https://image.tmdb.org/t/p/w500/' + peli1.poster + '" class="card-img-top" alt="' + peli1.titulo +'" value="action"><button id="boton1" value="action" class="btn btn-primary w-50">' + peli1.titulo + '</button></div>');
            $("#pelicula2").append('<div id="op2" class="col-auto"><img src="https://image.tmdb.org/t/p/w500/' + peli2.poster + '" class="card-img-top" alt="' + peli2.titulo +'" value="action"><button id="boton2" value="action" class="btn btn-primary w-50">' + peli2.titulo + '</button></div>');
                
// Comprobaciones en caso de que la API no responda correctamente
        } else if(respuesta.status === 401){
            console.log('Pusiste mal la llave')
        } else if(respuesta.status === 404){
            console.log('La película no existe')
        } else {
            console.log('Ups, hay un error')
        }
    } catch(error){
        console.log(error);
    }

// Crea el botón para pedir pistas
    $("#cajaPista").append('<button id="pista" class="btn btn-warning m-5">Pedir una pista (resta 5 puntos)</button>');

//Evento por click en botón de pistas
    $("#pista").on("click", pista);

//Función de pista
    function pista(){
        $("#pista").remove();
        $("#cajaPista").append("<button id='ayudas' class='btn btn-warning m-5' style='display:none'>La película " + peli1.titulo + " se estrenó el " + fecha1 + "</button>");
        $("#ayudas").fadeIn();
        $(".pantalla").append("<div class='avisoPista' style='display:none'><p class='textoAvisoPista'>¡Perdiste 5 puntos!</p></div>");
        $(".avisoPista").fadeIn(400)
                        .delay(400)
                        .fadeOut(400);
        puntaje = puntaje - 5;
        cantPistas = cantPistas + 1;
}

}
//Ejecuta la función principal
cargarPeliculas()


// Creo la variable puntaje para hacer seguimiento de la puntuación del jugador. También el contador de respuestas correctas y de pistas solicitadas. 
puntaje = 0;
cantPistas = 0;
cantRespuestas = 0;

//Analiza si la respuesta fue correcta en caso de elegir la película 1. 
//Si es correcto suma un punto, borra las películas sobre las que ya se respondió y propone otras. 
// Si es incorrecto borra las películas, borra el elemento de "pistas" y presenta la pantalla de final de juego que muestra puntaje y ofrece jugar de nuevo.
function respuesta1(){
		if(date1 > date2){
            $(".pantalla").append("<div class='correcto alignt-items-center' style='display: none; position: absolute; top:0; padding: 10px'><p class='textoCorrecto'>¡Correcto!<br>+10 puntos</p></div>");
            $(".correcto").fadeIn(300)
                          .delay(600)                
                          .fadeOut(100);
            $("#cajaPista #ayudas").remove()
            $("#cajaPista #pista").remove()
            setTimeout(function (){ 
            $(".correcto").fadeOut();
            puntaje = puntaje + 10;
            cantRespuestas = cantRespuestas + 1;
            borrarPeliculas();    
            cargarPeliculas();
        }, 700);
        } else{
            $(".pantalla").append("<div class='incorrecto alignt-items-center' style='display: none; position: absolute; top:0; padding: 10px'><p class='textoIncorrecto'>¡Incorrecto!</p></div>");
            $(".incorrecto").fadeIn(300)
                            .delay(600)                
                            .fadeOut(100);
            $("#cajaPista #ayudas").remove()
            $("#cajaPista #pista").remove()
            setTimeout(function (){ 
            $(".incorrecto").fadeOut();
            borrarPeliculas();
            finaldeJuego();
        }, 700);
        }
}

//Analiza si la respuesta fue correcta en caso de elegir la película 2. 
//Si es correcto suma un punto, borra las películas sobre las que ya se respondió y propone otras. 
// Si es incorrecto borra las películas, borra el elemento de "pistas" y presenta la pantalla de final de juego que muestra puntaje y ofrece jugar de nuevo.
function respuesta2(){
	    if(date2 > date1){
            $(".pantalla").append("<div class='correcto alignt-items-center' style='display: none; position: absolute; top:0; padding: 10px'><p class='textoCorrecto'>¡Correcto!<br>+10 puntos</p></div>");
            $(".correcto").fadeIn(300)
                          .delay(600)                
                          .fadeOut(100);
            $("#cajaPista #ayudas").remove()
            $("#cajaPista #pista").remove()
            setTimeout(function (){ 
            $(".correcto").fadeOut();
            puntaje = puntaje + 10;
            cantRespuestas = cantRespuestas + 1;
            borrarPeliculas();    
            cargarPeliculas();
        }, 700);
        } else{
            $(".pantalla").append("<div class='incorrecto alignt-items-center' style='display: none; position: absolute; top:0; padding: 10px'><p class='textoIncorrecto'>¡Incorrecto!</p></div>");
            $(".incorrecto").fadeIn(300)
                            .delay(600)                
                            .fadeOut(100);
            $("#cajaPista #ayudas").remove()
            $("#cajaPista #pista").remove()
            setTimeout(function (){ 
            $(".incorrecto").fadeOut();
            borrarPeliculas();
            finaldeJuego();
        }, 700);
        }
}

// EventListener para que ejecute la función de respuesta al hacer clic en una de las películas
$("#pelicula1").on("click", respuesta1);
$("#pelicula2").on("click", respuesta2);

//Función de borrado de películas para que cambien tras una respuesta
function borrarPeliculas(){
    $("#pelicula1 #op1").remove()
    $("#pelicula2 #op2").remove()
}

//Función que ejecuta la pantalla al finalizar el juego
function finaldeJuego(){
    $("#cajaPista #ayudas").fadeOut();
    $("#principal").append("<div class='gameOver'><div class='bg-danger mb-2 rounded w-100 p-5'><h2>Juego terminado</h2><h5>" + peli1.titulo + " se lanzó el " + fecha1 + "</h5><h5>" + peli2.titulo + " se lanzó el " + fecha2  + "</h5></div><div class='bg-secondary rounded w-100 p-5 text-white'><h5> Tu puntuación final es " + puntaje + " puntos. </h5><h5>Respuestas correctas: " + cantRespuestas + ".<br>Pistas solicitadas: " + cantPistas + ".</h5></div><button value='action' onclick='window.location.reload()' class='btn btn-primary m-5' style='width: 40%'>JUGAR DE NUEVO</button></div>");
    $("#guardarRanking").append("<div class='gameOver'><button value='action' id='newRanking' class='btn btn-secondary m-2' style='width: 50%'>GUARDAR PUNTAJE</button></div>");
    $("#verRanking2").append("<div class='gameOver'><button value='action' id='viewRanking' class='btn btn-secondary m-2' style='width: 50%'>VER RANKING</button></div>");
    $(".gameOver").fadeIn(3000)
}

// Función para guardar un nuevo ranking
$("#guardarRanking").on("click", nuevoRanking);
function nuevoRanking(){
    newNombre = prompt("Tu nombre: ");
    newApellido = prompt("Tu apellido: ");
    ranking.push({nombre: newNombre, apellido: newApellido, puntos: puntaje});
    $("#newRanking").fadeOut();
}

// Función para visualizar ranking
$("#verRanking2").on("click", averRanking);
function averRanking(){
    ranking.sort(function (a, b){
        return (b.puntos - a.puntos)
    })
    for (const puestos of ranking) {
    $("#listadoranking").append((puestos.nombre) + " " + (puestos.apellido) + ": " + (puestos.puntos) + " puntos. <hr>");
    $("#viewRanking").fadeOut();
    $("#newRanking").fadeOut();
    }
    }
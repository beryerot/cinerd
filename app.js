//Esta aplicación es un juego de preguntas y respuestas sobre cine. 
// El objetivo es, ante dos películas, responder cuál es la más reciente. 
// El juego finaliza cuando se responde de manera incorrecta. 
// El puntaje es la sumatoria de las respuestas correctas antes de este error.

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
            var aleatorio = Math.floor(Math.random() *    409)
            var aleatorio2 = Math.floor(Math.random() *    409)


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
            opcion1 = document.createElement("div");
            opcion1.innerHTML = '<div class="col-auto"><img src="https://image.tmdb.org/t/p/w500/' + peli1.poster + '" class="card-img-top" alt="' + peli1.titulo +'" value="action"><button id="boton1" value="action" class="btn btn-primary w-100">' + peli1.titulo + '</button></div>';
            opcion1.className = "row"; "justify-content-center"
            pelicula1 = document.getElementById("pelicula1")
            pelicula1.appendChild(opcion1);

            opcion2 = document.createElement("div");
            opcion2.className = "row"
            opcion2.innerHTML = '<div class="col-auto"><img src="https://image.tmdb.org/t/p/w500/' + peli2.poster + '" class="card-img-top" alt="' + peli2.titulo +'" value="action"><button id="boton2" value="action" class="btn btn-primary w-100">' + peli2.titulo + '</button></div>';
            pelicula2 = document.getElementById("pelicula2")
            pelicula2.appendChild(opcion2);
                

            

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

}

//Ejecuta la función principal
cargarPeliculas()

//Función de borrado de películas para que cambien tras una respuesta
function borrarPeliculas(){
pelicula1.removeChild(opcion1);
pelicula2.removeChild(opcion2);
}

//Función que ejecuta la pantalla al finalizar el juego
function finaldeJuego(){
    final = document.createElement("div");
    final.className = "row"
    final.innerHTML = "<div class='bg-danger m-5 w-75 p-5'><h3>Incorrecto  </h3><h5>" + peli1.titulo + " se lanzó el " + fecha1 + "</h5><h5>" + peli2.titulo + " se lanzó el " + fecha2  + "</h5></div><div class='bg-secondary m-5 w-75 p-5 text-white'><h5> Tu puntaje es: " + puntaje + "</div></h5><button value='action' onclick='window.location.reload()' class='btn btn-primary m-5' style='width: 40%'>JUGAR DE NUEVO</button>";
    principal = document.getElementById("principal")
    principal.appendChild(final);
    rank = document.createElement("div");
    rank.className = "row"
    rank.innerHTML = "<button value='action' id='newRanking' class='btn btn-secondary m-2' style='width: 50%'>GUARDAR PUNTAJE</button>'";
    rank2 = document.getElementById("guardarRanking")
    rank2.appendChild(rank);
    verRank = document.createElement("div");
    verRank.className = "row"
    verRank.innerHTML = "<button value='action' class='btn btn-secondary m-2' style='width: 50%'>VER RANKING</button>'";
    verRank2 = document.getElementById("verRanking2")
    verRank2.appendChild(verRank);       
}
// Creo la variable puntaje para hacer seguimiento de la puntuación del jugador.
puntaje = 0;

//Analiza si la respuesta fue correcta en caso de elegir la película 1. 
//Si es correcto suma un punto, borra las películas sobre las que ya se respondió y propone otras. 
// Si es incorrecto borra las películas, borra el elemento de "pistas" y presenta la pantalla de final de juego que muestra puntaje y ofrece jugar de nuevo.
function respuesta1(){
		if(date1 > date2){
            alert("¡Correcto!");
            puntaje = puntaje + 1;
            borrarPeliculas();
            cargarPeliculas();
        } else{
        borrarPeliculas();
        cajapista.removeChild(pista1);
        finaldeJuego();
        ;}
}

//Analiza si la respuesta fue correcta en caso de elegir la película 1. 
//Si es correcto suma un punto, borra las películas sobre las que ya se respondió y propone otras. 
// Si es incorrecto borra las películas, borra el elemento de "pistas" y presenta la pantalla de final de juego que muestra puntaje y ofrece jugar de nuevo.
function respuesta2(){
	    if(date2 > date1){
		alert("¡Correcto!");
        puntaje = puntaje + 1
		borrarPeliculas();
        cargarPeliculas();
	    } else{
		borrarPeliculas();
        cajapista.removeChild(pista1);
        finaldeJuego();
        ;}
}

// EventListener para que ejecute la función de respuesta al hacer clic en una de las películas
pelicula1.addEventListener("click", respuesta1);
pelicula2.addEventListener("click", respuesta2);

//Función de pista
function pista(){
    alert("La película " + peli1.titulo + "se estrenó el " + fecha1)};

//Evento por click en botón de pistas
pista1 = document.getElementById("pista")
cajapista = document.getElementById("cajaPista")
pista1.addEventListener("click", pista);

//Ranking de puntos

const ranking = [
                {nombre: "Jorge", apellido: "Fernández", puntos: 12 },  
                {nombre: "Romina", apellido: "Sanabria", puntos: 8 },
                {nombre: "Cristian", apellido: "Portillo", puntos: 7 },
                {nombre: "Laura", apellido: "Santos", puntos: 16 },
                {nombre: "Quique", apellido: "Acuña", puntos: 23 }
]
const jsonRanking = JSON.stringify(ranking);

newRanking = document.getElementById("guardarRanking")
newRanking.addEventListener("click", nuevoRanking);

function nuevoRanking(){
    newNombre = prompt("Tu nombre: ")
    newApellido = prompt("Tu apellido: ")
    ranking.push({nombre: newNombre, apellido: newApellido, puntos: puntaje})
    rank2.removeChild(rank)
}


testrank = document.getElementById("verRanking2")
testrank.addEventListener("click", averRanking);

function averRanking(){
    ranking.sort(function (a, b){
        return (b.puntos - a.puntos)
    })
    for (const puestos of ranking) {
    listadorank = document.createElement("li");
    listadorank.innerHTML = (puestos.nombre) + " " + (puestos.apellido) + ": " + (puestos.puntos) + " puntos.";
    listadorank2 = document.getElementById("listadoranking")
    listadorank2.appendChild(listadorank);
    }
    verRank2.removeChild(verRank)
    }


/* var nombre = document.getElementById("nombre").value;
var apellido = document.getElementById("apellido").value;

nuevoRanking()
console.log(ranking)
console.log(jsonRanking)
console.log(nombre)
console.log(apellido)
 */
import data from './data/pokemon/pokemon.js';

//Cargar los botones con la referencia de las tarjetas//

document.addEventListener("DOMContentLoaded", function () {
  const botonJohto = document.getElementById("mostrar-tarjetas-johto");
  const botonKanto = document.getElementById("mostrar-tarjetas-kanto");
  const tarjetas = document.getElementById("tarjetas");
  const inicio = document.querySelector(".inicio");

  const longitudKanto = 151;
  const longitudJohto = 252;

  // Función para cargar los Pokémon de Kanto
  function cargarPokemonesKanto() {
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";

    // Cargar los pokemons de Kanto
    for (let i = 0; i < longitudKanto; i++) {
      const img = document.createElement("img");
      img.src = data.pokemon[i].img;
      tarjetas.appendChild(img);
    }
// Mostrar el botón "return"
    document.getElementById("return").style.display = "block";
    
    // Mostrar las tarjetas y ocultar el inicio
    tarjetas.style.display = "block";
    inicio.style.display = "none";
  }
   
  // Función para cargar los Pokémon de Johto
  function cargarPokemonesJohto() {
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";

    // Cargar los pokemons de Johto
    for (let i = 152; i < longitudJohto; i++) {
      // Creamos el elemento "img" de HTML, le asignamos su url obtenida del data y lo agregamos al index.html
      const img = document.createElement("img");
      img.src = data.pokemon[i].img;
      tarjetas.appendChild(img);
    }

    // Mostrar las tarjetas y ocultar el inicio
    tarjetas.style.display = "block";
    inicio.style.display = "none";
  }

  // Agregar evento de clic para el botón de Johto
  botonJohto.addEventListener("click", cargarPokemonesJohto);

  // Agregar evento de clic para el botón de Kanto
  botonKanto.addEventListener("click", cargarPokemonesKanto);
});
//  import { example } from './data.js';
import data from './data/pokemon/pokemon.js';
//console.log(example, data);

//const longitudArray = data.pokemon.length;
/*const longitudKanto = 151;
const longitudJohto = 252;

//Cargar los pokemons de Kanto
//Creamos el elemento "img" de HTML, le asignamos su url obtenida del data y lo agregamos al index.html
for(let i = 0; i<longitudKanto; i++){
  const img = document.createElement("img");
  img.src = data.pokemon[i].img;  
  document.getElementById("tarjetas").appendChild(img);
}

//Cargar los pokemons de Johto
for(let j = 152; j<longitudJohto; j++){
  //Creamos el elemento "img" de HTML, le asignamos su url obtenida del data y lo agregamos al index.html
  const img = document.createElement("img");
  img.src = data.pokemon[j].img;
  document.getElementById("tarjetas").appendChild(img);
}

/*for(let i = 0; i<longitudArray; i++){
  //console.log(data.pokemon[i].name);
  const numeroPkn = "No. " + data.pokemon[i].num;
  const nombrePkn = (data.pokemon[i].name).toUpperCase();
  const pesoAltPkn = "Altura: " + (data.pokemon[i].size.height) + " " + "Peso: " + (data.pokemon[i].size.weight);
  tarjeta.innerHTML += `<picture><img src = ${data.pokemon[i].img}><figcaption>${numeroPkn}<br>${nombrePkn}</br><br>${pesoAltPkn}</br></figcaption></picture>`
}*/

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



  

  
  









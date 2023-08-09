//  import { example } from './data.js';
import data from './data/pokemon/pokemon.js';
//console.log(example, data);

//const longitudArray = data.pokemon.length;
const longitudKanto = 151;
const longitudJohto = 252;

//Cargar los pokemons de Kanto
//Creamos el elemento "img" de HTML, le asignamos su url obtenida del data y lo agregamos al index.html
for(let i = 0; i<longitudKanto; i++){
  const img = document.createElement("img");
  img.src = data.pokemon[i].img;  
  document.getElementById("tarjetas").appendChild(img);
}

//Cargar los pokemons de Johto
/*for(let j = 152; j<longitudJohto; j++){
  //Creamos el elemento "img" de HTML, le asignamos su url obtenida del data y lo agregamos al index.html
  const img = document.createElement("img");
  img.src = data.pokemon[j].img;
  document.getElementById("tarjetas").appendChild(img);
}*/

/*for(let i = 0; i<longitudArray; i++){
  //console.log(data.pokemon[i].name);
  const numeroPkn = "No. " + data.pokemon[i].num;
  const nombrePkn = (data.pokemon[i].name).toUpperCase();
  const pesoAltPkn = "Altura: " + (data.pokemon[i].size.height) + " " + "Peso: " + (data.pokemon[i].size.weight);
  tarjeta.innerHTML += `<picture><img src = ${data.pokemon[i].img}><figcaption>${numeroPkn}<br>${nombrePkn}</br><br>${pesoAltPkn}</br></figcaption></picture>`
}*/

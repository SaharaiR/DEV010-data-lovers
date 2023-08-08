//  import { example } from './data.js';
import data from './data/pokemon/pokemon.js';
//console.log(example, data);

/*Primero cargar información general del dataset */
const contenedor = document.querySelector('.contenedorFlex');
for(let i = 0; i<data.pokemon.length; i++){
  //console.log(data.pokemon[i].name);
  contenedor.innerHTML += `<figure><img src = ${data.pokemon[i].img}><figcaption>${data.pokemon[i].name}</figcaption></figure>`
}

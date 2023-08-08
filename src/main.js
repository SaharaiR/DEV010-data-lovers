//  import { example } from './data.js';
import data from './data/pokemon/pokemon.js';
//console.log(example, data);

/*Primero cargar información general del dataset */
const contenedor = document.querySelector('.contenedorFlex');
for(let i = 0; i<data.pokemon.length; i++){
  //console.log(data.pokemon[i].name);
  const numeroPkn = "No. " + data.pokemon[i].num;
  const nombrePkn = (data.pokemon[i].name).toUpperCase();
  const pesoAltPkn = "Altura: " + (data.pokemon[i].size.height) + " " + "Peso: " + (data.pokemon[i].size.weight);
  contenedor.innerHTML += `<figure><img src = ${data.pokemon[i].img}><figcaption>${numeroPkn}<br>${nombrePkn}</br><br>${pesoAltPkn}</br></figcaption></figure>`
}

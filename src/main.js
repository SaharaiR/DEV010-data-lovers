import data from './data/pokemon/pokemon.js';

const pokemonsKanto = 151;//donde termina
const pokemonsJohto = 151;//donde empieza
const tarjetas = document.getElementById("tarjetas"); //el div dónde se pondrán las tarjetas
const tarjetaPorPagina = 25; //definir cuantas tarjetas se presentaran por pagina el grid
let numeroPagina = 1; //llevar el conteo de páginas
//asignamos la referencia a los botones
const btnSiguiente = document.getElementById("btnSiguiente");
const btnAnterior = document.getElementById("btnAnterior");
//escuchamos el evento para realizar el cambio de paginas en las funciones correspondientes
btnSiguiente.addEventListener("click", pagSiguiente); 
btnAnterior.addEventListener("click", pagAnterior);
//funcion para cargar las paginas
function muestraPagina(pagina) {
  //limpiamos cada vez que entra, para mostrar informacion nueva
  tarjetas.innerHTML = "";
  //calculamos los limites del for para la region Kanto
  /*pagina - 1 => es para iniciar en 0, y para saber en que pagina anterior se quedo 
  se multiplica por la tarjetaPorPagina para saber en qué índice se quedó*/
  /*en la de fin, se obtiene un minimo cercano para poner presentar el ultimo pokemon que queda
  y no presente espacios para pokemons que no hay o se pase a los de region de Johto*/
  const inicio = (pagina - 1) * tarjetaPorPagina;
  const fin = Math.min(inicio + tarjetaPorPagina, pokemonsKanto);
  //calculamos los limites del for para la region Johto
  /*En inicio, igual para saber en que pagina quedo y ademas del pokemon empezara a presentar y
  en el fin, pues hasta que se acabe :P */
  
  /*const inicio = pokemonsJohto + (pagina - 1) * tarjetaPorPagina;
  const fin = inicio + tarjetaPorPagina;*/

  /*agregamos los datos creando las etiquetas HTML para presentar la informacion que deseamos al
  frente*/

  //<picture><img src = ${data.pokemon[i].img}><figcaption>
  //${numeroPkn}<br>${nombrePkn}</br><br>${pesoAltPkn}</br></figcaption></picture>
  for(let i = inicio; i < fin; i++) {
    const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
    const nombrePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
    const altPkn = document.createTextNode("Altura: " + (data.pokemon[i].size.height));
    const pesoPkn = document.createTextNode("Peso: " + (data.pokemon[i].size.weight));
    const picture = document.createElement('picture');
    picture.classList = 'pokemon-card';
    const img = document.createElement('img');
    img.src = data.pokemon[i].img;
    picture.appendChild(img);
    const figCaption = document.createElement('figcaption');
    figCaption.classList = 'textoFrente';
    figCaption.appendChild(numPkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(nombrePkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(altPkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(pesoPkn);
    picture.appendChild(figCaption);
    tarjetas.appendChild(picture);
    /*const img = document.createElement("img");
    img.classList = 'pokemon-card';
    img.src = data.pokemon[i].img;
    tarjetas.appendChild(img);*/
  }
}
muestraPagina(numeroPagina); //mandamos el numero de pagina
//funcion para pagina siguiente
function pagSiguiente() {
  //sirve para limitar el numero de paginas para Kango son 151 pokemons y se necesitan 6 paginas
  const numPokemonsKanto = 151; 
  //para Johto son 100 pokemons a mostrar y se necesitan 4 paginas
  const numPokemonsJohto = 100;
  /*hacemos un math.ceil que es el entero mas cercano para calcular los numeros de paginas a llenar
  si llega a ese limite, ya no aumenta paginas para no presentar paginas en blanco*/
  if(numeroPagina === Math.ceil(numPokemonsKanto / tarjetaPorPagina)){
  //if(numeroPagina === Math.ceil(numPokemonsJohto / tarjetaPorPagina)){
    return;
  }
  //sino aumenta el numero de pagina
  numeroPagina++;
  muestraPagina(numeroPagina);
}
//funcion para pagina anterior
function pagAnterior() {
  //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
  if(numeroPagina === 1){
    return;
  }
  numeroPagina--; 
  muestraPagina(numeroPagina);
}

/*const img = document.createElement("img");
  img.classList ='pokemon-card';
  img.src = data.pokemon[i].img;  
  document.getElementById("tarjetas").appendChild(img);*/
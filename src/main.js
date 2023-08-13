import data from './data/pokemon/pokemon.js';
document.addEventListener("DOMContentLoaded", function () {
  
  //Cargar los botones con la referencia de las tarjetas//
  const pokemonsKanto = 151;//donde termina
  const tarjetas = document.getElementById("tarjetas"); //el div dónde se pondrán las tarjetas
  const tarjetaPorPagina = 25; //definir cuantas tarjetas se presentaran por pagina el grid
  //asignamos la referencia a los botones
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnterior = document.getElementById("btnAnterior");
  const botonKanto = document.getElementById("mostrar-tarjetas-kanto");
  //const tarjetas = document.getElementById("tarjetas");
  const inicio = document.querySelector(".inicio");

  btnSiguiente.addEventListener("click", pagSiguiente); 
  btnAnterior.addEventListener("click", pagAnterior);
  let numeroPagina = 1; //llevar el conteo de páginas
  // Función para cargar los Pokémon de Kanto
  function cargarPokemonesKanto(pagina) {
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    
    const inicioIndice = (pagina - 1) * tarjetaPorPagina;
    const fin = Math.min(inicio + tarjetaPorPagina, pokemonsKanto);
    /*agregamos los datos creando las etiquetas HTML para presentar la informacion que deseamos al
    frente*/

    //<picture><img src = ${data.pokemon[i].img}><figcaption>
    //${numeroPkn}<br>${nombrePkn}</br><br>${pesoAltPkn}</br></figcaption></picture>
    for(let i = inicioIndice; i < fin; i++) {
      //console.log(data.pokemon[i].type);
      const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
      const nombrePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
      const altPkn = document.createTextNode("Height: " + (data.pokemon[i].size.height));
      const pesoPkn = document.createTextNode("Weight: " + (data.pokemon[i].size.weight));
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
    }  
    // Mostrar el botón "return"
    document.getElementById("return").style.display = "block";  
    // Mostrar las tarjetas y ocultar el inicio
    tarjetas.style.display = "block";
    inicio.style.display = "none";
  }
  //funcion para pagina anterior
  function pagAnterior() {
    //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
    if(numeroPagina === 1){
      return;
    }
    numeroPagina--; 
    //muestraPagina(numeroPagina);
    cargarPokemonesKanto(numeroPagina);
  }

  // Agregar evento de clic para el botón de Kanto
  botonKanto.addEventListener("click", cargarPokemonesKanto);
});
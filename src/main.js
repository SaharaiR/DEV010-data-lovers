import data from './data/pokemon/pokemon.js';
import dataFunction from './data.js';

document.addEventListener("DOMContentLoaded", function () {
  const botonKanto = document.getElementById("mostrar-tarjetas-kanto");
  const botonJohto = document.getElementById("mostrar-tarjetas-johto");
  const inicio = document.querySelector(".inicio");
  const tarjetas = document.getElementById("tarjetas"); //el div dónde se pondrán las tarjetas
  const marquesina = document.getElementById("marquesina");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnCambio = document.getElementById("cambioRegion");
  const pokemonsKanto = 151;//donde termina
  const pokemonsJohto = 151;
  const tarjetaPorPagina = 25; //definir cuantas tarjetas se presentaran por pagina el grid  
  const btnAsc = document.getElementById("btnAscendente");
  const btnDes = document.getElementById("btnDescendente");


  let numeroPagina = 1; //llevar el conteo de páginas*
  let region = "";
  let botonPresionado = ""; 
  let inicioFiltros = 0;
  let finFiltros = 0;

  botonKanto.addEventListener("click", function() {
    cargarPokemonesKanto(numeroPagina); 
  });
  botonJohto.addEventListener("click", function() {
    cargarPokemonesJohto(numeroPagina); 
  });

  btnSiguiente.addEventListener("click", pagSiguiente); 
  btnAnterior.addEventListener("click", pagAnterior);
  // Función para cargar los Pokémon de Kanto
  function cargarPokemonesKanto(pagina){
    marquesina.innerHTML = "Kanto Region";
    region = "kanto";
    inicio.style.display = "none";
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    //limitamos el inicio y el fin para esta region
    const inicioIndice = (pagina - 1) * tarjetaPorPagina;
    const fin = Math.min(inicioIndice + tarjetaPorPagina, pokemonsKanto);
    tarjetasFiltro(inicioIndice,fin);
    // Mostrar el botón "return"
    document.getElementById("cambioRegion").style.display = "block";  
    // Mostrar las tarjetas y ocultar el inicio
    document.getElementById("barraFiltros").style.display = "block";
    btnAnterior.style.display = "inline-block";
    btnSiguiente.style.display = "inline-block";
  }

  function cargarPokemonesJohto(pagina) {
    inicio.style.display = "none";
    marquesina.innerHTML = "Johto Region";
    region = "johto";
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    //limitamos para esta region
    const inicioIndice = pokemonsJohto + (pagina - 1) * tarjetaPorPagina;
    const fin = inicioIndice + tarjetaPorPagina;
    tarjetasFiltro(inicioIndice, fin);
    // Mostrar el botón "return"
    document.getElementById("cambioRegion").style.display = "block";  
    // Mostrar las tarjetas y ocultar el inicio
    document.getElementById("barraFiltros").style.display = "block";
    btnAnterior.style.display = "inline-block";
    btnSiguiente.style.display = "inline-block";
  }
  
  btnCambio.addEventListener("click", function(){
    numeroPagina = 1;
    if(region === "kanto"){
      cargarPokemonesJohto(numeroPagina);
    }else if(region === "johto"){
      cargarPokemonesKanto(numeroPagina);
    }
  })

  function pagSiguiente() {
    //sirve para limitar el numero de paginas para Kango son 151 pokemons y se necesitan 6 paginas
    const numPokemonsKanto = 151; 
    const numPokemonsJohto = 100;
    //para Johto son 100 pokemons a mostrar y se necesitan 4 paginas
    if(region === "kanto"){
      if(numeroPagina === Math.ceil(numPokemonsKanto / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      cargarPokemonesKanto(numeroPagina);
      aplicarFiltros(numeroPagina);
    }else if(region === "johto"){
      if(numeroPagina === Math.ceil(numPokemonsJohto / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      cargarPokemonesJohto(numeroPagina);
      aplicarFiltros(numeroPagina);
    }
  }
  //funcion para pagina anterior
  function pagAnterior() {
    //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
    if(numeroPagina === 1){
      return;
    }
    numeroPagina--; 
    //muestraPagina(numeroPagina);
    if(region === "kanto"){
      cargarPokemonesKanto(numeroPagina);
      aplicarFiltros(numeroPagina);
    }else if(region === "johto"){
      cargarPokemonesJohto(numeroPagina);
      aplicarFiltros(numeroPagina);
    }
  }

  btnAsc.addEventListener("click", function() {
    numeroPagina = 1;
    botonPresionado = "ascendente";
    aplicarFiltros(numeroPagina); 
  });
  btnDes.addEventListener("click", function() {
    numeroPagina = 1;
    botonPresionado = "descendente";
    aplicarFiltros(numeroPagina); 
  });

  function aplicarFiltros(pagina){
    switch(botonPresionado){
    case "ascendente":
      //presentarlos en forma ascendente en base al numero pokemon
      if(region === "kanto"){
        cargarPokemonesKanto(pagina);
      }else if(region === "johto"){
        cargarPokemonesJohto(pagina);
      }
      break;
    case "descendente":
      tarjetas.innerHTML = "";
      if(region === "kanto"){
        inicioFiltros = (pagina - 1) * tarjetaPorPagina;
        finFiltros = Math.min(inicioFiltros + tarjetaPorPagina, 151);
        tarjetasFiltro(inicioFiltros,finFiltros);
      }else if(region === "johto"){
        inicioFiltros = pokemonsJohto + (pagina - 1) * tarjetaPorPagina;
        finFiltros = inicioFiltros + tarjetaPorPagina;
        tarjetasFiltro(inicioFiltros, finFiltros);
      }
      break;
    } 
  }
  //});

  // main.js
  const filterGenerationSelect = document.getElementById("categoria2");
  const filtrarButton = document.getElementById("filtrar");
  const cardsDiv = document.getElementById("tarjetas"); 
  const typeSelect = document.getElementById("categoria1"); 
  const raritySelect = document.getElementById("categoria3");

  function createPokemonCard(pokemon) {
    const cardElement = document.createElement("div");
    cardElement.textContent = `${pokemon.num} - ${pokemon.name}`;
    return cardElement;
  }

  function displayResults(pokemons) {
    cardsDiv.innerHTML = "";

    for (const pokemon of pokemons) {
      const cardElement = createPokemonCard(pokemon);
      cardsDiv.appendChild(cardElement);
    }
  }

  filtrarButton.addEventListener("click", () => {
    const generationOption = filterGenerationSelect.value;
    const selectedType = typeSelect.value;
    const selectedRarity= raritySelect.value;
    // Llamar a la función de filtrado y pasar los argumentos necesarios
    const filteredByGeneration = dataFunction.filterGeneration(data.pokemon, generationOption);
    // Usar la función filterByType para filtrar los Pokémon por tipo
    const filteredByType = dataFunction.filterByType(data.pokemon, selectedType);
    // Mostrar los resultados filtrados en el DOM
    const filterByRarity = dataFunction.filterByRarity(data.pokemon,selectedRarity);
    //displayResults(filteredByType, filteredByGeneration , filterByRarity);

    console.log("Botón de filtro clickeado");
    console.log("Generación seleccionada:", generationOption);
    console.log("Tipo seleccionado:", selectedType);
    console.log("Indices", filteredByType);
    console.log("Generation:", filteredByGeneration);
    console.log("Rarity:",filterByRarity);
  });

  function tarjetasFiltro(inicioF, finF){
    if(botonPresionado === "descendente"){
      for(let i = finF - 1; i >= inicioF; i--) {
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
    }else{
      for(let i = inicioF; i < finF; i++) {
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
    }
  }
});
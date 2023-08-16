import data from './data/pokemon/pokemon.js';
import dataFunction from './data.js';

document.addEventListener("DOMContentLoaded", function () {
  //DECLARACIONES
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
  const filterGenerationSelect = document.getElementById("categoria2");
  const typeSelect = document.getElementById("categoria1"); 
  const raritySelect = document.getElementById("categoria3");
  const filtrarButton = document.getElementById("filtrar");
 
  let longArrayF, filterByRarity, filteredByGeneration, filteredByType;
  let numeroPagina = 1; //llevar el conteo de páginas*
  let kanto = false, johto = false;
  let botonPresionado = ""; 
  let inicioFiltros = 0;
  let finFiltros = 0;

  //EVENTOS
  botonKanto.addEventListener("click", function() {
    kanto = true;
    cargarPokemonesKanto(numeroPagina); 
  });
  botonJohto.addEventListener("click", function() {
    johto = true;
    cargarPokemonesJohto(numeroPagina); 
  });

  btnSiguiente.addEventListener("click", pagSiguiente); 
  btnAnterior.addEventListener("click", pagAnterior);

  btnAsc.addEventListener("click", function() {
    numeroPagina = 1;
    botonPresionado = "ascendente";
    ascendenteDescendente(numeroPagina); 
  });
  btnDes.addEventListener("click", function() {
    numeroPagina = 1;
    botonPresionado = "descendente";
    ascendenteDescendente(numeroPagina); 
  });

  btnCambio.addEventListener("click", function(){
    numeroPagina = 1;
    if(kanto){
      kanto = false;
      johto = true;
      cargarPokemonesJohto(numeroPagina);
    }else if(johto){
      johto = false;
      kanto = true;
      cargarPokemonesKanto(numeroPagina);
    }
  })

  filtrarButton.addEventListener("click", () => {
    const generationOption = filterGenerationSelect.value;
    const selectedType = typeSelect.value;
    const selectedRarity= raritySelect.value;
    numeroPagina = 1;
    // Llamar a la función de filtrado y pasar los argumentos necesarios
    filteredByGeneration = dataFunction.filterGeneration(data.pokemon, generationOption);
    if(filteredByGeneration.length > 0){
      botonPresionado = "generacion";
      arraysFiltrados(numeroPagina, filteredByGeneration);
    }
    // Usar la función filterByType para filtrar los Pokémon por tipo
    filteredByType = dataFunction.filterByType(data.pokemon, selectedType);
    if(filteredByType.length > 0){
      botonPresionado = "tipo";
      arraysFiltrados(numeroPagina, filteredByType);
    }
    filterByRarity = dataFunction.filterByRarity(data.pokemon,selectedRarity);
    if(filterByRarity.length > 0){
      botonPresionado = "rareza";
      arraysFiltrados(numeroPagina, filterByRarity);
    }
  });

  //FUNCIONES
  function cargarPokemonesKanto(pagina){
    marquesina.innerHTML = "Kanto Region";
    inicio.style.display = "none";
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    //limitamos el inicio y el fin para esta region
    const inicioIndice = (pagina - 1) * tarjetaPorPagina;
    const fin = Math.min(inicioIndice + tarjetaPorPagina, pokemonsKanto);
    tarjetasRegion(inicioIndice,fin);
    //Mostrar los otros elementos
    document.getElementById("cambioRegion").style.display = "block";  
    document.getElementById("barraFiltros").style.display = "block";
    btnAnterior.style.display = "inline-block";
    btnSiguiente.style.display = "inline-block";
  }

  function cargarPokemonesJohto(pagina) {
    inicio.style.display = "none";
    marquesina.innerHTML = "Johto Region";
    // Limpiamos el contenido existente en las tarjetas
    tarjetas.innerHTML = "";
    //limitamos para esta region
    const inicioIndice = pokemonsJohto + (pagina - 1) * tarjetaPorPagina;
    const fin = inicioIndice + tarjetaPorPagina;
    tarjetasRegion(inicioIndice, fin);
    //Mostramos elmentos
    document.getElementById("cambioRegion").style.display = "block";  
    document.getElementById("barraFiltros").style.display = "block";
    btnAnterior.style.display = "inline-block";
    btnSiguiente.style.display = "inline-block";
  }

  function tarjetasRegion(inicioF, finF){
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

  function pagSiguiente() {
    //sirve para limitar el numero de paginas para Kango son 151 pokemons y se necesitan 6 paginas
    const numPokemonsKanto = 151; 
    const numPokemonsJohto = 100;
    //para Johto son 100 pokemons a mostrar y se necesitan 4 paginas
    //let numPokemons;
    if(kanto){
      if(numeroPagina === Math.ceil(numPokemonsKanto / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      cargarPokemonesKanto(numeroPagina);
    }
    if(johto){
      if(numeroPagina === Math.ceil(numPokemonsJohto / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      cargarPokemonesJohto(numeroPagina);
    }

    switch(botonPresionado){
    case "tipo":
      if(longArrayF > tarjetaPorPagina ||  numeroPagina === Math.ceil(longArrayF / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      arraysFiltrados(numeroPagina, filteredByType);
      break;
    case "generacion":
      if(numeroPagina === Math.ceil(longArrayF / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      arraysFiltrados(numeroPagina, filteredByGeneration);
      break;
    case "rareza":
      if(numeroPagina === Math.ceil(longArrayF / tarjetaPorPagina)){
        return;
      }
      numeroPagina++;
      arraysFiltrados(numeroPagina, filterByRarity);
      break;
    }
  }

  function pagAnterior() {
    //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
    if(numeroPagina === 1){
      return;
    }
    numeroPagina--;
    if(kanto){
      cargarPokemonesKanto(numeroPagina);
    }
    if(johto){
      cargarPokemonesJohto(numeroPagina);
    }
    switch(botonPresionado){
    case "tipo":
      numeroPagina--;
      arraysFiltrados(numeroPagina, filteredByType);
      break;
    case "generacion":
      numeroPagina--;
      arraysFiltrados(numeroPagina, filteredByGeneration);
      break;
    case "rareza":
      numeroPagina--;
      arraysFiltrados(numeroPagina, filterByRarity);
      break; 
    }
  }

  function ascendenteDescendente(pagina){
    switch(botonPresionado){
    case "ascendente":
      //presentarlos en forma ascendente en base al numero pokemon
      if(kanto){
        cargarPokemonesKanto(pagina);
      }else if(johto){
        cargarPokemonesJohto(pagina);
      }
      break;
    case "descendente":
      tarjetas.innerHTML = "";
      if(kanto){
        inicioFiltros = (pagina - 1) * tarjetaPorPagina;
        finFiltros = Math.min(inicioFiltros + tarjetaPorPagina, 151);
        tarjetasRegion(inicioFiltros,finFiltros);
      }else if(johto){
        inicioFiltros = pokemonsJohto + (pagina - 1) * tarjetaPorPagina;
        finFiltros = inicioFiltros + tarjetaPorPagina;
        tarjetasRegion(inicioFiltros, finFiltros);
      }
      break;
    }
  }

  function arraysFiltrados(pagina, arrayF){
    //console.log(botonPresionado);
    //marquesina.innerHTML = "";
    tarjetas.innerHTML = "";
    longArrayF = arrayF.length;
    const iFiltro = (pagina - 1) * tarjetaPorPagina;
    const fFiltro = Math.min(iFiltro + tarjetaPorPagina, arrayF.length);
    for(let i = iFiltro; i < fFiltro; i++) {
      const numPkn = document.createTextNode("No. " + arrayF[i].num);
      const nombrePkn = document.createTextNode((arrayF[i].name).toUpperCase());
      const altPkn = document.createTextNode("Height: " + (arrayF[i].size.height));
      const pesoPkn = document.createTextNode("Weight: " + (arrayF[i].size.weight));
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      img.src = arrayF[i].img;
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
});
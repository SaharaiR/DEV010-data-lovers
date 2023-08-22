import data from './data/pokemon/pokemon.js';
import dataFunction from './data.js';

document.addEventListener("DOMContentLoaded", function () {
  //DECLARACIONES
  const btnKanto = document.getElementById("showKantoCards");
  const btnJohto = document.getElementById("showJohtoCards");
  const begin = document.querySelector(".begin");
  const cards = document.getElementById("cards"); //el div dónde se pondrán las tarjetas
  const marquee = document.getElementById("marquee");
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");
  const btnChangeRegion = document.getElementById("changeRegion");
  const pokemonsKanto = 151;//donde termina
  const pokemonsJohto = 151;
  const cardPerPage = 25; //definir cuantas tarjetas se presentaran por pagina el grid  
  const btnAsc = document.getElementById("btnAscendent");
  const btnDes = document.getElementById("btnDescendent");
  const filterGenerationSelect = document.getElementById("category2");
  const typeSelect = document.getElementById("category1"); 
  const raritySelect = document.getElementById("category3");
  const btnFilter = document.getElementById("filter");
  const btnSearch = document.getElementById("search");
  const valueSearch = document.getElementById("valueSearch");
  const alerts = document.getElementById("alerts");
  const btnReset = document.getElementById("resetFilters");
 
  let longArrayF, filterByRarity, filteredByGeneration, filteredByType;//, filterCombine;
  let arrayDescendent, arraySearch;
  let numberPage = 1; //llevar el conteo de páginas*
  let kanto = false, johto = false;
  let btnPush = ""; 

  //EVENTOS
  btnKanto.addEventListener("click", function() {
    kanto = true;
    loadPkmKanto(numberPage); 
  });
  btnJohto.addEventListener("click", function() {
    johto = true;
    loadPkmJohto(numberPage); 
  });

  btnNext.addEventListener("click", nextPage); 
  btnPrev.addEventListener("click", previousPage);

  btnAsc.addEventListener("click", function() {
    numberPage = 1;
    kanto = false;
    johto = false;
    marquee.innerHTML = "Ascendent by pokemon number (ALL)";
    btnPush = "ascendent";
    filterArrays(numberPage, data.pokemon);
  });
  btnDes.addEventListener("click", function() {
    numberPage = 1;
    kanto = false;
    johto = false;
    marquee.innerHTML = "Descendent by pokemon number (ALL)";
    btnPush = "descendent";
    arrayDescendent = dataFunction.sortDescendent(data.pokemon);
    filterArrays(numberPage, arrayDescendent);
  });

  btnChangeRegion.addEventListener("click", function(){
    numberPage = 1;
    if(kanto){
      kanto = false;
      johto = true;
      loadPkmJohto(numberPage);
    }else if(johto){
      johto = false;
      kanto = true;
      loadPkmKanto(numberPage);
    }
  })

  btnFilter.addEventListener("click", () => {
    const generationOption = filterGenerationSelect.value;
    const selectedType = typeSelect.value;
    const selectedRarity= raritySelect.value;
    numberPage = 1;
    // Llamar a la función de filtrado y pasar los argumentos necesarios
    if(generationOption === "cero" && selectedType === "cero" && selectedRarity === "cero"){
      //no hay seleccionado nada
      alerts.innerHTML = "Please, select a filter...";
    }
    if(filteredByGeneration !== "cero"){
      marquee.innerHTML = "Generation: " + generationOption;
      filteredByGeneration = dataFunction.filterGeneration(data.pokemon, generationOption);
      btnPush = "generacion";
      filterArrays(numberPage, filteredByGeneration);
    }
    // Usar la función filterByType para filtrar los Pokémon por tipo
    if(selectedType !== "cero"){
      marquee.innerHTML = "Type: " + selectedType;
      filteredByType = dataFunction.filterByType(data.pokemon, selectedType);
      btnPush = "tipo";
      filterArrays(numberPage, filteredByType);
    }
    if(selectedRarity !== "cero"){
      marquee.innerHTML = "Rarity: " + selectedRarity;
      filterByRarity = dataFunction.filterByRarity(data.pokemon,selectedRarity);
      btnPush = "rareza";
      filterArrays(numberPage, filterByRarity);
    }
    /*filterCombine = dataFunction.filterCombine(data.pokemon, selectedRarity, selectedType, generationOption);
    console.log(filterCombine.length);
    if(filterCombine.length > 0){
      botonPresionado = "combine";
      arraysFiltrados(numeroPagina, filterCombine);
    }*/
  });
  
  btnSearch.addEventListener("click", () => {
    numberPage = 1;
    const numberOrName = valueSearch.value;
    //console.log(numberOrName);
    if(numberOrName === null){
      alerts.innerHTML = "Please write a pokemon name or a pokemon number";
    }else{
      if(!isNaN(numberOrName)){
        const numberPadded = String(numberOrName).padStart(3, '0');
        arraySearch = dataFunction.searching(data.pokemon, numberPadded);
      }else{
        arraySearch = dataFunction.searching(data.pokemon, numberOrName.toLowerCase());
      }     
      if(arraySearch === undefined){
        alerts.innerHTML = "Pokemon not found";
      }else{
        pokemonFound(arraySearch);
      }
    }
  });

  btnReset.addEventListener("click", () => {
    numberPage = 1;
    marquee.innerHTML = "ALL POKEMONS";
    kanto = false;
    johto = false;
    btnPush = "ascendent";
    filterArrays(numberPage, data.pokemon);
  });

  //FUNCIONES
  function loadPkmKanto(page){
    marquee.innerHTML = "Kanto Region";
    begin.style.display = "none";
    // Limpiamos el contenido existente en las tarjetas
    cards.innerHTML = "";
    //limitamos el inicio y el fin para esta region
    const indexBegin = (page - 1) * cardPerPage;
    const endIndex = Math.min(indexBegin + cardPerPage, pokemonsKanto);
    cardsByRegion(indexBegin,endIndex);
    //Mostrar los otros elementos
    document.getElementById("changeRegion").style.display = "block";  
    document.getElementById("filterBar").style.display = "block";
    btnPrev.style.display = "inline-block";
    btnNext.style.display = "inline-block";
  }

  function loadPkmJohto(page) {
    begin.style.display = "none";
    marquee.innerHTML = "Johto Region";
    // Limpiamos el contenido existente en las tarjetas
    cards.innerHTML = "";
    //limitamos para esta region
    const indexBegin = pokemonsJohto + (page - 1) * cardPerPage;
    const endIndex = indexBegin + cardPerPage;
    cardsByRegion(indexBegin, endIndex);
    //Mostramos elmentos
    document.getElementById("changeRegion").style.display = "block";  
    document.getElementById("filterBar").style.display = "block";
    btnPrev.style.display = "inline-block";
    btnNext.style.display = "inline-block";
  }

  function cardsByRegion(indexB, indexE){
    for(let i = indexB; i < indexE; i++) {
      //console.log(data.pokemon[i].type);
      const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
      const namePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
      const heightPkn = document.createTextNode("Height: " + (data.pokemon[i].size.height));
      const weightPkn = document.createTextNode("Weight: " + (data.pokemon[i].size.weight));
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      img.src = data.pokemon[i].img;
      picture.appendChild(img);
      const figCaption = document.createElement('figcaption');
      figCaption.classList = 'frontText';
      figCaption.appendChild(numPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(namePkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(heightPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(weightPkn);
      picture.appendChild(figCaption);
      cards.appendChild(picture);
    }
  }

  function nextPage() {
    //sirve para limitar el numero de paginas para Kango son 151 pokemons y se necesitan 6 paginas
    const numPokemonsKanto = 151; 
    const numPokemonsJohto = 100;
    //para Johto son 100 pokemons a mostrar y se necesitan 4 paginas
    //let numPokemons;
    if(kanto){
      if(numberPage === Math.ceil(numPokemonsKanto / cardPerPage)){
        return;
      }
      numberPage++;
      loadPkmKanto(numberPage);
    }
    if(johto){
      if(numberPage === Math.ceil(numPokemonsJohto / cardPerPage)){
        return;
      }
      numberPage++;
      loadPkmJohto(numberPage);
    }

    switch(btnPush){
    case "tipo":
      if(longArrayF > cardPerPage ||  numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, filteredByType);
      //arrayType(numeroPagina, filteredByType);
      break;
    case "generacion":
      if(numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, filteredByGeneration);
      //arrayGeneration(numeroPagina, filteredByGeneration);
      break;
    case "rareza":
      if(numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, filterByRarity);
      //arrayRarity(numeroPagina,filterByRarity);
      break;
    case "ascendent":
      if(numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, data.pokemon);
      break;
    case "descendent":
      if(numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage++;
      filterArrays(numberPage, arrayDescendent);
      break;
    }
  }

  function previousPage() {
    //si estan en la primera pagina y si se presiona el boton de anterior no mande a pagina en blanco
    if(numberPage === 1){
      return;
    }
    numberPage--;
    if(kanto){
      loadPkmKanto(numberPage);
    }
    if(johto){
      loadPkmJohto(numberPage);
    }
    switch(btnPush){
    case "tipo":
      numberPage--;
      filterArrays(numberPage, filteredByType);
      break;
    case "generacion":
      numberPage--;
      filterArrays(numberPage, filteredByGeneration);
      break;
    case "rareza":
      numberPage--;
      filterArrays(numberPage, filterByRarity);
      break; 
    case "ascendent":
      if(numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage--;
      filterArrays(numberPage, data.pokemon);
      break;
    case "descendent":
      if(numberPage === Math.ceil(longArrayF / cardPerPage)){
        return;
      }
      numberPage--;
      filterArrays(numberPage, arrayDescendent);
      break;
    }
  }

  function filterArrays(page, arrayF){
    cards.innerHTML = "";
    longArrayF = arrayF.length;
    const filterBegin = (page - 1) * cardPerPage;
    const filterEnd = Math.min(filterBegin + cardPerPage, arrayF.length);
    for(let i = filterBegin; i < filterEnd; i++) {
      const numPkn = document.createTextNode("No. " + arrayF[i].num);
      const namePkn = document.createTextNode((arrayF[i].name).toUpperCase());
      const heightPkn = document.createTextNode("Height: " + (arrayF[i].size.height));
      const weightPkn = document.createTextNode("Weight: " + (arrayF[i].size.weight));
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      img.src = arrayF[i].img;
      picture.appendChild(img);
      const figCaption = document.createElement('figcaption');
      figCaption.classList = 'frontText';
      figCaption.appendChild(numPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(namePkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(heightPkn);
      figCaption.appendChild(document.createElement('br'));
      figCaption.appendChild(weightPkn);
      picture.appendChild(figCaption);
      cards.appendChild(picture);
    }
  }

  function pokemonFound(arrayF){
    marquee.innerHTML = "Gotcha! " + arrayF.name.toUpperCase();
    cards.innerHTML = "";
    const numPkn = document.createTextNode("No. " + arrayF.num);
    const namePkn = document.createTextNode((arrayF.name).toUpperCase());
    const heightPkn = document.createTextNode("Height: " + (arrayF.size.height));
    const weightPkn = document.createTextNode("Weight: " + (arrayF.size.weight));
    const picture = document.createElement('picture');
    picture.classList = 'pokemon-card';
    const img = document.createElement('img');
    img.src = arrayF.img;
    picture.appendChild(img);
    const figCaption = document.createElement('figcaption');
    figCaption.classList = 'frontText';
    figCaption.appendChild(numPkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(namePkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(heightPkn);
    figCaption.appendChild(document.createElement('br'));
    figCaption.appendChild(weightPkn);
    picture.appendChild(figCaption);
    cards.appendChild(picture);
  }
 function createReverseContent([specialAttacks]) {
    const reverseContent = document.createElement('div');
    reverseContent.classList = 'reverse-content';

    specialAttacks.forEach(attack => {
      const attackName = document.createTextNode("Name: " + attack.name);
      const attackType = document.createTextNode("Type: " + attack.type);
      const attackBaseDamage = document.createTextNode("Base Damage: " + attack['base-damage']);
      const attackEnergy = document.createTextNode("Energy: " + attack.energy);
      const attackDuration = document.createTextNode("Move Duration: " + attack['move-duration-seg']);
      
      const attackInfo = document.createElement('div');
      attackInfo.classList = 'reverseText';
      attackInfo.appendChild(attackName);
      attackInfo.appendChild(document.createElement('br'));
      attackInfo.appendChild(attackType);
      attackInfo.appendChild(document.createElement('br'));
      attackInfo.appendChild(attackBaseDamage);
      attackInfo.appendChild(document.createElement('br'));
      attackInfo.appendChild(attackEnergy);
      attackInfo.appendChild(document.createElement('br'));
      attackInfo.appendChild(attackDuration);

      reverseContent.appendChild(attackInfo);
      reverseContent.appendChild(document.createElement('hr'));
    });
    console.log(reverseContent);
    return reverseContent;
  }

  cards.addEventListener('mouseover', (event) => {
    const card = event.target.closest('.pokemon-card');
    if (card) {
      card.classList.add('reverse-content');
    }
  });
  
  cards.addEventListener('mouseout', (event) => {
    const card = event.target.closest('.pokemon-card');
    if (card) {
      card.classList.remove('reverse-content');
    }
  });
  
  
  
  /*function arrayGeneration(pagina, arrayF){
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

  function arrayType(pagina, arrayF){
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

  function arrayRarity(pagina, arrayF){
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
  }*/
});
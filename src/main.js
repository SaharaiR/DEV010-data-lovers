import data from './data/pokemon/pokemon.js';
import dataFunction from './data.js';

document.addEventListener("DOMContentLoaded", function () {
  //DECLARACIONES
  const btnKanto = document.getElementById("showKantoCards");
  const btnJohto = document.getElementById("showJohtoCards");
  const begin = document.querySelector(".begin");  
  const marquee = document.getElementById("marquee");
  const btnNext = document.getElementById("btnNext");
  const btnPrev = document.getElementById("btnPrev");
  const btnChangeRegion = document.getElementById("changeRegion");
  const pokemons = 151;
  const cardPerPage = 25; //definir cuantas tarjetas se presentaran por pagina el grid  
  const btnAsc = document.getElementById("btnAscendent");
  const btnDes = document.getElementById("btnDescendent");
  const filterGenerationSelect = document.getElementById("categoryGeneration");
  const typeSelect = document.getElementById("categoryType"); 
  const raritySelect = document.getElementById("categoryRarity");
  const btnFilter = document.getElementById("filter");
  const btnSearch = document.getElementById("search");
  const valueSearch = document.getElementById("valueSearch");
  const alerts = document.getElementById("alerts");
  const btnReset = document.getElementById("resetFilters");

  const cards = document.getElementById("cards");
  const container = document.getElementsByClassName("containerCards");
  const frontCards = document.getElementById("frontCards");
  const backCards = document.getElementById("backCards");
 
  let longArrayF, filterByRarity, filteredByGeneration, filteredByType;//, filterCombine;
  let generationOption, selectedType, selectedRarity;
  let arrayDescendent, arraySearch;
  let numberPage = 1; //llevar el conteo de páginas*
  let kanto = false, johto = false;
  let btnPush = ""; 

  //EVENTOS
  btnKanto.addEventListener("click", function() {
    kanto = true;
    loadPkm(numberPage); 
  });
  btnJohto.addEventListener("click", function() {
    johto = true;
    loadPkm(numberPage); 
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
      loadPkm(numberPage);
    }else if(johto){
      johto = false;
      kanto = true;
      loadPkm(numberPage);
    }
  })

  btnFilter.addEventListener("click", () => {
    numberPage = 1;
    generationOption = filterGenerationSelect.value;
    selectedType = typeSelect.value;
    selectedRarity= raritySelect.value;
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
    alerts.innerHTML = "";
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
    filterGenerationSelect.value = 0;
    typeSelect.value = 0;
    raritySelect.value = 0;
    alerts.innerHTML = "";
    btnPush = "ascendent";
    filterArrays(numberPage, data.pokemon);
  });

  function backCard(){
    const eachCard = document.querySelectorAll('.pokemon-card');
    eachCard.forEach((element) => {
      element.addEventListener('mouseover', (event) => {
        const card = event.target.closest('.pokemon-card');
        card.classList.add('reverse');
        cards.addEventListener('mouseout', (event) => {
          const card = event.target.closest('.pokemon-card');
          if (card) {
            card.classList.remove('reverseBack');
          }
        });
      });
    });
  }      

  //FUNCIONES
  function loadPkm(page){
    //cards.innerHTML = "";
    frontCards.innerHTML = "";
    backCards.innerHTML = "";
    begin.style.display = "none";
    if(kanto){
      marquee.innerHTML = "Kanto Region";
      const indexBegin = (page - 1) * cardPerPage;
      const endIndex = Math.min(indexBegin + cardPerPage, pokemons);
      cardsByRegion(indexBegin, endIndex);
    }
    if(johto){
      marquee.innerHTML = "Johto Region";
      const indexBegin = pokemons + (page - 1) * cardPerPage;
      const endIndex = indexBegin + cardPerPage;
      cardsByRegion(indexBegin, endIndex);
    }
    // Limpiamos el contenido existente en las tarjetas
    //cards.innerHTML = "";
    //Cargamos demás elementos
    btnPrev.style.display = "inline-block";
    btnNext.style.display = "inline-block";
    btnChangeRegion.style.display = "block";
    document.getElementById("filterBar").style.display = "block";
  }

  function cardsByRegion(indexB, indexE){
    for(let i = indexB; i < indexE; i++) {
      const numPkn = document.createTextNode("No. " + data.pokemon[i].num);
      const namePkn = document.createTextNode((data.pokemon[i].name).toUpperCase());
      const heightPkn = document.createTextNode("Height: " + (data.pokemon[i].size.height));
      const weightPkn = document.createTextNode("Weight: " + (data.pokemon[i].size.weight));
      const factAbout = document.createTextNode(data.pokemon[i].about);
      const factsType = document.createTextNode("Type: " + data.pokemon[i].type);
      const factsWeak = document.createTextNode("Weakness: " + data.pokemon[i].weakness);
      const factsResistant = document.createTextNode("Resistant: " + data.pokemon[i].resistant);
      
      const picture = document.createElement('picture');
      picture.classList = 'pokemon-card';
      const img = document.createElement('img');
      picture.id= data.pokemon[i].num
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
      frontCards.appendChild(picture);

      const factsInfo = document.createElement('span');
      factsInfo.classList = 'pokemon-card';
      factsInfo.appendChild(factAbout);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsType);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsWeak);
      factsInfo.appendChild(document.createElement('br'));
      factsInfo.appendChild(factsResistant);
      factsInfo.appendChild(document.createElement('br'));
      backCards.appendChild(factsInfo);
    }
    cards.style.display = "grid";
    frontCards.style.display = "grid";
    backCards.style.display = "grid";
    backCard();
    /*if(frontCards.childNodes.length !== 0){
      backCard();
    }*/
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
      loadPkm(numberPage);
    }
    if(johto){
      if(numberPage === Math.ceil(numPokemonsJohto / cardPerPage)){
        return;
      }
      numberPage++;
      loadPkm(numberPage);
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
      loadPkm(numberPage);
    }
    if(johto){
      loadPkm(numberPage);
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
    frontCards.innerHTML = "";
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
      frontCards.appendChild(picture);
    }
  }

  function pokemonFound(arrayF){
    marquee.innerHTML = "Gotcha! " + arrayF.name.toUpperCase();
    frontCards.innerHTML = "";
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
    frontCards.appendChild(picture);
  }

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
  }*/

  /* function arrayType(pagina, arrayF){
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

  /*function arrayRarity(pagina, arrayF){
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

/* function createReverseContent(numberPokemon) {
    //console.log(numberPokemon);
    /*const reverseContent = document.createElement('div');
    reverseContent.classList = 'reverse-content';
    data.pokemon.forEach(facts => {
      if(facts.num === numberPokemon){
        //facts['special-attack'].forEach(attribute =>{
        //const attackAbout = document.createTextNode("About: " + attack.about);
        const factAbout = document.createTextNode(facts.about);
        const factsType = document.createTextNode("Type: " + facts.type);
        const factsWeak = document.createTextNode("Weakness: " + facts.weakness);
        const factsResistant = document.createTextNode("Resistant: " + facts.resistant);
          

        const factsInfo = document.createElement('p');
        factsInfo.classList = 'reverseText';
        //attackInfo.appendChild(attackAbout);
        factsInfo.classList = 'pokemon-card';
        factsInfo.appendChild(factAbout);
        factsInfo.appendChild(document.createElement('br'));
        factsInfo.appendChild(factsType);
        factsInfo.appendChild(document.createElement('br'));
        factsInfo.appendChild(factsWeak);
        factsInfo.appendChild(document.createElement('br'));
        factsInfo.appendChild(factsResistant);
        factsInfo.appendChild(document.createElement('br'));
        backCards.appendChild(factsInfo);
        //reverseContent.appendChild(document.createElement('hr'));
        //});
      }
      backCards.style.display = "grid";
    });
    /*console.log(reverseContent);
    return reverseContent;
  }*/
});
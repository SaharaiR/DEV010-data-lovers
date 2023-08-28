// estas funciones son de ejemplo

const dataFunction = {
  filterGeneration: (data, generation) => { 
    const filteredPokemons = data.filter(pokemon => {
      return pokemon.generation.num.toLowerCase() === generation.toLowerCase();
    });
    return filteredPokemons;
  },
  
  filterByType: (pokemons, selectedType) => {
    return pokemons.filter(pokemon => {
      return pokemon.type.includes(selectedType);
    });
  },

  filterByRarity: (pokemons, selectedRarity) => {
    return pokemons.filter(pokemon => pokemon['pokemon-rarity'] === selectedRarity);
  },

  sortDescendent: (pokemons) => {
    return pokemons.sort((a, b) => {
      if (a.num > b.num) {
        return -1;
      }
      if (a.num < b.num) {
        return 1;
      }
      return 0;
    });
  },

  sortAscendent: (pokemons) =>{
    return pokemons.sort((a,b) => {
      if (a.num > b.num){
        return 1;
      }
      if (a.num < b.num){
        return -1;
      }
      return 0;
    });
  },

  searching: (pokemon, nameOrNumber) => {
    return pokemon.find(p => {
      return p.num === nameOrNumber || p.name === nameOrNumber; 
    });
  }, 

  filterCombine: (pokemons, selectedRarity, selectedType, generation) => {
    let filtered = pokemons;

    if (selectedRarity !=='cero') {
      filtered = filtered.filter(pokemon => pokemon['pokemon-rarity'] === selectedRarity);
    }
    if (selectedType !== 'cero') {
      filtered = filtered.filter(pokemon => pokemon['pokemon-type'] === selectedType);
    }
    
    if (generation !== 'cero') {
      filtered = filtered.filter(pokemon => pokemon['pokemon-generation'] === generation);
    }

    return filtered;
   
  },
  
}
export default dataFunction;
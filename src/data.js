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
  searching: (pokemon, nameOrNumber) => {
    return pokemon.find(p => {
      return p.num === nameOrNumber || p.name === nameOrNumber; 
    });
  } 
};
  /*applyFilters: (data, selectedGeneration, selectedType, selectedRarity) => {
    let filteredPokemons = data;
  
    if (selectedGeneration !== 'cero') {
      filteredPokemons = filteredPokemons.filter(pokemon => {
        return pokemon.generation.num.toLowerCase() === selectedGeneration.toLowerCase();
      });
    }
  
    if (selectedType !== 'cero') {
      filteredPokemons = filteredPokemons.filter(pokemon => {
        return pokemon.type.includes(selectedType);
      });
    }
  
    if (selectedRarity !== 'cero') {
      filteredPokemons = filteredPokemons.filter(pokemon => {
        return pokemon['pokemon-rarity'] === selectedRarity;
      });
    }
  
    return filteredPokemons;
}
  
/*filterCombine: (pokemons, rarity, type, generation) => {
    //let filtered = pokemons;
    if(rarity) {
      //filtered = filtered.filter(p => p['pokemon-rarity'] === rarity);
      pokemons = pokemons.filter(p => p['pokemon-rarity'] === rarity);
    }
    if(type) {
      pokemons = pokemons.filter(p => p['pokemon-type'] === type);
      //filtered = filtered.filter(p => p['pokemon-type'] === type); 
    }
    if(generation) {
      pokemons = pokemons.filter(p => p['pokemon-generation'] === generation);
      //filtered = filtered.filter(p => p['pokemon-generation'] === generation);
    }
    return pokemons;
  }*/
}
export default dataFunction;
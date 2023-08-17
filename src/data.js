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
  
  combineFilteredPokemon: (data, generation, selectType, selectRarity) => {
    let filteredPokemons = data; 

    if (generation) {
      filteredPokemons = dataFunction.filterGeneration(filteredPokemons, generation);
    }
    if (selectType){
      filteredPokemons = dataFunction.filterByType(filteredPokemons, selectType);
    }
    if (selectRarity){
      filteredPokemons = dataFunction.filterByRarity(filteredPokemons, selectRarity);
    }

    return filteredPokemons;
  }
}; 
export default dataFunction;


// const anotherExample = () => {
// return 'OMG';
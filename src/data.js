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
  
}; 
export default dataFunction;


// const anotherExample = () => {
// return 'OMG';
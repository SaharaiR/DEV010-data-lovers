import dataFunction from '../src/data.js';

describe('filterGeneration', () => {
  it('is a function', () => {
    expect(typeof dataFunction.filterGeneration).toBe('function');
  });

  it('data is filtered by generation', () => {
    const pokemonArray = Array.from(dataFunction);
    const gen1 = "generation i";
    const gen2 = "generation ii";
    const genArray1 = dataFunction.filterGeneration(pokemonArray,gen1);
    for(let i = 0; i < genArray1.length; i++){
      expect(genArray1[i].generation.num === gen1).toBe(true);
    }
    const genArray2 = dataFunction.filterGeneration(pokemonArray,gen2);
    for(let i = 0; i < genArray2.length; i++){
      expect(genArray2[i].generation.num === gen2).toBe(true);
    }
  });
});

describe('filterByType', () => {
  it('is a function', () => {
    expect(typeof dataFunction.filterByType).toBe('function');
  });

  it('data is filtered by type', () => {
    const pokemonArray = Array.from(dataFunction);
    const type = "generation i";
    const typeArray = dataFunction.filterByType(pokemonArray,type);
    for(let i = 0; i < typeArray.length; i++){
      expect(typeArray[i].type === type).toBe(true);
    }
  });
});

describe('sortDescendent', () => {
  it('is a function', () => {
    expect(typeof dataFunction.sortDescendent).toBe('function');
  });

  it('sort data in descending order', () => {
    const sorted = [
      { "num": "135",
        "name": "jolteon",
        "generation": {
          "num": "generation i",
          "name": "kanto"
        },
        "about": "Jolteon's cells generate a low level of electricity. This power is amplified by the static electricity of its fur, enabling the Pokémon to drop thunderbolts. The bristling fur is made of electrically charged needles.",
        "img": "https://www.serebii.net/pokemongo/pokemon/135.png",
        "size": { "height": "0.79 m", "weight": "24.5 kg" },
        "pokemon-rarity": "normal",
        "type": [ "electric" ] },
      { "num": "024", "name": "arbok",
        "generation": { "num": "generation i", "name": "kanto" },
        "about": "This Pokémon is terrifically strong in order to constrict things with its body. It can even flatten steel oil drums. Once Arbok wraps its body around its foe, escaping its crunching embrace is impossible.",
        "img": "https://www.serebii.net/pokemongo/pokemon/024.png",
        "size": { "height": "3.51 m", "weight": "65.0 kg" },
        "pokemon-rarity": "normal",
        "type": [ "poison" ] },
      { "num": "002", 
        "name": "ivysaur", 
        "generation": { "num": "generation i","name": "kanto" },
        "about": "There is a bud on this Pokémon's back. To support its weight, Ivysaur's legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it's a sign that the bud will bloom into a large flower soon.",
        "img": "https://www.serebii.net/pokemongo/pokemon/002.png",
        "size": { "height": "0.99 m", "weight": "13.0 kg" },
        "pokemon-rarity": "normal",
        "type": [ "grass", "poison" ] }  
    ];
    const sortedArray = dataFunction.sortDescendent(sorted);
    for (let i = 0; i < sortedArray.length - 1; i++) {
      expect(sortedArray[i].num > sortedArray[i+1].num).toEqual(true);
    }
  });
});

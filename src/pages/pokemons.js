import '../styles/pokemon.css'
import poke from '../img/pokedex.png';

export function Pokemons() {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const generatePokemonPromises = () => Array(151).fill().map((_, index) => 
      fetch(getPokemonUrl(index + 1)).then(response => response.json()))

  const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types}) => {
      const elementTypes = types.map(typeInfo => typeInfo.type.name)

      accumulator += `
          <li class="card ${elementTypes[0]}">
          <img class="img" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
              <h2 class="h2"> ${id}. ${name} </h2>
              <p class="p" > ${elementTypes.join(' | ')} </p>
          </li>
        `
      return accumulator
  }, '')

  const insertPokemonsIntoPage = pokemons => {
      const ul = document.querySelector('[data-js="pokedex"]')
      ul.innerHTML = pokemons
  }

  const pokemonPromises = generatePokemonPromises()

  Promise.all(pokemonPromises)
      .then(generateHTML)
      .then(insertPokemonsIntoPage)

  return (
    <div className="container">
     <h1>Hitalo Pokedéx </h1>
     <img className="poke" src={poke} alt="pokedex" />
     <ul data-js="pokedex" className="pokedex"></ul>
    </div>
    
  );
}

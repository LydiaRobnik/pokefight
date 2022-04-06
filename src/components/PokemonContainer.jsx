import React, {useEffect, useState} from 'react'
import PokemonCard from './PokemonCard'

const PokemonContainer = () => {
    const [allPokemon, setAllPokemon] = useState();

    useEffect(() => {
        fetch('https://pokefight-backend.herokuapp.com/pokemon/')
        .then(res => res.json())
        .then(data => setAllPokemon(data))
        .catch(err => console.log(err))
}, [])
console.log(allPokemon)

  return (
    <>
      <div>PokemonContainer</div>
      <div>
        {allPokemon && allPokemon.map(pokemon => {
          <PokemonCard pokemon={pokemon} />
        })}
      </div>
    </>

  )
}

export default PokemonContainer
import React, {useEffect, useState} from 'react'
import PokemonCard from './PokemonCard'
import Grid from '@mui/material/Grid'
import "../styles/cardStyles.css"


const PokemonContainer = () => {
    const [allPokemon, setAllPokemon] = useState();

    useEffect(() => {
        fetch('https://pokefight-backend.herokuapp.com/pokemon/')
        .then(res => res.json())
        .then(data => setAllPokemon(data))
        .catch(err => console.log(err))
}, [])

  return (
    <>

      <Grid container spacing={2}>
        <Grid item xs={12} s={2} md={3} className="headline">
          <h1>Play Pokemon</h1>
        </Grid>
        <Grid item xs={12} s={10} md={9}>
          <Grid container spacing={2}>
            {allPokemon && allPokemon.map(pokemon => 
              (<Grid item key={pokemon.id} >
                <PokemonCard pokemon={pokemon} />
              </Grid>)
            )}
          </Grid>
        </Grid>
      </Grid>

    </>

  )
}

export default PokemonContainer
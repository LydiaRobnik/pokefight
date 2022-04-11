import React, {useEffect, useState} from 'react'
import PokemonCard from './PokemonCard'
import Grid from '@mui/material/Grid'
// import Pagination from '@mui/material/Pagination'
import Pagination from './Pagination'
import "../styles/cardStyles.css"


const PokemonContainer = () => {
    const [allPokemon, setAllPokemon] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(50);



    useEffect(() => {
        fetch('https://pokefight-backend.herokuapp.com/pokemon/')
        .then(res => res.json())
        .then(data => setAllPokemon(data))
        .catch(err => console.log(err))
    }, [])

    // const indexOfLastPokemon = currentPage * pokemonsPerPage;
    // const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    // const currentPokemons = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
    // const paginate = () => {}

  return (
    <>

      <Grid  className="background" container spacing={2}>
        <Grid item xs={12} s={2} md={3}  >
          <h1>Play Pokemon</h1>
        </Grid>
        <Grid item xs={12} s={10} md={9}>
          {/* <Pagination numberOfPokemons={allPokemon.length} pokemonsPerPage={pokemonsPerPage}  /> */}
          {/* <Pagination count={17} variant="outlined" shape="rounded" /> */}
          <Grid container spacing={2}>
            {allPokemon && allPokemon.map(pokemon => 
              (<Grid item key={pokemon.id} >
                <PokemonCard pokemon={pokemon}/>
              </Grid>)
            )}
          </Grid>
        </Grid>
      </Grid>

    </>

  )
}

export default PokemonContainer
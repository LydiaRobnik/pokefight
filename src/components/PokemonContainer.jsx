import React from 'react'
import { NavLink } from 'react-router-dom';
import PokemonCard from './PokemonCard'
import {Grid, CircularProgress, TextField} from '@mui/material'
import "../styles/cardStyles.css"
import Pagination from './Pagination'

const PokemonContainer = ({ allPokemon, choosePokemon, loading, currentPokemons, pokemonsPerPage, paginate }) => {

  if(loading) {
    return <>
          <CircularProgress />
    </>
  }

  return (
    <>    
      <Grid  className="background" container spacing={2} sx={{display: 'flex', flexDirection: 'column',  alignItems: 'center' }}>
        <Grid item xs={12}  >
          <h1>Play Pokemon</h1>
          <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          sx={{bgcolor: 'white', justifySelf: 'center', width: 1}}
        />
        </Grid>
        <Grid item xs={10}>
          <Pagination pokemonsPerPage={pokemonsPerPage} numberOfPokemons={allPokemon.length} paginate={paginate}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row',  justifyContent: 'center' }}> 
            {allPokemon && currentPokemons.map(pokemon => 
              (<Grid item key={pokemon.id} >
                <PokemonCard pokemon={pokemon} choosePokemon={choosePokemon} />
              </Grid>)
            )}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
}

export default PokemonContainer;

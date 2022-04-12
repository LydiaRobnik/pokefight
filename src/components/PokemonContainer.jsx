import React from 'react'
import { NavLink } from 'react-router-dom';
import PokemonCard from './PokemonCard'
import {Grid, CircularProgress} from '@mui/material'
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
      <Grid className="background" container spacing={2}>
        <NavLink to="/duel">Duel</NavLink>
        <Grid item xs={12} s={2} md={3}>
          <h1>Play Pokemon</h1>
        </Grid>
        <Grid item xs={12} s={10} md={9}>
<<<<<<< HEAD
          {/* <Pagination numberOfPokemons={allPokemon.length} pokemonsPerPage={pokemonsPerPage}  /> */}
          {/* <Pagination count={17} variant="outlined" shape="rounded" /> */}
          <Grid container spacing={3}>
            {allPokemon &&
              allPokemon.map((pokemon) => (
                <Grid item key={pokemon.id}>
                  <PokemonCard
                    pokemon={pokemon}
                    choosePokemon={choosePokemon}
                  />
                </Grid>
              ))}
=======
          <Grid container spacing={2
          }>
            <Grid item xs={12}>
              <Pagination pokemonsPerPage={pokemonsPerPage} numberOfPokemons={allPokemon.length} paginate={paginate}/>
            </Grid>
            {allPokemon && currentPokemons.map(pokemon => 
              (<Grid item key={pokemon.id} >
                <PokemonCard pokemon={pokemon} choosePokemon={choosePokemon} />
              </Grid>)
            )}
>>>>>>> 801a0ea3ec0e53bc1bc74816b34f189900b6f449
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonContainer;

import React from 'react';
import { NavLink } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { Grid, CircularProgress } from '@mui/material';
import '../styles/cardStyles.css';
import Pagination from './Pagination';

const PokemonContainer = ({
  allPokemon,
  choosePokemon,
  loading,
  currentPokemons,
  pokemonsPerPage,
  paginate,
}) => {
  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      <Grid className="background" container spacing={2}>
        <NavLink to="/duel">Duel</NavLink>
        <Grid item xs={12} s={2} md={3}>
          <h1>Play Pokemon</h1>
        </Grid>
        <Grid item xs={12} s={10} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Pagination
                pokemonsPerPage={pokemonsPerPage}
                numberOfPokemons={allPokemon.length}
                paginate={paginate}
              />
            </Grid>
            {allPokemon &&
              currentPokemons.map((pokemon) => (
                <Grid item key={pokemon.id}>
                  <PokemonCard
                    pokemon={pokemon}
                    choosePokemon={choosePokemon}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonContainer;

import React from 'react';
import PokemonCard from './PokemonCard';
import { NavLink } from 'react-router-dom';

const PokemonContainer = ({ allPokemon, choosePokemon }) => {
  return (
    <>
      <div>PokemonContainer</div>
      <NavLink to="/duel">Duel</NavLink>
      <div>
        {allPokemon &&
          allPokemon.map((pokemon) => (
            <PokemonCard pokemon={pokemon} choosePokemon={choosePokemon} />
          ))}
      </div>
    </>
  );
};

export default PokemonContainer;

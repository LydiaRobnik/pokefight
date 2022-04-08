import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonContainer = ({ allPokemon }) => {
  return (
    <>
      <div>PokemonContainer</div>
      <div>
        {allPokemon &&
          allPokemon.map((pokemon) => <PokemonCard pokemon={pokemon} />)}
      </div>
    </>
  );
};

export default PokemonContainer;

import React from 'react';
import { NavLink } from 'react-router-dom';

const PokemonCard = ({ pokemon, choosePokemon }) => {
  return (
    <>
      <div>
        <NavLink to="/pokemon/:id">
          PokemonCard
          <p>{pokemon.id}</p>
          <p>{pokemon.name.english}</p>
          <p>{pokemon.name.japanese}</p>
        </NavLink>
        <button onClick={(e) => choosePokemon(pokemon)}>Select</button>
        {/* <img src="" alt="" /> */}
      </div>
    </>
  );
};

export default PokemonCard;

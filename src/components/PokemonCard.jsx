import React from 'react';
import { NavLink } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  return (
    <>
      <NavLink to="/pokemon/:id">
        <div>
          PokemonCard
          <p>{pokemon.id}</p>
          <p>{pokemon.name.english}</p>
          <p>{pokemon.name.japanese}</p>
          {/* <img src="" alt="" /> */}
        </div>
      </NavLink>
    </>
  );
};

export default PokemonCard;

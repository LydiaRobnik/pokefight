import React from 'react'
import {NavLink } from "react-router-dom";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, shadows} from '@mui/material';
import { purple, deepPurple, green, lightGreen, grey, deepOrange, lightBlue, amber, pink, red, brown, cyan  } from '@mui/material/colors';
import "../styles/cardStyles.css"


const PokemonCard = ({ pokemon, choosePokemon }) => {
  // const cardImages = [
  //   { 'src' : `../img/${pokemon.id}.png`   }
  // ]
  
  const typeColor = {
    Grass : green[600],
    Poison : deepPurple[400], 
    Fire: deepOrange[500],
    Flying: cyan[700],
    Water: lightBlue[600],
    Bug: lightGreen[700],
    Normal: grey[600],
    Electric: amber[500],
    Ground: brown[500],
    Fairy: pink[300],
    Fighting: red[500],
    Psychic: purple[400]

  }


  return (
    <>
        <NavLink to='/pokemon/:id'>
            <Card sx={{maxWidth: 345, boxShadow: 3 }}>
              <CardMedia 
                className="cardBackground"
                component="img"
                alt="pokemon"
                height="200"
                image="../../img/1.png"
              />
              <CardContent>
                <p>Nr. {pokemon.id}</p>
                <Typography gutterBottom variant="h5" component="div">
                  <p>{pokemon.name.english}</p>
                  <p>{pokemon.name.japanese}</p>
                </Typography>
              </CardContent>
              <CardActions>
                {pokemon && pokemon.type.map((type) =>                  
                    <>
                      <Button variant="contained" style={{backgroundColor: typeColor[type]}}>{type}</Button>
                    </>                 
                )}
              </CardActions>
            </Card>
        </NavLink>
        <button onClick={(e) => choosePokemon(pokemon)}>Select</button>
        {/* <img src="" alt="" /> */}
    </>
  );
}

export default PokemonCard

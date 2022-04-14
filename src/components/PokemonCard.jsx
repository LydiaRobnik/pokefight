import React from 'react'
import {NavLink } from "react-router-dom";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { purple, deepPurple, green, lightGreen, grey, deepOrange, lightBlue, amber, pink, red, brown, cyan  } from '@mui/material/colors';
import "../styles/cardStyles.css"


const PokemonCard = ({ pokemon, choosePokemon, type, setType, handleSearch }) => {

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
        
            <Card sx={{width: 250, boxShadow: 3 }} className='card'>
              <CardMedia 
                className="cardBackground cardHover"
                component="img"
                alt="pokemon"
                height="200"
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              />
              <CardContent sx={{py: 0.5}}>
                <p>Nr. {pokemon.id}</p>
                <Typography gutterBottom variant="h5" component="div">
                  <p>{pokemon.name.english}</p>
                  <p>{pokemon.name.japanese}</p>
                </Typography>
              </CardContent>
              <CardActions sx={{display: 'flex', flexDirection: 'column',  justifyContent: 'center' }}>
                <Box sx={{display: 'flex', flexDirection: 'row',  justifyContent: 'center', width: 1 }}>
                  {pokemon && pokemon.type.map((type) =>                  
                      <>
                        <Button onClick={(event) => {setType(event.target.value) } } variant="contained" sx={{bgcolor: typeColor[type], m:0.5, width: '40%'}}>{type}</Button>
                      </>                 
                  )}
                </Box>
                <NavLink className="detailsButton" to='/pokemon/:id' ><Button sx={{m: 0.5, width: 200}} variant="outlined" color='primary'>Details</Button></NavLink>
                <NavLink className="detailsButton" to="/duel"><Button sx={{m: 0.5, width: 200}} variant="outlined" color='primary' onClick={(e) => choosePokemon(pokemon)}>Play</Button></NavLink>
              </CardActions>
            </Card>
        
    </>
  );
}

export default PokemonCard

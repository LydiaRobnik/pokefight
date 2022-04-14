import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detailStyles.css';
import img from '../img/1.1.png';
import pokeball from '../img/poke-ball.png';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  purple,
  deepPurple,
  green,
  lightGreen,
  grey,
  deepOrange,
  lightBlue,
  amber,
  pink,
  red,
  brown,
  cyan,
} from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();

  const typeColor = {
    Grass: green[600],
    Poison: deepPurple[400],
    Fire: deepOrange[500],
    Flying: cyan[700],
    Water: lightBlue[600],
    Bug: lightGreen[700],
    Normal: grey[600],
    Electric: amber[500],
    Ground: brown[500],
    Fairy: pink[300],
    Fighting: red[500],
    Psychic: purple[400],
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    console.log(id, 'testid');
    fetch(`https://pokefight-backend.herokuapp.com/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .then((poke) => console.log(poke))
      .catch((err) => console.log(err));
  }, []);

  // alternativ:
  // useEffect(() => {
  //   const fetchData = async() => {
  //     // setLoading(true);
  //     const response = await fetch('https://pokefight-backend.herokuapp.com/pokemon/${id}');
  //     const json = await response.json();
  //     setPokemon(json);

  //     // setLoading(false);
  //     }
  //   fetchData();
  // }, []);

  return (
    <>
      {pokemon && (
        <Container maxWidth="m" className="background">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>
                <h1 className="h1detail">#{pokemon.id}</h1>
                <h1 className="h1detail">{pokemon.name.english}</h1>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <img src={img} alt="" className="picture" />
                <h2>
                  <Button
                    sx={{
                      margin: '5px',
                      bgcolor: typeColor[pokemon.type[0]],
                    }}
                    variant="contained"
                  >
                    {pokemon.type[0]}
                  </Button>
                  {pokemon.type[1] && (
                    <Button variant="contained" color="primary">
                      {pokemon.type[1]}
                    </Button>
                  )}
                </h2>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h3>Base Stats:</h3>
                <p>HP: {pokemon.base.HP}</p>
                <p>Attack: {pokemon.base.Attack}</p>
                <p>Defense: {pokemon.base.Defense}</p>
                <p>Sp.Attack: {pokemon.base['Sp. Attack']}</p>
                <p>Sp. Defense: {pokemon.base['Sp. Defense']}</p>
                <p>Speed: {pokemon.base.Speed}</p>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <h2>FIGHT!</h2>
                <img
                  src={pokeball}
                  className="pokeball"
                  alt="Pokeball"
                  to="/duel"
                />
              </Item>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default PokemonDetail;

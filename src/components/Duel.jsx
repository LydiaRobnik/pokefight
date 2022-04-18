import { CallToAction } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/cardStyles.css';
import { Button, Box} from '@mui/material';
import axios from 'axios';

const Duel = ({ selectedPokemon }) => {
  // useStates

  const [playerPokemon, setPlayerPokemon] = useState(selectedPokemon);
  const [computerPokemon, setComputerPokemon] = useState();
  const [playerPokemonHP, setPlayerPokemonHP] = useState();
  const [computerPokemonHP, setComputerPokemonHP] = useState();
  const [winner, setWinner] = useState(false);
  const [attacking, setAttacking] = useState(false);

  //   useEffects
  // get random enemy pokemon
  useEffect(() => {
    const randomID = Math.floor(Math.random() * 809);
    fetch(`https://pokefight-backend.herokuapp.com/pokemon/${randomID}`)
      .then((res) => res.json())
      .then((data) => setComputerPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  //   set inital states
  useEffect(() => {
    if (playerPokemon && computerPokemon) {
      setPlayerPokemonHP(playerPokemon.base.HP);
      setComputerPokemonHP(computerPokemon.base.HP);
    }
  }, [playerPokemon, computerPokemon]);

  //   bring attack button back after attacking
  useEffect(() => {
    const timer = setTimeout(() => {
      setAttacking(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [attacking]);

  useEffect(() => {
    if (!winner) {
      decideWinner();
    }
  }, [playerPokemonHP, computerPokemonHP]);

  //   functions

  function choosePlayerAttack(category) {
    if (category === 'normal') {
      return playerPokemon.base.Attack;
    } else if (category === 'special') {
      return playerPokemon.base['Sp. Attack'];
    }
  }

  function chooseComputerAttack(category) {
    if (category === 'normal') {
      return computerPokemon.base.Attack;
    } else if (category === 'special') {
      return computerPokemon.base['Sp. Attack'];
    }
  }

  function playerAttack(category) {
    const attack = choosePlayerAttack(category);
    const newHP = computerPokemonHP - (attack - computerPokemon.base.Defense);
    if (newHP <= computerPokemonHP - 5) {
      setComputerPokemonHP(newHP);
    } else {
      setComputerPokemonHP((prev) => prev - 5);
    }
  }

  function computerAtack(category) {
    const attack = chooseComputerAttack(category);
    console.log(attack);
    const newHP = playerPokemonHP - (attack - playerPokemon.base.Defense);
    if (newHP <= playerPokemonHP - 5) {
      setPlayerPokemonHP(newHP);
    } else {
      setPlayerPokemonHP((prev) => prev - 5);
    }
  }

  function decideWinner() {
    if (playerPokemonHP <= 0) {
      setWinner('Computer wins');
      winnerToDB(computerPokemon, computerPokemon.id);
      loserToDb(playerPokemon, playerPokemon.id);

      // playerpokemon /id/lost
    } else if (computerPokemonHP <= 0) {
      setWinner('Player wins');
      winnerToDB(playerPokemon, playerPokemon.id);
      loserToDb(computerPokemon, computerPokemon.id);
    } else {
      return;
    }
  }

  function winnerToDB(pokemon, id) {
    let req = {
      url: `https://pokefight-backend.herokuapp.com/highscore/${id}/won`,
      method: 'PUT',
      data: { name: pokemon.name.english },
    };
    axios(req).then((data) => console.log(data).catch((e) => console.log(e)));
  }

  function loserToDb(pokemon, id) {
    let req = {
      url: `https://pokefight-backend.herokuapp.com/highscore/${id}/lost`,
      method: 'PUT',
      data: { name: pokemon.name.english },
    };
    axios(req).then((data) => console.log(data).catch((e) => console.log(e)));
  }

  function startDuel(category) {
    // remove attack button while attacking
    setAttacking(true);
    // decide who attacks first based on speed characteristic
    if (playerPokemon.base.Speed > computerPokemon.base.Speed) {
      playerAttack(category);
      setTimeout(() => {
        computerAtack(category);
      }, 2000);
    } else if (playerPokemon.base.Speed < computerPokemon.base.Speed) {
      computerAtack(category);
      setTimeout(() => {
        playerAttack(category);
      }, 2000);
    }
  }

  return (
    <Box
      className="arena"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {playerPokemon && computerPokemon && !winner && (
        <Box
          sx={{
            width: 1000,
            height: 800,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <img
              className="duelImg"
              src={
                playerPokemon.id < 650
                  ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${playerPokemon.id}.gif`
                  : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${playerPokemon.id}.png`
              }
              alt="player Pokemon"
            />

            <p className="duelText">{playerPokemon.name.english}</p>
            <p className="duelHP">Player HP {playerPokemonHP}</p>
          </div>
          <div>
            <img
              className="duelImg"
              src={
                playerPokemon.id < 650
                  ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${computerPokemon.id}.gif`
                  : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${computerPokemon.id}.png`
              }
              alt="computer Pokemon"
            />
            <p className="duelText">{computerPokemon.name.english}</p>
            <p className="duelHP">Computer HP {computerPokemonHP}</p>
          </div>
        </Box>
      )}
      <Box>
        {!attacking && !winner && (
          <>
            <Button
              variant="contained"
              color="success"
              sx={{ m: 2 }}
              onClick={() => startDuel('normal')}
            >
              Attack
            </Button>
            <Button
              variant="contained"
              color="warning"
              sx={{ m: 2 }}
              onClick={() => startDuel('special')}
            >
              Special Attack
            </Button>
          </>
        )}
      </Box>
      <Box>{winner && 
      <>
        <p className="duelWinner">{winner}</p>
        <NavLink to={"/"}>
          <Button variant="contained" color="secondary" sx={{ m: 2 }}>Play again</Button>
        </NavLink>
        <NavLink to={"/highscore"}>
          <Button variant="contained" color="secondary" sx={{ m: 2 }}>Show High Score</Button>
        </NavLink>
      </>
      }</Box>
    </Box>
  );
};

export default Duel;

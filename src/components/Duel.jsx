import React, { useState, useEffect } from 'react';

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

  function playerAttack() {
    const newHP =
      computerPokemonHP -
      (playerPokemon.base.Attack - computerPokemon.base.Defense);
    if (newHP <= computerPokemonHP - 5) {
      setComputerPokemonHP(newHP);
    } else {
      setComputerPokemonHP((prev) => prev - 5);
    }
  }

  function computerAtack() {
    const newHP =
      playerPokemonHP -
      (computerPokemon.base.Attack - playerPokemon.base.Defense);
    if (newHP <= playerPokemonHP - 5) {
      setPlayerPokemonHP(newHP);
    } else {
      setPlayerPokemonHP((prev) => prev - 5);
    }
  }

  function decideWinner() {
    if (playerPokemonHP <= 0) {
      setWinner('Computer wins');
    } else if (computerPokemonHP <= 0) {
      setWinner('Player wins');
    } else {
      return;
    }
  }
  function startDuel() {
    // remove attack button while attacking
    setAttacking(true);
    // decide who attacks first based on speed characteristic
    if (playerPokemon.base.Speed > computerPokemon.base.Speed) {
      playerAttack();
      setTimeout(() => {
        computerAtack();
      }, 2000);
    } else if (playerPokemon.base.Speed < computerPokemon.base.Speed) {
      computerAtack();
      setTimeout(() => {
        playerAttack();
      }, 2000);
    }
  }

  return (
    <div>
      {playerPokemon && computerPokemon && !winner && (
        <div>
          <p>
            {playerPokemon.name.english} Player HP {playerPokemonHP}
          </p>
          <p>
            {computerPokemon.name.english} Computer HP {computerPokemonHP}
          </p>
        </div>
      )}
      <div>
        {!attacking && !winner && (
          <>
            <button onClick={() => startDuel()}>Attack</button>
          </>
        )}
      </div>
      <div>{winner && <p>{winner}</p>}</div>
    </div>
  );
};

export default Duel;
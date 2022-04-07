import React, { useState, useEffect } from 'react';

const Duel = () => {
  //   mockdata
  const pokemon1 = {
    id: 51,
    name: {
      english: 'Dugtrio',
      japanese: 'ダグトリオ',
      chinese: '三地鼠',
      french: 'Triopikeur',
    },
    type: ['Ground'],
    base: {
      HP: 15,
      Attack: 60,
      Defense: 50,
      'Sp. Attack': 50,
      'Sp. Defense': 70,
      Speed: 120,
    },
  };

  const pokemon2 = {
    id: 54,
    name: {
      english: 'Psyduck',
      japanese: 'コダック',
      chinese: '可达鸭',
      french: 'Psykokwak',
    },
    type: ['Water'],
    base: {
      HP: 20,
      Attack: 60,
      Defense: 48,
      'Sp. Attack': 65,
      'Sp. Defense': 50,
      Speed: 55,
    },
  };

  // useStates

  const [playerPokemon, setPlayerPokemon] = useState();
  const [computerPokemon, setComputerPokemon] = useState();
  const [playerPokemonHP, setPlayerPokemonHP] = useState();
  const [computerPokemonHP, setComputerPokemonHP] = useState();
  const [winner, setWinner] = useState(false);
  const [attacking, setAttacking] = useState(false);

  //   useEffects

  //   set inital states

  useEffect(() => {
    setPlayerPokemon(pokemon1);
    setComputerPokemon(pokemon2);
  }, []);

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
    setComputerPokemonHP(newHP);
  }

  function computerAtack() {
    const newHP =
      playerPokemonHP -
      (computerPokemon.base.Attack - playerPokemon.base.Defense);
    setPlayerPokemonHP(newHP);
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
          <p>Player HP {playerPokemonHP}</p>
          <p>Computer HP {computerPokemonHP}</p>
        </div>
      )}
      <div>
        {!attacking && !winner && (
          <button onClick={() => startDuel()}>Attack</button>
        )}
      </div>
      <div>{winner && <p>{winner}</p>}</div>
    </div>
  );
};

export default Duel;

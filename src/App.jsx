import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import PokemonContainer from './components/PokemonContainer.jsx';
import PokemonDetail from './components/PokemonDetail';
import Duel from './components/Duel';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});

  // fetch
  useEffect(() => {
    fetch('https://pokefight-backend.herokuapp.com/pokemon/')
      .then((res) => res.json())
      .then((data) => setAllPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  // functions

  function choosePokemon(select) {
    setSelectedPokemon(select);
  }
  return (
    <div className="App">
      <header>
        <h1>PokeFight</h1>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PokemonContainer
                allPokemon={allPokemon}
                choosePokemon={choosePokemon}
              />
            }
          ></Route>
          <Route path="/pokemon/:id" element={<PokemonDetail />}></Route>
          <Route
            path="/duel"
            element={<Duel selectedPokemon={selectedPokemon} />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

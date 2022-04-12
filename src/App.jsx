import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonContainer from './components/PokemonContainer.jsx';
import PokemonDetail from './components/PokemonDetail';
import Duel from './components/Duel';

function App() {
  const [loading, setLoading] = useState(false)
  const [allPokemon, setAllPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(24);

  // fetch
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      const response = await fetch('https://pokefight-backend.herokuapp.com/pokemon/');
      const json = await response.json();
      setAllPokemon(json);
      setLoading(false)
      }
    fetchData() 
  }, []);

  // functions
  function choosePokemon(select) {
    setSelectedPokemon(select);
  }

const indexOfLastPokemon = currentPage * pokemonsPerPage;
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
const currentPokemons = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="App">
      <main>
        <Routes>
          <Route
            path="/"
            element={<>
              <PokemonContainer
                allPokemon={allPokemon}
                choosePokemon={choosePokemon}
                loading={loading}
                currentPokemons={currentPokemons}
                pokemonsPerPage={pokemonsPerPage}
                paginate={paginate}
              />
            </>
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

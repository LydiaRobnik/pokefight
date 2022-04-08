import './App.css';
import { Routes, Route } from "react-router-dom";
import PokemonContainer from './components/PokemonContainer.jsx'
import PokemonDetail from './components/PokemonDetail';

function App() {

  return (
    <div className="App">
      <header>

      </header>
      <main>
      <Routes>
        <Route path='/' element={<PokemonContainer />}></Route>
        <Route path='/pokemon/:id' element={<PokemonDetail />}></Route>
      </Routes>
      </main> 
    </div>
  );
}

export default App;

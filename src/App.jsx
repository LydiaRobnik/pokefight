import './App.css';
import { Routes, Route, NavLink } from "react-router-dom";
import PokemonContainer from './components/PokemonContainer.jsx'
import cors from 'cors';
import PokemonDetail from './components/PokemonDetail';

function App() {

  return (
    <div className="App">
      <header>
        <h1>PokeFight</h1>
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

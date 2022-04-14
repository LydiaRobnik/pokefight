import React, {useState} from 'react'
import PokemonCard from './PokemonCard'
import {Grid, CircularProgress, TextField, Button, Box} from '@mui/material'
import "../styles/cardStyles.css"
import Pagination from './Pagination'

const PokemonContainer = ({
  allPokemon,
  choosePokemon,
  loading,
  currentPokemons,
  pokemonsPerPage,
  paginate
}) => {
// states
const [filter, setFilter] = useState('')
const [filterResult, setFilterResult] = useState([])

// loading condition
  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  } 

  // functions
  const handleSearch = () => {
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.english === `${filter}`);
    setFilterResult(filteredPokemon);
  }



  return (
    <>    
      <Grid  className="background" container spacing={2} sx={{display: 'flex', flexDirection: 'column',  alignItems: 'center' }}>
        <Grid item xs={12}>
          <h1>Play Pokemon</h1>
          <Box sx={{display: 'flex'}} >

            <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            sx={{bgcolor: 'white', justifySelf: 'center', width: 1}}
            onChange={(event) => setFilter(event.target.value)}
            onKeyDown={event => event.key === 'Enter' &&  handleSearch()}
            value={filter}
            />
            <Button variant="contained" sx={{m: 0.5, width: 200}} size= 'medium' color='secondary' onClick={() => {setFilter(''); setFilterResult([])}}>Reset filters</Button>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Pagination pokemonsPerPage={pokemonsPerPage} numberOfPokemons={allPokemon.length} paginate={paginate}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'row',  justifyContent: 'center' }}> 
            {filterResult.length > 0 ? filterResult.map(pokemon => 
              (<Grid item key={pokemon.id} >
                <PokemonCard pokemon={pokemon} choosePokemon={choosePokemon} />
              </Grid>)
              )
              : allPokemon && currentPokemons.map(pokemon => 
                (<Grid item key={pokemon.id} >
                  <PokemonCard pokemon={pokemon} choosePokemon={choosePokemon} />
                </Grid>)
                )
              }            
            
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonContainer;

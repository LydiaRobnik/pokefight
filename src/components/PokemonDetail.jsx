import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState();
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://pokefight-backend.herokuapp.com/pokemon/${id}`)
        .then(res => res.json())
        .then(data => setPokemon(data))
        .catch(err => console.log(err))
}, [])


  return (
    <>
        <div>PokemonDetail</div>
        {pokemon && 
        <>
        <p>{pokemon.id}</p>
        <p>{pokemon.name.english}</p>
        <p>{pokemon.name.japanese}</p>
        {/* <img src="" alt="" /> */}
        </>
        }
    </>
    
  )
}

export default PokemonDetail
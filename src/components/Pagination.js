import { paginationItemClasses } from '@mui/material'
import React from 'react'

const Pagination = ({pokemonsPerPage, numberOfPokemons, paginate}) => {
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(numberOfPokemons / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
    <>
        <nav>   
                {pageNumbers.map(number => (
                    <button key={number} className='paginationButton'>
                        <a onClick={() => paginate(number)} href="!#">{number}</a>
                    </button>
                ))}          
        </nav>
    </>
    )
}

export default Pagination
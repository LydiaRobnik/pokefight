import { Button } from '@mui/material'
import React from 'react'

const Pagination = ({pokemonsPerPage, numberOfPokemons, paginate}) => {
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(numberOfPokemons / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
    <>
        <nav className='paginationSection'>   
                {pageNumbers.map(number => (
                    <Button key={number} variant="contained" size="small" sx={{p:0, m:0.5}} onClick={() => paginate(number) }>{number}
                    </Button>
                ))}          
        </nav>
    </>
    )
}

export default Pagination
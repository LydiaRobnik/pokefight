import React from 'react'

const Pagination = ({pokemonsPerPage, numberOfPokemons}) => {
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(numberOfPokemons / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
    <>
        <nav>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a href="!#">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </>
    )
}

export default Pagination
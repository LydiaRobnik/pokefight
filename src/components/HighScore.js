import React, {useEffect, useState} from 'react'
import '../styles/highScoreStyles.css';
import {Button, Box} from '@mui/material';
import { NavLink } from "react-router-dom";


const HighScore = () => {
    const [highScores, setHighScores] = useState([]);

    // useEffects
    useEffect(() => {
        fetch(`https://pokefight-backend.herokuapp.com/highscore`)
        .then((res) => res.json())
        .then((data) => setHighScores(data))
        .catch((err) => console.log(err));
    }, []);

    return (<>
        <Box   sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center", 
            height: "100vh"
            }} >
            <h1>--- High Score ---</h1>
            <NavLink to={"/"}>
                <Button variant="contained" size='large' sx={{ m: 2, bgcolor: 'orange'}}>Back to Game</Button>
            </NavLink>

            <Box style={{height: 800, width: '60%'}} sx={{mt: 3}}>
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Played Games</th>
                            <th>Win</th>
                            <th>Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScores.map((pokemon, index) => (
                            <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{pokemon.name}</td>
                                    <td>{pokemon.id}</td>
                                    <td>{pokemon.playedgames}</td>
                                    <td>{pokemon.wongames}</td>
                                    <td>{pokemon.lostgames}</td>
                                </tr>                            
                            </>
                        ))}
                    </tbody>
                </table>
            </Box>

        </Box>
    </>
    )
}

export default HighScore
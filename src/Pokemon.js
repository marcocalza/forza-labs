import React, { useState } from 'react';
import { Card, Image, Text, Title, Loader, Button, Center, Container, Grid, TextInput } from '@mantine/core';

// Importing useState to get initial const data and to set a function to use to update the data from users
// Looking to use axios for fetch requests, error handling " import axios from 'axios'; "

// Creating 'object' Pokemon to pass for rendering

const Pokemon = () => {
    const [pokemon, getPokemon] = useState(null);
    const [searchQuery, setQuery] = useState(''); 

    // Change the value of query with new input event
    
    const ChangeQuery = (eventSearch) => {
        setQuery(eventSearch.target.value);
    }

    // Handling search input and pass the query to the fetch

    const searchPokemon = (searchQuery) => {
        if (searchQuery !== '') {
            fetchPokemon(searchQuery);
        }
        else {
            console.error(':/ You searched for an empty name');
        }
    }

    // Fetching data to get the pokemon 

    const fetchPokemon = (pokemonName) => {
        fetch('https://pokeapi.co/api/v2/pokemon/${pokemonName}')
        .then((pokemonData) => pokemonData.json())
        .then((pokemonData) => {
            getPokemon(pokemonData);
            console.log(pokemonData);
        })
        .catch(console.error);
        getPokemon(null);
    }

    // Handle the variables in HTML where user can type, send and retrieve back the data

    if (pokemon) {
        return (
            <Container>
                <div className="pokemon-search">
                    <TextInput value={searchQuery} onChange={ChangeQuery} placeholder="Search Pokemon name..."/>
                    <Button onClick={searchPokemon}>Search</Button>
                </div>
                <div className="pokemon-card">
                    <h1> {pokemon.name} </h1>
                    <Image src={pokemon.image}/>
                </div>
            </Container>
        );
    } else {
        return (
            <Container>
                <div className="pokemon-search">
                    <TextInput value={searchQuery} placeholder="Search Pokemon name..."/>
                    <Button onClick={searchPokemon}>Search</Button>
                </div>
                <p>No Pokemon found. Please search for a Pokemon.</p>
            </Container>
        );
    };
};

// export the Pokemon object to use in other React files

export default Pokemon;


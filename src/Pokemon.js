import React, { useState } from 'react';
import { Card, Image, Text, Title, Loader, Button, Center, Container, Grid } from '@mantine/core';

// Importing useState to get initial const data and to set a function to use to update the data from users
// Looking to use axios for fetch requests, error handling " import axios from 'axios'; "

// Creating 'object' Pokemon to pass for rendering

const Pokemon = () => {
    const [pokemon, getPokemon] = useState(null);
    const [searchQuery, setQuery] = useState(''); 

    // Fetching data to get the pokemon 

    function fetchPokemon(pokemonName){
        fetch("https://pokeapi.co/api/v2/pokemon/")
        .then((pokemonData) => pokemonData.json())
        .then((pokemonData) => {
            getPokemon(pokemonData);
            console.log(pokemonData);
        })
        .catch(console.error);
    }

    // Change the value of query with new input event
    
    function ChangeQuery(eventSearch){
        setQuery(eventSearch.target.value);
    }

    // Handling search input and pass the query to the fetch

    function searchPokemon(searchQuery){
        if (searchQuery !== '') {
            fetchPokemon(searchQuery);
        }
        else {
            console.error(':/ You searched for an empty name');
        }
    }

    // Handle the variables in HTML where user can type, send and retrieve back the data

    if (pokemon) {
        return (
            <Container>
                <div class="pokemon-search">
                    <input type="text" value={searchQuery} placeholder="Search Pokemon name..."/>
                    <Button onClick={searchPokemon}>Search</Button>
                </div>
                <div class="pokemon-card">
                    <h1> {pokemon.name} </h1>
                    <img src={pokemon.image}/>
                </div>
            </Container>
        );
    } else {
        return (
            <Container>
                <div class="pokemon-search">
                    <input type="text" value={searchQuery} placeholder="Search Pokemon name..."/>
                    <Button onClick={searchPokemon}>Search</Button>
                </div>
                <p>No Pokemon found. Please search for a Pokemon.</p>;
            </Container>
        );
    };
};

// export the Pokemon object to use in other React files

export default Pokemon;


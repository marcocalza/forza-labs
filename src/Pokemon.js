import React, { useState } from 'react';
import { Card, Image, Text, Title, Loader, Button, Center, Container, Grid, TextInput } from '@mantine/core';

// Importing useState to get initial const data and to set a function to use to update the data from users
// Looking to use axios for fetch requests, error handling " import axios from 'axios'; "

// Creating 'object' Pokemon to pass for rendering

const Pokemon = () => {
    const [pokemon, getPokemon] = useState(null);
    const [searchQuery, setQuery] = useState('');
    // lastSearchedQuery ==> to make query searched for handling "Not found error" without getting the error being refreshed with the search bar input
    const [lastSearchedQuery, setLastSearchedQuery] = useState(''); 
    const [searchFlag, setsearchFlag] = useState(false); // Flag to make pokemon not to be 'null' without being searched first

    // Change the value of query with new input event
    
    const ChangeQuery = (eventSearch) => {
        setQuery(eventSearch.target.value);
    };

    // Handling search input and pass the query to the fetch

    const searchPokemon = () => {
        if (searchQuery !== '') {
            fetchPokemon(searchQuery);
            setLastSearchedQuery(searchQuery);
        }
        else {
            console.error(':/ You searched for an empty name');
        }
    };

    // Instead of {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} i create

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Fetching data to get the pokemon 

    const fetchPokemon = (pokemonName) => {

        // Clean name from uppercase or accents o weird characters
        const pokemonNameCleaned = pokemonName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameCleaned}`)
        .then((pokemonData) => pokemonData.json())
        .then((pokemonData) => {
            getPokemon(pokemonData);
            console.log(pokemonData);
            setsearchFlag(true);
        })
        .catch((error) => {
            console.error('No pokemon found.');
            getPokemon(null);
            setsearchFlag(true); // Does need to be true! flag must reflect fact that search has been done even with no success
        });
    };

    // Handle the variables in HTML where user can type, send and retrieve back the data
    // Watching for Mantine card style example on https://mantine.dev/core/card/

    return (
        <Container>
            <div className="pokemon-search">
                <TextInput className="search-bar" value={searchQuery} onChange={ChangeQuery} placeholder="Search Pokémon name..."/>
                <Button  className="search-button" onClick={() => searchPokemon()}>Search</Button>
            </div>
            {pokemon ? (
                <Card className="card">
                <div classNAme="card-content">
                    <Card.Section className="top">
                        <Text className="pokemon-type-text"> <ul className="pokemon-types-list">
                            {pokemon.types.map((typeInfo, index) => (
                                <li className="pokemon-type" key={index}>{typeInfo.type.name}</li>
                            ))}
                        </ul> </Text>
                    </Card.Section>
                    <Card.Section className="middle-top">
                        <Card.Section className="middle-top-left">
                            <Title className="pokemon-name"> {capitalize(pokemon.name)} </Title>
                        </Card.Section>
                        <Card.Section className="middle-top-right">
                            <Image className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
                        </Card.Section>
                    </Card.Section>
                    <Card.Section className="middle-bottom">
                    <Text className="stats-text"> <ul className="pokemon-stats-list">
                            {pokemon.stats.map((statInfo, index) => (
                                <li className="pokemon-stat" key={index}>
                                    <div className="stat-value">
                                        <Text>{capitalize(statInfo.stat.name)}</Text>
                                        <Text>{statInfo.base_stat}</Text>
                                    </div>
                                </li>
                            ))}
                        </ul> </Text>
                        <Text className="pokemon-weight"> Weight: {pokemon.weight} </Text>
                        <Text className="pokemon-height"> Height: {pokemon.height} </Text>
                    </Card.Section>
                    <Card.Section className="bottom">
                        <Text className="abilities-text">Abilities: <ul className="pokemon-abilities-list">
                            {pokemon.abilities.map((abilityInfo, index) => (
                                <li className="pokemon-ability" key={index}>{capitalize(abilityInfo.ability.name)}</li>
                            ))}
                        </ul> </Text>
                    </Card.Section>
                </div>
                </Card>
            ) : searchFlag ? (
                <Text>No Pokemon found with such name "{lastSearchedQuery}". Please search for a Pokemon.</Text>
              ) : null} 
        </Container>
    );
};

// export the Pokemon object to use in other React files

export default Pokemon;


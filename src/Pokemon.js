import React, { useState, useEffect } from 'react';
import { Card, Image, Text, Title, Button, Container, TextInput } from '@mantine/core';

// Importing useState to get initial const data and to set a function to use to update the data from users

// Creating 'object' Pokemon to pass for rendering

const Pokemon = () => {
    const [pokemon, getPokemon] = useState(null);
    const [searchQuery, setQuery] = useState('');
    // lastSearchedQuery ==> to make query searched for handling "Not found error" without getting the error being refreshed with the search bar input
    const [lastSearchedQuery, setLastSearchedQuery] = useState(''); 
    const [searchFlag, setsearchFlag] = useState(false); // Flag to make pokemon not to be 'null' without being searched first
    // allPokemon ==> To fetch all the pokemon data to get search of part of the "pokemon.name" to be confronted with all the API data, should be running by default
    const [allPokemon, setAllPokemon] = useState([]);
    // Adding Loader since now code runs slower
    const [loader, setLoader] = useState(false);

    // Let the console get all the Pokemons data in "background" with useEffect
    // Needs to be set as async to to be working in the order in searchPokemon 

    const fetchAllPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9999'); // Get pokemon id up to id=9999
            const pokemonData = await response.json();
            setAllPokemon(pokemonData.results);
            console.log(pokemonData);
        } catch (error) {
            console.error('No Pokemons found');
        }
    };

    useEffect(() => {
        fetchAllPokemon(); 
    }, []);

    // Change the value of query with new input event

    const ChangeQuery = (eventSearch) => {
        setQuery(eventSearch.target.value);
    };

    // Handling search input and pass the query to the fetch
    // Check is query is a pokemon name, if not see if is inside a pokemon name of all the PokeAPI data

    const searchPokemon = async () => {
        if (searchQuery !== '') {
            setLoader(true);
            try {

                await new Promise(resolve => setTimeout(resolve, 10)); // Stops code for 10ms to show loader

                const pokemonFound = await fetchPokemon(searchQuery.toLowerCase());
                if (pokemonFound) {
                    setLastSearchedQuery(searchQuery);
                } else { 
                    const matchedPokemons = allPokemon.filter(pokemon => 
                        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ); 
                    if (matchedPokemons.length > 0) {
                        await fetchPokemon(matchedPokemons[0].name);
                        setLastSearchedQuery(searchQuery);
                    } else {
                        console.error("No Pokémon found");
                        setLastSearchedQuery(searchQuery);
                    }
                } 
            } catch {
                console.error("No Pokémon found");
            } finally {
                setLoader(false);
            }
        }
    };


    // Instead of {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} i create

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Fetching data to get the pokemon 
    // Adding async while need to check order of execution of searchPokemon witch check the query and the allPokemon data

    const fetchPokemon = async (pokemonName) => {

        // Clean name from uppercase or accents o weird characters
        const pokemonNameCleaned = pokemonName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameCleaned}`);
            const pokemonData = await response.json();
            getPokemon(pokemonData);
            console.log(pokemonData);
            setsearchFlag(true);
            return true; // Successful fetch for searchPokemon variable "pokemonFound"
        } catch (error) {
            console.error('No "exact name" pokemon found.');
            getPokemon(null);
            setsearchFlag(true); // Does need to be true! flag must reflect fact that search has been done even with no success
            return false; // Unsuccessful fetch for searchPokemon variable "pokemonFound"
        }
    };

    // Handle the variables in HTML where user can type, send and retrieve back the data
    // Watching for Mantine card style example on https://mantine.dev/core/card/

    return (
        <Container>
            <div className="pokemon-search">
                <TextInput className="search-bar" value={searchQuery} onChange={ChangeQuery} placeholder="Search Pokémon name..."/>
                <Button  className="search-button" onClick={() => searchPokemon()}>Search</Button>         
            </div>
            {loader && 
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            }
            {pokemon ? (
                <Card className="card">
                <div className="card-content">
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
                        <div className="physical-stats">
                            <Text className="pokemon-weight"> <strong>Weight:</strong> {pokemon.weight / 10} kg</Text>
                            <Text className="pokemon-height"> <strong>Height:</strong> {pokemon.height / 10} m</Text>
                        </div>
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
                <Text>No Pokémon found with such name "{lastSearchedQuery}". Please search for a Pokémon.</Text>
              ) : null} 
        </Container>
    );
};

// export the Pokemon object to use in other React files

export default Pokemon;


import React, { useState } from 'react';
import { Card, Image, Text, Title, Loader, Button, Center, Container, Grid } from '@mantine/core';

// Importing useState to get initial const data and to set a function to use to update the data from users
// Looking to use axios for fetch requests, error handling " import axios from 'axios'; "

const Pokemon = () => {
    const [pokemon, getPokemon] = useState(null);
    const [searchQuery, setQuery] = useState(''); 

    fetch("https://pokeapi.co/api/v2/pokemon/")
    .then((response) => response.json())
    .then(getPokemon(response) {
        console.log(response);
    })
    .catch(console.error);

}


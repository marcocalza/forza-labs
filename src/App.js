import pokemonLogo from './pokemon_logo.svg';
import './App.css';
import { MantineProvider } from '@mantine/core';
import Pokemon from './Pokemon.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={pokemonLogo} className="App-logo" alt="logo" />
        <p>
          Find your Pokémon!
        </p>
        <MantineProvider  withGlobalStyles withNormalizeCSS>
          <Pokemon />
        </MantineProvider>
        <p className="credits">Take-Home project for Forza Labs by <a className='github-repository-link' title="Watch GitHub repository" href="https://github.com/marcocalza/forza-labs">Marco Calza</a></p>
      </header>
    </div>
  );
}

export default App;

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
          Starting Take Home project with React!
        </p>
        <MantineProvider  withGlobalStyles withNormalizeCSS>
          <Pokemon></Pokemon>
        </MantineProvider>
      </header>
    </div>
  );
}

export default App;

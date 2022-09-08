import './App.css';
import PokemonList from './features/PokemonList'; 

function App() {
  return (
    <div className="App">
      <section id="Hero">
        <div className='container mx-auto flex items-center md:flex-column'>
          {/* <img src='./assets/497-4973553_charizard-pokemon-charizard-png-clipart.png' alt="" />
          <h1 className="text-5xl font-bold bg-red-800 ml-8">Pokemon</h1> */}
        </div>
      </section>
      <PokemonList />
    </div>
  );
}

export default App;

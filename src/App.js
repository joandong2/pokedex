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
        <div className="bg-orange-600 w-full h-[200px] mt-[-150px]"></div>
      </section>
      <h1 className="font-bold bg-red-800">Pokemon</h1>
      <PokemonList />
    </div>
  );
}

export default App;

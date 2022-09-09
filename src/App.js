import './App.css';
import PokemonList from './features/PokemonList'; 

function App() {
  return (
    <div className="App">
      <section id="header">
        <div className='container mx-auto flex items-center md:flex-column px-6 pt-5'>
          <img className="max-h-20" src='./assets/R.png' alt=""/>
        </div>
      </section>
      <PokemonList />
      <section id="footer" className="bg-lightBlack">
        <div className="container mx-auto flex text-center justify-center px-6 py-6 mt-[80px] text-white">
          <p>Powered by <a className="text-center underline text-red-600" href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeApi</a></p>
        </div>
      </section>
    </div>
  );
}

export default App;

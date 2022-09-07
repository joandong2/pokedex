import { useSelector } from 'react-redux'
import { selectAllPokemon } from './pokeSlice'
//import { Link } from 'react-router-dom'

const PokemonList = () => {
    const allPokemon = useSelector(selectAllPokemon)
    //console.log('all', allPokemon)

    const renderedPokemon = allPokemon.map(pokemon => (
        <li >
            {pokemon.name}
        </li>
    ))

    return (
        <section>
            <ul>{renderedPokemon}</ul>
        </section>
    )
}

export default PokemonList
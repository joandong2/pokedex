import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemon, selectAllPokemon, getPokemonCount, getStatus } from './pokeSlice'
//import { Link } from 'react-router-dom'

const PokemonList = () => {
    const allPokemon = useSelector(selectAllPokemon)
    const countPokemon = useSelector(getPokemonCount)
    const status = useSelector(getStatus)
    const dispatch = useDispatch()
    
    console.log('status', status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemon())
        }
     }, [status, dispatch]);

    return (
        <section>
            { allPokemon.map(poke=> (
                <h1>{poke.name}</h1>
            )) }
        </section>
    )
}

export default PokemonList
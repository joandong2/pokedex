import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    fetchPokemon, 
    selectAllPokemon, 
    getPokemonCount, 
    getStatus, 
    getNextUrl, 
    getPrevUrl 
} from './pokeSlice'
//import { Link } from 'react-router-dom'

const PokemonList = () => {
    const [curr_Url, setCurr_Url] = useState('https://pokeapi.co/api/v2/pokemon/?limit=12')
    const allPokemon = useSelector(selectAllPokemon)
    //const countPokemon = useSelector(getPokemonCount)
    const nextUrl = useSelector(getNextUrl)
    const prevUrl = useSelector(getPrevUrl)
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemon(curr_Url))
        }
    }, [status, dispatch, curr_Url ]);

    const handleNextEvent = (e) => {
        e.preventDefault();
        dispatch(fetchPokemon(nextUrl))
    }

    const handlePrevEvent = (e) => {
        e.preventDefault();
        dispatch(fetchPokemon(prevUrl))
    }

    return (
        <section>
            { allPokemon.map(poke=> (
                <h1>{poke.name}</h1>
            )) }
            <div className="flex space-x-2">
                <button className="rounded bg-red-500 font-bold p-2 text-white" onClick={handlePrevEvent}>PREVIOUS</button>
                <button className="rounded bg-red-500 font-bold p-2 text-white" onClick={handleNextEvent}>NEXT</button>
            </div>
            
        </section>
    )
}

export default PokemonList
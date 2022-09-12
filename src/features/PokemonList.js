import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  
    selectAllPokemon, 
    fetchPokemon,
    getState
} from './pokeSlice'
import Pokemon from './Pokemon'

const PokemonList = () => {
    //const allPokemon = useSelector(selectAllPokemon)
    const currState = useSelector(getState)
    const POKEMON = JSON.parse(localStorage.getItem("jl_pokemon"));
    const [index, setIndex] = useState(0)
    const [offset, setOffset] = useState(currState.count);
    const dispatch = useDispatch()

    useEffect(() => {
        if(currState.status === 'idle') {
            dispatch(fetchPokemon(POKEMON[index].url))
            setIndex(index + 1)
        }
    }, [dispatch, POKEMON, currState, index])

    const handleNextEvent = (e) => {
        e.preventDefault();
        //setOffset(endOffset)
    }

    const handlePrevEvent = (e) => {
        e.preventDefault();
        //setOffset(endOffset - (LIMIT*2))
    }

    console.log('state', currState)
    console.log('index', index)

    return (
        <section>
            <div className="container flex flex-wrap justify-between items-center px-6 mx-auto mt-5">
                { currState.pokemon.map(poke=> (
                    <>
                        <Pokemon attributes={poke} />
                    </>
                )) }
            </div>
            <div className="container mx-auto flex space-x-2 pl-10 mt-4 mb-4">
                <button className="rounded bg-red-500 font-bold py-2 px-4 text-white" onClick={handlePrevEvent}>PREVIOUS</button>
                <button className="rounded bg-red-500 font-bold py-2 px-4 text-white" onClick={handleNextEvent}>NEXT</button>
            </div>
        </section>
    )
}

export default PokemonList
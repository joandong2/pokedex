import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  
    selectAllPokemon, 
    fetchPokemon,
    getState
} from './pokeSlice'
import Pokemon from './Pokemon'

const PokemonList = () => {
    const allPokemon = useSelector(selectAllPokemon)
    const currState = useSelector(getState)
    const POKEMON = JSON.parse(localStorage.getItem("jl_pokemon"));
    const LIMIT = currState.limit;
    const [offset, setOffset] = useState(0);
    const [endOffset, setEndoffset] = useState(LIMIT); // 5
    const dispatch = useDispatch()
    let i = 0;

    // useEffect(() => {
    //     POKEMON.slice(offset, endOffset).map((poke) => (
    //         currState.status === 'idle' ? dispatch(fetchPokemon(poke.url)) : 'hello'
    //     ))
    // }, [dispatch, POKEMON, currState.status, offset, endOffset])

    useEffect(() => {
        if(currState.status === 'idle') {
            dispatch(fetchPokemon(POKEMON[currState.pokemon.length].url))
        }
    }, [dispatch, POKEMON, currState, offset])

    const handleNextEvent = (e) => {
        e.preventDefault();
        setOffset(endOffset)
        setEndoffset(endOffset + LIMIT)
    }

    const handlePrevEvent = (e) => {
        e.preventDefault();
        setOffset(endOffset - (LIMIT*2))
    }

    console.log('length', currState.pokemon.length)
    console.log('status', currState.status)

    return (
        <section>
            <div className="container flex flex-wrap justify-between items-center px-6 mx-auto mt-5">
                { allPokemon.map(poke=> (
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
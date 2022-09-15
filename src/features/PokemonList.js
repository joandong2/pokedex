import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  
    selectAllPokemon, 
    fetchPokemon,
    getState,
    resetPokemon
} from './pokeSlice'
import Pokemon from './Pokemon'

const PokemonList = () => {
    const currState = useSelector(getState)
    const allPokemon = useSelector(selectAllPokemon)
    const POKEMON = JSON.parse(localStorage.getItem("jl_pokemon"));
    const LIMIT = currState.limit;
    const [offset, setOffset] = useState(0);
    const [endOffset, setEndoffset] = useState(LIMIT); // 5
    const dispatch = useDispatch()
    
    useEffect(() => {
        POKEMON.slice(offset, endOffset).map((poke, index) => (
                currState.status === 'idle' ? 
                    dispatch(fetchPokemon(poke.url)) : null
        ))
    }, [dispatch, POKEMON, offset, endOffset, currState])

    const handleNextEvent = (e) => {
        e.preventDefault();
        setOffset(endOffset)
        setEndoffset(endOffset + LIMIT)
        dispatch(resetPokemon())
    }

    const handlePrevEvent = (e) => {
        e.preventDefault();
        setOffset(offset - LIMIT)
        setEndoffset(endOffset - LIMIT)
        dispatch(resetPokemon())
    }

    //console.log('state', currState)
    // console.log('offset', offset)
    // console.log('end', endOffset)

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
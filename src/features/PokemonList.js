import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  
    getStateStatus, 
    getPokemonUrl,
    getPokemon,
    getStateLimit,
    fetchPokemon,
    resetPokemon,
    
} from './pokeSlice'
import Pokemon from './Pokemon'

const PokemonList = () => {
    const currStatus = useSelector(getStateStatus)
    //const currLimit = useSelector(getStateLimit)
    const currPokemonUrl = useSelector(getPokemonUrl)
    const currPokemon = useSelector(getPokemon)
    //const [offset, setOffset] = useState(0);
    //const [endOffset, setEndoffset] = useState(LIMIT); // 5
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(currStatus === "fetchAll-success") {
            currPokemonUrl.map((poke, index) => (
                dispatch(fetchPokemon(poke.url))
            ))
        }
    }, [dispatch, currPokemonUrl, currStatus])

    // const handleNextEvent = (e) => {
    //     e.preventDefault();
    //     dispatch(fetchAllPokemon(nextUrl))
    // }

    // const handlePrevEvent = (e) => {
    //     e.preventDefault();
    //     dispatch(fetchAllPokemon(prevUrl))
    // }

    return (
        <section>
            <div className="container flex flex-wrap justify-between items-center px-6 mx-auto mt-5">
                { currPokemon.map(poke=> (
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
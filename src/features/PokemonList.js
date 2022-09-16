import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    fetchAllPokemon, 
    selectAllPokemon, 
    getPokemonData,
    getStatus, 
    getNextUrl, 
    getPrevUrl, 
    fetchPokemon
} from './pokeSlice'
import Pokemon from './Pokemon'


const PokemonList = () => {
    const allPokemon = useSelector(selectAllPokemon)
    const allPokemonData = useSelector(getPokemonData)
    const nextUrl = useSelector(getNextUrl)
    const prevUrl = useSelector(getPrevUrl)
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        if(status === 'fetch-success') {
            allPokemon.map((poke) => (
                dispatch(fetchPokemon(poke.url))
            ))
        }
    }, [status, dispatch, allPokemon]);

    const handleNextEvent = (e) => {
        e.preventDefault();
        dispatch(fetchAllPokemon(nextUrl))
    }

    const handlePrevEvent = (e) => {
        e.preventDefault();
        dispatch(fetchAllPokemon(prevUrl))
    }

    return (
        <section>
            <div className="container flex flex-wrap justify-between items-center px-6 mx-auto mt-5">
                { allPokemonData.length === 18 ? 
                    (   
                        <div className="flex items-center justify-center">
                            <button type="button" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled>
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black z-auto" viewBox="0 0 24 24"></svg>
                                Processing...
                            </button>
                        </div>
                    ) : (
                        allPokemonData.map((poke, index)=> (
                            <Pokemon attributes={poke} key={index}/>
                        )) 
                    )
                }
                
            </div>
            <div className="container mx-auto flex space-x-2 pl-10 mt-4 mb-4">
                <button className="rounded bg-red-500 font-bold py-2 px-4 text-white" onClick={handlePrevEvent}>PREVIOUS</button>
                <button className="rounded bg-red-500 font-bold py-2 px-4 text-white" onClick={handleNextEvent}>NEXT</button>
            </div>
        </section>
    )
}

export default PokemonList
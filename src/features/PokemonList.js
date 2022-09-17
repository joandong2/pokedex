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
                { allPokemonData.length !== 18 ? 
                    (   
                        <div className="flex items-center space-x-2 w-full justify-center">
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-1 rounded-full" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow inline-block w-4 h-4 bg-current rounded-full opacity-0" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-between">
                            { allPokemonData.map((poke, index)=> (
                                <Pokemon attributes={poke} key={index}/>
                            )) }
                        </div>
                        
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
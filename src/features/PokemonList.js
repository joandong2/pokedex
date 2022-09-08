import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    fetchAllPokemon, 
    selectAllPokemon, 
    getPokemonCount, 
    getPokemonData,
    getStatus, 
    getNextUrl, 
    getPrevUrl, 
    fetchPokemon
} from './pokeSlice'
import Pokemon from './Pokemon'
//import { Link } from 'react-router-dom'

const PokemonList = () => {
    const [curr_Url, setCurr_Url] = useState('https://pokeapi.co/api/v2/pokemon/?limit=16')
    const allPokemon = useSelector(selectAllPokemon)
    const allPokemonData = useSelector(getPokemonData)
    const nextUrl = useSelector(getNextUrl)
    const prevUrl = useSelector(getPrevUrl)
    const status = useSelector(getStatus)

    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllPokemon(curr_Url))
        }

        if(status === 'success') {
            allPokemon.map((poke) => (
                dispatch(fetchPokemon(poke.url))
            ))
        }

    }, [status, dispatch, curr_Url, allPokemon ]);

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
            <div className="container flex flex-wrap justify-between items-center px-6 mx-auto mt-10">
                { allPokemonData.map(poke=> (
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
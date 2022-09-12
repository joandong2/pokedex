import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  
    selectAllPokemon, 
    getStatus,  
    fetchPokemon
} from './pokeSlice'
import Pokemon from './Pokemon'

const PokemonList = () => {
    //const allPokemon = useSelector(selectAllPokemon)
    const LIMIT = 5;
    const [offset, setOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(LIMIT);
    const POKEMON = JSON.parse(localStorage.getItem("jl_pokemon"));
    const dispatch = useDispatch()

    useEffect(() => {
        setEndOffset(offset + LIMIT);
        POKEMON.slice(offset, endOffset).map((poke) => (
            //console.log(poke.url)
            dispatch(fetchPokemon(poke.url))
        ))
    }, [offset, endOffset, dispatch, POKEMON])

    const handleNextEvent = (e) => {
        e.preventDefault();
        setOffset(endOffset)
    }

    const handlePrevEvent = (e) => {
        e.preventDefault();
        setOffset(endOffset - (LIMIT*2))
    }

    // if(getStatus === 'success'){
    //     console.log('all', allPokemon)
    // }
    
    return (
        <section>
            <div className="container flex flex-wrap justify-between items-center px-6 mx-auto mt-5">
                {/* { allPokemon.map(poke=> (
                    <>
                        <Pokemon attributes={poke} />
                    </>
                )) } */}
            </div>
            <div className="container mx-auto flex space-x-2 pl-10 mt-4 mb-4">
                <button className="rounded bg-red-500 font-bold py-2 px-4 text-white" onClick={handlePrevEvent}>PREVIOUS</button>
                <button className="rounded bg-red-500 font-bold py-2 px-4 text-white" onClick={handleNextEvent}>NEXT</button>
            </div>
        </section>
    )
}

export default PokemonList
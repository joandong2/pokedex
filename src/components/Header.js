import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  searchAllPokemon,
  searchPokemon,
  getSearchedPokemon
} from '../features/pokeSlice'
import Pokemon from '../features/Pokemon'


const Header = () => {
  const [match, setMatch] = useState([])
  const currPokemon = useSelector(getSearchedPokemon)
  let POKEMON;

  const dispatch = useDispatch()

  const handleKey = (e) => {
    if (!localStorage.getItem('jl_pokemon')) {
      dispatch(searchAllPokemon('https://pokeapi.co/api/v2/pokemon/?limit=-1'))
    }
  
    POKEMON = JSON.parse(localStorage.getItem('jl_pokemon'))

    const matchArr = POKEMON.filter(pokemon => {
      const regex = new RegExp(e.target.value, 'gi');
      return pokemon.name.match(regex) 
    })

    setMatch(matchArr)

    if (e.target.value === '') {
      setMatch([]);
    }
  } 

  console.log('curr', POKEMON)

  return (
    <section id="header">
        <div className='container mx-auto justify-between align-middle flex items-center md:flex-column px-6 pt-5'>
          <a href="/"><img className="max-h-20" src='./assets/R.png' alt=""/></a>
          <div className="search">
            <div className="flex flex-col justify-center w-96 relative">
                <div className="input-group relative flex flex-wrap items-stretch w-full mt-6">
                  <input onChange={(e) => {handleKey(e)}} type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                </div>
                { match.length !== 0
                  ?   
                    <div className="p-2 flex-auto min-w-0 block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-bl-md rounded-br-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none overflow-y-scroll max-h-[200px] absolute top-[100%]">
                        <ul>
                          {
                            match.map((res, index) => (
                              <>
                                <li 
                                key={index} 
                                className="py-1 cursor-pointer" 
                                onClick={() => {dispatch(searchPokemon(`https://pokeapi.co/api/v2/pokemon/${res.name}`))}}
                                data-bs-toggle="modal" 
                                data-bs-target={`#${res.name}`} 
                                >{res.name}</li>

                                <div className={`modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto `} id={res.name} tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                                    <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                                        { Object.keys(currPokemon).length !== 0 ? (<Pokemon attributes={currPokemon} key={index}/>) : (null) }
                                    </div>
                                </div>
                              </>

                            ))
                          }
                        </ul>
                    </div> // search div
                  : null
                }
            </div>
          </div>
        </div>
    </section>
  )
}

export default Header
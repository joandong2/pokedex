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
  const POKEMON = JSON.parse(localStorage.getItem('jl_pokemon'))
  const currPokemon = useSelector(getSearchedPokemon)

  const dispatch = useDispatch()

  const handleKey = (e) => {
    if (!localStorage.getItem('jl_pokemon')) {
      dispatch(searchAllPokemon('https://pokeapi.co/api/v2/pokemon/?limit=-1'))
    }

    const matchArr = POKEMON.filter(pokemon => {
      const regex = new RegExp(e.target.value, 'gi');
      return pokemon.name.match(regex) 
    })

    setMatch(matchArr)

    if (e.target.value === '') {
      setMatch([]);
    }
  } 

  console.log('curr', currPokemon)

  return (
    <section id="header">
        <div className='container mx-auto justify-between align-middle flex items-center md:flex-column px-6 pt-5'>
          <img className="max-h-20" src='./assets/R.png' alt=""/>
          <div className="search">
            <div className="flex flex-col justify-center w-96 relative">
                <div className="input-group relative flex flex-wrap items-stretch w-full mt-6">
                  <input onChange={(e) => {handleKey(e)}} type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-t-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                  </button>
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
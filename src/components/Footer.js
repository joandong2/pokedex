import React from 'react'

const Footer = () => {
  return (
    <section id="footer" className="bg-lightBlack">
        <div className="container mx-auto flex text-center justify-center px-6 py-6 mt-[80px] text-white">
          <p>Powered by <a className="text-center underline text-red-600" href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeApi</a></p>
        </div>
    </section>
  )
}

export default Footer
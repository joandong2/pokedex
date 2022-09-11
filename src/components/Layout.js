import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// represents all the children of the layout
const Layout = () => {
  return (
    <>
      <Header />
      <main className='App'>
          <Outlet />
      </main>
      <Footer />
    </>
    
  )
}

export default Layout
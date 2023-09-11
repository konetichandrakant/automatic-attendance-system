import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'

function Header() {
  return (
    <div>
      <div>
        <Route path='/' Component={Home}>
          Home
        </Route>
      </div>
      <div>
        <Route path='/profile/:userId' Component={Profile}>
          
        </Route>
      </div>
    </div>
  )
}

export default Header
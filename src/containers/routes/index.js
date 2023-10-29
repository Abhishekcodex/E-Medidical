import React from 'react'
import Home from '../components/home'
import { Route, Routes } from 'react-router-dom'
import RedirectToHome from '../components/redirectLogin'
import Layout from '../components/layout'
const RedirectRoutes = () => {
  return (
    <Routes>
            <Route path='/' element={<RedirectToHome />}/>
            <Route path='/' element={<Layout />}>
                <Route path='/home' element={<Home />} />
            </Route>
    </Routes>
  )
}

export default RedirectRoutes

import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Footer from './Pages/Footer';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Work from './Pages/Work';
import BrowseFundi from './Pages/BrowseFundi';

function App() {
  return (
    <BrowserRouter>
    <div className='flex flex-colunm min-hv-100'><Navbar/></div>
    <main className="flex-grow-1">
      <Routes>
        <Route path='/index.html' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/how-it-works' element={<Work/>}/>
        <Route path='/fundis' element={<BrowseFundi/>}/>
      </Routes>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
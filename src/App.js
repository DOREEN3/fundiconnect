import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Footer from './Pages/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className='flex flex-colunm min-hv-100'><Navbar/></div>
    <main className="flex-grow-1">
      <Routes>
        <Route path='/index.html' element={<Home/>}/>
        <Route path='/about us' element={<About/>}/>
        <Route path='/contact us' element={<Contact/>}/>
      </Routes>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
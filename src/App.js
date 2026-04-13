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
import { AuthProvider } from './Context/AuthContext';
import Pricing from './components/Pricing'
import ProtectedRoute from './components/ProtectedRoute';
import MyBookings from './components/MyBookings'

// Fundi Pages
import Dashboard from './FundiComponent/Dashboard';
import MyJobs from './FundiComponent/MyJobs';
import Reviews from './FundiComponent/Reviews';

// Admin Pages
import Overviews from './AdminComponent/Overviews';
import Logs from './AdminComponent/Logs';
import Approvals from './AdminComponent/Approvals';
import Fundi from './AdminComponent/Fundi';
import User from './AdminComponent/User';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <div className='flex flex-colunm min-hv-100'><Navbar/></div>
    <main className="flex-grow-1">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/how-it-works' element={<Work/>}/>
        <Route path='/fundis' element={<BrowseFundi/>}/>

        {/* fundi only */}
        <Route element={<ProtectedRoute allowedRoles={['fundi']} />}/>
       <Route path="/fundi/dashboard" element={<Dashboard />} />
       <Route path="/fundi/jobs" element={<MyJobs />} />
       <Route path="/fundi/reviews" element={<Reviews/>}/>

       {/* user only */}
       <Route element={<ProtectedRoute allowedRoles={['user']}/>}/>
       <Route path='/bookings' element={<MyBookings/>}/>

      {/* guest only  */}
      <Route element={<ProtectedRoute allowedRoles={['guest']}/>}/>
      <Route path='/pricing' element={<Pricing/>}/>      

      {/* admin only   */}
      <Route element={<ProtectedRoute allowedRoles={['admin']}/>}/>
      <Route path='/admin' element={<Overviews/>}/>
      <Route path='/admin/users' element={<User/>}/>
      <Route path='/admin/logs' element={<Logs/>}/>
      <Route path='/admin/fundis' element={<Fundi/>}/>
      <Route path='/admin/approvals' element={<Approvals/>}/>
      </Routes>
    </main>
    <Footer/>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
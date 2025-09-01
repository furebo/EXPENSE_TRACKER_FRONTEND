import React from 'react'
import {BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Logout from './pages/Auth/Logout';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expanses from './pages/Dashboard/Expanses';
import {UserProvider} from './context/UserContext';
import {Toaster} from 'react-hot-toast';

const App = () => {
  return (
     <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>}/>
          <Route path='/login' exact element={<Login />}/>
          <Route path='/signup' exact element={<Signup />}/>
          <Route path='/dashboard' exact element={<Home />}/>
          <Route path='/income' exact element={<Income />}/>
          <Route path='/expanse' exact element={<Expanses />}/>
          <Route path='/logout' element={<Logout />}/>
        </Routes>
      </Router>
      <Toaster 
        toastOptions={{
          className:'',
          style:{
            fontSize:"13px"
          }
        }}
      />
   </UserProvider>
  )
}

export default App

const Root = () =>{
  //check if the token is located in Local storage
  const isAuthenticated = !!localStorage.getItem('token');
  //redirect to Dashboard if authenticated otherwise redirect to login
  return isAuthenticated ? (<Navigate to = '/dashboard' />) : (<Navigate to = '/login' />)
}
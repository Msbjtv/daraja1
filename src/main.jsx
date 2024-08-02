import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './index.css';
import SignUp from './Frontend/Signup.jsx';
import Activate from './Frontend/Activate.jsx';
import Login from './Frontend/Login.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<SignUp/>}/>
      <Route path='account' element={<Activate/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
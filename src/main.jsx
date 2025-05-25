import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router, RouterProvider } from 'react-router-dom'
import App from './quote generater/App'



//import './index.css'
//import App from '../../ToDoTask/App.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
   <App />
</StrictMode>
    

   
)

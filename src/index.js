import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Home from './containers/Home/Home';
import AddProduct from './containers/AddProduct/AddProduct';
import reportWebVitals from './reportWebVitals';


//on deply its '/request.php'
//dev is 'http://localhost/request.php'
const apiUrl = 'http://localhost/request.php'
//on deploy change it to 'same-origin'
//dev is cors
const fetchMode = 'cors'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home apiUrl={apiUrl} fetchMode={fetchMode}/>,
  },
  {
    path: "/addproduct",
    element: <AddProduct apiUrl={apiUrl} fetchMode={fetchMode}/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);


reportWebVitals();

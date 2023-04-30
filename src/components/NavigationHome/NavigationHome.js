import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';

const NavigationHome = ({ deleteByIds }) => {
  return (
    <div className="navigation-home">
      <h1> Products List</h1>
      <div className="buttons">
        <Link to={`/addproduct`}><button id="goback">ADD</button></Link>
        <button onClick={deleteByIds}>MASS DELETE</button>
      </div>
    </div>
  )
}

export default NavigationHome;
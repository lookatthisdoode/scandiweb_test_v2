import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';

const NavigationAdd = ({ }) => {

  return (
    <nav className="navigation-add">
      <h1>Add Product </h1>
      <div className="buttons">
        <button id="Save" onclick="submitform()">Save</button>
        <Link to={`/`}><button id="goback">CANCEL</button></Link>
      </div>
    </nav>
  )
}

export default NavigationAdd;
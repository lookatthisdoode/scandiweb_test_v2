import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';

const NavigationAdd = ({ submitForm }) => {
  return (
    <div className="navigation-add">
      <h1>Add Product </h1>
      <div className="buttons">
        <button id="Save" onClick={(e) =>submitForm(e)}>Save</button>
        <Link to={`/`}><button id="goback">CANCEL</button></Link>
      </div>
    </div>
  )
}

export default NavigationAdd;
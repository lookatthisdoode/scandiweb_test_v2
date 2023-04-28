import React, { useState } from 'react'
//import './ProductCard.css'

const NavigationAdd = ({onRouteChange}) => {
  //const { id, sku, name, price, weight, height, picture } = product
  //const [ isLiked, setIsLiked] = useState(false)

  return (
    <div className="Navigation">
      <button onClick={ () => onRouteChange('home') }>Save</button>
      <button onClick={ () => onRouteChange('home') }>Cancel</button>
    </div>
  )
}

export default NavigationAdd;
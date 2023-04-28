import React, { useState } from 'react'
//import './ProductCard.css'

const NavigationHome = ({onRouteChange}) => {
  //const { id, sku, name, price, weight, height, picture } = product
  //const [ isLiked, setIsLiked] = useState(false)
  
  return (
    <div className="navigation">
      <button onClick={ () => onRouteChange('add') }>Add product</button>
      <button>Delete them all</button>
    </div>
  )
}

export default NavigationHome;
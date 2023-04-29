import React, { useState } from 'react'
//import './ProductCard.css'

const NavigationHome = ({deleteByIds}) => {
  //const { id, sku, name, price, weight, height, picture } = product
  //const [ isLiked, setIsLiked] = useState(false)

  return (
    <div className="navigation">
      <button onClick={console.log('go to second page')}>Add product</button>
      <button onClick={deleteByIds}>Delete them all</button>
    </div>
  )
}

export default NavigationHome;
import React, { useState } from 'react'

const ProductCard = (props) => {
  const { id, sku, name, price, weight, size, width, length, height, product_type } = props.product

  return (
    <div className="product-card" key={id}>
      <div className="checkbox-container">
        <input
        className="delete-checkbox"
          type="checkbox"
          id={`checkbox${id}`}
        />
        <div className='delete_text'>Check to delete</div>
      </div>
      <div className="product-info">
        <div className="product-sku">   Sku: <span>{sku}</span></div>
        <div className="product-type">  Type: <span>{product_type}</span></div>
        <div className="product-name">  Name: <span>{name}</span></div>
        <div className="product-price"> Price: <span>{price} $</span></div>
        {product_type === 'DVD' && (
          <div className="product-size">Size: <span>{size} Mb</span></div>
        )}
        {product_type === 'Furniture' && (
          <>                        
            <div className="product-width">Width: <span>{width} Cm</span></div>
            <div className="product-length">Length: <span>{length} Cm</span></div>
            <div className="product-height">Height: <span>{height} Cm</span></div>
          </>
        )}
        {product_type === 'Book' && (
          <div className="product-weight">Weight: {weight} Kg</div>
        )}
      </div>
    </div>
  )
}

export default ProductCard;
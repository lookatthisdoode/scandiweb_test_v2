import React, { useState } from 'react'
import './ProductCard.css'

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
        <div className="product-sku">Sku: {sku}</div>
        <div className="product-type">Type: {product_type}</div>
        <div className="product-name">Name: {name}</div>
        <div className="product-price">Price: {price} $</div>
        {product_type === 'DVD' && (
          <div className="product-size">Size: {size} MB</div>
        )}
        {product_type === 'Furniture' && (
          <>                        
            <div className="product-width">Width: {width} Cm</div>
            <div className="product-length">Length: {length} Cm</div>
            <div className="product-height">Height: {height} Cm</div>
          </>
        )}
        {product_type === 'Book' && (
          <div className="product-weight">Weight: {weight} Kg</div>
        )}
      </div>
    </div>
  )
  // return (
  //   <div className="card" key={key}>
  //     <input id={'checkbox' + product.id } type="checkbox"/>
  //     <div className="sku">{product.sku}</div>
  //     <div className="name">{product.name}</div>
  //     <div className="type">{product.type}</div>
  //     <div className="price">{product.price + '$'}</div>
  //     <div className="size">{product.size}</div>
  //   </div>
  // )
}

export default ProductCard;
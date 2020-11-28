import React from 'react';

import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem: {imageUrl, name, price, quantity} }) => (
  <div className='checkout-item'>
    <div className='image-container'>
      <img src={imageUrl} alt='item' />
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'><span>&#10094;</span> {quantity} <span>&#10095;</span></span>
    <span className='price'>${price}</span>
    <div className='remove-button'>&#10006;</div>
  </div>
)

export default CheckoutItem

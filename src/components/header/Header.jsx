import React from 'react';
import iconLogo from '../../assets/logo/logo.png'
import iconCart from '../../assets/logo/cart.png'

function Header() {
  return (
    <div className='flex p-4 justify-between items-center'>
        <div className='w-10 md:w-20'>
          <a href="/products">
            <img srcSet={iconLogo}/>
          </a>
        </div>
        <div>

        </div>
        <div className='w-10 md:w-15'>
          <a href="/cart">
            <img srcSet={iconCart} alt="" />
          </a>
        </div>
    </div>
  )
}

export default Header
import React from 'react';
import iconLogo from '../../assets/logo/logo.png'
import iconCart from '../../assets/logo/cart.png'

function Header() {
  return (
    <div className='flex p-4 justify-between items-center'>
        <div className='w-1'>
          <img srcSet={iconLogo} alt="" />
        </div>
        <div>
            plisy
        </div>
        <div className='w-10'>
          <img srcSet={iconCart} alt="" />
        </div>
    </div>
  )
}

export default Header
import React from 'react';
import iconVr from '../../assets/logo/logo.png';
import iconAllegro from '../../assets/logo/allegro.png';

function Footer() {
  return (
    <div className='w-4/5 md:w-3/5 2xl:w-2/5 m-auto flex justify-center items-center gap-10 py-10 border-t-2 border-t-[#bbb3ad]'>
        <div className='flex justify-center'>
            <img className='w-3/5 md:w-auto' srcSet={iconVr} alt="ikona VIK-ROLL" />
        </div>
        <div className='flex justify-center'>
            <img className='w-3/5 md:w-auto' srcSet={iconAllegro} alt="ikona Allegro" />
        </div>
    </div>
  )
}

export default Footer
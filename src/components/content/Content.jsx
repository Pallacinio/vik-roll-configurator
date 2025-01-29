import React from 'react'

function Content({ children }) {
  return (
    <div className='w-full md:w-4/5 m-auto'>
        {children}
    </div>
  )
}

export default Content
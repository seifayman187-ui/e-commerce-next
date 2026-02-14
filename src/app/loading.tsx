import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-300/50 backdrop-blur-sm z-50'>
      
      <span className="loader"></span>
    </div>
  )
}

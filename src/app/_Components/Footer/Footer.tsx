'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Footer() {
  return (
    <footer>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <Link
            href="/"
            className="flex items-center gap-2"
            >
          <div className='flex items-center gap-3'>
            
             <Image src={'/image/freshcart-logo.svg'} alt='logo' width={100} height={100} />
          
          </div>
        </Link>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          <p >About</p>
          <p >Features</p>
          <p >Works</p>
          <p >Career</p>
        </div>

        <div className='flex items-center gap-4'>
          
            <i className='fa-brands fa-facebook-f'></i>
          
            <i className='fa-brands fa-instagram'></i>
          
            <i className='fa-brands fa-twitter'></i>
          
            <i className='fa-brands fa-linkedin-in'></i>
        </div>
      </div>

      

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`} <a href='#'>GT</a>, Made with us hope better shoping.
        </p>
      </div>
    </footer>
  )
}

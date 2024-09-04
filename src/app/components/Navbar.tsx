import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  return (
    <div className='flex flex-col py-10 p-4 w-60 h-screen font-san bg-gradient-to-r from-pink-600 to-pink-500'>
      <Link className='py-2 my-2 pl-4 text-white rounded-full hover:bg-white hover:text-pink-600' href={'/'}>Dashboard</Link>
      <Link className='py-2 my-2 pl-4 text-white rounded-full hover:bg-white hover:text-pink-600' href={'/Projects'}>Projects</Link>
      <Link className='py-2 my-2 pl-4 text-white rounded-full hover:bg-white hover:text-pink-600' href={'/Clients'}>Clients</Link>
    </div>
  )
}

export default Navbar
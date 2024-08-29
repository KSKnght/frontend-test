import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  return (
    <div className='flex flex-col p-5 w-32 bg-slate-500'>
      <Link href={'/'}>Dashboard</Link>
      <Link href={'/Projects'}>Projects</Link>
      <Link href={'/Clients'}>Clients</Link>
    </div>
  )
}

export default Navbar
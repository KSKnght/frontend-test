'use client';

import Link from 'next/link'
import React, {useState } from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";


export default function Navbar() {
  const [expanded, setExpanded] = useState(true)

  return(
    <aside className="h-screen">
      <nav className='h-full flex-col bg-white border-r shadow-sm w-80'>
        <div className='p-4 pb-2 flex justify-between items-center'>
            <button onClick={() => setExpanded(curr => !curr)}className='p-1.5 rounded-lg hover:bg-gray-100'>
              {expanded ? <BsArrowLeftShort className='hover:rotate-180 transition-transform ease-in'/> : 
                          <BsArrowRightShort className='hover:rotate-180 transition-transform ease-in'/>}
            </button>
        </div>
          <NavbarItem icon={<MdSpaceDashboard size={20} />} text="Dashboard" link='/' active={undefined}/> 
          <NavbarItem icon={<HiDocumentText size={20} />} text="Projects" link='/Projects' active/>
          <NavbarItem icon={<IoPerson size={20} />} text="Clients" link='/Clients' active={undefined}/>
        
        
        <div>
          <ul className='flex-1 px-3'>{}</ul>
        </div>



      </nav>        
    </aside>
  );
}

export function NavbarItem({icon, text, link, active}) {
  return (
    <Link href={link} className={`${active ? 'bg-gradient-to-tr from-pink-200 to-pink-100 text-pink-700' 
                                           : 'hover:bg-pink-50 text-gray-600'}
                                          relative flex items-center py-2 px-3 my-2 mx-2 font-medium
                                          rounded-md cursor-pointer transition-colors ease-out`}>
      {icon}
      <span className='w-52 ml-3'>
        {text}
      </span>
    </Link>
  );
}



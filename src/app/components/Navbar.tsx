'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi2";





export default function Navbar() {
  const [hide, setHide] = useState(false)

  return(
    <aside className="h-screen">
      <nav className='h-full flex-col bg-white border-r shadow-sm w-80'>
        <div className='p-4 pb-2 flex justify-between items-center'>
            <button className='p-1.5 rounded lg bg-gray-50 hover:bg-gray-100'>
              <BsArrowLeftShort />
            </button>
        </div>
          <NavbarItem icon={<MdSpaceDashboard size={20} />} text="Dashboard" link='/'/> 
          <NavbarItem icon={<HiDocumentText size={20} />} text="Projects" link='/Projects'/>
          <NavbarItem icon={<IoPerson size={20} />} text="Clients" link='/Clients'/>
        <div>
          <ul className='flex-1 px-3'></ul>
        </div>

        <div className='border-t flex p-3'>
          <img
            src='https://ui-avatars.com/api/?background=random'
            alt=''
            className='w-10 h-10 rounded-md'
          />
          <div className='flex justify-left items-center w-auto ml-3'>

          </div>
          <div className='leading-4'>
            <h4 className='font-semibold'>Jon Edward Dicipulo</h4>
            <span className='text-xs text-gray-600'>username@gmail.com</span>
          </div>
          <BsThreeDotsVertical size={25} className='ml-auto' />
        </div>
      </nav>        
    </aside>
  );
}

export function NavbarItem({icon, text, link}) {
  return (
    <Link href={link} className='{
      relative flex items-center py-2 px-3 my-1
      font-medium roudned-md cursor-pointer
    }'>
      {icon}
      <span className='w-52 ml-3'>{text}</span>
    </Link>
  );
}



'use client';

import Link from 'next/link'
import React, {useState } from 'react'
import { HiUser } from "react-icons/hi";
import { HiDocumentText } from "react-icons/hi2";
import { HiOutlineMenu } from "react-icons/hi";

export default function Navbar() {
  const [expanded, setExpanded] = useState(true)

  return(
    <aside className="h-screen">
      <nav className={`${expanded ? 'w-auto' : 'w-80'}
             h-full flex-col bg-white border-r shadow-sm transition-all`}>
        <div className='p-4 pb-2 flex justify-between items-center mb-12'>
          <img
            src='https://img.logoipsum.com/297.svg'
            className={`${expanded ? 'w-0' 
              : 'w-[11rem]'}
             overflow-hidden transition-all`}
            alt=''
          />
          <button onClick={() => setExpanded(curr => !curr)} className='p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors'>
            <HiOutlineMenu className='w-6 h-6'/>
          </button>
        </div>
        
        <div className='px-3'>  
          <li className='relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer text-slate-800 transition-colors hover:bg-slate-100'>
              <Link href='/Projects' className='flex'>
                <HiDocumentText className='w-5 h-5'/>
                <span className={`${expanded ? 'w-0' : 'w-[11rem] ml-5'}
                                  overflow-hidden transition-all`}>
                  Projects
                </span>
              </Link>
          </li>
          <li className='relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer text-slate-800 transition-colors hover:bg-slate-100'>
              <Link href='/Clients' className='flex'>
                <HiUser className='w-5 h-5'/>
                <span className={`${expanded ? 'w-0' : 'w-[11rem] ml-5'}
                                  overflow-hidden transition-all`}>
                  Clients
                </span>
              </Link>
          </li>
        </div>


        <div>
          <ul className='flex-1 px-3'>{}</ul>
        </div>



      </nav>        
    </aside>
  );
}




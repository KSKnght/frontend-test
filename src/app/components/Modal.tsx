import React from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

export default async function Modal({returnLink, children, name } : { children: React.ReactNode , returnLink : any, name: String}) {

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="flex flex-col">
          
          <div className="p-8 border max-w-3xl shadow-lg rounded-md bg-slate-50">
            <div className="text-center">
              <div className="flex flex-row justify-between">
                <h3 className="text-2xl font-bold text-pink-600">{name}</h3>
                <Link
                  href={returnLink}
                  className=''>
                  <IoIosClose className='w-6 h-6 hover:bg-slate-100 rounded-md'/>
                </Link>
              </div>
              <div className="mt-2 py-3">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
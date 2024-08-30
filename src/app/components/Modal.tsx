import React from "react";
import Link from "next/link";

export default async function Modal({returnLink, children } : { children: React.ReactNode , returnLink : any}) {

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="flex flex-col">
          
          <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="text-center">
              <div className="flex flex-row justify-center place-items-center">
                <h3 className="text-2xl font-bold text-gray-900">Modal Title</h3>
                <Link
                  href={returnLink}
                  className=" self-end px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </Link>
              </div>
              <div className="mt-2 px-7 py-3">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
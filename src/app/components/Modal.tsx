import React from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

export default async function Modal({returnLink, children, name } : { children: React.ReactNode , returnLink : any, name: String}) {

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[100] overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col">
          
          <Card className="p-8 border shadow-lg rounded-md bg-slate-50">
              <div>
                <div className="text-center">
                  <div className="flex flex-row justify-between mb-4">
                    <h3 className="text-2xl font-bold text-pink-600">{name}</h3>
                    <Link
                      href={returnLink}
                      className=''>
                      <IoIosClose className='w-6 h-6 hover:bg-slate-100 rounded-md'/>
                    </Link>
                  </div>
                  <div className="mt-2 pb-3 pt-6 border-t-slate-300 border-t">
                    {children}
                  </div>
                </div>
              </div>
          </Card>
        </div>
      </div>
    );
  }
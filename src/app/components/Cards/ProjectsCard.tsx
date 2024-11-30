'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { MdDesignServices } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { IoEllipsisVerticalSharp } from "react-icons/io5";


import { Separator } from "../ui/separator"
import Popover from "../Submenu/Project_Popover"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const statusColors = {
  NOT_STARTED: 'bg-slate-500',    
  IN_PROGRESS: 'bg-amber-500', 
  COMPLETED: 'bg-green-500',
  OVERDUE: 'bg-red-500',
  CANCELLED: 'bg-red-800'     
};


const ProjectsCard = ({data}) => {
  const router = useRouter()
  return (

    <div>
        <Card className='bg-slate-100 rounded-xl shadow-sm border hover:border-pink-600 hover:border-opacity-50 transition-colors ease-in-out cursor-pointer'
              onClick={(e) => {e.stopPropagation(); e.preventDefault(); router.push('/Projects/'+ data.id+'/view')}}>
          <CardHeader>
            <CardTitle>
              <div className='flex flex-row w-auto justify-between content-center'>
                <h1 className='w-full text-[1.5rem] font-semibold text-pink-600 truncate translate-y-2'>
                  {data.name}
                </h1>
                <div>
                  <p className={` text-white mt-2 mb-6 text-xs px-2 py-2 rounded-xl w-32 text-center transition-colors duration-500 ${statusColors[data.progress]}`}>
                    {data.progress}
                  </p>
                </div>
                <Popover id={data.id} isArchived={data.isArchived}/>
              </div>
              <Separator className='bg-slate-300'/>
            </CardTitle>
          </CardHeader>
          <CardContent className='grid gap-1.5'>
            <div className='flex flex-row justify-between'>
              <div className='w-auto flex flex-row'>
                <MdDesignServices className='w-auto h-4 translate-y-[0.25rem]' />
                <p className='font-medium mx-2'>Project Type:</p>
              </div>
              <p className='font-medium mx-2'>{data.type}</p>
            </div>

            <div className='flex flex-row justify-between'>
              <div className='w-auto flex flex-row'>
                <IoPerson className='w-auto h-4 translate-y-[0.25rem]' />
                <p className='font-medium mx-2'>Client Name:</p>
              </div>
              <p className='font-medium mx-2'>{data.client.lastname + ', ' + data.client.firstname + data.client.middlename}</p>
            </div>

            <div className='flex flex-row justify-between'>
              <div className='w-auto flex flex-row'>
                <MdLocationOn className='w-auto h-4 translate-y-[0.25rem]' />
                <p className='font-medium mx-2'>Site Address:</p>
              </div>
              <p className='font-medium mx-2'>{data.projectAddress}</p>
            </div>

            <div className='flex flex-row justify-between'>
              <div className='w-auto flex flex-row'>
                <FaCalendar className='w-auto h-4 translate-y-[0.25rem]' />
                <p className='font-medium mx-2'>Start Date</p>
              </div>
              <p className='font-medium mx-2'>
                {new Date(data.startDate).toLocaleDateString('en-US', {
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric',
                })}       
              </p>
            </div>

            <div className='flex flex-row justify-between'>
              <div className='w-auto flex flex-row'>
                <FaCalendarCheck className='w-auto h-4 translate-y-[0.25rem]' />
                <p className='font-medium mx-2'>End Date</p>
              </div>
              <p className='font-medium mx-2'>
                {new Date(data.endDate).toLocaleDateString('en-US', {
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric',
                  })}  
              </p>
            </div>
          </CardContent>
        </Card>

    </div>
  )
}

export default ProjectsCard
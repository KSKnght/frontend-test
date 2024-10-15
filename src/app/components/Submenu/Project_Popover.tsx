import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../ui/popover"
import { Button } from "../ui/button"
import Alert from "../Submenu/Project_DeleteAlert"
import { IoEllipsisVerticalSharp } from "react-icons/io5";


  

const ProjectList_Popover = () => {
  return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button onClick={(e) => {e.stopPropagation()}}  className='hover:bg-slate-200 rounded-full ml-2' variant="ghost">
                    <IoEllipsisVerticalSharp className='text-lg'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-25 translate-x-[5.5rem] -translate-y-12'>
                <div className='flex flex-col h-auto'>
                    <Button className='h-8' onClick={(e) => {e.stopPropagation()}} variant='ghost'>Edit</Button>
                    <Alert />
                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default ProjectList_Popover

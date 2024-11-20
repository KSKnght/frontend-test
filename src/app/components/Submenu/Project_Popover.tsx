import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../ui/popover"
import { Button } from "../ui/button"
import Alert from "../Submenu/Project_DeleteAlert"
import { IoEllipsisVerticalSharp } from "react-icons/io5";


const ProjectList_Popover = ({id}) => {
  
    return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button onClick={(e) => {e.stopPropagation();}}  className='hover:bg-slate-200 rounded-full ml-2' variant="ghost">
                    <IoEllipsisVerticalSharp className='text-lg'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-25'>
                <div className='flex flex-col h-auto content-center' onClick={(e) => {e.stopPropagation()}}>
                    <Button className='h-8' onClick={(e) => {e.stopPropagation(); location.href='/Projects?edit='+id;}} variant='ghost'>Edit Project</Button>
                    <Button className='h-8' onClick={(e) => {e.stopPropagation();}} variant='ghost'>Extend Project</Button>
                    <Button className='h-8' onClick={(e) => {e.stopPropagation();}} variant='ghost'>Cancel Project</Button>
                    <Alert id={id} />
                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default ProjectList_Popover

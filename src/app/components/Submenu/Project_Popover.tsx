import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../ui/popover"
import { Button } from "../ui/button"
import Delete from "../Submenu/Project_DeleteAlert"
import Archive from "../Submenu/Project_ArchiveAlert"
import Cancel from "../Submenu/Project_CancelAlert"
import { IoEllipsisVerticalSharp } from "react-icons/io5";


const ProjectList_Popover = ({id, isArchived}) => {
  
    return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button onClick={(e) => {e.stopPropagation();}}  className='hover:bg-slate-200 rounded-full ml-2' variant="ghost">
                    <IoEllipsisVerticalSharp className='text-lg'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[10rem]'>
                <div className='flex flex-col h-auto content-center' onClick={(e) => {e.stopPropagation()}}>
                    {!isArchived ? (
                    <>
                        <Button className='h-8' onClick={(e) => {e.stopPropagation(); location.href='/Projects?edit='+id;}} variant='ghost'>Edit Project</Button>
                        <Archive id={id} />
                        <Cancel id={id} />
                        <Delete id={id} />
                    </>
                    ) : (
                    <>
                        <Button className="h-8" onClick={(e) => {e.stopPropagation(); alert('Restore functionality not implemented yet!');}} variant="ghost">
                            Restore Project
                        </Button>
                        <Delete id={id} />
                    </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default ProjectList_Popover

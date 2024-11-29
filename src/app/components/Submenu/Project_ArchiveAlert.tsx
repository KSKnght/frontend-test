import React, { startTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alertdialog"
import { Button } from "../ui/button";
import { archiveProject } from '@/actionsSupabase/Update';

const Project_ArchiveAlert = ({id}) => {

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild className='translate-x-[0.1rem]'>
            <Button onClick={(e) => {e.stopPropagation()}} className='h-8 rounded-lg text-sm w-[8rem] py-3 text-left hover:bg-slate-200 transition-colors' variant='ghost'>Archive Project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Archive this Project?</AlertDialogTitle>
            <AlertDialogDescription>
                This project will be removed from the main view to the archived projects view.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => {e.stopPropagation()}}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {e.stopPropagation(); startTransition(async () => {
              await archiveProject(id);
            })}} className='text-red-500 bg-red-50 hover:bg-red-100'>
              Archive Project
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_ArchiveAlert

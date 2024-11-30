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
import { unarchiveProject } from '@/actionsSupabase/Update';

const Project_ArchiveAlert = ({id}) => {

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild className='translate-x-[0.1rem]'>
            <Button onClick={(e) => {e.stopPropagation()}} className='h-8 rounded-lg text-sm w-[8rem] py-3 text-left hover:bg-slate-200 transition-colors' variant='ghost'>Restore Project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Restore this Project?</AlertDialogTitle>
            <AlertDialogDescription>
                This project will be restored to the main view.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className='border-0' onClick={(e) => {e.stopPropagation()}}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {e.stopPropagation(); startTransition(async () => {
              await unarchiveProject(id);
            })}} className='text-slate-500 bg-slate-100 hover:bg-slate-200'>
              Restore Project
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_ArchiveAlert

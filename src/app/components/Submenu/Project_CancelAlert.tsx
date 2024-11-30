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
import { cancelProject } from '@/actionsSupabase/Update';

const Project_CancelAlert = ({id}) => {

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild className='translate-x-[0.1rem]'>
            <Button onClick={(e) => {e.stopPropagation()}} className='h-8 rounded-lg text-sm w-[8rem] py-3 text-left hover:text-red-500 text-red-500 hover:bg-red-50' variant='ghost'>Cancel Project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Cancel this Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This project will be cancelled and this action is irreversible.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => {e.stopPropagation()}}>Sustain</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {e.stopPropagation(); startTransition(async () => {
             await cancelProject(id);
           })}} className='text-red-500 bg-red-50 hover:bg-red-100'>
              Cancel Project
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_CancelAlert

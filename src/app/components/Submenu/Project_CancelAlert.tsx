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

const Project_CancelAlert = ({id}) => {

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild className='translate-x-[0.1rem]'>
            <Button onClick={(e) => {e.stopPropagation()}} className='bg-red-100 rounded-lg text-sm w-[16rem] py-3 text-left hover:bg-red-500 hover:text-white transition-colors' variant='ghost'>Cancel Project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Cancel this Project?</AlertDialogTitle>
            <AlertDialogDescription>
                This project will be cancelled and is irreversible.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => {e.stopPropagation()}}>Sustain</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {e.stopPropagation()}} className='text-red-500 bg-red-50 hover:bg-red-100'>
              Cancel Project
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_CancelAlert

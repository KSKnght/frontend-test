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
import { softdelProject } from '@/actionsSupabase/Delete';
  

const Project_DeleteAlert = ({id}) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button onClick={(e) => {e.stopPropagation()}} className='h-8 text-red-500 hover:text-red-500 hover:bg-red-50' variant='ghost'>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Cancel this Project?</AlertDialogTitle>
            <AlertDialogDescription>
                This project will be cancelled and be removed from the main view.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => {e.stopPropagation()}}>Sustain</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {e.stopPropagation(); startTransition(async () => {
             await softdelProject(id);
           })}} className='text-red-500 bg-red-50 hover:bg-red-100'>
              Cancel Project
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_DeleteAlert

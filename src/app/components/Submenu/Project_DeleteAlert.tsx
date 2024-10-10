import React from 'react'
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
  } from "../UI/alertdialog"
import { Button } from "../UI/button";
  

const Project_DeleteAlert = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button onClick={(e) => {e.stopPropagation()}} className='text-red-500 hover:text-red-500 hover:bg-red-50' variant='ghost'>Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Delete a Project?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project
                and its data will be removed from the system.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='text-red-500'>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_DeleteAlert

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
            <AlertDialogTitle>Delete this Project?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project
                and its data will be removed from the system.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => {e.stopPropagation()}}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => {e.stopPropagation()}} className='text-red-500 bg-red-50 hover:bg-red-100'>
              Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default Project_DeleteAlert

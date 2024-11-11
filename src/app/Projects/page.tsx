import React from 'react'
import {getClients, getProjects} from '@/actionsSupabase/read'
import Navbar from '../components/Sidebar'
import Link from 'next/link'
import Modal from '../components/Modal'
import { EditProject, AddProject } from '../components/Modals/crudForms'
import { HiDocumentText } from "react-icons/hi2"
import { FaFilter } from "react-icons/fa6";
import { HiPlusCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import ProjectsList from '../components/ProjectsList'

export const revalidate = 0;

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

const page = async ({searchParams} : SearchParamProps) => {
    const display = await getProjects();
    const clients = await getClients();
    const show = searchParams?.show;
    const edit = searchParams?.edit; 
  
  return (
        <main className='flex'>
            {show && <Modal returnLink={'/Projects'} name={'Add Project'}>
                <AddProject clients={clients}/>
            </Modal>}
            {edit && <Modal returnLink={'/Projects'} name={'Edit Project'}>
                <EditProject data={edit} clients={clients}/>
            </Modal>}
            <div>
                <Navbar />
            </div>
            <div className='h-screen w-full'>
                <div className='mb-5 space-x-56 flex justify-between border-b py-5'>
                    <div className='flex flex-row ml-10 -translate-y-1'>
                        <HiDocumentText className='w-8 h-8 mr-3 translate-y-[1rem] text-pink-600'/>
                        <h1 className='text-4xl font-black mt-3 text-pink-600'>PROJECTS</h1>
                    </div>
                    <div className='flex flex-row space-x-4 items-center pr-11'>
                        <div className='flex flex-row space-x-1'>
                            <div>
                                <button className='p-[13px] bg-slate-100 hover:bg-slate-200 rounded-lg'>
                                    <FaFilter className='text-slate-600'/>
                                </button>
                            </div>
                            <div>
                                <Input placeholder='Search Project' className='w-96'/>
                            </div>
                        </div>
                        <Button asChild className='bg-pink-600 hover:bg-pink-700'>
                            <Link href='/Projects/?show=true'>
                                <HiPlusCircle />
                                Create Project
                            </Link>
                        </Button>
                    </div>
                </div>

                <ProjectsList ProjectsData={display ?? []}/>
            </div>
        </main>
  )
}

export default page
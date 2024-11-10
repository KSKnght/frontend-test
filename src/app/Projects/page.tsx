import React, { Suspense } from 'react'

import {getClients, getProjects} from '@/actionsSupabase/read'
import {createProject} from '../../actionsSupabase/Create'

import Navbar from '../components/Sidebar'
import ProjectsCard from '../components/Cards/ProjectsCard'
import Link from 'next/link'
import Modal from '../components/Modal'
import EditProject from '../components/Modals/EditProject'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { HiDocumentText } from "react-icons/hi2"
import { FaFilter } from "react-icons/fa6";

import { HiPlusCircle } from "react-icons/hi";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { supabase } from '@/lib/supabase'
import ProjectsList from '../components/ProjectsList'

export const revalidate = 0;

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

const AddProject = async () => {
    const clients = await getClients()

    return (
        <form action={async (e) => {'use server'; await createProject(e);}}>
            <div className='flex flex-row justify-between space-x-3'>
                <div className="grid w-full gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Name</Label>
                    <Input type='text' name='name' />
                </div> 
                <div>
                    <p className='subHeader'>Project Type</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]'
                        defaultValue={'Select'} name='type'>
                            <option value={'Select'} disabled={true}>Select type</option>
                            <option value={'BUILD'}>Build</option>
                            <option value={'DESIGN_BUILD'}>Design + Build</option>
                            <option value={'DESIGN'}>Design</option>
                    </select>
                </div>
                <div>
                    <p className='subHeader'>Start Date</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[10rem]' type="date" name='startDate'/>
                </div>
            </div>
            
            <div className='flex flex-row justify-between space-x-3 mt-3'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Address</Label>
                    <Input type='text' name='address' className='w-80' />
                </div>
                <div>
                    <p className='subHeader'>Client</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]' defaultValue={'Select'} name='id'>
                        <option value={'Select'} disabled={true}>Select Client</option>
                        {clients.map((clients, i) => {
                            return <option key={i} value={clients.id}>{clients.lastname + ', ' + clients.firstname+ ' ' + clients.middlename}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p className='subHeader'>End Date</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[10rem]' type="date" name='endDate'/>
                </div>
            </div>
            
            <button className='submitButton' name='submit' type='submit'>
                Create Project
            </button>
        </form>
    )
}


const page = async ({searchParams} : SearchParamProps) => {
    const display = await getProjects();
    const show = searchParams?.show;
    const edit = searchParams?.edit;
    

 
  
  return (
        <main className='flex'>
            {show && <Modal returnLink={'/Projects'} name={'Add Project'}>
                <AddProject />
            </Modal>}
            {edit && <Modal returnLink={'/Projects'} name={'Edit Project'}>
                <EditProject data={edit}/>
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
                {/* <Suspense>
                    <div className='h-[calc(100vh-130px)] overflow-y-scroll -translate-y-5'>
                        <ul className='grid gap-6 p-6 min-[800px]:grid-cols-2 max-[1920px]:grid-cols-1'>
                            {display.map((display, i) => {
                                if (display.isDeleted == false)
                                return <li key={i}><ProjectsCard data={display}/></li>
                            })}
                        </ul>
                    </div>
                </Suspense> */}
            </div>
            
        </main>
  )
}

export default page
import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import {getClients, getProjects} from '@/actionsPrisma/read'
import {createProject} from '../../actionsPrisma/Create'
import ProjectsCard from '../components/Cards/ProjectsCard'
import Link from 'next/link'
import Modal from '../components/Modal'
import { revalidatePath } from 'next/cache'
import { HiDocumentText } from "react-icons/hi2"
import { FaFilter } from "react-icons/fa6";



type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

const AddProject = async () => {
    const clients = await getClients()

    return (
        <form action={async (e) => {'use server'; createProject(e); revalidatePath('/Projects')}}>
            <div className='flex flex-row justify-between space-x-3'>
                <div>
                    <p className='subHeader'>Project Name</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[22rem]'
                           type="text" name='name' placeholder=''/>
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
                <div>
                    <p className='subHeader'>Address</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[22rem]' type="text" name='address' placeholder='Address'/>
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
            

            <button className='submitButton' type='submit'>
                Create Project
            </button>
        </form>
    )
}


const page = async ({searchParams} : SearchParamProps) => {
    const display = await getProjects();
    const show = searchParams?.show;
    
  return (
        <main className='flex'>
            {show && <Modal returnLink={'/Projects'} name={'Add Project'}>
                <AddProject />
            </Modal>}
            <div>
                <Navbar />
            </div>
            <div className='pt-2 h-screen w-full pr-16'>
                <div className='mb-6 mt-4 space-x-56 flex justify-between'>
                    <div className='flex flex-row ml-10'>
                        <HiDocumentText className='w-10 h-10 mr-5 translate-y-[1rem] text-pink-600'/>
                        <h1 className='text-5xl font-bold mt-3 text-pink-600'>PROJECTS</h1>
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div className='flex flex-row space-x-1'>
                            <div>
                                <button className='p-[13px] bg-slate-100 hover:bg-slate-200 rounded-lg'>
                                    <FaFilter className='text-slate-600'/>
                                </button>
                            </div>
                            <div>
                                <input type='text' placeholder='Search Projects' className='w-72 px-3 py-2 rounded-lg border focus:outline-pink-500'>
                                </input>
                            </div>
                        </div>
                        <div className='px-2 w-36 py-2 rounded-xl bg-pink-600 text-white'>
                            <i className="fi fi-rr-add pr-2 align-middle justify-center"></i>
                            <Link 
                                href={'/Projects/?show=true'}
                                >Create Project
                            </Link>
                        </div>
                    </div>
                </div>
                
                <Suspense>
                    <div className='h-[calc(100vh-130px)] overflow-y-scroll'>
                        <ul className='grid grid-cols-2 pr-8'>
                            {display.map((display, i) => {
                                return <li key={i}><ProjectsCard data={display}/></li>
                            })}
                        </ul>
                    </div>
                </Suspense>
            </div>
            
        </main>
  )
}

export default page
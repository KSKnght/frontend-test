import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import {getClients, getProjects} from '@/actions/read'
import {createProject} from '../../actions/Create'
import ProjectsCard from '../components/Cards/ProjectsCard'
import Link from 'next/link'
import Modal from '../components/Modal'
import { revalidatePath } from 'next/cache'

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

const AddProject = async () => {
    const clients = await getClients()

    return (
        <form action={async (e) => {'use server'; createProject(e); revalidatePath('/Projects')}}>
            <input type="text" name='name' placeholder='Name of Project'/>
            <input type="text" name='address' placeholder='Address'/>
            <input type="date" name='startDate'/>
            <input type="date" name='endDate'/>
            <select defaultValue={'Select'} name='type'>
                <option value={'Select'} disabled={true}>Select type</option>
                <option value={'BUILD'}>BUILD</option>
                <option value={'DESIGN_BUILD'}>DESIGN + BUILD</option>
                <option value={'DESIGN'}>DESIGN</option>
            </select>
            <select defaultValue={'Select'} name='id'>
                <option value={'Select'} disabled={true}>Select client</option>
                {clients.map((clients, i) => {
                    return <option key={i} value={clients.id}>{clients.lastname + ', ' + clients.firstname+ ' ' + clients.middlename}</option>
                })}
            </select>

            <button type='submit'> submit </button>
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
            <div className='pt-2 h-screen'>
                <div className='mb-6 mt-4 space-x-56 flex'>
                    <h1 className='px-10 text-5xl font-bold mt-3 text-pink-600'>PROJECTS</h1>
                    <div className='mx-20 my-4 px-5 py-2 rounded-lg bg-pink-600 text-white shadow-lg shadow-pink-600/50'>
                        <i className="fi fi-rr-add pr-2 align-middle"></i>
                        <Link href={'/Projects/?show=true'}>Create New Project</Link>
                    </div>
                </div>
                <Suspense>
                    <div className='h-[calc(100vh-130px)] overflow-y-scroll project'>
                        <ul>
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
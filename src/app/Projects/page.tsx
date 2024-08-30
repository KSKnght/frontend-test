import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import {getClients, getProjects} from '@/lib/read'
import {createProject, updateProject} from '../../actions/Create'
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
        <form action={async (e) => {'use server'; createProject(e); revalidatePath('/Project')}}>
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
        <main className='flex flex-row'>
            {show && <Modal returnLink={'/Projects'}>
                <AddProject />
            </Modal>}
            <div>
                <Navbar />
            </div>
            <div className='p-5'>
                <div>
                    <Link href={'/Projects/?show=true'}>add Button</Link>
                </div>
                <Suspense>
                    <ul>
                        {display.map((display, i) => {
                            return <li key={i}><ProjectsCard data={display}/></li>
                        })}
                    </ul>
                </Suspense>
            </div>
            
        </main>
  )
}

export default page
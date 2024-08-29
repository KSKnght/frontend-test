import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import getProjects from '@/lib/read'
import ProjectsCard from '../components/Cards/ProjectsCard'
import ProjectTable from '../components/ProjectList'
import { useSearchParams } from 'next/navigation'

export type Props = {
    searchParams: Record<string, string> | null | undefined;
}

const page = async ({ props: Props }) => {
// const page = async () => {
    const display = await getProjects();


    // const showModal = Props.searchParams?.modal === 'true';
    
  return (
        <main className='flex flex-row'>
            <div>
                <Navbar />
            </div>
            <div className='p-5'>
                <div>
                    <button>add Project</button>
                </div>
                
                <ul>
                    {display.map((display, i) => {
                        return <li><ProjectsCard data={display} key={i}/></li>
                    })}
                </ul>
                {/* <div>
                    <ul>
                        {display.map((display, i) => {
                            return <ProjectsCard data={display} key={i}/>
                        })}
                    </ul>
                </div> */}
            </div>
            
        </main>
  )
}

export default page
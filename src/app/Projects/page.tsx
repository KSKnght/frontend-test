"use server";

import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import getProjects from '@/lib/read'
import ProjectsCard from '../components/Cards/ProjectsCard'
import Link from 'next/link'
import Modal from '../components/Modal'

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

const AddProject = () => {
    return (
        <form action={() => {}}>
            <h1>hi</h1>
        </form>
    )
}

const page = async ({searchParams} : SearchParamProps) => {
// const page = async () => {
    const display = await getProjects();
    const show = searchParams?.show;


    // const showModal = Props.searchParams?.modal === 'true';
    
  return (
        <main className='flex flex-row'>
            {show && <Modal returnLink={'/Projects'} body={<div><AddProject /></div>}/>}
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
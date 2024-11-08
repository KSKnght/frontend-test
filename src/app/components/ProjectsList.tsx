'use client';

import React, { startTransition, Suspense, useEffect, useState } from 'react'
import ProjectsCard from './Cards/ProjectsCard'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache';
import { reloadPage } from '@/actionsSupabase/reload';
import { useRouter } from 'next/navigation';


const ProjectsList = ({ProjectsData}) => {

  useEffect(() => {
    const channel = supabase.channel("realtime project").on("postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "project",
      },
      async (payload) => {
       await reloadPage('/Projects');
       await reloadPage('/Projects?show=true');
      }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <Suspense>
        <div className='h-[calc(100vh-130px)] overflow-y-scroll -translate-y-5'>
            <ul className='grid gap-6 p-6 min-[800px]:grid-cols-2 max-[1920px]:grid-cols-1'>
                {ProjectsData.map((display, i) => {
                    if (display.isDeleted == false)
                    return <li key={i}><ProjectsCard data={display}/></li>
                })}
          </ul>
        </div>
    </Suspense>
  )
}

export default ProjectsList
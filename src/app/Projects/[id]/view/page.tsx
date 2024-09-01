import Button from '@/app/components/Button'
import { getInfoProject, getPhases } from '@/lib/read'
import Link from 'next/link'
import React from 'react'
import ProjectsSidebar from '../../../components/ProjectsSidebar'
import PhaseCard from '../../../components/Cards/PhaseCard'
import AddPhase from '../../../components/Modals/AddPhase'
import AddTask from '../../../components/Modals/AddTask'
import Modal from '@/app/components/Modal'

type SearchParamProps = {
  task: any
  phase: any
  addPhase: boolean
  searchParams: Record<string, string> | null | undefined;
};

const EdiTask = async ({addPhase}) => {
  console.log(addPhase)
  return (
    <div>Edit Task</div>
  )
}

const page = async ({params, searchParams}:{ params: { id: string }, searchParams : SearchParamProps}) => {
  const id = params.id;
  const addPhase = searchParams?.addPhase;
  const phase = searchParams?.phase;
  const task = searchParams?.task;
  const project = await getInfoProject(Number(id))
  const phaseTasks = await getPhases(Number(id))

  console.log()
  return (
    <div className=' flex flex-row h-max'>
      {addPhase && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <AddPhase data={project.id} />
            </Modal>}

      {phase && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <AddTask data={phase} />
            </Modal>}

      <ProjectsSidebar project={project} />
      <div className=' flex flex-col w-full'>
        <div className='p-2'>
            <Link href={'/Projects/'+project.id+'/view?addPhase=true'}>Add Phase</Link>
        </div>
        <div className=' overflow-x-scroll overflow-y-scroll flex flex-row'>
          {phaseTasks.map((phase, i) => {
              return <PhaseCard Phase={phase} key={i}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default page
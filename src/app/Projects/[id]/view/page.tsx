
import { getInfoProject, getPhases } from '@/actions/read'
import Link from 'next/link'
import React, { Suspense } from 'react'
import ProjectsSidebar from '../../../components/ProjectsSidebar'
import PhaseCard from '../../../components/Cards/PhaseCard'
import AddPhase from '../../../components/Modals/AddPhase'
import AddTask from '../../../components/Modals/AddTask'
import Modal from '@/app/components/Modal'
import EditTask from '@/app/components/Modals/EditTask'
import TaskDetails from '@/app/components/Modals/TaskDetails'

type SearchParamProps = {
  addsub: any
  addmat: any
  viewtask: any
  edittask: any
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
  const edittask = searchParams?.edittask;
  const viewtask = searchParams?.viewtask;
  const addmat = searchParams?.addmat;
  const addsub = searchParams?.addsub;
  const project = await getInfoProject(Number(id))
  const phaseTasks = await getPhases(Number(id))

  console.log()
  return (
    <div className=' flex flex-row h-screen'>
      {addPhase && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <AddPhase data={project.id} />
            </Modal>}

      {phase && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <AddTask data={phase} />
            </Modal>}
      {edittask && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <EditTask data={edittask} project={project.id}/>
            </Modal>}
      {viewtask && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <TaskDetails data={viewtask} />
            </Modal>}
      {addmat && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <AddTask data={phase} />
            </Modal>}
      {addsub && <Modal returnLink={'/Projects/'+ project.id+'/view'}>
                <AddTask data={phase} />
            </Modal>}


      <ProjectsSidebar project={project} />
      <div className=' flex flex-col w-[85%]'>
        <div className='p-2'>
            <Link href={'/Projects/'+project.id+'/view?addPhase=true'}>Add Phase</Link>
        </div>
        <Suspense fallback={'loading'}>
          <div className=' overflow-x-scroll overflow-y-scroll flex flex-row h-screen'>
            {phaseTasks.map((phase, i) => {
                return <PhaseCard Phase={phase} key={i}/>
            })}
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default page
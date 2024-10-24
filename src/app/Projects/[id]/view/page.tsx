
import { getInfoProject, getPhases } from '@/actionsSupabase/read'
import Link from 'next/link'
import React, { Suspense } from 'react'
import ProjectsSidebar from '../../../components/ProjectsSidebar'
import PhaseCard from '../../../components/Cards/PhaseCard'
import AddPhase from '../../../components/Modals/AddPhase'
import AddTask from '../../../components/Modals/AddTask'
import Modal from '@/app/components/Modal'
import EditTask from '@/app/components/Modals/EditTask'
import TaskDetails from '@/app/components/Modals/TaskDetails'
import { IoIosAddCircle } from "react-icons/io";

type SearchParamProps = {
  addsub: any
  addmat: any
  viewtask: any
  edittask: any
  phase: any
  addPhase: boolean
  state: any
  searchParams: Record<string, string> | null | undefined;
};

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
  const state = searchParams?.state;

  console.log()
  return (
    <div className=' flex flex-row overflow-x-auto h-screen'>
      {addPhase && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Add Phase'}>
                <AddPhase data={project.id} />
            </Modal>}

      {phase && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Add Task'}>
                <AddTask data={phase} projID={project.id} />
            </Modal>}
      {edittask && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Edit Task'}>
                <EditTask data={edittask} project={project.id}/>
            </Modal>}
      {viewtask && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Task Details'}>
                <TaskDetails data={viewtask} state={state} projID={id}/>
            </Modal>}

      <div className='h-screen'>
        <div className='h-full flex-col bg-white border-r shadow-sm w-80 px-3 py-2'>
        </div>
      </div>

      <ProjectsSidebar project={project} />

      <div className='flex flex-col'>
        <div className=''>
          <div className='ml-6 my-6 fixed'>
              <Link className='flex flex-row w-32 rounded-lg px-3 py-1 text-white bg-pink-600 shadow-xl shadow-white' href={'/Projects/'+project.id+'/view?addPhase=true'}>
                <IoIosAddCircle className='mt-1 mr-1'/>
                <p>Add Phase</p>
              </Link>
          </div>
        </div>
        
        <Suspense fallback={'loading'}>
          <div className='flex flex-row w-screen overflow-x-scroll no-scrollbar mt-[4.8025rem] '>
            {phaseTasks.map((phase, i) => {
                return <PhaseCard Phase={phase} proj={id} key={i}/>
            })}
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default page
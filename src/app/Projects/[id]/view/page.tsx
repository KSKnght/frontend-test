

import { getInfoProject, getPhases } from '@/actionsSupabase/read'
import Link from 'next/link'
import React, { Suspense } from 'react'
import ProjectsSidebar from '../../../components/ProjectsSidebar'
import PhaseCard from '../../../components/Cards/PhaseCard'
import AddPhase from '../../../components/Modals/AddPhase'
import AddTask from '../../../components/Modals/AddTask'
import Modal from '@/app/components/Modal'
import EditTask from '@/app/components/Modals/EditTask'
import TaskDetails from '@/app/components/Modals/MatAndSubForm/TaskDetails'
import { IoIosAddCircle } from "react-icons/io";
import {MoveProject} from '@/app/components/Modals/crudForms'
import SearchPhase from '@/app/components/SearchPhase'
import { ExtendProject } from '@/app/components/Modals/crudForms'
import AutoRefresh from './AutoRefresh'

export const revalidate = 1;

type SearchParamProps = {
  addsub: any
  addmat: any
  viewtask: any
  edittask: any
  phase: any
  addPhase: boolean
  state: any
  extProj: any,
  movProj: any,
  searchParams: Record<string, string> | null | undefined;
  search: string
};

const page = async ({params, searchParams}:{ params: { id: string }, searchParams : SearchParamProps}) => {
  const id = params.id;
  const addPhase = searchParams?.addPhase;
  const phase = searchParams?.phase;
  const edittask = searchParams?.edittask;
  const viewtask = searchParams?.viewtask;
  const extProj = searchParams?.extProj;
  const movProj = searchParams?.movProj;
  const project = await getInfoProject(Number(id))
  if (!project) {
    return <p>Project data is unavailable. Please try again later.</p>;
  }
  const phaseTasks = await getPhases(Number(id))
  const state = searchParams?.state;
  const isDisabled = project.progress === 'CANCELLED' || project.isArchived === true;
  

  // Group the phases by their priority number 
  const groupedPhases = (phaseTasks || []).reduce((acc, phase) => {
    if (phase.isDeleted === false) {
      if (!acc[phase.priority]) { 
        acc[phase.priority] = [];
      }
      acc[phase.priority].push(phase);
    }
    return acc;
  }, {});

  const maxPriority = Object.keys(groupedPhases).length;


  return (
    <div className=' flex flex-row overflow-x-auto h-screen'>
      <AutoRefresh id={id} />
      {addPhase && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Add Phase'}>
                <AddPhase data={project.id} />
            </Modal>}
      {phase && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Add Task'}>
                <AddTask data={phase} projID={project.id} endDate={project.endDate} startDate={project.startDate}/>
            </Modal>}
      {edittask && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Edit Task'}>
                <EditTask data={edittask} project={project.id} endDate={project.endDate} startDate={project.startDate}/>
            </Modal>}
      {viewtask && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Task Details'}>
                <TaskDetails data={viewtask} state={state} projID={id}/>
            </Modal>}
      {extProj && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Extend Project'}>
                <ExtendProject data={extProj}/>
            </Modal>}
      {movProj && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Move Project'}>
                <MoveProject data={movProj}/>
            </Modal>}

      <div className='h-screen'>
        <div className='h-full flex-col bg-white border-r shadow-sm w-80 px-3 py-2'>
        </div>
      </div>

      <ProjectsSidebar project={project} currPage={false} id={Number(id)}/>

      <div className='flex flex-row'>
        <div className=''>
          <div className='mb-6 h-[5rem] w-full bg-white content-center z-[2] border-b border-slate-200'>
              <div className='flex flex-row content-center space-x-10'>
              {isDisabled === true ? <Link
                href={'/Projects/'+id+'/view'}
                className={`z-[50] fixed top-0 h-10 translate-y-4 translate-x-5 flex flex-row w-32 rounded-lg items-center px-3 py-1 justify-between 
                ${isDisabled
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-pink-600 text-white hover:bg-pink-700'}`}
              >
                <IoIosAddCircle className='mt-1 mr-1 -translate-y-[0.19rem]' />
                <p>Add Phase</p>
              </Link> : <Link
                href={'/Projects/'+id+'/view?addPhase=true'}
                className={`z-[50] fixed top-0 h-10 translate-y-4 translate-x-5 flex flex-row w-32 rounded-lg items-center px-3 py-1 justify-between 
                ${isDisabled
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-pink-600 text-white hover:bg-pink-700'}`}
              >
                <IoIosAddCircle className='mt-1 mr-1 -translate-y-[0.19rem]' />
                <p>Add Phase</p>
              </Link> }
                <SearchPhase groupedPhases={groupedPhases} id={id} maxPriority={maxPriority} isDisabled={isDisabled} />
              </div>
          </div>
        </div>
        
        {/* <Suspense fallback={'loading'}>
          <div className='flex flex-row w-screen mt-[6rem]'>
            {Object.keys(groupedPhases).map(priority => (
              <div key={priority} className="mb-6">
                <h2 className="text-md font-bold text-slate-600 translate-x-5">Step {priority}</h2>
                <div className="flex flex-row w-full overflow-x-auto mr-5 border-r border-slate-200 h-full">
                  {groupedPhases[priority].map((phase, i) => (
                    <PhaseCard Phase={phase} proj={id} maxPriority={maxPriority} key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Suspense> */}
      </div>
    </div>
  );
}

export default page;
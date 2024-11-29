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
import ExtendProject from '@/app/components/Modals/ExtendProject'
import MoveProject from '@/app/components/Modals/MoveProject'
import { ToastContainer } from 'react-toastify';


export const revalidate = 0;

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
  const addmat = searchParams?.addmat;
  const extProj = searchParams?.extProj;
  const movProj = searchParams?.movProj;
  const addsub = searchParams?.addsub;
  const project = await getInfoProject(Number(id))
  if (!project) {
    return <p>Project data is unavailable. Please try again later.</p>;
  }
  const phaseTasks = await getPhases(Number(id))
  const state = searchParams?.state;
  const searchQuery = searchParams?.search || '';

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
      {extProj && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Extend Project'}>
                <ExtendProject data={extProj} state={state} projID={project.id}/>
            </Modal>}
      {movProj && <Modal returnLink={'/Projects/'+ project.id+'/view'} name={'Move Project'}>
                <MoveProject data={movProj} state={state} projID={project.id}/>
            </Modal>}

      <div className='h-screen'>
        <div className='h-full flex-col bg-white border-r shadow-sm w-80 px-3 py-2'>
        </div>
      </div>

      <ProjectsSidebar project={project} currPage={false} id={Number(id)}/>

      <div className='flex flex-col'>
        <div className=''>
          <div className='mb-6 fixed h-[5rem] w-full bg-white content-center z-[2] border-b border-slate-200'>
              <div className='flex flex-row'>
                <Link className='translate-x-5 flex flex-row w-32 rounded-lg px-3 py-1 text-white bg-pink-600 items-center' href={'/Projects/'+project.id+'/view?addPhase=true'}>
                  <IoIosAddCircle className='mt-1 mr-1'/>
                  <p>Add Phase</p>
                </Link>
              

              </div>
          </div>
        </div>
        
        <Suspense fallback={'loading'}>
          <div className='flex flex-row w-screen mt-[6rem]'>
            {Object.keys(groupedPhases).map(priority => (
              <div key={priority} className="mb-6">
                <h2 className="text-md font-bold text-slate-600 translate-x-5">Step {priority}</h2>
                <div className="flex flex-row w-full overflow-x-auto mr-5 border-r border-slate-200 h-full">
                  {groupedPhases[priority].map((phase, i) => (
                    <PhaseCard Phase={phase} proj={id} key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default page;
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator"
import { ExtendProject } from '@/app/components/Modals/crudForms'
import {MoveProject} from '@/app/components/Modals/crudForms'

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




    return (
        <div className=' flex flex-row overflow-x-auto h-screen'>
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

        <ProjectsSidebar project={project} currPage={true} id={Number(id)}/>        

        <div>
            
        </div>

            <div className='ml-8'>
                <div className='mb-6 fixed h-[5rem] w-full bg-white content-center z-[2]'>
                    <div className='flex flex-row'>
                        <div className=''>
                            <Link
                                className='px-[2rem] bg-slate-200'
                                href={'/Projects/' + project.id + '/view'} 
                            >
                                Back to Tasks
                            </Link>
                        </div>
                    </div>
                </div>
            </div>



        </div>


        
    )

  }

  export default page;
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



export const revalidate = 0;

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

const MatCard = ({ phase }) => {
  return (
    <div className='overflow-x-none'>
      <div>
        {phase.phaseTasks.map((tasks, i) => {
          return (
            tasks.isDeleted == false && tasks.taskMat.length ? (
              <div key={`task-${i}`}>
                <div className="flex flex-row font-semibold ml-8">
                  <p>{tasks.taskName + " from "}</p>
                  <p className="text-pink-600 font-bold ml-1">{phase.phaseName}</p>
                </div>
                <div className='p-3 border border-slate-300 rounded-xl mx-8 mt-2 mb-8 w-[36rem]'>
                  <Table className="w-[34.3rem] table-fixed">
                    <TableHeader>
                      <TableRow className='font-bold bg-slate-100'>
                        <TableCell>Material Name</TableCell>
                        <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.taskMat.map((mat) => (
                        <TableRow key={`mat-${mat.id}`}>
                          <TableCell>{mat.materials.name}</TableCell>
                          <TableCell>{mat.qty + " " + mat.unit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : null
          );
        })}
      </div>
    </div>
  );
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

  // Group the phases by their priority number
  const groupedPhases = phaseTasks.reduce((acc, phase) => {
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

      <div className='h-screen'>
        <div className='h-full flex-col bg-white border-r shadow-sm w-80 px-3 py-2'>
        </div>
      </div>

      <ProjectsSidebar project={project} currPage={true} id={Number(id)}/>

      <div className='flex flex-col'>
        <div className=''>
          <div className='mb-6 fixed h-[5rem] w-full bg-white content-center z-[2]'>
              <div className='flex flex-row space-x-[21.5rem]'>
                <div className='px-[2rem]'>
                  <input className='w-[50rem] px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-pink-600' placeholder='Search Materials...'></input>
                </div>
              </div>
          </div>
        </div>
        
        <Suspense fallback={'loading'}>
          <div className='flex flex-col w-screen mt-[6rem]'>
          <div className="flex flex-col w-full overflow-x-auto mr-5 border-r border-slate-200 h-full">
                  {phaseTasks.map((phase) => (
                    phase.isDeleted == false && <MatCard phase={phase}/>
                  ))}
                </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default page;

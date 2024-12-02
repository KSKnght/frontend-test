import React, { startTransition } from 'react';
import { getMaterials, getSubcontracts, getTask, getUnselectedMat, getUnselectedSub } from '@/actionsSupabase/read'
import AddMatSub from './AddMatSub'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { HiTrash, HiClock } from "react-icons/hi";
import { hardDelMat, hardDelSub } from '@/actionsSupabase/Delete';
import { revalidatePath } from 'next/cache';
import { updateQty } from '@/actionsSupabase/Update';
import EditableQty from './EditableQty';


const MatList = ({ tasks, projID, taskId }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold mb-2 text-left">Materials List</h3>
      <div className="w-[20rem] bg-slate-300 h-[9.5rem] flex items-center justify-center">
        {tasks.length ? (
          <div className="h-[9.5rem] overflow-y-auto w-full">
            {tasks.map((mat, i) => (
              <Table className="w-[20rem] table-fixed" key={`mat-list-${i}`}>
                <TableBody>
                  <TableRow className="text-center bg-slate-100 hover:bg-slate-200">
                    <TableCell className="text-xs py-1.5 px-1 leading-tight w-3/5 text-left pl-3">
                      {mat.materials.name}
                    </TableCell>
                    <TableCell className="text-xs py-1.5 px-1 leading-tight text-center w-2/5 justify-center">
                        <EditableQty mat={mat} projID={projID} taskId={taskId} />
                    </TableCell>
                    <TableCell className="text-xs py-1.5 px-1 leading-tight w-1/5">
                      {mat.unit}
                    </TableCell>
                    <TableCell className="text-center py-1.5 px-1 w-1/5">
                      <form
                        action={async () => {
                          'use server';
                          await hardDelMat(mat.id);
                          revalidatePath(`Projects/${projID}/view?viewtask=${taskId}&state=Mat`);
                        }}
                      >
                        <button type="submit">
                          <HiTrash className="text-slate-400 cursor-pointer hover:text-red-500" />
                        </button>
                      </form>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </div>
        ) : (
          <div>
            <div className="w-[20rem] bg-slate-50 h-[9.5rem] flex items-center justify-center">
              <p className="text-xs text-gray-500 italic">No materials added.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const SubConList = ({ subcon, projID, taskId }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold mb-2 text-left">Subcontractors List</h3>
      <div className="w-[17rem] bg-slate-300 h-[9.5rem] flex items-center justify-center">
        {subcon.length ? (
          <div className="h-[9.5rem] overflow-y-auto w-full"> {/* Set fixed height and make it scrollable */}
            {subcon.map((sub, i) => (
              <Table className="w-[17rem] table-fixed" key={`mat-list-${i}`}>
                <TableBody>
                  <TableRow className="text-center bg-slate-100 hover:bg-slate-200">
                    <TableCell className="text-xs py-1.5 px-2 leading-tight w-2/5">{sub.B.Name}</TableCell>
                    <TableCell className="py-1.5 px-1 w-1/5">
                      <form action={async (e) => {'use server'; await hardDelSub(sub.id); revalidatePath('Projects/'+projID+'/view?viewtask='+taskId+'&state=Sub')}}>
                        <button type='submit'>
                          <HiTrash className="text-slate-400 cursor-pointer hover:text-red-500" />
                        </button>
                      </form>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </div>
        ) : (
          <div>
            <div className="w-[17rem] bg-slate-50 h-[9.5rem] flex items-center justify-center">
              <p className="text-xs text-gray-500 italic">No subcontractors added.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const TaskDetails = async ({data, state, projID}) => {
    const task = await getTask(Number(data));
    const materialsUnselected = await getUnselectedMat(data);
    const sucon = await getUnselectedSub(data);
    
    console.log(task);

  return (
    <div className='flex flex-row w-[38rem]'>
        <div>
            <div className='flex flex-col'>
                <div>
                    <p className='w-64 flex rounded-lg text-lg font-bold'>{task.taskName}</p>
                    <div className='flex flex-row text-slate-500'>
                      <HiClock className='w-3 h-3 translate-y-[1px]'/>
                      <label className='w-64 h-auto flex rounded-lg pl-1 text-xs'>
                        {new Date(task.deadline).toLocaleDateString('en-US', {
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </label>
                    </div>
                </div>
                <div className='mt-4'>
                    <p className='text-xs font-semibold flex mb-1' >Description</p>
                    <label
                        className={`w-72 h-28 flex text-xs text-left overflow-y-auto ${
                          task.description ? '' : 'text-gray-400 italic'
                        }`}
                      >
                        {task.description || 'No description provided for this task.'}
                    </label>
                </div>
                <div className='mt-2 mb-5'>
                </div>
            </div>
            {task.status != 'COMPLETED' ? 
            <div>
            {state === 'Mat' && <MatList tasks={task.taskMat} projID={projID} taskId={task.id}/>}
            {state === 'Sub' && <SubConList subcon={task._phaseTasksTosubCon} projID={projID} taskId={task.id}/>}
            </div> : <div className=' items-center text-center mt-32'>
                <p className='text-xs text-left font-bold text-red-500'>Note:</p>
                <p className='w-48 text-xs text-left leading-4'>You can no longer edit when task is complete</p>
            </div>}
            
        </div>

        <div className='border-l border-slate-400 ml-8 pl-8 h-[396px] w-64'>
            <AddMatSub mat={materialsUnselected ?? []} data={task.id} state={state} projID={projID} subCon={sucon} status={task.status} matUsed={task.taskMat} subUsed={task._phaseTasksTosubCon}/>
        </div>
    </div>
  )
}

export default TaskDetails

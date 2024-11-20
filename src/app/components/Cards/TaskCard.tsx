'use client';

import React, { startTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdEdit, MdDelete, MdOutlineCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { IoTime } from 'react-icons/io5';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust path as needed
import { softDelTasks } from '@/actionsSupabase/Delete';
import { statusTask } from '@/actionsSupabase/statuses';

const statusColors = {
  NOT_STARTED: 'bg-slate-500',
  IN_PROGRESS: 'bg-amber-500',
  COMPLETED: 'bg-green-500',
  OVERDUE: 'bg-red-500',
};

const MatList = ({ tasks }) => {
  if (!tasks.length) {
    return <p className="text-xs italic text-slate-500">No materials added.</p>;
  }

  return (
    <ul>
      {tasks.map((mat, i) => (
        <li className="text-xs" key={i}>
          {mat.materials.name + ' - ' + mat.qty + ' ' + mat.unit}
        </li>
      ))}
    </ul>
  );
};

const SubConList = ({ subcon }) => {
  if (!subcon.length) {
    return <p className="text-xs italic text-slate-500">No subcontractors added.</p>;
  }

  return (
    <ul>
      {subcon.map((sub, i) => (
        <li className="text-xs" key={i}>
          {sub.B.Name}
        </li>
      ))}
    </ul>
  );
};

const TaskCard = ({ tasks, data, proj }) => {
  const router = useRouter();
  
  // Check if the task is overdue
  const isOverdue = new Date(tasks.deadline) < new Date() && !tasks.progress;

  const handleCheck = (e) => {
    e.stopPropagation();
    startTransition(async () => {
      await statusTask(tasks.id, !tasks.progress, tasks.phaseID, proj);
    });
  };

  return (
    <div
      className="my-3 w-full items-center bg-slate-200 rounded-md p-3 cursor-pointer border border-slate-300 hover:border-pink-600 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        router.push('/Projects/' + data + '/view/?viewtask=' + tasks.id + '&state=Mat');
      }}
    >
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-between items-center gap-1.5">
            <button onClick={handleCheck} className="hover:text-pink-600">
              {tasks.progress === true ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
            </button>
            <h1 className="font-bold text-slate-800 leading-tight truncate">{tasks.taskName}</h1>
          </div>
          <div className="flex flex-row justify-between items-center -translate-y-1 translate-x-2 -space-x-[5px]">
            <button
              className="text-slate-600 w-6 h-6 hover:text-pink-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                router.push('/Projects/' + data + '/view/?edittask=' + tasks.id);
              }}
            >
              <MdEdit />
            </button>
            <button
              className="text-slate-600 w-6 h-6 hover:text-pink-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                startTransition(async () => {
                  await softDelTasks(tasks.id, proj);
                });
              }}
            >
              <MdDelete />
            </button>
          </div>
        </div>

        <h2 className="flex flex-row text-sm text-slate-600">
          <span className={isOverdue ? 'text-red-500' : 'text-slate-600'}>
            <div className='flex flex-row'>
              <IoTime className="mt-1 mr-1 w-3 h-3" />
              {new Date(tasks.deadline).toDateString()}
            </div>
          </span>
        </h2>

        <h3 className={`mt-2 mb-8 text-xs px-2 py-1 rounded-xl w-32 text-center ${statusColors[tasks.status]}`}>
          <p className="text-white font-bold">{tasks.status}</p>
        </h3>

        <Accordion type="single" collapsible className="-mt-4 border-t border-slate-400">
          <AccordionItem value="materials">
            <div
                onClick={(e) => {
                  e.stopPropagation(); 
                }}
              >
                <AccordionTrigger className='text-xs font-bold py-1 mt-2'>Materials</AccordionTrigger>
            </div>
            <AccordionContent className="text-xs py-1">
              <MatList tasks={tasks.taskMat} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="subcontractors">
            <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <AccordionTrigger className='text-xs font-bold py-1'>Subcontractors</AccordionTrigger>
            </div>
            <AccordionContent className="text-xs py-1">
              <SubConList subcon={tasks._phaseTasksTosubCon} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TaskCard;

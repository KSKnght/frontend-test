'use client';
import React, { useState, startTransition } from 'react';
import TaskCard from './TaskCard';
import Link from 'next/link';
import { IoIosAddCircle } from "react-icons/io";
import { HiTrash } from "react-icons/hi";
import { softDelPhase } from '@/actionsSupabase/Delete';
import { updatePhaseName } from '@/actionsSupabase/Update';
import { reloadPage } from '@/actionsSupabase/reload';

const statusColors = {
  NOT_STARTED: 'bg-slate-500',
  IN_PROGRESS: 'bg-amber-500',
  COMPLETE: 'bg-green-500',
  OVERDUE: 'bg-red-500'
};

const PhaseCard = ({ Phase, proj}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [phaseName, setPhaseName] = useState(Phase.phaseName);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    startTransition(async () => {
      await updatePhaseName(Phase.id, phaseName); // Call parent function to update name in database
      reloadPage('Projects/'+proj+'/view');
    });
  };

  const handleChange = (e) => {
    setPhaseName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      startTransition(async () => {
        await updatePhaseName(Phase.id, phaseName); // Save on Enter key
        reloadPage('Projects/'+proj+'/view');
      });
    }
  };

  return (
    <div className='h-auto w-[20rem] rounded-lg bg-slate-100 ml-5 mt-2 mb-auto p-4 shadow-sm border transition-all'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row justify-between'>
          {isEditing ? (
            <input
              type="text"
              value={phaseName}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="mt-1 text-xl font-semibold text-pink-600 leading-tight bg-slate-100 border-b-2 border-pink-600 focus:outline-none"
              autoFocus
            />
          ) : (
            <h1
              className='mt-1 text-xl font-semibold text-pink-600 leading-tight text-wrap cursor-pointer'
              onDoubleClick={handleDoubleClick}
            >
              {phaseName}
            </h1>
          )}
        </div>
        {!isEditing && ( // Conditionally render buttons only if not editing
          <div className='flex flex-row text-slate-600 ml-4 items-center gap-1'>
            <Link href={'/Projects/' + Phase.projectID + '/view?phase=' + Phase.id}>
              <IoIosAddCircle className='w-5 h-5 text-slate-500 hover:text-slate-600 transition-colors ease-out' />
            </Link>
            <button onClick={(e) => { e.stopPropagation(); startTransition(async () => (await softDelPhase(Phase.id, Phase.projectID))) }}>
              <HiTrash className='w-5 h-5 text-slate-500 hover:text-red-600 transition-colors ease-out' />
            </button>
          </div>
        )}
        </div>


      <div className={`mt-2 mb-8 text-xs px-2 py-1 rounded-xl w-auto text-center transition-colors duration-500 ${statusColors[Phase.progress]}`}>
        <h2 className='text-white font-semibold'>{Phase.progress}</h2>
      </div>

      <div className='w-auto h-auto'>
        {Phase.phaseTasks.map((task, i) => {
          if (!task.isDeleted) {
            return <TaskCard tasks={task} proj={proj} data={Phase.projectID} key={i} />;
          }
        })}
      </div>
    </div>
  );
};

export default PhaseCard;

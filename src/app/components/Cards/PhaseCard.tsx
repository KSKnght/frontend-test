'use client';
import React, { useState, startTransition } from 'react';
import TaskCard from './TaskCard';
import Link from 'next/link';
import { IoIosAddCircle } from "react-icons/io";
import { HiTrash } from "react-icons/hi";
import { softDelPhase } from '@/actionsSupabase/Delete';
import { movePriority, updatePhaseName } from '@/actionsSupabase/Update';
import { reloadPage } from '@/actionsSupabase/reload';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


const statusColors = {
  NOT_STARTED: 'bg-slate-500',
  IN_PROGRESS: 'bg-amber-500',
  COMPLETE: 'bg-green-500',
  OVERDUE: 'bg-red-500',  
  CANCELLED: 'bg-red-800'
};

const PhaseCard = ({ Phase, proj, maxPriority, isDisabled}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [phaseName, setPhaseName] = useState(Phase.phaseName);

  const handleDoubleClick = () => {
    if (isDisabled) {
      setIsEditing(false);  
    } else {
      setIsEditing(true)
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (!isDisabled) {
      startTransition(async () => {
        await updatePhaseName(Phase.id, phaseName); // Call parent function to update name in database
        reloadPage('Projects/' + proj + '/view');
      });
    }
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

  const handlePriorityChange = async (newPriority) => {
    if (newPriority < 1 || newPriority > maxPriority) return; // Validate range
    await movePriority(Phase.id, newPriority); // Call the function
    reloadPage(`/Projects/${proj}/view`); // Reload to reflect changes
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
              disabled={isDisabled}
            />
          ) : (
            <h1
              className={`mt-1 text-xl font-semibold leading-tight text-wrap cursor-pointer ${
                isDisabled ? 'cursor-not-allowed text-gray-500' : 'text-pink-600 cursor-pointer'
              }`}
              onDoubleClick={handleDoubleClick}
            >
              {phaseName}
            </h1>
          )}
        </div>
        {!isEditing && ( // Conditionally render buttons only if not editing
          <div className='flex flex-row text-slate-600 ml-4 items-center gap-1'>
            <div className="flex flex-row gap-1 text-slate-500">
          
          {/* Left Chevron - Disable if priority is 1 */}
          <div className="group relative">
                <FaChevronLeft
                  className={`cursor-pointer ${
                    Phase.priority === 1 || isDisabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-400 hover:text-pink-500'
                  }`}
                  onClick={() => {
                    if (!isDisabled && Phase.priority > 1) handlePriorityChange(Phase.priority - 1);
                  }}
                />
                {Phase.priority === 1 && (
                  <span className="absolute -top-8 right-0 hidden w-max rounded-md bg-gray-500 px-2 py-1 text-sm text-white group-hover:block">
                    Cannot decrease priority further
                  </span>
                )}
            </div>

          {/* Right Chevron - Disable if priority is maxPriority */}
            <div className="group relative">
                <FaChevronRight
                  className={`cursor-pointer ${
                    Phase.priority === maxPriority || isDisabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-400 hover:text-pink-500'
                  }`}
                  onClick={() => {
                    if (!isDisabled && Phase.priority < maxPriority) handlePriorityChange(Phase.priority + 1);
                  }}
                />
                {Phase.priority === maxPriority && (
                  <span className="absolute -top-8 right-0 hidden w-max rounded-md bg-gray-400 px-2 py-1 text-sm text-white group-hover:block">
                    Cannot increase priority further
                  </span>
                )}
            </div>

            </div>
            <button
              onClick={(e) => {
                if (!isDisabled) {
                  e.stopPropagation();
                  startTransition(async () => (await softDelPhase(Phase.id, Phase.projectID)));
                }
              }}
              className={`${
                isDisabled ? ' text-slate-300' : 'text-slate-500 hover:text-red-500'
              } transition-colors ease-out`}
              disabled={isDisabled}
            >
              <HiTrash className='w-5 h-5' />
            </button> 
          </div>
        )}
        </div>


      <div className={`mt-2 mb-8 text-xs px-2 py-1 rounded-xl w-auto text-center transition-colors duration-500 ${statusColors[Phase.progress]}`}>
        <h2 className='text-white font-semibold'>{Phase.progress}</h2>
      </div>

      <div className='w-auto h-auto'>
      <div className='mb-8'>
          <Link
            href={isDisabled ? '#' : '/Projects/' + Phase.projectID + '/view?phase=' + Phase.id}
            className={`border-dashed w-full px-[6.64rem] items-center rounded-md py-4 p-2 cursor-pointer border-2 transition-colors ${
              isDisabled
                ? 'border-gray-300 text-gray-400'
                : 'border-slate-400 text-slate-400 hover:border-pink-600 hover:text-pink-600'
            }`}
          >
            Add Task
          </Link>
        </div>
      
        {Phase.phaseTasks.map((task, i) => {
          if (!task.isDeleted) {
            return <TaskCard tasks={task} proj={proj} data={Phase.projectID} key={i} isDisabled={isDisabled} />;
          }
        })}
      </div>
    </div>
  );
};

export default PhaseCard;

'use client';

import React, { useState } from 'react';
import PhaseCard from './Cards/PhaseCard';
import Search from './Search';

const SearchablePhaseView = ({ groupedPhases, id, maxPriority, isDisabled}) => {
  const [searchQuery, setSearchQuery] = useState('');
  

  // Filter phases by search query
  const filteredPhases = Object.keys(groupedPhases).reduce((acc, priority) => {
    const filtered = groupedPhases[priority].filter((phase) =>
      phase.phaseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[priority] = filtered;
    }
    return acc;
  }, {});

  const noResults = Object.keys(filteredPhases).length === 0;

  return (
    <div className="flex flex-col w-full h-screen">
      <div className='-translate-x-10 fixed top-0 z-[40] w-full bg-white border-b border-slate-200'>
        <div className="sticky top-0 z-[40] p-4 translate-y-5 translate-x-8 h-20">
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search phases by name..."
          />
        </div>
      </div>

      <div className="mt-24 flex flex-row -translate-x-[2.5rem] z-[20]">
        {noResults ? (
          <p className="translate-x-[20rem] translate-y-[10rem] text-center text-gray-500 mt-10"> No phases match your search. Please try a different keyword.</p>
        ) : (
          Object.keys(filteredPhases).map((priority) => (
            <div key={priority} className="mb-6">
              <h2 className="text-md font-bold text-slate-600 ml-5">Step {priority}</h2>
              <div className="flex flex-row w-full overflow-x-auto mr-5 border-r border-slate-200">
                {filteredPhases[priority].map((phase, i) => (
                  <PhaseCard
                    Phase={phase}
                    proj={id}
                    // maxPriority={maxPriority}
                    isDisabled={isDisabled}
                    key={phase.id}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchablePhaseView;

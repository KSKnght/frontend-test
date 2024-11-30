'use client';

import React from 'react';

const Search = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={placeholder}
      className="-translate-y-5 translate-x-[8rem] w-[35rem] fixed p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  );
};

export default Search;

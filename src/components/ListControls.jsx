'use client'


import React, { useState } from 'react'
import { SortDropdown } from './Dropdown'

export default function ListControls({ search, setSearch, sort, setSort, sortOptions }) {

  return (
    <div className='flex flex-col md:flex-row gap-3 w-full items-end'>

      <input
        className='px-5 py-2 w-full min-w-60 rounded-sm bg-(--background) shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Debtors'
      />

      <SortDropdown 
        sort={sort}
        setSort={setSort}
        sortOptions={sortOptions}      
      />

    </div>
  )
}
'use client'


import Image from 'next/image'
import React, { useState } from 'react'

export default function ListControls({ search, setSearch, sort, setSort, sortOptions }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full items-end">

      <input
        className="mx-0 md:mx-2 px-5 py-2 w-full min-w-60 rounded-full bg-(--background) shadow-[inset_4px_4px_2px_0_rgba(0,0,0,0.25)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Mag search ng may utang"
      />


      <div className="relative inline-block text-white h-10 rounded-md w-full lg:w-64 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]">
        <select className="w-full appearance-none bg-(--primaryColor) pr-8 p-2 rounded-md focus:outline-none" value={sort} onChange={(e) => setSort(e.target.value)} onFocus={(e) => setIsOpen(true)} onBlur={(e) => setIsOpen(false)} >
          <option value="">Ayusin ayon sa...</option>
          {sortOptions.map(({value, label}) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <Image
          src={isOpen? '/Icons/aUpIconW.svg' : '/Icons/aDownIconW.svg'}
          alt="arrow"
          width={20}
          height={20}
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
        />
      </div>

    </div>
  )
}
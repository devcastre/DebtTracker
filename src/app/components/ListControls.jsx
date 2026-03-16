'use client'


import Image from 'next/image'
import React, { useState } from 'react'

export default function ListControls({ search, setSearch, sort, setSort, sortOptions }) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full items-end">

      <input
        className="px-5 py-2 w-full min-w-60 rounded-full bg-[#12AA9F]/20  shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Mag search ng may utang"
      />


      <div className="relative inline-block text-white h-10 w-full md:w-fit">
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
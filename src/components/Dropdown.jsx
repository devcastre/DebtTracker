'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export function SortDropdown({ sort, setSort, sortOptions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = sortOptions.find((o) => o.value === sort)?.label || 'Sort Debtors...';

  return (
    <div ref={ref} className='relative inline-block text-white h-10 w-full lg:w-72'>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-full h-10 flex items-center justify-between bg-(--primaryColor) pr-8 pl-3 rounded-sm shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)] active:shadow-[inset_4px_4px_4px_0px_rgba(0,0,0,0.75),inset_-4px_-4px_4px_0px_rgba(255,255,255,0.75)] transition-shadow duration-150 focus:outline-none'
      >
        <span className='truncate text-left'>{selectedLabel}</span>
        <Image
          src={isOpen ? '/Icons/aUpIconW.svg' : '/Icons/aDownIconW.svg'}
          alt='arrow'
          width={20}
          height={20}
          className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2'
        />
      </button>

      {isOpen && (
        <ul className='absolute z-10 mt-2 w-full bg-(--primaryColor) rounded-sm shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)] overflow-hidden max-h-60 overflow-y-auto'>
          <li
            onClick={() => { setSort(''); setIsOpen(false); }}
            className='px-3 py-2 cursor-pointer hover:bg-black/20 transition-colors'
          >
            Sort Debtors...
          </li>
          {sortOptions.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => { setSort(value); setIsOpen(false); }}
              className={`px-3 py-2 cursor-pointer hover:bg-black/20 transition-colors ${sort === value ? 'bg-black/10' : ''}`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
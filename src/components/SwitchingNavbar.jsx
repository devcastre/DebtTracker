'use client'

import { NavItems } from '@/src/components/NavItems';
import LogoutButton from '@/src/components/LogOut';
import Image from 'next/image';
import { useState } from 'react';

export function Sidebar() {
  
    const [collapsed, setCollapsed] = useState(false)

    return (

        <aside className={`[background:var(--primary-gradient)] h-screen text-white hidden md:flex flex-col gap-12 pt-6 pb-4 px-3 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'md:w-56 xl:w-72'}`}>
            
            <h3 className={`text-white text-2xl mb-0 ${collapsed? 'self-center': 'self-start'}`}>{collapsed ? 'DB' : 'Debt Tracker'}</h3>
            
            <NavItems collapsed={collapsed} />

            <div className={`flex gap-2 items-center ${collapsed? 'flex-col': 'flex-row-reverse'}`}>
                <button
                    type='button'
                    onClick={() => setCollapsed(!collapsed)}
                    className='flex flex-row text-white hover:bg-white/20 rounded p-1'
                    aria-label='Toggle sidebar'
                >
                    <Image
                    src={collapsed? '/Icons/sidebarOpen.svg' : '/Icons/sidebarClose.svg'}
                    alt='sidebarIcon'
                    width={collapsed? 24 : 50}
                    height={collapsed? 24 : 50}
                    />
                    
                </button>

                <LogoutButton collapsed={collapsed}/>
            </div>

        </aside>
    )
}

export function BottomNav() {
  
    return (

        <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden flex flex-col gap-2'>
            <LogoutButton />
            <nav className='[background:var(--primary-gradient)] text-white w-full'>
                <NavItems mobile />
            </nav>
        </div>
    )
}



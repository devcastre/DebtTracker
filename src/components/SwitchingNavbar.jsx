'use client'

import { NavItems } from '@/src/components/NavItems';
import LogoutButton from '@/src/components/LogOut';

export function Sidebar() {
  
    return (

        <aside className='[background:var(--primary-gradient)] h-dvh text-white hidden md:flex md:w-72 flex-col gap-12 pt-6 pb-4 px-5 md:px-3'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-white text-3xl'>Debt Tracker</h3>
                <hr />
            </div>
            <NavItems />
            <LogoutButton />
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



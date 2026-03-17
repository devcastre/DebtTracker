'use client'

import { NavItems } from "../components/NavItems";

export function Sidebar() {
  
    return (

        <aside className="[background:var(--primary-gradient)] text-white hidden md:flex md:w-72 flex-col gap-12 py-12 px-5 md:px-3">
            <span>
                <h3 className="text-white text-4xl">Debt Tracker</h3>
            </span>
            <NavItems />
        </aside>
    )
}

export function BottomNav() {
  
    return (

        <nav className="[background:var(--primary-gradient)] text-white fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <NavItems mobile />
        </nav>
    )
}



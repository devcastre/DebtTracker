'use client'

import { supabase } from '@/app/lib/supabase';

export default function LogoutButton() {

    
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="italic p-2 text-sm font-bold text-white  bg-(--primaryColor) md:bg-transparent w-fit md:w-full m-1 md:m-0 rounded-sm md:rounded-md md:border-2 md:border-white md:hover:text-(--primaryColor) md:hover:bg-white shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)] md:shadow-none"
    >
      Logout
    </button>
  );
}
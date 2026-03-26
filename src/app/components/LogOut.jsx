'use client'

import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {

  const router = useRouter();
    
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-bold p-2 italic rounded-md text-white border-2 hover:text-(--primaryColor) hover:border-0 hover:bg-white"
    >
      Logout
    </button>
  );
}
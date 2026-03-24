'use client'

import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {

  const router = useRouter();
    
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {

      router.replace('/');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-700 hover:text-red-600"
    >
      Logout
    </button>
  );
}
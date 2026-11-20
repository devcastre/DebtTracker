'use client'

import { createClient} from '@/src/lib/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LogoutButton({collapsed = false}) {
  
  const supabase = createClient();
  const router = useRouter();
    
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
    else {
      router.push('/'); 
      router.refresh();     
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex justify-center italic p-2 text-sm font-bold text-white  bg-(--primaryColor) md:bg-transparent w-fit md:w-full m-2 md:m-0  shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)] md:shadow-none ${collapsed? 'border-0':'rounded-sm md:rounded-sm md:border-2 md:border-white md:hover:text-(--primaryColor) md:hover:bg-white'}`}
    >
      {collapsed ? (
        <Image
          src='/Icons/logout.svg'
          alt='Logout'
          width={24}
          height={24}
        />
      ) : (
        'Logout'
      )}
    </button>
  );
}
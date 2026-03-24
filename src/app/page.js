'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import LogIn from '@/app/components/LogIn';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.replace('/dashboard');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) return <p className="text-center mt-24">Checking authentication...</p>;

  return (
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 w-full flex flex-col gap-24'>
      <h1 className="text-(--primaryColor) text-5xl w-full text-center drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]">
        Welcome! Please login or sign up
      </h1>
      <LogIn/>
    </main>
  );
}
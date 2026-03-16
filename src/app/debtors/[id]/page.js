'use client'

import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function DebtorsProfilePage() {

    const params = useParams();
    const id = params.id

    const [debtor, setDebtor] = useState(null)
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
      async function getDebtorById() {
        const {data, error } = await supabase
          .from("debtors")
          .select(`*, transactions(*)`)
          .eq("id", id)
          .single()

        if (error) {
          console.error(error)
          return
        }

        if (!data) return

        const remainingBalance = data.transactions.reduce((total, t) => {

            if (t.type === 'debt'){
                const interest = t.interest_rate ? t.amount * (t.interest_rate / 100) : 0
                return total + t.amount + interest
            }

            if (t.type === 'payment'){
                return total - t.amount
            }

            return total

        }, 0)

        setDebtor(data)
        setBalance(remainingBalance)
        setLoading(false)


      }

      if (id) {
        getDebtorById()
      }

    }, [id])



  const transactions = debtor?.transactions || [];

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const recentPayment = sorted
    .filter(t => t.type === 'payment')
    .slice(0, 3);

  const recentDebt = sorted
    .filter(t => t.type === 'debt')
    .slice(0, 3);




  if (loading) return <div>Loading...</div>

  if (!debtor) notFound();

  return (
    <main className='px-6 pt-6 pb-32 md:p-12 w-full flex flex-col gap-5'>       
      <div className='flex flex-wrap justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-(--primaryColor) mb-0 drop-shadow-[2px_2px_0.75px_rgba(0,0,0,0.75)]'>{debtor.name}</h1>
          <span className='text-black italic'>{debtor.contact}</span>          
        </div>
        <h2 className='text-(--primaryColor)'><span className='text-xs italic text-black'>Balance:</span> ₱{balance}</h2>    
      </div>

      <div className='flex flex-col bg-white rounded-lg p-6 gap-12'>
        <div className='flex flex-col gap-3 w-full'>
          <h4 className='text-(--primaryColor) text-center border-3 p-1 rounded-sm'>Recent Debt:</h4>
          <ul className='flex flex-col items-center gap-4'>
            {recentDebt.map(rdebt => (
              <li key={rdebt.id} className='grid grid-cols-2 place-items-center w-full'>
                <span className='text-black'>₱{rdebt.amount}</span>
                <span className='text-black'>{rdebt.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-3'>
          <h4 className='text-(--primaryColor) text-center border-3 p-1 rounded-sm'>Recent Payment:</h4>
          <ul className='flex flex-col items-center gap-4'>
            {recentPayment.map(rpay => (
              <li key={rpay.id} className='grid grid-cols-2 place-items-center w-full'>
                <span className='text-black'>₱{rpay.amount}</span>
                <span className='text-black'>{rpay.date}</span>
              </li>
            ))}
          </ul>
        </div>        
      </div>
      <Link href={`/debtors/${debtor.id}/newtransaction`} className='bg-(--primaryColor) text-xl py-3 w-full rounded text-white flex items-center justify-center shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)] gap-2'>
          <Image
            src='/Icons/addIconW.svg'
            alt="addIcon"
            width={30}
            height={30}
          />
          Add Transaction
      </Link>


    </main>
  )
}

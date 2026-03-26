'use client'


import React, { useEffect, useState } from 'react'
import TrashList from '@/app/components/TrashList';
import { supabase } from '@/app/lib/supabase';



export default function TrashHub() {
  const [debtors, setDebtors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getTrashDebtors() {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('debtors')
        .select(`*, transactions(*)`)
        .eq("user_id", user.id)
        .eq('status', 'trash')

      if (error) {
        console.error('Error fetching active debtors:', error)
        setError('Failed to load debtors.')
        setLoading(false)
        return
      }




      if (data) {
        const transactionsData = data.map((debtor) => {

          const remainingBalance = debtor.transactions.reduce((total, t) => {

            if (t.type === 'debt') {
              const interest = t.interest_rate
                ? t.amount * (t.interest_rate / 100)
                : 0

              return total + t.amount + interest
            }

            if (t.type === 'payment') {
              return total - t.amount
            }

            return total
          }, 0)

          const debts = debtor.transactions.filter(t => t.type === 'debt');
          const payments = debtor.transactions.filter(t => t.type === 'payment')

          return {
            ...debtor,
            balance: remainingBalance,
            debts,
            payments
          }
        })

        setDebtors(transactionsData)
      }


      setLoading(false)
    }

    getTrashDebtors()
  }, [])
  
  return (
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 lg:pb-6 w-full flex flex-col gap-6'>
      <h1 className="text-(--primaryColor) text-4xl sm:text-5xl w-full text-center lg:text-start drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]">TrashHub</h1>
      {loading ? <p>Loading...</p> : <TrashList data={debtors} />}
    </main>
  )
}

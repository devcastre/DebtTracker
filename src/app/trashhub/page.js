'use client'


import React, { useEffect, useState } from 'react'
import TrashList from '../components/TrashList';
import { supabase } from '../lib/supabase';



export default function TrashHub() {
  const [debtors, setDebtors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getTrashDebtors() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('debtors')
        .select(`*, transactions(*)`)
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
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 lg:pb-6 w-full flex flex-col gap-24'>
      <h1 className="text-(--primaryColor) text-5xl w-full text-center lg:text-start">TrashHub</h1>
      {loading ? <p>Loading...</p> : <TrashList data={debtors} />}
    </main>
  )
}

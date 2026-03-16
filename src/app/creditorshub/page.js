'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ActiveList from '../components/ActiveList'
import Link from 'next/link'
import Image from 'next/image'

export default function CreditorsHub() {
  const [debtors, setDebtors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getActiveDebtors() {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('debtors')
        .select(`*, transactions(*)`)
        .eq('status', 'active')

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

    getActiveDebtors()
  }, [])


  return (
    <main className="px-6 pt-12 pb-32 md:px-8 lg:px-12 lg:pb-6 w-full flex flex-col gap-24">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-between">
          <h1 className="text-(--primaryColor) text-5xl w-100 text-center lg:text-start">CreditorsHub</h1>

          <div className="flex flex-row gap-6">
            <Link href="/createdebtors" className="bg-(--primaryColor) p-2 w-72 h-14 rounded text-white flex gap-2 items-center justify-center shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)]">
              <Image
                src='/Icons/addIconW.svg'
                alt="addIcon"
                width={30}
                height={30}
              />              
              Mag-dadag ng may-utang
            </Link>
          </div>
        </div>

        {loading && <p>Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <ActiveList data={debtors} />
        )}
      </div>
    </main>
  )
}
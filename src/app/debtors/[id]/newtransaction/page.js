'use client'

import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

export default function TransactionForm() {
  const { id: debtorId } = useParams();

  const [type, setType] = useState('debt');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          debtor_id: Number(debtorId),
          type,
          amount: Number(amount),
          interest_rate: 5, 
          date
        }
      ]);

    setAmount('');
    setDate('');
    setType('debt');
    setSuccess(true);
  };

  return (
    <main className='p-6 flex w-full h-dvh items-center justify-center'>
      <div className='p-6 w-full max-w-md bg-white shadow-lg rounded-md'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label className="mb-2 md:m-0 block text-sm font-bold text-(--primaryColor) uppercase">
              Type :
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 pl-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            >
              <option value="debt">Debt</option>
              <option value="payment">Payment</option>
            </select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label className="mb-2 md:m-0 block text-sm font-bold text-(--primaryColor) uppercase">
              Amount :
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
              required
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label className="mb-2 md:m-0 block text-sm font-bold text-(--primaryColor) uppercase">
              Date :
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder='dd/mm/yyyy'
              required
              className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>

          <button
            type="submit"
            className='w-full p-2 bg-(--primaryColor) text-white rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)]'
          >
            Add Transaction
          </button>

          {success && (
            <div>
              <Link href={`/debtors/${debtorId}`}>
                Go back to Profile
              </Link>
              <p>Transaction added successfully!</p>
            </div>
          )}

        </form>
      </div>
    </main>
  );
}
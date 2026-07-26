'use client'


import Link from 'next/link';
import { useState } from 'react'

export default function NewTransactionForm({ action, debtorId }) {

  const [type, setType] = useState('debt');      
  const [amount, setAmount] = useState('');       
  const [date, setDate] = useState('');           
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData) {
    await action(formData)
    setSuccess(true)
  }

  return (
    <main className='px-6 pt-6 pb-32 md:pb-6 flex w-full h-dvh items-center justify-center'>
      <div className='p-6 w-full max-w-md bg-white shadow-lg rounded-sm'>
        <form action={handleSubmit} className='flex flex-col gap-5'>

          <input type='hidden' name='debtor_id' value={debtorId} />

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label className='mb-2 md:m-0 block text-sm font-bold text-(--primaryColor) uppercase'>
              Type :
            </label>
            <select
              name='type'
              value={type}
              onChange={e => setType(e.target.value)}
              className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 pl-4 text-base font-medium text-[#6B7281] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
            >
              <option value='debt'>Debt</option>
              <option value='payment'>Payment</option>
            </select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label className='mb-2 md:m-0 block text-sm font-bold text-(--primaryColor) uppercase'>
              Amount :
            </label>
            <input
              type='number'
              name='amount'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder='Amount'
              required
              className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-4 text-base font-medium text-[#34373e]outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label className='mb-2 md:m-0 block text-sm font-bold text-(--primaryColor) uppercase'>
              Date :
            </label>
            <input
              type='date'
              name='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder='dd/mm/yyyy'
              required
              className='w-full bg-(--background) rounded-sm border border-[#e0e0e0]  py-3 px-4 text-base font-medium text-[#6B7281] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
            />
          </div>

          <button
            type='submit'
            className='w-full p-2 bg-(--primaryColor) hover:bg-(--secondaryColor) text-white rounded-sm shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)]'
          >
            Add Transaction
          </button>

          {success && (
            <div className='flex flex-col gap-6'>
              <p>✅ Transaction added successfully!</p>
              <Link 
                href={`/creditorshub/debtors/${debtorId}`} 
                className='text-(--primaryColor) hover:text-(--secondaryColor) transition'
              >
                ←  Back to Profile
              </Link>
            </div>
          )}

        </form>
      </div>
    </main>
  );
}
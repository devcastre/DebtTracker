'use client'


import React, { useState } from 'react'
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';

export default function CreateDebtors() {


    const [form, setForm] = useState({
        name: '',
        contact: '',
        status: 'active',
        amount: '',
        date: '',
        interest_rate: 5
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return
        setLoading(true)

        try {
            
            const { data: { user } } = await supabase.auth.getUser();
            const {data, error} = await supabase
                .from('debtors')
                .insert(
                    {
                        name: form.name,
                        contact: form.contact,
                        status: form.status,
                        user_id: user.id
                    }
                )
                .select()
                .single()

            if(error) throw error

            if(form.amount){

                const {error: transactionsError} = await supabase
                    .from('transactions')
                    .insert(
                        {
                            user_id: user.id,
                            debtor_id: data.id,
                            type: 'debt',
                            amount: Number(form.amount),
                            date: form.date,
                            interest_rate: Number(form.interest_rate)
                        }
                    )

                if(transactionsError) throw transactionsError
            }



        } 
        catch (error) {
            console.error(error)
            alert('Error submitting form')
        }

        setLoading(false)
        setSuccess(true)
        

    }

  return (
    <main className='p-6 flex w-full h-dvh items-center justify-center'>
        <div className='p-6 w-full max-w-md bg-white shadow-lg rounded-md'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor="name" className="mb-3 block text-base font-medium text-(--primaryColor)">
                        Name:
                    </label>                
                    <input
                        type='text'
                        id='name'
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        placeholder='Juan De Luma'
                        required
                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-(--tertiaryColor) focus:shadow-md'
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor="contact" className="mb-3 block text-base font-medium text-(--primaryColor)">
                        Contact:
                    </label>                
                    <input
                        type='number'
                        id='contact'
                        value={form.contact}
                        onChange={e => setForm({...form, contact: e.target.value})}
                        placeholder='0912-345-6789'
                        required
                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-(--tertiaryColor) focus:shadow-md'
                    />

                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor="amount" className="mb-3 block text-base font-medium text-(--primaryColor)">
                        Amount:
                    </label>                
                    <input
                        type='number'
                        id='amount'
                        value={form.amount}
                        onChange={e => setForm({...form, amount: e.target.value})}
                        placeholder='₱ 0000.00'
                        required
                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-(--tertiaryColor) focus:shadow-md'
                    />

                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor="date" className="mb-3 block text-base font-medium text-(--primaryColor)">
                        Date:
                    </label>                
                    <input
                        type='date'
                        id='date'
                        value={form.date}
                        onChange={e => setForm({...form, date: e.target.value})}
                        placeholder='dd/mm/yyyy'
                        required
                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-(--tertiaryColor) focus:shadow-md'
                    />

                </div>                                                

                <button type='submit' className='w-full p-2 bg-(--primaryColor) hover:bg-(--tertiaryColor) text-white hover:text-(--primaryColor) rounded-md shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)]'>
                    Add Debtor
                </button>

                {success && (
                    <div>
                        <Link href={`/creditorshub`}>
                        Go back to Main List
                        </Link> 
                        <p>Debtors added successfully!</p>
                    </div>
                )}

            </form>            
        </div>
    </main>
  )
}

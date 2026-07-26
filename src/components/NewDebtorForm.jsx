'use client'

import Link from 'next/link';
import { useState } from 'react'


export default function NewDebtorForm({action}){

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
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

                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor='name' className='mb-3 block text-base font-medium text-(--primaryColor)'>
                        Name:
                    </label>                
                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Juan De Luma'
                        required
                        className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e]outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor='contact' className='mb-3 block text-base font-medium text-(--primaryColor)'>
                        Contact:
                    </label>                
                    <input
                        type='number'
                        name='contact'
                        id='contact'
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder='0912-345-6789'
                        required
                        className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e]outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
                    />

                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor='amount' className='mb-3 block text-base font-medium text-(--primaryColor)'>
                        Amount:
                    </label>                
                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder='₱ 0000.00'
                        required
                        className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
                    />

                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
                    <label htmlFor='date' className='mb-3 block text-base font-medium text-(--primaryColor)'>
                        Date:
                    </label>                
                    <input
                        type='date'
                        name='date'
                        id='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        placeholder='dd/mm/yyyy'
                        required
                        className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6b7281] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
                    />

                </div>                                                

                <button type='submit' className='w-full p-2 bg-(--primaryColor) hover:bg-(--secondaryColor) text-white rounded-sm shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)]'>
                    Add Debtor
                </button>

                {success && (
                    <div className='flex flex-col gap-6'>
                        <p>✅ Debtors added successfully!</p>
                        <Link 
                            href={`/creditorshub`} 
                            className='text-(--primaryColor) hover:text-(--secondaryColor) transition'
                        >
                            ←  Back to Main List
                        </Link>
                    </div>                    
                )}

            </form>            
        </div>
    </main>
    )
}
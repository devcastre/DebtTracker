'use client'


import React, { useEffect, useMemo, useState } from 'react'
import ListControls from './ListControls';
import Link from 'next/link';
import useDeleteDebtor from '../lib/deleteDebtor';
import Image from 'next/image';

export default function ActiveList({data}) {

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [list, setList] = useState(data);

    useEffect(() => {
        setList(data);
    }, [data]);


    const sortoptions = [
        { value: 'name', label: 'ABCD...' },
        { value: 'recentdebt', label: 'Kakautang lang' },
        { value: 'recentpayment', label: 'Kakabayad lang' },
        { value: 'highestdebts', label: 'Pinakamataas na utang' },
        { value: 'lowestdebts', label: 'Pinakamababa na utang' }
    ]


    const sortFunctions = {
        name: (a, b) => a.name.localeCompare(b.name),
        recentdebt: (a, b) => {
            const aLatest = Math.max(...(a.debts?.map(t => new Date(t.date)) || [0]));
            const bLatest = Math.max(...(b.debts?.map(t => new Date(t.date)) || [0]));
            return bLatest - aLatest;
        },
        recentpayment: (a, b) => {
            const aLatest = Math.max(...(a.payments?.map(t => new Date(t.date)) || [0]));
            const bLatest = Math.max(...(b.payments?.map(t => new Date(t.date)) || [0]));
            return bLatest - aLatest;
        },
        highestdebts: (a, b) => b.balance - a.balance,
        lowestdebts: (a, b) => a.balance - b.balance,
    }


    const processeddata = useMemo(() => {

        let filtered = list.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

        if(sort && sortFunctions[sort]){
            return [...filtered].sort(sortFunctions[sort])
        }

        return filtered

    }, [list, sort, search])




    const { deleteDebtor } = useDeleteDebtor();

    const handleDelete = async (id) => {

        try {
            await deleteDebtor(id);
            setList(prev => prev.filter(d => d.id !== id));
        } 
        catch (err) {
            console.error(err);
        }
    };    





  return (
    <div className='flex flex-col bg-white rounded-lg p-6 gap-12'>
        <div className='flex flex-col gap-6 item-center md:items-start'>
            <h3 className='text-(--primaryColor) font-semibold md:whitespace-nowrap'>Listahan ng may-utang</h3>
            <ListControls
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                sortOptions={sortoptions}
            />            
        </div>

        <ul className='flex flex-col gap-5'>
            {processeddata.map(d => (
                <li key={d.id} className='grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-2 lg:gap-6'>
                    <Link href={`/debtors/${d.id}`} className='flex flex-row items-center justify-between p-2 bg-(--primaryColor) text-white rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>
                        <span className='px-2'>{d.name}</span>
                        <div className='px-4 py-2 w-36 rounded-md bg-white text-black shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.75)]'>₱ {d.balance}</div>
                    </Link> 
                    <button onClick={(e) => handleDelete(d.id)} className='flex gap-2 w-full p-2 bg-(--quaternaryColor) text-white items-center justify-center rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>
                        <Image
                        src='/Icons/trashIconW.svg'
                        alt="restoreIcon"
                        width={30}
                        height={30}
                        />                           
                        Itapon
                    </button>
                </li>
            ))}
        </ul>
    
    </div>
  )
}

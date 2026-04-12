'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ListControls from '@/app/components/ListControls'
import useRestoreDebtor from '@/app/lib/restoreDebtor';
import usePermaDeleteDebtor from '@/app/lib/permaDeleteDebtor';
import Image from 'next/image';

export default function TrashList({data}) {

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [list, setList] = useState(data)

    useEffect(() => {
        setList(data);
    }, [data]);

    const sortoptions = [
        { value: 'name', label: 'ABCD...' },
        { value: 'recentpayment', label: 'Kakabayad lang' },
    ]
    
    const sortFunctions = {
        name: (a, b) => a.name.localeCompare(b.name),
        recentpayment: (a, b) => {
            const aLatest = Math.max(...(a.payments?.map(t => new Date(t.date)) || [0]));
            const bLatest = Math.max(...(b.payments?.map(t => new Date(t.date)) || [0]));
            return bLatest - aLatest;
        },
    }


    const processeddata = useMemo(() => {

        let filtered = list.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

        if(sort && sortFunctions[sort]){
            return [...filtered].sort(sortFunctions[sort])
        }

        return filtered

    }, [list, sort, search])  
    
    

    const { restoreDebtor } = useRestoreDebtor();

    const handleRestore = async (id) => {

        try {
            await restoreDebtor(id);
            setList(prev => prev.filter(d => d.id !== id));
        } 
        catch (err) {
            console.error(err);
        }
    };
    const { deletePermanent } = usePermaDeleteDebtor();

    const handleDeletePermanent = async (id) => {

        try {
            await deletePermanent(id);
            setList(prev => prev.filter(d => d.id !== id));
        } 
        catch (err) {
            console.error(err);
        }
    };        



  return (
    
    <div className='flex flex-col bg-white rounded-lg p-6 gap-12'>
        <div className='flex flex-col gap-6 item-center md:items-start'>
            <h3 className='text-(--primaryColor) font-medium md:whitespace-nowrap'>List of Trashed Debtors</h3>
            <ListControls
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                sortOptions={sortoptions}
            />            
        </div>
        {processeddata.length === 0 ? (
            <div className='h-72 flex flex-col items-center justify-center mb-10'>No Data Found</div>
        ) : (
            <ul className='flex flex-col gap-5'>
                {processeddata.map(d => (
                    <li key={d.id} className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 lg:gap-6'>
                        <span className='p-2 bg-(--primaryColor) text-white text-center lg:text-start rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>{d.name}</span>
                        <div className='flex flex-row gap-2'>
                            <button onClick={(e) => handleRestore(d.id)} className='flex gap-2 w-full p-2 bg-(--secondaryColor) text-white items-center justify-center rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>
                                <Image
                                src='/Icons/restoreIconW.svg'
                                alt="restoreIcon"
                                width={30}
                                height={30}
                                />
                                Restore
                            </button>
                            <button onClick={(e) => handleDeletePermanent(d.id)} className='flex gap-2 w-full p-2 bg-(--quarternaryColor) text-white items-center justify-center rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>
                                <Image
                                src='/Icons/trashIconSW.svg'
                                alt="restoreIcon"
                                width={30}
                                height={30}
                                />                            
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    
    </div>

  )
}

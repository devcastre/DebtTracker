'use client'

import ListControls from '@/src/components/ListControls';
import Link from 'next/link';
import Image from 'next/image';
import useTrashDebtor from '@/src/hooks/trashDebtor';
import Modal from '@/src/components/Modal';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getGroupHeading, getMonthKey } from '../utils/dateFunctions';

export default function ActiveList({debtors}) {

    const safeDebtors = debtors ?? [];
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const [openModal, setOpenModal] = useState(false)
    const [confirmAction, setConfirmAction] = useState(null)

    const closeModal = () => {
        setOpenModal(false);
        setConfirmAction(null);
    };


    const sortoptions = [
        { value: 'name', label: 'ABCD...' },
        { value: 'recentdebt', label: 'Recently Debt' },
        { value: 'recentpayment', label: 'Recently Paid' },
        { value: 'highestdebts', label: 'Highest Balance' },
        { value: 'lowestdebts', label: 'Lowest Balance' }
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

        let filtered = safeDebtors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

        if(sort && sortFunctions[sort]){
            return [...filtered].sort(sortFunctions[sort])
        }

        return filtered

    }, [safeDebtors, sort, search])


    const groupedData = useMemo(() => {

        if (sort) return null;

        const groups = new Map();
        processeddata.forEach((d) => {
            const { key, label } = getMonthKey(d.created_at);

            if (!groups.has(key)) {
                groups.set(key, {
                    key,
                    label,
                    heading: getGroupHeading(key, label),
                    items: [],
                });
            }
            groups.get(key).items.push(d);
        });

        return Array.from(groups.values()).sort((a, b) => b.key.localeCompare(a.key));

    }, [processeddata, sort]);




    const { trashDebtor } = useTrashDebtor();

    const handleTrash = async (id, balance, user_id) => {
        
        if(balance > 0){
            setConfirmAction(() => async () => {
                await trashDebtor(id, balance, user_id);
                router.refresh();     
                closeModal();          
            })

            setOpenModal(true);
        }
        else{
            await trashDebtor(id, 0);
            router.refresh();
        }
    };    


    if(!processeddata) return <div>No Debtors Exist</div>

    const renderRow = (d) => (
        <li key={d.id} className='grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-2 lg:gap-6'>
            <Link href={`/creditorshub/debtors/${d.id}`} className='flex flex-row items-center justify-between p-2 bg-(--primaryColor) text-white rounded-sm shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>
                <span className='px-1'>{d.name}</span>
                <div className='px-4 py-1 w-36 rounded-sm bg-white text-black shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.75)]'>₱ {+Number(d.balance).toFixed(2)}</div>
            </Link> 
            <button onClick={() => handleTrash(d.id, d.balance)} className='flex gap-2 w-full p-2 bg-(--quarternaryColor) text-white items-center justify-center rounded-sm shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]'>
                <Image
                src='/Icons/trashIconW.svg'
                alt='restoreIcon'
                width={30}
                height={30}
                />                           
                Trash
            </button>
        </li>
    );


  return (
    <div className='flex flex-col bg-white rounded-sm p-6 gap-12'>
        <div className='flex flex-col gap-6 items-center md:items-start'>
            <h4 className='text-(--primaryColor) font-medium md:whitespace-nowrap'>List of Active Debtors</h4>
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
        ) : groupedData ? (
            <div className='flex flex-col gap-8'>
                {groupedData.map(group => (
                    <div key={group.key} className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3'>
                            <span className='text-sm font-semibold uppercase tracking-wide text-(--primaryColor)'>
                                {group.heading}
                            </span>
                            <span className='flex-1 h-px bg-(--primaryColor)/20' />
                            <span className='text-xs text-gray-400'>{group.items.length} {group.items.length === 1 ? 'debtor' : 'debtors'}</span>
                        </div>
                        <ul className='flex flex-col gap-5'>
                            {group.items.map(d => renderRow(d))}
                        </ul>
                    </div>
                ))}
            </div>
        ) : (
            <ul className='flex flex-col gap-5'>
                {processeddata.map(d => renderRow(d))}
            </ul>
        )}



        <Modal
            isOpen={openModal}
            onConfirm={confirmAction}
            onCancel={closeModal}
        />
    
    </div>
  )
}

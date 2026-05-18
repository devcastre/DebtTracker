

import ExportDebtorDetailBtn from '@/src/app/components/ExportDebtorDetailBtn';
import { getDebtorById } from '@/src/app/lib/getDebtorById';
import Image from 'next/image';
import Link from 'next/link';


export default async function DebtorsProfilePage({params}) {

    const {id} = await params;
    const {debtor, balance, recentPayment, recentDebt} = await getDebtorById(id);


  return (
    <main className='px-6 pt-6 pb-32 md:p-12 w-full flex flex-col gap-5'>       
      <div className='flex flex-col xs:flex-row xs:justify-between xs:gap-0 gap-8'>
        <div className='flex flex-col'>
          <h1 className='text-(--primaryColor) mb-0 drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]'>{debtor.name}</h1>
          <span className='text-black'>{debtor.contact}</span>          
        </div>
        <div className='flex flex-col xs:items-end'>
          <h2 className='text-(--primaryColor) mb-0 drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]'>₱{balance}</h2>
          <span className='text-black'>Balance</span> 
        </div>  
      </div>

      <div className='flex flex-col bg-white rounded-lg p-6 gap-12'>
        <div className='flex flex-col gap-3 w-full'>
          <h4 className='text-(--primaryColor) text-center border-3 border-(--primaryColor)/50 p-1 rounded-sm'>Recent Debt:</h4>
          {recentDebt.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (           
            <ul className='flex flex-col items-center gap-4'>
              {recentDebt.map(rdebt => (
                <li key={rdebt.id} className='grid grid-cols-2 place-items-center w-full'>
                  <span className='text-black'>₱{rdebt.amount}</span>
                  <span className='text-black'>{rdebt.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          <h4 className='text-(--primaryColor) text-center border-3 border-(--primaryColor)/50 p-1 rounded-sm'>Recent Payment:</h4>
          {recentPayment.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (  
            <ul className='flex flex-col items-center gap-4'>
              {recentPayment.map(rpay => (
                <li key={rpay.id} className='grid grid-cols-2 place-items-center w-full'>
                  <span className='text-black'>₱{rpay.amount}</span>
                  <span className='text-black'>{rpay.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>        
      </div>
      <div className='flex flex-col md:flex-row gap-5 md:gap-12'>
        <ExportDebtorDetailBtn debtor={debtor} balance={balance}/>
        <Link href={`/creditorshub/debtors/${debtor.id}/newtransaction`} className='bg-(--primaryColor) text-xl py-3 w-full rounded text-white flex gap-2 items-center justify-center shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)]'>
          <Image
            src='/Icons/addIconW.svg'
            alt="addIcon"
            width={30}
            height={30}
          />
            Add Transaction
        </Link>
      </div>



    </main>
  )
}

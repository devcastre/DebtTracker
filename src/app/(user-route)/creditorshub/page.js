

import ActiveList from '@/src/app/components/ActiveList'
import Link from 'next/link'
import Image from 'next/image'
import { getActiveDebtors } from '@/src/app/lib/getActiveDebtors'
import ExportActiveButton from '@/src/app/components/ExportActiveButton';

export default async function CreditorsHub() {


  const debtors = await getActiveDebtors();
  

  return (
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 lg:pb-6 w-full flex flex-col'>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-wrap items-center md:items-start gap-6 justify-center lg:justify-between'>
          <h1 className='text-(--primaryColor) mb-0 text-3xl sm:text-4xl w-100 text-center lg:text-start drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]'>CreditorsHub</h1>

          <div className='flex flex-col 2xs:flex-row items-center gap-6 '>
            <ExportActiveButton debtors={debtors}/>
            <Link href='/creditorshub/createdebtors' className='bg-(--primaryColor)  px-5 py-3 rounded text-white flex gap-2 items-center justify-center shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)]'>
              <Image
                src='/Icons/addIconW.svg'
                alt='addIcon'
                width={30}  
                height={30}
              />              
              New Debtors
            </Link>
          </div>
        </div>

        <ActiveList debtors={debtors} />

      </div>
    </main>
  )
}
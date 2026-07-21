
'use client'


import Image from 'next/image'
import { exportDebtorDetails } from '../services/excelExport'

export default function ExportDebtorDetailBtn({ debtor, balance }) {
  return (
    <button onClick={() => exportDebtorDetails(debtor, balance)} className='bg-(--primaryColor) text-xl py-3 w-full rounded text-white flex gap-2 items-center justify-center shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)]'>
      <Image
        src='/Icons/downloadIconW.svg'
        alt='downloadIcon'
        width={30}
        height={30}
      />              
      Debtor Details
    </button>
  )
}
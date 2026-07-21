
'use client'


import { exportDebtorsToExcel } from '@/src/app/services/excelExport'
import Image from 'next/image'

export default function ExportActiveButton({ debtors }) {
  return (
    <button onClick={() => exportDebtorsToExcel(debtors)} className='bg-(--primaryColor) px-5 py-3 rounded text-white flex gap-2 items-center justify-center shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75)]' >
        <Image
        src='/Icons/downloadIconW.svg'
        alt='downloadIcon'
        width={30}
        height={30}
        />              
        Active List
    </button>
  )
}
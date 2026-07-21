

import TrashList from '@/src/app/components/TrashList';
import { getTrashedDebtors } from '@/src/app/lib/getTrashedDebtors';


export default async function TrashHub() {
  
  const debtors = await getTrashedDebtors();


  return (
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 lg:pb-6 w-full flex flex-col gap-12'>
      <h1 className='text-(--primaryColor) mb-0 text-3xl sm:text-4xl w-full text-center lg:text-start drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]'>TrashHub</h1>
      <TrashList debtors={debtors} />
    </main>
  )
}

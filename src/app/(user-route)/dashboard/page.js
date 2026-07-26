

import RangeCircle from '@/src/components/RangeCircle';
import TransactionsChart from '@/src/components/TransactionsChart';
import { getDashboardData } from '../../../lib/getDashboardData';

export default async function Dashboard() {


  const {totalsData, allTransactions, debtorsStatistics} = await getDashboardData();

  return (
    <main className='px-6 pt-10 pb-32 md:pb-10 md:px-8 lg:px-12 w-full flex flex-col gap-12 md:gap-8'>
      <h1 className='text-(--primaryColor) mb-0 text-3xl sm:text-4xl w-full text-center lg:text-start drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]'>Dashboard</h1>
      <div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-center gap-6 justify-center lg:justify-between'>
        <RangeCircle totals={totalsData}/>
        <div className='flex flex-col items-start'>
          <h4 className='text-(--primaryColor)'>Transaction Chart</h4>
          <TransactionsChart transactions={allTransactions}/>
        </div>
      </div>
      <div className='h-0.5 w-full bg-(--primaryColor)'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center md:justify-between'>
        <div className='flex flex-col'>
          <h4 className='text-(--primaryColor)'>Largest Debt</h4>
          {debtorsStatistics.sortedLent.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (
              <div className='p-1.5 h-full min-h-60 max-h-64 mt-auto rounded-sm shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4),inset_-2px_-2px_2px_rgba(255,255,255)]'>
                <ul className='flex flex-col h-full bg-(--background) p-3 rounded-sm shadow-[2px_2px_2px_0px_rgba(0,0,0,0.5),-2px_-2px_2px_0px_rgba(255,255,255,0.75)] divide-y-2 divide-(--primaryColor)'>
                  {debtorsStatistics.sortedLent.map((obj, index) => (
                    <li key={obj.id} className='p-4 text-(--primaryColor) flex flex-row justify-between item-center gap-3'><span className='text-base h-fit font-medium'>{index + 1}. {obj.name}</span><span className='text-white bg-(--primaryColor) rounded-sm py-0.5 px-1.5 h-7 whitespace-nowrap'>₱ {obj.sumOfDebt}</span></li>
                  ))}
                </ul>
              </div>

          )}
        </div>
        <div className='flex flex-col'>
          <h4 className='text-(--primaryColor)'>Largest Payment</h4>
          {debtorsStatistics.sortedCollection.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (          
              <div className='p-1.5 h-full min-h-60 max-h-64 mt-auto rounded-sm shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4),inset_-2px_-2px_2px_rgba(255,255,255)]'>
                <ul className='flex flex-col h-full bg-(--background) p-3 rounded-sm shadow-[2px_2px_2px_0px_rgba(0,0,0,0.5),-2px_-2px_2px_0px_rgba(255,255,255,0.75)] divide-y-2 divide-(--primaryColor)'>
                  {debtorsStatistics.sortedCollection.map((obj, index) => (
                    <li key={obj.id} className='p-4 text-(--primaryColor) flex flex-row justify-between item-center gap-3'><span className='text-base h-fit font-medium'>{index + 1}. {obj.name}</span><span className='text-white bg-(--primaryColor) rounded-sm py-0.5 px-1.5 h-7 whitespace-nowrap'>₱ {obj.sumOfPayment}</span></li>
                  ))}
                </ul>                
              </div>
          )}
        </div>
        <div className='flex flex-col'>
          <h4 className='text-(--primaryColor)'>Top Borrower</h4>
          {debtorsStatistics.sortedDebtFreq.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (
              <div className='p-1.5 h-full min-h-60 max-h-64 mt-auto rounded-sm shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4),inset_-2px_-2px_2px_rgba(255,255,255)]'>
                <ul className='flex flex-col h-full bg-(--background) p-3 rounded-sm shadow-[2px_2px_2px_0px_rgba(0,0,0,0.5),-2px_-2px_2px_0px_rgba(255,255,255,0.75)] divide-y-2 divide-(--primaryColor)'>
                  {debtorsStatistics.sortedDebtFreq.map((obj, index) => (
                    <li key={obj.id} className='p-4 text-(--primaryColor) flex flex-row justify-between item-center gap-3'><span className='text-base h-fit font-medium'>{index + 1}. {obj.name}</span><span className='text-white bg-(--primaryColor) rounded-sm py-0.5 px-1.5 h-7 whitespace-nowrap'>{obj.debtLength}x</span></li>
                  ))}
                </ul>
              </div>
          )}   
        </div>        
             
      </div>
    </main>
  );
}

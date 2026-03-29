'use client'


import { useEffect, useState } from "react";
import { supabase } from '@/app/lib/supabase';
import RangeCircle from "@/app/components/RangeCircle";

export default function Dashboard() {


  const [debtors, setDebtors] = useState({sortedDebtFreq: [], sortedLent: [], sortedCollection: []})
  const [totals, setTotals] = useState([])


  useEffect(() => {
    async function getDebtorDashboard(){

      const { data: { user } } = await supabase.auth.getUser();
      const {data, error} = await supabase
        .from('debtors')
        .select('*, transactions (*)')
        .eq('user_id', user.id);
    
      if (error) {
        console.error('Error fetching active debtors:', error)
        return
      }


        const totalData = data.reduce((acc, debtor) => {

          const debts = debtor.transactions.filter(d => d.type === 'debt');
          
          const totalLentArr = debts.reduce((total, t) => {
            return total + Number(t.amount)
          }, 0)

          const payments = debtor.transactions.filter(p => p.type === 'payment');

          const totalCollectedArr = payments.reduce((total, t) => {
            return total + Number(t.amount)
          }, 0)


          acc.totalLent = acc.totalLent + totalLentArr
          acc.totalCollected = acc.totalCollected + totalCollectedArr




        return acc

        
        }, {totalLent: 0, totalCollected: 0})

        setTotals(totalData);



        const statistics = data.map(d => {


          const debts = d.transactions.filter(d => d.type === 'debt');
          const sumOfDebt = debts.reduce((sum, t) => sum + t.amount, 0)

          const payments = d.transactions.filter(p => p.type === 'payment');
          const sumOfPayment = payments.reduce((sum, t) => sum + t.amount, 0)


          const debtLength = debts.length;


          return{id: d.id, name: d.name, sumOfDebt, sumOfPayment, debtLength}

        })

        const sortedDebtFreq = [...statistics].filter(d => d.debtLength !== 0).sort((a,b) => b.debtLength - a.debtLength).slice(0, 3);
        const sortedLent = [...statistics].filter(d => d.sumOfDebt !== 0).sort((a, b) => b.sumOfDebt - a.sumOfDebt).slice(0, 3);
        const sortedCollection = [...statistics].filter(d => d.sumOfPayment !== 0).sort((a, b) => b.sumOfPayment - a.sumOfPayment).slice(0, 3);

        setDebtors({sortedDebtFreq, sortedLent, sortedCollection});
        
    }

    getDebtorDashboard()
  }, [])

  console.log(debtors.sortedCollection)


  return (
    <main className='px-6 pt-12 pb-32 md:px-8 lg:px-12 w-full flex flex-col gap-24'>
      <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-between">
        <h1 className="text-(--primaryColor) text-4xl sm:text-5xl w-100 text-center lg:text-start drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]">Dashboard</h1>
        <RangeCircle totals={totals}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center md:justify-between">
        <div className="flex flex-col gap-4 p-5 rounded-lg shadow-[inset_4px_4px_2px_rgba(0,0,0,0.4),inset_-4px_-4px_2px_rgba(255,255,255)]">
          <h4 className="text-(--primaryColor)">Largest Debt</h4>
          {debtors.sortedLent.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (
              <ul className="flex flex-col gap-2 mt-auto">
                {debtors.sortedLent.map(obj => (
                  <li key={obj.id} className="mx-1 p-3 bg-(--primaryColor) text-white flex flex-row justify-between rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]"><span>{obj.name}</span><span>{obj.sumOfDebt}</span></li>
                ))}
              </ul>
          )}
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-[inset_4px_4px_2px_rgba(0,0,0,0.4),inset_-4px_-4px_2px_rgba(255,255,255)]">
          <h4 className="text-(--primaryColor)">Largest Payment</h4>
          {debtors.sortedCollection.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (          
              <ul className="flex flex-col gap-2 mt-auto">
                {debtors.sortedCollection.map(obj => (
                  <li key={obj.id} className="mx-1 p-3 bg-(--primaryColor) text-white flex flex-row justify-between rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]"><span>{obj.name}</span><span>{obj.sumOfPayment}</span></li>
                ))}
              </ul>
          )}
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-[inset_4px_4px_2px_rgba(0,0,0,0.4),inset_-4px_-4px_2px_rgba(255,255,255)]">
          <h4 className="text-(--primaryColor)">Most Frequent Borrower</h4>
          {debtors.sortedDebtFreq.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (
              <ul className="flex flex-col gap-2 mt-auto">
                {debtors.sortedDebtFreq.map(obj => (
                  <li key={obj.id} className="mx-1 p-3 bg-(--primaryColor) text-white flex flex-row justify-between rounded-md shadow-[4px_4px_4px_0px_rgba(0,0,0,0.75),-4px_-4px_4px_0px_rgba(255,255,255,0.75)]"><span>{obj.name}</span><span>{obj.debtLength} Beses</span></li>
                ))}
              </ul>
          )}   
        </div>        
             
      </div>
    </main>
  );
}

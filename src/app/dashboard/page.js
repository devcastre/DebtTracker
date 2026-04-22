'use client'


import { useEffect, useState } from "react";
import { supabase } from '@/app/lib/supabase';
import RangeCircle from "@/app/components/RangeCircle";
import TransactionsChart from "@/app/components/TransactionsChart";

export default function Dashboard() {

  const [transactions, setTransactions] = useState([])
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

        const allTransactions = data.flatMap(d => d.transactions || []);

        setTransactions(allTransactions);

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


  return (
    <main className='px-6 pt-10 pb-32 md:pb-10 md:px-8 lg:px-12 w-full flex flex-col gap-12 md:gap-8'>
      <h1 className="text-(--primaryColor) mb-0 text-3xl sm:text-4xl w-full text-center lg:text-start drop-shadow-[2px_2px_0.5px_rgba(0,0,0,0.75)]">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-center gap-6 justify-center lg:justify-between">
        <RangeCircle totals={totals}/>
        <div className="flex flex-col items-start">
          <h4 className="text-(--primaryColor)">Transaction Chart</h4>
          <TransactionsChart transactions={transactions}/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center md:justify-between">
        <div className="flex flex-col">
          <h4 className="text-(--primaryColor)">Largest Debt</h4>
          {debtors.sortedLent.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (
              <div className="p-1.5 h-full min-h-60 max-h-64 mt-auto rounded-lg shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4),inset_-2px_-2px_2px_rgba(255,255,255)]">
                <ul className="flex flex-col h-full bg-(--background) p-3 rounded-lg shadow-[2px_2px_2px_0px_rgba(0,0,0,0.5),-2px_-2px_2px_0px_rgba(255,255,255,0.75)] divide-y-2 divide-(--primaryColor)">
                  {debtors.sortedLent.map((obj, index) => (
                    <li key={obj.id} className="p-4 text-(--primaryColor) flex flex-row justify-between item-center gap-3"><span className="text-base h-fit font-medium">{index + 1}. {obj.name}</span><span className="text-white bg-(--primaryColor) rounded-sm py-0.5 px-1.5 h-7">₱ {obj.sumOfDebt}</span></li>
                  ))}
                </ul>
              </div>

          )}
        </div>
        <div className="flex flex-col">
          <h4 className="text-(--primaryColor)">Largest Payment</h4>
          {debtors.sortedCollection.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (          
              <div className="p-1.5 h-full min-h-60 max-h-64 mt-auto rounded-lg shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4),inset_-2px_-2px_2px_rgba(255,255,255)]">
                <ul className="flex flex-col h-full bg-(--background) p-3 rounded-lg shadow-[2px_2px_2px_0px_rgba(0,0,0,0.5),-2px_-2px_2px_0px_rgba(255,255,255,0.75)] divide-y-2 divide-(--primaryColor)">
                  {debtors.sortedCollection.map((obj, index) => (
                    <li key={obj.id} className="p-4 text-(--primaryColor) flex flex-row justify-between item-center gap-3"><span className="text-base h-fit font-medium">{index + 1}. {obj.name}</span><span className="text-white bg-(--primaryColor) rounded-sm py-0.5 px-1.5 h-7">₱ {obj.sumOfPayment}</span></li>
                  ))}
                </ul>                
              </div>
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="text-(--primaryColor)">Top Borrower</h4>
          {debtors.sortedDebtFreq.length === 0 ? (
              <div className='py-10 mb-2 flex flex-col items-center justify-center'>No Records Found</div>
          ) : (
              <div className="p-1.5 h-full min-h-60 max-h-64 mt-auto rounded-lg shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4),inset_-2px_-2px_2px_rgba(255,255,255)]">
                <ul className="flex flex-col h-full bg-(--background) p-3 rounded-lg shadow-[2px_2px_2px_0px_rgba(0,0,0,0.5),-2px_-2px_2px_0px_rgba(255,255,255,0.75)] divide-y-2 divide-(--primaryColor)">
                  {debtors.sortedDebtFreq.map((obj, index) => (
                    <li key={obj.id} className="p-4 text-(--primaryColor) flex flex-row justify-between item-center gap-3"><span className="text-base h-fit font-medium">{index + 1}. {obj.name}</span><span className="text-white bg-(--primaryColor) rounded-sm py-0.5 px-1.5 h-7">{obj.debtLength}x</span></li>
                  ))}
                </ul>
              </div>
          )}   
        </div>        
             
      </div>
    </main>
  );
}

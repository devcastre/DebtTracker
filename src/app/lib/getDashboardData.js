import { createClient } from '@/src/app/lib/server'


export async function getDashboardData(){

    const supabase = await createClient()

    const {data, error} = await supabase
            .from('debtors')
            .select('*, transactions(*)')

            
    if(error) throw new Error(error.message)


        const allTransactions = data.flatMap(d => d.transactions || []);


        const totalsData = data.reduce((acc, debtor) => {

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
        
        const debtorsStatistics = {sortedDebtFreq, sortedLent, sortedCollection};

    return {totalsData, allTransactions, debtorsStatistics}
}
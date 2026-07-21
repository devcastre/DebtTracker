

import { createClient } from '@/src/app/lib/server'


export async function getActiveDebtors() {

    const supabase = await createClient();

    const {data, error} = await supabase
        .from('debtors')
        .select(`*, transactions(*)`)
        .eq('status', 'active')

    if (error) throw new Error(error.message);

    const activeDebtors = data.map((debtor) => {

        const remainingBalance = debtor.transactions.reduce((total, t) => {

            if (t.type === 'debt') {
            const interest = t.interest_rate
                ? t.amount * (t.interest_rate / 100)
                : 0

            return total + t.amount + interest
            }

            if (t.type === 'payment') {
            return total - t.amount
            }

            return total
        }, 0)

        const debts = debtor.transactions.filter(t => t.type === 'debt');
        const payments = debtor.transactions.filter(t => t.type === 'payment')  

        return {
            ...debtor,
            balance: remainingBalance,
            debts,
            payments
        }
    })   

    return activeDebtors ?? []
}
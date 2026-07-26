import { createClient } from './server'


export async function getDebtorById(id){

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('debtors')
        .select('*, transactions(*)')
        .eq('id', id)
        .single()

    if(error) throw new Error(error.message)

        const balance = data.transactions.reduce((total, t) => {

            if (t.type === 'debt'){
                const interest = t.interest_rate ? t.amount * (t.interest_rate / 100) : 0
                return total + t.amount + interest
            }

            if (t.type === 'payment'){
                return total - t.amount
            }

            return total

        }, 0)

        const debtor = data;
        const transactions = debtor?.transactions || [];

        const sorted = [...transactions].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        const recentPayment = sorted
            .filter(t => t.type === 'payment')
            .slice(0, 3);

        const recentDebt = sorted
            .filter(t => t.type === 'debt')
            .slice(0, 3);
        

    return {debtor, balance, recentPayment, recentDebt}
}
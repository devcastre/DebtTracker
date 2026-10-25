'use client'

import { createClient } from '@/src/lib/client';

const getLocalDateTime = () => {
    const now = new Date();
    return now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');
};

export default function useTrashDebtor() {

    const supabase = createClient();

    const trashDebtor = async (id, balance) => {

        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) throw authError ?? new Error('Not authenticated');

            if (balance > 0) {
                const { error: paymentError } = await supabase
                    .from('transactions')
                    .insert([
                        {
                            user_id: user.id,
                            debtor_id: id,
                            type: 'payment',
                            amount: balance,
                            date: getLocalDateTime(),
                            interest_rate: 5
                        }
                    ]);

                if (paymentError) throw paymentError;
            }

            const { data, error } = await supabase
                .from('debtors')
                .update({ status: 'trash' })
                .eq('user_id', user.id)
                .eq('id', id);

            if (error) throw error;

            return data;

        } catch (error) {
            console.error('Error trashing debtor:', error);
            throw error;
        }
    }

    return { trashDebtor };
}
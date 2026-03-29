'use client'

import { supabase } from "@/app/lib/supabase";

export default function useTrashDebtor() {

    const now = new Date();

    const localDateTime = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0');

    const trashDebtor = async (id, balance, user_id) => {

        try {

            if (balance > 0){
                await supabase
                .from('transactions')
                .insert([
                    {
                        user_id: user_id,
                        debtor_id: id,
                        type: 'payment',
                        amount: balance,
                        date: localDateTime,
                        interest_rate: 5
                    }
                ]);
            }        

            const { data: { user } } = await supabase.auth.getUser();
            const {data, error} = await supabase
                .from('debtors')
                .update({status: 'trash'})
                .eq("user_id", user.id)
                .eq('id', id)

            if(error) throw error  

            return data;

        } catch (error) {
            console.error("Error trashing debtor:", error);
            throw error;            
        }
    }

    return {trashDebtor};
    
}
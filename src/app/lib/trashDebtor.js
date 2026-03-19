'use client'

import { supabase } from "./supabase";

export default function useTrashDebtor() {

    const now = new Date();

    const localDateTime = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0');

    const trashDebtor = async (id, balance) => {

        try {

            if (balance > 0){
                await supabase
                .from('transactions')
                .insert([
                    {
                    debtor_id: id,
                    type: 'payment',
                    amount: balance,
                    date: localDateTime,
                    interest_rate: 5
                    }
                ]);
            }        

            const {data, error} = await supabase
                .from('debtors')
                .update({status: 'trash'})
                .eq('id', id)

            if(error) throw error  

            return data;

        } catch (error) {
            console.error("Error trashing debtor:", err);
            throw err;            
        }
    }

    return {trashDebtor};
    
}
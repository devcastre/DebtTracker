'use client'

import { createClient } from '@/src/app/lib/client';

export default function useRestoreDebtor() {

    const supabase = createClient();

    const restoreDebtor = async (id) => {

        const { data: { user } } = await supabase.auth.getUser();
        const {data, error} = await supabase
            .from('debtors')
            .update({status: 'active'})
            .eq('user_id', user.id)
            .eq('id', id)

        if(error) throw error  

        return data;       
    }

    return {restoreDebtor};
    
}
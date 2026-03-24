'use client'

import { supabase } from "@/app/lib/supabase";

export default function useRestoreDebtor() {

    const restoreDebtor = async (id) => {

        const { data: { user } } = await supabase.auth.getUser();
        const {data, error} = await supabase
            .from('debtors')
            .update({status: 'active'})
            .eq("user_id", user.id)
            .eq('id', id)

        if(error) throw error  

        return data;       
    }

    return {restoreDebtor};
    
}
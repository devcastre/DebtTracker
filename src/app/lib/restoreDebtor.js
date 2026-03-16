'use client'

import { supabase } from "./supabase";

export default function useRestoreDebtor() {

    const restoreDebtor = async (id) => {

        const {data, error} = await supabase
            .from('debtors')
            .update({status: 'active'})
            .eq('id', id)

        if(error) throw error  

        return data;       
    }

    return {restoreDebtor};
    
}
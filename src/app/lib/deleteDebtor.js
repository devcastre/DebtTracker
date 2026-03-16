'use client'

import { supabase } from "./supabase";

export default function useDeleteDebtor() {

    const deleteDebtor = async (id) => {

        const {data, error} = await supabase
            .from('debtors')
            .update({status: 'trash'})
            .eq('id', id)

        if(error) throw error  

        return data;       
    }

    return {deleteDebtor};
    
}
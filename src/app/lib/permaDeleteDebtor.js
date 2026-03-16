'use client'

import { supabase } from "./supabase";

export default function usePermaDeleteDebtor() {

    const deletePermanent = async (id) => {

        const {data, error} = await supabase
            .from('debtors')
            .delete()
            .eq('id', id)

        if(error) throw error  

        return data;       
    }

    return {deletePermanent};
    
}
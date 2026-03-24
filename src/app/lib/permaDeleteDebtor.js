'use client'

import { supabase } from "@/app/lib/supabase";

export default function usePermaDeleteDebtor() {

    const deletePermanent = async (id) => {

        const { data: { user } } = await supabase.auth.getUser();
        const {data, error} = await supabase
            .from('debtors')
            .delete()
            .eq("user_id", user.id)
            .eq('id', id)

        if(error) throw error  

        return data;       
    }

    return {deletePermanent};
    
}
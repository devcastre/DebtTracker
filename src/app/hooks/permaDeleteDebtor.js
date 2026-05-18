'use client'

import { createClient } from "@/src/app/lib/client";

export default function usePermaDeleteDebtor() {

    const supabase = createClient();

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
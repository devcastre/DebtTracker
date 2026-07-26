'use server'

import { createClient } from '@/src/lib/server'
import { revalidatePath } from 'next/cache'

export async function addNewDebtor(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const {data, error} = await supabase
    .from('debtors')
    .insert([{
      user_id: user.id,
      status: 'active',
      name: formData.get('name'),
      contact: formData.get('contact')

    }])
    .select()
    .single()
  
  if (error) throw error

  if(formData.get('amount')){

    const {error: transactionError} = await supabase
    .from('transactions')
    .insert([{
      user_id: user.id,
      debtor_id: data.id,
      type: 'debt',
      amount: Number(formData.get('amount')),
      interest_rate: 5,
      date: formData.get('date')
    }])

    if (transactionError) {
      throw transactionError
    }

  }


  revalidatePath(`/creditorshub`)
}
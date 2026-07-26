'use server'

import { createClient } from '@/src/lib/server'
import { revalidatePath } from 'next/cache'

export async function addNewTransaction(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const debtorId = Number(formData.get('debtor_id'))

  const { data: debtor, error: debtorError } = await supabase
    .from('debtors')
    .select('id')
    .eq('id', debtorId)
    .eq('user_id', user.id)
    .single()

  if (!debtor) throw new Error('Not authorized for this debtor')

  const { error } = await supabase
    .from('transactions')
    .insert([{
      user_id: user.id,
      debtor_id: debtorId,
      type: formData.get('type'),
      amount: Number(formData.get('amount')),
      interest_rate: 5,
      date: formData.get('date')
  }])

  if (error) throw new Error(error.message)

  revalidatePath(`/debtors/${debtorId}`)
}
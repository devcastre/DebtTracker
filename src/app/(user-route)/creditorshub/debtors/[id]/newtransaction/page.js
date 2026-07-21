
import NewTransactionForm from '@/src/app/components/NewTransactionForm';
import { addNewTransaction } from '@/src/app/utils/addNewTransaction';


export default async function newtransactionPage({ params }) {
  const { id } = await params

  return <NewTransactionForm action={addNewTransaction} debtorId={id} />
}
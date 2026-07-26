
import NewTransactionForm from '@/src/components/NewTransactionForm';
import { addNewTransaction } from '@/src/utils/addNewTransaction';


export default async function newtransactionPage({ params }) {
  const { id } = await params

  return <NewTransactionForm action={addNewTransaction} debtorId={id} />
}
import NewDebtorForm from '@/src/components/NewDebtorForm'
import { addNewDebtor } from '@/src/utils/addNewDebtor'

export default async function newDebtorPage() {

  return <NewDebtorForm action={addNewDebtor}/>
}
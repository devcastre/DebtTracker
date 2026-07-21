import NewDebtorForm from '@/src/app/components/NewDebtorForm'
import { addNewDebtor } from '@/src/app/utils/addNewDebtor'

export default async function newDebtorPage() {

  return <NewDebtorForm action={addNewDebtor}/>
}
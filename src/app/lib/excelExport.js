
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export function exportDebtorsToExcel(debtors) {
  if (!debtors || debtors.length === 0) return

  const exportData = debtors.map(d => ({
    Name: d.name,
    Contact: d.contact,
    Balance: d.balance.toFixed(2)
  }))

  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Active Debtors")

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
  saveAs(blob, "ActiveDebtors.xlsx")
}

export function exportDebtorDetails(debtor, balance) {
  if (!debtor) return

  const ws = XLSX.utils.aoa_to_sheet([
    ["Name", debtor.name],
    ["Contact", debtor.contact],
    ["Balance", balance],
    [],
    ["Date", "Amount", "Type"],
    ...debtor.transactions.map(t => [
      t.date,
      t.amount,
      t.type
    ])
  ])

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, ws, "Debtor Details")

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
  saveAs(blob, "DebtorInfo.xlsx")
}
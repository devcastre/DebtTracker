import React from 'react'

export default function Modal({isOpen, onCancel, onConfirm, debtors}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          This debtor still has a remaining balance. Proceed will settle it.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

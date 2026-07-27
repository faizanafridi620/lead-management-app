import React from 'react'

function DeleteModal({open, onClose, onConfirm, loading}) {

    if(!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-lg p-6 w-[400px]">

        <h2 className="text-xl font-semibold">
          Delete Lead
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete this lead?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default DeleteModal
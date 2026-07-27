
function LeadModal({open, onClose, children}) {

    if(!open) return null

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

  <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">

    <button
      onClick={onClose}
      className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full cursor-pointer text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
    >
      ✕
    </button>

    <div className="p-8">
      {children}
    </div>

  </div>

</div>
  )
}

export default LeadModal
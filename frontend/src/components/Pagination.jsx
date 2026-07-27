import React from "react";

function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">

  <button
    disabled={page === 1}
    onClick={() => onChange(page - 1)}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      page === 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
    }`}
  >
    ← Previous
  </button>

  <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
    {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => onChange(page + 1)}
    className={`px-4 py-2 rounded-lg font-medium transition ${
      page === totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
    }`}
  >
    Next →
  </button>

</div>
  );
}

export default Pagination;

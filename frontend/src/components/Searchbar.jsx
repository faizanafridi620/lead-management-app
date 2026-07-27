
function Searchbar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search leads..."
        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-700 placeholder-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

export default Searchbar;

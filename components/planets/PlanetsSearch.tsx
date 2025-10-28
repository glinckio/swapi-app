interface PlanetsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PlanetsSearch({ value, onChange }: PlanetsSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="planet-search" className="sr-only">
        Search for a planet
      </label>
      <input
        id="planet-search"
        type="text"
        placeholder="Search for a planet..."
        value={value}
        onChange={handleChange}
        aria-label="Search for a planet"
        className="w-full max-w-md mx-auto block px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

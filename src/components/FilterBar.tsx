// Gerekli tipler içeri aktarılıyor
import React, { useState, useEffect } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: { name: string; status: string; gender: string }) => void;
  onPageSizeChange: (pageSize: number) => void;// Sayfa boyutu değişince çağrılan fonksiyo
  pageSize: number;
}

// React bileşeni tanımlanıyor
const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onPageSizeChange, pageSize }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [localPageSize, setLocalPageSize] = useState(pageSize);

  // Filtre değişimlerini yakalar
  useEffect(() => {
    onFilterChange({ name, status, gender });
  }, [name, status, gender]);

  useEffect(() => {
    onPageSizeChange(localPageSize);
  }, [localPageSize]);

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900 p-4 rounded-md shadow-lg">
      <div>
        {/* İsim filtresi */}
        <label className="block text-sm text-gray-300 mb-1">Search by name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rick, Morty"
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        {/* Durum filtresi (Alive, Dead, Unknown) */}
        <label className="block text-sm text-gray-300 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Results per page</label>
        <select
          value={localPageSize}
          onChange={(e) => setLocalPageSize(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
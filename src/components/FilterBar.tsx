import React, { useState, useEffect } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: { name: string; status: string; gender: string }) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onPageSizeChange }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    onFilterChange({ name, status, gender });
  }, [name, status, gender]);

  useEffect(() => {
    onPageSizeChange(pageSize);
  }, [pageSize]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">All Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
        <option value={50}>50 per page</option>
        <option value={100}>100 per page</option>
      </select>
    </div>
  );
};

export default FilterBar;
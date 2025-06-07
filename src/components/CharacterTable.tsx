/*
import { useEffect, useState } from 'react';
import type { Character } from '../types/character';
import { fetchCharactersWithLimit } from '../services/characterService';

interface CharacterTableProps {
  pageSize: number;
  filters?: {
    name?: string;
    status?: string;
    gender?: string;
  };
}

export function CharacterTable({ pageSize, filters = {} }: CharacterTableProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'status' | 'gender' | 'id'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchCharactersWithLimit(pageSize, filters);
        setCharacters(result);
      } catch (err: any) {
        setError(err.message || 'Veri alınamadı.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [pageSize, filters]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (characters.length === 0) return <div>Karakter bulunamadı.</div>;

  const sortedCharacters = [...characters].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortOrder === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortOrder === 'asc'
        ? fieldA - fieldB
        : fieldB - fieldA;
    }

    return 0;
  });

  return (
     <div className="overflow-x-auto">
      {/* 🔽 Sıralama Kontrolleri *//*}
      <div className="mb-4 flex items-center gap-4">
        <div>
          <label className="mr-2 font-semibold">Sırala:</label>
          <select
            className="border rounded px-2 py-1"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
          >
            <option value="name">İsim</option>
            <option value="status">Durum</option>
            <option value="gender">Cinsiyet</option>
            <option value="id">ID</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Yön:</label>
          <select
            className="border rounded px-2 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="asc">Artan</option>
            <option value="desc">Azalan</option>
          </select>
        </div>
      </div>

      {/* 🔽 Karakter Tablosu *//*}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">İsim</th>
            <th className="px-4 py-2 border-b">Durum</th>
            <th className="px-4 py-2 border-b">Cinsiyet</th>
            <th className="px-4 py-2 border-b">Görsel</th>
          </tr>
        </thead>
        <tbody>
          {sortedCharacters.map((char) => (
            <tr key={char.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{char.id}</td>
              <td className="px-4 py-2 border-b">{char.name}</td>
              <td className="px-4 py-2 border-b">{char.status}</td>
              <td className="px-4 py-2 border-b">{char.gender}</td>
              <td className="px-4 py-2 border-b">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/

// components/CharacterTable.tsx
import React from 'react';
import type { Character, SortField, SortDirection } from '../App';

interface Props {
  characters: Character[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField) => void;
  onRowClick: (character: Character) => void;
}

const CharacterTable: React.FC<Props> = ({ characters, sortField, sortDirection, onSortChange, onRowClick }) => {
  const renderSortArrow = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? ' 🔼' : ' 🔽';
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSortChange('name')}>Name{renderSortArrow('name')}</th>
          <th onClick={() => onSortChange('status')}>Status{renderSortArrow('status')}</th>
          <th onClick={() => onSortChange('gender')}>Gender{renderSortArrow('gender')}</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((char) => (
          <tr key={char.id} onClick={() => onRowClick(char)}>
            <td>{char.name}</td>
            <td>{char.status}</td>
            <td>{char.gender}</td>
            <td><img src={char.image} alt={char.name} width="50" height="50" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CharacterTable;
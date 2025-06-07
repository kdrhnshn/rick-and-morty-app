/*

import React, { useEffect, useState, useMemo } from 'react';
import CharacterTable from './components/CharacterTable';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export type SortField = 'name' | 'status' | 'gender';
export type SortDirection = 'asc' | 'desc';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ name: '', status: '', gender: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.status) params.append('status', filters.status);
        if (filters.gender) params.append('gender', filters.gender);
        params.append('page', currentPage.toString());

        const response = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        if (!response.ok) throw new Error('API isteği başarısız.');

        const json = await response.json();
        setCharacters(json.results);
        setTotalPages(json.info.pages);
      } catch (error) {
        setError((error as Error).message);
        setCharacters([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage]);

  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [characters, sortField, sortDirection]);

  return (
    <div className="App">
      <h1>Rick and Morty Characters</h1>
      <FilterBar
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CharacterTable
        characters={sortedCharacters}
        onSortChange={(field) => {
          if (field === sortField) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          } else {
            setSortField(field);
            setSortDirection('asc');
          }
        }}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;

*/
// App.tsx
import React, { useEffect, useState, useMemo, useRef } from 'react';
import CharacterTable from './components/CharacterTable';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin?: {name: string};
  location?: {name: string};
  episode: string[];
  created: string;

}

export type SortField = 'name' | 'status' | 'gender';
export type SortDirection = 'asc' | 'desc';

function App() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ name: '', status: '', gender: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [characterDetails, setCharacterDetails] = useState<Character | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      setError(null);
      try {
        let allResults: Character[] = [];
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.status) params.append('status', filters.status);
        if (filters.gender) params.append('gender', filters.gender);
        params.append('page', '1');

        const firstRes = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
        if (!firstRes.ok) throw new Error('API isteği başarısız.');
        const firstJson = await firstRes.json();
        allResults = [...firstJson.results];
        const totalPages = firstJson.info.pages;

        const pagePromises = [];
        for (let i = 2; i <= totalPages; i++) {
          const pageParams = new URLSearchParams(params);
          pageParams.set('page', i.toString());
          pagePromises.push(fetch(`https://rickandmortyapi.com/api/character/?${pageParams.toString()}`));
        }

        const responses = await Promise.all(pagePromises);
        for (const res of responses) {
          if (res.ok) {
            const json = await res.json();
            allResults = [...allResults, ...json.results];
          }
        }

        setAllCharacters(allResults);
        setCurrentPage(1);
      } catch (error) {
        setError((error as Error).message);
        setAllCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [filters]);

  // karakter detay görünümü useEffect..........
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (selectedCharacterId === null) return;
      setDetailsLoading(true);
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`);
        if (!res.ok) throw new Error("Detay API isteği başarısız.");
        const json = await res.json();
        setCharacterDetails(json);
      } catch (err) {
        setCharacterDetails(null);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [selectedCharacterId]);

  useEffect(() => {
    if (characterDetails && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [characterDetails]);


  const sortedCharacters = useMemo(() => {
    return [...allCharacters].sort((a, b) => {
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [allCharacters, sortField, sortDirection]);

  const paginatedCharacters = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedCharacters.slice(start, end);
  }, [sortedCharacters, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedCharacters.length / pageSize);

  return (
    <div className="App">
      <h1>Rick and Morty Characters</h1>
      <FilterBar
        onFilterChange={(newFilters) => setFilters(newFilters)}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CharacterTable
        characters={paginatedCharacters}
        onSortChange={(field) => {
          if (field === sortField) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          } else {
            setSortField(field);
            setSortDirection('asc');
          }
        }}
        sortField={sortField}
        sortDirection={sortDirection}
        onRowClick={(char) => setSelectedCharacterId(char.id)}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Detay kutusu */}
      {characterDetails && (
        <div
        ref={detailRef} 
        style={{
          marginTop: '20px',
          padding: '1rem',
          backgroundColor: '#2c2c2c',
          borderRadius: '8px',
          color: 'white',
          position: 'relative'
        }}>
          <button onClick={() => {
            setSelectedCharacterId(null);
            setCharacterDetails(null);
          }} style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}>
            ✖
          </button>

          <h2>{characterDetails.name}</h2>
          <img src={characterDetails.image} alt={characterDetails.name} width="150" />
          <p><strong>Status:</strong> {characterDetails.status}</p>
          <p><strong>Species:</strong> {characterDetails.species}</p>
          <p><strong>Gender:</strong> {characterDetails.gender}</p>
          <p><strong>Origin:</strong> {characterDetails.origin?.name}</p>
          <p><strong>Last known location:</strong> {characterDetails.location?.name}</p>
          <p><strong>Episodes:</strong> {characterDetails.episode.length}</p>
          <p><strong>Created:</strong> {new Date(characterDetails.created).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;